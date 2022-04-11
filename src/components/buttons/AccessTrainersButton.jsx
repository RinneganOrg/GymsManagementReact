import { Link } from "react-router-dom";
import { Icon } from 'semantic-ui-react'

const AccessTrainersButton = () => {
  return <Link to={"trainers"}>
    <Icon name='users' size="big" color="black"/>
  </Link>
}
export default AccessTrainersButton;