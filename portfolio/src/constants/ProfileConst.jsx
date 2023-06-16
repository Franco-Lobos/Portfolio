export const ProfileConst = {
    personals:{
        name:"Franco",
        lastName: "Lobos",
        nationality: "Argentino",
        livesIn: "Andorra",
        birth: "1996-01-19T09:05:00.000Z"
    },

    languages:[
        {name: "Español", level: "Native"},
        {name: "English", level: "B2"},
        {name: "Català", level: "A1"},
        {name: "Deutsch", level: "Ich lerne..."}

    ],

    job:{
        openToWork :1,
        openToRelocate :1,
        salary : ["€30.000 - €36.000 "]
    },

    hobbies: ["Chess", "Guitar", "RPG games", "Wine tasting", "Cooking", "Snowboard"],


    intro:[`
        About me?`, 
        // 'Generic example creative example lorem ispun consolidated',
        `I have always driven my gastronomic projects.
        I also had my own restaurant, wine brand, and drinks brand. 
        Therefore, I consider myself a very creative and enterprising person with adaptation skills.`,
        `In 2021 I learned about the information technology world.
        I took my first steps learning Python self-taught and working as a WordPress plugin developer
        for a local company.`,
        ` Nowadays, I am studding an online <aid="link-0"/> at UOC,
        meanhwile collaborating on different projects as a freelancer.`,
        `My goal is to make coding a full-time job in a consolidated company.`
    ],

    specialWords:[
        `creative`, `adaptation`, `python`, `wordpress`, `Bachelor's degree`, `consolidated`,
        `bachelor's degree`, `Univesity`
    ],


    links:[
        {
            id: 0,
            text: "Bachelor's degree in Software Development",
            href:"https://studies.uoc.edu/en/bachelors-degrees/software-development/study-plan"
        }
    ]
}
