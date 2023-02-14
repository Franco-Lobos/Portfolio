
export class Ethanol {
    constructor( p5, molecule){
        this.waterComparison=3;
        
        this.drawSet ={
            carbon1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },

            oxigen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.oxigen,
                orbital:{
                    radius: molecule.sizes.oxigen,
                    length: 0.2
                },
            },

            hidrogen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.hidrogen,
                orbital:{
                    radius: molecule.sizes.hidrogen,
                    length: 0.2
                },
            },
            bondDif:{
                cc: molecule.bond.cc.dif,
                co: molecule.bond.co.dif,
                oh: molecule.bond.oh.dif
            },
            textSize : 24,
            textCentered: 0.4
        }
    }

    setZoom(molecule){
        this.drawSet.bondDif.cc =  molecule.bond.cc.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.co =  molecule.bond.co.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.oh =  molecule.bond.oh.dif.copy().mult(molecule.zoom);

        this.drawSet.carbon1.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.carbon2.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.oxigen1.size = molecule.sizes.oxigen * molecule.zoom 
        this.drawSet.hidrogen1.size = molecule.sizes.hidrogen * molecule.zoom
        // (this.waterComparison-molecule.settings.zoom)

        this.drawSet.carbon1.position = molecule.position.copy().sub(this.drawSet.bondDif.co.x/2,this.drawSet.bondDif.co.y/2)
        this.drawSet.carbon2.position = this.drawSet.carbon1.position.copy().add(-this.drawSet.bondDif.cc.x,this.drawSet.bondDif.cc.y)
        this.drawSet.oxigen1.position = molecule.position.copy().add(this.drawSet.bondDif.co.x/2,this.drawSet.bondDif.co.y/2)
        this.drawSet.hidrogen1.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.oh.x,-this.drawSet.bondDif.oh.y)
    }



    draw(p5,molecule,colors){
              
        //Bonds
        if(molecule.focused){
        // oxigen 1 - hidrogen 1
        molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen1, molecule.bond.oh);

        // oxigen 1 - carbon 2
        molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.carbon1, molecule.bond.oh, 2/5);
        molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.oxigen1, molecule.bond.oh, 2/5);

        // carbon 1 - carbon 2
        molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon2, molecule.bond.oh, 2/5);
        molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.carbon1, molecule.bond.oh, 2/5);

        }

  
        //Carbon1
        p5.fill(colors.blue)
        p5.circle(this.drawSet.carbon1.position.x,this.drawSet.carbon1.position.y,this.drawSet.carbon1.size);

        // //Carbon2
        p5.circle(this.drawSet.carbon2.position.x,this.drawSet.carbon2.position.y,this.drawSet.carbon2.size);

        // //Oxigen1
        p5.fill(colors.lightBlue)
        p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen1.size);
        
        // //Hidrogen
        p5.fill(colors.orange)
        p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen1.size);


  
        //Letters
        if(molecule.focused){
            p5.fill(colors.darkBg);
            p5.textSize(this.drawSet.textSize);
            p5.text('C', this.drawSet.carbon1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('C', this.drawSet.carbon2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('O', this.drawSet.oxigen1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('H', this.drawSet.hidrogen1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
        }
        //Bacgrownd
        p5.noFill();
        if(molecule.focused){
            p5.fill('#32323232')
            // p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);
        } 
               
    }
}