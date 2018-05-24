import axios from 'axios';

const state = {
    contractors: [

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
            resolve(resolve);
        });
    },
};

const mutations = {
    SUCCESS_SELECT_CONTRACTOR: (state, contractor) => {
        state.selectedContractor = contractor;
    }
};

const getters = {
    selectedContractor: state => state.selectedContractor
};

export default {
    state,
    mutations,
    getters,
    actions
}