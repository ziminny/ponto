import axios from "axios";



const token =  localStorage.getItem("@cartao_ponto:token")
console.log(token);



export const api = axios.create({
   //baseURL:"http://177.71.147.194:3333",
   
  baseURL:"http://localhost:3333",
   //  headers: { 'Authorization':`barer ${localStorage.getItem("@cartao_ponto:token")}` }
})