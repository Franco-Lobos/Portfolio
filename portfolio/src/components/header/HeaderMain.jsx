import "../../styles/header.css"

import HeaderLink from "./HeaderLink"


const HeaderMain = ({setLoad, links})=>{

    return(
        <div id="header-main">
           {
           links.map((link, indx)=>
                <HeaderLink key={indx} indx={indx} icon={links[indx]} setLoad={setLoad} ></HeaderLink>
            )
            }
        </div>
    )
}

export default HeaderMain;