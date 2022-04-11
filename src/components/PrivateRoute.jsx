import {
  Navigate,
  useLocation
} from "react-router-dom"
import { useAuth } from '../Utils/context';

function PrivateRoute({ children }) {
  const auth = useAuth();
  const { pathname } = useLocation();
  
  return auth && auth.role === "admin" ? 
    children :
    (auth && auth.role === "user" && pathname.includes("profile")
      ? (children)
      : <Navigate
          to={{
            pathname: "/signin",
            state: { from: pathname }
          }}
        />
      )
}
export default PrivateRoute