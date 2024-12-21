import "../../../styles/header.css"



const FooterMain = () => {
    const version = "5.2.1";

    return (
        <div id="footer-main">
            <p>
                Powered by <a href="https://www.klugerbyte.com" target="_blank">Kluger Byte</a> <span> - V.{version}</span>
            </p>
        </div>
    )
}

export default FooterMain;