import { useState } from "react";
import { useEffect } from "react";

import MaterialIcon from 'material-icons-react';

import { getRGB, breath } from "../../../library/library";


const HeaderLink =({indx, route, setLoad, setPath})=>{
    
    const [breathing, setBreathing] = useState(0);


    let time = 4000 // miliseconds
    let hoverBrightness = 1 // scale 

    let root = document.querySelector(':root');



    const spawnLink = (link, links, card) =>{
        let otherLinks = links.filter(ln=>ln.id !== link.id)

        let specialTime = time /2;
        card.addEventListener('mouseenter', ()=>{
        })

        card.addEventListener('mouseover', ()=>{
            time = specialTime;
            hoverBrightness = 1.5;
            otherLinks.map(lin=>
                lin.style.filter= 'blur(0.2rem)'
            )
        })

        card.addEventListener('mouseout', ()=>{
            time = 4000;
            otherLinks.map(lin=>
                lin.style.filter= 'blur(0rem)'
            )
            hoverBrightness = 1;
        })

        let timeAnim = '1.5s'

        setTimeout(()=>{
            card.style.animation = `spawn ${timeAnim}`;
            card.style.opacity = '1';
            card.addEventListener('animationend',()=>{
                setLoad(indx)
            });
        },300+200*indx);
    }



    useEffect(()=>{
        const link = document.getElementById(`header-link-${indx}`);
        const card = document.getElementById(`header-card-${indx}`);

        const links = [...document.querySelectorAll(`.header-link`)];

        if(!link ||!links) return;

        spawnLink(link, links, card);
        if(!breathing){
            breath(link, indx, setBreathing, time, hoverBrightness);
        }

    },[])

        return(
            <div className="header-link-card" id={`header-card-${indx}`} >
                <div className="header-link" id={`header-link-${indx}`} onClick={()=>setPath(route.path)}>
                    <MaterialIcon icon={`${route.icon}`}  size="large" color='#f0f0f0'/>
                </div>
            </div>
        )
}

export default HeaderLink;