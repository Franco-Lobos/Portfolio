
const checkForSpan = (inptString, specialWords, indx)=>{

    let allWords = inptString.split(" ");
    allWords= allWords.filter(word=> word!=='');

    return(
        <p key={indx}>
            {
                allWords.map(word=>
                    specialWords.includes(word.toLowerCase()) ? <span>{word} </span> : word + " "
                )
            }
        </p>
    )
}
export default checkForSpan;