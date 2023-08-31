


export class OrganicAcids{
    constructor( p5, molecule){
        this.waterComparisonX=2;
        this.waterComparisonY=0;
        
        this.name = 'organic-acids'

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

            carbon4:{
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
            oxigen21:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.oxigen,
                orbital:{
                    radius: molecule.sizes.oxigen,
                    length: 0.2
                },
            },

            oxigen22:{
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

            oxigen41:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.oxigen,
                orbital:{
                    radius: molecule.sizes.oxigen,
                    length: 0.2
                },
            },

            oxigen42:{
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

            hidrogen4:{
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
                c6c: molecule.bond.c6c.dif,

            },
            textSize : molecule.settings.textSize,
            textCentered: 0.4
        }

        this.types = [
            'Tartaric acid',
            'Malic acid',
            'Lactic acid',
        ]
        this.waterComparisonVariable =[
            2,
            2,
            0
        ]

        this.activeType = 0;
    }

    setZoom(molecule){
        this.drawSet.bondDif.cc =  molecule.bond.cc.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.co =  molecule.bond.co.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.oh =  molecule.bond.oh.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.coBehindCenter =  molecule.bond.coBehindCenter.dif.copy().mult(molecule.zoom* molecule.settings.behindScale / molecule.bond.coBehindCenter.behind) ;
        this.drawSet.bondDif.ohBehindBehind =  molecule.bond.ohBehindBehind.dif.copy().mult(molecule.zoom* molecule.settings.behindScale / molecule.bond.ohBehindBehind.behind) ;
        this.drawSet.bondDif.c6c =  molecule.bond.c6c.dif.copy().mult(molecule.zoom);

        this.drawSet.carbon1.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.carbon2.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.carbon3.size = molecule.sizes.carbon * molecule.zoom 
        this.drawSet.carbon4.size = molecule.sizes.carbon * molecule.zoom 

        this.drawSet.oxigen1.size = molecule.sizes.oxigen * molecule.zoom * molecule.settings.behindScale / molecule.bond.coBehindCenter.behind
        this.drawSet.oxigen21.size = molecule.sizes.oxigen * molecule.zoom 
        this.drawSet.oxigen22.size = molecule.sizes.oxigen * molecule.zoom 
        this.drawSet.oxigen3.size = molecule.sizes.oxigen * molecule.zoom * molecule.settings.behindScale / molecule.bond.coBehindCenter.behind
        this.drawSet.oxigen41.size = molecule.sizes.oxigen * molecule.zoom 
        this.drawSet.oxigen42.size = molecule.sizes.oxigen * molecule.zoom 


        this.drawSet.hidrogen1.size = molecule.sizes.hidrogen * molecule.zoom * molecule.settings.behindScale / molecule.bond.ohBehindBehind.behind
        this.drawSet.hidrogen2.size = molecule.sizes.hidrogen * molecule.zoom
        this.drawSet.hidrogen3.size = molecule.sizes.hidrogen * molecule.zoom * molecule.settings.behindScale / molecule.bond.ohBehindBehind.behind
        this.drawSet.hidrogen4.size = molecule.sizes.hidrogen * molecule.zoom

        // (this.waterComparison-molecule.settings.zoom)

        if(this.activeType ===2){
            this.drawSet.carbon3.position = molecule.position.copy().sub(this.drawSet.bondDif.cc.x/2,-this.drawSet.bondDif.cc.y/2)
        }
        else{
            this.drawSet.carbon3.position = molecule.position.copy().sub(-this.drawSet.bondDif.cc.x/2,-this.drawSet.bondDif.cc.y/2)
        }

        this.drawSet.carbon1.position = this.drawSet.carbon3.position.copy().add(-this.drawSet.bondDif.cc.x,-this.drawSet.bondDif.cc.y)
        this.drawSet.carbon2.position = this.drawSet.carbon1.position.copy().add(-this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon4.position = this.drawSet.carbon3.position.copy().add(this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)

        this.drawSet.oxigen1.position = this.drawSet.carbon1.position.copy().add(this.drawSet.bondDif.coBehindCenter.x,-this.drawSet.bondDif.coBehindCenter.y)
        this.drawSet.oxigen21.position = this.drawSet.carbon2.position.copy().add(0,this.drawSet.bondDif.co.y)
        this.drawSet.oxigen22.position = this.drawSet.carbon2.position.copy().add(-this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.oxigen3.position = this.drawSet.carbon3.position.copy().add(this.drawSet.bondDif.coBehindCenter.x,this.drawSet.bondDif.coBehindCenter.y)
        this.drawSet.oxigen41.position = this.drawSet.carbon4.position.copy().add(0,-this.drawSet.bondDif.co.y)
        this.drawSet.oxigen42.position = this.drawSet.carbon4.position.copy().add(this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)

        this.drawSet.hidrogen1.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.ohBehindBehind.x,this.drawSet.bondDif.ohBehindBehind.y)
        this.drawSet.hidrogen2.position = this.drawSet.oxigen22.position.copy().add(-this.drawSet.bondDif.oh.x,this.drawSet.bondDif.oh.y)
        this.drawSet.hidrogen3.position = this.drawSet.oxigen3.position.copy().add(this.drawSet.bondDif.ohBehindBehind.x,-this.drawSet.bondDif.ohBehindBehind.y)
        this.drawSet.hidrogen4.position = this.drawSet.oxigen42.position.copy().add(this.drawSet.bondDif.oh.x,-this.drawSet.bondDif.oh.y)

    }

    draw(p5,molecule,colors){
              
        //Bonds
        if(molecule.focused){
            // carbon 1 - carbon 2
            if(this.activeType !== 2){  // NOT IF LACTIC 
                molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon2, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.carbon1, molecule.bond.c6c, 2/6);
            }
            // // carbon 1 - carbon 3
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon3, molecule.bond.cc, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.carbon1, molecule.bond.cc, 2/6);

            // // carbon 3 - carbon 4
            molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.carbon4, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.carbon3, molecule.bond.c6c, 2/6);
        

            // // carbon 2 - oxigen 22
            if(this.activeType !== 2){  // NOT IF LACTIC 
                molecule.drawP1P1(p5,this.drawSet.oxigen22, this.drawSet.carbon2, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.oxigen22, molecule.bond.c6c, 2/6);
            }

            // // carbon 4 - oxigen 42
            molecule.drawP1P1(p5,this.drawSet.oxigen42, this.drawSet.carbon4, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.oxigen42, molecule.bond.c6c, 2/6);

            // // oxigen 2 - hidrogen 22
            if(this.activeType !== 2){  // NOT IF LACTIC 
                molecule.drawP1P1(p5,this.drawSet.oxigen22, this.drawSet.hidrogen2, molecule.bond.oh);
            }
            // // oxigen 4 - hidrogen 42
            molecule.drawP1P1(p5,this.drawSet.oxigen42, this.drawSet.hidrogen4, molecule.bond.oh);


            // DOUBLES
            if(this.activeType !== 2){  // NOT IF LACTIC 
                molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.oxigen21, molecule.bond.c__o, 2/6);
                molecule.drawP1P1(p5,this.drawSet.oxigen21, this.drawSet.carbon2, molecule.bond.c__o, 2/6);
            }

            molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.oxigen41, molecule.bond.c__o, 2/6);
            molecule.drawP1P1(p5,this.drawSet.oxigen41, this.drawSet.carbon4, molecule.bond.c__o, 2/6);
            
            if(this.activeType !== 2){  // NOT IF LACTIC 
                molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.oxigen21, molecule.bond.c__o, 2/6);
                molecule.drawP1P1(p5,this.drawSet.oxigen21, this.drawSet.carbon2, molecule.bond.c__o, 2/6);
            }

            molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.oxigen41, molecule.bond.c__o, 2/6);
            molecule.drawP1P1(p5,this.drawSet.oxigen41, this.drawSet.carbon4, molecule.bond.c__o, 2/6);


            // behind 

            //  TARTARIC ONLY
            if(this.activeType === 0){
                // carbon 1 - oxigen 1
                molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.carbon1, molecule.bond.coBehindCenter, 1/5);
                molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.oxigen1, molecule.bond.coBehindCenter, 2/5);
                // oxigen 1 - hidrogen 1
                molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.hidrogen1, molecule.bond.ohBehindBehind);
            }
            //TARTARIC ONLY ENDS


            // carbon 3 - oxigen 3
            molecule.drawP1P1(p5,this.drawSet.oxigen3, this.drawSet.carbon3, molecule.bond.coBehindCenter, 1/5);
            molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.oxigen3, molecule.bond.coBehindCenter, 2/5);
            
            // oxigen 3 - hidrogen 3
            molecule.drawP1P1(p5,this.drawSet.oxigen3, this.drawSet.hidrogen3, molecule.bond.ohBehindBehind);

        }

  
        p5.fill(colors.blue)
        // //Carbon1
        p5.circle(this.drawSet.carbon1.position.x,this.drawSet.carbon1.position.y,this.drawSet.carbon1.size);
        // // Carbon2
        if(this.activeType !== 2){  // NOT IF LACTIC 
            p5.circle(this.drawSet.carbon2.position.x,this.drawSet.carbon2.position.y,this.drawSet.carbon2.size);
        }
        // // Carbon3
        p5.circle(this.drawSet.carbon3.position.x,this.drawSet.carbon3.position.y,this.drawSet.carbon3.size);
        // // Carbon4
        p5.circle(this.drawSet.carbon4.position.x,this.drawSet.carbon4.position.y,this.drawSet.carbon4.size);

        p5.fill(colors.lightBlue)
        // Oxigen1
        
        //  TARTARIC ONLY
        if(this.activeType === 0){
            p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen1.size);
        }
        //TARTARIC ONLY ENDS

         // Oxigen2
        if(this.activeType !== 2){  // NOT IF LACTIC 
            p5.circle(this.drawSet.oxigen21.position.x,this.drawSet.oxigen21.position.y,this.drawSet.oxigen21.size);
            p5.circle(this.drawSet.oxigen22.position.x,this.drawSet.oxigen22.position.y,this.drawSet.oxigen22.size);
        }
        // Oxigen3
        p5.circle(this.drawSet.oxigen3.position.x,this.drawSet.oxigen3.position.y,this.drawSet.oxigen3.size);
        // Oxigen4
        p5.circle(this.drawSet.oxigen41.position.x,this.drawSet.oxigen41.position.y,this.drawSet.oxigen41.size);
        p5.circle(this.drawSet.oxigen42.position.x,this.drawSet.oxigen42.position.y,this.drawSet.oxigen42.size);

        // //Hidrogen
        p5.fill(colors.orange)
        //TARTARIC ONLY
        if(this.activeType === 0){
            p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen1.size);
        }
        //TARTARIC ONLY ENDS

        if(this.activeType !== 2){  // NOT IF LACTIC 
            p5.circle(this.drawSet.hidrogen2.position.x,this.drawSet.hidrogen2.position.y,this.drawSet.hidrogen2.size);
        }
        p5.circle(this.drawSet.hidrogen3.position.x,this.drawSet.hidrogen3.position.y,this.drawSet.hidrogen3.size);
        p5.circle(this.drawSet.hidrogen4.position.x,this.drawSet.hidrogen4.position.y,this.drawSet.hidrogen4.size);


  
        //Letters
        if(molecule.focused){
            p5.fill(colors.darkBg);
            p5.textSize(this.drawSet.textSize);
            p5.text('C', this.drawSet.carbon1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            if(this.activeType !== 2){  // NOT IF LACTIC 
            p5.text('C', this.drawSet.carbon2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }
            p5.text('C', this.drawSet.carbon3.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon3.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('C', this.drawSet.carbon4.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.carbon4.position.y+this.drawSet.textSize*this.drawSet.textCentered);

            p5.textSize(this.drawSet.textSize);
            if(this.activeType !== 2){  // NOT IF LACTIC 
            p5.text('O', this.drawSet.oxigen21.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen21.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }
            p5.text('O', this.drawSet.oxigen22.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen22.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('O', this.drawSet.oxigen41.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen41.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            p5.text('O', this.drawSet.oxigen42.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen42.position.y+this.drawSet.textSize*this.drawSet.textCentered);

            if(this.activeType !== 2){  // NOT IF LACTIC 
                p5.text('H', this.drawSet.hidrogen2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }
            p5.text('H', this.drawSet.hidrogen4.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.hidrogen4.position.y+this.drawSet.textSize*this.drawSet.textCentered);

            // Behind de center
            let textSize =this.drawSet.textSize*molecule.settings.behindScale
            p5.textSize(textSize);
            //  TARTARIC ONLY
            if(this.activeType === 0){
                p5.text('O', this.drawSet.oxigen1.position.x-textSize*this.drawSet.textCentered,this.drawSet.oxigen1.position.y+textSize*this.drawSet.textCentered);
            }
            //TARTARIC ONLY ENDS

            p5.text('O', this.drawSet.oxigen3.position.x-textSize*this.drawSet.textCentered,this.drawSet.oxigen3.position.y+textSize*this.drawSet.textCentered);

            // Behind behind
            textSize *=0.9
            //  TARTARIC ONLY
            if(this.activeType === 0){
                p5.text('H', this.drawSet.hidrogen1.position.x-textSize*this.drawSet.textCentered,this.drawSet.hidrogen1.position.y+textSize*this.drawSet.textCentered);
            }
            //TARTARIC ONLY ENDS
            p5.text('H', this.drawSet.hidrogen3.position.x-textSize*this.drawSet.textCentered,this.drawSet.hidrogen3.position.y+textSize*this.drawSet.textCentered);

        }

        // Second Bond
        // if(molecule.focused){
        //     molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.oxigen21, molecule.bond.c__o, 2/6, 1);
        //     molecule.drawP1P1(p5,this.drawSet.oxigen21, this.drawSet.carbon2, molecule.bond.c__o, 2/6, 1);

        //     molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.oxigen41, molecule.bond.c__o, 2/6, 1);
        //     molecule.drawP1P1(p5,this.drawSet.oxigen41, this.drawSet.carbon4, molecule.bond.c__o, 2/6, 1);
        // }

        //Bacgrownd
        p5.noFill();
        if(molecule.focused){
            p5.fill('#32323232')
            // p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);
        } 
               
    }
}