import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import * as d3 from "d3";
import { setActivities } from "../store/actions/activities";
import { setCourses } from "../store/actions/courses";

const GymGraphScatter = ({ gymId, handleChangeCourseBars }) => {
  const dispatch = useDispatch()
  const activities = useSelector(state =>
    state.activities.activities.filter(activity => activity.gymId + '' === gymId)
  )
  const courses = useSelector(state =>
    state.courses.courses
      .filter(course => course.gymId + '' === gymId)
  )

  const monthsArray = Array(12).fill(0)
  const monthlyRevenue = monthsArray.map((month, monthIndex) => {
    const currentMonthActivities = activities.filter(activity => {
      const activityStartDate = new Date(activity.startDate)
      return activityStartDate.getMonth() === monthIndex  //getMonth() Jan is considered 0
    })
    const reducer = (accumulator, activity) => {
      const course = courses.find(courseItem => courseItem._id === activity.courseId)
      return accumulator + activity.currentAttendance * course.price
    }
    const currentMonthRevenue = currentMonthActivities.reduce(reducer, 0)
    return currentMonthRevenue
  })

  const createGraph = () => {
    const margin = ({ top: 20, right: 10, bottom: 50, left: 50 })
    const height = 300
    const width = 300
    const radius = 5

    const x = d3.scaleLinear()
      .domain([0, 12])
      .range([margin.left, width - margin.right])
    const y = d3.scaleLinear()
      .domain(d3.extent(monthlyRevenue))
      .nice()
      .range([height - margin.bottom, margin.top])

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.append("text")
        .attr("x", width - 4)
        .attr("y", -4)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .text("Period"))

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "$.2f"))
      .attr("x2", width)
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text("Revenue"))

    const svg = d3.select("#graph").append("svg")
      .attr("viewBox", [0, 0, width, height])

    svg.append("g")
      .call(xAxis);
    svg.append("g")
      .call(yAxis);

    const index = d3.local();

    svg.append("g")
      .attr("fill", "blue")
      .selectAll("circle")
      .data(monthlyRevenue)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => x(i))
      .attr("cy", (d, i) => y(d))
      .attr("r", radius)
      .each(function (d, i) {
        index.set(this, i);
      })
      .on('click', function (e, d, i) {
        handleChangeCourseBars(index.get(this))
      })
  }
  useEffect(
    () => {
      dispatch(setCourses(
        `http://localhost:8000/courses`
      )).then(() =>
        dispatch(setActivities())).then(() =>
          createGraph())
    },
    [],
  );
  return <div id="graph" />
}
export default GymGraphScatter