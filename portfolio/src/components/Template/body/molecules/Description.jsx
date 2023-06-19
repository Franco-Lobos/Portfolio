import { useEffect, useState } from "react";


import WriteWithForSpan from "../../../../library/WriteWithForSpan";

import { convertToCamelCase, capitalize} from "../../../../library/library";

const Description = ({useHook, MoleculeConst})=>{

    const [eventAdded, setEventAdded] = useState(0);
    const [focusedId, setFocusedId] = useState(0);
    const [moleculeName, setMoleculeName] = useState(0);
    const [moleculeObj, setMoleculeObj] = useState(0);
    const [moleculeType, setMoleculetType] = useState(0);
    const [moleculeTypeActive, setMoleculetTypeActive] = useState(0);
    const [moleculeChangeFlag, setMoleculeChangeFlag] = useState(0);

    const [skip, setSkip] = useState(30);

    const [typeDescription, setTypeDescription] = useState([]);

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
                setMoleculeObj(convertToCamelCase(splited.join('-')));
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
        setSkip(30);
        useHook.activeType = moleculeTypeActive;
        window.dispatchEvent(useHook);
        if(moleculeType){
            setTypeDescription(MoleculeConst[moleculeObj]?.description[convertToCamelCase(moleculeType[moleculeTypeActive]?.toLowerCase())])
        }else if(MoleculeConst[moleculeObj]){
            // console.log(MoleculeConst[moleculeObj])
            setTypeDescription(MoleculeConst[moleculeObj].description)
        }
    },[moleculeTypeActive, moleculeType]);

    useEffect(()=>{
        // setMoleculeChangeFlag(0);
        // setTimeout(()=>{
        //     setMoleculeChangeFlag(1);
        // }, 10)
        setMoleculeChangeFlag(0);

    },[typeDescription, skip]);

    useEffect(()=>{
        if(!moleculeChangeFlag){
            setMoleculeChangeFlag(1);

        }
    },[moleculeChangeFlag]);

    return(
        <>
        {
            focusedId
            ?
            <div id="description-main" >
                <div id='closing-description' onClick={closeDescription}> X </div>
                <div id='skiping-button' onClick={()=>setSkip(0)}> Skip </div>

                    <div className="description-title title">
                        {capitalize(moleculeName,'')}:
                    </div>
                    {
                    moleculeType
                    ? 
                    <div className="description-title-selector" id='active-type'>

                    <button onClick={prevType}> {" < "} </button> 
                        { moleculeType[moleculeTypeActive]}
                    <button onClick={nextType}> {" > "} </button> 
                    </div>
                    :""
                    }
                <div className="description-body">

                    {
                        moleculeChangeFlag 
                            ?
                            typeDescription.map((fr,indx)=>
                                <WriteWithForSpan 
                                    key={indx}
                                    inptString={fr} specialWords={MoleculeConst.specialWords} indx={indx}
                                    writed = {writed} setWrited={setWrited} delay={10}
                                    veloc={skip}
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