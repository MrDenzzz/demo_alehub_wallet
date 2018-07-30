import axios from 'axios';

const state = {
    employers: [
        {
            id: 1,
            name: 'Effective Energy LTD',
            rating: 9.2
        },
        {
            id: 2,
            name: 'Bug Busters LLC',
            rating: 6.4
        },
        {
            id: 3,
            name: 'SpecPropMounted VUE',
            rating: 7.9
        }
    ],
    positions: [
        {
            id: 1,
            title: 'ch'
        },
        {
            id: 2,
            title: 'ts'
        },
        {
            id: 3,
            title: 'ex'
        },
        {
            id: 4,
            title: 'qa'
        }
    ],
    contractors: [
        {
            id: 1,
            positionId: 1,
            name: 'Vasiliy Ivanov'
        },
        {
            id: 2,
            positionId: 2,
            name: 'Ivan Kotov'
        },
        {
            id: 3,
            positionId: 3,
            name: 'Andrey Sagal'
        },
        {
            id: 4,
            positionId: 4,
            name: 'Nikita Govorunov'
        },
        {
            id: 5,
            positionId: 1,
            name: 'Denis Sergeev'
        },
        {
            id: 6,
            positionId: 2,
            name: 'Vsevolod Kuznetsov'
        },
        {
            id: 7,
            positionId: 3,
            name: 'Danila Bagrov'
        },
        {
            id: 8,
            positionId: 4,
            name: 'Egor Gloktev'
        }
    ],
    requirements: [
        {
            id: 1,
            title: 'Java Script'
        },
        {
            id: 2,
            title: 'Java'
        },
        {
            id: 3,
            title: 'C++'
        },
        {
            id: 4,
            title: 'NodeJS'
        },
        {
            id: 5,
            title: 'VueJS'
        },
        {
            id: 6,
            title: 'React'
        },
        {
            id: 7,
            title: 'Network'
        },
        {
            id: 8,
            title: 'Blockchain'
        }
    ],
    conditions: [
        {
            id: 1,
            title: 'progress'
        },
        {
            id: 2,
            title: 'ready'
        },
        {
            id: 3,
            title: 'pause'
        },
        {
            id: 4,
            title: 'stop'
        }
    ],
    offers: [
        {
            id: 1,
            conditionId: 1,
            employerId: 1,
            name: 'NodeJS telegram bot',
            description: 'It is required to develop a telegram for a crypto-currency start-up. It must be done ' +
            'quickly, beautifully and inexpensively. With us you will receive many invaluable experiences and ' +
            'pleasant memories.',
            price: 3200,
            requirements: [
                {
                    id: 1,
                    requirementId: 1,
                },
                {
                    id: 2,
                    requirementId: 2,
                },
                {
                    id: 3,
                    requirementId: 3,
                },
                {
                    id: 4,
                    requirementId: 4,
                },
                {
                    id: 5,
                    requirementId: 5,
                }
            ],
            end: 18,
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                },
                {
                    id: 4,
                    contractorId: 4,
                    date: [
                        {
                            from: 1525522243000,
                            to: 1526213443000
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            conditionId: 2,
            employerId: 2,
            name: 'Web shop',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
            'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ' +
            'dolore eu fugiat nulla pariatur.',
            employer: 'Effective Energy LTD',
            price: 4500,
            requirements: [
                {
                    id: 1,
                    requirementId: 5,
                },
                {
                    id: 2,
                    requirementId: 6,
                },
                {
                    id: 3,
                    requirementId: 7,
                }
            ],
            end: 18,
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                },
                {
                    id: 4,
                    contractorId: 4,
                    date: [
                        {
                            from: 1525522243000,
                            to: 1526213443000
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            conditionId: 3,
            employerId: 3,
            name: 'Compressing algorithm',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain ' +
            'was born and I will give you a complete account of the system, and expound the actual teachings of ' +
            'the great explorer of the truth, the master-builder of human happiness.',
            price: 11600,
            requirements: [
                {
                    id: 1,
                    requirementId: 1,
                },
                {
                    id: 2,
                    requirementId: 3,
                },
                {
                    id: 3,
                    requirementId: 5,
                },
                {
                    id: 4,
                    requirementId: 8,
                }
            ],
            end: 18,
            contractors: [
                {
                    id: 1,
                    contractorId: 1,
                    date: [
                        {
                            from: 1524571843000,
                            to: 1524744643000
                        }
                    ]
                },
                {
                    id: 2,
                    contractorId: 2,
                    date: [
                        {
                            from: 1524644643000,
                            to: 1525119843000
                        }
                    ]
                },
                {
                    id: 3,
                    contractorId: 3,
                    date: [
                        {
                            from: 1525003843000,
                            to: 1525954243000
                        }
                    ]
                },
                {
                    id: 4,
                    contractorId: 4,
                    date: [
                        {
                            from: 1525522243000,
                            to: 1526213443000
                        }
                    ]
                }
            ]
        }
    ],
};

const actions = {};

const mutations = {};

const getters = {
    offers: state => state.offers,
    employers: state => state.employers,
    positions: state => state.positions,
    contractors: state => state.contractors,
    requirements: state => state.requirements,
    conditions: state => state.conditions

};

export default {
    state,
    mutations,
    getters,
    actions
}