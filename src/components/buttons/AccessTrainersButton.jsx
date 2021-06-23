import { Link } from "react-router-dom";
import { Icon } from 'semantic-ui-react'

const AccessTrainersButton = (props) => {
  return <Link to={`${props.path}/trainers`}>
    <Icon name='users' size="big" color="black"/>
  </Link>
}
export default AccessTrainersButton;