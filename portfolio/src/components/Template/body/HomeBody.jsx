import { useEffect, useState } from "react";
import { ProfileConst } from "../../../constants/ProfileConst";


const HomeBody = ()=>{

    const profile = ProfileConst.personals;
    const languages = ProfileConst.languages;
    const hobbies = ProfileConst.hobbies;
    const job = ProfileConst.job;

    const [age, setAge] = useState(0);

    const calculateAge = ()=>{
        let now = new Date();
        let birth = new Date(profile.birth);
        let age = now-birth;
        let year = 1000*60*60*24*365
        age = Math.floor(age / year);
        setAge(age);
    };

    useEffect(()=>{
        calculateAge();
    },[])


    return(
        <div>
            <h5>
                <span className="color-blue">const</span> <span className="color-light-blue">thisGuy</span> = <span className="color-purple">{`{`}</span>
                <h6 style={{paddingLeft:"4rem"}}>
                    <span className="color-light-blue"> fullName : </span> <span className="color-orange">{`"${profile.name} ${profile.lastName}"`}</span>, <br/>
                    <span className="color-light-blue"> nationality : </span> <span className="color-orange">{`"${profile.nationality}"`}</span>, <br/>
                    <span className="color-light-blue"> livesIn : </span> <span className="color-orange">{`"${profile.livesIn}"`}</span>, <br/>
                    <span className="color-light-blue"> age : </span> <span className="color-green">{`${age}`}</span>, <br/>

                    <span className="color-light-blue"> languages : </span> <span className="color-purple">{`[`}</span>
                        <p style={{paddingLeft:"4rem"}}>
                            {
                                languages.map((lan, indx)=>
                                    <>
                                        <span className="color-blue">{`{`}</span>
                                        <span className="color-light-blue"> name: </span> <span className="color-orange"> "{lan.name}"</span>,
                                        <span className="color-light-blue"> &emsp; level:</span> <span className="color-orange"> "{lan.level}" </span>
                                        <span className="color-blue">{`}`}</span>
                                        {indx ===languages.length-1 ? "" : ","}
                                        <br/>
                                    </>
                                )
                            }
                        </p>
                    <span className="color-purple">{`]`}</span>, <br/><br/>

                    <span className="color-light-blue"> hobbies : </span> <span className="color-purple">{`[`}</span>
                        <p style={{paddingLeft:"4rem"}}>
                            {hobbies.map((hob,indx)=>
                            <>
                                <span className="color-orange"> "{hob}"</span>{indx ===hobbies.length-1 ? "" : ","}
                            </>
                            )}
                        </p>
                    <span className="color-purple">{`]`}</span>,<br/>
        
                    <span className="color-light-blue"> openToWork : </span> <span className="color-blue">{`${job.openToWork ? "true" :" false"}`}</span>, <br/>
                    <span className="color-light-blue"> openReloacate : </span> <span className="color-blue">{`${job.openToRelocate ? "true" :" false"}`}  </span>, <br/>
                    <span className="color-light-blue"> salaryExpectation : </span> <span className="color-orange"> "{job.salary[0]}" </span> || <span className="color-orange"> "{job.salary[1]}" </span><br/>


                </h6>
                <span className="color-purple">{`}`}</span>;

            </h5>
            
        </div>
    );
}

export default HomeBody;

