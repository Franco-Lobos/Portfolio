
const CarrousellCard = ({ card, indx, centered }) => {

    return (
        <a className={`carrousell-card ${centered == indx ? ` active` : ``}`}
            id={`carrousell-card-${indx}`}
            href={card.link}
            target="_blank"
            onTouchStart={(e) => centered != indx ? e.preventDefault : ""}
            onClick={(e) => centered != indx ? e.preventDefault : ""}>
            <div className="card-description" >{card.description}</div>
            <div className="card-date">{card.date}</div>
            <div className="card-country">{card.country}</div>
        </a>
    );
}

export default CarrousellCard;