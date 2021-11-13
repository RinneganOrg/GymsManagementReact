import React, { useEffect, useState } from "react";
import {
  select,
  selectAll,
  scaleLinear,
  easeLinear,
  max,
  format,
  scaleBand,
  axisLeft,
  axisBottom,
  scaleOrdinal,
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
const getActivity = new Map();
var delay = 400;

months.forEach((month) => {
  delayAnimations.set(month, 0);
});
//<ModalActivity selectedActivity = {selectedActivity} open = {open}setOpen = {setOpen}courses = {courses}trainers = {trainers}/>

function AttenanceGraph({
  activities,
  courses,
  trainers,
  selectedColor,
  selectedCourse,
  modal,
}) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [open, setOpen] = useState(false);

  function createData(course) {
    const jsonData = [];
    let onlyWantedActivities = activities.filter(
      (activity) => activity.courseId === course
    );
    months.forEach((month) => {
      let data = onlyWantedActivities.filter(
        (activity) => months[new Date(activity.startDate).getMonth()] === month
      );
      let obj = {
        title: month,
        price: 0,
      };
      let index = 0;
      for (let i = 0; i <= 20; ++i) {
        obj[i] = 0;
      }
      data.forEach((row) => {
        obj[index.toString()] = row.currentAttendance;
        getActivity.set(`${row.currentAttendance}${month}`, row);

        ++index;
      });

      jsonData.push(obj);
    });

    return jsonData;
  }

  useEffect(() => {
    select("#second1").selectAll("*").remove();
    let jsonData = createData(selectedCourse);
    var margin = {
        top: 50,
        right: 20,
        bottom: 30,
        left: 50,
      },
      width = 860 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    var x = scaleBand().rangeRound([0, width], 0.1).paddingInner(0.1);

    var y = scaleLinear().rangeRound([height, 0]);
    var color = scaleOrdinal().range([
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ]);

    var xAxis = axisBottom().scale(x);

    var yAxis = axisLeft().scale(y).tickFormat(format(".2s"));

    var svg = select("#second1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var legendClassArray = []; //store legend classes to select bars in plotSingle()
    var legendClassArray_orig = []; //orig (with spaces)
    var restoreXFlag = false; //restore order of bars back to original
    var class_keep = "";

    plotJsonData(jsonData);

    function plotJsonData(data) {
      // if (error) throw error;

      color.domain(
        Object.keys(data.at(0)).filter(function (key) {
          return key !== "title";
        })
      );

      data.forEach(function (d) {
        var mystate = d.title;
        var y0 = 0;
        d.incidents = color.domain().map(function (title) {
          return {
            mystate: mystate,
            title: title,
            y0: y0,
            y1: (y0 += +d[title]),
            value: d[title],
            y_corrected: 0,
          };
        });
        d.total = d.incidents[d.incidents.length - 1].y1;
      });

      x.domain(
        data.map(function (d) {
          return d.title;
        })
      );
      y.domain([
        0,
        max(data, function (d) {
          return d.total;
        }),
      ]);

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap, x.bandwidth());
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2 - 10)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Attendees");

      function wrap(text, width) {
        text.each(function () {
          var text = select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text
              .text(null)
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", dy + "em");
          while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                .text(word);
            }
          }
        });
      }

      svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

      var over_all = svg
        .selectAll(".over_all")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "new")
        .attr("transform", function (d) {
          return "translate(" + "0" + ",0)";
        });

      var height_diff = 0;
      over_all
        .selectAll("rect")
        .data(function (d) {
          return d.incidents;
        })
        .enter()
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
          height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
          var y_corrected = y(d.y1) + height_diff;
          d.y_corrected = y_corrected;
          if (d.title === "unknown") height_diff = 0;
          return y_corrected + (y(0) - y(d.value));
        })
        .attr("x", function (d) {
          return x(d.mystate);
        })
        .attr("height", function (d) {
          return 0;
        })
        .attr("fill", `selectedColor`);

      var stacked_data = svg
        .selectAll(".stacked_data")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
          return "translate(" + "0" + ",0)";
        });

      height_diff = 0;
      stacked_data
        .selectAll("g")
        .data(function (d) {
          return d.incidents;
        })
        .enter()
        .append("g")
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
          height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
          var y_corrected = y(d.y1) + height_diff;
          d.y_corrected = y_corrected;

          if (d.title === "unknown") height_diff = 0;

          return y_corrected + (y(0) - y(d.value));
        })
        .attr("x", function (d) {
          return x(d.mystate);
        })
        .attr("height", function (d) {
          return 0;
        })
        .attr("class", function (d) {
          var classLabel = d.title.replace(/\s/g, "");
          return "bars top class" + classLabel;
        })
        .style("fill", function (d) {
          return selectedColor;
        });
      over_all
        .selectAll("rect")
        .data(function (d) {
          return d.incidents;
        })
        .transition()
        .ease(easeLinear)
        .duration(delay)
        .attr("height", function (d) {
          return y(0) - y(d.value);
        })
        .attr("y", function (d) {
          height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
          var y_corrected = y(d.y1) + height_diff;
          d.y_corrected = y_corrected;

          if (d.title === "unknown") height_diff = 0;
          return y_corrected;
        })
        .delay((d) => {
          let actualDelay = delayAnimations.get(d.mystate);
          delayAnimations.set(d.mystate, actualDelay + delay);
          return actualDelay;
        });
      months.forEach((month) => {
        delayAnimations.set(month, 0);
      });
      stacked_data
        .selectAll("rect")
        .data(function (d) {
          return d.incidents;
        })
        .transition()
        .ease(easeLinear)
        .duration(delay)
        .attr("height", function (d) {
          return y(0) - y(d.value);
        })
        .attr("y", (d) => {
          height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
          var y_corrected = y(d.y1) + height_diff;
          d.y_corrected = y_corrected;

          if (d.title === "unknown") height_diff = 0;

          return y_corrected;
        })
        .delay((d) => {
          let actualDelay = delayAnimations.get(d.mystate);
          delayAnimations.set(d.mystate, actualDelay + delay);
          return actualDelay;
        });

      stacked_data
        .selectAll("rect")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .on("click", function (event, d) {
          var delta = d.y1 - d.y0;
          setSelectedActivity(getActivity.get(`${delta}${d.mystate}`));
          setOpen(true);
        });

      stacked_data
        .selectAll("g")
        .data(function (d) {
          return d.incidents;
        })
        .append("text")
        .attr("y", function (d) {
          height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
          var y_corrected = y(d.y1) + height_diff;
          d.y_corrected = y_corrected;

          if (d.title === "unknown") height_diff = 0;

          return y_corrected + (y(0) - y(d.value)) / 2 + 10;
        })
        .attr("x", function (d) {
          return x(d.mystate) + x.bandwidth() / 2;
        })
        .text((d) => {
          if (y(0) - y(d.value) > 0) return `${d.y1 - d.y0}`;
        })
        .style("text-anchor", "middle");

      function activeLink(_self) {
        color
          .domain()
          .slice()
          .forEach(function (data) {
            legendClassArray.push(data.replace(/\s/g, ""));
            legendClassArray_orig.push(data);
          });
        selectAll("li").classed("active", false).style("font-size", "18px");

        select(_self).style("font-size", "24px").attr("class", "active");
      }

      select("#all").on("click", function () {
        activeLink(this);

        restorePlot(select(this).text().toLowerCase());
      });

      function restorePlot(d) {
        selectAll(".bars:not(.class" + class_keep + ")")
          .transition()
          .duration(1000)
          .delay(function () {
            if (restoreXFlag) return 3000;
            else return 750;
          })
          .attr("width", x.rangeBand())
          .style("opacity", 1);

        selectAll(".class" + class_keep)
          .attr("x", function (d) {
            return x(d.mystate);
          })
          .transition()
          .duration(1000)
          .delay(function () {
            if (restoreXFlag) return 2000;
            else return 0;
          })
          .attr("y", function (d) {
            return d.y_corrected;
          });

        //reset
        restoreXFlag = false;
      }
    }
  }, [selectedCourse, selectedColor]);
  return (
    <>
      <div id="second1"></div>
      {modal(selectedActivity, open, setOpen, courses, trainers)}
    </>
  );
}

export default AttenanceGraph;
