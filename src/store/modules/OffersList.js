import axios from 'axios';

const state = {
    contractors: [
        {
            id: 1,
            initials: 'VD',
            name: 'Vova Dmitrov',
            src: '../../static/img/logo/telegram.png',
            position: 'TS execution',
            rating: 8.1,
            sinceDate: 1487967146000,
            webAddress: '',
            githubAddress: '',
            countOfProject: 1328,
            avgCostPerProject: 7500,
            type: 'TS', //rename to ts
            keys: [
                '../../static/img/keys/ts-key.svg'
            ]
        },
        {
            id: 2,
            initials: 'DV',
            name: 'Deus Virus',
            src: '../../static/img/logo/ubuntu.png',
            position: 'Executor',
            rating: 9.2,
            sinceDate: 1487927146000,
            webAddress: '',
            githubAddress: '',
            countOfProject: 5748,
            avgCostPerProject: 4000,
            type: 'TS execution', //rename to ts-ex
            keys: [
                '../../static/img/keys/ts-exec-key.svg'
            ]
        },
        {
            id: 3,
            initials: 'NG',
            name: 'Nicola Glumac',
            src: false,
            type: 'Check', //rename to ch
            keys: [
                '../../static/img/keys/check-key.svg',
                '../../static/img/keys/check-key.svg'
            ]
        },
        {
            id: 4,
            initials: 'RC',
            name: 'Rift & Co',
            src: '../../static/img/logo/ubuntu.png',
            type: 'Quality Assurance', //rename to qa
            keys: [
                '../../static/img/keys/qa-key.svg',
                '../../static/img/keys/qa-key.svg'
            ]
        },
        {
            id: 5,
            initials: 'QB',
            name: 'Quality Boy',
            src: '../../static/img/logo/ubuntu.png',
            type: 'TS',
            keys: [
                '../../static/img/keys/ts-key.svg'
            ]
        },
        {
            id: 6,
            initials: 'GA',
            name: 'Galvadon',
            src: '../../static/img/logo/ubuntu.png',
            type: 'TS execution',
            keys: [
                '../../static/img/keys/ts-exec-key.svg'
            ]
        },
    ],

    offers: [
        {
            id: 1,
            contractorsId: [1, 2, 3, 4],
            title: 'CryptoStore',
            company: 'Serokell',
            to: '/offer',
            startDate: 1517495409000,
            finalDate: 1543588209000,
            status: 'completed',
            projectLogo: '../../static/img/react.svg',
            steps: 10,
            contractors: [
                {
                    id: 1,
                    initials: 'VD',
                    name: 'Vova Dmitrov',
                    src: '../../static/img/logo/telegram.png',
                    position: 'TS execution',
                    rating: 8.1,
                    sinceDate: 1487967146000,
                    webAddress: '',
                    githubAddress: '',
                    countOfProject: 1328,
                    avgCostPerProject: 7500,
                    type: 'TS',
                    keys: [
                        '../../static/img/keys/ts-key.svg'
                    ]
                },
                {
                    id: 2,
                    initials: 'DV',
                    name: 'Deus Virus',
                    src: '../../static/img/logo/ubuntu.png',
                    position: 'Executor',
                    rating: 9.2,
                    sinceDate: 1487927146000,
                    webAddress: '',
                    githubAddress: '',
                    countOfProject: 5748,
                    avgCostPerProject: 4000,
                    type: 'TS execution',
                    keys: [
                        '../../static/img/keys/ts-exec-key.svg'
                    ]
                },
                {
                    id: 3,
                    initials: 'NG',
                    name: 'Nicola Glumac',
                    src: false,
                    type: 'Check',
                    keys: [
                        '../../static/img/keys/check-key.svg',
                        '../../static/img/keys/check-key.svg'
                    ]
                },
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance',
                    keys: [
                        '../../static/img/keys/qa-key.svg',
                        '../../static/img/keys/qa-key.svg'
                    ]
                }
            ]
        },
        {
            id: 2,
            contractorsId: [5, 6, 4],
            title: 'Alehub',
            company: 'Effective Energy',
            to: '/offer',
            startDate: 1523370609000,
            finalDate: 1543588209000,
            status: 'ongoing',
            steps: 8,
            contractors: [
                {
                    id: 5,
                    initials: 'QB',
                    name: 'Quality Boy',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'TS',
                    keys: [
                        '../../static/img/keys/ts-key.svg'
                    ]
                },
                {
                    id: 6,
                    initials: 'GA',
                    name: 'Galvadon',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'TS execution',
                    keys: [
                        '../../static/img/keys/ts-exec-key.svg'
                    ]
                },
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance',
                    keys: [
                        '../../static/img/keys/qa-key.svg'
                    ]
                }
            ]
        },
        {
            id: 3,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'canceled',
            projectLogo: '../../static/img/ale-logo.svg',
            steps: 1,
            contractors: [
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance'
                }
            ]
        },
        {
            id: 4,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'timelag',
            projectLogo: '../../static/img/ale-logo.svg',
            steps: 1,
            contractors: [
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance'
                }
            ]
        },
        {
            id: 5,
            contractorsId: [1, 2, 3, 4],
            title: 'CryptoStore',
            company: 'Serokell',
            to: '/offer',
            startDate: 1517495409000,
            finalDate: 1543588209000,
            status: 'completed',
            projectLogo: '../../static/img/ale-logo.svg',
            steps: 10,
            contractors: [
                {
                    id: 1,
                    initials: 'VD',
                    name: 'Vova Dmitrov',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'TS',
                    keys: [
                        '../../static/img/keys/ts-key.svg'
                    ]
                },
                {
                    id: 2,
                    initials: 'DV',
                    name: 'Deus Virus',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'TS execution',
                    keys: [
                        '../../static/img/keys/ts-exec-key.svg'
                    ]
                },
                {
                    id: 3,
                    initials: 'NG',
                    name: 'Nicola Glumac',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Check',
                    keys: [
                        '../../static/img/keys/check-key.svg',
                        '../../static/img/keys/check-key.svg'
                    ]
                },
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance',
                    keys: [
                        '../../static/img/keys/qa-key.svg',
                        '../../static/img/keys/qa-key.svg'
                    ]
                }
            ]
        },
        {
            id: 6,
            contractorsId: [5, 6, 4],
            title: 'Alehub',
            company: 'Effective Energy',
            to: '/offer',
            startDate: 1523370609000,
            finalDate: 1543588209000,
            status: 'ongoing',
            steps: 8,
            contractors: [
                {
                    id: 5,
                    initials: 'QB',
                    name: 'Quality Boy',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'TS',
                    keys: [
                        '../../static/img/keys/ts-key.svg'
                    ]
                },
                {
                    id: 6,
                    initials: 'GA',
                    name: 'Galvadon',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'TS execution',
                    keys: [
                        '../../static/img/keys/ts-exec-key.svg'
                    ]
                },
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance',
                    keys: [
                        '../../static/img/keys/qa-key.svg'
                    ]
                }
            ]
        },
        {
            id: 7,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'canceled',
            projectLogo: '../../static/img/ale-logo.svg',
            steps: 1,
            contractors: [
                {
                    id: 4,
                    initials: 'RC',
                    name: 'Rift & Co',
                    src: '../../static/img/logo/ubuntu.png',
                    type: 'Quality Assurance'
                }
            ]
        }
    ],

    filtersCondition: [
        {
            id: 'ts',
            title: 'TS',
            opened: false,
            folded: false,
            queue: 0
        },
        {
            id: 'ts-ex',
            title: 'EX',
            opened: false,
            folded: false,
            queue: 0
        },
        {
            id: 'ch',
            title: 'CH',
            opened: false,
            folded: false,
            queue: 0
        },
        {
            id: 'qa',
            title: 'QA',
            opened: false,
            folded: false,
            queue: 0
        }
    ],

    selectedContractor: {
        initials: 'JD',
        name: 'John Doe',
        src: false,
        position: false,
        rating: false,
        sinceDate: false,
        webAddress: false,
        githubAddress: false,
        countOfProject: 0,
        avgCostPerProject: 0,
        type: false,
        keys: []
    }
};

const actions = {
    selectContractor: ({commit}, contractor) => {
        return new Promise((resolve) => {
            commit('SUCCESS_SELECT_CONTRACTOR', contractor);
            resolve('success select contractor');
        });
    },
    changeFiltersCondition: ({commit}, filters) => {
        return new Promise((resolve) => {
            commit('SUCCESS_CHANGE_FILTERS_CONDITION', filters);
            resolve('success change filters condition');
        });
    },
};

const mutations = {
    SUCCESS_SELECT_CONTRACTOR: (state, contractor) => {
        state.selectedContractor = contractor;
    },
    SUCCESS_CHANGE_FILTERS_CONDITION: (state, filters) => {
        state.filtersCondition = filters;
    },
};

const getters = {
    selectedContractor: state => state.selectedContractor,
    offers: state => state.offers,
    contractors: state => state.contractors,
    filtersCondition: state => state.filtersCondition
};

export default {
    state,
    mutations,
    getters,
    actions
}