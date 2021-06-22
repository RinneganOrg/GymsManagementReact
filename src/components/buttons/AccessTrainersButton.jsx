import { Link } from "react-router-dom";

const AccessTrainersButton = (props) => {
  return <Link to={'/trainers'}>
    <button>Trainers</button>
  </Link>
}
export default AccessTrainersButton;