
export class Ethanol {
    constructor( p5, molecule){
        this.waterComparison=3,

        this.configuration= {
            carbon : 40* molecule.settings.scale,
            oxigen : 30* molecule.settings.scale,
            hidrogen : 20* molecule.settings.scale ,
            distanceR : 95.84* molecule.settings.scale ,
            angle : 54*Math.PI/180,
        }

        this.__setSetings(molecule);

        this.drawSet ={
            xDif : this.configuration.xDif,
            yDif : this.configuration.yDif,
            carbon : this.configuration.carbon,
            oxigen : this.configuration.oxigen,
            hidrogen : this.configuration.hidrogen,
            carbon1:{
                position: new p5.Vector(molecule.position.x,molecule.position.y),
                orbital:{
                    radius: this.configuration.oxigen,
                    length: 0.2
                },
            }
        }
    }

    __setSetings(){
        this.configuration['cos'] =  Math.cos(this.configuration.angle);
        this.configuration['sin'] =  Math.sin(this.configuration.angle);
        this.configuration['xDif'] =   this.configuration.sin * this.configuration.distanceR;
        this.configuration['yDif'] =   this.configuration.cos * this.configuration.distanceR;
        this.configuration['colitionDistance'] = this.configuration.distanceR;
    }

    __setZoom(molecule){
        console.log(molecule.zoom)
        // let expanded = (molecule.zoom + ((this.waterComparison-molecule.zoom)/molecule.zoom**2))
        this.drawSet.xDif = this.configuration.xDif * molecule.zoom
        this.drawSet.yDif = this.configuration.yDif * molecule.zoom
        this.drawSet.carbon = this.configuration.carbon * molecule.zoom

        //Set Carbon  1
        this.drawSet.carbon1.position.x = molecule.position.x - molecule.colitionDistance + this.configuration.carbon;
        this.drawSet.carbon1.position.y = molecule.position.y;
    
        // this.drawSet.oxigen = this.configuration.oxigen * molecule.zoom;
        // this.drawSet.hidrogen = this.configuration.hidrogen * molecule.zoom;
    }



    draw(p5,molecule,colors){
        // draw actualizations
        this.__setZoom(molecule);
        p5.noStroke();

        //Bacgrownd
        p5.fill('#323232a0')
        p5.circle(molecule.position.x,molecule.position.y,molecule.colitionDistance*2);

        //Carbon
        p5.fill('#00ff00')
        p5.circle(this.drawSet.carbon1.position.x,this.drawSet.carbon1.position.y,this.configuration.carbon);
    }
}