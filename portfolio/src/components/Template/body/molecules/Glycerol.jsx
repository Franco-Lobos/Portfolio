


export class Glycerol{
    constructor( p5, molecule){
        this.waterComparisonX=1.5;
        this.waterComparisonY=0;   
             
        this.name = 'glycerol'

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
            carbon3:{
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
            oxigen2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.oxigen,
                orbital:{
                    radius: molecule.sizes.oxigen,
                    length: 0.2
                },
            },
            oxigen3:{
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

            hidrogen2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.hidrogen,
                orbital:{
                    radius: molecule.sizes.hidrogen,
                    length: 0.2
                },
            },
            hidrogen3:{
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
                oh: molecule.bond.oh.dif,
                coBehindCenter: molecule.bond.coBehindCenter.dif,
                ohBehindBehind: molecule.bond.ohBehindBehind.dif,

            },
            textSize : molecule.settings.textSize,
            textCentered: 0.4
        }
        this.activeType = 0;

    }

    setZoom(molecule){
        this.drawSet.bondDif.cc =  molecule.bond.cc.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.co =  molecule.bond.co.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.oh =  molecule.bond.oh.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.coBehindCenter =  molecule.bond.coBehindCenter.dif.copy().mult(molecule.zoom* molecule.settings.behindScale / molecule.bond.coBehindCenter.behind) ;
        this.drawSet.bondDif.ohBehindBehind =  molecule.bond.ohBehindBehind.dif.copy().mult(molecule.zoom* molecule.settings.behindScale / molecule.bond.ohBehindBehind.behind) ;

        this.drawSet.carbon1.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.carbon2.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.carbon3.size = molecule.sizes.carbon * molecule.zoom 

        this.drawSet.oxigen1.size = molecule.sizes.oxigen * molecule.zoom * molecule.settings.behindScale / molecule.bond.coBehindCenter.behind
        this.drawSet.oxigen2.size = molecule.sizes.oxigen * molecule.zoom 
        this.drawSet.oxigen3.size = molecule.sizes.oxigen * molecule.zoom 

        this.drawSet.hidrogen1.size = molecule.sizes.hidrogen * molecule.zoom * molecule.settings.behindScale / molecule.bond.ohBehindBehind.behind
        this.drawSet.hidrogen2.size = molecule.sizes.hidrogen * molecule.zoom
        this.drawSet.hidrogen3.size = molecule.sizes.hidrogen * molecule.zoom


        this.drawSet.carbon1.position = molecule.position.copy();
        this.drawSet.carbon2.position = this.drawSet.carbon1.position.copy().add(-this.drawSet.bondDif.cc.x,this.drawSet.bondDif.cc.y)
        this.drawSet.carbon3.position = this.drawSet.carbon1.position.copy().add(this.drawSet.bondDif.cc.x,this.drawSet.bondDif.cc.y)

        this.drawSet.oxigen1.position = this.drawSet.carbon1.position.copy().add(this.drawSet.bondDif.coBehindCenter.x,-this.drawSet.bondDif.coBehindCenter.y)
        this.drawSet.oxigen2.position = this.drawSet.carbon2.position.copy().add(-this.drawSet.bondDif.co.x,-this.drawSet.bondDif.co.y)
        this.drawSet.oxigen3.position = this.drawSet.carbon3.position.copy().add(this.drawSet.bondDif.co.x,-this.drawSet.bondDif.co.y)

        this.drawSet.hidrogen1.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.ohBehindBehind.x,this.drawSet.bondDif.ohBehindBehind.y)
        this.drawSet.hidrogen2.position = this.drawSet.oxigen2.position.copy().add(-this.drawSet.bondDif.oh.x,this.drawSet.bondDif.oh.y)
        this.drawSet.hidrogen3.position = this.drawSet.oxigen3.position.copy().add(this.drawSet.bondDif.oh.x,this.drawSet.bondDif.oh.y)

    }

    draw(p5,molecule,colors){
              
        //Bonds
        if(molecule.focused){
            // carbon 1 - carbon 2
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon2, molecule.bond.cc, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.carbon1, molecule.bond.cc, 2/6);

            // // carbon 1 - carbon 3
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon3, molecule.bond.cc, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.carbon1, molecule.bond.cc, 2/6);

            // // carbon 2 - oxigen 2
            molecule.drawP1P1(p5,this.drawSet.oxigen2, this.drawSet.carbon2, molecule.bond.co, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.oxigen2, molecule.bond.co, 2/6);

            // // carbon 3 - oxigen 3
            molecule.drawP1P1(p5,this.drawSet.oxigen3, this.drawSet.carbon3, molecule.bond.co, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.oxigen3, molecule.bond.co, 2/6);



            // // oxigen 2 - hidrogen 2
            molecule.drawP1P1(p5,this.drawSet.oxigen2, this.drawSet.hidrogen2, molecule.bond.oh);
            // // oxigen 3 - hidrogen 3
            molecule.drawP1P1(p5,this.drawSet.oxigen3, this.drawSet.hidrogen3, molecule.bond.oh);


            // behind 
            // carbon 1 - oxigen 1
            molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.carbon1, molecule.bond.coBehindCenter, 1/5);
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.oxigen1, molecule.bond.coBehindCenter, 2/5);
            // oxigen 1 - hidrogen 1
            molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen1, molecule.bond.ohBehindBehind);

        }

  
        p5.fill(colors.blue)
        // //Carbon1
        p5.circle(this.drawSet.carbon1.position.x,this.drawSet.carbon1.position.y,this.drawSet.carbon1.size);
        // // Carbon2
        p5.circle(this.drawSet.carbon2.position.x,this.drawSet.carbon2.position.y,this.drawSet.carbon2.size);
        // // Carbon3
        p5.circle(this.drawSet.carbon3.position.x,this.drawSet.carbon3.position.y,this.drawSet.carbon3.size);

        p5.fill(colors.lightBlue)
        // Oxigen1
        // p5.fill(colors.orange)
        p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen1.size);
        p5.fill(colors.lightBlue)
        // Oxigen2
        p5.circle(this.drawSet.oxigen2.position.x,this.drawSet.oxigen2.position.y,this.drawSet.oxigen2.size);
        // Oxigen3
        p5.circle(this.drawSet.oxigen3.position.x,this.drawSet.oxigen3.position.y,this.drawSet.oxigen3.size);
        
        // //Hidrogen
        p5.fill(colors.orange)
        p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen1.size);
        p5.circle(this.drawSet.hidrogen2.position.x,this.drawSet.hidrogen2.position.y,this.drawSet.hidrogen2.size);
        p5.circle(this.drawSet.hidrogen3.position.x,this.drawSet.hidrogen3.position.y,this.drawSet.hidrogen3.size);


  
        //Letters
        if(molecule.focused){
            p5.fill(colors.darkBg);
            p5.textSize(this.drawSet.textSize);
            p5.text('C', this.drawSet.carbon1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('C', this.drawSet.carbon2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('C', this.drawSet.carbon3.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon3.position.y+this.drawSet.textSize*this.drawSet.textCentered);

            p5.textSize(this.drawSet.textSize);
            p5.text('O', this.drawSet.oxigen2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('O', this.drawSet.oxigen3.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen3.position.y+this.drawSet.textSize*this.drawSet.textCentered);

            p5.text('H', this.drawSet.hidrogen2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('H', this.drawSet.hidrogen3.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen3.position.y+this.drawSet.textSize*this.drawSet.textCentered);

            // Behind de center
            let textSize =this.drawSet.textSize*molecule.settings.behindScale
            p5.textSize(textSize);
            p5.text('O', this.drawSet.oxigen1.position.x-textSize*this.drawSet.textCentered,this.drawSet.oxigen1.position.y+textSize*this.drawSet.textCentered);
            
            // Behind behind
            textSize *=0.9
            p5.text('H', this.drawSet.hidrogen1.position.x-textSize*this.drawSet.textCentered,this.drawSet.hidrogen1.position.y+textSize*this.drawSet.textCentered);

        }
        //Bacgrownd
        p5.noFill();
        if(molecule.focused){
            p5.fill('#32323232')
            // p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);
        } 
               
    }
}