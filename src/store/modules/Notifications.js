import axios from "axios/index";

const state = {
    getNotificationsStatus: '',
    isNewNotification: false,
    notifications: []
};

const actions = {
    getNotifications: ({commit}) => {
        return new Promise((resolve, reject) => {

            commit('REQUEST_GET_NOTIFICATIONS');

            let host = `https://ale-demo-4550.nodechef.com/notifications`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                commit('SUCCESS_GET_NOTIFICATIONS', resp.data);
                resolve(resp);
            }).catch(err => {
                commit('ERROR_GET_NOTIFICATIONS', err);
                reject(err)
            });
        })
    },
    toggleNotificationBadge: ({commit}, value) => {
        return new Promise((resolve, reject) => {
            commit('SUCCESS_TOGGLE_NOTIFICATION', value);
            resolve(value);
        });
    },
    deleteNotifications: ({commit, dispatch}, notifArray) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_GET_NOTIFICATIONS');
            let host = `https://ale-demo-4550.nodechef.com/notifications/list`;
            axios({
                url: host,
                data: {list: notifArray},
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'DELETE'
            }).then(resp => {
                dispatch('getNotifications');
                resolve(resp);
            }).catch(err => {
                commit('ERROR_GET_NOTIFICATIONS', err);
                reject(err)
            });
        })
    }
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
    SUCCESS_TOGGLE_NOTIFICATION(state, value) {
        state.isNewNotification = value;
    }
};

const getters = {
    notifications: state => state.notifications.reverse()
};

export default {
    state,
    actions,
    mutations,
    getters
}
