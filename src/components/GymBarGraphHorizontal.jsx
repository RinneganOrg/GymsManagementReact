import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import * as d3 from "d3";

const GymBarGraphHorizontal = ({ gymId, selectedMonth }) => {
  const activities = useSelector(state =>
    state.activities.activities.filter(activity =>
      activity.gymId + '' === gymId &&
      new Date(activity.startDate).getMonth() === selectedMonth
    )
  )
  const courses = useSelector(state =>
    state.courses.courses.filter(course => course.gymId + '' === gymId)
  )
  const courseData = courses.map((course) => {
    const reducer = (accumulator, activity) => {
      const att = activity.courseId === course.id ? activity.attendance : 0
      return accumulator + att
    };
    const currentMonthAttendance = activities.reduce(reducer, 0)

    // console.log({ currentMonthAttendance })

    // const course = courses.find(courseItem => courseItem.id === activity.courseId)
    return Object.assign({}, course, { currentMonthAttendance })
  })

  console.log({ courseData })
  console.log({ activities })
  console.log({ selectedMonth })


  const makeBars = () => {
    const margin = ({ top: 0, right: 10, bottom: 30, left: 90 })
    const width = 500
    const barHeight = 20
    const height = Math.ceil((courseData.length + 1) * barHeight) + margin.top + margin.bottom
    const x = d3.scaleLinear()
      .domain([0, d3.max(courseData, d => d.currentMonthAttendance)])
      .range([margin.left, width - margin.right])
    const y = d3.scaleBand()
      .domain(d3.range(courseData.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1)
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickFormat(i => courseData[i].name)
        .tickSizeOuter(0))

    const svg = d3.select("#graph").append("svg")
      .attr("viewBox", [0, 0, width, height]);

    console.log("svg", svg)
    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(courseData)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.currentMonthAttendance) - x(0))
      .attr("height", y.bandwidth());

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
    draw(svg, x, y)
  }

  const draw = (svg, x, y) => {
    console.log("draw")
    const courseData = [{ currentMonthAttendance: 15 }]
    // const svg = d3.select("#graph")
    const bars = svg.selectAll("rect")
      .data(courseData);
    bars.exit()
      .transition()
      .duration(1000)
      .attr("width", 0)
      .remove();

    bars.enter()
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(courseData)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.currentMonthAttendance) - x(0))
      .attr("height", y.bandwidth());

    // svg.append("g")
    //   .call(xAxis);

    // svg.append("g")
    //   .call(yAxis);
  }
  useEffect(
    makeBars,
    [],
  );
  return <div id="graph">
    <button onClick={draw}>Change graph</button>
  </div>
}
export default GymBarGraphHorizontal