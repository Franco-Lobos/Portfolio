import '../../styles/intro.css'

import { useEffect, useState } from 'react';

import { ProfileConst } from "../../constants/ProfileConst";

// import WriteWithForSpan from '../../library/WriteWithForSpan';


const Intro = ()=>{

    const[writed, setWrited] = useState(0);
    const[pageReady, setPageReady] = useState(0);

    const[disappear, setDisappeear] = useState(0);

    const disappearRandom=(element, last = 1)=>{
        let randTime = (Math.floor(Math.random()*10)*100*last + 300 );
            setTimeout(()=>{
                element.style.color="var(--dark-bg)";
                element.style.backgroundColor="var(--dark-bg)";
                element.style.border="0px";

            },randTime)
    }

    const disappearText=()=>{
        if(pageReady) return;

        if( ProfileConst.intro.length+1 ===writed){
            const parragraphs = document.querySelectorAll('.intro-text-description p');
            const title = document.querySelector('.intro-title p');

            parragraphs.forEach((ph, indx)=>{
                disappearRandom(ph, indx===0 ? 1:0);
            })

            title.addEventListener('transitionend', e=>{
                if(e.target===title && !pageReady){
                    setTimeout(() => {
                        // setPageReady(1);
                        window.location.href= "/"
                }, 300);
                }
            })

            disappearRandom(title, 3);

            parragraphs.forEach(ph=>{
                let sWord = ph.querySelectorAll('span');
                let aWord = ph.querySelectorAll('a');
                let button = document.getElementById('main-go-button');

                sWord.forEach(word=>{
                    disappearRandom(word, 2)
                });

                aWord.forEach(anchor=>{
                    disappearRandom(anchor, 2.5)
                });

                disappearRandom(button, 0)
            })

        }
    }
    
    useEffect(()=>{
        if (writed  === ProfileConst.intro.length +1 ){
            setDisappeear(1);
        }
    },[writed]);

    return(
        <div id='main-intro'>
            <div className='intro-text'>
                <div className='intro-title'>
                    {/* <WriteWithForSpan 
                        inptString="Hi, I am Franco Lobos" indx={0}
                        writed = {writed} setWrited={setWrited} delay={10} veloc={100}
                        style={{fontSize:"2rem"}}
                    ></WriteWithForSpan> */}
                </div>
                <div className='intro-text-description'>
                    {
                    ProfileConst
                        ?
                        "testing"
                        // ProfileConst.intro.map((fr,indx)=>
                        // <WriteWithForSpan 
                        //     key={indx}
                        //     inptString={fr} specialWords={ProfileConst.specialWords} indx={indx+1}
                        //     writed = {writed} setWrited={setWrited} delay={10}
                        // ></WriteWithForSpan>
                        //    )
                        :""
                    }
                </div>
                {
                    disappear
                    ?
                    <button id="main-go-button" onClick={()=>disappearText()}> Go!</button>
                    :""
                }
            </div>
        </div>
    )
}

export default Intro;