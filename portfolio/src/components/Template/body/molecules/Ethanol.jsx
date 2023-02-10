
export class Ethanol {
    constructor( p5, molecule){
        this.waterComparison=3;
        this.configuration= {
            carbon : 40* molecule.settings.scale,
            oxigen : 30* molecule.settings.scale,
            hidrogen : 20* molecule.settings.scale,
        }

        this.drawSet ={
            carbon : this.configuration.carbon,
            oxigen : this.configuration.oxigen,
            hidrogen : this.configuration.hidrogen,
            carbon1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                orbital:{
                    radius: this.configuration.carbon,
                    length: 0.2
                },
            },
            carbon2:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                orbital:{
                    radius: this.configuration.carbon,
                    length: 0.2
                },
            },

            oxigen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                orbital:{
                    radius: this.configuration.oxigen,
                    length: 0.2
                },
            },

            hidrogen1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                orbital:{
                    radius: this.configuration.hidrogen,
                    length: 0.2
                },
            },
            bondDif:{
                cc: molecule.bond.cc.dif,
                co: molecule.bond.co.dif,
                oh: molecule.bond.oh.dif
            }
        }
    }

    __setZoom(molecule){
        this.drawSet.bondDif.cc =  molecule.bond.cc.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.co =  molecule.bond.co.dif.copy().mult(molecule.zoom);
        this.drawSet.bondDif.oh =  molecule.bond.oh.dif.copy().mult(molecule.zoom);

        this.drawSet.carbon = this.configuration.carbon * molecule.zoom 
        this.drawSet.oxigen = this.configuration.oxigen * molecule.zoom 
        this.drawSet.hidrogen = this.configuration.hidrogen * molecule.zoom
        // (this.waterComparison-molecule.settings.zoom)

        this.drawSet.carbon1.position = molecule.position.copy().sub(this.drawSet.bondDif.co.x/2,this.drawSet.bondDif.co.y/2)
        this.drawSet.carbon2.position = this.drawSet.carbon1.position.copy().add(-this.drawSet.bondDif.cc.x,this.drawSet.bondDif.cc.y)
        this.drawSet.oxigen1.position = molecule.position.copy().add(this.drawSet.bondDif.co.x/2,this.drawSet.bondDif.co.y/2)
        this.drawSet.hidrogen1.position = this.drawSet.oxigen1.position.copy().add(this.drawSet.bondDif.oh.x,-this.drawSet.bondDif.oh.y)
    }



    draw(p5,molecule,colors){

        //Bacgrownd
        p5.fill('#323232a0')
        p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);

        //Carbon1
        p5.fill(colors.blue)
        p5.circle(this.drawSet.carbon1.position.x,this.drawSet.carbon1.position.y,this.drawSet.carbon);

        // //Carbon2
        p5.circle(this.drawSet.carbon2.position.x,this.drawSet.carbon2.position.y,this.drawSet.carbon);

        // //Oxigen1
        p5.fill(colors.lightBlue)
        p5.circle(this.drawSet.oxigen1.position.x,this.drawSet.oxigen1.position.y,this.drawSet.oxigen);
        
        // //Hidrogen
        p5.fill(colors.orange)
        p5.circle(this.drawSet.hidrogen1.position.x,this.drawSet.hidrogen1.position.y,this.drawSet.hidrogen);
    }
}