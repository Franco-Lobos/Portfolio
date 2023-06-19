import { useState, useEffect} from "react";
import { spawnElement, unSpawnElement, findOnArray} from "../../../library/library";


const PortfolioTagSingle = ({ word, indx, last, selectedSkills, previousSkills})=>{
    
    let selected = findOnArray(word, selectedSkills);
    let prevSelected = findOnArray(word, previousSkills)

    let time = 800;// miliseconds
    let specialClass =selected || prevSelected ? "prev-selected" : "";

    const prepareNextReady = new CustomEvent("prepareNextReady");

    useEffect(()=>{
        const tag = document.getElementById(`port-wrd-${selected}-${indx}`);
        tag.addEventListener("animationstart", ()=>{
            if(selected){
                tag.classList.remove("prev-selected");
                tag.classList.add("selected");
            }
            else if(prevSelected){
                tag.classList.add("prev-selected");
            }
        })

        spawnElement( tag, indx, time);

        window.addEventListener("prepareNextSlide", (e)=>{
            unSpawnElement( tag, indx, time/4);
            
            if(last){
                tag.addEventListener("animationend",()=>{
                    window.dispatchEvent(prepareNextReady);
                })
            }
        })
    },[])


    return(
        <div className={`portfolio-word ${specialClass}`} id={`port-wrd-${selected}-${indx}`} key={indx}>{word}</div>    
    )
}

export default PortfolioTagSingle;