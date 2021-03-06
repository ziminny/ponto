import React , { useContext} from "react";
import { AppContext } from "../context/auth"
import { 
  RouteProps as RouteDOMProps , 
  Route as ReactDOMRouter ,
  Redirect
} from "react-router-dom";
import { GlobalHome } from "../styles/GlobalStyle";

interface RouterProps extends RouteDOMProps {
  isPrivate?:boolean;
  component:React.ComponentType
}
const Route: React.FC<RouterProps> = ( { isPrivate = false ,component:Component , ...rest}) => {

  const { datas  } = useContext(AppContext);

  return (
      <ReactDOMRouter {...rest} 
      render = {
        ( { location }) => {
          return isPrivate === !!datas.user ? (
           <>
           <Component/><GlobalHome isHome={ !!datas.user }/>
           </>
          ) : (
            <>
            <Redirect to={ { pathname: isPrivate ? '/' : '/dashboard',
            state: { from:location }
            } }/> 
            </>
          )
        }
      }
      />
  );

}

export default Route;