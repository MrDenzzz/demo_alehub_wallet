import router from '../../router/index';
import moment from 'moment';

const state = {
    currentWallet: null,
    selectedWallet: '',
    wallets: [
        // {
        //     address
        //         :
        //         "0x977XDRx4ZoyaJiAxNUsN4Y3mLyYBBFGkOScIas2ruuhxq"
        //     balance
        //         :
        //         100
        //     name
        //         :
        //         "123123"
        // },
        // {
        //     id: 1,
        //     ownerId: 1,
        //     name: 'wallet 1',
        //     balance: 2500,
        //     securityLevel: 'normal',
        //     address: '0x4ce9d78cf86b6ec1280d3da512c09807e6a51a4b',
        //     password: '12345678',
        //     transactions: [
        //         {
        //             id: 1
        //         },
        //         {
        //             id: 7
        //         },
        //         {
        //             id: 8
        //         },
        //         {
        //             id: 9
        //         },
        //         {
        //             id: 10
        //         },
        //         {
        //             id: 11
        //         },
        //         {
        //             id: 12
        //         },
        //         {
        //             id: 13
        //         }
        //     ],
        //     activitySummary: [{
        //         type: 'sent',
        //         to: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
        //         date: 1518734800000,  //set milliseconds
        //         total: '-2583',
        //         isActive: false
        //     }],
        //     activityPortfolio: [{
        //         type: 'apply',
        //         to: '@user123',
        //         date: 1518724800000,
        //         price: '120000',
        //         isActive: false
        //     }],
        //     offers: [
        //         {
        //             id: 1
        //         }, {
        //             id: 2
        //         }, {
        //             id: 15
        //         }
        //     ],
        //     portfolio: [
        //         {
        //             id: 3
        //         }, {
        //             id: 4
        //         }
        //     ],
        //     //подумать куда вынести, дабы отделить данные от интерфейса
        //     hideCompletePortfolio: false,
        //     hideCompleteOffers: false,
        // },
        // {
        //     id: 2,
        //     ownerId: 1,
        //     name: 'wallet 2',
        //     balance: 48000,
        //     securityLevel: 'normal',
        //     address: 'L56Srfpxha42C2f4LzqeQUubh3bQwEfDTMSwidGPEViZBU',
        //     password: '12345678',
        //     transactions: [
        //         {
        //             id: 2
        //         }
        //     ],
        //     activitySummary: [{
        //         type: 'sent',
        //         to: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
        //         date: 1518724800000,
        //         total: '-2583',
        //         isActive: false
        //     }],
        //     activityPortfolio: [{
        //         type: 'apply',
        //         to: '@user123',
        //         date: 1518724800000,
        //         price: '120000',
        //         isActive: false
        //     }],
        //     offers: [
        //         {
        //             id: 6
        //         }, {
        //             id: 10
        //         }, {
        //             id: 11
        //         }, {
        //             id: 16
        //         }
        //     ],
        //     portfolio: [],
        //     hideCompletePortfolio: false,
        //     hideCompleteOffers: false,
        // },
        // {
        //     id: 3,
        //     ownerId: 1,
        //     name: 'wallet 3',
        //     balance: 1000,
        //     securityLevel: 'normal',
        //     address: '2asdlkasdWlkdsls34kldsfsdlfsdasdc554',
        //     password: '12345678',
        //     transactions: [
        //         {
        //             id: 3
        //         }
        //     ],
        //     activitySummary: [{
        //         type: 'sent',
        //         to: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
        //         date: 1518734800000,
        //         total: '-2583',
        //         isActive: false
        //     }],
        //     activityPortfolio: [{
        //         type: 'apply',
        //         to: '@user123',
        //         date: 1518724800000,
        //         price: '120000',
        //         isActive: false
        //     }],
        //     offers: [],
        //     portfolio: [],
        //     hideCompletePortfolio: false,
        //     hideCompleteOffers: false,
        // },
        // {
        //     id: 4,
        //     ownerId: 2,
        //     name: 'wallet 4',
        //     balance: 5000,
        //     securityLevel: 'normal',
        //     address: '324lklksdmfdslk44fs098sdfsdfffdsxcvfmkl444',
        //     password: '',
        //     transactions: [
        //         {
        //             id: 4
        //         }
        //     ],
        //     activitySummary: [{
        //         type: 'sent',
        //         to: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
        //         date: 1518724800000,  //set milliseconds
        //         total: '-2583',
        //         isActive: false
        //     }],
        //     activityPortfolio: [{
        //         type: 'apply',
        //         to: '@user123',
        //         date: 1518744800000,  //set milliseconds
        //         price: '120000',
        //         isActive: false
        //     }],
        //     offers: [
        //         {
        //             id: 3
        //         }, {
        //             id: 4
        //         }, {
        //             id: 5
        //         }, {
        //             id: 17
        //         }
        //     ],
        //     portfolio: [],
        //     hideCompletePortfolio: false,
        //     hideCompleteOffers: false,
        // },
        // {
        //     id: 5,
        //     ownerId: 2,
        //     name: 'wallet 5',
        //     balance: 1400,
        //     securityLevel: 'normal',
        //     address: 'xcvsdf494fij4f984jfi4ojf4980fjlijf490fj4f9j4f',
        //     password: '',
        //     transactions: [
        //         {
        //             id: 5
        //         }
        //     ],
        //     activitySummary: [{
        //         type: 'sent',
        //         to: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
        //         date: 1518754800000,
        //         total: '-2583',
        //         isActive: false
        //     }],
        //     activityPortfolio: [{
        //         type: 'apply',
        //         to: '@user123',
        //         date: 1518724800000,
        //         price: '120000',
        //         isActive: false
        //     }],
        //     offers: [
        //         {
        //             id: 7
        //         }, {
        //             id: 14
        //         }
        //     ],
        //     portfolio: [],
        //     hideCompletePortfolio: false,
        //     hideCompleteOffers: false,
        // },
        // {
        //     id: 6,
        //     ownerId: 2,
        //     name: 'wallet 6',
        //     balance: 3000,
        //     securityLevel: 'normal',
        //     address: 'wef980ewjhf890wejfwoejf09ewujf0wejfkejwfwe9f032df3f',
        //     password: '',
        //     transactions: [
        //         {
        //             id: 6
        //         }
        //     ],
        //     activitySummary: [{
        //         type: 'sent',
        //         to: '1JmqBkdgYB1p1jJnjqX3wy7NdpsLZbmvEX',
        //         date: 1518824800000,
        //         total: '-2583',
        //         isActive: false
        //     }],
        //     activityPortfolio: [{
        //         type: 'apply',
        //         to: '@user123',
        //         date: 1518794800000,
        //         price: '120000',
        //         isActive: false
        //     }],
        //     offers: [
        //         {
        //             id: 8
        //         }, {
        //             id: 9
        //         }, {
        //             id: 12
        //         }, {
        //             id: 13
        //         }
        //     ],
        //     portfolio: [],
        //     hideCompletePortfolio: false,
        //     hideCompleteOffers: false,
        // },
    ],

    delWalletProperty: {
        mnemonic: '',
        isAgreed: false
    }
};

const mutations = {
    AGREED_DELETE(state) {
        state.delWalletProperty.isAgreed = !state.delWalletProperty.isAgreed;
        state.delWalletProperty.mnemonic = '';
    },
    CREATE_NEW_WALLET(state, payload) {
        state.wallets.push({
            address: payload.address,
            name: payload.name,
            balance: payload.balance
        });
    },
    SET_MNEMONIC_CODE(state, code) {
        state.delWalletProperty.mnemonic = code;
    },
    WALLET_REPEAT_PASSWORD(state, repeat) {
        state.newWallet.repeat = repeat;
    },
    NEW_WALLET_NAME(state, name) {
        state.newWallet.name = name;
    },
    NEW_WALLET_PASSWORD(state, password) {
        state.newWallet.password = password;
    },
    CHECKED_ACTIVITY(state, status) {
        state.newWallet.password = '';
        state.newWallet.repeat = '';
        state.newWallet.isPassword = status;
    },
    CHANGE_SELECTED_WALLET(state, index) {
        state.selectedWallet = state.walletsList[index]
    },
    CHANGE_WALLET_NAME(state, name) {
        state.currentWallet.name = name
    },
    DELETE_WALLET(state) {
        for (let i = 0; i < state.walletsList.length; i++) {
            if (parseInt(state.walletsList[i].id) === parseInt(state.selectedWallet.id)) {
                state.walletsList.splice(i, 1);
                state.selectedWallet = state.walletsList[0];
                router.push('/wallet');
            }
        }
    },
    SEND_MONEY_TO_ADDRESS(state, data) {
        for (let i = 0; i < state.wallets.length; i++) {
            if (parseInt(state.wallets[i].id) === parseInt(state.currentWallet.id)) {
                state.wallets[i].balance -= data.sendedBalance;
                state.wallets[i].activitySummary.unshift({
                    type: 'sent',
                    to: data.address,
                    date: moment(new Date()).format("MMM D"),
                    // time: moment(new Date()).format("HH:mm"),
                    total: '-' + data.sendedBalance,
                    result: state.wallets[i].balance,
                    isActive: false
                });
            }
        }
    },


    CHANGE_NEW_WALLET(state, address) {
        state.currentWallet = state.wallets.find(item => {
            return item.address === address;
        });
    },
    CREATE_NEW_NEW_WALLET(state, wallet) {
        state.wallets.push(wallet);

        state.currentWallet = state.wallets.find(item => {
            return parseInt(item.address) === parseInt(wallet.address);
        });
    },

    SET_NOTIFICATION_FOR_SEND_TO_PROFILE(state, notification) {
        for (let i = 0; i < state.wallets.length; i++) {
            if (state.wallets[i].id === notification.walletId) {
                state.wallets[i].transactions.push({id: notification.id})
            }
        }
    },

    REMOVE_WALLET(state, address) {
        let index = state.wallets.findIndex(item => {
            return item.address === address;
        });
        state.wallets.splice(index, 1);
    },

    SET_NEW_BALANCE(state, data) {
        for (let i = 0; i < state.wallets.length; i++) {
            if (state.wallets[i].address == data[i].address) {
                state.wallets[i].balance = data[i].balance;
            }
        }
    }
};

const getters = {};

export default {
    state,
    getters,
    mutations
};
