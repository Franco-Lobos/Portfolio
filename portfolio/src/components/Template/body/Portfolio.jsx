import { WorksConst } from "../../../constants/WorksConst";
import { arrayShuffle } from "../../../library/library";

import '../../../styles/portfolio.css'
import '../../../styles/carrousell.css'

import Carrousell from "./Carrousell";
import PortfolioTags from "./PortfolioTags";
import { useEffect, useState } from "react";


const Portfolio = ()=>{

    const words = WorksConst.specialWords;
    const works = WorksConst.proyects;
    const center = 0;
    const [selectedSkills, setSelectedSkills] = useState(works[center].keyWords);
    const [previousSkills, setPreviousSkills] = useState([]);
    const [reloadTags, setRealoadTags]= useState(1);

    useEffect(()=>{
        window.addEventListener("updateCenter", (e)=>{
            let indx = e.detail.centered
            setSelectedSkills(works[indx]?.keyWords);
            setRealoadTags(0);

        })
    },[]);

    useEffect(()=>{
        setPreviousSkills([...previousSkills, ...selectedSkills])
        setRealoadTags(1);
    },[selectedSkills]);

    useEffect(()=>{
        if(!reloadTags) setRealoadTags(1);
    },[reloadTags]);

    return(
        <>
            <div className="portfolio-title"> PORTFOLIO</div>
            <Carrousell works={works} center={center}></Carrousell>
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