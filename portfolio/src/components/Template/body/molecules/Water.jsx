import { getRGB } from "../../../../library/library";

export class Water {
    constructor(p5, i, scale, w, h){
        this.settings= {
            waterAmount : 10,
            oxigen : 50* scale,
            hidrogen : 30* scale,
            distanceR : 95.84* scale,
            angle : 52.225*Math.PI/180,
            zoom: 5*scale,
            focusedIncrease: 60*scale,
        };

        this.__setSetings();

        let randomXStart = Math.random(); // from 0 to 1
        let randomYStart =  h*(0.1 + Math.random()*80/40);
        let randomOscilation = Math.floor(Math.random()*300)+300 // from 0 to 1
        let randomOrientation = Math.floor(Math.random()*10)%2===0 ? 1 : -1;
        let randomYVelocity = Math.floor(Math.random()*10)/50;
        let randomXVelocity = Math.floor(Math.random()*10)/50;


        //PROPS
        this.id = 'water-'+i,
        this.oscilations = randomOscilation,
        this.originXOrientation =  (0.2 + randomXVelocity) * randomOrientation ,
        this.originYOrientation = (-0.4 + randomYVelocity)* randomOrientation ,
        this.position = new p5.Vector(randomXStart * w, randomYStart),
        this.orientation =  new p5.Vector( this.originXOrientation , this.originYOrientation),

        this.centerY = this.settings.yDif*0.5;
        
        this.spawned =1,
        this.pushed=0,
        this.pushedForceFlag=0,

        this.focused=0;
        this.focusedPercent=0;
        this.focusedFinished=0;

        this.unFocusedPercent=1;
        this.unFocusedFinished=0;

        this.colitionable = 0;// set default 1
        this.colitionDistance = this.settings.colitionDistance;
        this.colitionFocused = this.colitionDistance * this.settings.focusedIncrease;
        this.m= (this.settings.colitionDistance /2)*0.01;

        this.zoom = this.settings.zoom;
        this.zoomFocused = this.zoom * this.settings.focusedIncrease;

        this.identifier =0;
    }

    __setSetings(){
        this.settings['cosen'] =  Math.cos(this.settings.angle);
        this.settings['sinus'] =  Math.sin(this.settings.angle);
        this.settings['xDif'] =   this.settings.sinus * this.settings.distanceR;
        this.settings['yDif'] =   this.settings.cosen * this.settings.distanceR;
        this.settings['centerY'] = this.settings.yDif*0.5;
        this.settings['colitionDistance'] = this.settings.distanceR;
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

            
        if(this.position.x>=p5.width+this.colitionDistance){ this.position.x-=p5.width}
        if(this.position.x<=-this.colitionDistance){ this.position.x=p5.width}

        if(this.position.y>=p5.height+this.colitionDistance){ this.position.y-=p5.height}
        if(this.position.y<=-this.colitionDistance){ this.position.y=p5.height}

    }

    checkIfFocused =(p5, otherFocusFlag)=>{
        let mouseX = p5.mouseX;
        let mouseY =  p5.mouseY;
        let a = this.position.x-mouseX;
        let b = this.position.y+ this.centerY-mouseY;

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

    focusDownspeed(){
        this.orientation.x*=0.1;
        this.orientation.y*=0.1;
        this.orientation.x*=0;
        this.orientation.y*=0;
    }

    downSpeed(vector){
        if(this.orientation[vector]>0){this.orientation[vector]-=0.1}
        if(this.orientation[vector]<0){this.orientation[vector]+=0.1}
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

    draw(p5){
        let lightBlue = getRGB('light-blue');
        let orange = getRGB('orange');

        let x = this.position.x;
        let y = this.position.y;

        // if(this.spawned)return

        //zoom modifications
        this.xDif = this.settings.yDif * this.zoom;
        this.yDif = this.settings.yDif * this.zoom;
        this.hidrogen = this.settings.hidrogen *this.zoom;
        this.oxigen = this.settings.oxigen *this.zoom;
        this.centerY = this.yDif*0.5;

        p5.noStroke();
        p5.fill(lightBlue);
        p5.circle(x,y,this.oxigen);
        p5.fill(orange);
        p5.circle(x-this.xDif,y+this.yDif,this.hidrogen);
        p5.circle(x+this.xDif,y+this.yDif,this.hidrogen);

        // p5.stroke('red');
        p5.noFill();


        if(this.focused){
            p5.fill('#32323232')
        } 

        //TESTING
        if(this.identifier ==1){
            p5.fill('#ff0000a0')
        }
        if(this.identifier ==2){
            p5.fill('#00ff00a0')
        }
        if(this.identifier ==3){
            p5.fill('#0000ffa0')
        }
        //TESTING ENDS

        p5.circle(x, y+ this.centerY, this.colitionDistance*2);

    }
}



