import React, { useState, useEffect } from "react";
import { Dropdown, Modal, Button, Input, Header, List, Image, Label, Icon, Grid } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { addActivity, editActivity, deleteActivity } from '../store/actions/activities'
import moment from 'moment'

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
        color: course.color
      }))
  )
  const courses = useSelector(state =>
    state.courses.courses
      .filter(course => course.gymId + '' === gymId)
      .map(course => ({
        key: course.id,
        value: course.id,
        text: course.name,
        color: course.color
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

  const [selectedMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [daysOfTheMonth, setDaysOfTheMonth] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedActivity, setSelectedActivity] = useState({})
  const [selectedCourse, setSelectedCourse] = useState()
  const [maxAttendance, setMaxAttendance] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTrainer, setSelectedTrainer] = useState()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditMode, setShowEditMode] = useState(false)

  const changeDisplayModal = (day) => {
    setSelectedCourse('')
    setSelectedTrainer('')
    setStartDate(`2021-${('0' + day.month).slice(-2)}-${('0' + day.dayNumber).slice(-2)}`)
    setEndDate(`2021-${('0' + day.month).slice(-2)}-${('0' + day.dayNumber).slice(-2)}`)
    setMaxAttendance(0)
    setSelectedActivity({})
    if (day.dayNumber) {
      setSelectedDay(day.dayNumber)
    }
    if (!userId)
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
    setMaxAttendance(selectedActivity.maxAttendance)
    setStartDate(selectedActivity.startDate)
    setEndDate(selectedActivity.endDate)
    setShowEditMode(!showEditMode)
  }
  const onAddActivity = () => {
    if (maxAttendance >= 0) {
      let activity = {
        gymId: parseInt(gymId),
        courseId: parseInt(selectedCourse),
        trainerId: parseInt(selectedTrainer),
        currentAttendance: 0,
        maxAttendance: parseInt(maxAttendance),
        startDate: startDate,
        endDate: endDate,
        userIds: []
      }
      dispatch(addActivity(activity))
      setShowEditModal(false)
      setShowEditMode(false)
    }
  }
  const onEditActivity = () => {
    if (maxAttendance > selectedActivity.currentAttendance) {
      let activity = {
        id: selectedActivity.id,
        gymId: parseInt(gymId),
        courseId: parseInt(selectedCourse),
        trainerId: parseInt(selectedTrainer),
        maxAttendance: parseInt(maxAttendance),
        currentAttendance: selectedActivity.currentAttendance,
        startDate: startDate,
        endDate: endDate,
        userIds: selectedActivity.userIds
      }
      let course = courses.find(course => course.key === parseInt(selectedCourse))
      let trainer = trainers.find(trainer => trainer.trainerId === parseInt(selectedTrainer))
      let activityToDisplay = { ...selectedActivity, startDate: startDate, maxAttendance: maxAttendance, endDate: endDate, text: course.text, trainerName: trainer.trainerName, trainerImage: trainer.trainerImage }
      dispatch(editActivity(activity))
      setSelectedActivity(activityToDisplay)
      setShowEditMode(false)
    }
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
  const changeMaxAttendance = (e, { value }) => {
    setMaxAttendance(value)
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
    if (selectedActivity.currentAttendance < selectedActivity.maxAttendance) {
      activity = {
        id: selectedActivity.id,
        gymId: selectedActivity.gymId,
        courseId: parseInt(selectedActivity.courseId),
        trainerId: parseInt(selectedActivity.trainerId),
        currentAttendance: ++selectedActivity.currentAttendance,
        maxAttendance: selectedActivity.maxAttendance,
        startDate: selectedActivity.startDate,
        endDate: selectedActivity.endDate,
        userIds: selectedActivity.userIds
      }
      activity.userIds.push(1)
    }
    dispatch(editActivity(activity))
  }
  const leaveCourse = () => {
    let activity = {}
    activity = {
      id: selectedActivity.id,
      gymId: selectedActivity.gymId,
      courseId: parseInt(selectedActivity.courseId),
      trainerId: parseInt(selectedActivity.trainerId),
      currentAttendance: --selectedActivity.currentAttendance,
      maxAttendance: selectedActivity.maxAttendance,
      startDate: selectedActivity.startDate,
      endDate: selectedActivity.endDate,
      userIds: selectedActivity.userIds
    }
    var index = activity.userIds.indexOf(1);
    if (index >= 0) {
      activity.userIds.splice(index, 1);
    }
    dispatch(editActivity(activity))
    setShowEditModal(false)
  }
  const makeTaskClassName = (activity, day) => {
    if (new Date(activity.startDate).getDate() === day && new Date(activity.endDate).getDate() === day) {
      return "task task--first-day task--last-day short-text"
    }
    else
      if (new Date(activity.startDate).getDate() === day) {
        return "task task--first-day short-text"
      }
      else
        if (new Date(activity.endDate).getDate() === day) {
          return "task task--last-day"
        }
        else
          return "task task--one-day short-text"
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
  const filterActivities = (activity, dayOfTheMonth) => {
    const currentDay =
      new Date(`2021-${('0' + dayOfTheMonth.month).slice(-2)}-${('0' + dayOfTheMonth.dayNumber).slice(-2)}`)
    return new Date(activity.startDate) <= currentDay && new Date(activity.endDate) >= currentDay
  }

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
          onClick={() => changeDisplayModal(dayOfTheMonth)}
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
              .filter((activity) => filterActivities(activity, dayOfTheMonth))
              .slice(0, 1)
              .map((activity, i) =>
                <div className={makeDayClassName(activity, dayOfTheMonth.dayNumber)}>
                  <section
                    key={i}
                    className={makeTaskClassName(activity, dayOfTheMonth.dayNumber) + ' ' + "activityDisplayed"}
                    style={{
                      background: `${activity.color}`,
                      opacity: activity.currentAttendance === activity.maxAttendance ||
                        new Date(activity.endDate) < new Date() ?
                        0.5 : 1
                    }}
                    onClick={(event) => changeDisplayEditModal(event, activity, dayOfTheMonth.dayNumber)}>
                    {new Date(activity.startDate).getDate() === dayOfTheMonth.dayNumber ? activity.text : null}
                  </section>
                </div>
              )
          }
          {activitiesData
            .filter((activity) => filterActivities(activity, dayOfTheMonth))
            .length > 1 ?
            <Dropdown text='More' multiple icon='add'>
              <Dropdown.Menu color="#cc99ff">
                <Dropdown.Menu scrolling>
                  {activitiesData
                    .filter((activity) => filterActivities(activity, dayOfTheMonth))
                    .slice(1)
                    .map((activity, i) => (
                      <Dropdown.Item>
                        <Label
                          horizontal
                          key={i}
                          className={makeTaskClassName(activity, dayOfTheMonth.dayNumber) + ' ' + "moreActivities"}
                          style={{
                            background: `${activity.color}`,
                            opacity: activity.currentAttendance === activity.maxAttendance ||
                              new Date(activity.endDate) < new Date() ?
                              0.5 : 1
                          }}
                          onClick={(event) => changeDisplayEditModal(event, activity)}>
                          {activity.text}
                        </Label>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
            : null}
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
            <h4>Choose a course</h4>
            <Dropdown
              selection
              value={selectedCourse}
              options={courses}
              onChange={changeCourse} />
            <h4>Maximum attendance</h4>
            <Input type="number" min={0} value={maxAttendance} onChange={changeMaxAttendance} />
            <h4>Choose a trainer</h4>
            <Dropdown
              selection
              value={selectedTrainer}
              options={trainersToChoose}
              onChange={changeTrainer} />
            <h4>Choose a start date</h4>
            <Input type="date" value={startDate} onChange={changeStartDate} />
            <h4>Choose an end date</h4>
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
            <Grid>
              <Grid.Column width={8}>
                <Header as='h2'>
                  <Label circular
                    size="mini"
                    className="course-label"
                    style={{
                      backgroundColor: `${selectedActivity.color}`
                    }}
                  />
                  {selectedActivity.text}
                </Header>
              </Grid.Column>
              <Grid.Column floated="right" width={4}>
                {gymId ?
                  <>
                    <Icon className="activityIcon" name='pencil' color="grey" onClick={changeShowEditMode} />
                    <Icon className="activityIcon" name='trash' color="red" onClick={onDeleteActivity} />
                  </> : null}
                <Icon className="activityIcon" name='cancel' color="grey" onClick={changeDisplayEditModal} />
              </Grid.Column>
            </Grid>
          </Modal.Header>
          <Modal.Content>
            <div>
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column width={1}>
                    <Icon name="calendar alternate outline" color="grey" size="large" />
                  </Grid.Column>
                  <Grid.Column>
                    {new Date(selectedActivity.startDate).getMonth() === new Date(selectedActivity.endDate).getMonth() ?
                      <h3>
                        {moment(selectedActivity.startDate).format("D")}{`  `}-
                        {`  `}{moment(selectedActivity.endDate).format("D")}{`  `}
                        {moment(selectedActivity.startDate).format("MMMM")}{`  `}
                        {new Date(selectedActivity.startDate).getFullYear()}
                      </h3>
                      :
                      <h3>
                        {moment(selectedActivity.startDate).format("D MMMM")}{`  `}-
                        {`  `}{moment(selectedActivity.endDate).format("D MMMM")}{`  `}
                        {new Date(selectedActivity.startDate).getFullYear()}
                      </h3>}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column width={1}>
                    <Icon name="id badge outline" color="grey" size="large" />
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Trainers</Header>
                    <List horizontal>
                      <List.Item>
                        <Image avatar src={selectedActivity.trainerImage} />
                        <List.Content>
                          <List.Header>{selectedActivity.trainerName}</List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={1}>
                    <Icon
                      name=
                      {selectedActivity.maxAttendance === selectedActivity.currentAttendance ||
                        new Date(selectedActivity.endDate) < new Date() ?
                        "minus circle" :
                        "check circle outline"
                      }
                      color=
                      {selectedActivity.maxAttendance === selectedActivity.currentAttendance ||
                        new Date(selectedActivity.endDate) < new Date() ?
                        "red" :
                        "green"
                      }
                      size="large" />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <h3>Spots available: {selectedActivity.maxAttendance - selectedActivity.currentAttendance}</h3>
                  </Grid.Column>
                  {gymId ?
                    <Button
                      floated="right"
                      color="blue"
                      disabled={selectedActivity.maxAttendance === selectedActivity.currentAttendance ||
                        new Date(selectedActivity.endDate) < new Date() ?
                        true : false}
                      onClick={attendCourse}>
                      Attend course</Button> : null}
                  {userId ?
                    <Button
                      floated="right"
                      color="blue"
                      onClick={leaveCourse}>
                      Leave course</Button> : null}
                </Grid.Row>
              </Grid>
            </div>
          </Modal.Content>
        </>}
    </Modal>
  </div>
}
export default CoursesCalendar