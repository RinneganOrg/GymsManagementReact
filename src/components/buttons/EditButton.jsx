import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const EditButton = () => {
  return <Link to={"edit"}>
    <Button circular color="blue" icon='edit' />
    </Link>
}
export default EditButton;