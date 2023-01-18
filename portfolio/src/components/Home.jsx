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
                    {writeWithForSpan("Hi!",[], 0,writed, setWrited, 10, 100)}
                </div>
                <div className='home-text-description'>
                    {
                    ProfileConst
                        ?
                        // writeWithForSpan(ProfileConst.intro2,ProfileConst.specialWords, 0, writed, setWrited)

                        ProfileConst.intro.map((fr,indx)=>
                            writeWithForSpan(fr,ProfileConst.specialWords, indx+1, writed, setWrited, 40)
                        )
                        :""
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;