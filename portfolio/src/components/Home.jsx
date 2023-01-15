import { useEffect, useState } from "react";

import { ProfileConst } from "../constants/ProfileConst";

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
        </div>
    );
}

export default Home;