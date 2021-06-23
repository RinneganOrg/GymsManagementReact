import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const SaveButton = ({ onSubmit, path, mode}) => {
  const previousPath = path.substring(0, path.indexOf("/" + mode));
  return <Link to={previousPath}>
    <Button onClick={onSubmit} circular color="green" icon='save' />
  </Link>
}
export default SaveButton;