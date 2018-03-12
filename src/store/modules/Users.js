const state = {
    testAccounts: [{
        id: 1,
        email: 'user1@alehub.io',
        password: '12345678',
        name: 'testAccount1',
        phoneNumber: 32213372352,
        balance: 6000000,
        rating: 8.9,
        wallets: [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ],
        offers: [
            {
                id: 1,
            },
            {
                id: 2,
            }
        ],
        portfolio: [
            {
                id: 3,
            },
            {
                id: 4,
            }
        ]
    }, {
        id: 2,
        email: 'user2@alehub.io',
        password: '12345678',
        name: 'testAccount2',
        phoneNumber: 19283471823,
        balance: 4000000,
        rating: 7.2,
        wallets: [
            {
                id: 4
            },
            {
                id: 5
            },
            {
                id: 6
            }
        ],
        offers: [
            {
                id: 3,
            },
            {
                id: 4,
            }
        ],
        portfolio: [
            {
                id: 1,
            },
            {
                id: 2,
            }
        ]
    }]
};

const mutations = {
    CHANGE_USER_NAME (state, data) {
        for(let i = 0; i < state.testAccounts.length; i++) {
            if (state.testAccounts[i].id === data.id)
                state.testAccounts[i].name = data.name
        }
    },
    CHANGE_USER_EMAIL (state, data) {
        for(let i = 0; i < state.testAccounts.length; i++) {
            if (state.testAccounts[i].id === data.id)
                state.testAccounts[i].email = data.email
        }
    },
    CHANGE_USER_PHONE_NUMBER (state, data) {
        for(let i = 0; i < state.testAccounts.length; i++) {
            if (state.testAccounts[i].id === data.id)
                state.testAccounts[i].phoneNumber = data.phone
        }
    }
};

const getters = {
    getUserData: state => {
        return state.testAccounts.filter(item => {
            return item.id === Number(localStorage.getItem('id'))
        })[0]
    }
};

export default {
    state,
    getters,
    mutations
}