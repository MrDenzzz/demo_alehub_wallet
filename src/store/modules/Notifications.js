const state = {
    isNewNotification: false,
    notifications: [{
        status: 'new',
        isDeleted: true,
        isSubtitle: true,
        date: 1517123410000,
        title: '**Haskell telegram bot** task you are working on were edited by employer <span class="deleted">deleted</span>',
        subTitle: 'Description',
        changes: [{
            status: 'old',
            text: 'We are looking for _a talented_ developer to write functional and working bot for Telegram messenger.'
        }, {
            status: 'updated',
            text: 'We are looking for _an amazing_ developer to write functional and working bot for Telegram messenger.'
        }]
      }, {
        status: 'old',
        isDeleted: true,
        isSubtitle: false,
        date: 1517037010000,
        title: '**Create mobile crypto wallet for ALC** task your saved were <span class="deleted">deleted</span>'
      }, {
        status: 'old',
        isDeleted: false,
        isSubtitle: true,
        date: 1516950610000,
        title: '**Haskell telegram bot** task you are <span class="accepted">accepted</span> working on were edited by employer',
        subTitle: 'Price',
        changes: [{
            status: 'old',
            text: '_3,000_ ALC'
        }, {
            status: 'updated',
            text: '_3,200_ ALC'
        }]
      }]
};

const mutations = {
    ADD_NEW_NOTIFICATION(state, data) {
        state.notifications.unshift(data)
    },
    TOGGLE_NOTIF_BADGE(state, value) {
        state.isNewNotification = value;
    },
    RESET_NOTIFICATION(state) {
        state.notifications = [];
    }
}

export default {
    state,
    mutations
}
