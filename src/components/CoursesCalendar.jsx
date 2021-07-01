import React, { useState } from "react";
import { Dropdown } from 'semantic-ui-react'

const CoursesCalendar = () => {
  const months =
    [{ key: 0, daysInMonth: 31, value: 1, text: "January" },
    { key: 1, daysInMonth: 31, value: 2, text: "February" },
    { key: 2, daysInMonth: 31, value: 3, text: "March" },
    { key: 3, daysInMonth: 31, value: 4, text: "April" },
    { key: 4, daysInMonth: 31, value: 5, text: "May" },
    { key: 5, daysInMonth: 31, value: 6, text: "June" },
    { key: 6, daysInMonth: 31, value: 7, text: "July" },
    { key: 7, daysInMonth: 31, value: 8, text: "August" },
    { key: 8, daysInMonth: 31, value: 9, text: "September" },
    { key: 9, daysInMonth: 31, value: 10, text: "October" },
    { key: 10, daysInMonth: 31, value: 11, text: "November" },
    { key: 11, daysInMonth: 31, value: 12, text: "December" }]
  const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const daysOfTheMonth = Array.from(Array(31).keys(), (x, i) => x+i)
  const disabledDays = [30, 31, 1, 2]
  const tasks =
    [{ name: "Projects", color: "warning", period: "09-11th November", description: "desc1" },
    { name: "Design Sprint", color: "danger", period: "07-09th November", description: "desc2" },
    { name: "Product Checkup 1", color: "primary", period: "15-17th November", description: "desc3" },
    { name: "Product Checkup 2", color: "info", period: "25-26th November", description: "desc4" }]

  const [currentMonth, setCurrentMonth] = useState(7)
  const handleChange = (e, { value }) => {
    setCurrentMonth(value)
  }
  return <div className="calendar-container">
    <div className="calendar-header">
      <Dropdown
        selection
        value={currentMonth}
        options={months}
        onChange={handleChange} />
      <p>2021</p>
    </div>
    <div className="calendar">
      {daysOfTheWeek.map((dayOfTheWeek, i) =>
        <span key={i} className="day-name">{dayOfTheWeek}</span>)}
      {disabledDays.slice(0, 2).map((disabledDay, i) =>
        <div key={i} className="day day--disabled">{disabledDay}</div>)}
      {daysOfTheMonth.map((dayOfTheMonth, i) =>
        <div key={i} className="day">{dayOfTheMonth}</div>)}
      {disabledDays.slice(2, 4).map((disabledDay, i) =>
        <div key={i} className="day day--disabled">{disabledDay}</div>)}
      {tasks.map((task, i) =>
        <section key={i} className={`task task--${task.color}`}>{task.name}
          <div className="task__detail">
            <h2>{task.name}</h2>
            <p>{task.period}</p>
            <p>{task.description}</p>
          </div>
        </section>
      )}
    </div>
  </div>
}
export default CoursesCalendar