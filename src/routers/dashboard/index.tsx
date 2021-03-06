import React from "react"
import { authContext } from "../../context/auth"
import DashboardAdmin from "./admin"
import DashboardUser from "./user"


const Dashboard:React.FC = () => {

  const { datas } = authContext()
  const typeUser = datas.user.regraUser.regra.nome
  
  return (
     typeUser == 'admin' ? <DashboardUser/> : <DashboardAdmin/>
  )
}

export default Dashboard;