import { getRGB } from "../../../../library/library";

export class Water {
    constructor(p5, i, scale, w, h){
        this.settings= {
            waterAmount : 10,
            oxigen : 40* scale,
            hidrogen : 20* scale,
            distanceR : 95.84* scale,
            angle : 52.225*Math.PI/180,
        };

        this.__setSetings();

        let randomXStart = Math.random(); // from 0 to 1
        let randomYStart =  h*(0.6 + Math.random()*10/40);
        let randomOscilation = Math.floor(Math.random()*300)+300 // from 0 to 1
        let randomOrientation = Math.floor(Math.random()*10)%2===0 ? 1 : -1;
        let randomYVelocity = Math.floor(Math.random()*10)/50;
        let randomXVelocity = Math.floor(Math.random()*10)/50;

        this.id = 'water-'+i,
        this.oscilations = randomOscilation,
        this.originXOrientation =  (0.2 + randomXVelocity) * randomOrientation ,
        this.originYOrientation = -0.4 + randomYVelocity,
        this.position = new p5.Vector(randomXStart * w, randomYStart),
        this.orientation =  new p5.Vector( (0.2 + randomXVelocity) * randomOrientation , -0.4 + randomYVelocity),
        this.spawned =1,
        this.pushed=0,
        this.pushedForceFlag=0,

        
        this.colitionable = 0;// set default 1
        this.focused=0;
        this.focusedPercent=0;
        this.focusedFinished=0;
        this.colitionDistance = this.settings.colitionDistance;
        this.colitionFocused = this.colitionDistance*5;
        this.m= (this.settings.colitionDistance /2)*0.01;
    }

    __setSetings(){
        this.settings['cosen'] =  Math.cos(this.settings.angle);
        this.settings['sinus'] =  Math.sin(this.settings.angle);
        this.settings['xDif'] =   this.settings.sinus * this.settings.distanceR;
        this.settings['yDif'] =   this.settings.cosen * this.settings.distanceR;
        this.settings['centerY'] = this.settings.yDif*0.7;
        this.settings['colitionDistance'] = this.settings.distanceR;
    }

    oscilate(count){     
        let cicle = count%this.oscilations;
        if (cicle === 0){
            this.orientation.x*=-1;
            let variability = Math.floor(Math.random()*200) -10;
            this.oscilations +=variability;
        }
        this.position.x+= this.orientation.x;
        this.position.y+= this.orientation.y;
    }

    checkIfFocused =(p5, otherFocusFlag)=>{
        let mouseX = p5.mouseX;
        let mouseY =  p5.mouseY;
        let a = this.position.x-mouseX;
        let b = this.position.y-mouseY;

        let hipotenuse = Math.sqrt((a)**2+(b)**2);

        if(this.colitionDistance>hipotenuse && (otherFocusFlag === this.id || !otherFocusFlag)){
            console.log('foccc')
            this.focused = 1;
        }

        else{
            this.focused =0;
            this.focusedFinished = 0;
        }
    }

    focusAnimation(){
        if(this.focusedFinished)return;

        this.focusedPercent+=0.01;
        this.colitionDistance = this.settings.colitionDistance + this.colitionFocused*this.focusedPercent;
        
        this.m= (this.colitionDistance/2)*0.01;
        if(this.focusedPercent>=1){
            this.focusedFinished=1;
        }
    }

    pushedForce(a,b){
        this.pushed = new p5.Vector(a,b);
    }

    draw(p5){
        let lightBlue = getRGB('light-blue');
        let orange = getRGB('orange');

        let x = this.position.x;
        let y = this.position.y;

        p5.noStroke();
        p5.fill(lightBlue);
        p5.circle(x,y,this.settings.oxigen);
        p5.fill(orange);
        p5.circle(x-this.settings.xDif,y+this.settings.yDif,this.settings.hidrogen);
        p5.circle(x+this.settings.xDif,y+this.settings.yDif,this.settings.hidrogen);

        p5.stroke('red');
        p5.noFill();

        if(this.colitionable){
            p5.fill('#32323232')
        } 

        // if(this.focused){
        //     p5.circle(x, y+ this.settings.centerY, this.colitionDistance*2);
        // }
        p5.circle(x, y+ this.settings.centerY, this.colitionDistance*2);

        
        // let triangleCoord = [
        //     x,
        //     y-this.settings.oxigen,
        //     x-this.settings.xDif - this.settings.hidrogen,
        //     y+this.settings.yDif + this.settings.hidrogen,
        //     x+this.settings.xDif + this.settings.hidrogen,
        //     y+this.settings.yDif + this.settings.hidrogen,
        // ];
        // p5.triangle(...triangleCoord);

    }
}



