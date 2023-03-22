const ModalCard = ({title, text, button, closer})=>{
    return(
        <div>
            {/* <div onClick={closer}>X</div> */}
            <div>{title}</div>
            <div>{text}</div>
            <button onClick={closer}>{button}</button>
        </div>
    );
};

export default ModalCard;