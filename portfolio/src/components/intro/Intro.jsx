import '../../styles/intro.css'

import { useEffect, useState } from 'react';

import { ProfileConst } from "../../constants/ProfileConst";

import WriteWithForSpan from '../../library/WriteWithForSpan';

import Home from '../home/Home';

const Intro = ()=>{

    const[writed, setWrited] = useState(0);
    const[pageReady, setPageReady] = useState(0);

    const disappearRandom=(element, last = 1)=>{
        let randTime = (Math.floor(Math.random()*10)*100*last + 500 );
            setTimeout(()=>{
                element.style.color="var(--dark-bg)";
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
                    console.log('ready');
                    setTimeout(() => {
                        // setPageReady(1);
                        window.location.href= "/"
                }, 300);
                }
            })

            disappearRandom(title, 2);

            parragraphs.forEach(ph=>{
                let sWord = ph.querySelectorAll('span');
                sWord.forEach(word=>{
                    disappearRandom(word)
                })
            })

        }
    }
    
    useEffect(()=>{
        console.log('writed:',writed)
        if (writed  === ProfileConst.intro.length +1 ){
            disappearText();
        }
    },[writed]);

    return(
        <div id='main-intro'>
            <div className='intro-text'>
                <div className='intro-title'>
                    <WriteWithForSpan 
                        inptString="Hi, I am Franco Lobos" indx={0}
                        writed = {writed} setWrited={setWrited} delay={10} veloc={100}
                    ></WriteWithForSpan>
                </div>
                <div className='intro-text-description'>
                    {
                    ProfileConst
                        ?
                        ProfileConst.intro.map((fr,indx)=>
                        <WriteWithForSpan 
                            key={indx}
                            inptString={fr} specialWords={ProfileConst.specialWords} indx={indx+1}
                            writed = {writed} setWrited={setWrited} delay={10}
                        ></WriteWithForSpan>
                           )
                        :""
                    }
                </div>
            </div>
        </div>
    )
}

export default Intro;