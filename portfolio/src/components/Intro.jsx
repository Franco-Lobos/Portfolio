import { useEffect, useState } from "react";

import '../styles/intro.css'

import { ProfileConst } from "../constants/ProfileConst";
import Canvas from "./Canvas";
import Home from "./home/Home";



const Intro =()=>{
    const [Profile, setProfile] =  useState(0);

    const [loading, setLoad] = useState(0);
    const [intro, setIntro] = useState(0);

    const changeChanel = (name)=>{
        const title = document.getElementById('video-1');
        if(!title) return;
        title.textContent = "";

        setTimeout(()=>{
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
            setIntro(1);
        },time*2);
        setTimeout(()=>{
            document.getElementById('video-1').textContent =  "";
        }
        ,time*4);

    },[loading]);


    return(
        <div id='main'>
            {/* {
                !loading
                ?
                <Canvas loading={loading} setLoad={setLoad}></Canvas>
                :
                <>
                <div id='video-1'>
                    VIDEO 1
                </div>

                {
                intro
                ? 
                <Home></Home>
                : ""
                }
                </>

            } */}
            
            <Home></Home>

        </div>
    );
}

export default Intro;