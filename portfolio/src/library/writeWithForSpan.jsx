import { useEffect, useState } from "react";

const writeWithForSpan = (inptString, specialWords, indx = 1)=>{

    let allWords = inptString.split(" ");
    allWords= allWords.filter(word=> word!=='');

    let globalIndex =0;


    const writing =(word, wordIndx)=>{
        const box = document.getElementById(`text-box-${indx}`);
        if(!box) return;

        let span = 0;
        let splitedWord = word.split('');

        if(specialWords.includes(word.toLowerCase())){
            span = 1;
        }

        splitedWord.forEach((letter, letIndx) => {
            setTimeout(()=>{
                if(!span){
                    box.innerHTML+= letter
                    box.innerHTML+= letIndx+1 === splitedWord.length ? ' ':'';
                }
                else if(letIndx == 0){
                    box.innerHTML+= `<span class=${word} data-completed="0">`+ letter + '</span>';
                }

                else{
                    const stpanTag = box.querySelectorAll(`.${word}`);
                    stpanTag.forEach(tag=>{
                        if(!tag.getAttribute('dataCompleted')){
                            tag.innerHTML += letter;
                            if(letIndx+1 === splitedWord.length){
                                tag.innerHTML += " ";
                                tag.setAttribute("dataCompleted", 1);
                                }
                            }
                        }
                    );
                }
            },(globalIndex + wordIndx + letIndx)*30)  
        });

        globalIndex+=splitedWord.length;
    }

    // const nextWriting = new Event('nextWriting');


    useEffect(()=>{
        const paragraph = document.getElementById(`text-box-${indx}`);
        // paragraph.addEventListener('nextWriting', (e) => { 

        //  }, false);

        allWords.forEach((word,wordIndx)=>{
            writing(word,wordIndx)
            if(wordIndx +1 === allWords.length){
                // paragraph.dispatchEvent(nextWriting);
            }
            }
        );

    },[]);
    
    return(
        <p key={indx} id={`text-box-${indx}`} className={"write-span"}>
            {/* {
                allWords.map((word,wordIndx)=>
                    specialWords.includes(word.toLowerCase())
                    ? 
                        <span>{word} </span>
                    : 
                        word + " "
                )
            } */}
        </p>
    )
}
export default writeWithForSpan;