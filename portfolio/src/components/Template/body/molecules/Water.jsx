
export class Water {
    constructor( p5, molecule){
        this.waterComparison=1;

        this.configuration= {
            oxigen : 30* molecule.settings.scale,
            hidrogen : 20* molecule.settings.scale,
            // angle : 52.225*Math.PI/180,
        }

        this.drawSet ={
            oxigen : this.configuration.oxigen,
            hidrogen : this.configuration.hidrogen,
            oxigen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                orbital:{
                    radius: this.configuration.oxigen,
                    length: 0.2
                },
                hidrogenRelation: {
                    hidrogen1: new p5.Vector(molecule.position.x,molecule.position.y),
                    hidrogen2: new p5.Vector(molecule.position.x,molecule.position.y),
                }

            },
            hidrogen1:{
                // position: new p5.Vector(molecule.position.x-this.configuration.xDif,molecule.position.y+this.configuration.yDif),
                bondOxigen: molecule.position.copy(),
                bondThis: molecule.position.copy(),
                orbital:{
                    radius: this.configuration.hidrogen,
                    length: 0.8
                }
            },
            hidrogen2:{
                // position: new p5.Vector(molecule.position.x+this.configuration.xDif,molecule.position.y+this.configuration.yDif),
                bondOxigen: molecule.position.copy(),
                bondThis: molecule.position.copy(),
            },

            bondDif:{
                hoh: molecule.bond.hoh.dif
            }

        };

    }

    __setZoom(molecule){
        this.drawSet.bondDif.hoh = molecule.bond.hoh.dif.copy().mult(molecule.zoom);

        this.drawSet.hidrogen = this.configuration.hidrogen * molecule.zoom;
        this.drawSet.oxigen = this.configuration.oxigen * molecule.zoom;

        //Set oxigen  1
        this.drawSet.oxigen1.position.x = molecule.position.x;
        this.drawSet.oxigen1.position.y = molecule.position.y - molecule.colitionDistance*0.4;
   
        this.drawSet.hidrogen1.position = this.drawSet.oxigen1.position.copy().add(-this.drawSet.bondDif.hoh.x,this.drawSet.bondDif.hoh.y)
        this.drawSet.hidrogen2.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.hoh.x,this.drawSet.bondDif.hoh.y)
        
        //Set hidrogen 1
        // this.drawSet.hidrogen1.position.x =  this.drawSet.oxigen1.position.x-this.drawSet.bondDif.hoh.x
        // this.drawSet.hidrogen1.position.y =  this.drawSet.oxigen1.position.y+this.drawSet.bondDif.hoh.y

        //Set hidrogen 2
        // this.drawSet.hidrogen2.position.x =  this.drawSet.oxigen1.position.x+this.drawSet.bondDif.hoh.x
        // this.drawSet.hidrogen2.position.y =  this.drawSet.oxigen1.position.y+this.drawSet.bondDif.hoh.y
    }

    // __drawBond(molecule){

    //     //Set hidrogen 1
    //     this.drawSet.hidrogen1.bondOxigen.x = this.drawSet.oxigen1.position.x - this.configuration.sin * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen1.bondOxigen.y = this.drawSet.oxigen1.position.y + this.configuration.cos * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen1.bondThis.x = this.drawSet.hidrogen1.position.x + this.configuration.sin * this.drawSet.hidrogen/2;
    //     this.drawSet.hidrogen1.bondThis.y = this.drawSet.hidrogen1.position.y - this.configuration.cos * this.drawSet.hidrogen/2;

    //     //Set hidrogen 2
    //     this.drawSet.hidrogen2.bondOxigen.x = this.drawSet.oxigen1.position.x + this.configuration.sin * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen2.bondOxigen.y = this.drawSet.oxigen1.position.y + this.configuration.cos * this.drawSet.oxigen/2;
    //     this.drawSet.hidrogen2.bondThis.x = this.drawSet.hidrogen2.position.x - this.configuration.sin * this.drawSet.hidrogen/2;
    //     this.drawSet.hidrogen2.bondThis.y = this.drawSet.hidrogen2.position.y - this.configuration.cos * this.drawSet.hidrogen/2;


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
    //     bond.x = this.drawSet.oxigen1.orbital.hidrogen1.x - this.drawSet.oxigen1.orbital.radius*this.configuration.cos,
    //     bond.y = this.drawSet.oxigen1.orbital.hidrogen1.y - this.drawSet.oxigen1.orbital.radius*this.configuration.sin,
    //     bond.sub(this.drawSet.hidrogen1.position);

    //     let bondLength = Math.sqrt(bond.x**2 + bond.y**2); 
    //     this.drawSet.hidrogen1.orbital.radius = bondLength*2
    // }

    draw(p5,molecule,colors){

        // Oxigen
        p5.fill(colors.lightBlue);
        p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen);

        // Hidrogens
        p5.fill(colors.orange);
        // Hidrogen 1
        p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen);
        // Hidrogen 2
        p5.circle(this.drawSet.hidrogen2.position.x,this.drawSet.hidrogen2.position.y,this.drawSet.hidrogen);


        //Bacgrownd
        p5.noFill();
        if(molecule.focused){
            p5.fill('#32323232')
        } 
        
        p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);


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
        //         this.configuration.angle,
        //         this.configuration.angle+p5.PI
        //     );

        //     //Orbital Oxigen-hidrogen-1
        //     p5.triangle(
        //         this.drawSet.oxigen1.orbital.hidrogen1.x - this.drawSet.oxigen1.orbital.radius*this.configuration.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen1.y - this.drawSet.oxigen1.orbital.radius*this.configuration.sin,
        //         this.drawSet.oxigen1.orbital.hidrogen1.x + this.drawSet.oxigen1.orbital.radius*this.configuration.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen1.y + this.drawSet.oxigen1.orbital.radius*this.configuration.sin,
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
        //         -this.configuration.angle,
        //         p5.PI-this.configuration.angle,

        //     );
        //     //Orbital Oxigen-hidrogen-2
        //     p5.triangle(
        //         this.drawSet.oxigen1.orbital.hidrogen2.x - this.drawSet.oxigen1.orbital.radius* this.configuration.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen2.y - this.drawSet.oxigen1.orbital.radius*-this.configuration.sin,
        //         this.drawSet.oxigen1.orbital.hidrogen2.x + this.drawSet.oxigen1.orbital.radius* this.configuration.cos,
        //         this.drawSet.oxigen1.orbital.hidrogen2.y + this.drawSet.oxigen1.orbital.radius*-this.configuration.sin,
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

        //TESTING

        // p5.fill('#00ff00a0')
        // p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y, molecule.colitionDistance)

        
        // if(this.identifier ==1){
        //     p5.fill('#ff0000a0')
        // }
        // if(this.identifier ==2){
        //     p5.fill('#00ff00a0')
        // }
        // if(this.identifier ==3){
        //     p5.fill('#0000ffa0')
        // }
        //TESTING ENDS
    }
}