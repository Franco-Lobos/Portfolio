import { ParkSharp } from "@mui/icons-material";
import Sketch from "react-p5";

import { getRGB } from "../../../library/library";

import '../../../styles/sommelier.css'

import { Water } from "./molecules/Water";

const Sommelier = () =>{

    let bg = getRGB('dark-bg');

    var w = window.innerWidth;
    var h = window.innerHeight;

    let frameRate = 100;

    let colitions =[];

    let scale = 0.3;
    let totalMolecules = 100;

    let allMolecules = [
        {moleculeType : "water",
        moleculeData : []},
    ];

    let allMoleculesAmount = {
        water: Math.ceil(totalMolecules*0.84),
    }

    //Set WATER
    for(let i=1; i<=allMoleculesAmount.water; i++){
        let water = new Water(p5, i, scale, w, h);
        allMolecules.map(group=>{
            if(group.moleculeType === 'water'){
                group.moleculeData.push(water)
            }
        })
    }

    const colitionDriver = (p5, thisMolecule, otherMolecule, minDistance)=>{
        let distanceVect = p5.Vector.sub(otherMolecule.position, thisMolecule.position);
        let distanceVectMag = distanceVect.mag();
        let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
        let d = distanceVect.copy();
        let correctionVector = d.normalize().mult(distanceCorrection);

        otherMolecule.position.add(correctionVector);
        thisMolecule.position.sub(correctionVector);
        
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
        otherMolecule.position.x = thisMolecule.position.x + bFinal[1].x;
        otherMolecule.position.y = thisMolecule.position.y + bFinal[1].y;

        thisMolecule.position.add(bFinal[0]);

        // update velocities
        thisMolecule.orientation.x = cosine * vFinal[0].x - sine * vFinal[0].y;
        thisMolecule.orientation.y = cosine * vFinal[0].y + sine * vFinal[0].x;
        otherMolecule.orientation.x = cosine * vFinal[1].x - sine * vFinal[1].y;
        otherMolecule.orientation.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    
    }

    const colitionManager =(thisMolecule)=>{
        let flag = 0;

        allMolecules.map(moleculeGroup=>{
            moleculeGroup.moleculeData.map( otherMolecule=> { 
                if( otherMolecule.id === thisMolecule.id) return;
                let a = otherMolecule.position.x-thisMolecule.position.x;
                let b = otherMolecule.position.y-thisMolecule.position.y
                let hipotenuse = Math.sqrt((a)**2+(b)**2);

                let minDistance=thisMolecule.colitionDistance + otherMolecule.colitionDistance;

                if(hipotenuse <= minDistance){
                    let existentColition = 0;

                    if(colitions[0]){
                        colitions.map(col=>{
                            let colitioneds = [col?.fixed,col?.mobile ]
                            if(colitioneds.includes(thisMolecule.id) && colitioneds.includes(otherMolecule.id)){
                                existentColition=1
                            }
                        })
                    }
                    if(!existentColition){
                        colitions.push({
                            fixed: thisMolecule.id,
                            mobile: otherMolecule.id
                        });
                        if(!thisMolecule.spawned || !otherMolecule.spawned){
                            colitionDriver(p5, thisMolecule, otherMolecule, minDistance) 
                        }
                    }

                    if(thisMolecule.spawned){
                        thisMolecule.position.y-=10*(thisMolecule.originYOrientation);
                        thisMolecule.position.x-=10*(thisMolecule.originXOrientation);
                    }

                    if(thisMolecule.pushed){
                        console.log('pushed')
                        let a = thisMolecule.pushed.x-thisMolecule.position.x;
                        let b = thisMolecule.pushed.y-thisMolecule.position.y;
                        // otherMolecule.orientation.x*=a;
                        // otherMolecule.orientation.y*=b;
                        otherMolecule.position.x-=thisMolecule.orientation.x*a;
                        otherMolecule.position.y-=thisMolecule.orientation.y*b;
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
            thisMolecule.spawned =0;
            thisMolecule.pushed =0;
        }
    }

    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w, h).parent(canvasParentRef);
        p5.frameRate(frameRate);
	};

	const draw = (p5) => {
        p5.background(bg);
        let count = p5.frameCount;

        //H20 DRAWING
        allMolecules.map(moleculeGroup=>{
            moleculeGroup.moleculeData.map((thisMolecule)=>{
                thisMolecule.oscilate(count);
                
                //Colition
                colitionManager(thisMolecule);
                thisMolecule.checkIfFocused(p5);
                if(thisMolecule.focused){
                    thisMolecule.focusAnimation(count);
                    //set others to move out;
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
                                if(mobilesId.includes(otherMolecule2.id)){
                                    thisMolecule.pushed=otherMolecule2.position;
                                }
                            }
                        )})
                    }
    
                }else{
                    thisMolecule.colitionDistance = thisMolecule.settings.colitionDistance;
                }
            

            
               

                //H20 draw
                thisMolecule.draw(p5);
            })
        })
    
    }

    return <Sketch setup={setup} draw={draw}/>;
}


export default Sommelier;