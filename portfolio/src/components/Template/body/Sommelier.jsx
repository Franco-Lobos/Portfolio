import Sketch from "react-p5";

import { getRGB } from "../../../library/library";

import '../../../styles/sommelier.css'


const Sommelier = () =>{

    let bg = getRGB('dark-bg');
    let lightBlue = getRGB('light-blue');
    let orange = getRGB('orange');

    var w = window.innerWidth;
    var h = window.innerHeight;

    let frameRate = 100;

    const Water =(p5, path)=>{

        let x = path.x;
        let y = path.y;
        let colitionable = path.colitionable

        p5.noStroke();
        p5.fill(lightBlue);
        p5.circle(x,y,water.oxigen);
        p5.fill(orange);
        p5.circle(x-water.xDif,y+water.yDif,water.hidrogen);
        p5.circle(x+water.xDif,y+water.yDif,water.hidrogen);

        p5.stroke('red');
        p5.noFill();

        if(colitionable){
            p5.fill('red')
        }
        p5.circle(x,y + water.centerY, water.colitionDistance);
        
        // let triangleCoord = [
        //     x,
        //     y-water.oxigen,
        //     x-water.xDif - water.hidrogen,
        //     y+water.yDif + water.hidrogen,
        //     x+water.xDif + water.hidrogen,
        //     y+water.yDif + water.hidrogen,
        // ];
        // p5.triangle(...triangleCoord);

    }

    let scale = 0.2
    let waterPaths = [];
    let water = {
        waterAmount : 100,
        oxigen : 40* scale,
        hidrogen : 20* scale,
        distanceR : 95.84* scale,
        angle : 52.225*Math.PI/180,
    }

    water['cosen'] =  Math.cos(water.angle);
    water['sinus'] =  Math.sin(water.angle);
    water['xDif'] =   water.sinus * water.distanceR;
    water['yDif'] =   water.cosen * water.distanceR;
    water['centerY'] = water.yDif*0.7;
    water['colitionDistance'] = water.distanceR*2;


    
    for(let i=0; i<water.waterAmount; i++){
        let randomXStart = Math.random(); // from 0 to 1
        let randomYStart =  h*(0.6 + Math.random()*10/40);
        let randomOscilation = Math.floor(Math.random()*300)+300 // from 0 to 1
        let randomOrientation = Math.floor(Math.random()*10)%2===0 ? 1 : -1;
        let randomYVelocity = Math.floor(Math.random()*10)/50;
        let randomXVelocity = Math.floor(Math.random()*10)/50;

        let props = {
            id: 'water-'+i,
            oscilations: randomOscilation ,
            xOrientation : (0.2 + randomXVelocity) * randomOrientation ,
            yOrientation : -0.4 + randomYVelocity,
            originXOrientation :  (0.2 + randomXVelocity) * randomOrientation ,
            originYOrientation : -0.4 + randomYVelocity,

            x : randomXStart * w,
            y : randomYStart,
            colitionable : 0,// set default 1
        }
        waterPaths.push(props);
    }

    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w, h).parent(canvasParentRef);
        p5.frameRate(frameRate);
	};

	const draw = (p5) => {
        p5.background(bg);
        let count = p5.frameCount;

        for (let i = 0; i<water.waterAmount; i++){
            let path = waterPaths[i];
            let cicle = count%path.oscilations;
            if (cicle === 0){
                path.xOrientation*=-1;
                let variability = Math.floor(Math.random()*200) -10;
                path.oscilations +=variability;
            }
            path.x+= path.xOrientation;
            let randomUp =  Math.floor(Math.random()*1000)%2;
            path.y+= path.yOrientation*randomUp;
            // path.y+= path.yOrientation;


            //H20 Colition
            let flag = 0;
            waterPaths.map( wat=> { 
                if( wat.id === path.id) return;
                let a = wat.x-path.x;
                let b = wat.y-path.y
                let hipotenuse = Math.sqrt((a)**2+(b)**2);
                if(hipotenuse <= water.colitionDistance &&  !wat.colitionable){
                    flag =1;
                    path.colitionable = 1;

                    path.xOrientation *= -1;
                    wat.xOrientation *= -1;

                    if(b<0){
                        path.yOrientation*=-1.2;
                    }else{
                        path.yOrientation*=1.2;
                    }
                }
            })

            if(!flag){
                path.colitionable = 0;
                path.yOrientation = path.originYOrientation;
            }

            //H20 draw
            Water(p5,path);

            waterPaths[i]=path;
        }
        
    }

    return <Sketch setup={setup} draw={draw}/>;
}


export default Sommelier;