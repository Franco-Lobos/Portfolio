export const getRGB= (color)=>{
    let colorHex = getComputedStyle(root).getPropertyValue(`--${color}`).split('');

    colorHex = colorHex.filter(char => char!== ' ');
    colorHex.shift();

    let colorR = parseInt(colorHex[0] + '' + colorHex[1],16);
    let colorG = parseInt(colorHex[2] + '' + colorHex[3],16);
    let colorB = parseInt(colorHex[4] + '' + colorHex[5],16);

    return [colorR,colorG,colorB]
}
export const convertToCamelCase = (string)=>{
        let words= string.split('-');
        words = words.map((word,indx) => {
            if(indx===0) return word;
            let splitedWord = word.split('');
            splitedWord[0] = splitedWord[0].toUpperCase();
            splitedWord = splitedWord.join('');
            return splitedWord
        });

        return words.join('');
}

const colors = ['purpule', 'orange' ,'light-blue','blue', 'green'];


export const breath = (link, indx, setBreathing, time, hoverBrightness) =>{
    let color0 = getRGB(colors[indx === 0 ? colors.length-1 : indx-1 ]);
    let color1 = getRGB(colors[indx]);
    let color2 = getRGB(colors[indx+1 >= colors.length ? 0 : indx+1]);

    let rDifPrev = color1[0]-color0[0];
    let gDifPrev = color1[1]-color0[1];
    let bDifPrev = color1[2]-color0[2];

    let rDifNext = color1[0]-color2[0];
    let gDifNext = color1[1]-color2[1];
    let bDifNext = color1[2]-color2[2];

    let start = Date.now();

    setBreathing(1);
    setInterval(()=> {
        let timePassed = Date.now() - start;
        if (timePassed >= time) {
            start+=time*2;
        }
        let percent = Math.abs(timePassed/time)

        let breathingColor1 = [
            (color1[0] - rDifPrev*percent)* hoverBrightness,
            (color1[1] - gDifPrev*percent)* hoverBrightness,
            (color1[2] - bDifPrev*percent)* hoverBrightness
        ];

        let breathingColor2 = [
            (color1[0] - rDifNext*percent)* hoverBrightness,
           (color1[1] - gDifNext*percent)* hoverBrightness,
            (color1[2] - bDifNext*percent)* hoverBrightness
        ];

        let gradient = `-webkit-linear-gradient(0.25turn, rgb(${breathingColor1}),   rgb(${breathingColor2})`;

        link.style.backgroundImage = gradient;


    }, 10);

}