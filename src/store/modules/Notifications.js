import axios from "axios/index";

const state = {
    getNotificationsStatus: '',
    isNewNotification: false,
    notifications: []
};

const actions = {
    getNotifications: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {

            commit('REQUEST_GET_NOTIFICATIONS');

            let host = `http://192.168.1.37:4000/notifications`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {

                console.log(resp, 'respNotifications sssssssssssssssss');

                // if (resp.body.length > 0) {
                commit('SUCCESS_GET_NOTIFICATIONS', resp.data);
                // }
                resolve(resp);
            }).catch(err => {
                commit('ERROR_GET_NOTIFICATIONS', err);
                reject(err)
            });
        })
    },
};

const mutations = {
    REQUEST_GET_NOTIFICATIONS(state) {
        state.getNotificationsStatus = 'loading';
    },
    SUCCESS_GET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications;
        state.getNotificationsStatus = 'success';
    },
    ERROR_GET_NOTIFICATIONS(state) {
        state.getNotificationsStatus = 'error';
    },
    TOGGLE_NOTIF_BADGE(state, value) {
        state.isNewNotification = value;
    }
};

const getters = {
    notifications: state => state.notifications
};

export default {
    state,
    actions,
    mutations,
    getters
}
