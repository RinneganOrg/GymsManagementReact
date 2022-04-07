import React, { useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  easeLinear,
  scaleBand,
  axisLeft,
  axisBottom,
} from "d3";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const delayAnimations = new Map();

const RevenueGraph = ({
  activities,
  courses,
  wantedCourse,
  setWantedCourse,
  currentColor,
  setCurrentColor,
}) => {
  const [animated, setAnimated] = useState(0);
  const renderFullGraph = (table, width, height, svg) => {
    setAnimated(1);
    const margin = { top: 20, right: 20, bottom: 50, left: 30 };
    let lastX = 0;
    const standardSpaceInGraph = 150;
    const delay = 400;
    let lastMonth = "Jan";
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = scaleLinear().domain([0, 200]).range([0, innerWidth]);
    const yScale = scaleBand()
      .domain(months)
      .range([0, innerHeight])
      .padding(0.2);
    const group = svg.append("g"); //basicaly i am grouping all the rectagles to translate them in order to make space for axes

    group.attr("transform", `translate(${margin.left},${margin.top})`);
    group
      .selectAll("g")
      .data(table)
      .enter()
      .append("rect")
      .attr("x", (row) => {
        lastX = lastMonth !== row.month ? 0 : lastX;
        lastMonth = row.month;

        if (row.name !== "Raport") {
          lastX += row.courseRevenue;
          return xScale(lastX - row.courseRevenue);
        } else {
          lastX += row.courseRevenue;
          return xScale(lastX - row.courseRevenue);
        }
      })
      .attr("y", (row) => yScale(row.month))
      .attr("width", (row) => {
        return 0;
      })
      .attr("height", yScale.bandwidth())
      .attr("style", (row) => {
        return `fill:${row.color};`;
      })
      .on("click", (ev, row) => {
        setWantedCourse(row.id);
        setCurrentColor(row.color);
      });

    lastX = 0;

    group
      .selectAll("rect")
      .data(table)
      .transition()
      .delay((row) => {
        let actualDelay = delayAnimations.get(row.month);
        console.log(actualDelay);
        delayAnimations.set(row.month, actualDelay + delay);
        return actualDelay;
      })
      .duration(delay)
      .ease(easeLinear)
      .attr("width", (row) => {
        if (row.name !== "Raport") return xScale(row.courseRevenue);
        else return xScale(standardSpaceInGraph);
      });

    group
      .selectAll("g")
      .data(table)
      .enter()
      .append("text")
      .attr("y", (row) => yScale(row.month) + 20)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("x", (row) => {
        lastX = lastMonth !== row.month ? 0 : lastX;
        lastMonth = row.month;
        lastX += row.courseRevenue;
        if (row.name !== "Raport" && row.courseRevenue !== 0)
          return xScale(lastX - row.courseRevenue / 2);
        else return xScale(lastX - row.courseRevenue + 10);
      })
      .text((row) => {
        if (row.name !== "Raport" && row.courseRevenue !== 0)
          return `${row.courseRevenue}$`;
        else if (row.name === "Raport") return `${row.courseRevenue}$`;
      });
    group.append("g").call(axisLeft(yScale));
    group
      .append("g")
      .call(axisBottom(xScale))
      .attr("transform", `translate(0,${innerHeight})`);
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top - 30) + ")"
      )
      .style("text-anchor", "middle")
      .text("Revenue");
  };

  const createGraph = (svg, witdh, height) => {
    let profitTable = [];

    months.forEach((month) => {
      let filterdActivites = activities.filter(
        (activity) => month === months[new Date(activity.startDate).getMonth()]
      );
      let profitOfAllMonth = 0;

      courses.forEach((course) => {
        let onlyThisCourseAndMonthfilterdActivites = filterdActivites.filter(
          (activity) => activity.courseId === course._id
        );

        if (onlyThisCourseAndMonthfilterdActivites.length > 0) {
          let profitOfCourse = onlyThisCourseAndMonthfilterdActivites.reduce(
            (accumulator, currentActivity) =>
              accumulator + currentActivity.currentAttendance * course.price,
            0
          );

          profitTable.push({
            id: course._id,
            name: course.name,
            courseRevenue: profitOfCourse,
            month: month,
            color: course.color,
          });
          profitOfAllMonth += profitOfCourse;
        }
      });
      profitTable.push({
        name: "Raport",
        courseRevenue: profitOfAllMonth,
        month: month,
        color: "#ffffff",
      });
    });

    renderFullGraph(profitTable, witdh, height, svg);
  };

  useEffect(() => {
    console.log("render");
    months.forEach((month) => {
      delayAnimations.set(month, 0);
    });
    if (animated === 0) {
      const svg = select("#graph");
      select("#graph").selectAll("*").remove();
      const witdh = parseInt(svg.attr("width"));
      const height = parseInt(svg.attr("height"));

      createGraph(svg, witdh, height);
    }
  }, [activities, courses]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <svg id="graph" width="1200" height="600"></svg>
      </div>
    </div>
  );
};
export default RevenueGraph;
