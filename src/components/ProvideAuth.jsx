import { authContext } from '../Utils/context';
import { useProvideAuth } from '../Utils/auth'

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
export default ProvideAuth