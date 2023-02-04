import { useEffect } from "react";

// ROUTES
import Portfolio from "./body/Portfolio";
import Sommelier from "./body/Sommelier";
import HomeBody from "./body/HomeBody";

const DinamicBody = ({componentPath}) =>{

    let Routed = HomeBody; //default

    let style = "default-body";

    switch(componentPath){
        case "/portfolio":
            Routed = Portfolio;
            break;


        case "/sommelier":
            Routed = Sommelier;
            style='sommelier-wine';
            break;

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
        <div id='home-body' className={style}>
            <Routed>
            </Routed>
        </div>
    );
}

export default DinamicBody;