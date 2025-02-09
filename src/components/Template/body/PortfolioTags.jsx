import PortfolioTagSingle from "./PortfolioTagSingle";

const PortfolioTags = ({ words, selectedSkills, previousSkills }) => {

    let amount = Object.keys(words).length - 1;

    return (
        <div className={`porfolio-word-container`}>
            {
                words.map((word, indx) =>
                    <PortfolioTagSingle word={word} indx={indx} last={indx == amount} key={indx}
                        selectedSkills={selectedSkills} previousSkills={previousSkills}
                    ></PortfolioTagSingle>
                )
            }
        </div>
    )
}


export default PortfolioTags;