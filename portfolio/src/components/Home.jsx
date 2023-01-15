import { useEffect, useState } from "react";

import { ProfileConst } from "../constants/ProfileConst";
import Canvas from "./Canvas";


const Home =()=>{
    const [Profile, setProfile] =  useState(0);

    useEffect(()=>{
        setProfile(ProfileConst);
    },[]);

    return(
        <div>
            <div>
                {Profile.name + ' ' + Profile.lastName}
            </div>
            <Canvas></Canvas>
        </div>
    );
}

export default Home;