import { useEffect, useState } from "react";
import CarrousellCard from "./CarrousellCard";


const Carrousell = ({works, center})=>{

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


    const advanceCarrousell = ()=>{
        updateCenterCard(centeredCard+1);
    }

    const forwardCarrousell = ()=>{
        updateCenterCard(centeredCard-1);
    }

    const centerCard = ()=>{
        const telescope = document.getElementById('telescope');

        carrousellData.translated = carrousellData.centerPoint - (centeredCard * carrousellData.cardStep);

        telescope.style.transform = `translateX(${carrousellData.translated }px)`;
    }

    const calcCenter = (telescope)=>{
        const carrouesell = document.getElementById('carrousell-body');
        const cards =  telescope.querySelectorAll('.carrousell-card');

        if(!cards[0]) return;

        carrousellData.cardWidth = cards[0].offsetWidth;
        carrousellData.bodyCenterPoint = carrouesell.offsetWidth/2;
        carrousellData.centerPoint = carrousellData.bodyCenterPoint - carrousellData.cardWidth/2;
        carrousellData.translated = carrousellData.centerPoint;

        telescope.style.transform = `translateX(${carrousellData.centerPoint}px)`;

        carrousellData.gap = parseInt(getComputedStyle(telescope).gap, 10);

        carrousellData.cardStep = carrousellData.cardWidth + carrousellData.gap;
    }


    useEffect(()=>{
        const telescope = document.getElementById('telescope');
        const firstCard = document.getElementById('carrousell-card-0');
        if(!firstCard || !telescope){
            return;
        }

        calcCenter(telescope);
    },[]);

    useEffect(()=>{
        centerCard();

        const updateCenter = new CustomEvent("updateCenter",{
            detail: { centered: centeredCard},
        });

        const prepareNextSlide = new CustomEvent("prepareNextSlide");

        window.dispatchEvent(prepareNextSlide);

        window.addEventListener("prepareNextReady", ()=>{
            window.dispatchEvent(updateCenter);
        });

    }, [centeredCard])

    return(
        <div className="carrousell-main">
        
            <div className="carrousell-header" >
                {/* HEADER */}
            </div>
                <div className="carrousell-arrows" id="prev" onClick={()=> forwardCarrousell()}>  {"<"}</div>
                <div className="carrousell-arrows" id="next" onClick={()=> advanceCarrousell()}>  {">"}</div>

            <div className="carrousell-body" id="carrousell-body">
                <div className="carrousell-telescope" id="telescope">
                    {
                        works.map((card, i)=>
                            <CarrousellCard card={card} indx={i} key={i} centered={centeredCard==i} ></CarrousellCard>
                        )
                    }
                </div>
            </div>


            <div className="carrousell-footer">
                {/* FOOTER */}
            </div>
        </div>
    );
}


export default Carrousell