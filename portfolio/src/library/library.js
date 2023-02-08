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
