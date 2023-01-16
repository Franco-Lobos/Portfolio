import '../styles/home.css'
import { useEffect, useState } from 'react';

import { ProfileConst } from "../constants/ProfileConst";

import writeWithForSpan from '../library/writeWithForSpan';

const Home = ()=>{
    const [Profile, setProfile] =  useState(0);

    const[writed, setWrited] = useState(0);

    useEffect(()=>{
        setProfile(ProfileConst);
    },[]);


    return(
        <div id='main-home'>
            <div className='home-text'>
                <div className='home-title'>
                    Hi!
                </div>
                <div className='home-text-description'>
                    {ProfileConst ?
                        // writeWithForSpan(ProfileConst.intro2,ProfileConst.specialWords)

                        ProfileConst.intro.map((fr,indx)=>
                            writeWithForSpan(fr,ProfileConst.specialWords, indx, writed, setWrited)
                        )
                        :""
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;