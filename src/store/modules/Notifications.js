import axios from "axios/index";

const state = {
    isNewNotification: false,
    notifications: []
};

const actions = {
    transactionsRequestLazy: ({commit, dispatch}, address) => {

        return new Promise((resolve, reject) => {

            commit('REQUEST_LAZY_TRANSACTIONS');

            let host = `http://192.168.1.37:4000/transactions/${address}`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            })
                .then(resp => {
                    commit('SUCCESS_LAZY_TRANSACTIONS', resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit('ERROR_LAZY_TRANSACTIONS', err);
                    reject(err)
                });
        })
    },
};


const mutations = {
    TOGGLE_NOTIF_BADGE(state, value) {
        state.isNewNotification = value;
    },
    ADD_NOTIFICATIONS(state, data) {
        state.notifications = data;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
