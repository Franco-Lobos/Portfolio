import { useEffect, useState } from "react";

import '../../styles/template.css'

import HeaderMain from "./header/HeaderMain";

import DinamicBody from "./DinamicBody";
import FooterMain from "./header/Footer";

import HomeIcon from '@mui/icons-material/Home';

const Template = () => {

    const [initialized, setInitialized] = useState(0);
    const [loaded, setLoad] = useState(0);
    const [path, setPath] = useState(0);

    const routes = [
        { path: '/', icon: 'home' },
        { path: '/portfolio', icon: 'work' },
        { path: '/sommelier', icon: 'science' },
        { path: '/school', icon: 'school' },
    ]

    useEffect(() => {
        setLoad(0);
    }, [path])

    useEffect(() => {
        if (!path) return
        if (!loaded) {
            setLoad(routes.length - 1);
        }
    }, [loaded])

    useEffect(() => {
        if (!localStorage.getItem("loaded")) {
            localStorage.setItem("loaded", 1);
            setPath("/intro");
        }
        else {
            setInitialized(1);
        }
    }, [])

    return (
        <div id='home-main'>
            {initialized
                ?
                <HeaderMain setLoad={setLoad} routes={routes} setPath={setPath}></HeaderMain>
                : ""
            }

            {
                loaded === routes.length - 1 || path == "/intro"
                    ?
                    <DinamicBody componentPath={path} setInitialized={setInitialized}></DinamicBody>
                    :
                    ""
            }
            {initialized
                ?
                <FooterMain></FooterMain>
                : ""
            }
        </div>
    )
};



export default Template;