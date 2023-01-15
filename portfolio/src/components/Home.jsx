import '../styles/home.css'
import { useEffect, useState } from 'react';

import { ProfileConst } from "../constants/ProfileConst";

import checkForSpan from '../library/checkForSpan';

const Home = ()=>{
    const [Profile, setProfile] =  useState(0);

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
                        ProfileConst.intro.map((fr,indx)=>
                        checkForSpan(fr,ProfileConst.specialWords, indx)
                        )
                        :""
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;