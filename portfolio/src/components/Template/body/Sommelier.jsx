import { useEffect, useState} from "react";
import Sketch from "react-p5";

import { getRGB, convertToCamelCase } from "../../../library/library";

import '../../../styles/sommelier.css'
import Description from "./molecules/Description";

import { Molecule } from "./molecules/Molecule";
import ModalCard from "./ModalCard";

import { MoleculeConst } from "../../../constants/MoleculesConst";

const Sommelier = () =>{

    const [modal, setModal] = useState(1);

    let colorObj = getRGB('dark-bg');
    let bg = [colorObj.r, colorObj.g, colorObj.b];

    let w = window.innerWidth;
    let h = window.innerHeight;

    let colors = {};    
    let colorsRoot = ['purpule', 'orange', 'blue', 'light-blue', 'green', 'dark-bg', 'dark-grey','dark-bg', 'grey'];
    colorsRoot.forEach(color=>{
        let colorObjBuf = getRGB(color);
        colors[convertToCamelCase(color)] = [colorObjBuf.r, colorObjBuf.g, colorObjBuf.b];;
    })

    let frameRate =30;

    let colitions =[];

    let scale = w*0.000115;
    let totalMolecules = w*0.075;

    let environment = {
        focused:0,
        focusedFinished:0,
        maxVelocity: Math.sqrt(2),
        minVelocity: 0.3,
        defaultMaxVelocity: 1,
        defaultMinVelocity: 0.6,
        centerDot: {
            x: w * 0.5,
            y: h * 0.4,
        },
        centerCoord:0,
        centerFraction: 0.08,
        centerFlag :0,
    }

    let allMolecules = [
        {moleculeType : "water",
        moleculeData : []},
        {moleculeType : "ethanol",
        moleculeData : []},
        {moleculeType : "glycerol",
        moleculeData : []},
        {moleculeType : "organic-acids",
        moleculeData : []},
        {moleculeType : "polyphenols",
        moleculeData : []},
    ];

    let allMoleculesAmount = {
        water: Math.ceil(totalMolecules*0.84),
        // water: 0,
        ethanol: Math.ceil(totalMolecules*0.14),
        // ethanol: 0,
        glycerol: Math.ceil(totalMolecules*0.005),
        // glycerol: 0,
        organicAcids: Math.ceil(totalMolecules*0.005),
        // organicAcids:0,
        polyphenols: Math.ceil(totalMolecules*0.005),
        // polyphenols: 0,

    }

    //Set WATER
    for(let i=1; i<=allMoleculesAmount.water; i++){
        let water = new Molecule(p5, i, scale, w, h, 'water');
        allMolecules.map(group=>{
            if(group.moleculeType === 'water'){
                group.moleculeData.push(water)
            }
        })
    }

    //Set ETHANOL
    for(let i=1; i<=allMoleculesAmount.ethanol; i++){
        let ethanol = new Molecule(p5, i, scale, w, h, 'ethanol');
        allMolecules.map(group=>{
            if(group.moleculeType === 'ethanol'){
                group.moleculeData.push(ethanol)
            }
        })
    }


    //Set GLYCEROL
    for(let i=1; i<=allMoleculesAmount.glycerol; i++){
        let glycerol = new Molecule(p5, i, scale, w, h, 'glycerol');
        allMolecules.map(group=>{
            if(group.moleculeType === 'glycerol'){
                group.moleculeData.push(glycerol)
            }
        })
    }

    //Set ORGANIC ACIDS
    for(let i=1; i<=allMoleculesAmount.organicAcids; i++){
        let organicAcids = new Molecule(p5, i, scale, w, h, 'organic-acids');
        allMolecules.map(group=>{
            if(group.moleculeType === 'organic-acids'){
                group.moleculeData.push(organicAcids)
            }
        })
    }


    //Set POLYPHENOLS
    for(let i=1; i<=allMoleculesAmount.polyphenols; i++){
        let polyphenols = new Molecule(p5, i, scale, w, h, 'polyphenols');
        allMolecules.map(group=>{
            if(group.moleculeType === 'polyphenols'){
                group.moleculeData.push(polyphenols)
            }
        })
    }

    const adjustScreen = (p5)=>{
        w =window.innerWidth;
        h =window.innerHeight
    }

    const colitionDriver = (p5, thisMolecule, otherMolecule, minDistance)=>{
        let distanceVect = p5.Vector.sub(otherMolecule.position, thisMolecule.position);
        let distanceVectMag = distanceVect.mag();
        let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
        let d = distanceVect.copy();
        let correctionVector = d.normalize().mult(distanceCorrection);

        // if(!thisMolecule.pushed){
            otherMolecule.position.add(correctionVector);
            thisMolecule.position.sub(correctionVector);
        // }

        
        // get angle of distanceVect
        let theta = distanceVect.heading();
        // precalculate trig values
        let sine = Math.sin(theta);
        let cosine = Math.cos(theta);

        /* bTemp will hold rotated ball this.positions. You 
         just need to worry about bTemp[1] this.position*/
        let bTemp = [new p5.Vector(), new p5.Vector()];

        /* this ball's this.position is relative to the other
         so you can use the vector between them (bVect) as the 
         reference point in the rotation expressions.
         bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
         automatically to 0.0, which is what you want
         since b[1] will rotate around b[0] */
        bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
        bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;


        // rotate Temporary velocities
        let vTemp = [new p5.Vector(), new p5.Vector()];

        vTemp[0].x = cosine * thisMolecule.orientation.x + sine * thisMolecule.orientation.y;
        vTemp[0].y = cosine * thisMolecule.orientation.y - sine * thisMolecule.orientation.x;
        vTemp[1].x = cosine * otherMolecule.orientation.x + sine * otherMolecule.orientation.y;
        vTemp[1].y = cosine * otherMolecule.orientation.y - sine * otherMolecule.orientation.x;

        /* Now that velocities are rotated, you can use 1D
         conservation of momentum equations to calculate 
         the final this.orientation along the x-axis. */
        let vFinal = [new p5.Vector(), new p5.Vector()];

        // final rotated this.orientation for b[0]
        vFinal[0].x =
          ((thisMolecule.m - otherMolecule.m) * vTemp[0].x + 2 * otherMolecule.m * vTemp[1].x) /
          (thisMolecule.m + otherMolecule.m);
        vFinal[0].y = vTemp[0].y;

        // final rotated this.orientation for b[0]
        vFinal[1].x =
          ((otherMolecule.m - thisMolecule.m) * vTemp[1].x + 2 * thisMolecule.m * vTemp[0].x) /
          (thisMolecule.m + otherMolecule.m);
        vFinal[1].y = vTemp[1].y;

 
        // hack to avoid clumping
        bTemp[0].x += vFinal[0].x;
        bTemp[1].x += vFinal[1].x;

        /* Rotate ball this.positions and velocities back
         Reverse signs in trig expressions to rotate 
         in the opposite direction */
        // rotate balls
        let bFinal = [new p5.Vector(), new p5.Vector()];

        bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
        bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
        bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
        bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

        // update balls to screen this.position
        // if(!thisMolecule.pushed){
            otherMolecule.position.x = thisMolecule.position.x + bFinal[1].x;
            otherMolecule.position.y = thisMolecule.position.y + bFinal[1].y;
        // }

        // if(!thisMolecule.pushed){
            thisMolecule.position.add(bFinal[0]);

            let newThisX= ( cosine * vFinal[0].x - sine * vFinal[0].y);
            let newThisY= ( cosine * vFinal[0].y + sine * vFinal[0].x);

            thisMolecule.orientation.x = newThisX;
            thisMolecule.orientation.y = newThisY;
            
            let newOtherX= ( cosine * vFinal[1].x - sine * vFinal[1].y);
            let newOtherY= ( cosine * vFinal[1].y + sine * vFinal[1].x);

            otherMolecule.orientation.x = newOtherX;
            otherMolecule.orientation.y = newOtherY;
        // }

        // update velocities
        // thisMolecule.orientation.x = cosine * vFinal[0].x - sine * vFinal[0].y;
        // thisMolecule.orientation.y = cosine * vFinal[0].y + sine * vFinal[0].x;
        // otherMolecule.orientation.x = cosine * vFinal[1].x - sine * vFinal[1].y;
        // otherMolecule.orientation.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    
    }


    const colitionManager =(p6,thisMolecule)=>{
        let flag = 0;

        allMolecules.map(moleculeGroup=>{
            moleculeGroup.moleculeData.map( otherMolecule=> { 
                if( otherMolecule.id === thisMolecule.id) return;
                let a = otherMolecule.position.x-thisMolecule.position.x;
                let b = otherMolecule.position.y-thisMolecule.position.y;
                let hipotenuse = Math.sqrt((a)**2+(b)**2);

                let cos = Math.abs(a/hipotenuse);
                let sin = Math.abs(b/hipotenuse);

                let thisOvalColition = thisMolecule.colitionDistance + (thisMolecule.specimen.waterComparisonX * thisMolecule.colitionDistance*cos) + (thisMolecule.specimen.waterComparisonY * thisMolecule.colitionDistance*sin);
                let otherOvalColition = otherMolecule.colitionDistance + (otherMolecule.specimen.waterComparisonX * otherMolecule.colitionDistance*cos) + (otherMolecule.specimen.waterComparisonY * otherMolecule.colitionDistance*sin);

                let minDistance = thisOvalColition + otherOvalColition;

                if(hipotenuse < minDistance){
                    // p6.stroke('red')
                    // p6.line(thisMolecule.position.x,thisMolecule.position.y,otherMolecule.position.x,otherMolecule.position.y, 10)
                    if(otherMolecule.focused){
                        thisMolecule.zoom = hipotenuse/minDistance * thisMolecule.settings.zoom;
                    }

                    let existentColition = 0;
                    if(colitions[0]){
                        colitions.map(col=>{
                            let colitioneds = [col?.fixed,col?.mobile ]
                            if(colitioneds.includes(thisMolecule.id) && colitioneds.includes(otherMolecule.id)){
                                col.frames++;
                                existentColition=col.frames;
                            }
                        })
                    }
                    if(!existentColition){
                        colitions.push({
                            fixed: thisMolecule.id,
                            mobile: otherMolecule.id,
                            frames:1
                        });
                        if(!thisMolecule.spawned || !otherMolecule.spawned){

                            colitionDriver(p5, thisMolecule, otherMolecule, minDistance) 
                        }
                    }

                    if(thisMolecule.spawned && !thisMolecule.focused){
                        thisMolecule.moveTo('x', thisMolecule.orientation.x)
                        thisMolecule.moveTo('y', thisMolecule.orientation.y)
                    }

                    if(existentColition>=2
                         && !thisMolecule.pushed && !thisMolecule.focused
                         ){
                        let a = thisMolecule.position.x - otherMolecule.position.x;
                        let b = thisMolecule.position.y - otherMolecule.position.y;
                        thisMolecule.pushedForce(a*0.1,b*0.1);
                    }
                    flag=1;
                }
            })
        })

        if(flag){
            thisMolecule.colitionable = 1;
        } else {

            let filtered = [];

            if(colitions[0]){
                colitions.map((colition)=>{
                    let colitioneds = [colition?.fixed,colition?.mobile ]
                    if(!colitioneds.includes(thisMolecule.id)){
                        filtered.push(colition)
                    }
                })
            }
            colitions=[...filtered];

            thisMolecule.colitionable = 0;
            thisMolecule.spawned = 0;
            thisMolecule.pushed = 0;
            thisMolecule.pushedForceFlag=0;
        }
    }

    const useHook = new CustomEvent(
        'useHook',
        {
            focused:0,
            closed:0,
            types:0,
            activeType:0,
        });


    window.addEventListener('useHook', (e)=>{
        if(e.closed===1) {
            allMolecules.map(moleculeGroup=>{
                moleculeGroup.moleculeData.map((thisMolecule)=>{
                    thisMolecule.focused=0;
                    thisMolecule.focusedFinished = 0;
                    thisMolecule.focusedPercent = 0;   
                    thisMolecule.focusedModule = 0;
                })
            })
            environment.focused=environment.focused;
        }
        else{
            allMolecules.map(moleculeGroup=>{
                moleculeGroup.moleculeData.map((molecule)=>{
                if(molecule.id === environment.focused){
                    molecule.specimen.activeType = e.activeType;
                    if(molecule.specimen.waterComparisonVariable){
                        molecule.specimen.waterComparisonX = molecule.specimen.waterComparisonVariable[e.activeType];
                    }
                }
                })
            })
        }
    })

    const setup = (p5, canvasParentRef) => {
		let cnv = p5.createCanvas(w, h).parent(canvasParentRef);
        cnv.mousePressed((e) => {
            let focusedFlag = environment.focused;
            let moleculeTypesFlag = 0;
            let changedFlag = 0;
            allMolecules.map(moleculeGroup=>{
                moleculeGroup.moleculeData.map((thisMolecule)=>{
                    //Colition
                    if(!thisMolecule.spawned){
                        thisMolecule.checkIfFocused(p5,environment.focused, environment);
                        if(thisMolecule.focused){
                            focusedFlag = thisMolecule.id;
                            moleculeTypesFlag = thisMolecule.specimen.types;
                            changedFlag =1;
                            return;
                        }
                    }
                })
            })

            environment.focused=focusedFlag;

            useHook.closed = 0;
            useHook.focused =  changedFlag ? focusedFlag : 0;
            useHook.types = moleculeTypesFlag;
            window.dispatchEvent(useHook);
          })

        p5.frameRate(frameRate);

        window.onresize=()=>{
            adjustScreen(p5);
            p5.createCanvas(w, h).parent(canvasParentRef);
        }        
	};

	const draw = (p5) => {
        p5.background(bg);
        let count = p5.frameCount;

        //DRAWING
        allMolecules.map(moleculeGroup=>{
            moleculeGroup.moleculeData.map((thisMolecule)=>{
                thisMolecule.oscilate(count, environment);

                if(thisMolecule.focused){
                    thisMolecule.focusDownspeed();
                    p5.frameRate(frameRate*2);
                    thisMolecule.focusAnimation(environment);
                    // if(!environment.centerFlag){
                        thisMolecule.centerAnimation(environment, 1);
                    // }

                    // set others to move out;
                    let mobilesId =[];
                    if(colitions[0]){
                        colitions.map(colition=>{
                            if(colition.fixed === thisMolecule.id){
                                mobilesId.push(colition.mobile)
                            }
                        })
                    }
                    
                    if(mobilesId[0]){
                        allMolecules.map(moleculeGroup2=>{
                            moleculeGroup2.moleculeData.map((otherMolecule2)=>{
                                if(mobilesId.includes(otherMolecule2.id) ){
                                    let a = otherMolecule2.position.x - thisMolecule.position.x;
                                    let b = otherMolecule2.position.y - thisMolecule.position.y;
                                    otherMolecule2.pushedForce(a*0.1,b*0.1);
                                }
                            }
                        )})
                    }
                }

                else{
                    if(environment.focused
                        //  && !environment.centerFlag
                         ){
                        thisMolecule.centerAnimation(environment);
                    }

                    if(environment.focused === thisMolecule.id ){
                        thisMolecule.resetOrientation();
                        thisMolecule.unFocusAnimation();
                        environment.focused= 0;
                        environment.centerCoord = 0;
                    }
                    if(thisMolecule.unFocusedPercent<1 && !thisMolecule.unFocusedFinished ){
                        thisMolecule.unFocusAnimation();
                    } 


                }
                colitionManager(p5,thisMolecule);

                if(environment.focused && environment.focusedFinished){
                    thisMolecule.downSpeed();
                    thisMolecule.checkVelocity(environment);  
    
                }else{
                    thisMolecule.upSpeed('x');
                    thisMolecule.upSpeed('y');
                    if(thisMolecule.zoom<thisMolecule.settings.zoom){
                        thisMolecule.zoom =thisMolecule.settings.zoom;
                    }
                }

                if(!thisMolecule.pushed && !thisMolecule.focused ){               
                    thisMolecule.checkVelocity(environment);   
                }

                thisMolecule.draw(p5, colors);

            })
        })

    }

    useEffect(()=>{
        const canvas = document.getElementById('canvas-body');
        if(!canvas) return;
        canvas.addEventListener('animationend', ()=>{
            canvas.style.filter= "blur(0rem)"
        })
     },[modal])

    return (
        <>
            {modal
            ?
            <>
                <div className="modal-card-bg" style={ {filter: modal ?`blur(0.5rem)` : "none"}}>
                </div>
                <ModalCard title={MoleculeConst.intro.title} text={MoleculeConst.intro.text} button={MoleculeConst.intro.button} closer={()=>setModal(0)}></ModalCard>
            </>

            : 
            
            <div id="canvas-body">
                <Sketch setup={setup} draw={draw}/>    
                <Description useHook={useHook} MoleculeConst={MoleculeConst} ></Description>
            </div>
            }
         </>
    );
}



export default Sommelier;