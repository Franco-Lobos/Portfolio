
export class Water {
    constructor(p5, molecule){
        this.waterComparisonX=0;
        this.waterComparisonY=0;

        this.name = 'water'

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
            },

            textSize : molecule.settings.textSize,
            textCentered: 0.4
        };

        this.activeType = 0; 
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
        
        //Bonds
        if(molecule.focused){
            molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen1, molecule.bond.oh);
            molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen2, molecule.bond.oh);
        }

        // Oxigen
        p5.fill(colors.lightBlue);
        p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen1.size);

        // Hidrogen 1
        p5.fill(colors.orange);
        p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen1.size);

        // Hidrogen 2
        p5.circle(this.drawSet.hidrogen2.position.x,this.drawSet.hidrogen2.position.y,this.drawSet.hidrogen2.size);


        //Letters
        if(molecule.focused){
            p5.fill(colors.darkBg);
            p5.textSize(this.drawSet.textSize);
            p5.text('O', this.drawSet.oxigen1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('H', this.drawSet.hidrogen1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('H', this.drawSet.hidrogen2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
        }
        
        //Bacgrownd
        p5.noFill();
        if(molecule.focused){
            p5.fill('#32323232')
            // p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);
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