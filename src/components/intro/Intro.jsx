import '../../styles/intro.css'

import { useEffect, useState } from 'react';

import { ProfileConst } from "../../constants/ProfileConst";
import { UocConst } from "../../constants/UocConst";

import WriteWithForSpan from '../Template/WriteWithForSpan';


const Intro = ({ setInitialized }) => {

    const [writed, setWrited] = useState(0);

    const [disappear, setDisappeear] = useState(0);

    const [skip, setSkip] = useState(30);
    const [flag, setFlag] = useState(0);

    const semester = [{
        number: 1, word: "first",
    },
    {
        number: 2, word: "second",
    },
    {
        number: 3, word: "third",
    },
    {
        number: 4, word: "fourth",
    },
    {
        number: 5, word: "fifth",
    },
    {
        number: 6, word: "sixth",
    },
    {
        number: 7, word: "seventh",
    },
    {
        number: 8, word: "eighth",
    },
    {
        number: 9, word: "ninth",
    },
    {
        number: 10, word: "tenth",
    },
    ]

    const doingSemester = semester.find(sem => sem.number === UocConst.planification.doing).word;

    const completedCourses = UocConst.asignatures.filter(course => course.status === 4).length;
    const totalCourses = UocConst.asignatures.length;

    const intro = ProfileConst.intro(completedCourses, totalCourses, doingSemester);
    console.log("intro", intro)
    const disappearRandom = (element, last = 1) => {
        let randTime = (Math.floor(Math.random() * 10) * 100 * last + 300);
        setTimeout(() => {
            element.style.color = "var(--dark-bg)";
            element.style.backgroundColor = "var(--dark-bg)";
            element.style.border = "0px";

        }, randTime)
    }

    const disappearText = () => {
        console.log(intro.length)
        console.log(writed)

        if (intro.length <= writed) {
            const parragraphs = document.querySelectorAll('.intro-text-description p');
            const title = document.querySelector('.intro-title p');

            parragraphs.forEach((ph, indx) => {
                disappearRandom(ph, indx === 0 ? 1 : 0);
            })

            title.addEventListener('transitionend', e => {
                if (e.target === title) {
                    setTimeout(() => {
                        // setPageReady(1);
                        window.location.href = "/"
                        setInitialized(1);
                    }, 300);
                }
            })

            disappearRandom(title, 3);

            parragraphs.forEach(ph => {
                let sWord = ph.querySelectorAll('span');
                let aWord = ph.querySelectorAll('a');
                let button = document.getElementById('main-go-button');

                sWord.forEach(word => {
                    disappearRandom(word, 2)
                });

                aWord.forEach(anchor => {
                    disappearRandom(anchor, 2.5)
                });

                disappearRandom(button, 0)
            })

        }
    }

    useEffect(() => {
        setFlag(0);
    }, [skip]);

    useEffect(() => {
        if (!flag) {
            setFlag(1);

        }
    }, [flag]);

    useEffect(() => {
        if (writed === intro.length + 1) {
            setDisappeear(1);
        }
    }, [writed, skip]);

    useEffect(() => {
        const skipButton = document.getElementById('skiping-button');
        if (!skipButton) return
        skipButton.addEventListener('animationstart', () => {
            skipButton.style.opacity = '1';
        })
    }, [])

    return (
        <div id='main-intro'>
            <div className='intro-text'>
                <div className='intro-title'>
                    {flag ?
                        <WriteWithForSpan
                            inptString="Hi, I am Franco Lobos" indx={0}
                            writed={writed} setWrited={setWrited} delay={10} veloc={skip}
                            style={{ fontSize: "2rem" }}
                        ></WriteWithForSpan>
                        : ""
                    }
                </div>
                <div className='intro-text-description'>
                    {
                        flag
                            ?
                            intro.map((fr, indx) =>
                                <WriteWithForSpan
                                    key={indx}
                                    inptString={fr} specialWords={ProfileConst.specialWords} indx={indx + 1}
                                    writed={writed} setWrited={setWrited} delay={10} veloc={skip}
                                ></WriteWithForSpan>
                            )
                            : ""
                    }
                </div>
                {
                    disappear
                        ?
                        <button id="main-go-button" onClick={() => disappearText()}> Go!</button>
                        :
                        <div id="skiping-button" onClick={() => setSkip(1)}> Skip</div>
                }
            </div>
        </div>
    )
}

export default Intro;