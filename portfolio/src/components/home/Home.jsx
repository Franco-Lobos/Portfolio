
import { useEffect, useState } from "react";

import '../../styles/home.css'

import HeaderMain from "../header/HeaderMain";
import HomeBody from "./HomeBody";


const Home = ()=>{

    const [loaded, setLoad] = useState(0);

    const links = ['home', 'work', 'science', 'local_bar', 'school']


    return(
        <div id='home-main'>
            <HeaderMain setLoad={setLoad} links={links}></HeaderMain>

            {
                loaded  === links.length-1
                ?
                <HomeBody></HomeBody>
                :
                ""
            }
        </div>
    )
};



export default Home;