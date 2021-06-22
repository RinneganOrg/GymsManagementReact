import { Link } from "react-router-dom";

const AccessSuppliersButton = (props) => {
  return <Link to={'/suppliers'}>
    <button>Suppliers</button>
  </Link>
}
export default AccessSuppliersButton;