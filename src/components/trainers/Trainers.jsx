import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Card, Image, List, Rating } from 'semantic-ui-react'
import AddButton from '../buttons/AddButton';
import { Portal } from 'react-portal'

const Trainers = () => {
  const location = useLocation()
  const selectTrainers = state => state.trainers
  const selectIsToolbarReady = state => state.toolbar
  const { trainers } = useSelector(selectTrainers)
  const { isToolbarReady } = useSelector(selectIsToolbarReady)
  const [displayStyle, setDisplayStyle] = useState(false);
  const [trainerSearched, setTrainerSearched] = useState('');
  const [filterCriteria, setFilterCriteria] = useState("name");
  const [orderCriteria, setOrderCriteria] = useState("name");
  // const onChangeDisplay = () => setDisplayStyle(!displayStyle)
  // const onSearchGym = (event) => {
  //   setGymSearched(event.target.value)
  // }
  // const changeFilterCriteria = (filter) => {
  //   setGymSearched('')
  //   console.log(filter)
  //   setFilterCriteria(filter)
  // }
  // const changeOrderCriteria = (criteria) => {
  //   console.log(criteria)
  //   setOrderCriteria(criteria)
  // }
  // const filterGyms = (gym) => {
  //   if (filterCriteria === "name") {
  //     return gym.name.toLowerCase().includes(gymSearched.toLowerCase())
  //   }
  //   else if (filterCriteria === "tag") {
  //     let foundGym = false
  //     for (let index = 0; index < gym.tags.length; index++) {
  //       if (gym.tags[index].toLowerCase().includes(gymSearched.toLowerCase())) {
  //         foundGym = true
  //         break
  //       }
  //     }
  //     return foundGym
  //   }
  // }
  // const orderGyms = (gym1, gym2) => {
  //   if (orderCriteria === "name") {
  //     return gym1.name > gym2.name ? 1 : -1
  //   }
  //   else if (orderCriteria === "rating") {
  //     return gym1.rating > gym2.rating ? 1 : -1
  //   }
  //   else if (orderCriteria === "reviews") {
  //     return gym1.reviews.length > gym2.reviews.length ? 1 : -1
  //   }
  // }
  // useEffect(
  //   () => console.log("gyms", gyms),
  //   [gyms],
  // );
  // useEffect(
  //   () => console.log("isToolbarReady", isToolbarReady),
  //   [isToolbarReady],
  // );

  // let { url } = useRouteMatch();

  return (
    <div>
      {/* <h2>Gyms</h2>
      <input
        onChange={onSearchGym}
        value={gymSearched} />
      <br />
      <br />
      <button onClick={changeFilterCriteria.bind(this, "name")}>Filter by name</button>
      <button onClick={changeFilterCriteria.bind(this, "location")}>Filter by location</button>
      <button onClick={changeFilterCriteria.bind(this, "tag")}>Filter by tag</button>
      <br />
      <br />
      <button onClick={changeOrderCriteria.bind(this, "name")}>Alphabetic order</button>
      <button onClick={changeOrderCriteria.bind(this, "rating")}>Order by rating</button>
      <button onClick={changeOrderCriteria.bind(this, "reviews")}>Order by reviews</button>
      <br />
      <br />
      <button onClick={onChangeDisplay}>Choose display</button>
      <br />
      {displayStyle === true ?
        <div>
          <h3>Please select a gym.</h3>
          <List selection verticalAlign='middle'>
            {gyms.filter(gym => filterGyms(gym)).sort((gym1, gym2) => orderGyms(gym1, gym2)).map((gym) => (
              <List.Item key={gym.id}>
                <Image avatar src={gym.image} />
                <List.Content>
                  <List.Header as={Link} to={`${url}/${gym.name}`}>{gym.name}</List.Header>
                  <List.Description>{gym.address}</List.Description>
                  <Rating icon='star' defaultRating={gym.rating} maxRating={5} disabled />
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
        :
        <div>
          <h3>Please select a gym.</h3>
          <Card.Group itemsPerRow={3}>
            {gyms.filter(gym => filterGyms(gym)).sort((gym1, gym2) => orderGyms(gym1, gym2)).map((gym) => (
              <Card key={gym.id}>
                <Image src={gym.image} as={Link} to={`${url}/${gym.name}`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{gym.name}</Card.Header>
                  <Card.Description>{gym.address}</Card.Description>
                  <Card.Meta>
                    {gym.tags.map((tag, index) =>
                      <p key={index}>{tag}</p>
                    )}
                    <Rating icon='star' defaultRating={gym.rating} maxRating={5} disabled />
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      }
      <br />
      <button onClick={showStore}>Show store</button>
      {isToolbarReady &&
        <Portal node={document.getElementById("operationSection")}>
          <AddButton path={location.pathname} />
        </Portal>} */}
    </div>
  );
}
export default Trainers;