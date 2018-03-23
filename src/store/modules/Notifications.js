const state = {
    isNewNotification: false,
    notifications: []
};

const mutations = {
    TOGGLE_NOTIF_BADGE(state, value) {
        state.isNewNotification = value;
    },
    ADD_NOTIFICATIONS(state, data) {
        state.notifications = data;
    }
}

export default {
    state,
    mutations
}
