import React, { useState, useEffect } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Card, Image, List, Menu, Rating, Input, Dropdown, Button } from 'semantic-ui-react'
import AddButton from '../buttons/AddButton';
import { Portal } from 'react-portal'
import { setTrainersAsync } from "../../store/reducers/trainers";

const Trainers = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [displayStyle, setDisplayStyle] = useState(false)
  const [trainerSearched, setTrainerSearched] = useState('')
  const [filterCriteria, setFilterCriteria] = useState("name")
  const [orderCriteria, setOrderCriteria] = useState("name")

  const onChangeDisplay = () => setDisplayStyle(!displayStyle)
  const selectTrainers = state => state.trainers.trainers
    .filter(trainer => params.gymId ? trainer.gymId + '' === params.gymId : true)
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)
  const trainers = useSelector(selectTrainers)
  const onSearchTrainer = (event) => {
    setTrainerSearched(event.target.value)
  }
  const changeFilterCriteria = (filter) => {
    setTrainerSearched('')
    setFilterCriteria(filter)
  }
  const changeOrderCriteria = (criteria) => {
    setOrderCriteria(criteria)
  }
  const filterTrainers = (trainer) => {
    if (filterCriteria === "name") {
      return trainer.name.toLowerCase().includes(trainerSearched.toLowerCase())
    }
    else if (filterCriteria === "tag") {
      let foundTrainer = false
      for (let index = 0; index < trainer.tags.length; index++) {
        if (trainer.tags[index].toLowerCase().includes(trainerSearched.toLowerCase())) {
          foundTrainer = true
          break
        }
      }
      return foundTrainer
    }
  }
  const orderTrainers = (trainer1, trainer2) => {
    if (orderCriteria === "name") {
      return trainer1.name > trainer2.name ? 1 : -1
    }
    else if (orderCriteria === "rating") {
      return trainer1.rating > trainer2.rating ? 1 : -1
    }
    else if (orderCriteria === "reviews") {
      return trainer1.reviews.length > trainer2.reviews.length ? 1 : -1
    }
  }

  useEffect(
    () => {
        dispatch(setTrainersAsync(
          `http://localhost:8000/trainers`
        ))
    }
    ,
    []
  )

  return (
    <div>
      {params.gymId ?
        <Button
          basic
          circular
          icon='arrow left'
          color="blue"
          as={Link}
          to={`/gyms/${params.gymId}`}
          size="small" />
        : null}
      <h2>Trainers</h2>
      <Menu icon secondary>
        <Input
          icon='search'
          placeholder='Search...'
          onChange={onSearchTrainer}
          value={trainerSearched} />
        <Dropdown item icon='filter'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='edit'
              text='Filter by name'
              onClick={() => changeFilterCriteria("name")} />
            <Dropdown.Item
              icon='tag'
              text='Filter by tag'
              onClick={() => changeFilterCriteria("tag")} />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item icon='sort'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='sort alphabet down'
              text='Order by name'
              onClick={() => changeOrderCriteria("name")} />
            <Dropdown.Item
              icon='sort numeric down'
              text='Order by rating'
              onClick={() => changeOrderCriteria("rating")} />
            <Dropdown.Item
              icon='sort amount down'
              text='Order by reviews'
              onClick={() => changeOrderCriteria("reviews")} />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item icon='block layout'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='list layout'
              text='List'
              onClick={onChangeDisplay} />
            <Dropdown.Item
              icon='grid layout'
              text='Grid'
              onClick={onChangeDisplay} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      {displayStyle === true ?
        <div>
          <h3>Please select a trainer.</h3>
          <List selection verticalAlign='middle'>
            {trainers && trainers.length >= 0 ?
              trainers.filter(trainer =>
                filterTrainers(trainer))
                .sort((trainer1, trainer2) => orderTrainers(trainer1, trainer2))
                .map((trainer) => (
                  <List.Item key={trainer._id}>
                    <Image avatar src={trainer.image} />
                    <List.Content>
                      <List.Header as={Link} to={`${trainer._id}`}>{trainer.name}</List.Header>
                      <Rating icon='star' defaultRating={trainer.rating} maxRating={5} disabled />
                      {trainer.tags.map((tag, index) =>
                        <p key={index}>{tag}</p>
                      )}
                    </List.Content>
                  </List.Item>
                )) : null}
          </List>
        </div>
        :
        <div>
          <h3>Please select a trainer.</h3>
          <Card.Group itemsPerRow={3}>
            {trainers && trainers.length >= 0 ?
              trainers.filter(trainer =>
                filterTrainers(trainer))
                .sort((trainer1, trainer2) => orderTrainers(trainer1, trainer2))
                .map((trainer) => (
                  <Card key={trainer._id} as={Link} to={`${trainer._id}`}>
                    <Image src={trainer.image} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{trainer.name}</Card.Header>
                      <Card.Meta>
                        {trainer.tags.map((tag, index) =>
                          <p key={index}>{tag}</p>
                        )}
                        <Rating icon='star' defaultRating={trainer.rating} maxRating={5} disabled />
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                )) : null}
          </Card.Group>
        </div>
      }
      {isToolbarReady && document.getElementById("operationSection") &&
        <Portal node={document.getElementById("operationSection")}>
          <Menu.Item>
            <AddButton />
          </Menu.Item>
        </Portal>}
      <br />
    </div>
  );
}
export default Trainers;