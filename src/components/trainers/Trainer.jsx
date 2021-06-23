import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Portal } from 'react-portal'
import { useSelector } from 'react-redux'
import EditButton from '../buttons/EditButton';
import Comments from "../comments/Comments";
import { Image, Menu } from 'semantic-ui-react'

const Trainer = () => {
  let { trainerId } = useParams()
  const trainerToDisplay = useSelector(state =>
    state.trainers.trainers.find(trainer => trainer.id + '' === trainerId)
  )
  const location = useLocation()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{trainerToDisplay.name}</h2>
      <Image src={trainerToDisplay.image} size='medium' centered />
      <p style={{ textAlign: 'center' }}>{trainerToDisplay.description}</p>
      <Comments trainerId={trainerToDisplay.id} />
      {isToolbarReady &&
        <>
          <Portal node={document.getElementById("operationSection")}>
            <Menu.Item>
              <EditButton path={location.pathname} />
            </Menu.Item>
          </Portal>
        </>
      }
    </div>
  );
}
export default Trainer;