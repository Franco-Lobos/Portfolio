
const CarrousellCard = ({ card, indx, centered }) => {

    const handleClick = () => {
        window.open(card.link, '_blank');
    }

    return (
        <div className={`carrousell-card ${centered == indx ? ` active` : ``}`}
            id={`carrousell-card-${indx}`}
            onTouchStart={(e) => centered != indx ? e.preventDefault() : handleClick()}
            onClick={(e) => centered != indx ? e.preventDefault() : handleClick()}>
            <div className="card-description" >{card.description}</div>
            <div className="card-date">{card.date}</div>
            <div className="card-country">{card.country}</div>
        </div>
    );
}

export default CarrousellCard;