import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Link,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Card, Image, List, Menu, Rating, Input, Dropdown } from 'semantic-ui-react'
import AddButton from '../buttons/AddButton';
import { Portal } from 'react-portal'
import { setGyms } from '../../store/actions/gyms'
import { setTrainers } from "../../store/actions/trainers"

const MiniComponent = ({ counter }) => {
  // let x = 0
  const [x, setX] = useState(0)
  useEffect(() => setX(x + counter)
    , [counter])
  // const increment = () => x = counter + x
  // console.log(x)
  return (<p>{x}</p>)

}
const Gyms = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const selectGyms = state => state.gyms
  const selectIsToolbarReady = state => state.toolbar
  const { gyms } = useSelector(selectGyms)
  const { isToolbarReady } = useSelector(selectIsToolbarReady)
  const [displayStyle, setDisplayStyle] = useState(false);
  const [gymSearched, setGymSearched] = useState('');
  const [filterCriteria, setFilterCriteria] = useState("name");
  const [orderCriteria, setOrderCriteria] = useState("name");
  const onChangeDisplay = () => setDisplayStyle(!displayStyle)
  const onSearchGym = (event) => {
    setGymSearched(event.target.value)
  }
  const changeFilterCriteria = (filter) => {
    setFilterCriteria(filter)
  }
  const changeOrderCriteria = (criteria) => {
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
  let { url } = useRouteMatch();


  // const getData = () => {
  //   dispatch(setGyms(
  //     "http://localhost:8000/gyms",
  //     {
  //       'Content-Type': 'application/json'
  //     }
  //   ))
  // }

  // const memoizedValue = useMemo(() => getData(), []);
  // console.log(memoizedValue)
  
  //AICI SUNT
  useEffect(
    () => {
      dispatch(setGyms())
    }
    ,
    []
  )

  // const fetchData = () => {
  //   // Imagine here an API call which returns a random number
  //   return Math.random();
  // }

  // const fetchData = () => {
  //   return dispatch(setGyms(
  //     "http://localhost:8000/gyms",
  //     {
  //       'Content-Type': 'application/json'
  //     }
  //   ))
  // }
  // // const runHeavyCalc = data => {
  //   //   if (!data) return;
  //   //   console.log('Computing heavy func with data', data);
  //   //   return data * 100
  //   // }
  //   const [count, setCount] = useState(0);
  //   const [currentWeatherr, setWeatherElement] = useState({});
  //   console.log('App rendered with count', count);
  //   const fetchDataa = useCallback(() => {
  //     const fetchingData = async () => {
  //     const currentWeather = await fetchData()
  //     console.log(currentWeather)
  //     setWeatherElement(currentWeather);
  //   };
  //   fetchingData();
  // }, []);
  // // console.log(currentWeatherr)
  // // useEffect(() => {
  // //   console.log('execute function in useEffect');
  // //   fetchDataa();
  // // }, [fetchDataa]);

  // useEffect(() => {
  //   console.log('execute function in useEffect');
  //   dispatch(setGyms(
  //     "http://localhost:8000/gyms",
  //     {
  //       'Content-Type': 'application/json'
  //     }
  //   ))
  // }, [fetchDataa]);
  // // useEffect(() => {
  // //   // fetchData();
  // // }, [])

  // // useEffect(() => {
  // //   const data = fetchData();
  // //   setData(data);
  // // }, [])
  // // const result = runHeavyCalc(data);
  // // const result = useMemo(() => runHeavyCalc(data), []);
  // // const memoizedCallback = useCallback(
  // //   () => {
  // //     console.log("dana")
  // //     fetchData()
  // //   },
  // //   [gyms],
  // // );



  ////Tutorial 1
  
  
  // const fetchData = () => {
  //   return fetch("http://localhost:8000/gyms",
  //   {
  //     'Content-Type': 'application/json'
  //   })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     // console.log(result)
  //     return result.data.length
  //   })
  // }
  // const runHeavyCalc = data => {
  //   if (!data) return;
  //   // console.log('Computing heavy func with data', data);
  //   return Math.floor(data * 100);
  // }
  // const [count, setCount] = useState(0);
  // const [data, setData] = useState();
  // // console.log('App rendered with count', count);
  // useEffect(async () => {
  //   console.log()
  //   const data = await fetchData();
  //   console.log("data", data)
  //   setData(data);
  // }, [])
  // const result = useMemo(() => runHeavyCalc(data), [data]);
  return (
    <div>
      {/* <p>Result: {result}</p> */}
      {/* <h1>Hello World</h1>
      <p>Counter: {count}</p>
      <MiniComponent counter={count} />
      {/* <p>Result is {currentWeatherr.name}</p> */}
      {/* <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button> */}
      <h2>Gyms</h2>
      <Menu icon secondary>
        <Input
          icon='search'
          placeholder='Search...'
          onChange={onSearchGym}
          value={gymSearched} />
        <Dropdown item icon='filter'>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='edit'
              text='Filter by name'
              onClick={() => changeFilterCriteria("name")} />
            <Dropdown.Item
              icon='point'
              text='Filter by location'
              onClick={() => changeFilterCriteria("location")} />
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
          <h3>Please select a gym.</h3>
          <List selection verticalAlign='middle'>
            {gyms && gyms.length >= 0 ? gyms.filter(gym => filterGyms(gym)).sort((gym1, gym2) => orderGyms(gym1, gym2)).map((gym) => (
              <List.Item key={gym._id}>
                <Image avatar src={gym.image} />
                <List.Content>
                  <List.Header as={Link} to={`${url}/${gym._id}`}>{gym.name}</List.Header>
                  <List.Description>{gym.address}</List.Description>
                  <Rating icon='star' defaultRating={gym.rating} maxRating={5} disabled />
                </List.Content>
              </List.Item>
            )) : null}
          </List>
        </div>
        :
        <div>
          <h3>Please select a gym.</h3>
          <Card.Group itemsPerRow={3}>
            {gyms && gyms.length >= 0 ? gyms.filter(gym => filterGyms(gym)).sort((gym1, gym2) => orderGyms(gym1, gym2)).map((gym) => (
              <Card key={gym._id}>
                <Image src={gym.image} as={Link} to={`${url}/${gym._id}`} wrapped ui={false} />
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
            )) : null}
          </Card.Group>
        </div>
      }
      <br />
      {isToolbarReady && document.getElementById("operationSection") &&
        <Portal node={document.getElementById("operationSection")}>
          <Menu.Item>
            <AddButton path={location.pathname} />
          </Menu.Item>
        </Portal>}
    </div>
  );
}
export default Gyms;