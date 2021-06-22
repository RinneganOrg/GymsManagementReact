import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Card, Image, List, Menu, Rating } from 'semantic-ui-react'
import AddButton from '../buttons/AddButton';
import { Portal } from 'react-portal'

// To Do 
// 1. show links from store done
// 2. implement cards/list from store done
// 3. fct de search done
// 4. ordonare done
// 5. filtrare left the location

const Gyms = () => {
  console.log(document.getElementById("operationSection"))
  const location = useLocation()
  console.log("location", location.pathname)
  const selectGyms = state => state.gyms
  const selectIsToolbarReady = state => state.toolbar
  const { gyms } = useSelector(selectGyms)
  const { isToolbarReady } = useSelector(selectIsToolbarReady)
  console.log(isToolbarReady)
  const showStore = () => console.log(gyms)
  const [displayStyle, setDisplayStyle] = useState(false);
  const [gymSearched, setGymSearched] = useState('');
  const [filterCriteria, setFilterCriteria] = useState("name");
  const [orderCriteria, setOrderCriteria] = useState("name");
  const onChangeDisplay = () => setDisplayStyle(!displayStyle)
  const onSearchGym = (event) => {
    setGymSearched(event.target.value)
  }
  const changeFilterCriteria = (filter) => {
    setGymSearched('')
    console.log(filter)
    setFilterCriteria(filter)
  }
  const changeOrderCriteria = (criteria) => {
    console.log(criteria)
    setOrderCriteria(criteria)
  }
  const filterGyms = (gym) => {
    if (filterCriteria === "name") {
      return gym.name.toLowerCase().includes(gymSearched.toLowerCase())
    }
    else if (filterCriteria === "tag") {
      let foundGym = false
      for (let index = 0; index < gym.tags.length; index++) {
        if (gym.tags[index].toLowerCase().includes(gymSearched.toLowerCase())) {
          foundGym = true
          break
        }
      }
      return foundGym
    }
  }
  const orderGyms = (gym1, gym2) => {
    if (orderCriteria === "name") {
      return gym1.name > gym2.name ? 1 : -1
    }
    else if (orderCriteria === "rating") {
      return gym1.rating > gym2.rating ? 1 : -1
    }
    else if (orderCriteria === "reviews") {
      return gym1.reviews.length > gym2.reviews.length ? 1 : -1
    }
  }
  useEffect(
    () => console.log("gyms", gyms),
    [gyms],
  );
  useEffect(
    () => console.log("isToolbarReady", isToolbarReady),
    [isToolbarReady],
  );

  let { url } = useRouteMatch();

  return (
    <div>
      <h2>Gyms</h2>
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
                  <List.Header as={Link} to={`${url}/${gym.id}`}>{gym.name}</List.Header>
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
                <Image src={gym.image} as={Link} to={`${url}/${gym.id}`} wrapped ui={false} />
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
          <Menu.Item>
          <AddButton path={location.pathname} />
          </Menu.Item>
        </Portal>}
    </div>
  );
}
export default Gyms;