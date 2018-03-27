import router from '../../router/index';
import moment from 'moment';
import axios from "axios/index";
import sha256 from "sha256";

const state = {
    wallets: [],
    walletStatus: 'not found',

    lazyWalletStatus: '',
    changeWalletStatus: '',

    currentWallet: null,

    removeWalletStatus: '',

    delWalletProperty: {
        mnemonic: '',
        isAgreed: false
    }
};

const actions = {
    walletsRequest: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('WALLETS_REQUEST');
            let host = 'http://192.168.1.37:4000/users/user-wallets';
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
                    console.log(resp, 'resp from wallets request');
                    commit('SET_WALLETS', resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit('WALLETS_ERROR', err);
                    console.log(err, 'err from wallets request');
                    // commit('AUTH_ERROR', err);

                    // localStorage.removeItem(sha256('user-token'));
                    // delete axios.defaults.headers.common['Login'];
                    reject(err)
                });
        })
    },
    walletsRequestLazy: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_LAZY_WALLETS');
            let host = 'http://192.168.1.37:4000/users/user-wallets';
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
                    // console.log(resp.data, 'wallets request lazy');
                    commit('SET_LAZY_WALLETS', resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err, 'error wallets lazy request');
                    commit('ERROR_LAZY_WALLETS', err);
                    reject(err)
                });
        })
    },
    newWallet: ({commit, dispatch}, wallet) => {
        return new Promise((resolve, reject) => {
            // commit('AUTH_REQUEST');
            let host = 'http://192.168.1.37:4000/wallet/new';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: wallet,
                method: 'POST'
            })
                .then(resp => {
                    commit('ADD_WALLET', resp.data.walletModel);
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);
                    reject(err)
                });
        })
    },
    changeCurrentWallet: ({commit}, address) => {
        return new Promise((resolve) => {
            commit('CHANGE_CURRENT_WALLET', address);
            resolve();
        });
    },
    changeCurrentWalletName: ({commit}, dataToChangeWalletName) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_CHANGE_WALLET_NAME');

            let host = 'http://192.168.1.37:4000/wallet/rename';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: dataToChangeWalletName,
                method: 'POST'
            }).then(resp => {
                commit('SUCCESS_CHANGE_WALLET_NAME', dataToChangeWalletName.newWalletName);
                resolve(resp);
            }).catch(err => {
                commit('ERROR_CHANGE_WALLET_NAME', err);
                reject(err)
            });
        });
    },
    removeWallet: ({commit}, address) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_REMOVE_WALLET');

            let host = `http://192.168.1.37:4000/wallet/${address.address}`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'DELETE'
            }).then(resp => {
                console.log(resp, 'success removing wallet');
                commit('SUCCESS_REMOVE_WALLET');
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error removing wallet');
                commit('ERROR_REMOVE_WALLET', err);
                reject(err)
            });
        });
    },
    removeWalletFromWallets: ({commit}, index) => {
        return new Promise((resolve) => {
            commit('REMOVE_WALLET_FROM_WALLETS', index);
            resolve();
        });
    },
    zeroingOutCurrentWallet: ({commit}) => {
        return new Promise((resolve) => {
            commit('ZEROING_OUT_CURRENT_WALLET');
            resolve();
        });
    },
};

const mutations = {
    WALLETS_REQUEST(state) {
        state.walletStatus = 'loading';
    },
    SET_WALLETS(state, wallets) {
        if (wallets.length !== 0) {
            state.wallets = wallets;
            state.currentWallet = state.wallets[0];
        }
        state.walletStatus = 'success';
    },
    ADD_WALLET(state, wallet) {
        state.wallets.push(wallet);
        state.currentWallet = state.wallets[state.wallets.length - 1];
    },
    WALLETS_ERROR(state) {
        state.walletStatus = 'error';
    },


    REQUEST_LAZY_WALLETS(state) {
        state.lazyWalletStatus = 'loading';
    },
    SET_LAZY_WALLETS(state, wallets) {
        if (wallets.length !== 0) {
            state.wallets = wallets;
            state.currentWallet = state.wallets[0];
        }
        state.lazyWalletStatus = 'success';
    },
    ERROR_LAZY_WALLETS(state, err) {
        state.lazyWalletStatus = 'error';
    },


    CHANGE_CURRENT_WALLET(state, address) {
        state.currentWallet = state.wallets.find(item => {
            return item.address === address;
        })
    },

    REQUEST_CHANGE_WALLET_NAME(state) {
        state.changeWalletStatus = 'loading';
    },
    SUCCESS_CHANGE_WALLET_NAME(state, newWalletName) {
        state.currentWallet.name = newWalletName;
        state.wallets.find(item => {
            return item.address === state.currentWallet.address;
        }).name = newWalletName;
        state.changeWalletStatus = 'loading';
    },
    ERROR_CHANGE_WALLET_NAME(state) {
        state.changeWalletStatus = 'error';
    },

    REQUEST_REMOVE_WALLET(state) {
        state.removeWalletStatus = 'loading';
    },
    SUCCESS_REMOVE_WALLET(state) {
        state.removeWalletStatus = 'success';
    },
    ERROR_REMOVE_WALLET(state) {
        state.removeWalletStatus = 'error';
    },

    REMOVE_WALLET_FROM_WALLETS(state, index) {
        state.wallets.splice(index, 1);
    },

    ZEROING_OUT_CURRENT_WALLET(state) {
        state.currentWallet = null;
    },


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

const getters = {
    wallets: state => state.wallets,
    lengthWalletList: state => state.wallets.length,
    walletStatus: state => state.walletStatus,
    currentWallet: state => state.currentWallet,
    currentWalletIndex: state => {
        return state.wallets.findIndex(item => {
            return item.address === state.currentWallet.address;
        });
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
