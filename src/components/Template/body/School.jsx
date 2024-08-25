
import { useState, useEffect } from "react";
import { UocConst } from "../../../constants/UocConst";


import "../../../styles/school.css"

const School = () => {

    const [school, setSchool] = useState(0);

    const [backlogDropDown, setBacklogDropDown] = useState(0);

    const [resizeAdded, setResizeAdded] = useState(0);

    useEffect(() => {
        if (!UocConst) return;
        setSchool(UocConst);
    }, []);

    const centerCalifications = () => {
        const doneAsignaturesCards = document.querySelectorAll('#done .kanban-column-cards .card-item');
        const doneAsignaturesCalifications = document.querySelectorAll('#done .kanban-column-cards .card-item-calification');

        if (!doneAsignaturesCards) return;

        doneAsignaturesCards.forEach((asignature, indx) => {
            let thisCardCalification = doneAsignaturesCalifications[indx];
            let hudreed = asignature.offsetWidth - thisCardCalification.offsetWidth;

            let percent = school.asignatures?.find(asign => asign.name === asignature.id).calification * 0.1;
            thisCardCalification.style.left = hudreed * percent + "px";
        }
        )
    }

    const sortByCalification = (arr, propertyName = 'calification', order = 'descending') => {
        const sortedArr = arr.sort((a, b) => {
            if (a[propertyName] < b[propertyName]) {
                return -1;
            }
            if (a[propertyName] > b[propertyName]) {
                return 1;
            }
            return 0;
        });
        if (order === 'descending') {
            return sortedArr.reverse();
        }
        return sortedArr;
    };

    useEffect(() => {
        centerCalifications();
        if (!resizeAdded) {
            window.addEventListener("resize", () => {
                centerCalifications();
            });
            setResizeAdded(1);
        }

    }, [school]);

    return (<>
        {
            school
                ?
                <div className="school-body">
                    <div className="school-title">
                        <div id="degree-type">
                            <div>{school.degree.type}</div>
                            <a href={school.degree.universityLink} target={"blank"}>{school.degree.university}</a>
                        </div>
                        <a id="degree-name" target={"blank"} href={school.degree.link}>{school.degree.name}</a>
                    </div>
                    <div className="school-kanban">
                        {
                            school.kanbanStatus.map((status) => {

                                const thisSectionLengt = school.asignatures.filter(course => course.status - 1 === UocConst.kanbanStatus.indexOf(status)).length;
                                const totalCourses = school.asignatures.length;

                                const percentage = Math.round((thisSectionLengt / totalCourses) * 100);

                                return (
                                    <div className="kanban-column" id={status} key={status}>
                                        <div className="kanban-column-title">{status.split("-").join(" ") + " -  " + percentage + "%"}</div>
                                        <div className="kanban-column-cards">
                                            {
                                                status !== "backlog"
                                                    ?
                                                    sortByCalification(school.asignatures.filter(course => course.status - 1 === UocConst.kanbanStatus.indexOf(status)), 'calification', status == 'done' ? 'descending' : '')
                                                        .map((courseCard) =>

                                                            <a target={"blank"} href={courseCard.link} className="card-item" id={courseCard.name} key={courseCard}>
                                                                <div className="card-item-title">{courseCard.name}</div>
                                                                {
                                                                    courseCard.calification
                                                                        ?
                                                                        <div className="card-item-calification">{courseCard.calification}</div>
                                                                        : ""
                                                                }
                                                            </a>

                                                        )
                                                    :
                                                    school.semesters.filter((semester) => semester >= UocConst.planification.backlog)
                                                        .map((semester) =>
                                                            <div className="card-item" id={`semester-${semester}`} onClick={() => backlogDropDown === semester ? setBacklogDropDown(0) : setBacklogDropDown(semester)} key={semester}>
                                                                <div className="card-item-title"> {`Semseter ${semester}`}</div>
                                                                {
                                                                    backlogDropDown === semester
                                                                        ?
                                                                        <div className="card-item-dropdown">
                                                                            {school.asignatures.filter(course => course.status - 1 === UocConst.kanbanStatus.indexOf(status) && course.semseter === semester)
                                                                                .map((courseCard) =>
                                                                                    courseCard.link !== ""
                                                                                        ?
                                                                                        <a target={"blank"} href={courseCard.link} className="card-item-dropdown-item"> <span>•</span> {courseCard.name}</a>
                                                                                        :
                                                                                        <a className="card-item-dropdown-item no-hover"> <span>•</span> {courseCard.name}</a>

                                                                                )
                                                                            }
                                                                        </div>
                                                                        : ""
                                                                }

                                                            </div>
                                                        )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
                : ""
        }
    </>)
}


export default School;