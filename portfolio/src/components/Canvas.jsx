import { useState } from "react";
import Sketch from "react-p5";

const Canvas = ({loading,setLoad})=>{
    var w = window.innerWidth;
    var h = window.innerHeight;

    let frameRate = 100;
    let x = 1;
    let y = 1;
    let originW = w/2;
    let originH = h/2;
    let line = 12;
    let pixel = 10;
    let ready= 0;

    //color lines
    let lineAmount =  7;
    let lineWeigth = Math.floor(w/lineAmount);
    let colors = ['grey', 'yellow', 'cyan', 'green','magenta', 'red', 'blue']

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w, h).parent(canvasParentRef);
        p5.frameRate(frameRate);
	};

	const draw = (p5) => {
		p5.background('#242424');

        let ob1 = [originW-x, originH-y];
        let ob2 = [originW+x, originH-y];
        let ob3 = [originW+x, originH+y];
        let ob4 = [originW-x, originH+y];

        if(!ready){
            if(x<=originW){
                x+=x*2;
            }else{
                if(y<=originH){
                    y+= y*2;
                }
                else{
                    ready = 1;
                }
            }
    
            if(line>=2){
                line--;
            }
            p5.fill('#fff');
            p5.stroke('#fff');
            p5.strokeWeight(line);
            p5.quad(ob1[0],ob1[1],ob2[0],ob2[1],ob3[0],ob3[1],ob4[0],ob4[1]);
        }

        else{
            if(p5.frameCount<=60){
                for(let i= 0; i<=w; i+=pixel){
                    for(let j= 0; j<=h; j+=pixel){
                        let pix1 = [i, j];
                        let pix2 = [i+pixel, j];
                        let pix3 = [i+pixel, j+pixel];
                        let pix4 = [i, j+pixel];
                        let random = Math.floor(Math.random()*10)%2;
                        p5.fill(random ? '#323232' : '#f0f0f0');
                        p5.noStroke();
                        p5.quad(pix1[0],pix1[1],pix2[0],pix2[1],pix3[0],pix3[1],pix4[0],pix4[1]);
                    }
                }
            }

            if(p5.frameCount>60 &&p5.frameCount<=150){
                for(let i = 0; i<lineAmount; i++){

                    ob1 = [i*lineWeigth, 0];
                    ob2 = [(i+1) * lineWeigth, 0];
                    ob3 = [(i+1) * lineWeigth, h];
                    ob4 = [i*lineWeigth, h];

                    p5.fill(colors[i]);
                    p5.noStroke();
                    p5.quad(ob1[0],ob1[1],ob2[0],ob2[1],ob3[0],ob3[1],ob4[0],ob4[1]);
                }
            }

            else if(p5.frameCount>120){
                y-=p5.frameCount*1.6;
                if(y>=0){
                    p5.fill('#fff');
                    p5.stroke('#fff');
                    p5.strokeWeight(line);
                }
                else{
                    p5.noFill();
                    p5.noStroke();
                    p5.frameRate(0);
                    setLoad(1);
                }
         
                p5.quad(ob1[0],ob1[1],ob2[0],ob2[1],ob3[0],ob3[1],ob4[0],ob4[1]);
            }

        }
	};

	return <Sketch setup={setup} draw={draw}/>;

};

export default Canvas;