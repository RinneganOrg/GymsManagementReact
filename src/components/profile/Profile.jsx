import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { Menu, Icon } from 'semantic-ui-react'
import { Portal } from 'react-portal'
import CoursesCalendar from "../CoursesCalendar";

const Profile = () => {
  let { userId } = useParams()
  const selectIsToolbarReady = state => state.toolbar
  const { isToolbarReady } = useSelector(selectIsToolbarReady)

  const [displaySection, setDisplaySection] = useState(false)
  const changeDisplayedSection = () => {
    setDisplaySection(!displaySection)
  }
  return <>
    <h3>Welcome to your profile</h3>
    {isToolbarReady &&
      <Portal node={document.getElementById("childrenSection")}>
        <Menu.Item>
          <Icon
            name="calendar alternate outline"
            size="big"
            color="black"
            onClick={() => changeDisplayedSection("calendar")} />
        </Menu.Item>
      </Portal>
    }
    {displaySection ?
      <CoursesCalendar userId={userId} /> : null}
  </>
}
export default Profile;