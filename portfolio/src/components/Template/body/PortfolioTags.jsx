import { useEffect, useState } from "react";
import PortfolioTagSingle from "./PortfolioTagSingle";

const PortfolioTags = ({words, selectedSkills, previousSkills})=>{

    let amount = Object.keys(words).length-1;

    return(
        <div className={`porfolio-word-container `}>
            {
                // words
                // ?
                    words.map((word,indx)=>
                     <PortfolioTagSingle word={word} indx={indx} last={indx==amount}
                     selectedSkills={selectedSkills} previousSkills={previousSkills}
                     ></PortfolioTagSingle>
                    )
                // :
                // ""
            }
        </div>
    )
}


export default PortfolioTags;



// const spawnElement =(word)=>{
//     // let random = Math.floor(Math.random()*20)/100 + 0.9;

//     // word.style.transform = `scale(${random})`;
//     // word.style.transition = `all ease-in-out 3s`;

//     // word.innerHTML = random;

//     // word.setAttribute('loaded', random);
// }

// const sinchronizeElement = (word,random) =>{
//     // word.style.transform = `scale(1.2)`;
// }

// const moveElement = (word) =>{

//     // word.animate([
//     //     // keyframes
//     //     { transform: `scale(0.9)` },
//     //     { transform: `scale(1.1)` },
//     //     { transform: `scale(0.9)` },
//     //   ],
//     //   {
//     //     // timing options
//     //     duration: 3000,
//     //     iterations: Infinity,
//     //   }
//     // );
// }

// useEffect(()=>{
//     const words2 = Array.from(document.querySelectorAll('.portfolio-word'));
//     if(!words2[0]) return;
//     words2.forEach((word)=>{
//         let random = word.getAttribute('loaded');
//         if(!random){
//             spawnElement(word);
//         }
//         else{
//             sinchronizeElement(word,random );
//         }
//         // else{
//         //     moveElement(word);
//         // }
//     })

// }, []);