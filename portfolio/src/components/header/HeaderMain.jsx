import "../../styles/header.css"

import HeaderLink from "./HeaderLink"

const HeaderMain = ()=>{

    const links = ['home', 'Proyects', 'chemical', 'music', 'university']

    return(
        <div id="header-main">
           {
           links.map((link, indx)=>
                <HeaderLink key={indx} indx={indx}></HeaderLink>
            )
            }
        </div>
    )
}

export default HeaderMain;