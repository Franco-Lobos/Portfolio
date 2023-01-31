import { useState } from "react";
import { useEffect } from "react";

const HeaderLink =({indx})=>{
    
    const [breathing, setBreathing] = useState(0);
    const colors = ['purpule', 'orange', 'green' ,'light-blue','blue',];


    let root = document.querySelector(':root');

    const getRGB= (color)=>{
        let colorHex = getComputedStyle(root).getPropertyValue(`--${color}`).split('');

        colorHex = colorHex.filter(char => char!== ' ');
        colorHex.shift();

        let colorR = parseInt(colorHex[0] + '' + colorHex[1],16);
        let colorG = parseInt(colorHex[2] + '' + colorHex[3],16);
        let colorB = parseInt(colorHex[4] + '' + colorHex[5],16);

        return [colorR,colorG,colorB]
    }

    const spawnLink = (link) =>{
        setTimeout(()=>{
            link.style.animation = "spawn 2s";
            link.style.opacity = '1';
        },200*indx);
    }


    const breath = (link) =>{
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
        let time = 4000; // Miliseconds

        setBreathing(1);
        setInterval(()=> {
            let timePassed = Date.now() - start;
            if (timePassed >= time) {
                start+=time*2;
            }
            let percent = Math.abs(timePassed/time)

            let breathingColor1 = [
                Math.ceil(color1[0] - rDifPrev*percent),
                Math.ceil(color1[1] - gDifPrev*percent),
                Math.ceil(color1[2] - bDifPrev*percent)
            ];

            // let breathingColor1 = [
            //     Math.ceil(color1[0] + rDifNext*percent),
            //     Math.ceil(color1[1] + rDifNext*percent),
            //     Math.ceil(color1[2] + rDifNext*percent)
            // ];
            let breathingColor2 = [
                Math.ceil(color1[0] - rDifNext*percent),
                Math.ceil(color1[1] - gDifNext*percent),
                Math.ceil(color1[2] - bDifNext*percent)
            ];

            let gradient = `linear-gradient(0.125turn, rgb(${breathingColor1}), ${percent*100}%,  rgb(${breathingColor2})`;

            link.style.background = gradient;

        }, 10);

    }


    useEffect(()=>{
        const link = document.getElementById(`header-link-${indx}`);

        if(!link) return;
        spawnLink(link);
        if(!breathing){
            breath(link);
        }

    },[])

        return(
            <div className="header-link" id={`header-link-${indx}`}>
            
            </div>
        )
}

export default HeaderLink;