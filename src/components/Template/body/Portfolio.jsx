import { WorksConst } from "../../../constants/WorksConst";
import { breath } from "../../../library/library";

import '../../../styles/portfolio.css'
import '../../../styles/carrousell.css'

import Carrousell from "./Carrousell";
import PortfolioTags from "./PortfolioTags";
import { useState } from "react";
import useDeepEffect from "../../../library/sdk";

const Portfolio = () => {

    const words = WorksConst.specialWords;
    const works = WorksConst.proyects;

    const [centeredCard, updateCenterCard] = useState(0);


    const [selectedSkills, setSelectedSkills] = useState(works[centeredCard].keyWords);
    const [previousSkills, setPreviousSkills] = useState([]);
    const [reloadTags, setRealoadTags] = useState(1);

    const [title, setTitle] = useState(0);
    const [breathing, setBreathing] = useState(0);
    const [brathInterval, setBreathInterval] = useState(0);

    let time = 4000 // miliseconds
    let hoverBrightness = 1 // scale 

    useDeepEffect(() => {
        window.addEventListener("updateCenter", (e) => {
            updateCenterCard(e.detail.centered);
        })
    }, []);

    useDeepEffect(() => {
        const titleEl = document.getElementById(`portfolio-title`);

        if (titleEl && !breathing) {
            clearInterval(brathInterval);
            setBreathInterval(breath(titleEl, 1, setBreathing, time, hoverBrightness));
        }

        setSelectedSkills(works[centeredCard]?.keyWords);
        setRealoadTags(0);

    }, [centeredCard]);

    useDeepEffect(() => {
        setPreviousSkills([...previousSkills, ...selectedSkills]);
        setRealoadTags(1);
    }, [selectedSkills]);

    useDeepEffect(() => {
        if (!reloadTags) setRealoadTags(1);
    }, [reloadTags]);

    return (
        <>
            {
                <div className="portfolio-title" id={`portfolio-title`}> {title}</div>
            }
            <Carrousell works={works} center={centeredCard} setTitle={setTitle}></Carrousell>
            {
                reloadTags
                    ?
                    <PortfolioTags words={words}
                        selectedSkills={selectedSkills} previousSkills={previousSkills}
                    ></PortfolioTags>
                    :
                    ""
            }
        </>
    )
}


export default Portfolio;