import React, { useState ,ReactDOM} from "react";
import { Link} from "react-router-dom";
import { Icons } from "../iconssidebar";
import { Article, Icon, Search } from "./styles";
import { RiUser3Line , RiBarChartLine , RiSettings2Line , RiHome2Line , RiServerLine , RiSearch2Line } from "react-icons/ri";
import { FcHome } from "react-icons/fc"
import Options from "./options";
import jsonMenu from "../../configs/menu.json";
import { IconType } from "react-icons";
import { authContext } from "../../context/auth";

const icons:IconType[] = [
   RiUser3Line , 
   RiServerLine ,
   RiBarChartLine , 
   RiSettings2Line  , 
   
];




const SideBar:React.FC = () => {

   const { datas } = authContext()
   const permission = datas.user.regraUser.regra.nome

  const typeUser = jsonMenu.filter( (el , index) => 
  permission === "funcionario" ? index === 0 : el)

  

   const [activeIcon , setActiveIcon] = useState( ():boolean[] => {
      const fillArray:boolean[] = [];
        for (let index = 0; index < typeUser.length + 1; index++) {
             fillArray.push(false);           
        }

      return fillArray;
   });
   
   interface J {
     
         header:string,
         main?:Array<string>
         links:Array<string>
     
   }
   const [jsonOptions , setJsonOptions] = useState<J>(typeUser[0])

   
   
  
  return (
      <>
         
         <Article>
            <Icon>
               <Icons link="/dashboard" click={ (obj) => {
                  
                } } >
                  <FcHome/>
               </Icons>

                {
                   typeUser.map( (response , index) => { 
                     const ActualIcon = icons[index]; 
                     
                     return (
                    
                     <Icons 
                        key={index} 
                        active={activeIcon[index]} 
                        click= { (obj) => {
                                               
                         let actualGet:boolean[] = activeIcon.map( _ => false);
                          
                           if(!activeIcon[index]) {
                             actualGet = activeIcon.map( (_ , indice) => indice === index ? true : false)
                           }
                           
                           
                           
                           
                        
                        setActiveIcon([...actualGet])
                        setJsonOptions(jsonMenu[index])
                        obj.preventDefault();
                  
                        const container:HTMLElement | null = document.querySelector(".container-menu");
                        const molde:HTMLElement | null = document.querySelector(".molde");
            
                        if(container && molde) {
                     
                           const main:HTMLElement | null = container.querySelector("main");   
                           
                           if(main) {
                              

                              const span = main.querySelectorAll("span");
                              span.forEach( el => {
                                 el.addEventListener("mouseout" , () => {
                                    el.style.animation = ""
                                    el.style.animation = "moveTextOptionsOut .2s ease-in-out forwards"
                                    
                                 } )
                                 el.addEventListener("mouseover" , () => {
                                    el.style.animation = ""
                                    el.style.animation = "moveTextOptions .2s ease-in-out forwards"
                                    
                                 } )                                 
                              })
                           }
                           
                          const left = parseFloat(getComputedStyle(container).left) < 0 ? true : false;
                         
                          const isActiveOptions = actualGet.every( e => {
                           return e === false;
                          })
                                          
                           
                           if(left) {

                              molde.addEventListener("click", () => {
                                 container.style.animation = "hideContainerMenu 0.2s ease-in-out forwards";
                                 molde.style.display = "none"
                                 const resetIcons = actualGet.map( _ => false)
                                 setActiveIcon(resetIcons)
                              })
                              
                              container.style.animation = "";
                              container.style.animation = "showContainerMenu 0.2s ease-in-out forwards";
                              molde.style.width = window.innerWidth - 60 +"px"
                              molde.style.display = "block"
                              return;
                           }


                             
                           if(isActiveOptions) {
                              container.style.animation = "hideContainerMenu 0.2s ease-in-out forwards";
                              molde.style.display = "none"
                           }
                          
                          
                        }

                     }}>
                        < ActualIcon/>
                     </Icons>
                   )})
                }  

            </Icon>

            <Search>
               <Icons  active={activeIcon[activeIcon.length-1]}  click= { (obj) => {
                     obj.preventDefault();

                     let actualGet:boolean[] = activeIcon.map( _ => false);
                          
                     if(!activeIcon[activeIcon.length-1]) {
                       actualGet = activeIcon.map( (_ , indice) => indice === activeIcon.length-1 ? true : false)
                     }
                     const container:HTMLElement | null = document.querySelector(".container-menu");

                     if(container && actualGet) {
                        const molde:HTMLElement | null = document.querySelector(".molde");
                        const left = parseFloat(getComputedStyle(container).left) < 0 ? true : false;
                       
                        if(!left && molde) {
                           molde.style.display = "none"
                           container.style.animation = "hideContainerMenu 0.2s ease-in-out forwards"; 
                        }  
                        }
                     
                     
                  
                  
                  setActiveIcon([...actualGet])

               }}>
                  <RiSearch2Line/>
               </Icons> 
            </Search>
         </Article>

         <Options jsonObject={jsonOptions} className="container-menu"></Options>
      </>
  );
}

export default SideBar;