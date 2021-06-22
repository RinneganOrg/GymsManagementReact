import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const EditButton = (props) => {
  return <Link to={`${props.path}/edit`}>
    <Button circular color="blue" icon='edit' />
    </Link>
}
export default EditButton;