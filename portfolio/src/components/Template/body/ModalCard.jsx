const ModalCard = ({title, text, button, closer})=>{
    return(
            <div className="modal-card-main">
                <div className="title">{title}</div>
                <div className="text">
                    {
                text.map((pgfh,indx)=> 
                    <div key={indx}>{pgfh}</div>
                    )
                }
                </div>
                <button onClick={closer}>{button}</button>
            </div>

    );
};

export default ModalCard;