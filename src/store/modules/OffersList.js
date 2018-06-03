import axios from 'axios';

const state = {

    types: [
        {
            id: 1,
            name: 'TS',
            type: 'ts',
            priority: 1
        },
        {
            id: 2,
            name: 'TS execution',
            type: 'ts-ex',
            priority: 2
        },
        {
            id: 3,
            name: 'Check',
            type: 'ch',
            priority: 3
        },
        {
            id: 4,
            name: 'Quality Assurance',
            type: 'qa',
            priority: 4
        }
    ],

    filteredContractorsTypes: [],

    contractors: [
        {
            id: 1,
            typeId: 1,
            initials: 'VD',
            name: 'Vova Dmitrov',
            src: '../../static/img/logo/telegram.png',
            rating: 8.1,
            sinceDate: 1487967146000,
            webAddress: 'https://vova-dmitrov.ru',
            githubAddress: '/vova-dmitrov',
            countOfProject: 1328,
            avgCostPerProject: 7500,
            keys: [
                '../../static/img/keys/ts-key.svg'
            ]
        },
        {
            id: 2,
            typeId: 2,
            initials: 'DV',
            name: 'Deus Virus',
            src: '../../static/img/logo/ubuntu.png',
            rating: 9.2,
            sinceDate: 1487927146000,
            webAddress: 'https://deus-virus.com',
            githubAddress: '/deus-virus',
            countOfProject: 321,
            avgCostPerProject: 1000,
            keys: [
                '../../static/img/keys/ts-exec-key.svg'
            ]
        },
        {
            id: 3,
            typeId: 3,
            initials: 'NG',
            name: 'Nicola Glumac',
            src: false,
            rating: 9.9,
            sinceDate: 1487927146000,
            webAddress: '',
            githubAddress: '/glumac',
            countOfProject: 3,
            avgCostPerProject: 350,
            keys: [
                '../../static/img/keys/check-key.svg',
                '../../static/img/keys/check-key.svg'
            ]
        },
        {
            id: 4,
            typeId: 4,
            initials: 'RC',
            name: 'Rift & Co',
            src: '../../static/img/logo/ubuntu.png',
            rating: 7.5,
            sinceDate: 1487927146000,
            webAddress: 'https://rift.io',
            githubAddress: '/rift',
            countOfProject: 230,
            avgCostPerProject: 1010,
            keys: [
                '../../static/img/keys/qa-key.svg',
                '../../static/img/keys/qa-key.svg'
            ]
        },
        {
            id: 5,
            typeId: 1,
            initials: 'QB',
            name: 'Quality Boy',
            src: '../../static/img/logo/ubuntu.png',
            rating: 6,
            sinceDate: 1487927146000,
            webAddress: '',
            githubAddress: '',
            countOfProject: 203,
            avgCostPerProject: 506,
            keys: [
                '../../static/img/keys/ts-key.svg'
            ]
        },
        {
            id: 6,
            typeId: 2,
            initials: 'GA',
            name: 'Galvadon',
            src: '../../static/img/logo/ubuntu.png',
            rating: 6.2,
            sinceDate: 1487927146000,
            webAddress: 'https://galvadon.su',
            githubAddress: '/galvadon',
            countOfProject: 130204,
            avgCostPerProject: 1300,
            keys: [
                '../../static/img/keys/ts-exec-key.svg'
            ]
        },
    ],
    filteredOffers: [
        {
            id: 1,
            contractorsId: [1, 2, 3, 4],
            title: 'CryptoStore',
            company: 'Serokell',
            logoSrc: '../../static/img/logo/react.png',
            to: '/offer',
            startDate: 1517495409000,
            finalDate: 1543588209000,
            status: 'completed',
            steps: 10
        },
        {
            id: 2,
            contractorsId: [5, 6, 4],
            title: 'Alehub',
            company: 'Effective Energy',
            logoSrc: '../../static/img/logo/angular.png',
            to: '/offer',
            startDate: 1523370609000,
            finalDate: 1543588209000,
            status: 'ongoing',
            steps: 8
        },
        {
            id: 3,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            logoSrc: '../../static/img/logo/telegram.png',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'canceled',
            steps: 1
        },
        {
            id: 4,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            logoSrc: '../../static/img/logo/angular.png',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'timelag',
            steps: 1
        },
        {
            id: 5,
            contractorsId: [1, 2, 3, 4],
            title: 'CryptoStore',
            company: 'Serokell',
            logoSrc: '../../static/img/logo/twitter.jpg',
            to: '/offer',
            startDate: 1517495409000,
            finalDate: 1543588209000,
            status: 'completed',
            steps: 10
        },
        {
            id: 6,
            contractorsId: [5, 6, 4],
            title: 'Alehub',
            company: 'Effective Energy',
            logoSrc: '../../static/img/logo/ubuntu.png',
            to: '/offer',
            startDate: 1523370609000,
            finalDate: 1543588209000,
            status: 'ongoing',
            steps: 8
        },
        {
            id: 7,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            logoSrc: '../../static/img/logo/react.png',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'canceled',
            projectLogo: '../../static/img/ale-logo.svg',
            steps: 1,
        }
    ],
    offers: [
        {
            id: 1,
            contractorsId: [1, 2, 3, 4],
            title: 'CryptoStore',
            company: 'Serokell',
            logoSrc: '../../static/img/logo/react.png',
            to: '/offer',
            startDate: 1517495409000,
            finalDate: 1543588209000,
            status: 'completed',
            steps: 10
        },
        {
            id: 2,
            contractorsId: [5, 6, 4],
            title: 'Alehub',
            company: 'Effective Energy',
            logoSrc: '../../static/img/logo/angular.png',
            to: '/offer',
            startDate: 1523370609000,
            finalDate: 1543588209000,
            status: 'ongoing',
            steps: 8
        },
        {
            id: 3,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            logoSrc: '../../static/img/logo/telegram.png',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'canceled',
            steps: 1
        },
        {
            id: 4,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            logoSrc: '../../static/img/logo/angular.png',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'timelag',
            steps: 1
        },
        {
            id: 5,
            contractorsId: [1, 2, 3, 4],
            title: 'CryptoStore',
            company: 'Serokell',
            logoSrc: '../../static/img/logo/twitter.jpg',
            to: '/offer',
            startDate: 1517495409000,
            finalDate: 1543588209000,
            status: 'completed',
            steps: 10
        },
        {
            id: 6,
            contractorsId: [5, 6, 4],
            title: 'Alehub',
            company: 'Effective Energy',
            logoSrc: '../../static/img/logo/ubuntu.png',
            to: '/offer',
            startDate: 1523370609000,
            finalDate: 1543588209000,
            status: 'ongoing',
            steps: 8
        },
        {
            id: 7,
            contractorsId: [4],
            title: 'Virtual reality pluggin',
            company: 'Nike',
            logoSrc: '../../static/img/logo/react.png',
            to: '/offer',
            startDate: 1525185009000,
            finalDate: 1525703409000,
            status: 'canceled',
            projectLogo: '../../static/img/ale-logo.svg',
            steps: 1,
        }
    ],

    filtersCondition: [
        {
            id: 1,
            typeId: 1,
            title: 'TS',
            opened: false,
            folded: false,
            queue: 0
        },
        {
            id: 2,
            typeId: 2,
            title: 'EX',
            opened: false,
            folded: false,
            queue: 0
        },
        {
            id: 3,
            typeId: 3,
            title: 'CH',
            opened: false,
            folded: false,
            queue: 0
        },
        {
            id: 4,
            typeId: 4,
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
    makeFilterOfContractorType: ({commit}, contractorId) => {
        return new Promise((resolve) => {
            console.log(contractorId, 'id do filter of');
            commit('SUCCESS_MAKE_FILTER_OF_CONTRACTOR_TYPE', contractorId);
            // commit('SUCCESS_CHANGE_FILTERS_CONDITION', filters);
            // resolve('success change filters condition');
        });
    },
    cancelFilterOfContractorType: ({commit}, contractorId) => {
        return new Promise((resolve) => {
            console.log(contractorId, 'id cancel filter of');
            commit('SUCCESS_CANCEL_FILTER_OF_CONTRACTOR_TYPE', contractorId);
            // commit('SUCCESS_CHANGE_FILTERS_CONDITION', filters);
            // resolve('success change filters condition');
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
    SUCCESS_MAKE_FILTER_OF_CONTRACTOR_TYPE: (state, contractorId) => {
        let selectedContractors = state.contractors.filter(contractor => contractor.typeId === contractorId);

        if (!state.filteredContractorsTypes.find(type => type === contractorId))
            state.filteredContractorsTypes.push(contractorId);

        state.filteredOffers = state.filteredOffers.filter((offer, i, arr) => {
            return offer.contractorsId.find(id => {
                return selectedContractors.find(selectedContractor => {
                    return selectedContractor.id === id;
                });
            });
        });

        console.log(state.filteredOffers, 'state.filteredOffers');
        console.log(selectedContractors, 'selectedContractors');
    },
    SUCCESS_CANCEL_FILTER_OF_CONTRACTOR_TYPE: (state, contractorId) => {

    },
};

const getters = {
    types: state => state.types,
    selectedContractor: state => state.selectedContractor,
    offers: state => state.offers,
    contractors: state => state.contractors,
    /**
     * return sort array of contractors
     *
     * @param state
     * @returns {Array}
     */
    offerContractors: state => {
        let contractors = [];

        state.offers.forEach((offer, i) => {
            contractors.push([]);

            offer.contractorsId.sort((a, b) => {
                let first = state.contractors.find(item => item.id === a),
                    sec = state.contractors.find(item => item.id === b);

                let firstType = state.types.find(type => {
                        return type.id === first.typeId;
                    }),
                    secType = state.types.find(type => {
                        return type.id === sec.typeId;
                    });

                if (firstType.priority > secType.priority)
                    return 1;
                if (firstType.priority < secType.priority)
                    return -1;
            });

            offer.contractorsId.forEach(contractorId => {
                contractors[i].push(state.contractors.find(contractor => contractor.id === contractorId));
            });
        });

        return contractors;
    },
    filteredOffers: state => state.filteredOffers,
    /**
     * return sort array of contractors from filtered offers list
     *
     * @param state
     * @returns {Array}
     */
    filteredOfferContractors: state => {
        let contractors = [];

        state.filteredOffers.forEach((offer, i) => {
            contractors.push([]);

            offer.contractorsId.sort((a, b) => {
                let first = state.contractors.find(item => item.id === a),
                    sec = state.contractors.find(item => item.id === b);

                let firstType = state.types.find(type => {
                        return type.id === first.typeId;
                    }),
                    secType = state.types.find(type => {
                        return type.id === sec.typeId;
                    });

                if (firstType.priority > secType.priority)
                    return 1;
                if (firstType.priority < secType.priority)
                    return -1;
            });

            offer.contractorsId.forEach(contractorId => {
                contractors[i].push(state.contractors.find(contractor => contractor.id === contractorId));
            });
        });

        return contractors;
    },
    filtersCondition: state => state.filtersCondition,
    filteredContractorsTypes: state => state.filteredContractorsTypes
};

export default {
    state,
    mutations,
    getters,
    actions
}