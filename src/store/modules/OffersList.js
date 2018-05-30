import axios from 'axios';

const state = {
    offers: [
        {
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
                    type: 'TS execution',
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
};

const mutations = {
    SUCCESS_SELECT_CONTRACTOR: (state, contractor) => {
        state.selectedContractor = contractor;
    }
};

const getters = {
    selectedContractor: state => state.selectedContractor,
    offers: state => state.offers
};

export default {
    state,
    mutations,
    getters,
    actions
}