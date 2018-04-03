import router from '../../router/index';
import moment from 'moment';
import axios from "axios/index";
import sha256 from "sha256";

const state = {
    wallets: [],
    currentWallet: null,
    currentWalletHaveTransactions: false,
    walletStatus: '',
    lazyWalletStatus: '',
    walletsPingStatus: '',
    changeWalletStatus: '',
    removeWalletStatus: '',
    getRandomSeedStatus: '',

    delWalletProperty: {
        mnemonic: '',
        isAgreed: false
    },

    changedWallets: false

};

const actions = {
    walletsRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_WALLETS');
            let host = 'http://192.168.1.47:4000/users/user-wallets';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                console.log(resp, 'resp from wallets request');
                commit('SUCCESS_WALLETS', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'err from wallets request');
                commit('ERROR_WALLETS', err);
                reject(err)
            });
        })
    },
    walletsRequestLazy: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_LAZY_WALLETS');
            let host = 'http://192.168.1.47:4000/users/user-wallets';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                commit('SUCCESS_LAZY_WALLETS', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error wallets lazy request');
                commit('ERROR_LAZY_WALLETS', err);
                reject(err)
            });
        })
    },
    walletsRequestPing: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_PING_WALLETS');
            let host = 'http://192.168.1.47:4000/users/user-wallets';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                commit('SUCCESS_PING_WALLETS', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error wallets lazy request');
                commit('ERROR_PING_WALLETS', err);
                reject(err)
            });
        })
    },
    resetChangedWallets: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_RESET_CHANGED_WALLETS');
            resolve();
        });
    },
    newWallet: ({commit, dispatch}, wallet) => {
        return new Promise((resolve, reject) => {
            let host = 'http://192.168.1.47:4000/wallet/new';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: wallet,
                method: 'POST'
            }).then(resp => {
                commit('SUCCESS_NEW_WALLET', resp.data.walletModel);
                resolve(resp);
            }).catch(err => {
                commit('ERROR_AUTH', err);
                reject(err)
            });
        })
    },
    changeCurrentWallet: ({commit}, address) => {
        return new Promise((resolve) => {
            console.log('change Current Wallet after deleting');
            commit('SUCCESS_CHANGE_CURRENT_WALLET', address);
            resolve();
        });
    },
    changeCurrentWalletName: ({commit}, dataToChangeWalletName) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_CHANGE_WALLET_NAME');

            let host = 'http://192.168.1.47:4000/wallet/rename';
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

            let host = `http://192.168.1.47:4000/wallet/${address.address}`;
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
    getRandomSeed: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_GET_RANDOM_SEED');

            let host = `http://192.168.1.47:4000/wallet/seed`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                console.log(resp, 'success get random seed');
                commit('SUCCESS_GET_RANDOM_SEED');
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error removing wallet');
                commit('ERROR_GET_RANDOM_SEED', err);
                reject(err)
            });
        });
    },
};

const mutations = {
    REQUEST_WALLETS: (state) => {
        state.walletStatus = 'loading';
    },
    SUCCESS_WALLETS: (state, wallets) => {
        if (wallets.length !== 0) {
            state.wallets = wallets;
            state.currentWallet = state.wallets[0];
            // (state.currentWallet.total_transactions > 0) ? state.currentWalletHaveTransactions = true :
            //     state.currentWalletHaveTransactions = false;
        }
        state.walletStatus = 'success';
    },
    SUCCESS_NEW_WALLET: (state, wallet) => {
        delete wallet.__v;

        state.wallets.push(wallet);
        state.currentWallet = state.wallets[state.wallets.length - 1];
    },
    ERROR_WALLETS: (state) => {
        state.walletStatus = 'error';
    },
    REQUEST_LAZY_WALLETS: (state) => {
        state.lazyWalletStatus = 'loading';
    },
    SUCCESS_LAZY_WALLETS: (state, wallets) => {
        if (wallets.length !== 0) {
            state.wallets = wallets;
        }
        state.lazyWalletStatus = 'success';
    },
    ERROR_LAZY_WALLETS: (state, err) => {
        state.lazyWalletStatus = 'error';
    },

    REQUEST_PING_WALLETS: (state) => {
        state.walletsPingStatus = 'loading';
    },
    SUCCESS_PING_WALLETS: (state, wallets) => {

        if (wallets.length !== 0 && !state.wallets.equals(wallets)) {
            state.wallets = wallets;
            state.changedWallets = true;
        }
        state.walletsPingStatus = 'success';
    },
    ERROR_PING_WALLETS: (state) => {
        state.walletsPingStatus = 'error';
    },
    SUCCESS_RESET_CHANGED_WALLETS: (state) => {
        state.changedWallets = false;
    },
    SUCCESS_CHANGE_CURRENT_WALLET: (state, address) =>{
        state.currentWallet = state.wallets.find(item => {
            return item.address === address;
        });
        (state.currentWallet.total_transactions > 0) ? state.currentWalletHaveTransactions = true :
            state.currentWalletHaveTransactions = false;
    },
    REQUEST_CHANGE_WALLET_NAME: (state) => {
        state.changeWalletStatus = 'loading';
    },
    SUCCESS_CHANGE_WALLET_NAME: (state, newWalletName) => {
        state.currentWallet.name = newWalletName;
        state.wallets.find(item => {
            return item.address === state.currentWallet.address;
        }).name = newWalletName;
        state.changeWalletStatus = 'success';
    },
    ERROR_CHANGE_WALLET_NAME: (state) => {
        state.changeWalletStatus = 'error';
    },
    REQUEST_REMOVE_WALLET: (state) => {
        state.removeWalletStatus = 'loading';
    },
    SUCCESS_REMOVE_WALLET: (state) => {
        state.removeWalletStatus = 'success';
    },
    ERROR_REMOVE_WALLET: (state) => {
        state.removeWalletStatus = 'error';
    },
    REMOVE_WALLET_FROM_WALLETS: (state, index) => {
        state.wallets.splice(index, 1);
    },
    ZEROING_OUT_CURRENT_WALLET: (state) => {
        state.currentWallet = null;
    },
    REQUEST_GET_RANDOM_SEED: (state) => {
        state.getRandomSeedStatus = 'loading';
    },
    SUCCESS_GET_RANDOM_SEED: (state) => {
        state.getRandomSeedStatus = 'success';
    },
    ERROR_GET_RANDOM_SEED: (state) => {
        state.getRandomSeedStatus = 'error';
    },
};

const getters = {
    wallets: state => state.wallets,
    lengthWalletList: state => state.wallets.length,
    walletStatus: state => state.walletStatus,
    currentWallet: state => state.currentWallet,
    currentWalletAddress: state => state.currentWallet.address,
    currentWalletHaveTransactions: state => state.currentWalletHaveTransactions,
    currentWalletIndex: state => {
        return state.wallets.findIndex(item => {
            return item.address === state.currentWallet.address;
        });
    },
    currentWalletBalance: state => {
        if (state.currentWallet)
            return state.currentWallet.balance;

        return 0;
    },
    changedWallets: state => state.changedWallets,
};

export default {
    state,
    actions,
    getters,
    mutations
};
