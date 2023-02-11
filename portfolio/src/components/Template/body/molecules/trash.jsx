    // __setBonds(molecule){

    //     // OXIGEN1 - HIDROGEN1
    //     //Set nucle in order to "add" the radius in all cases;
    //     this.bondSet.o1h1.origin.nucle = new p5.Vector(
    //             this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.x>= this.drawSet.hidrogen1.position.x ? -1 : 1) * molecule.bond.oh.sin,
    //             this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.y>= this.drawSet.hidrogen1.position.y ? -1 : 1) * molecule.bond.oh.cos
    //         );
    //     this.bondSet.o1h1.origin.position= this.drawSet.oxigen1.position.copy();

    //     this.bondSet.o1h1.destiny.nucle = new p5.Vector(
    //         this.drawSet.hidrogen1.size/2 * (this.drawSet.hidrogen1.position.x>= this.drawSet.oxigen1.position.x ? -1 : 1) * molecule.bond.oh.sin,
    //         this.drawSet.hidrogen1.size/2 * (this.drawSet.hidrogen1.position.y>= this.drawSet.oxigen1.position.y ? -1 : 1) * molecule.bond.oh.cos
    //     );
    //     this.bondSet.o1h1.destiny.position= this.drawSet.hidrogen1.position.copy();

    //     // OXIGEN1 - HIDROGEN2
    //     this.bondSet.o1h2.origin.nucle = new p5.Vector(
    //         this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.x>= this.drawSet.hidrogen2.position.x ? -1 : 1) * molecule.bond.oh.sin,
    //         this.drawSet.oxigen1.size/2 * (this.drawSet.oxigen1.position.y>= this.drawSet.hidrogen2.position.y ? -1 : 1) * molecule.bond.oh.cos
    //     );
    //     this.bondSet.o1h2.origin.position= this.drawSet.oxigen1.position.copy();

    //     this.bondSet.o1h2.destiny.nucle = new p5.Vector(
    //         this.drawSet.hidrogen2.size/2 * (this.drawSet.hidrogen2.position.x>= this.drawSet.oxigen1.position.x ? -1 : 1) * molecule.bond.oh.sin,
    //         this.drawSet.hidrogen2.size/2 * (this.drawSet.hidrogen2.position.y>= this.drawSet.oxigen1.position.y ? -1 : 1) * molecule.bond.oh.cos
    //     );
    //     this.bondSet.o1h2.destiny.position= this.drawSet.hidrogen2.position.copy();

    // }



        // __drawBond(molecule){

    //     //Set hidrogen 1
    //     this.drawSet.hidrogen1.bondOxigen.x = this.drawSet.oxigen1.position.x - molecule.sizes.sin * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen1.bondOxigen.y = this.drawSet.oxigen1.position.y + molecule.sizes.cos * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen1.bondThis.x = this.drawSet.hidrogen1.position.x + molecule.sizes.sin * this.drawSet.hidrogen/2;
    //     this.drawSet.hidrogen1.bondThis.y = this.drawSet.hidrogen1.position.y - molecule.sizes.cos * this.drawSet.hidrogen/2;

    //     //Set hidrogen 2
    //     this.drawSet.hidrogen2.bondOxigen.x = this.drawSet.oxigen1.position.x + molecule.sizes.sin * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen2.bondOxigen.y = this.drawSet.oxigen1.position.y + molecule.sizes.cos * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen2.bondThis.x = this.drawSet.hidrogen2.position.x - molecule.sizes.sin * this.drawSet.hidrogen/2;
    //     this.drawSet.hidrogen2.bondThis.y = this.drawSet.hidrogen2.position.y - molecule.sizes.cos * this.drawSet.hidrogen/2;


    //     //general oxigen hidrogen n
    //     this.drawSet.oxigen1.orbital.radius = this.drawSet.oxigen * 3 * this.drawSet.oxigen1.orbital.length;
    //     //general oxigen hidrogen ends

    //     //Set orbital Oxigen Hidrogen1:
    //     this.drawSet.oxigen1.orbital.hidrogen1 = this.drawSet.hidrogen1.bondThis.copy();
    //     this.drawSet.oxigen1.orbital.hidrogen1.x += (this.drawSet.hidrogen1.bondOxigen.x-this.drawSet.oxigen1.orbital.hidrogen1.x)* this.drawSet.oxigen1.orbital.length;
    //     this.drawSet.oxigen1.orbital.hidrogen1.y += (this.drawSet.hidrogen1.bondOxigen.y-this.drawSet.oxigen1.orbital.hidrogen1.y)* this.drawSet.oxigen1.orbital.length;


    //     //Set orbital Oxigen Hidrogen2:
    //     this.drawSet.oxigen1.orbital.hidrogen2 = this.drawSet.hidrogen2.bondThis.copy();
    //     this.drawSet.oxigen1.orbital.hidrogen2.x += (this.drawSet.hidrogen2.bondOxigen.x-this.drawSet.oxigen1.orbital.hidrogen2.x)* this.drawSet.oxigen1.orbital.length;
    //     this.drawSet.oxigen1.orbital.hidrogen2.y += (this.drawSet.hidrogen2.bondOxigen.y-this.drawSet.oxigen1.orbital.hidrogen2.y)* this.drawSet.oxigen1.orbital.length;


    //     //Set orbital Hidrogen Radius:
    //     let bond = new p5.Vector(0,0);
    //     bond.x = this.drawSet.oxigen1.orbital.hidrogen1.x - this.drawSet.oxigen1.orbital.radius*molecule.sizes.cos,
    //     bond.y = this.drawSet.oxigen1.orbital.hidrogen1.y - this.drawSet.oxigen1.orbital.radius*molecule.sizes.sin,
    //     bond.sub(this.drawSet.hidrogen1.position);

    //     let bondLength = Math.sqrt(bond.x**2 + bond.y**2); 
    //     this.drawSet.hidrogen1.orbital.radius = bondLength*2
    // }


        // drawSP2S1(p5,bond){
    //     bond.origin.position.add(bond.origin.nucle);
    //     bond.destiny.position.add(bond.destiny.nucle);

    //     bond.module.x = bond.origin.position.x-bond.destiny.position.x;
    //     bond.module.y = bond.origin.position.y-bond.destiny.position.y;

    //     bond.module.length = Math.sqrt(bond.module.x**2+bond.module.y**2);
        
    //     let randomNum = Math.random();
    //     let randomCoord = bond.origin.position.copy().sub(bond.module.copy().mult(randomNum,randomNum))
    //     //Drawing
    //     p5.stroke('#ff0000');
    //     p5.fill('#ff0000');
    //     p5.circle(randomCoord.x,randomCoord.y,1);
    //     // p5.line(bond.origin.position.x,bond.origin.position.y, bond.destiny.position.x,bond.destiny.position.y)
    // }



    //ZOOM BOND
        // if(molecule.focused){
        //     this.__drawBond(molecule);
        //     p5.stroke('#ffffff');
        //     p5.line(this.drawSet.hidrogen1.bondThis.x, this.drawSet.hidrogen1.bondThis.y, this.drawSet.hidrogen1.bondOxigen.x,this.drawSet.hidrogen1.bondOxigen.y)
        //     p5.line(this.drawSet.hidrogen2.bondThis.x, this.drawSet.hidrogen2.bondThis.y, this.drawSet.hidrogen2.bondOxigen.x,this.drawSet.hidrogen2.bondOxigen.y)


        //     p5.fill('#f0f0f0a0');
        //     p5.noStroke();
        //     //Oxigen - hidrogen 1 orbital
        //     p5.arc(
        //         this.drawSet.oxigen1.orbital.hidrogen1.x,
        //         this.drawSet.oxigen1.orbital.hidrogen1.y,
        //         this.drawSet.oxigen1.orbital.radius*2,
        //         this.drawSet.oxigen1.orbital.radius*2,
        //         molecule.sizes.angle,
        //         molecule.sizes.angle+p5.PI
        //     );

        //     //Orbital Oxigen-hidrogen-1
        //     p5.triangle(
        //         this.drawSet.oxigen1.orbital.hidrogen1.x - this.drawSet.oxigen1.orbital.radius*molecule.sizes.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen1.y - this.drawSet.oxigen1.orbital.radius*molecule.sizes.sin,
        //         this.drawSet.oxigen1.orbital.hidrogen1.x + this.drawSet.oxigen1.orbital.radius*molecule.sizes.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen1.y + this.drawSet.oxigen1.orbital.radius*molecule.sizes.sin,
        //         this.drawSet.hidrogen1.bondOxigen.x,
        //         this.drawSet.hidrogen1.bondOxigen.y,
        //     )

        //     //Hidrogen 1 orbital
        //     p5.circle(
        //         this.drawSet.hidrogen1.position.x,
        //         this.drawSet.hidrogen1.position.y,
        //         this.drawSet.hidrogen1.orbital.radius
        //     )

        //     //Oxigen - hidrogen 2 orbital

        //     p5.arc(
        //         this.drawSet.oxigen1.orbital.hidrogen2.x,
        //         this.drawSet.oxigen1.orbital.hidrogen2.y,
        //         this.drawSet.oxigen1.orbital.radius*2,
        //         this.drawSet.oxigen1.orbital.radius*2,
        //         -molecule.sizes.angle,
        //         p5.PI-molecule.sizes.angle,

        //     );
        //     //Orbital Oxigen-hidrogen-2
        //     p5.triangle(
        //         this.drawSet.oxigen1.orbital.hidrogen2.x - this.drawSet.oxigen1.orbital.radius* molecule.sizes.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen2.y - this.drawSet.oxigen1.orbital.radius*-molecule.sizes.sin,
        //         this.drawSet.oxigen1.orbital.hidrogen2.x + this.drawSet.oxigen1.orbital.radius* molecule.sizes.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen2.y + this.drawSet.oxigen1.orbital.radius*-molecule.sizes.sin,
        //         this.drawSet.hidrogen2.bondOxigen.x,
        //         this.drawSet.hidrogen2.bondOxigen.y,
        //     )       

        //     //Hidrogen 2 orbital
        //     p5.circle(
        //         this.drawSet.hidrogen2.position.x,
        //         this.drawSet.hidrogen2.position.y,
        //         this.drawSet.hidrogen1.orbital.radius
        //     )
        // }