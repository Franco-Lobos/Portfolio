

const CarrousellCard = ({card, indx, centered}) =>{

    return(
        <div className={`carrousell-card ${centered ? ` active`: ``}`} id={`carrousell-card-${indx}`}>
            <div className="card-title">{card.name}</div>
            <div className="card-description">{card.description}</div>
            <div className="card-date">{card.date}</div>
            <div className="card-country">{card.country}</div>

        </div>
    );
}

export default CarrousellCard;