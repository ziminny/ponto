import React from "react"
import { ContextUser } from "./auth";
import { ToastContext } from "./toast";

 const Context:React.FC = ( { children }) => (

   <ToastContext>
     <ContextUser>
       
         { children }
       
     </ContextUser>
   </ToastContext>
  
 )

export default  Context;