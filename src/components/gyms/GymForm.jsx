import React, { useState } from "react";
import { Form, Menu } from 'semantic-ui-react'
import { Portal } from 'react-portal'
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addGymAsync, editGymAsync } from '../../store/reducers/gyms'

const GymForm = (props) => {
  const params = useParams()
  const gymToEdit = useSelector(state =>
    state.gyms.gyms.find(gym => gym._id + '' === params.gymId)
  )
  const [id, setId] = useState(gymToEdit ? gymToEdit._id : '');
  const [name, setName] = useState(gymToEdit ? gymToEdit.name : '');
  const rating = gymToEdit ? gymToEdit.rating : 0
  const [address, setAddress] = useState(gymToEdit ? gymToEdit.address : '');
  const [description, setDescription] = useState(gymToEdit ? gymToEdit.description : '');
  const [image, setImage] = useState(gymToEdit ? gymToEdit.image : '');
  let gymToEditTags = ''

  if (gymToEdit) {
    gymToEditTags = gymToEdit.tags.join(", ")
  }
  const [tags, setTags] = useState(gymToEditTags);

  const location = useLocation()
  const dispatch = useDispatch()

  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  const changeName = (event) => {
    setName(event.target.value)
  }
  const changeAddress = (event) => {
    setAddress(event.target.value)
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
    let gym = {
      name,
      address,
      description,
      image,
      tags: tagsArray,
      rating
    }
    if (props.mode === "add") {
      dispatch(addGymAsync(
        "http://localhost:8000/gyms",
        gym))
    }
    else if (props.mode === "edit") {
      let gymEdited = {
        id,
        name,
        address,
        description,
        image,
        tags: tagsArray,
        rating
      }
      dispatch(editGymAsync(
        `http://localhost:8000/gyms/${params.gymId}`,
        gymEdited))
    }
  }

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Name' value={name} onChange={changeName} />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <input placeholder='Address' value={address} onChange={changeAddress} />
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
export default GymForm;