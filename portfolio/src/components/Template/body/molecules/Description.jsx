import { useEffect, useState } from "react";


import WriteWithForSpan from "../../../../library/WriteWithForSpan";

import { MoleculeConst } from "../../../../constants/MoleculesConst";

const Description = ({useHook})=>{

    const [eventAdded, setEventAdded] = useState(0);
    const [focusedId, setFocusedId] = useState(0);
    const [moleculeName, setMoleculeName] = useState(0);
    const [moleculeType, setMoleculetType] = useState(0);
    const [moleculeTypeActive, setMoleculetTypeActive] = useState(0);

    const[writed, setWrited] = useState(0);

    const closeDescription = () =>{
        setFocusedId(0);
        useHook.closed = 1;
        useHook.focused = 0;
        useHook.types = 0;
        window.dispatchEvent(useHook);
    }

    const prevType=()=>{
        setMoleculetTypeActive(moleculeTypeActive === 0? moleculeType.length-1 : moleculeTypeActive-1 );
    }
    const nextType=()=>{
        setMoleculetTypeActive(moleculeTypeActive+1 === moleculeType.length? 0 :moleculeTypeActive+1);
    }

    useEffect(()=>{
        if(!eventAdded){
            window.addEventListener('useHook', (e)=>{
                if(e.closed===1) return;
                setFocusedId(e.focused)
                if(!e.focused) return;
                let splited = e.focused.split('-');
                splited.pop();
                setMoleculeName(splited.join(' '));
                setMoleculetType(useHook.types);
                setEventAdded(1);
            })
        }

        const mainDescription = document.getElementById('description-main');
        if(!mainDescription) return
        mainDescription.style.opacity = '0';
        mainDescription.style.animation = `spawn 0.5s`;
        mainDescription.style.opacity = '1';
    })


    useEffect(()=>{
        console.log(moleculeTypeActive);
        // useHook.closed = 0;
        // useHook.focused = 0;
        // useHook.types = 0;
        useHook.activeType = moleculeTypeActive;
        window.dispatchEvent(useHook);
    },[moleculeTypeActive]);

    return(
        <>
        {
            focusedId
            ?
            <div id="description-main" >
                <div id='closing-description' onClick={closeDescription}> X </div>
                <div className="description-title title">
                    {moleculeName}: 
                </div>
                <div className="description-title-selector" id='active-type'>
                    {
                    moleculeType
                    ? 
                    <>
                    <button onClick={prevType}> {" < "} </button> 
                        { moleculeType[moleculeTypeActive]}
                    <button onClick={nextType}> {" > "} </button> 
                    </>
                    :""

                    }
                    </div>
                <div className="description-body">

                    {
                    MoleculeConst[moleculeName]?.description && MoleculeConst[moleculeName].description[0]
                        ?
                        MoleculeConst[moleculeName].description.map((fr,indx)=>
                            <WriteWithForSpan 
                                key={indx}
                                inptString={fr} specialWords={MoleculeConst.specialWords} indx={indx}
                                writed = {writed} setWrited={setWrited} delay={10}
                            ></WriteWithForSpan>
                        )
                        :""
                    }
                </div>
            </div>
    
            :""
        }
        </>
    );
}


export default Description;