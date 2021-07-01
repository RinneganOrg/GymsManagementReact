import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import * as d3 from "d3";

const GymBarGraph = ({ gymId, startDate, endDate }) => {
  const activities = useSelector(state =>
    state.activities.activities.filter(activity =>
      activity.gymId + '' === gymId
      // &&
      // activity.startDate >= startDate &&
      // activity.endDate <= endDate
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

    console.log({ activities })
    console.log({ currentMonthAttendance })

    // const course = courses.find(courseItem => courseItem.id === activity.courseId)
    return Object.assign({}, course, { currentMonthAttendance })
  })
  console.log("data", { courseData })
  const createGraph = () => {
    const margin = ({ top: 20, right: 30, bottom: 30, left: 40 })
    const height = 500
    const width = 500
    const color = "steelblue"

    const x = d3.scaleLinear()
      .domain([0, d3.max(courseData, d => d.currentMonthAttendance)])
      .range([margin.left, width - margin.right])

    const y = d3.scaleBand()
      .domain(d3.range(courses.length))
      .range([height - margin.bottom, margin.top])
      .padding(0.1)

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .call(g => g.append("text")
        .attr("fill", "currentColor")
        .attr("text-anchor", "start"))

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickFormat(i => courseData[i].name)
        .tickSizeOuter(0))
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start"))

    const svg = d3.select("#graph").append("svg")
      .attr("viewBox", [0, 0, width, height])
    svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(courseData)
        .join("rect")
        .attr("y", d => y(d.currentMonthAttendance))
        .attr("x", (d, i) => x(i))
        .attr("height", y.bandwidth())
        .attr("width", d => d.currentMonthAttendance);

    svg.append("g")
      .call(xAxis);
    svg.append("g")
      .call(yAxis);
  }

  useEffect(
    () => createGraph(),
    [],
  );

  return <div id="graph" />
}
export default GymBarGraph