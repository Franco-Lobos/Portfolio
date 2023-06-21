import { useEffect } from "react";

// ROUTES
import Portfolio from "./body/Portfolio";
import Sommelier from "./body/Sommelier";
import HomeBody from "./body/HomeBody";
import School from "./body/School";
import Intro from "../intro/Intro";

const DinamicBody = ({componentPath, setInitialized}) =>{

    let Routed = HomeBody; //default

    let style = "default-body";

    switch(componentPath){
        case "/portfolio":
            Routed = Portfolio;
            style='porfolio-main';
            break;


        case "/sommelier":
            Routed = Sommelier;
            style='sommelier-wine';
            break;

        case "/school":
            style='school-main';
            Routed = School;
            break;

        case "/intro":
            Routed = Intro;
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
            <Routed setInitialized={setInitialized}>
            </Routed>
        </div>
    );
}

export default DinamicBody;