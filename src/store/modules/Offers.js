const state = {
    currentPage: 1,
    currentSavedPage: 1,
    countOfferPerPage: 10,
    currentSortBy: "CONTRACTOR RATING",
    priority: -1,
    maxPrice: 0,
    minPrice: 0,
    maxRating: 0,
    minRating: 0,
    sortPriority: 'decrease',
    type: ["all"],
    professionalArea: ["all"],
    projectDuration: [0],
    premium: "all",
    stablishOffersList: [],
    currentOffer: 0,
    offersList: [
        {
            id: 1,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 2,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full proje0ct",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 3,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 4,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 5,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 6,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 7,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 8,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 9,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 10,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 11,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 12,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 13,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 14,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 15,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 16,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 17,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 1,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 2,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 3,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 4,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 5,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 6,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 7,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 8,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 9,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 10,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 11,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 12,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 13,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 14,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 15,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 16,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 17,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 18,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 19,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 20,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 21,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 22,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 23,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 24,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 25,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 26,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 27,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 28,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 29,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 30,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 31,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 32,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 33,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 34,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 35,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 36,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 37,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 38,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 39,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 40,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 41,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 42,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 43,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 44,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 45,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 46,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 47,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 48,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 49,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 50,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 51,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 52,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 53,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 54,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 55,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 56,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 57,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 58,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 59,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 60,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 61,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 62,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 63,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 64,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 65,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 66,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 67,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 68,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 69,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 70,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 71,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 72,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 73,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 74,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 75,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 76,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 77,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 78,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 79,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 80,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 81,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 82,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 83,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 84,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 85,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 86,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 87,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 88,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 89,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 90,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 91,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 92,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 93,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 94,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 95,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 96,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 97,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 98,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 99,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 100,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 101,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 102,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 103,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 104,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 105,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 106,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 107,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 108,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 109,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 110,
            ownerId: 2,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 111,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 112,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 113,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 114,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1519373200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 115,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Make social network",
            wallet: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 116,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Create innovative compress algorithm",
            wallet: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 143100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 117,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Create cool website",
            wallet: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 62150,
            reqs: [
                "Java Script",
                "HTML/CSS",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 118,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 119,
            ownerId: 2,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
            "Bot should do few things: track amount of something, send push notifications to admins telling about " +
            "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 120,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 121,
            ownerId: 1,
            contractorId: 1,
            walletId: 1,
            title: "Developing web-server",
            wallet: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
            rating: 6.0,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 31905,
            reqs: [
                "Shell",
                "Linux"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Medicine research"
            ],
            date: 1517173200000,
            projectDuration: 301,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 122,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Haskell telegram bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5, //установить от рейтинга юзера
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 105500,
            // file: '',
            reqs: [
                "Haskell",
                "Algo cert",
                "0.6 c/dt"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518724800000,
            projectDuration: 12,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: true
        },
        {
            id: 123,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Java server",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 6.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 76700,
            reqs: [
                "Java",
                "Database"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518976800000,
            projectDuration: 5,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: 'C:/program files/specification_file.docx',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 124,
            ownerId: 1,
            contractorId: 1,
            walletId: 1,
            title: "React frontend",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 4.7,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 10350.45401,
            reqs: [
                "React",
                "Algo cert"
            ],
            type: [
                "all",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1518422400000,
            projectDuration: 22,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 125,
            ownerId: 1,
            contractorId: 1,
            walletId: 1,
            title: "C++/Qt gui",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 6.4,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 8100,
            reqs: [
                "C++",
                "QT",
                "0.8 c/dt"
            ],
            type: [
                "all",
                "patch",
                "full project",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1521549000000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 126,
            ownerId: 1,
            contractorId: 1,
            walletId: 1,
            title: "Markup Jade",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 3.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 4900,
            reqs: [
                "HTML",
                "CSS",
                "Jade"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Media processing"
            ],
            date: 1519401600000,
            projectDuration: 32,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 127,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "VK bot",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 7.2,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 14600,
            reqs: [
                "Python",
                "Algo cert",
                "0.3 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Medicine research"
            ],
            date: 1522530000000,
            projectDuration: 25,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 128,
            ownerId: 1,
            contractorId: 1,
            walletId: 1,
            title: "Mobile Android App",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 6.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 44000,
            reqs: [
                "Java",
                "Kotlin",
                "Android"
            ],
            type: [
                "all",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education"
            ],
            date: 1520542800000,
            projectDuration: 38,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: true,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 129,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Mobile IOS App",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 5.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 21300,
            reqs: [
                "Swift",
                "IOS"
            ],
            type: [
                "all",
                "full project"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology",
                "Machine learning and Big data",
                "Medicine research"
            ],
            date: 1520096400000,
            projectDuration: 1,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 130,
            ownerId: 1,
            contractorId: 1,
            walletId: 1,
            title: "UX",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 8.1,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 43100,
            reqs: [
                "UX",
                "Design"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet"
            ],
            date: 1519678800000,
            projectDuration: 16,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: false,
            completed: false
        },
        {
            id: 131,
            ownerId: 1,
            contractorId: 2,
            walletId: 1,
            title: "Compress algorithm",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 62150,
            reqs: [
                "C/C++",
                "Algo cert",
                "1.1 c/dt"
            ],
            type: [
                "all",
                "patch"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Chemystry and Biology"
            ],
            date: 1526072400000,
            projectDuration: 70,
            premium: [
                "all",
                "premium"
            ],
            fileSolution: '',
            saved: false,
            apply: true,
            submited: true,
            completed: false
        },
        {
            id: 132,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Online game",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 133,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 134,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 135,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 136,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 137,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 138,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 139,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 140,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 141,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 142,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 143,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 144,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 145,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 146,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 147,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 148,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 149,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 150,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 151,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 152,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 153,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 154,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 155,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 156,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 157,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 158,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 159,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 160,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 161,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 162,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 163,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 164,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 165,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 166,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 167,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 168,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 169,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 170,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 171,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 172,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 173,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 174,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 175,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 176,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 177,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 178,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 179,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 180,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 180,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 181,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 182,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 183,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 184,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 185,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 186,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 187,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 188,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 189,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 190,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 191,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 192,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 193,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 194,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 195,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 196,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 197,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ],
            professionalArea: [
                "all",
                "Information technology, System integration, Internet",
                "Science and Education",
                "Machine learning and Big data"
            ],
            date: 1521493200000,
            projectDuration: 4,
            premium: [
                "all"
            ],
            fileSolution: '',
            saved: false,
            apply: false,
            submited: false,
            completed: false
        },
        {
            id: 198,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 199,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },
        {
            id: 200,
            ownerId: 1,
            contractorId: 0,
            walletId: 1,
            title: "Make pretty not-scum cryptocurrency",
            wallet: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
            rating: 1.5,
            desc: "We are looking for a talented developer to write functional and working bot for Telegram messenger. " +
                "Bot should do few things: track amount of something, send push notifications to admins telling about " +
                "errors, notify user about…",
            price: 235500,
            reqs: [
                "Gamedev",
                "Unity",
                "C++",
                "Algo cert"
            ],
            type: [
                "all",
                "patch",
                "script"
            ]
        },

    ],
    
    offersSavedList: []
};

const mutations = {
    SET_NEW_SELECT(state, item) {
        if (typeof item === "number") {
            state.countOfferPerPage = item;
        } else {
            state.currentSortBy = item;
        }

        state.currentPage = 1;
    },
    SET_COUNT_OFFERS_PER_PAGE(state, item) {
        state.countOfferPerPage = item;
    },
    SET_SORT_PRIORITY(state, item) {
        state.sortPriority = item;
    },
    SET_CURRENT_PAGE(state, item) {
        state.currentPage = item;
    },
    SET_CURRENT_PRIORITY(state, item) {
        state.priority = item;
    },
    SET_PRICE_FORK(state, max, min) {
        state.maxPrice = max;
        state.minPrice = min;
    },
    SET_MIN_PRICE(state, item) {
        state.minPrice = item;
    },
    SET_MAX_PRICE(state, item) {
        state.maxPrice = item;
    },
    SET_MIN_RATING(state, item) {
        state.minRating = item;
    },
    SET_MAX_RATING(state, item) {
        state.maxRating = item;
    },
    SET_NEW_OFFERS_LIST(state, item) {
        state.offersList = item;
    },
    SET_STABLISH_OFFERS_LIST(state, item) {
        state.stablishOffersList = item;
    },
    SET_TYPE_PROJECT(state, item) {
        state.type = item;
    },
    SET_PROFESSIONAL_AREA(state, item) {
        state.professionalArea = item;
    },
    SET_PROJECT_DURATION(state, item) {
        state.projectDuration = item;
    },
    SET_PREMIUM_PROJECT(state, item) {
        state.premium = item;
    },
    SET_CURRENT_OFFER(state, item) {
        state.currentOffer = item;
    },
    SET_SAVED_ELEMENT_IN_OFFERS_LIST(state, id) {
        state.offersList.find(item => {
            return parseInt(item.id) === parseInt(id);
        }).saved = true;
    },
    UNSET_SAVED_ELEMENT_FROM_OFFER_LIST(state, id) {
        state.offersList.find(item => {
            return parseInt(item.id) === parseInt(id);
        }).saved = false;
    },
    ACCEPT_SOLUTION(state, id) {
        for (let i = 0; i < state.offersList.length; i++) {
            if (state.offersList[i].id == id)
                state.offersList[i].completed = true;
        }
    },
    SUBMIT_SOLUTION(state, obj) {
        for (let i = 0; i < state.offersList.length; i++) {
            if (state.offersList[i].id == obj.id)
                state.offersList[i].submited = true;
            state.offersList[i].fileSolution = obj.fileSolution;
        }
    },
    ADD_NEW_OFFER(state, offer) {
        state.offersList.push(offer);
    },
    UPDATE_OFFERS_LIST(state, offer) {
        let i = state.offersList.findIndex(item => {
            return item.id === offer.id;
        });
        state.offersList[i] = offer;
    },

    REMOVE_OFFERS(state, offersId) {
        for (let i = 0; i < offersId.length; i++) {
            let rmOfferInd = state.offersList.findIndex(item => {
                return parseInt(item.id) === parseInt(offersId[i].id);
            });
            state.offersList.splice(rmOfferInd, 1);
        }
    }
};

const getters = {
    getComputedOfferList: state => {
        return state.offersList.filter(item => {
            return !item.apply || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.contractorId))
                || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.ownerId)) && !item.completed;
        })
    },
    getPartOffersList: state => {
        return state.offersList.filter(item => {
            return !item.apply || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.contractorId))
                || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.ownerId)) && !item.completed;
        }).slice((state.currentPage - 1) * state.countOfferPerPage, state.currentPage * state.countOfferPerPage);
    },
    //переписать в соответствии с данными для сейвд пейдж
    getPartOfferSavedList: state => {
        return state.offersList.filter(function (el) {
            return el.saved;
        }).slice((state.currentPage - 1) * state.countOfferPerPage, state.currentPage * state.countOfferPerPage);
    },
    doSortByRatingIncrease: state => {
        return state.offersList.sort(function (a, b) {
            return a.rating - b.rating;
        });
    },
    doSortByRatingDecrease: state => {
        return state.offersList.sort(function (a, b) {
            return b.rating - a.rating;
        });
    },
    doSortByPriceIncrease: state => {
        return state.offersList.sort(function (a, b) {
            return a.price - b.price;
        });
    },
    doSortByPriceDecrease: state => {
        return state.offersList.sort(function (a, b) {
            return b.price - a.price;
        });
    },
    doSortByEndDateIncrease: state => {
        return state.offersList.sort(function (a, b) {
            return a.date - b.date;
        });
    },
    doSortByEndDateDecrease: state => {
        return state.offersList.sort(function (a, b) {
            return b.date - a.date;
        });
    },

    doSortByRatingIncreaseSaved: state => {
        return state.offersList.filter(function (el) {
            return el.saved;
        }).sort(function (a, b) {
            return a.rating - b.rating;
        });
    },

    getMaxPriceOffers: state => {
        let maxPrice = Math.max.apply(Math, state.offersList.map(function (o) {
            return o.price;
        }));

        if (maxPrice !== -Infinity)
            return maxPrice;
        else
            return Math.max.apply(Math, state.stablishOffersList.map(function (o) {
                return o.price;
            }));
    },
    getMinPriceOffers: state => {
        let minPrice = Math.min.apply(Math, state.offersList.map(function (o) {
            return o.price;
        }));

        if (minPrice !== Infinity)
            return minPrice;

        return Math.min.apply(Math, state.stablishOffersList.map(function (o) {
            return o.price;
        }));
    },
    getMaxRatingOffers: state => {
        let maxRating = Math.max.apply(Math, state.offersList.map(function (o) {
            return o.rating;
        }));

        if (maxRating !== -Infinity)
            return maxRating;

        return Math.max.apply(Math, state.stablishOffersList.map(function (o) {
            return o.rating;
        }))
    },
    getMinRatingOffers: state => {
        let minRating = Math.min.apply(Math, state.offersList.map(function (o) {
            return o.rating;
        }));

        if (minRating !== Infinity)
            return minRating;

        return Math.min.apply(Math, state.stablishOffersList.map(function (o) {
            return o.rating;
        }));
    },
    doFilter: state => {
        let checkOption = function (el, state) {
            let check = false;
            for (let i = 0; i < state.length; i++) {
                if (el.includes(state[i])) {
                    check = true;
                } else {
                    check = false;
                    break;
                }
            }
            return check;
        };
        let checkProjectDuration = function (el, state) {
            let check = false;

            if (state.length === 1)
                return true;

            for (let i = 0; i < state.length; i++) {
                switch (state[i]) {
                    case "7":
                        if (el <= 7 && el > 0)
                            check = true;
                        break;
                    case "30":
                        if (el <= 30 && el > 7)
                            check = true;
                        break;
                    case "60":
                        if (el > 30)
                            check = true;
                        break;
                    case "0":
                        check = true;
                        break;
                }
            }

            return check;
        };
        return state.offersList.filter(function (el) {
            return el.rating <= state.maxRating && el.rating >= state.minRating &&
                el.price <= state.maxPrice && el.price >= state.minPrice &&
                el.premium.includes(state.premium) && checkOption(el.type, state.type) &&
                checkOption(el.professionalArea, state.professionalArea) &&
                checkProjectDuration(el.projectDuration, state.projectDuration);
        });
    },
    getCurrentOffer: state => {
        return state.offersList.find(function (el) {
            return parseInt(el.id) === parseInt(state.currentOffer);
        });
    },
    getCountOfferList: state => {
        return state.offersList.length;
    }
};

export default {
    state,
    mutations,
    getters
}
