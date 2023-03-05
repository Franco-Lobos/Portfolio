import { getRGB } from "../../../../library/library";

import { Water } from "./Water";
import { Ethanol } from "./Ethanol";
import { Glycerol } from "./Glycerol";
import { OrganicAcids } from "./OrganicAcids";
import { Polyfenols } from "./Polyphenols";

export class Molecule {
    constructor(p5, i, scale, w, h, moleculeType){
        this.moleculeType = moleculeType;

        let randomOscilation = Math.floor(Math.random()*300)+300 // from 0 to 1

        let randomXStart = Math.random(); // from 0 to 1
        let randomYStart =  h*(0.1 + Math.random()*80/40);
        
        let randomXOrientation = Math.floor(Math.random()*10)%2===0 ? 1 : -1;
        let randomYOrientation = Math.floor(Math.random()*10)%2===0 ? 1 : -1;

        let randomXVelocity = Math.random()*4;
        let randomYVelocity = Math.random()*4;

        let angle54 = 54*Math.PI/180;
        let angle52 = 52.225*Math.PI/180;
        let angle360 = 0;
        let angle120 = 60*Math.PI/180;


        this.bond={
            cc:{
                distance:  154  * scale,
                angle: angle54,
                cos: Math.cos(angle54),
                sin: Math.sin(angle54),
                dif: new p5.Vector(0,0)
            },
            co:{
                distance:  143  * scale,
                angle: angle54,
                cos: Math.cos(angle54),
                sin: Math.sin(angle54),
                dif: new p5.Vector(0,0)
            },
            c6c:{
                distance:  139  * scale,
                angle: angle120,
                cos: Math.cos(angle120),
                sin: Math.sin(angle120),
                dif: new p5.Vector(0,0)
            },

            c6cPlane:{
                distance:  139  * scale,
                angle: angle360,
                cos: Math.cos(angle360),
                sin: Math.sin(angle360),
                dif: new p5.Vector(0,0)
            },

            c__c:{
                distance:  134  * scale,
                angle: angle360,
                cos: Math.cos(angle360),
                sin: Math.sin(angle360),
                dif: new p5.Vector(0,0)
            },

            c__o:{
                distance:  123  * scale,
                angle: angle360,
                cos: Math.cos(angle360),
                sin: Math.sin(angle360),
                dif: new p5.Vector(0,0)
            },

            oh:{
                distance:  96  * scale,
                angle: angle54,
                cos: Math.cos(angle54),
                sin: Math.sin(angle54),
                dif: new p5.Vector(0,0)
            },

            hoh:{
                distance:  96  * scale,
                angle: angle52,
                cos: Math.cos(angle52),
                sin: Math.sin(angle52),
                dif: new p5.Vector(0,0)
            },

            coBehindCenter:{
                distance:  143  * scale,
                angle: angle360,
                cos: Math.cos(angle360),
                sin: Math.sin(angle360),
                dif: new p5.Vector(0,0),
                behind:1,
            },

            ohBehindBehind:{
                distance:  96  * scale,
                angle: angle360,
                cos: Math.cos(angle360),
                sin: Math.sin(angle360),
                dif: new p5.Vector(0,0),
                behind:1.5,
            }

        }

        this.__setBonds();

        this.settings ={
            scale: scale,
            zoom: 4*scale,
            colitionDistance : 96*scale,
            behindScale : 0.6,
            textSize: scale * 100,
        }

        this.sizes = {
            carbon : 40* scale,
            oxigen : 30* scale,
            hidrogen : 20* scale,
            radical : 60*scale,
        }

        //PROPS
        this.id = moleculeType+ '-' +i,
        this.oscilations = randomOscilation,
        this.originXOrientation =  (randomXVelocity) * randomXOrientation ,
        this.originYOrientation = (randomYVelocity)* randomYOrientation ,
        this.position = new p5.Vector(randomXStart * w, randomYStart),
        this.focusedModule =   this.position.copy(),

        this.orientation =  new p5.Vector( this.originXOrientation , this.originYOrientation),

        this.scale = scale;
        this.spawned =1,
        this.pushed=0,
        this.pushedForceFlag=0,

        this.focused=0;
        this.focusedPercent=0;
        this.focusedFinished=0;

        this.unFocusedPercent=1;
        this.unFocusedFinished=0;


        this.zoom = this.settings.zoom;
        this.focusedIncrease = 25* scale;

        this.colitionFocused = scale*700;
        this.zoomFocused = this.zoom * this.focusedIncrease;

        this.colitionable = 0;// set default 1
        this.identifier =0;
        this.__setSpecimen(p5);

        this.colitionDistance = this.settings.colitionDistance;
        this.m= (this.colitionDistance /2)*0.01;
       
    }

    
    __setBonds(){
        // C-C BOND
        this.bond.cc.dif.x =   this.bond.cc.sin *  this.bond.cc.distance;
        this.bond.cc.dif.y =   this.bond.cc.cos *  this.bond.cc.distance;
        
        // C-O BOND
        this.bond.co.dif.x =   this.bond.co.sin *  this.bond.co.distance;
        this.bond.co.dif.y =   this.bond.co.cos *  this.bond.co.distance;

        // C=O BOND
        this.bond.c__o.dif.x =   this.bond.c__o.sin *  this.bond.c__o.distance;
        this.bond.c__o.dif.y =   this.bond.c__o.cos *  this.bond.c__o.distance;
 
        // C=C BOND
        this.bond.c__c.dif.x =   this.bond.c__c.sin *  this.bond.c__c.distance;
        this.bond.c__c.dif.y =   this.bond.c__c.cos *  this.bond.c__c.distance;
        
        // C HEXAGON C BOND
        this.bond.c6c.dif.x =   this.bond.c6c.sin *  this.bond.c6c.distance;
        this.bond.c6c.dif.y =   this.bond.c6c.cos *  this.bond.c6c.distance;
        this.bond.c6cPlane.dif.x =   this.bond.c6cPlane.sin *  this.bond.c6cPlane.distance;
        this.bond.c6cPlane.dif.y =   this.bond.c6cPlane.cos *  this.bond.c6cPlane.distance;
        
        // O-H BOND
        this.bond.oh.dif.x =   this.bond.oh.sin *  this.bond.oh.distance;
        this.bond.oh.dif.y =   this.bond.oh.cos *  this.bond.oh.distance;

        // H-O-H BOND (TETRAHEDRUM FORCED)
        this.bond.hoh.dif.x =   this.bond.hoh.sin *  this.bond.hoh.distance;
        this.bond.hoh.dif.y =   this.bond.hoh.cos *  this.bond.hoh.distance;


        // C-O BEHIND CCENTER
        this.bond.coBehindCenter.dif.x =   this.bond.coBehindCenter.sin *  this.bond.coBehindCenter.distance;
        this.bond.coBehindCenter.dif.y =   this.bond.coBehindCenter.cos *  this.bond.coBehindCenter.distance;
    
        // C-O BEHIND CCENTER
        this.bond.ohBehindBehind.dif.x =   this.bond.ohBehindBehind.sin *  this.bond.ohBehindBehind.distance;
        this.bond.ohBehindBehind.dif.y =   this.bond.ohBehindBehind.cos *  this.bond.ohBehindBehind.distance;
      
    }

    __setSpecimen(p5){
        switch(this.moleculeType){
            case 'water':
                this.specimen = new Water(p5, this);
                break
            case 'ethanol':
                this.specimen = new Ethanol(p5, this);
                break
            case 'glycerol':
                this.specimen = new Glycerol(p5, this);
                break

            case 'organic-acids':
                this.specimen = new OrganicAcids(p5, this);
                break

            case 'polyphenols':
                this.zoomFocused *=0.4;
                this.colitionFocused *=0.4;
                this.specimen = new Polyfenols(p5, this);
                break

            default:
                this.specimen = new Water(p5, this);
        }
    }


    oscilate(count, environment){     
        let cicle = count%this.oscilations;
        if (cicle === 0){
            this.orientation.x*=-1;
            let variability = Math.floor(Math.random()*200) -10;
            this.oscilations +=variability;
        }

        if(this.pushed){
            this.position.add(this.pushed)
        }
        // this.orientation.y=checkVelocity(this.orientation.y-0.1);

        this.position.x+= this.orientation.x*0.9;
        this.position.y+= this.orientation.y*0.9;

    }

    centerAnimation = (environment, thisFocused = 0)=>{
        // if(!environment.focusedFinished) return
        if(thisFocused){
            this.focusedModule = this.position.copy();
            this.focusedModule.x -= environment.centerDot.x;
            this.focusedModule.y -= environment.centerDot.y;
            environment.centerCoord = this.focusedModule.copy().mult(environment.centerFraction,environment.centerFraction);
        }

        this.position.sub(environment.centerCoord);
        if( environment.centerCoord.x <= 1 && environment.centerCoord.y <= 1){
            environment.centerFlag =1;
        }
    }

    checkIfFocused =(p5, otherFocusFlag,environment)=>{
        let mouseX = p5.mouseX;
        let mouseY =  p5.mouseY;
        let a = (this.position.x - mouseX);
        let b = (this.position.y - mouseY);

        let hipotenuse = Math.sqrt((a)**2+(b)**2);

        let cos = Math.abs(a/hipotenuse);
        let sin = Math.abs(b/hipotenuse);
        let thisOvalColition = this.colitionDistance + (this.specimen.waterComparisonX * this.colitionDistance*cos) + (this.specimen.waterComparisonY * this.colitionDistance*sin);

        if(thisOvalColition>hipotenuse && (otherFocusFlag === this.id || !otherFocusFlag)){
            this.focused = 1;

            environment.centerFlag =0;
            this.focusedModule = this.position.copy();
            this.focusedModule.x -= environment.centerDot.x;
            this.focusedModule.y -= environment.centerDot.y;
            environment.centerCoord = this.focusedModule.copy().mult(environment.centerFraction,environment.centerFraction); 
        }

        else{
            this.focused =0;
            this.focusedFinished = 0;
            this.focusedPercent = 0;   

            this.focusedModule = 0;
        }
    }

    focusAnimation(environment){
        if(this.focusedFinished)return;
        this.unFocusedPercent=1;
        this.unFocusedFinished=0;

        this.focusedPercent+=0.1;
        this.zoom = this.settings.zoom + this.zoomFocused*this.focusedPercent;
        this.colitionDistance = this.settings.colitionDistance + this.colitionFocused*this.focusedPercent;
        this.m= (this.colitionDistance/2)*0.01;

        if(this.focusedPercent>=1){
            this.focusedFinished=1;
            environment.focusedFinished=1;
        }else{
            environment.focusedFinished=0;
        }
    }

    unFocusAnimation(){
        if(this.unFocusedFinished)return;

        this.unFocusedPercent-=0.1;

        this.zoom = this.settings.zoom + this.zoomFocused*this.unFocusedPercent;

        this.colitionDistance = this.settings.colitionDistance + this.colitionFocused*this.unFocusedPercent;
        if(this.unFocusedPercent<=0.1){
            this.unFocusedFinished=1;
        }
    }


    checkVelocity = (environment)=>{
        let originVelocity = Math.sqrt(this.orientation.x**2+this.orientation.y**2);

        if(originVelocity >= environment.maxVelocity){
            this.downSpeed();
        }
        if(originVelocity <= environment.minVelocity){
            this.orientation.mult(1.05)
        }
    }

    focusDownspeed(){
        this.orientation.x=0;
        this.orientation.y=0;
    }

    downSpeed(){
        this.orientation.mult(0.95);
    }

    upSpeed(vector, scaled =0.1){
        if(this.orientation[vector]>0){this.orientation[vector]+=scaled}
        if(this.orientation[vector]<0){this.orientation[vector]-=scaled}
    }

    moveTo(vector, scaled=0.1){
        if(this.position[vector]>0){this.position[vector]+=scaled}
        if(this.position[vector]<0){this.position[vector]-=scaled}
    }

    resetOrientation(){
        this.orientation.x = this.originXOrientation;
        this.orientation.y = this.originYOrientation;
    }

    pushedForce(a,b){
        this.pushed = new p5.Vector(a,b);
    }

    __infinitePermanece(p5){
        if(this.position.x>=p5.width+this.colitionDistance){ this.position.x-=p5.width}
        if(this.position.x<=-this.colitionDistance){ this.position.x=p5.width}

        if(this.position.y>=p5.height+this.colitionDistance){ this.position.y-=p5.height}
        if(this.position.y<=-this.colitionDistance){ this.position.y=p5.height}
    }

    //BONDS DRAWING 

    drawSuperposition(p5,originPoint, length, angle, electronSize,xDeterminant, yDeterminant, behind=0, double){
        //First step: exe location
        let exeLoctaion = 1-Math.random()**(Math.PI/2);

        let randomCoord = originPoint.copy();

        // exeLoctaion = 1;
        if(1){
        //orbital form
        let randomAngle = Math.random()*Math.PI/2;
        let n = 32 + behind *16;
        let randomCos = Math.cos(randomAngle);
        let randomSin = Math.sin(randomAngle);

        randomCos -= (Math.cos(randomAngle)**n);
        randomSin -= (Math.sin(randomAngle)**n);
        

        // if(double){
        //     // n=17
        //     exeLoctaion *= -1;
        // }
        // exeLoctaion = 1;


        randomCoord.x += randomCos * (length) * exeLoctaion
            * xDeterminant ;
        randomCoord.y += randomSin * (length) * exeLoctaion
            * yDeterminant ;

        //Orbital form ends

        //Orbital correction
        let difAngle = 45*Math.PI/180
            *xDeterminant*yDeterminant
            - angle
            *xDeterminant*yDeterminant;

        let difCos = Math.cos(difAngle);
        let difSin = Math.sin(difAngle);

        let x = originPoint.x
        let y = originPoint.y

        let TInverted = [
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ]
        let Rotation = [
            [difCos, -difSin , 0],
            [difSin, difCos, 0],
            [0,0,1]
        ]
        let T = [
            [1, 0, -x],
            [0, 1, -y], 
            [0, 0, 1]
        ]

        /*TInverted*Rotation =  TIR =[
            [difCos, -difSin , x],
            [difSin, difCos, y],
            [0,0,1]
        ]
        */

        //  TIR* T =
        let RotationMatrix = [
            [difCos, -difSin , (-x*difCos+ y*difSin +x)],
            [difSin, difCos, (-x*difSin+ -y*difCos +y)],
            [0,0,1]
        ]

        let resultRotation ={
            x : RotationMatrix[0][0]*randomCoord.x + RotationMatrix[0][1]* randomCoord.y + RotationMatrix[0][2],
            y : RotationMatrix[1][0]*randomCoord.x + RotationMatrix[1][1]* randomCoord.y + RotationMatrix[1][2],
        }
                
        p5.circle( resultRotation.x, resultRotation.y, electronSize);

        }

    }

    drawP1P1(p5, atomOrigin, atomDestiny, bondType, half=1, double=0){
        let bond= {
            origin:{
                nucle:  atomOrigin.position.copy(),
                position: atomOrigin.position.copy(),
            },
            destiny:{
                nucle:  atomDestiny.position.copy(),
                position: atomDestiny.position.copy(),
            },
            module: {
                x:0,
                y:0,
                z:0
            },
            angle: bondType.angle,
            sin : bondType.sin,
            cos : bondType.cos,
            contraBondProportion: 2,

            electron:{
                size: 10 * this.scale,
                sizeDefault: 10 * this.scale,
                sizeFocus : 30 * this.scale,
            }
        }


         //Set nucle in order to "add" the radius in all cases;
        let xDeterminant = atomOrigin.position.x>= atomDestiny.position.x ? -1 : 1
        let yDeterminant = atomOrigin.position.y>= atomDestiny.position.y ? -1 : 1

        bond.origin.nucle.x = atomOrigin.size/2 * xDeterminant * bond.sin;
        bond.origin.nucle.y = atomOrigin.size/2 * yDeterminant * bond.cos;
        bond.destiny.nucle.x = atomDestiny.size/2 * xDeterminant * bond.sin*3;
        bond.destiny.nucle.y = atomDestiny.size/2 * yDeterminant * bond.cos*3;

        // bond.origin.position.add(bond.origin.nucle);
        bond.destiny.position.add(bond.destiny.nucle);

        //Set nucle End
        bond.module = bond.origin.position.copy().sub(bond.destiny.position);
        bond.module.length = Math.sqrt(bond.module.x**2+bond.module.y**2)*half*1.2;

        let lots = 0.8;
        if( this.specimen.name = 'polyfenols'){
            lots=0.2;
        }

        for(let i = 0; i<256*lots;i++){
            let opacity = (Math.ceil(i/lots)).toString(16);
            p5.fill(`#${opacity+opacity+opacity+opacity}`);
            bond.electron.size=bond.electron.sizeDefault;

            if(i%bond.contraBondProportion!==0){
                this.drawSuperposition(p5, atomOrigin.position, bond.module.length, bond.angle, bond.electron.size, xDeterminant, yDeterminant, bond.behind, double);
            }else{
                this.drawSuperposition(p5, atomOrigin.position, bond.module.length/bond.contraBondProportion, bond.angle, bond.electron.size, -xDeterminant, -yDeterminant, bond.behind,double);
            }
        }
    }

    draw(p5, colors){
        // if(this.spawned)return
        this.__infinitePermanece(p5);
        p5.noStroke();
        this.specimen.setZoom(this);

        this.specimen.draw(p5, this, colors);

    }
}



