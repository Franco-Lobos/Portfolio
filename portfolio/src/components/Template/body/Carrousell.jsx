import { useEffect, useState } from "react";
import CarrousellCard from "./CarrousellCard";

import { switchBool } from "../../../library/library";


const Carrousell = ({works, center, setTitle})=>{

    const worksAmount = Object.keys(works).length;

    const [eventsAdded, setEventsAdded] = useState(0);
    const [transition, setTransition] = useState(0);
    const [loaded, setLoaded] = useState(0);

    const [centeredCard, updateCenterCard]=  useState(center);

    const [carrousellData, updateCarrousellData]=  useState(
        {
            cardWidth : 0,
            bodyCenterPoint : 0,
            centerPoint :0,
    
            translated:0,
    
            gap: 0,
            cardStep: 0,
        }
    );

    const prepareNextSlide = new CustomEvent("prepareNextSlide");


    const advanceCarrousell = ()=>{
        if(centeredCard >= worksAmount -1){
            updateCenterCard(0);
        }
        else{
            updateCenterCard(centeredCard+1);
        }
    }

    const forwardCarrousell = ()=>{
        if(centeredCard <= 0){
            updateCenterCard(worksAmount-1);
        }
        else{
            updateCenterCard(centeredCard-1);
        }
    }

    const updateCenter = new CustomEvent("updateCenter",{
        detail: { centered: centeredCard},
    });


    const centerCard = ()=>{
        const telescope = document.getElementById('telescope');
        
        carrousellData.translated = carrousellData.centerPoint - (centeredCard * carrousellData.cardStep);

        telescope.style.transition = transition;

        telescope.style.transform = `translateX(${carrousellData.translated }px)`;

        setTitle(works[centeredCard].name);

        if(loaded){
            window.dispatchEvent(prepareNextSlide);
        }
        setLoaded(1);
        
        window.addEventListener("prepareNextReady", ()=>{
            window.dispatchEvent(updateCenter);
        });
    }

    const calcCenter = (telescope)=>{
        const carrouesell = document.getElementById('carrousell-body');
        const cards =  telescope.querySelectorAll('.carrousell-card');

        let buf = {...carrousellData};

        if(!cards[0]) return;

        buf.cardWidth = cards[0].offsetWidth;
        buf.bodyCenterPoint = carrouesell.offsetWidth/2;
        buf.gap = parseInt(getComputedStyle(telescope).gap, 10);
        buf.cardStep = buf.cardWidth + buf.gap;
        buf.centerPoint = buf.bodyCenterPoint - buf.cardWidth/2 - buf.cardWidth - buf.gap;

        updateCarrousellData(buf);
    }

    useEffect(()=>{
        centerCard();
    }, [centeredCard]);


    useEffect(()=>{
        centerCard();
    }, [carrousellData]);

    useEffect(()=>{
        setLoaded(0);
        const telescope = document.getElementById('telescope');
        const firstCard = document.getElementById('carrousell-card-0');

        if(!firstCard || !telescope){
            return;
        }

        calcCenter(telescope);

        if(!eventsAdded){
            setTransition(getComputedStyle(telescope).transition);

            window.addEventListener("resize",()=>{
                const telescope = document.getElementById('telescope');
                telescope.style.transition = "none";
                calcCenter(telescope);
            });

            setEventsAdded(1);
        }
    },[]);
    
    return(
        <div className="carrousell-main">
        
            <div className="carrousell-header" >
                {/* HEADER */}
            </div>
                <div className="carrousell-arrows" id="prev" onClick={()=> forwardCarrousell()}>  {"<"}</div>
                <div className="carrousell-arrows" id="next" onClick={()=> advanceCarrousell()}>  {">"}</div>

            <div className="carrousell-body" id="carrousell-body">
                <div className="carrousell-telescope" id="telescope">

                    <CarrousellCard card={works[0]} indx={worksAmount-1} key={worksAmount+1} centered={centeredCard} ></CarrousellCard>
                    {
                        works.map((card, i)=>
                            <CarrousellCard card={card} indx={i} key={i} centered={centeredCard} ></CarrousellCard>
                        )
                    }
                    <CarrousellCard card={works[worksAmount-1]} indx={0} key={-1} centered={centeredCard} ></CarrousellCard>

                </div>
            </div>

            <div className="carrousell-footer">
                {/* FOOTER */}
            </div>
        </div>
    );
}


export default Carrousell