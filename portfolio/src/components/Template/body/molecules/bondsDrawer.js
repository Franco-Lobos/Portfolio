export const drawSP2S1=(p5, atomOrigin, atomDestiny)=>{

    let origin = {
        nucle : new p5.Vector(
            //Set nucle in order to "add" the radius in all cases;
            atomOrigin.size * atomOrigin.position.x>= atomDestiny.position.x ? -1 : 1,
            atomOrigin.size * atomOrigin.position.y<= atomDestiny.position.y ? -1 : 1
            ),
        position: atomOrigin.position.copy(),
    }

    origin.position.add(origin.nucle);

    let destiny = {
        nucle : new p5.Vector(
            //Set nucle in order to "add" the radius in all cases;
            atomDestiny.size * atomDestiny.position.x>= atomOrigin.position.x ? -1 : 1,
            atomDestiny.size * atomDestiny.position.y<= atomOrigin.position.y ? -1 : 1
            ),
        position: atomDestiny.position.copy(),
    }
    
    //Drawing
    p5.fill('red');
    p5.line(origin.position, destiny.position)
}