import {
  Route,
  Redirect,
} from "react-router-dom"
import { useAuth } from '../Utils/context';

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  console.log(auth)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth && auth.role === "admin" ? (
          children
        ) : (auth && auth.role === "user" && location.pathname.includes("profile")
          ? (children)
          :
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
      }
    />
  );
}
export default PrivateRoute