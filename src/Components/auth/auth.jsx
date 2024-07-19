import {useContext} from 'react';
import {When} from 'react-if';
import { LoginContext } from './context.jsx';

const Auth = ({ capability, children }) => {
  // Use the useContext hook to access login context
  const { loggedIn, can } = useContext(LoginContext);
  
  // Check if user logged in and has required capability
  const isLoggedIn = loggedIn;
  const canDo = capability ? can(capability) : true;
  const okToRender = isLoggedIn && canDo;

  // Render the children components if the condition is met
  return (
    <When condition={okToRender}>
      {children}
    </When>
  );
};

export default Auth;
