import '../styles/home.css'
import { useEffect, useState } from 'react';

import { ProfileConst } from "../constants/ProfileConst";

import writeWithForSpan from '../library/writeWithForSpan';

const Home = ()=>{
    const [Profile, setProfile] =  useState(0);

    const[writed, setWrited] = useState(0);

    const[disapear, setDisapear] = useState(0);

    const[pageReady, setPageReady] = useState(0);


    const disappearRandom=(element, last = 1)=>{
        let randTime = (Math.floor(Math.random()*10)*100*last + 500 );
            setTimeout(()=>{
                // element.style.filter="opacity(0)";
                element.style.color="var(--dark-bg)";
            },randTime)
    }


    const disappearText=()=>{
        if(disapear) return;
        if( ProfileConst.intro.length+1 ===writed){
        const parragraphs = document.querySelectorAll('.home-text-description');
        const firtsPh = document.querySelector('.home-text-description p:first-child');
        const title = document.querySelector('.home-title');

        parragraphs.forEach(ph=>{
            // ph.style.filter="opacity(0)";
            ph.style.color="var(--dark-bg)";
        })

        disappearRandom(firtsPh);
        disappearRandom(title, 1.2);
        title.addEventListener('transitionend', ()=>{
            console.log('end')
            setDisapear(1);
        })

        parragraphs.forEach(ph=>{
            let sWord = ph.querySelectorAll('span');
            sWord.forEach(word=>{
                disappearRandom(word)
            })
        })

        }
    }
    
    useEffect(()=>{
        if (!writed) return;
        disappearText();
    },[writed]);

    useEffect(()=>{
        if(!disapear) return;
        console.log('asd')
        if(!pageReady){
            console.log('READY!')
            // setPageReady(1);
        }
    },[disapear]);

    useEffect(()=>{
        setProfile(ProfileConst);
    },[]);

    return(
        <div id='main-home'>

            {!pageReady
            ?
            <div className='home-text'>
                <div className='home-title'>
                    {writeWithForSpan("Hi, I am Franco Lobos",[], 0,writed, setWrited, 10, 100)}
                </div>
                <div className='home-text-description'>
                    {
                    ProfileConst
                        ?
                        ProfileConst.intro.map((fr,indx)=>
                            writeWithForSpan(fr,ProfileConst.specialWords, indx+1, writed, setWrited, 10)
                        )
                        :""
                    }
                </div>
            </div>
            :
            " Home "
            }
        </div>
    )
}

export default Home;