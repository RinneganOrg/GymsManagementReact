import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const AddButton = (props) => {
  return <Link to={`${props.path}/add`}>
    <Button circular color="blue" icon='add' />
  </Link>
}
export default AddButton;
