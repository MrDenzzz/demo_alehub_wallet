import axios from 'axios/index';

const state = {

    //мб подгружать сразу все транзакции или только для текущего воллета, а потом по требованию, но не сохранять, а дозаписывать?

    allTransactions: [],

    transactions: [],
    transactionsUpdated: [],
    changedTransactions: false,

    transactionStatus: 'not found',
    transactionsLazyStatus: '',
    transactionsPingStatus: '',
    transactionSendStatus: '',
    initiateFilterDateStatus: '',
    allTransactionsStatus: '',

    transactionsLoader: false,

    dateFrom: 0,
    dateTo: 0,
    disabledDate: {
        to: 0
    },

    searchText: '',
};

const actions = {
    allTransactionsRequest: ({commit}, walletsAddressList) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_ALL_TRANSACTIONS');
            let host = 'http://192.168.1.47:4000/transactions/list';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: walletsAddressList,
                method: 'POST'
            }).then(resp => {
                console.log(resp.data, 'resp data all transactions');
                // commit('SUCCESS_ALL_TRANSACTIONS', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error transactions wallet address');
                commit('ERROR_ALL_TRANSACTIONS', err);
                reject(err)
            });
        });
    },
    transactionsRequest: ({commit, dispatch}, address) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_TRANSACTIONS');
            let host = `http://192.168.1.47:4000/transactions/${address}`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                if (resp.data.length > 0) {
                    commit('SUCCESS_TRANSACTIONS', resp.data);
                    commit('SUCCESS_INITIATE_FILTER_DATE');
                } else {
                    commit('ERROR_TRANSACTIONS');
                }
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error transactions wallet address');
                commit('ERROR_TRANSACTIONS', err);
                reject(err)
            });
        })
    },
    transactionsRequestLazy: ({commit, dispatch}, address) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_LAZY_TRANSACTIONS');
            let host = `http://192.168.1.47:4000/transactions/${address}`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                commit('SUCCESS_LAZY_TRANSACTIONS', resp.data);
                if (state.transactions.length !== 0) {
                    commit('SUCCESS_INITIATE_FILTER_DATE');
                }
                resolve(resp);
            }).catch(err => {
                commit('ERROR_LAZY_TRANSACTIONS', err);
                reject(err)
            });
        })
    },
    transactionsRequestPing: ({commit, dispatch}, address) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_PING_TRANSACTIONS');
            let host = `http://192.168.1.47:4000/transactions/${address}`;
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                commit('SUCCESS_PING_TRANSACTIONS', resp.data);
                resolve(resp);
            }).catch(err => {
                commit('ERROR_PING_TRANSACTIONS', err);
                reject(err)
            });
        })
    },
    refreshTransactions: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_REFRESH_TRANSACTIONS');
            commit('SUCCESS_INITIATE_FILTER_DATE');
            resolve();
        })
    },
    removeTransactions: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_REMOVE_TRANSACTIONS');
            commit('SUCCESS_RESET_TRANSACTIONS_UPDATED');
            resolve();
        });
    },
    resetTransactionsUpdated: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_RESET_TRANSACTIONS_UPDATED');
            resolve();
        })
    },
    sendCoins: ({commit, dispatch}, walletDetails) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_SEND_COINS');
            let host = `http://192.168.1.47:4000/transactions/send`;
            axios({
                url: host,
                data: walletDetails,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                console.log(resp, 'send response');
                commit('SUCCESS_SEND_COINS');

                resolve(resp);
            }).catch(err => {
                commit('ERROR_SEND_COINS', err);
                reject(err)
            });
        })
    },
    setFilterDate: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_INITIATE_FILTER_DATE');
            resolve();
        });
    },
    changeDateFrom: ({commit}, dateFrom) => {
        return new Promise((resolve) => {
            commit('SUCCESS_CHANGE_DATE_FROM', dateFrom);
            resolve();
        });
    },
    changeDateTo: ({commit}, dateTo) => {
        return new Promise((resolve) => {
            commit('SUCCESS_CHANGE_DATE_TO', dateTo);
            resolve();
        });
    },
    setDisabledDate: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_SET_DISABLED_DATE');
            resolve();
        });
    },
    setSearchText: ({commit}, searchText) => {
        return new Promise((resolve) => {
            commit('SUCCESS_SET_SEARCH_TEXT', searchText);
            resolve();
        });
    },
};

const mutations = {
    REQUEST_ALL_TRANSACTIONS: (state) => {
        state.allTransactionsStatus = 'loading';
    },
    SUCCESS_ALL_TRANSACTIONS: (state, allTransactions) => {
        state.allTransactions = allTransactions;
        state.allTransactionsStatus = 'success';
    },
    ERROR_ALL_TRANSACTIONS: (state) => {
        state.allTransactionsStatus = 'error';
    },
    REQUEST_TRANSACTIONS: (state) => {
        state.transactionStatus = 'loading';
        state.transactionsLazyStatus = 'loading';
    },
    SUCCESS_TRANSACTIONS: (state, transactions) => {
        state.transactionStatus = 'success';
        state.transactionsLazyStatus = 'success';
        state.transactions = transactions;
    },
    ERROR_TRANSACTIONS: (state, err) => {
        state.transactionStatus = 'error';
        state.transactionsLazyStatus = 'error';
    },
    REQUEST_LAZY_TRANSACTIONS: (state) => {
        state.transactionsLazyStatus = 'loading';
    },
    SUCCESS_LAZY_TRANSACTIONS: (state, transactions) => {
        state.transactions = transactions;
        state.transactionsLazyStatus = 'success';
    },
    ERROR_LAZY_TRANSACTIONS: (state) => {
        state.transactionsLazyStatus = 'error';
    },
    REQUEST_PING_TRANSACTIONS: (state) => {
        state.transactionsPingStatus = 'loading';
    },
    SUCCESS_PING_TRANSACTIONS: (state, transactionsUpdated) => {
        if (!state.transactions.equals(transactionsUpdated) && !state.transactionsUpdated.equals(transactionsUpdated)) {
            state.transactionsUpdated = transactionsUpdated;
            state.changedTransactions = true;
        }
        state.transactionsPingStatus = 'success';
    },
    ERROR_PING_TRANSACTIONS: (state) => {
        state.transactionsPingStatus = 'error';
    },
    SUCCESS_REFRESH_TRANSACTIONS: (state) => {
        state.transactions = state.transactionsUpdated;
        state.transactionsUpdated = [];
        state.changedTransactions = false;
    },
    SUCCESS_REMOVE_TRANSACTIONS: (state) => {
        state.transactions = [];
        state.transactionsUpdated = [];
    },
    SUCCESS_RESET_TRANSACTIONS_UPDATED: (state) => {
        state.transactionsUpdated = [];
    },
    SUCCESS_INITIATE_FILTER_DATE: (state) => {
        // state.dateFrom = new Date(state.transactions[0].timestamp);
        // for (let i = 0; i < state.transactions.length; i++) {
        //     if (this.dateFrom > state.transactions[i].timestamp)
        //         this.dateFrom = state.transactions[i].timestamp;
        // }

        state.dateFrom = new Date(state.transactions[state.transactions.length - 1].timestamp);
        state.dateFrom.setHours(0);
        state.dateFrom.setMinutes(0);
        state.dateFrom.setSeconds(0);
        state.dateFrom.setMilliseconds(0);

        state.dateTo = new Date();
        state.dateTo.setHours(23);
        state.dateTo.setMinutes(59);
        state.dateTo.setSeconds(59);
        state.dateTo.setMilliseconds(999);

        state.initiateFilterDateStatus = 'success';
    },
    SUCCESS_CHANGE_DATE_FROM: (state, dateFrom) => {
        state.dateFrom = dateFrom;
    },
    SUCCESS_CHANGE_DATE_TO: (state, dateTo) => {
        state.dateTo = dateTo;
    },
    SUCCESS_SET_DISABLED_DATE: (state) => {
        state.disabledDate.to = new Date(state.transactions[state.transactions.length - 1].timestamp);
        state.disabledDate.to.setHours(0);
        state.disabledDate.to.setMinutes(0);
        state.disabledDate.to.setSeconds(0);
        state.disabledDate.to.setMilliseconds(0);
    },
    SUCCESS_SET_SEARCH_TEXT: (state, searchText) => {
        state.searchText = searchText;
    },
    REQUEST_SEND_COINS(state) {
        state.transactionSendStatus = 'loading';
    },
    SUCCESS_SEND_COINS(state) {
        state.transactionSendStatus = 'success';
    },
    ERROR_SEND_COINS(state) {
        state.transactionSendStatus = 'error';
    }
};

const getters = {
    allTransactions: state => state.allTransactions,
    allTransactionsStatus: state => state.allTransactionsStatus,

    transactions: state => state.transactions,
    // dateTransactions: state => state.dateTransactions,
    transactionStatus: state => state.transactionStatus,
    transactionsLazyStatus: state => state.transactionsLazyStatus,
    initiateFilterDateStatus: state => state.initiateFilterDateStatus,
    dateFrom: state => state.dateFrom,
    dateTo: state => state.dateTo,
    disabledDate: state => state.disabledDate,
    searchText: state => state.searchText,
    changedTransactions: state => state.changedTransactions
};

export default {
    state,
    actions,
    mutations,
    getters
}
