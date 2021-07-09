import React, { useState, useEffect } from "react";
import { Dropdown, Modal, Button, Input, Header, List, Image, Label, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { addActivity, editActivity, deleteActivity } from '../store/actions/activities'

const CoursesCalendar = ({ gymId, userId }) => {
  const months =
    [{ key: 0, daysInMonth: 31, value: 1, text: "January" },
    { key: 1, daysInMonth: 28, value: 2, text: "February" },
    { key: 2, daysInMonth: 31, value: 3, text: "March" },
    { key: 3, daysInMonth: 30, value: 4, text: "April" },
    { key: 4, daysInMonth: 31, value: 5, text: "May" },
    { key: 5, daysInMonth: 30, value: 6, text: "June" },
    { key: 6, daysInMonth: 31, value: 7, text: "July" },
    { key: 7, daysInMonth: 30, value: 8, text: "August" },
    { key: 8, daysInMonth: 31, value: 9, text: "September" },
    { key: 9, daysInMonth: 30, value: 10, text: "October" },
    { key: 10, daysInMonth: 31, value: 11, text: "November" },
    { key: 11, daysInMonth: 30, value: 12, text: "December" }]
  const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const courses2 = useSelector(state =>
    state.courses.courses
      .map(course => ({
        key: course.id,
        value: course.id,
        text: course.name,
        color: course.color,
        border: course.border,
        maxAttendance: course.availableSpots
      }))
  )
  const courses = useSelector(state =>
    state.courses.courses
      .filter(course => course.gymId + '' === gymId)
      .map(course => ({
        key: course.id,
        value: course.id,
        text: course.name,
        color: course.color,
        border: course.border,
        maxAttendance: course.availableSpots
      }))
  )
  const trainers = useSelector(state =>
    state.trainers.trainers
      .map(trainer => ({
        trainerGymId: gymId,
        trainerId: trainer.id,
        trainerName: trainer.name,
        trainerImage: trainer.image
      }))
  )
  const trainersToChoose = trainers.filter(trainer => trainer.trainerGymId + '' === gymId).map(trainer => ({
    key: trainer.trainerId,
    value: trainer.trainerId,
    text: trainer.trainerName,
    image: { avatar: true, src: trainer.trainerImage },
  }))

  const activities = useSelector(state => state.activities.activities
    .filter(activity =>
      (gymId && activity.gymId + '' === gymId) ||
      (userId && activity.userIds.includes(parseInt(userId)))))

  const activitiesData = activities.map((activity) => {
    const course = courses2.find(courseItem => courseItem.value === activity.courseId)
    const trainer = trainers.find(trainerItem => trainerItem.trainerId === activity.trainerId)
    return Object.assign({}, activity, { ...course }, { ...trainer })
  })

  const dispatch = useDispatch()

  const tasks =
    [{ name: "Projects", color: "warning", period: "09-11th November", description: "desc1" },
    { name: "Design Sprint", color: "danger", period: "07-09th November", description: "desc2" },
    { name: "Product Checkup 1", color: "primary", period: "15-17th November", description: "desc3" },
    { name: "Product Checkup 2", color: "info", period: "25-26th November", description: "desc4" }]

  const [selectedMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [daysOfTheMonth, setDaysOfTheMonth] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedActivity, setSelectedActivity] = useState({})
  const [selectedCourse, setSelectedCourse] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTrainer, setSelectedTrainer] = useState()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditMode, setShowEditMode] = useState(false)

  const changeDisplayModal = (dayNumber) => {
    setSelectedCourse('')
    setSelectedTrainer('')
    setStartDate(`2021-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}-${dayNumber < 10 ? `0${dayNumber}` : dayNumber}`)
    setEndDate(`2021-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}-${dayNumber < 10 ? `0${dayNumber}` : dayNumber}`)
    setSelectedActivity({})
    if (dayNumber) {
      setSelectedDay(dayNumber)
    }
    setShowEditModal(!showEditModal)
    setShowEditMode(!showEditMode)
  }
  const changeDisplayEditModal = (event, activity, dayNumber) => {
    event.stopPropagation()
    if (activity) {
      setSelectedActivity(activity)
    }
    if (dayNumber) {
      setSelectedDay(dayNumber)
    }
    setShowEditModal(!showEditModal)
  }
  const changeShowEditMode = () => {
    setSelectedCourse(selectedActivity.courseId)
    setSelectedTrainer(selectedActivity.trainerId)
    setStartDate(selectedActivity.startDate)
    setEndDate(selectedActivity.endDate)
    setShowEditMode(!showEditMode)
  }
  const onAddActivity = () => {
    let activity = {
      gymId: parseInt(gymId),
      courseId: parseInt(selectedCourse),
      trainerId: parseInt(selectedTrainer),
      attendance: 0,
      startDate: startDate,
      endDate: endDate,
      userIds: []
    }
    dispatch(addActivity(activity))
    setShowEditModal(false)
    setShowEditMode(false)
  }
  const onEditActivity = () => {
    let activity = {
      id: selectedActivity.id,
      gymId: parseInt(gymId),
      courseId: parseInt(selectedCourse),
      trainerId: parseInt(selectedTrainer),
      attendance: selectedActivity.attendance,
      startDate: startDate,
      endDate: endDate,
      userIds: selectedActivity.userIds
    }
    let course = courses.find(course => course.key === parseInt(selectedCourse))
    let trainer = trainers.find(trainer => trainer.trainerId === parseInt(selectedTrainer))
    let activityToDisplay = { ...selectedActivity, startDate: startDate, endDate: endDate, maxAttendance: course.maxAttendance, text: course.text, trainerName: trainer.trainerName, trainerImage: trainer.trainerImage }
    dispatch(editActivity(activity))
    setSelectedActivity(activityToDisplay)
    setShowEditMode(false)
  }
  const onDeleteActivity = () => {
    dispatch(deleteActivity(selectedActivity))
    setShowEditModal(false)
  }
  const changeMonth = (e, { value }) => {
    setCurrentMonth(value)
    setDaysOfTheMonth(fillCalendarDays(value))
  }
  const changeCourse = (e, { value }) => {
    setSelectedCourse(value)
  }
  const changeTrainer = (e, { value }) => {
    setSelectedTrainer(value)
  }
  const changeStartDate = (event) => {
    setStartDate(event.target.value)
  }
  const changeEndDate = (event) => {
    setEndDate(event.target.value)
  }
  const fillCalendarDays = (selectedMonthIndex) => {
    let selectedMonthItem = months[selectedMonthIndex - 1]

    let selectedMonthDays = Array(selectedMonthItem.daysInMonth)
      .fill(0)
      .map((day, i) => ({
        dayNumber: i + 1,
        class: "day",
        month: selectedMonthIndex
      }))

    let firstDayOfTheMonthDate = `${selectedMonthIndex} 1 2021`
    let firstDayOfTheMonthWeekIndex = new Date(firstDayOfTheMonthDate).getDay()
    let previousMonthDisabledDays = Array(firstDayOfTheMonthWeekIndex - 1)
      .fill(0)
      .map((previousMonthDisabledDay, i) => ({
        dayNumber: months[selectedMonthItem.value].daysInMonth - i,
        class: "day day--disabled",
        month: selectedMonthIndex - 1
      }))

    let lastDayOfTheMonthDate = `${selectedMonthIndex} ${selectedMonthItem.daysInMonth} 2021`
    let lastDayOfTheMonthWeekIndex = new Date(lastDayOfTheMonthDate).getDay()
    let nextMonthDisabledDays = Array(7 - lastDayOfTheMonthWeekIndex)
      .fill(0)
      .map((nextMonthDisabledDay, i) => ({
        dayNumber: i + 1,
        class: "day day--disabled",
        month: selectedMonthIndex + 1
      }))

    const result = [...previousMonthDisabledDays.reverse(), ...selectedMonthDays, ...nextMonthDisabledDays]
    return result
  }
  const attendCourse = () => {
    let activity = {}
    if (selectedActivity.attendance < selectedActivity.maxAttendance) {
      activity = {
        id: selectedActivity.id,
        gymId: selectedActivity.gymId,
        courseId: parseInt(selectedActivity.courseId),
        trainerId: parseInt(selectedActivity.trainerId),
        attendance: ++selectedActivity.attendance,
        startDate: selectedActivity.startDate,
        endDate: selectedActivity.endDate,
        userIds: selectedActivity.userIds
      }
      activity.userIds.push(1)
    }
    dispatch(editActivity(activity))
  }
  const makeTaskClassName = (activity, day) => {
    if (new Date(activity.startDate).getDate() === day && new Date(activity.endDate).getDate() === day) {
      return "task task--first-day task--last-day"
    }
    else
      if (new Date(activity.startDate).getDate() === day) {
        return "task task--first-day"
      }
      else
        if (new Date(activity.endDate).getDate() === day) {
          return "task task--last-day"
        }
        else
          return "task task--one-day"
  }
  const makeDayClassName = (activity, day) => {
    if (new Date(activity.startDate).getDate() === day && new Date(activity.endDate).getDate() === day) {
      return "day--one-day-event"
    }
    else
      if (new Date(activity.startDate).getDate() === day) {
        return "day--start-event"
      }
      else
        if (new Date(activity.endDate).getDate() === day) {
          return "day--end-event"
        }
        else
          return "day--one-event"
  }
  useEffect(
    () => setDaysOfTheMonth(fillCalendarDays(new Date().getMonth() + 1)),
    [],
  );

  return <div className="calendar-container">
    <div className="calendar-header">
      <Dropdown
        selection
        value={selectedMonth}
        options={months}
        onChange={changeMonth} />
      <p>2021</p>
    </div>

    <div className="calendar">
      {daysOfTheWeek.map((dayOfTheWeek, i) =>
        <span key={i} className="day-name">{dayOfTheWeek}</span>)}
      {daysOfTheMonth.map((dayOfTheMonth, i) =>
        <section key={i} className={dayOfTheMonth.class}
          onClick={() => changeDisplayModal(dayOfTheMonth.dayNumber)}
        >
          {new Date().getDate() === dayOfTheMonth.dayNumber &&
            new Date().getMonth() + 1 === selectedMonth ?
            <Label
              circular
              color="blue"
              key={i}
            >
              {dayOfTheMonth.dayNumber}
            </Label> :
            <div >
              {dayOfTheMonth.dayNumber}
            </div>
          }
          {
            activitiesData
              .filter(activity =>
                new Date(activity.startDate) <= new Date(`2021-${('0' + dayOfTheMonth.month).slice(-2)}-${('0' + dayOfTheMonth.dayNumber).slice(-2)}`) &&
                new Date(activity.endDate) >= new Date(`2021-${('0' + dayOfTheMonth.month).slice(-2)}-${('0' + dayOfTheMonth.dayNumber).slice(-2)}`)
              )
              .slice(0, 1)
              .map((activity, i) =>
                <div className={makeDayClassName(activity, dayOfTheMonth.dayNumber)}>
                  <section
                    key={i}
                    className={makeTaskClassName(activity, dayOfTheMonth.dayNumber)}
                    style={{
                      alignSelf: "center",
                      background: activity.attendance === activity.maxAttendance ? `${activity.color}` : `${activity.border}`,
                      color: activity.attendance === activity.maxAttendance ? `${activity.border}` : "white"
                    }}
                    onClick={(event) => changeDisplayEditModal(event, activity, dayOfTheMonth.dayNumber)}>
                    {new Date(activity.startDate).getDate() === dayOfTheMonth.dayNumber ? activity.text : null}{activity.id}
                  </section>
                </div>
              )
          }
          {activitiesData
            .filter(activity =>
              new Date(activity.startDate) <= new Date(`2021-${dayOfTheMonth.month}-${dayOfTheMonth.dayNumber}`) &&
              new Date(activity.endDate) >= new Date(`2021-${dayOfTheMonth.month}-${dayOfTheMonth.dayNumber}`))
            .length > 1 ?
            <Dropdown text='More' multiple icon='add'>
              <Dropdown.Menu color="#cc99ff">
                <Dropdown.Menu scrolling>
                  {activitiesData
                    .filter(activity =>
                      new Date(activity.startDate).getDate() <= dayOfTheMonth.dayNumber &&
                      new Date(activity.endDate).getDate() >= dayOfTheMonth.dayNumber &&
                      new Date(activity.startDate).getMonth() + 1 <= dayOfTheMonth.month &&
                      new Date(activity.endDate).getMonth() + 1 >= dayOfTheMonth.month)
                    .slice(1)
                    .map((activity, i) => (
                      <Dropdown.Item>
                        <section
                          key={i}
                          className={makeTaskClassName(activity, dayOfTheMonth.dayNumber)}
                          style={{
                            background: activity.attendance === activity.maxAttendance ? `${activity.color}` : `${activity.border}`,
                            color: activity.attendance === activity.maxAttendance ? `${activity.border}` : "white"
                          }}
                          onClick={(event) => changeDisplayEditModal(event, activity)}>
                          {activity.text}{activity.id}
                        </section>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown> : null}
        </section>
      )}
    </div>

    <Modal
      size="tiny"
      open={showEditModal}
      onClose={changeDisplayEditModal}
      onOpen={changeDisplayEditModal}
      closeOnDimmerClick={false}
    >
      {showEditMode ?
        <>
          {selectedActivity.id ?
            <Modal.Header>Edit event</Modal.Header> :
            <Modal.Header>Add event</Modal.Header>}
          <Modal.Content>
            <p>Choose a course</p>
            <Dropdown
              selection
              value={selectedCourse}
              options={courses}
              onChange={changeCourse} />
            <br />
            <br />
            <p>Choose a trainer</p>
            <Dropdown
              selection
              value={selectedTrainer}
              options={trainersToChoose}
              onChange={changeTrainer} />
            <p>Choose a start date</p>
            <Input type="date" value={startDate} onChange={changeStartDate} />
            <p>Choose an end date</p>
            <Input type="date" value={endDate} onChange={changeEndDate} />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={selectedActivity.id ? changeShowEditMode : changeDisplayModal}>
              Cancel
            </Button>
            <Button positive onClick={selectedActivity.id ? onEditActivity : onAddActivity}>
              Save
            </Button>
          </Modal.Actions>
        </>
        :
        <>
          <Modal.Header>
            {selectedActivity.text}
            {gymId ?
              <>
                <Icon name='pencil' color="grey" onClick={changeShowEditMode} />
                <Icon name='trash' color="red" onClick={onDeleteActivity} />
                <Icon name='cancel' color="grey" onClick={changeDisplayEditModal} />
              </> : null}
          </Modal.Header>
          <Modal.Content>
            <div>
              <h4>Spots available: {selectedActivity.maxAttendance - selectedActivity.attendance}</h4>
              <Header size="small">Trainers</Header>
              <List horizontal>
                <List.Item>
                  <Image avatar src={selectedActivity.trainerImage} />
                  <List.Content>
                    <List.Header>{selectedActivity.trainerName}</List.Header>
                  </List.Content>
                </List.Item>
              </List>
              <br />
              <Button
                floated="right"
                color={selectedActivity.maxAttendance === selectedActivity.attendance ? "red" : "blue"}
                onClick={attendCourse}>
                Attend course</Button>
              <br />
            </div>
          </Modal.Content>
        </>}
    </Modal>
  </div>
}
export default CoursesCalendar