import { getRGB } from "../../../../library/library";

import { Water } from "./Water";
import { Ethanol } from "./Ethanol";
import { Difference } from "@mui/icons-material";

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

        let angle109 = 54*Math.PI/180;
        let angle104 = 52.225*Math.PI/180;

        this.bond={
            cc:{
                distance:  154  * scale,
                cos: Math.cos(angle109),
                sin: Math.sin(angle109),
                dif: new p5.Vector(0,0)
            },
            co:{
                distance:  143  * scale,
                cos: Math.cos(angle109),
                sin: Math.sin(angle109),
                dif: new p5.Vector(0,0)
            },
            oh:{
                distance:  96  * scale,
                cos: Math.cos(angle109),
                sin: Math.sin(angle109),
                dif: new p5.Vector(0,0)
            },

            hoh:{
                distance:  96  * scale,
                cos: Math.cos(angle104),
                sin: Math.sin(angle104),
                dif: new p5.Vector(0,0)
            }
        }

        this.__setBonds();

        this.settings ={
            scale: scale,
            zoom: 5*scale,
            colitionDistance : this.bond.oh.distance,
        }

        this.sizes = {
            carbon : 40* scale,
            oxigen : 30* scale,
            hidrogen : 20* scale,
        }

        //PROPS
        this.id = moleculeType+ '-' +i,
        this.oscilations = randomOscilation,
        this.originXOrientation =  (randomXVelocity) * randomXOrientation ,
        this.originYOrientation = (randomYVelocity)* randomYOrientation ,
        this.position = new p5.Vector(randomXStart * w, randomYStart),
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
        this.focusedIncrease =30* scale;

        this.colitionFocused = scale*1000;
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
        this.bond.co.dif.x =   this.bond.cc.sin *  this.bond.co.distance;
        this.bond.co.dif.y =   this.bond.cc.cos *  this.bond.co.distance;

        // O-H BOND
        this.bond.oh.dif.x =   this.bond.cc.sin *  this.bond.oh.distance;
        this.bond.oh.dif.y =   this.bond.cc.cos *  this.bond.oh.distance;

        // H-O-H BOND (TETRAHEDRUM FORCED)
        this.bond.hoh.dif.x =   this.bond.cc.sin *  this.bond.hoh.distance;
        this.bond.hoh.dif.y =   this.bond.cc.cos *  this.bond.hoh.distance;
    }

    __setSpecimen(p5){
        switch(this.moleculeType){
            case 'water':
                this.specimen = new Water(p5, this);
                break
            case 'ethanol':
                this.specimen = new Ethanol(p5, this);
                break
            default:
                this.specimen = new Water(p5, this);
        }
    }


    oscilate(count){     
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

    checkIfFocused =(p5, otherFocusFlag)=>{
        let mouseX = p5.mouseX;
        let mouseY =  p5.mouseY;
        let a = this.position.x - mouseX;
        let b = this.position.y - mouseY;


        let hipotenuse = Math.sqrt((a)**2+(b)**2);

        if(this.colitionDistance>hipotenuse && (otherFocusFlag === this.id || !otherFocusFlag)){
            this.focused = 1;
        }

        else{
            this.focused =0;
            this.focusedFinished = 0;
            this.focusedPercent = 0;

            if(this.unFocusedPercent<1){
                this.unFocusAnimation();
            }     
                
            if(otherFocusFlag === this.id){
                this.resetOrientation();
                this.unFocusAnimation();
            }
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
        this.orientation.mult(0.97);
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

    drawSuperposition(p5,originPoint, length, angle, electronSize,xDeterminant, yDeterminant){
        //First step: exe location
        let exeLoctaion = 1-Math.random()**(Math.PI/2);

        let randomCoord = originPoint.copy();

        if(1){
        //orbital form
        let randomAngle = Math.random()*Math.PI/2;
        let randomCos = Math.cos(randomAngle);
        let randomSin = Math.sin(randomAngle);


        let n = 32
        randomCos -= (Math.cos(randomAngle)**n) ;
        randomSin -= (Math.sin(randomAngle)**n) ;

        randomCoord.x += randomCos * (length) * exeLoctaion * xDeterminant ;
        randomCoord.y += randomSin * (length) * exeLoctaion * yDeterminant ;
        //Orbital form ends

        //Orbital correction
        let difAngle = Math.PI/4*xDeterminant*yDeterminant- angle*xDeterminant*yDeterminant;
        let difCos = Math.cos(difAngle);
        let difSin = Math.sin(difAngle);

        // Pivot point traslate
        randomCoord.sub(originPoint)

        // Rotate
        randomCoord.x = difCos*randomCoord.x - difSin*randomCoord.y;
        randomCoord.y = difSin*randomCoord.x + difCos*randomCoord.y;

        // Origin point traslate
        randomCoord.add(originPoint)
        //Orbital correction ends

        // p5.fill('#ff0000');
        p5.circle( randomCoord.x, randomCoord.y, electronSize);}
    }

    drawP1P1(p5, atomOrigin, atomDestiny, bondType, half=1){
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
            angle :Math.acos(bondType.cos),
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
        let xDeterminant = atomOrigin.position.x>=atomDestiny.position.x ? -1 : 1
        let yDeterminant = atomOrigin.position.y>= atomDestiny.position.y ? -1 : 1

        bond.origin.nucle.x = atomOrigin.size/2 * xDeterminant * bond.sin;
        bond.origin.nucle.y = atomOrigin.size/2 * yDeterminant * bond.cos;
        bond.destiny.nucle.x = atomDestiny.size/2 * xDeterminant * bond.sin*3;
        bond.destiny.nucle.y = atomDestiny.size/2 * yDeterminant * bond.cos*3;

        bond.origin.position.add(bond.origin.nucle);
        bond.destiny.position.add(bond.destiny.nucle);

        //Set nucle End
        bond.module = bond.origin.position.copy().sub(bond.destiny.position);
        bond.module.length = Math.sqrt(bond.module.x**2+bond.module.y**2)*half*1.2;


        //Contra Bond
        // let contraBondPosition = bond.origin.position.copy().sub(bond.origin.nucle.copy().mult(2));

        let lots = 2;
        for(let i = 0; i<256*lots;i++){
            let opacity = (Math.ceil(i/lots)).toString(16);
            p5.fill(`#${opacity+opacity+opacity+opacity}`);
            bond.electron.size=bond.electron.sizeDefault;

            if(i%bond.contraBondProportion!==0){
                this.drawSuperposition(p5, atomOrigin.position, bond.module.length, bond.angle, bond.electron.size, xDeterminant, yDeterminant);
            }else{
                this.drawSuperposition(p5, atomOrigin.position, bond.module.length/bond.contraBondProportion, bond.angle, bond.electron.size, -xDeterminant, -yDeterminant);
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



