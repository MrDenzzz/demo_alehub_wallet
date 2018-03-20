import axios from "axios/index";

const state = {
    transactions: [
        // {
        //     id: 1,
        //     walletAddress: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     walletDestination: 'C5irZXQWS6W4uSHpyxbW3Q5BkcQXMs',
        //     count: 1000,
        //     date: 1517617218000,
        //     balanceInfo: {
        //         before: 0,
        //         after: 1000,
        //     }
        // },
        // {
        //     id: 1,
        //     walletId: 1,
        //     type: 'sent',
        //     to: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517617218000,
        //     total: -1000,
        //     // result: 9945356,
        //     isActive: false
        // }, {
        //     id: 2,
        //     walletId: 2,
        //     type: 'received',
        //     from: 'jF2XDoOs3mTTTWc2Ivxje7FrxpMpIh',
        //     date: 1517616218000,
        //     total: 50000,
        //     // result: 500000,
        //     isActive: false
        // }, {
        //     id: 3,
        //     walletId: 3,
        //     type: 'received',
        //     from: 'C5irZXQWS6W4uSHpyxbW3Q5BkcQXMs',
        //     date: 1517615218000,
        //     total: 1000,
        //     // result: 600600,
        //     isActive: false
        // },
        // {
        //     id: 4,
        //     walletId: 4,
        //     type: 'sent',
        //     from: 'gHVLuTRxyKYRZzXal2mK7R2ZB03CKm',
        //     date: 1517644218000,
        //     total: 5000,
        //     // result: 99000000,
        //     isActive: false
        // }, {
        //     id: 5,
        //     walletId: 5,
        //     type: 'received',
        //     from: 'AK3kw42y0RFVpHLTmWEmIlkZ25z9OC',
        //     date: 1517613218000,
        //     total: 1400,
        //     // result: 12500,
        //     isActive: false
        // }, {
        //     id: 6,
        //     walletId: 6,
        //     type: 'received',
        //     from: '5VnFZ25AsUoEW0GhBmh6ndmW7qhi0p',
        //     date: 1517612218000,
        //     total: 3000,
        //     // result: 900000,
        //     isActive: false
        // }, {
        //     id: 7,
        //     walletId: 1,
        //     type: 'received',
        //     from: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517659218000,
        //     total: 500,
        //     // result: 9945791,
        //     isActive: false
        // }, {
        //     id: 8,
        //     walletId: 1,
        //     type: 'sent',
        //     to: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517669218000,
        //     total: -1000,
        //     // result: 9933458,
        //     isActive: false
        // }, {
        //     id: 9,
        //     walletId: 1,
        //     type: 'sent',
        //     to: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517679218000,
        //     total: -3000,
        //     // result: 9920000,
        //     isActive: false
        // }, {
        //     id: 10,
        //     walletId: 1,
        //     type: 'received',
        //     from: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517689218000,
        //     total: 1500,
        //     // result: 9923458,
        //     isActive: false
        // }, {
        //     id: 11,
        //     walletId: 1,
        //     type: 'sent',
        //     to: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517900218000,
        //     total: -500,
        //     // result: 9910000,
        //     isActive: false
        // }, {
        //     id: 12,
        //     walletId: 1,
        //     type: 'received',
        //     from: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517912218000,
        //     total: 2000,
        //     // result: 9913458,
        //     isActive: false
        // }, {
        //     id: 13,
        //     walletId: 1,
        //     type: 'sent',
        //     to: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1517992218000,
        //     total: -1000,
        //     // result: 9900000,
        //     isActive: false
        // }, {
        //     id: 14,
        //     walletId: 1,
        //     type: 'received',
        //     from: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1514992218000,
        //     total: 4000,
        //     // result: 9900000,
        //     isActive: false
        // }, {
        //     id: 15,
        //     walletId: 1,
        //     type: 'received',
        //     from: 'rJwPtKQyXwLm9PB67J2BVPFCAmpmzC',
        //     date: 1514992219000,
        //     total: 1000,
        //     // result: 9900000,
        //     isActive: false
        // }, {
        //     id: 16,
        //     walletId: 2,
        //     type: 'sent',
        //     to: 'jF2XDoOs3mTTTWc2Ivxje7FrxpMpIh',
        //     date: 1518616218000,
        //     total: -2000,
        //     // result: 500000,
        //     isActive: false
        // }
    ],
    tmpTransactions: [],
    chunkTransactions: [],
    // filters: ['All', 'Income', 'Expend'],
    dateFrom: 0,
    dateTo: 0,
    filters: ['All'],
    activeFilter: 0,
    searchText: '',
    hideFilter: false,
    transactionStatus: '',
    transactionsLoader: false
};

const actions = {
    transactionsRequest: ({commit, dispatch}, address) => {

        // this.addNewTransactions(response.body);
        // this.changeTransactionLoaderState(false);

        return new Promise((resolve, reject) => {
            if (address === '') return false;
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
                    console.log(resp.data, 'transactions');
                    commit('SET_TRANSACTIONS', resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit('TRANSACTIONS_ERROR', err);
                    // commit('AUTH_ERROR', err);

                    // localStorage.removeItem(sha256('user-token'));
                    // delete axios.defaults.headers.common['Login'];
                    reject(err)
                });
        })
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


    transactionsStatus: state => state.transactionStatus,
};

export default {
    state,
    actions,
    mutations,
    getters
}
