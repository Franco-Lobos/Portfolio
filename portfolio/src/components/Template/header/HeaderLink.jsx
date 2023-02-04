import { useState } from "react";
import { useEffect } from "react";

import MaterialIcon from 'material-icons-react';

import { getRGB } from "../../../library/library";

const HeaderLink =({indx, route, setLoad, setPath})=>{
    
    const [breathing, setBreathing] = useState(0);

    const colors = ['purpule', 'orange' ,'light-blue','blue', 'green'];

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


    const breath = (link, card) =>{
        let color0 = getRGB(colors[indx === 0 ? colors.length-1 : indx-1 ]);
        let color1 = getRGB(colors[indx]);
        let color2 = getRGB(colors[indx+1 >= colors.length ? 0 : indx+1]);

        let rDifPrev = color1[0]-color0[0];
        let gDifPrev = color1[1]-color0[1];
        let bDifPrev = color1[2]-color0[2];

        let rDifNext = color1[0]-color2[0];
        let gDifNext = color1[1]-color2[1];
        let bDifNext = color1[2]-color2[2];

        let start = Date.now();

        setBreathing(1);
        setInterval(()=> {
            let timePassed = Date.now() - start;
            if (timePassed >= time) {
                start+=time*2;
            }
            let percent = Math.abs(timePassed/time)

            let breathingColor1 = [
                Math.ceil(color1[0] - rDifPrev*percent)* hoverBrightness,
                Math.ceil(color1[1] - gDifPrev*percent)* hoverBrightness,
                Math.ceil(color1[2] - bDifPrev*percent)* hoverBrightness
            ];

            let breathingColor2 = [
                Math.ceil(color1[0] - rDifNext*percent)* hoverBrightness,
                Math.ceil(color1[1] - gDifNext*percent)* hoverBrightness,
                Math.ceil(color1[2] - bDifNext*percent)* hoverBrightness
            ];

            let gradient = `-webkit-linear-gradient(0.25turn, rgb(${breathingColor1}),   rgb(${breathingColor2})`;

            link.style.backgroundImage = gradient;


        }, 10);

    }


    useEffect(()=>{
        const link = document.getElementById(`header-link-${indx}`);
        const card = document.getElementById(`header-card-${indx}`);

        const links = [...document.querySelectorAll(`.header-link`)];

        if(!link ||!links) return;

        spawnLink(link, links, card);
        if(!breathing){
            breath(link, card);
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