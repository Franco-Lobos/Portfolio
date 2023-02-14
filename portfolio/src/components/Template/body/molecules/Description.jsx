import { useEffect, useState } from "react";


import WriteWithForSpan from "../../../../library/WriteWithForSpan";

import { MoleculeConst } from "../../../../constants/MoleculesConst";

const Description = ({useHook})=>{

    const [eventAdded, setEventAdded] = useState(0);
    const [focusedId, setFocusedId] = useState(0);
    const [moleculeName, setMoleculeName] = useState(0);
    const[writed, setWrited] = useState(0);

    const closeDescription = () =>{
        setFocusedId(0);
        useHook.closed = 1;
        useHook.focused = 0;
        window.dispatchEvent(useHook);
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
                setEventAdded(1);
            })
        }

        const mainDescription = document.getElementById('description-main');
        if(!mainDescription) return
        mainDescription.style.opacity = '0';
        mainDescription.style.animation = `spawn 0.5s`;
        mainDescription.style.opacity = '1';
    })

    return(
        <>
        {
            focusedId
            ?
            <div id="description-main" >
                <div id='closing-description' onClick={closeDescription}> X </div>
                <div className="description-title">
                    {moleculeName}
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