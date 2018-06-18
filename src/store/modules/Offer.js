const state = {
    offerName: '',
    description: '',
    projectName: '',
    startDate: '',
    finalDate: '',
    skills: '',
    price: ''
};

const actions = {
    createNewOffer: ({commit}, newOffer) => {
        commit('CREATE_NEW_OFFER', newOffer);
    },
    changeOfferName: ({commit}, e) => {
        commit('CHANGE_OFFER_NAME', e.target.value);
    },
    changeDescription: ({commit}, e) => {
        commit('CHANGE_DESCRIPTION', e.target.value);
    },
    changeProjectName: ({commit}, e) => {
        commit('CHANGE_PROJECT_NAME', e.target.value);
    },
    changeStartDate: ({commit}, e) => {
        commit('CHANGE_STARTDATE', e.target.value);
    },
    changeFinalDate: ({commit}, e) => {
        commit('CHANGE_FINALDATE', e.target.value);
    },
    changeSkills: ({commit}, e) => {
        commit('CHANGE_SKILLS', e.target.value);
    },
    changePrice: ({commit}, e) => {
        commit('CHANGE_PRICE', e.target.value);
    },
};

const mutations = {
    CREATE_NEW_OFFER: (state, newOffer) => {
        state.offerName = newOffer.name;
        state.description = newOffer.description;
        state.projectName = newOffer.projectName;
        state.startDate = newOffer.startDate;
        state.finalDate = newOffer.finalDate;
        state.skills = newOffer.skills;
        state.price = newOffer.price;
    },
    CHANGE_OFFER_NAME: (state, offerName) => {
        state.offerName = offerName;
    },
    CHANGE_DESCRIPTION: (state, description) => {
        state.description = description;
    },
    CHANGE_PROJECT_NAME: (state, projectName) => {
        state.projectName = projectName;
    },
    CHANGE_STARTDATE: (state, startDate) => {
        state.startDate = startDate;
    },
    CHANGE_FINALDATE: (state, finalDate) => {
        state.finalDate = finalDate;
    },
    CHANGE_SKILLS: (state, skills) => {
        state.skills = skills;
    },
    CHANGE_PRICE: (state, price) => {
        state.price = price;
    },
};

const getters = {
    offerName: state => state.offerName,
    description: state => state.description,
    projectName: state => state.projectName,
    startDate: state => state.startDate,
    finalDate: state => state.finalDate,
    skills: state => state.skills,
    price: state => state.price
};

export default {
    state,
    mutations,
    getters,
    actions
}