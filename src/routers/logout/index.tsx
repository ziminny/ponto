import React , { useContext } from "react";
import { AppContext } from "../../context/auth";

const LogOut:React.FC = () => {

  const { logOut } = useContext(AppContext);
  logOut()

  return (
      <></>
  );
}

export default LogOut;