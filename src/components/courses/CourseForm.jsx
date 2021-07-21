import React, { useState } from "react";
import { Form, Menu, Dropdown, Input, Label, Grid, Icon, GridColumn } from 'semantic-ui-react'
import { Portal } from 'react-portal'
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addCourse, editCourse } from '../../store/actions/courses'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const CourseForm = (props) => {
  const params = useParams()
  const courseToEdit = useSelector(state =>
    state.courses.courses.find(course => course.id + '' === params.courseId)
  )
  const selectTrainers = state => state.trainers.trainers
  const trainers = useSelector(selectTrainers)
    .map(({ id, name, image }) => ({ key: id, text: name, value: id, image: image }))
  const id = courseToEdit ? courseToEdit.id : ''
  const gymId = courseToEdit ? courseToEdit.gymId : params.gymId
  const rating = courseToEdit ? courseToEdit.rating : 0
  const [name, setName] = useState(courseToEdit ? courseToEdit.name : '')
  const [description, setDescription] = useState(courseToEdit ? courseToEdit.description : '')
  const [image, setImage] = useState(courseToEdit ? courseToEdit.image : '')
  const [trainersId, setTrainersId] = useState(courseToEdit ? courseToEdit.trainersId : [])
  const [selectedColor, setSelectedColor] = useColor("hex", courseToEdit ? courseToEdit.color : "#121212");
  const [selectedColor1, setSelectedColor1] = useColor("hex", "#121212");
  const [isVisibleColorPicker, setIsVisibleColorPicker] = useState(false)
  let courseToEditTags = ''
  if (courseToEdit) {
    courseToEditTags = courseToEdit.tags.join(", ")
  }
  const [tags, setTags] = useState(courseToEditTags);

  const location = useLocation()
  const dispatch = useDispatch()

  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  const changeName = (event) => {
    setName(event.target.value)
  }
  const changeDescription = (event) => {
    setDescription(event.target.value)
  }
  const changeImage = (event) => {
    setImage(event.target.value)
  }
  const changeTags = (event) => {
    setTags(event.target.value)
  }

  const onSubmit = () => {
    let tagsArray = tags.split(',');
    let course =
    {
      gymId,
      name,
      description,
      image,
      tags: tagsArray,
      rating,
      trainersId,
      color: selectedColor.hex
    }

    if (props.mode === "add") {
      dispatch(addCourse(course))
    }
    else if (props.mode === "edit") {
      let courseEdited =
      {
        id,
        gymId,
        name,
        description,
        image,
        tags: tagsArray,
        rating,
        trainersId,
        color: selectedColor.hex
      }
      dispatch(editCourse(courseEdited))
    }
  }
  const handleChange = (e, { value }) => {
    setTrainersId(value)
  }
  const displayColorPicker = () => {
    setIsVisibleColorPicker(!isVisibleColorPicker)
  }
  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <Input
          placeholder='Name'
          value={name}
          onChange={changeName} />
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <Input
          placeholder='Description'
          value={description}
          onChange={changeDescription} />
      </Form.Field>
      <Form.Field>
        <label>Image</label>
        <Input
          placeholder='Image'
          value={image}
          onChange={changeImage} />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input
          placeholder='Tags'
          value={tags}
          onChange={changeTags} />
      </Form.Field>
      <Form.Field>
        <label>Trainers</label>
        <Dropdown
          placeholder='Select trainers'
          fluid
          multiple selection
          value={trainersId}
          onChange={handleChange}
          options={trainers}
        />
      </Form.Field>
      <Grid>
        <Grid.Row columns={3} className="color-picker-grid">
          <h5>Course color</h5>
          <div onClick={displayColorPicker} >
          <Label circular size="mini" className="color-label-course-form" style={{
            backgroundColor: `${selectedColor.hex}`
          }} />
          <Icon
            name={isVisibleColorPicker ? 'cancel' : 'pencil'}
            color={isVisibleColorPicker ? 'red' : 'grey'}
            className="color-icon-course-form" />
            </div>
          {isVisibleColorPicker ?
            <ColorPicker width={256} height={128} color={selectedColor} onChange={setSelectedColor} hideHSV hideRGB dark />
            : null}
        </Grid.Row>
      </Grid>
      
      {isToolbarReady && <Portal node={document.getElementById("operationSection")}>
        <Menu.Item>
          <SaveButton onSubmit={onSubmit} path={location.pathname} mode={props.mode} />
        </Menu.Item>
        <Menu.Item>
          <CancelButton path={location.pathname} mode={props.mode} />
        </Menu.Item>
      </Portal>}
    </Form>

  );
}
export default CourseForm