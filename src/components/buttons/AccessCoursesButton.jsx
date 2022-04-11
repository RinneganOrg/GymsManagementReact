import { Link } from "react-router-dom";
import { Icon } from 'semantic-ui-react'

const AccessCoursesButton = () => {
  return <Link to={"courses"}>
    <Icon name='list' size="big" color="black"/>
  </Link>
}
export default AccessCoursesButton;