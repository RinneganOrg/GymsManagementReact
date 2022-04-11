import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const AddButton = () => {
  return <Link to={"add"}>
    <Button circular color="blue" icon='add' />
  </Link>
}
export default AddButton;
