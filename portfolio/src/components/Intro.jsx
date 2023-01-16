import { useEffect, useState } from "react";

import '../styles/intro.css'

import { ProfileConst } from "../constants/ProfileConst";
import Canvas from "./Canvas";
import Home from "./Home";

const Intro =()=>{
    const [Profile, setProfile] =  useState(0);

    const [loading, setLoad] = useState(0);
    const [intro, setIntro] = useState(0);

    const changeChanel = (name)=>{
        const title = document.getElementById('video-1');
        if(!title) return;
        const main = document.getElementById('main');
        let oldColor =title.style.backgroundColor ;
        main.style.backgroundColor = '#000';
        title.textContent = "";

        setTimeout(()=>{
            main.style.backgroundColor = oldColor;
            title.textContent = name;
        }
        ,200)
    }

    useEffect(()=>{
        setProfile(ProfileConst);
    },[]);

    useEffect(()=>{
        let time = 800;
        if(!loading) return;
        setTimeout(()=>{
            changeChanel('VIDEO 2');
        },time);
        setTimeout(()=>{
            changeChanel(Profile.name + ' ' + Profile.lastName);
        },time*2);
        setTimeout(()=>{
            document.getElementById('video-1').textContent =  "";
            setIntro(1);
        }
        ,time*4);

    },[loading]);

    return(
        <div id='main'>
            {
                // !loading
                // ?
                // <Canvas loading={loading} setLoad={setLoad}></Canvas>
                // :
                
  
                // !intro
                // ?
                // <div id='video-1'>
                //     VIDEO 1
                // </div>
                // :
                <Home></Home>
                
            }
        </div>
    );
}

export default Intro;