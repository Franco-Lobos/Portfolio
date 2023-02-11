
export class Water {
    constructor(p5, molecule){
        this.waterComparison=1;

        this.drawSet ={
            oxigen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.oxigen,
                orbital:{
                    length: 0.2
                },
                hidrogenRelation: {
                    hidrogen1: new p5.Vector(molecule.position.x,molecule.position.y),
                    hidrogen2: new p5.Vector(molecule.position.x,molecule.position.y),
                }

            },
            hidrogen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.hidrogen,
                bondOxigen: molecule.position.copy(),
                bondThis: molecule.position.copy(),
                orbital:{
                    length: 0.8
                }
            },
            hidrogen2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.hidrogen,
                bondOxigen: molecule.position.copy(),
                bondThis: molecule.position.copy(),
            },

            bondDif:{
                hoh: molecule.bond.hoh.dif
            }

        };

        // this.bondSet={
        //     o1h1:{
        //         origin : {
        //             nucle :molecule.position.copy(),
        //             position: molecule.position.copy(),
        //         },
        //         destiny : {
        //             nucle :molecule.position.copy(),
        //             position: molecule.position.copy(),
        //         },
        //         module: new p5.Vector(0,0)
        //     },

        //     o1h2:{
        //         origin : {
        //             nucle :molecule.position.copy(),
        //             position: molecule.position.copy(),
        //         },
        //         destiny : {
        //             nucle :molecule.position.copy(),
        //             position: molecule.position.copy(),
        //         },
        //         module: new p5.Vector(0,0)

        //     }
        // }    
    }

    setZoom(molecule){
        this.drawSet.bondDif.hoh = molecule.bond.hoh.dif.copy().mult(molecule.zoom);


        //Set Sizes
        this.drawSet.oxigen1.size = molecule.sizes.oxigen * molecule.zoom;
        this.drawSet.hidrogen1.size = molecule.sizes.hidrogen * molecule.zoom;
        this.drawSet.hidrogen2.size = molecule.sizes.hidrogen * molecule.zoom;

        //Set Positions
        this.drawSet.oxigen1.position.x = molecule.position.x;
        this.drawSet.oxigen1.position.y = molecule.position.y - molecule.colitionDistance*0.4;
        this.drawSet.hidrogen1.position = this.drawSet.oxigen1.position.copy().add(-this.drawSet.bondDif.hoh.x,this.drawSet.bondDif.hoh.y)
        this.drawSet.hidrogen2.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.hoh.x,this.drawSet.bondDif.hoh.y)
    }


    draw(p5,molecule,colors){

        // Oxigen
        p5.fill(colors.lightBlue);
        p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen1.size);

        // Hidrogens
        p5.fill(colors.orange);
        // Hidrogen 1
        p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen1.size);
        // Hidrogen 2
        p5.circle(this.drawSet.hidrogen2.position.x,this.drawSet.hidrogen2.position.y,this.drawSet.hidrogen2.size);


        //Bacgrownd
        p5.noFill();
        if(molecule.focused){
            p5.fill('#32323232')
        } 
        
        p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);


        //Bonds
        if(molecule.focused){
            molecule.drawSP2S1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen1, molecule.bond.oh);
            molecule.drawSP2S1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen2, molecule.bond.oh);
        }

        

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