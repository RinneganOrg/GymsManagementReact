import React, { useState } from "react";
import { Form, Menu } from 'semantic-ui-react'
import { Portal } from 'react-portal'
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addTrainer, editTrainer } from '../../store/actions/trainers'

const TrainerForm = (props) => {
  const params = useParams()
  const trainerToEdit = useSelector(state =>
    state.trainers.trainers.find(trainer => trainer.id + '' === params.trainerId)
  )
  // const [id, setId] = useState(trainerToEdit ? trainerToEdit.id : '');
  const id = trainerToEdit ? trainerToEdit.id : ''
  const gymId = trainerToEdit ? trainerToEdit.gymId : params.gymId
  const rating = trainerToEdit ? trainerToEdit.rating : 0
  const [name, setName] = useState(trainerToEdit ? trainerToEdit.name : '')
  const [description, setDescription] = useState(trainerToEdit ? trainerToEdit.description : '')
  const [image, setImage] = useState(trainerToEdit ? trainerToEdit.image : '')
  let trainerToEditTags = ''

  if (trainerToEdit) {
    trainerToEditTags = trainerToEdit.tags.join(", ")
  }
  const [tags, setTags] = useState(trainerToEditTags);

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
    let trainer = { gymId, name, description, image, tags: tagsArray, rating }

    if (props.mode === "add") {
      dispatch(addTrainer(trainer))
    }
    else if (props.mode === "edit") {
      let trainerEdited = { id, gymId, name, description, image, tags: tagsArray, rating }
      dispatch(editTrainer(trainerEdited))
    }
  }

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Name' value={name} onChange={changeName} />
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input placeholder='Description' value={description} onChange={changeDescription} />
      </Form.Field>
      <Form.Field>
        <label>Image</label>
        <input placeholder='Image' value={image} onChange={changeImage} />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <input placeholder='Tags' value={tags} onChange={changeTags} />
      </Form.Field>
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
export default TrainerForm;