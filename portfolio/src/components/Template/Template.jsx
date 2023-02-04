import { useEffect, useState } from "react";

import '../../styles/template.css'

import HeaderMain from "./header/HeaderMain";

import DinamicBody from "./DinamicBody";

const Template = ()=>{

    const [loaded, setLoad] = useState(0);
    const [path, setPath] = useState(0);

    const routes = [
        { path: '/', icon: 'home'},
        { path: '/portfolio', icon: 'work'},
        { path: '/', icon: 'science'},
        { path: '/sommelier', icon: 'local_bar'},
        { path: '/', icon: 'school'},
    ]

    useEffect(()=>{
        setLoad(0);
    },[path])

    useEffect(()=>{
        if(!path) return
        if(!loaded){
            setLoad(routes.length-1);
        }
        console.log(path)
    },[loaded])

    return(
        <div id='home-main'>
            <HeaderMain setLoad={setLoad} routes={routes} setPath={setPath}></HeaderMain>

            {
                loaded  === routes.length-1
                ?
                <DinamicBody componentPath={path}></DinamicBody>
                :
                ""
            }
        </div>
    )
};



export default Template;