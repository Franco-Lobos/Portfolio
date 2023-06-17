import { WorksConst } from "../../../constants/WorksConst";
import { breath } from "../../../library/library";

import '../../../styles/portfolio.css'
import '../../../styles/carrousell.css'

import Carrousell from "./Carrousell";
import PortfolioTags from "./PortfolioTags";
import { useEffect, useState } from "react";


const Portfolio = ()=>{

    const words = WorksConst.specialWords;
    const works = WorksConst.proyects;

    const [centeredCard, updateCenterCard]=  useState(0);


    const [selectedSkills, setSelectedSkills] = useState(works[centeredCard].keyWords);
    const [previousSkills, setPreviousSkills] = useState([]);
    const [reloadTags, setRealoadTags]= useState(1);

    const [title, setTitle] = useState(0);
    const [breathing, setBreathing] = useState(0);
    const [brathInterval, setBreathInterval] = useState(0);

    let time = 4000 // miliseconds
    let hoverBrightness = 1 // scale 

    useEffect(()=>{
        window.addEventListener("updateCenter", (e)=>{
            updateCenterCard(e.detail.centered);
           
        })
    },[]);
    useEffect(()=>{
        const titleEl = document.getElementById(`portfolio-title`);

        if(titleEl){
            clearInterval(brathInterval);
            setBreathInterval(breath(titleEl, centeredCard, setBreathing, time, hoverBrightness));
        }
        setSelectedSkills(works[centeredCard]?.keyWords);
        setRealoadTags(0);

    },[centeredCard]);

    useEffect(()=>{        
        setPreviousSkills([...previousSkills, ...selectedSkills])
        setRealoadTags(1);
    },[selectedSkills]);

    useEffect(()=>{
        if(!reloadTags) setRealoadTags(1);  
    },[reloadTags]);

    return(
        <>
            {
                <div className="portfolio-title" id={`portfolio-title`}> {title}</div>
            }
            <Carrousell works={works} center={centeredCard} setTitle={setTitle}></Carrousell>
            {
            reloadTags
            ?
            <div>
                <PortfolioTags words={words}
                selectedSkills={selectedSkills} previousSkills={previousSkills}
                ></PortfolioTags>
            </div>
            :
            ""
            }   
        </>
    )
}


export default Portfolio;