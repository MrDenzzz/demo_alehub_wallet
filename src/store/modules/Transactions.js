import axios from "axios/index";

const state = {
    transactions: [],

    walletTransactions: [],

    tmpTransactions: [],
    chunkTransactions: [],
    dateFrom: 0,
    dateTo: 0,
    activeFilter: 0,
    searchText: '',
    hideFilter: false,


    transactionStatus: 'not found',


    lazyTransactionsStatus: '',

    transactionsLoader: false
};

const actions = {
    transactionsRequest: ({commit, dispatch}, address) => {
        return new Promise((resolve, reject) => {
            // if (address === '') return false;
            commit('TRANSACTIONS_REQUEST');
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
                    // console.log(resp.data, 'transactions');
                    commit('SET_TRANSACTIONS', resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit('TRANSACTIONS_ERROR', err);
                    reject(err)
                });
        })
    },
    transactionsRequestLazy: ({commit, dispatch}, address) => {

        return new Promise((resolve, reject) => {
            // if (address === '') return false;

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
                    // console.log(resp.data, 'transactions');
                    commit('SET_LAZY_TRANSACTIONS', resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit('ERROR_LAZY_TRANSACTIONS', err);
                    reject(err)
                });
        })
    },
    walletTransactions: ({commit, dispatch}, address) => {

        commit('REQUEST_WALLET_TRANSACTIONS');

        commit('SET_WALLET_TRANSACTIONS', address);

        // commit('ERR_WALLET_TRANSACTIONS');
    },
};

const mutations = {
    TRANSACTIONS_REQUEST(state) {
        state.transactionStatus = 'loading';
    },
    SET_TRANSACTIONS(state, transactions) {
        state.transactionStatus = 'success';
        state.transactions = transactions;
    },
    TRANSACTIONS_ERROR(state, err) {
        state.transactionStatus = 'error';
    },


    REQUEST_LAZY_TRANSACTIONS(state) {
        state.lazyTransactionsStatus = 'loading';
    },
    SET_LAZY_TRANSACTIONS(state, transactions) {
        state.lazyTransactionsStatus = 'success';
        state.transactions = transactions;
    },
    ERROR_LAZY_TRANSACTIONS(state, err) {
        state.lazyTransactionsStatus = 'error';
    },

    REQUEST_WALLET_TRANSACTIONS(state) {

    },
    SET_WALLET_TRANSACTIONS(state, address) {
        state.walletTransactions = state.transactions.filter(item => {
            return item._id === address;
        });
    },



    CHANGE_ACTIVE_FILTER(state, index) {
        state.activeFilter = index;
    },
    CHANGE_FILTER_TEXT(state, searchText) {
        state.searchText = searchText;
    },
    SET_NOTIFICATION_FOR_SEND(state, data) {
        state.transactions.push({
            id: state.transactions.length + 1,
            walletId: data.walletId,
            type: 'sent',
            to: data.address,
            date: new Date(),
            total: '-' + data.sendedBalance,
            result: data.result,
            isActive: false
        });
    },
    REMOVE_TRANSACTIONS(state, transactionsId) {
        for (let i = 0; i < transactionsId.length; i++) {
            let rmTransactionsInd = state.transactions.findIndex(item => {
                return parseInt(item.id) === parseInt(transactionsId[i].id);
            });
            state.transactions.splice(rmTransactionsInd, 1);
        }
    },
    SET_HIDE_FILTER(state, prop) {
        state.hideFilter = prop;
    },
    SET_DATE_FROM(state, from) {
        state.dateFrom = from;
    },
    SET_DATE_TO(state, to) {
        state.dateTo = to;
    },
    SET_CHUNK_TRANSACTIONS(state, transactions) {
        state.chunkTransactions = transactions;
    },
    ADD_NEW_TRANSACTION(state, transactions) {
        state.transactions = transactions;
    },
    CHANGE_TRANSACTION_LOADER_STATE(state, loaderState) {
        state.transactionsLoader = loaderState;
    }
};

const getters = {

    transactions: state => state.transactions,

    walletTransactions: state => state.walletTransactions,

    transactionsFilter: state => {
        if (state.activeFilter === 0) {
            return state.transactions;
        }
        if (state.activeFilter === 1) return state.transactions.filter(item => {
            return item.type == 'received' || item.type == 'bought'
        });
        if (state.activeFilter === 2) return state.transactions.filter(item => {
            return item.type == 'sold' || item.type == 'sent'
        });
    },


    transactionStatus: state => state.transactionStatus,
};

export default {
    state,
    actions,
    mutations,
    getters
}
