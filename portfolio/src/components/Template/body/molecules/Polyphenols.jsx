


export class Polyfenols{
    constructor( p5, molecule){
        this.waterComparisonX=3.5;
        this.waterComparisonY=1.5;  

        this.name = 'polyfenols';

        this.drawSet ={

            oxigen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },

            oxigen2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },

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
            carbon5:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon6:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon7:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon8:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon9:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon10:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon11:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon12:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon13:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon14:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },
            carbon15:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.carbon,
                orbital:{
                    length: 0.2
                },
            },


            //Radical
            radical1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            radical2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            radical3:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            radical4:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            radical5:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            radical6:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            radical7:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },


            //HIDROGENS
            hidrogen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            hidrogen2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            hidrogen3:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },
            hidrogen4:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                size: molecule.sizes.radical,
                orbital:{
                    length: 0.2
                },
            },

            bondDif:{
                cc: molecule.bond.cc.dif,
                co: molecule.bond.co.dif,
                oh: molecule.bond.oh.dif,
                c6c: molecule.bond.c6c.dif,
                c6cPlane: molecule.bond.c6cPlane.dif,
            },

            textSize : molecule.settings.textSize * 0.5,
            textCentered: 0.4
        }

        this.types = [
            'Anthocyanins',
            'Resveratrol',
            'Tannins',
        ]
        this.waterComparisonVariable =[
            2,
            2,
            2
        ]

        this.activeType = 0;
    }

    setZoom(molecule){
        let zoom = molecule.zoom;
        this.drawSet.bondDif.cc =  molecule.bond.cc.dif.copy().mult(zoom);
        this.drawSet.bondDif.co =  molecule.bond.co.dif.copy().mult(zoom);
        this.drawSet.bondDif.oh =  molecule.bond.oh.dif.copy().mult(zoom);
        this.drawSet.bondDif.c6c =  molecule.bond.c6c.dif.copy().mult(zoom);
        this.drawSet.bondDif.c6cPlane =  molecule.bond.c6cPlane.dif.copy().mult(zoom);
        this.drawSet.bondDif.c__o =  molecule.bond.c__o.dif.copy().mult(zoom);


        this.drawSet.oxigen1.size = molecule.sizes.oxigen * zoom 

        for(let i=1; i<=15; i++){
            this.drawSet[`carbon${i}`].size = molecule.sizes.carbon * zoom 
        }

        for(let i=1; i<=7; i++){
            this.drawSet[`radical${i}`].size = molecule.sizes.radical * zoom 
        }




        this.drawSet.oxigen1.position = molecule.position.copy().add(-this.drawSet.bondDif.c6c.x/2,-this.drawSet.bondDif.c6c.y/2)

        this.drawSet.carbon1.position = this.drawSet.oxigen1.position.copy().add(-this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        
        if(this.activeType ===2){
            this.drawSet.carbon2.position = molecule.position.copy().add(this.drawSet.bondDif.c6c.x/2,-this.drawSet.bondDif.c6c.y/2)
            this.drawSet.carbon1.position = this.drawSet.carbon2.position.copy().add(this.drawSet.bondDif.c6cPlane.x,-this.drawSet.bondDif.c6cPlane.y)
            this.drawSet.oxigen1.position = this.drawSet.carbon1.position.copy().add(this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        }else{
            this.drawSet.carbon2.position = this.drawSet.carbon1.position.copy().add(-this.drawSet.bondDif.c6cPlane.x,this.drawSet.bondDif.c6cPlane.y)
        }

        this.drawSet.carbon3.position = this.drawSet.carbon2.position.copy().add(this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon4.position = this.drawSet.carbon3.position.copy().add(this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon5.position = this.drawSet.carbon4.position.copy().add(this.drawSet.bondDif.c6cPlane.x,-this.drawSet.bondDif.c6cPlane.y)
        this.drawSet.carbon6.position = this.drawSet.carbon5.position.copy().add(this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon7.position = this.drawSet.carbon6.position.copy().add(this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon8.position = this.drawSet.carbon7.position.copy().add(this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon9.position = this.drawSet.carbon8.position.copy().add(this.drawSet.bondDif.c6cPlane.x,-this.drawSet.bondDif.c6cPlane.y)
        this.drawSet.carbon10.position = this.drawSet.carbon9.position.copy().add(-this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon11.position = this.drawSet.carbon10.position.copy().add(-this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
       
        this.drawSet.carbon12.position = this.drawSet.carbon1.position.copy().add(-this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon13.position = this.drawSet.carbon12.position.copy().add(-this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.carbon14.position = this.drawSet.carbon13.position.copy().add(this.drawSet.bondDif.c6cPlane.x,this.drawSet.bondDif.c6cPlane.y)
        this.drawSet.carbon15.position = this.drawSet.carbon14.position.copy().add(this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)

        this.drawSet.radical1.position = this.drawSet.carbon10.position.copy().add(this.drawSet.bondDif.c6cPlane.x,-this.drawSet.bondDif.c6cPlane.y)
        this.drawSet.radical2.position = this.drawSet.carbon9.position.copy().add(this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
        this.drawSet.radical3.position = this.drawSet.carbon8.position.copy().add(this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.radical4.position = this.drawSet.carbon4.position.copy().add(this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.radical5.position = this.drawSet.carbon15.position.copy().add(this.drawSet.bondDif.c6cPlane.x,this.drawSet.bondDif.c6cPlane.y)
        this.drawSet.radical6.position = this.drawSet.carbon14.position.copy().add(-this.drawSet.bondDif.c6c.x,this.drawSet.bondDif.c6c.y)
        this.drawSet.radical7.position = this.drawSet.carbon13.position.copy().add(-this.drawSet.bondDif.c6c.x,-this.drawSet.bondDif.c6c.y)
    
        if(this.activeType !==0){
            for(let i=1; i<=4; i++){
                this.drawSet[`hidrogen${i}`].size = molecule.sizes.hidrogen * zoom 
            }
            this.drawSet.hidrogen1.position = this.drawSet.radical2.position.copy().add(this.drawSet.bondDif.oh.x,this.drawSet.bondDif.oh.y)
            this.drawSet.hidrogen2.position = this.drawSet.radical5.position.copy().add(this.drawSet.bondDif.oh.x,this.drawSet.bondDif.oh.y)
            this.drawSet.hidrogen3.position = this.drawSet.radical6.position.copy().add(-this.drawSet.bondDif.oh.x,-this.drawSet.bondDif.oh.y)
            this.drawSet.hidrogen4.position = this.drawSet.radical7.position.copy().add(-this.drawSet.bondDif.oh.x,this.drawSet.bondDif.oh.y)
        }

        if(this.activeType ===2){
            this.drawSet.radical2.position = this.drawSet.carbon5.position.copy();
            this.drawSet.hidrogen1.position = this.drawSet.radical2.position.copy().add(this.drawSet.bondDif.oh.x,-this.drawSet.bondDif.oh.y)
            this.drawSet.oxigen2.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.c__o.x,-this.drawSet.bondDif.c__o.y)
        }
    }

    draw(p5,molecule,colors){
              
        //Bonds
        if(molecule.focused){
            // carbon 1 - carbon 2
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon2, molecule.bond.c6cPlane, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.carbon1, molecule.bond.c6cPlane, 2/6);

            if(this.activeType ===0){
                // carbon 2 - carbon 3
                molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.carbon3, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.carbon2, molecule.bond.c6c, 2/6);
                // carbon 3 - carbon 4
                molecule.drawP1P1(p5,this.drawSet.carbon3, this.drawSet.carbon4, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.carbon3, molecule.bond.c6c, 2/6);
                // carbon 4 - carbon 5
                molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.carbon5, molecule.bond.c6cPlane, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon5, this.drawSet.carbon4, molecule.bond.c6cPlane, 2/6);
            }

            if(this.activeType !==2){
                // carbon 5 - carbon 6
                molecule.drawP1P1(p5,this.drawSet.carbon5, this.drawSet.carbon6, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon6, this.drawSet.carbon5, molecule.bond.c6c, 2/6);
                
                // carbon 6 - carbon 7
                molecule.drawP1P1(p5,this.drawSet.carbon6, this.drawSet.carbon7, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon7, this.drawSet.carbon6, molecule.bond.c6c, 2/6);
                // carbon 7 - carbon 8
                molecule.drawP1P1(p5,this.drawSet.carbon7, this.drawSet.carbon8, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon8, this.drawSet.carbon7, molecule.bond.c6c, 2/6);
                // carbon 8 - carbon 9
                molecule.drawP1P1(p5,this.drawSet.carbon8, this.drawSet.carbon9, molecule.bond.c6cPlane, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon9, this.drawSet.carbon8, molecule.bond.c6cPlane, 2/6);
                // carbon 9 - carbon 10
                molecule.drawP1P1(p5,this.drawSet.carbon9, this.drawSet.carbon10, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon10, this.drawSet.carbon9, molecule.bond.c6c, 2/6);
                // carbon 10 - carbon 11
                molecule.drawP1P1(p5,this.drawSet.carbon10, this.drawSet.carbon11, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon11, this.drawSet.carbon10, molecule.bond.c6c, 2/6);
                // carbon 11 - carbon 6
                molecule.drawP1P1(p5,this.drawSet.carbon11, this.drawSet.carbon6, molecule.bond.c6cPlane, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon6, this.drawSet.carbon11, molecule.bond.c6cPlane, 2/6);
            }
           


            // carbon 1 - carbon 12
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.carbon12, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon12, this.drawSet.carbon1, molecule.bond.c6c, 2/6);
            // carbon 12 - carbon 13
            molecule.drawP1P1(p5,this.drawSet.carbon12, this.drawSet.carbon13, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon13, this.drawSet.carbon12, molecule.bond.c6c, 2/6);
            // carbon 13 - carbon 14
            molecule.drawP1P1(p5,this.drawSet.carbon13, this.drawSet.carbon14, molecule.bond.c6cPlane, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon14, this.drawSet.carbon13, molecule.bond.c6cPlane, 2/6);
            // carbon 14 - carbon 15
            molecule.drawP1P1(p5,this.drawSet.carbon14, this.drawSet.carbon15, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon15, this.drawSet.carbon14, molecule.bond.c6c, 2/6);
            // carbon 15 - carbon 2
            molecule.drawP1P1(p5,this.drawSet.carbon15, this.drawSet.carbon2, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon2, this.drawSet.carbon15, molecule.bond.c6c, 2/6);

            // Oxigen 1 - carbon 1
            molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.carbon1, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon1, this.drawSet.oxigen1, molecule.bond.c6c, 2/6);

       
            // Oxigen 1 - carbon 5
            molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.carbon5, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon5, this.drawSet.oxigen1, molecule.bond.c6c, 2/6);
            
            // Radical 5 - carbon 15
            molecule.drawP1P1(p5,this.drawSet.radical5, this.drawSet.carbon15, molecule.bond.c6cPlane, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon15, this.drawSet.radical5, molecule.bond.c6cPlane, 2/6);
            if(this.activeType ===1){ //DOUBLE
                molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.carbon5, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon5, this.drawSet.oxigen1, molecule.bond.c6c, 2/6);
            }


            // Radical 7 - carbon 13
            molecule.drawP1P1(p5,this.drawSet.radical7, this.drawSet.carbon13, molecule.bond.c6c, 2/6);
            molecule.drawP1P1(p5,this.drawSet.carbon13, this.drawSet.radical7, molecule.bond.c6c, 2/6);
            
            if(this.activeType!==2){
                // Radical 2 - carbon 9
                molecule.drawP1P1(p5,this.drawSet.radical2, this.drawSet.carbon9, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon9, this.drawSet.radical2, molecule.bond.c6c, 2/6);
            }

            if(this.activeType!==1){
                // Radical 6 - carbon 14
                molecule.drawP1P1(p5,this.drawSet.radical6, this.drawSet.carbon14, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon14, this.drawSet.radical6, molecule.bond.c6c, 2/6);
            }

            if(this.activeType===0){
                // Radical 1 - carbon 10
                molecule.drawP1P1(p5,this.drawSet.radical1, this.drawSet.carbon10, molecule.bond.c6cPlane, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon10, this.drawSet.radical1, molecule.bond.c6cPlane, 2/6);

                // Radical 3 - carbon 8
                molecule.drawP1P1(p5,this.drawSet.radical3, this.drawSet.carbon8, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon8, this.drawSet.radical3, molecule.bond.c6c, 2/6);
                // Radical 4 - carbon 4
                molecule.drawP1P1(p5,this.drawSet.radical4, this.drawSet.carbon4, molecule.bond.c6c, 2/6);
                molecule.drawP1P1(p5,this.drawSet.carbon4, this.drawSet.radical4, molecule.bond.c6c, 2/6);
            }

            if(this.activeType!==0){
                // Radical 2 - hidrogen 1
                molecule.drawP1P1(p5,this.drawSet.radical2, this.drawSet.hidrogen1, molecule.bond.oh);
            
                // Radical 5 - hidrogen 2
                molecule.drawP1P1(p5,this.drawSet.radical5, this.drawSet.hidrogen2, molecule.bond.oh);
                
                // Radical 7 - hidrogen 4
                molecule.drawP1P1(p5,this.drawSet.radical7, this.drawSet.hidrogen4, molecule.bond.oh);
            }

            if(this.activeType===2){
                // Radical 6 - hidrogen 3
                molecule.drawP1P1(p5,this.drawSet.radical6, this.drawSet.hidrogen3, molecule.bond.oh);

                // Oxigen 1(Carbon Now) - Oxigen 2
                molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.oxigen2, molecule.bond.c__o, 2/6);
                molecule.drawP1P1(p5,this.drawSet.oxigen2, this.drawSet.oxigen1, molecule.bond.c__o, 2/6);
            
                //DOUBLE
                molecule.drawP1P1(p5,this.drawSet.oxigen1, this.drawSet.oxigen2, molecule.bond.c__o, 2/6);
                molecule.drawP1P1(p5,this.drawSet.oxigen2, this.drawSet.oxigen1, molecule.bond.c__o, 2/6);
            }


        }

  
        p5.fill(colors.lightBlue)
        // Oxigen1
        if(this.activeType===0){
            p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen1.size);
        }else{
            p5.fill(colors.blue)
            p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.carbon1.size);
        }

        if(this.activeType===2){
            p5.circle(this.drawSet.oxigen2.position.x,this.drawSet.oxigen2.position.y,this.drawSet.oxigen1.size);
        }

        p5.fill(colors.blue)
        // CARBONS
        for(let i=1; i<=15; i++){
            let onlyAnthocyanidins = [3,4];
            let notInTartaric = [5,6,7,8,9,10,11];
            if( (onlyAnthocyanidins.includes(i) && this.activeType !==0)|| (this.activeType ===2 && notInTartaric.includes(i))){
                continue;
            }
            p5.circle(this.drawSet[`carbon${i}`].position.x,this.drawSet[`carbon${i}`].position.y,this.drawSet[`carbon${i}`].size);

        }
    
        //RADICALS
        p5.fill(colors.purpule)
        for(let i=1; i<=7; i++){
            let onlyAnthocyanidins = [2,5,7];
            
            if( (onlyAnthocyanidins.includes(i) && this.activeType !==0) || (i===6 && this.activeType ===2)){
                p5.fill(colors.lightBlue)
                p5.circle(this.drawSet[`radical${i}`].position.x,this.drawSet[`radical${i}`].position.y,this.drawSet[`oxigen1`].size);
                continue
            }
            if(this.activeType ===0){
                p5.fill(colors.purpule)
                p5.circle(this.drawSet[`radical${i}`].position.x,this.drawSet[`radical${i}`].position.y,this.drawSet[`radical${i}`].size);    
            }
        }

        //HIDROGENS
        if(this.activeType !==0){
            p5.fill(colors.orange)
            for(let i=1; i<=4; i++){
                if(i===3 && this.activeType===1){
                    continue;
                }
                p5.circle(this.drawSet[`hidrogen${i}`].position.x,this.drawSet[`hidrogen${i}`].position.y,this.drawSet[`hidrogen${i}`].size);
            }
        }


  
        //Letters
        if(molecule.focused){
            p5.fill(colors.darkBg);
            p5.textSize(this.drawSet.textSize);
            for(let i=1; i<=15; i++){
                let onlyAnthocyanidins = [3,4];
                let notInTartaric = [5,6,7,8,9,10,11];
                if( (onlyAnthocyanidins.includes(i) && this.activeType !==0)|| (this.activeType ===2 && notInTartaric.includes(i))){
                    continue;
                }
                p5.text('C', this.drawSet[`carbon${i}`].position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet[`carbon${i}`].position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }

            for(let i=1; i<=7; i++){
                let onlyAnthocyanidins = [2,5,7];
                if( i===6 && this.activeType ===2){
                    p5.text(`O`, this.drawSet[`radical${i}`].position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet[`radical${i}`].position.y+this.drawSet.textSize*this.drawSet.textCentered);
                    continue
                }

                if( onlyAnthocyanidins.includes(i) && this.activeType !==0){
                    p5.text(`O`, this.drawSet[`radical${i}`].position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet[`radical${i}`].position.y+this.drawSet.textSize*this.drawSet.textCentered);
                    continue
                }

                
                if(this.activeType ===0){
                    p5.text(`R${i}`, this.drawSet[`radical${i}`].position.x-this.drawSet.textSize*1.4*this.drawSet.textCentered,this.drawSet[`radical${i}`].position.y+this.drawSet.textSize*this.drawSet.textCentered);
                }
            }
            if(this.activeType===0){
                p5.text('O', this.drawSet.oxigen1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }else{
                p5.text('C', this.drawSet.oxigen1.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen1.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }

            if(this.activeType !==0){
                for(let i=1; i<=4; i++){
                    if(i===3 && this.activeType===1){
                        continue;
                    }
                    p5.text(`H`, this.drawSet[`hidrogen${i}`].position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet[`hidrogen${i}`].position.y+this.drawSet.textSize*this.drawSet.textCentered);
                }
            }

            if(this.activeType===2){
                p5.text('O', this.drawSet.oxigen2.position.x-this.drawSet.textSize*this.drawSet.textCentered,this.drawSet.oxigen2.position.y+this.drawSet.textSize*this.drawSet.textCentered);
            }
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