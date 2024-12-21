import { useState } from "react";
import { useEffect } from "react";

import { breath, spawnElement, addHover } from "../../../library/library";

import HomeIcon from '@mui/icons-material/Home';
import Icon from "@mui/material/Icon";

const HeaderLink = ({ indx, route, setLoad, setPath }) => {

    const [breathing, setBreathing] = useState(0);


    let time = 4000 // miliseconds
    let hoverBrightness = 1 // scale 

    useEffect(() => {
        const link = document.getElementById(`header-link-${indx}`);
        const card = document.getElementById(`header-card-${indx}`);

        const links = [...document.querySelectorAll(`.header-link`)];

        if (!link || !links) return;

        spawnElement(card, indx, time);
        addHover(link, links, card, time, hoverBrightness, setLoad, indx);

        if (!breathing) {
            breath(link, indx, setBreathing, time, hoverBrightness);
        }

    }, [])

    return (
        <div className="header-link-card" id={`header-card-${indx}`} >
            <div className="header-link" id={`header-link-${indx}`} onClick={() => setPath(route.path)}>
                {/* <MaterialIcon icon={`${route.icon}`} size="large" color='#f0f0f0' /> */}
                <i
                    class="material-icons"
                    style={{ fontSize: "4rem" }}
                >{route.icon}</i>

            </div>
        </div >
    )
}

export default HeaderLink;