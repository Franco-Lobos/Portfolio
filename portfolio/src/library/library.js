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
    if(!string) return;
    
        let words= string.split('-')[1] ? string.split('-') : string.split(' ') ;
        words = words.map((word,indx) => {
            if(indx===0) return word;
            let splitedWord = word.split('');
            splitedWord[0] = splitedWord[0].toUpperCase();
            splitedWord = splitedWord.join('');
            return splitedWord
        });

        return words.join('');
}

export const capitalize = (string, spliter) =>{
    let letters = string.split(spliter);
    letters[0] = letters[0].toUpperCase();
    letters = letters.join(spliter);
    return letters;
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


export const arrayShuffle = (dataArray)=>{

    const length = dataArray.length;
    let random;
    let buf;

    dataArray.forEach((element, indx) => {
        random = Math.floor(Math.random()*length);
        buf = dataArray[random];
        dataArray[random] = element;
        dataArray[indx] = buf;
    });

    return dataArray;
}

export const addHover=(thisEl, othersEl, card, time, hoverBrightness,setLoad, indx)=>{
    
    let specialTime = time /2;

    let othersXOR = othersEl.filter(ln=>ln.id !== thisEl.id);

    card.addEventListener('mouseenter', ()=>{
    })

    card.addEventListener('mouseover', ()=>{
        time = specialTime;
        hoverBrightness = 1.5;
        othersXOR.map(lin=>
            lin.style.filter= 'blur(0.2rem)'
        )
    })

    card.addEventListener('mouseout', ()=>{
        time = 4000;
        othersXOR.map(lin=>
            lin.style.filter= 'blur(0rem)'
        )
        hoverBrightness = 1;
    })

    card.addEventListener('animationend',()=>{
        setLoad(indx)
    });
}

export const spawnElement = ( element, indx, time) =>{
    let timeAnim = time*0.25 +"ms";

    setTimeout(()=>{
        element.style.animation = `spawn ${timeAnim}`;
        element.style.opacity = '1';
        
    },300 + (time/20) *indx);
}

export const unSpawnElement = ( element, indx, time) =>{
    let timeAnim = time*0.25 +"ms";
    
    element.addEventListener("animationend",()=>{
        element.style.opacity = '0.5';   
    })

    setTimeout(()=>{
        element.style.animation = `unSpawn ${timeAnim}`;
    },300 +(time/20) *indx);
}


export const findOnArray = (el, arrayInpt)=>{
    let ret =0;
    arrayInpt.forEach(item=>{
        if(item.split(" ").join("").toLowerCase() == el.split(" ").join("").toLowerCase()){
            ret = 1;
        }
    }
    )
    return ret;
};
