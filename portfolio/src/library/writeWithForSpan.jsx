import { useEffect } from "react";
import { ProfileConst } from "../constants/ProfileConst";

const WriteWithForSpan = ({inptString="", specialWords=[], indx=0, writed , setWrited, delay = 100, veloc = 30})=>{
    let allWords = inptString.split(" ");
    allWords= allWords.filter(word=> word!=='');

    let globalIndex = delay;
    let typingVelocity = veloc;

    const writeLink=(anchorTag,wordIndx, box)=>{
        let htmlTag = anchorTag.replace('<aid="link-', '<a id="link-');

        anchorTag = anchorTag.replace('<aid="link-', '');
        anchorTag= anchorTag.replace('"/>', '');

        let linkData = ProfileConst.links.find(link=>{return parseInt(link.id) == parseInt(anchorTag)});
        let word = linkData.text;
        let linkHref = linkData.href;

        htmlTag = htmlTag.replace('"/>', `" target=_blank href=${linkHref}/>`);

        let splitedWord = word.split('');
        splitedWord.forEach((letter, letIndx) => {
            setTimeout(()=>{
                if(letIndx ===0){
                    box.innerHTML+= htmlTag;
                }
                let anchor = box.querySelector(`#link-${anchorTag}`);
                anchor.textContent += letter;

                if(letIndx+1 === splitedWord.length){
                    anchor.textContent += " ";
                }
                
            },(globalIndex + wordIndx + letIndx )*typingVelocity);
            }
        )
        globalIndex+=splitedWord.length;
    }

    const writing =(word, wordIndx, last)=>{
        const box = document.getElementById(`text-box-${indx}`);
        if(!box) return;

        let span = 0;
        let splitedWord = word.split('');

        if(specialWords.includes(word.toLowerCase())){
            span = 1;
        }

        if(word.toLowerCase().includes('<a')){
            writeLink(word,wordIndx, box);
            return;
        }

        splitedWord.forEach((letter, letIndx) => {
            setTimeout(()=>{
                if(last && letIndx+1===splitedWord.length){
                    setTimeout(()=>{
                        box.setAttribute('dataReady', 1);
                        setWrited(writed+1);
                    },splitedWord.length*typingVelocity*2
                    )
   
                }
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
            },(globalIndex + wordIndx + letIndx )*typingVelocity )  
        });

        globalIndex+=splitedWord.length;
    }

    const startWriting=()=>{
        allWords.forEach((word,wordIndx)=>{
            let last = wordIndx +1 === allWords.length;
                writing(word,wordIndx, last)
            }
        );
    }

    useEffect(()=>{
        const paragraph = document.getElementById(`text-box-${indx}`);
        const prevParagraph = document.getElementById(`text-box-${indx-1}`);

        let thisFlag = parseInt(paragraph.getAttribute('dataReady'));
        let prevFlag = parseInt(prevParagraph?.getAttribute('dataReady'));

        if(thisFlag) return;
        if( indx===0 || prevFlag ){
            startWriting();
        };
    },[writed]);

    return(
        <p key={indx} id={`text-box-${indx}`} className={"write-span"}>
        </p>
    )
}
export default WriteWithForSpan;