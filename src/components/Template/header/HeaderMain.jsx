import "../../../styles/header.css"

import HeaderLink from "./HeaderLink"


const HeaderMain = ({setLoad, routes, setPath})=>{

    return(
        <div id="header-main">
           {
           routes.map((route, indx)=>
                <HeaderLink key={indx} indx={indx} route={route} setLoad={setLoad} setPath={setPath} ></HeaderLink>
            )
            }
        </div>
    )
}

export default HeaderMain;