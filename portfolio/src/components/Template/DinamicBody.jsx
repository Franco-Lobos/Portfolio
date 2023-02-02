import { useEffect } from "react";

// ROUTES
import Portfolio from "./body/Portfolio";
import HomeBody from "./body/HomeBody";

const DinamicBody = ({componentPath}) =>{

    let Routed = HomeBody; //default

    switch(componentPath){
        case "portfolio":
        Routed = Portfolio;
        break

        default:
        Routed = HomeBody; //default
        break;
     } 


     useEffect(()=>{
        const body = document.getElementById('home-body');
        if(!body) return;
        body.addEventListener('animationend', ()=>{
            body.style.filter= "blur(0rem)"
        })
     },[])

    return (
        <div id='home-body'>
            <Routed>
            </Routed>
        </div>
    );
}

export default DinamicBody;