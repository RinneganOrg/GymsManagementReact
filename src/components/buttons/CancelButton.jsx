import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const CancelButton = ({ path, mode}) => {
  const previousPath = path.substring(0, path.indexOf("/" + mode));
  return <Link to={previousPath}>
    <Button circular color="red" icon='cancel' />
  </Link>
}
export default CancelButton;