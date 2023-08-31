    // // __setBonds(molecule){

    // //     // OXIGEN1 - HIDROGEN1
    // //     //Set nucle in order to "add" the radius in all cases;
    // //     this.bondSet.o1h1.origin.nucle = new p5.Vector(
    // //             this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.x>= this.drawSet.hidrogen1.position.x ? -1 : 1) * molecule.bond.oh.sin,
    // //             this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.y>= this.drawSet.hidrogen1.position.y ? -1 : 1) * molecule.bond.oh.cos
    // //         );
    // //     this.bondSet.o1h1.origin.position= this.drawSet.oxigen1.position.copy();

    // //     this.bondSet.o1h1.destiny.nucle = new p5.Vector(
    // //         this.drawSet.hidrogen1.size/2 * (this.drawSet.hidrogen1.position.x>= this.drawSet.oxigen1.position.x ? -1 : 1) * molecule.bond.oh.sin,
    // //         this.drawSet.hidrogen1.size/2 * (this.drawSet.hidrogen1.position.y>= this.drawSet.oxigen1.position.y ? -1 : 1) * molecule.bond.oh.cos
    // //     );
    // //     this.bondSet.o1h1.destiny.position= this.drawSet.hidrogen1.position.copy();

    // //     // OXIGEN1 - HIDROGEN2
    // //     this.bondSet.o1h2.origin.nucle = new p5.Vector(
    // //         this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.x>= this.drawSet.hidrogen2.position.x ? -1 : 1) * molecule.bond.oh.sin,
    // //         this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.y>= this.drawSet.hidrogen2.position.y ? -1 : 1) * molecule.bond.oh.cos
    // //     );
    // //     this.bondSet.o1h2.origin.position= this.drawSet.oxigen1.position.copy();

    // //     this.bondSet.o1h2.destiny.nucle = new p5.Vector(
    // //         this.drawSet.hidrogen2.size/2 * (this.drawSet.hidrogen2.position.x>= this.drawSet.oxigen1.position.x ? -1 : 1) * molecule.bond.oh.sin,
    // //         this.drawSet.hidrogen2.size/2 * (this.drawSet.hidrogen2.position.y>= this.drawSet.oxigen1.position.y ? -1 : 1) * molecule.bond.oh.cos
    // //     );
    // //     this.bondSet.o1h2.destiny.position= this.drawSet.hidrogen2.position.copy();

    // // }



    //     // __drawBond(molecule){

    // //     //Set hidrogen 1
    // //     this.drawSet.hidrogen1.bondOxigen.x = this.drawSet.oxigen1.position.x - molecule.sizes.sin * this.drawSet.oxigen/2;
    // //     this.drawSet.hidrogen1.bondOxigen.y = this.drawSet.oxigen1.position.y + molecule.sizes.cos * this.drawSet.oxigen/2;
    // //     this.drawSet.hidrogen1.bondThis.x = this.drawSet.hidrogen1.position.x + molecule.sizes.sin * this.drawSet.hidrogen/2;
    // //     this.drawSet.hidrogen1.bondThis.y = this.drawSet.hidrogen1.position.y - molecule.sizes.cos * this.drawSet.hidrogen/2;

    // //     //Set hidrogen 2
    // //     this.drawSet.hidrogen2.bondOxigen.x = this.drawSet.oxigen1.position.x + molecule.sizes.sin * this.drawSet.oxigen/2;
    // //     this.drawSet.hidrogen2.bondOxigen.y = this.drawSet.oxigen1.position.y + molecule.sizes.cos * this.drawSet.oxigen/2;
    // //     this.drawSet.hidrogen2.bondThis.x = this.drawSet.hidrogen2.position.x - molecule.sizes.sin * this.drawSet.hidrogen/2;
    // //     this.drawSet.hidrogen2.bondThis.y = this.drawSet.hidrogen2.position.y - molecule.sizes.cos * this.drawSet.hidrogen/2;


    // //     //general oxigen hidrogen n
    // //     this.drawSet.oxigen1.orbital.radius = this.drawSet.oxigen * 3 * this.drawSet.oxigen1.orbital.length;
    // //     //general oxigen hidrogen ends

    // //     //Set orbital Oxigen Hidrogen1:
    // //     this.drawSet.oxigen1.orbital.hidrogen1 = this.drawSet.hidrogen1.bondThis.copy();
    // //     this.drawSet.oxigen1.orbital.hidrogen1.x += (this.drawSet.hidrogen1.bondOxigen.x-this.drawSet.oxigen1.orbital.hidrogen1.x)* this.drawSet.oxigen1.orbital.length;
    // //     this.drawSet.oxigen1.orbital.hidrogen1.y += (this.drawSet.hidrogen1.bondOxigen.y-this.drawSet.oxigen1.orbital.hidrogen1.y)* this.drawSet.oxigen1.orbital.length;


    // //     //Set orbital Oxigen Hidrogen2:
    // //     this.drawSet.oxigen1.orbital.hidrogen2 = this.drawSet.hidrogen2.bondThis.copy();
    // //     this.drawSet.oxigen1.orbital.hidrogen2.x += (this.drawSet.hidrogen2.bondOxigen.x-this.drawSet.oxigen1.orbital.hidrogen2.x)* this.drawSet.oxigen1.orbital.length;
    // //     this.drawSet.oxigen1.orbital.hidrogen2.y += (this.drawSet.hidrogen2.bondOxigen.y-this.drawSet.oxigen1.orbital.hidrogen2.y)* this.drawSet.oxigen1.orbital.length;


    // //     //Set orbital Hidrogen Radius:
    // //     let bond = new p5.Vector(0,0);
    // //     bond.x = this.drawSet.oxigen1.orbital.hidrogen1.x - this.drawSet.oxigen1.orbital.radius*molecule.sizes.cos,
    // //     bond.y = this.drawSet.oxigen1.orbital.hidrogen1.y - this.drawSet.oxigen1.orbital.radius*molecule.sizes.sin,
    // //     bond.sub(this.drawSet.hidrogen1.position);

    // //     let bondLength = Math.sqrt(bond.x**2 + bond.y**2); 
    // //     this.drawSet.hidrogen1.orbital.radius = bondLength*2
    // // }


    //     // drawSP2S1(p5,bond){
    // //     bond.origin.position.add(bond.origin.nucle);
    // //     bond.destiny.position.add(bond.destiny.nucle);

    // //     bond.module.x = bond.origin.position.x-bond.destiny.position.x;
    // //     bond.module.y = bond.origin.position.y-bond.destiny.position.y;

    // //     bond.module.length = Math.sqrt(bond.module.x**2+bond.module.y**2);
        
    // //     let randomNum = Math.random();
    // //     let randomCoord = bond.origin.position.copy().sub(bond.module.copy().mult(randomNum,randomNum))
    // //     //Drawing
    // //     p5.stroke('#ff0000');
    // //     p5.fill('#ff0000');
    // //     p5.circle(randomCoord.x,randomCoord.y,1);
    // //     // p5.line(bond.origin.position.x,bond.origin.position.y, bond.destiny.position.x,bond.destiny.position.y)
    // // }



    // //ZOOM BOND
    //     // if(molecule.focused){
    //     //     this.__drawBond(molecule);
    //     //     p5.stroke('#ffffff');
    //     //     p5.line(this.drawSet.hidrogen1.bondThis.x, this.drawSet.hidrogen1.bondThis.y, this.drawSet.hidrogen1.bondOxigen.x,this.drawSet.hidrogen1.bondOxigen.y)
    //     //     p5.line(this.drawSet.hidrogen2.bondThis.x, this.drawSet.hidrogen2.bondThis.y, this.drawSet.hidrogen2.bondOxigen.x,this.drawSet.hidrogen2.bondOxigen.y)


    //     //     p5.fill('#f0f0f0a0');
    //     //     p5.noStroke();
    //     //     //Oxigen - hidrogen 1 orbital
    //     //     p5.arc(
    //     //         this.drawSet.oxigen1.orbital.hidrogen1.x,
    //     //         this.drawSet.oxigen1.orbital.hidrogen1.y,
    //     //         this.drawSet.oxigen1.orbital.radius*2,
    //     //         this.drawSet.oxigen1.orbital.radius*2,
    //     //         molecule.sizes.angle,
    //     //         molecule.sizes.angle+p5.PI
    //     //     );

    //     //     //Orbital Oxigen-hidrogen-1
    //     //     p5.triangle(
    //     //         this.drawSet.oxigen1.orbital.hidrogen1.x - this.drawSet.oxigen1.orbital.radius*molecule.sizes.cos,
    //     //         this.drawSet.oxigen1.orbital.hidrogen1.y - this.drawSet.oxigen1.orbital.radius*molecule.sizes.sin,
    //     //         this.drawSet.oxigen1.orbital.hidrogen1.x + this.drawSet.oxigen1.orbital.radius*molecule.sizes.cos,
    //     //         this.drawSet.oxigen1.orbital.hidrogen1.y + this.drawSet.oxigen1.orbital.radius*molecule.sizes.sin,
    //     //         this.drawSet.hidrogen1.bondOxigen.x,
    //     //         this.drawSet.hidrogen1.bondOxigen.y,
    //     //     )

    //     //     //Hidrogen 1 orbital
    //     //     p5.circle(
    //     //         this.drawSet.hidrogen1.position.x,
    //     //         this.drawSet.hidrogen1.position.y,
    //     //         this.drawSet.hidrogen1.orbital.radius
    //     //     )

    //     //     //Oxigen - hidrogen 2 orbital

    //     //     p5.arc(
    //     //         this.drawSet.oxigen1.orbital.hidrogen2.x,
    //     //         this.drawSet.oxigen1.orbital.hidrogen2.y,
    //     //         this.drawSet.oxigen1.orbital.radius*2,
    //     //         this.drawSet.oxigen1.orbital.radius*2,
    //     //         -molecule.sizes.angle,
    //     //         p5.PI-molecule.sizes.angle,

    //     //     );
    //     //     //Orbital Oxigen-hidrogen-2
    //     //     p5.triangle(
    //     //         this.drawSet.oxigen1.orbital.hidrogen2.x - this.drawSet.oxigen1.orbital.radius* molecule.sizes.cos,
    //     //         this.drawSet.oxigen1.orbital.hidrogen2.y - this.drawSet.oxigen1.orbital.radius*-molecule.sizes.sin,
    //     //         this.drawSet.oxigen1.orbital.hidrogen2.x + this.drawSet.oxigen1.orbital.radius* molecule.sizes.cos,
    //     //         this.drawSet.oxigen1.orbital.hidrogen2.y + this.drawSet.oxigen1.orbital.radius*-molecule.sizes.sin,
    //     //         this.drawSet.hidrogen2.bondOxigen.x,
    //     //         this.drawSet.hidrogen2.bondOxigen.y,
    //     //     )       

    //     //     //Hidrogen 2 orbital
    //     //     p5.circle(
    //     //         this.drawSet.hidrogen2.position.x,
    //     //         this.drawSet.hidrogen2.position.y,
    //     //         this.drawSet.hidrogen1.orbital.radius
    //     //     )
    //     // }









    //     // drawP1P1(p5, atomOrigin, atomDestiny, bondType){
    // //     let bond= {
    // //         origin:{
    // //             nucle:  atomOrigin.position.copy(),
    // //             position: atomOrigin.position.copy(),
    // //         },
    // //         destiny:{
    // //             nucle:  atomDestiny.position.copy(),
    // //             position: atomDestiny.position.copy(),
    // //         },
    // //         module: {
    // //             x:0,
    // //             y:0,
    // //             z:0
    // //         },
    // //         sin : bondType.sin,
    // //         cos : bondType.cos,
    // //         limit: 0.4,
    // //         p1:{
    // //             limit:0,
    // //             radius: atomOrigin.size*1.5,
    // //         },

    // //         electron:{
    // //             size: 10 * this.scale,
    // //             sizeDefault: 10 * this.scale,
    // //             sizeFocus : 30 * this.scale,
    // //         }
    // //     }


    // //      //Set nucle in order to "add" the radius in all cases;
    // //     let xDeterminant = atomOrigin.position.x>=atomDestiny.position.x ? -1 : 1
    // //     let yDeterminant = atomOrigin.position.y>= atomDestiny.position.y ? -1 : 1

    // //     bond.origin.nucle.x = atomOrigin.size/2 * xDeterminant * bond.sin;
    // //     bond.origin.nucle.y = atomOrigin.size/2 * yDeterminant * bond.cos;
    // //     bond.destiny.nucle.x = atomDestiny.size/2 * -xDeterminant * bond.sin;
    // //     bond.destiny.nucle.y = atomDestiny.size/2 * -yDeterminant * bond.cos;

    // //     bond.origin.position.add(bond.origin.nucle);
    // //     bond.destiny.position.add(bond.destiny.nucle);

    // //     bond.module = bond.origin.position.copy().sub(bond.destiny.position);
    // //     bond.module.length = Math.sqrt(bond.module.x**2+bond.module.y**2);
        

    // //     bond.p1.limit = bond.limit + bond.p1.radius/bond.module.length

    // //     for(let i = 0; i<1024;i++){

    // //     //size and colors settings
    // //     if(i<2){
    // //         // p5.fill('red');
    // //         // bond.electron.size=bond.electron.sizeFocus;
    // //     }else{
    // //         let opacity = i.toString(16);
    // //         p5.fill(`#${opacity+opacity+opacity+opacity}`);
    // //         // p5.fill(`#ffffff`);
    // //         p5.fill('red');
    // //         bond.electron.size=bond.electron.sizeDefault;
    // //     }
    // //     //First step: exe location
    // //     let exeLoctaion = 1-Math.random()**(Math.PI/2);
    // //     let randomCoord = bond.origin.position.copy().sub(bond.module.copy().mult(exeLoctaion,exeLoctaion))

    // //     //Second step: orbital location
    // //     if(exeLoctaion <= bond.limit){
    // //         let randomSide = Math.floor(Math.random()*10)%2 === 0 ? -1 : 1;
    // //         let triangleLocation = Math.random();
    // //         let randomCoordCopy= randomCoord.copy();
    // //         randomCoordCopy.x += exeLoctaion * bond.p1.radius * bond.cos * triangleLocation * randomSide * -xDeterminant;
    // //         randomCoordCopy.y += exeLoctaion * bond.p1.radius * bond.sin * triangleLocation * randomSide * yDeterminant;
    // //         p5.circle( randomCoordCopy.x, randomCoordCopy.y,bond.electron.size);
    // //     }

    // //     else{
    // //         if(exeLoctaion < bond.p1.limit){
    // //             let module = exeLoctaion - bond.limit;

    // //             let randomCoordCopy= randomCoord.copy();
    // //             randomCoordCopy.add(bond.module.copy().mult(module,module));

    // //             let randomAngle = Math.random()*Math.PI*2;
    // //             randomAngle += Math.acos(bond.cos);
    // //             let randomCos = Math.cos(randomAngle);
    // //             let randomSin = Math.sin(randomAngle);

    // //             module = bond.p1.limit;

    // //             randomCoordCopy.x += randomCos * bond.p1.radius * module * -xDeterminant ;
    // //             randomCoordCopy.y += randomSin * bond.p1.radius * module * yDeterminant ;
    // //             p5.fill('#00ff00');
    // //             p5.circle( randomCoordCopy.x, randomCoordCopy.y,bond.electron.size);

    // //             //testing

    // //             let n = 2
    // //             randomCos = (randomCos**n) * bond.cos
    // //             randomSin = (randomSin**n)* bond.sin

    // //             randomCoordCopy.x += randomCos * bond.p1.radius * module * xDeterminant;
    // //             randomCoordCopy.y += randomSin * bond.p1.radius * module * yDeterminant;
    // //             p5.fill('#ff0000');
    // //             p5.circle( randomCoordCopy.x, randomCoordCopy.y,bond.electron.size);
    // //             //testingEnds
    // //         }
    // //     }
    // //     }
    // // }



    // drawSP2S1(p5, atomOrigin, atomDestiny, bondType){
    //     let bond= {
    //         origin:{
    //             nucle:  atomOrigin.position.copy(),
    //             position: atomOrigin.position.copy(),
    //         },
    //         destiny:{
    //             nucle:  atomDestiny.position.copy(),
    //             position: atomDestiny.position.copy(),
    //         },
    //         module: {
    //             x:0,
    //             y:0,
    //             z:0
    //         },
    //         sin : bondType.sin,
    //         cos : bondType.cos,
    //         limit: 0.9,
    //         sp2:{
    //             center:0,
    //             radius: atomOrigin.size*2.5,
    //         },
    //         s1:{
    //             center:0,
    //             // radius: atomDestiny.size*2,
    //         },
    //         electron:{
    //             size: 10 * this.scale,
    //             sizeDefault: 10 * this.scale,
    //             sizeFocus : 30 * this.scale,
    //         }
    //     }

    //     bond.sp2.center= bond.limit/3*2;
    //     bond.s1.center= bond.limit/5*4;


    //      //Set nucle in order to "add" the radius in all cases;
    //     let xDeterminant = atomOrigin.position.x>=atomDestiny.position.x ? -1 : 1
    //     let yDeterminant = atomOrigin.position.y>= atomDestiny.position.y ? -1 : 1

    //     bond.origin.nucle.x = atomOrigin.size/2 * xDeterminant * bond.sin;
    //     bond.origin.nucle.y = atomOrigin.size/2 * yDeterminant * bond.cos;
    //     bond.destiny.nucle.x = atomDestiny.size/2 * -xDeterminant * bond.sin;
    //     bond.destiny.nucle.y = atomDestiny.size/2 * -yDeterminant * bond.cos;

    //     bond.origin.position.add(bond.origin.nucle);
    //     bond.destiny.position.add(bond.destiny.nucle);

    //     bond.module = bond.origin.position.copy().sub(bond.destiny.position);
    //     bond.module.length = Math.sqrt(bond.module.x**2+bond.module.y**2);
        
    //     for(let i = 0; i<256;i++){

    //     //size and colors settings
    //     if(i<2){
    //         // p5.fill('red');
    //         // bond.electron.size=bond.electron.sizeFocus;
    //     }else{
    //         let opacity = i.toString(16);
    //         p5.fill(`#${opacity+opacity+opacity+opacity}`);
    //         p5.fill(`#ffffff20`);

    //         bond.electron.size=bond.electron.sizeDefault;
    //     }
    //     //First step: exe location
    //     let exeLoctaion = 1-Math.random()**(Math.PI/2);
    //     let randomCoord = bond.origin.position.copy().sub(bond.module.copy().mult(exeLoctaion,exeLoctaion))

    //     //Second step: orbital location
    //     if(exeLoctaion <= bond.sp2.center){
    //         let randomSide = Math.floor(Math.random()*10)%2 === 0 ? -1 : 1;
    //         let triangleLocation = Math.random();
    //         let randomCoordCopy= randomCoord.copy();
    //         randomCoordCopy.x += exeLoctaion* bond.sp2.radius*bond.cos/2*triangleLocation * randomSide * -xDeterminant;
    //         randomCoordCopy.y += exeLoctaion* bond.sp2.radius*bond.sin/2*triangleLocation * randomSide * yDeterminant;
    //         p5.circle( randomCoordCopy.x, randomCoordCopy.y,bond.electron.size);
    //     }

    //     else{
    //         if(exeLoctaion < bond.limit){

    //             //testing
    //                 // let exeSubdivition =
    //                 //     exeLoctaion 
    //                 //     - bond.sp2.center;

    //                 // let exeLoctaionInverted =
    //                 //     bond.sp2.center
    //                 //     + (bond.sp2.radius/bond.module.length)
    //                 //     - (exeSubdivition**2)
    //             //testingends

    //             let module = exeLoctaion-bond.sp2.center;

    //             let randomCoordCopy= randomCoord.copy();
    //             randomCoordCopy.add(bond.module.copy().mult(module,module));

    //             let randomAngle = Math.acos(bond.cos)+(Math.random()*Math.PI);
    //             let randomCos = Math.cos(randomAngle);
    //             let randomSin = Math.sin(randomAngle);

    //             randomCoordCopy.x += randomCos * bond.sp2.radius * module * -xDeterminant ;
    //             randomCoordCopy.y += randomSin * bond.sp2.radius * module * yDeterminant ;
    //             // p5.fill('#00ff00');
    //             p5.circle( randomCoordCopy.x, randomCoordCopy.y,bond.electron.size);

    //         }
    //         if(exeLoctaion > bond.s1.center){
    //             let atomModule = atomDestiny.position.copy();

    //             let randomAngle = Math.random()*Math.PI*2;
    //             let randomCos = Math.cos(randomAngle);
    //             let randomSin = Math.sin(randomAngle);
    
    //             exeLoctaion -=  bond.s1.center; 
    //             randomCoord = bond.destiny.position.copy().add(bond.module.copy().mult(exeLoctaion,exeLoctaion))

    //             let module = atomDestiny.position.copy().sub(randomCoord);
    //             let moduleLength = Math.sqrt(module.x**2+module.y**2);
       
    //             randomCoord = atomModule.add(moduleLength*randomCos, moduleLength*randomSin)
    //             // p5.fill('#0000ff');
    //             p5.circle( randomCoord.x, randomCoord.y,bond.electron.size);
    //         }
    //     }
    //     }
    // }
