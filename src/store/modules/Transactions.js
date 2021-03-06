import axios from 'axios/index';

const state = {

    //мб подгружать сразу все транзакции или только для текущего воллета, а потом по требованию, но не сохранять, а дозаписывать?

    allTransactions: [],

    filteredAllTransactions: [],

    options: {
        selectedWallets: [],
        balance: {
            from: '',
            to: ''
        },
    },

    transactions: [],
    transactionsUpdated: [],
    changedTransactions: false,

    transactionStatus: 'not found',
    transactionsLazyStatus: '',
    transactionsPingStatus: '',
    transactionSendStatus: '',
    initiateFilterDateStatus: '',
    allTransactionsStatus: '',
    additionTransactionStatus: '',
    addMissingTransactionsStatus: '',

    transactionsLoader: false,

    dateFrom: 0,
    dateTo: 0,
    disabledDate: {
        to: 0
    },

    searchText: '',

    dateIntervalFromFilterAllTransactions: 0,
    dateIntervalToFilterAllTransactions: 0,

    // isDisableType: false,
    // isDisableBalance: false
};

const actions = {
    allTransactionsRequest: ({commit, dispatch}, walletsAddressList) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_ALL_TRANSACTIONS');
            let host = 'https://ale-demo-4550.nodechef.com/transactions/list';
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
                //временно
                for (let i = 0; i < resp.data.length; i++) {
                    for (let j = 0; j < resp.data[i].transactions.length; j++) {
                        if (resp.data[i].transactions[j].walletDestination === resp.data[i].address) {
                            resp.data[i].transactions[j].balanceInfo.before = resp.data[i].transactions[j].balanceInfoDest.before;
                            resp.data[i].transactions[j].balanceInfo.after = resp.data[i].transactions[j].balanceInfoDest.after;
                        }
                        delete resp.data[i].transactions[j].balanceInfoDest
                    }
                }

                commit('SUCCESS_ALL_TRANSACTIONS', resp.data);
                dispatch('copyAllTransactions', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error transactions wallet address');
                commit('ERROR_ALL_TRANSACTIONS', err);
                reject(err)
            });
        });
    },
    copyAllTransactions: ({commit, dispatch}, arr) => {
        return new Promise((resolve, reject) => {
            commit('SUCCESS_COPY_ALL_TRANSACTIONS', arr);
            resolve();
        });
    },
    restoreAllTransactions: ({commit, dispatch}, arr) => {
        return new Promise((resolve, reject) => {
            commit('RESTORE_ALL_TRANSACTIONS', arr);
            resolve();
        });
    },
    filterAllTransactions: ({commit, dispatch}, options) => {
        return new Promise((resolve, reject) => {
            if (options.selectedWallets.length !== 0) {
                if (options.typeTransaction === 'income') {
                    commit('SUCCESS_FILTER_TYPE_INCOME_ALL_TRANSACTIONS');
                } else if (options.typeTransaction === 'outcome') {
                    commit('SUCCESS_FILTER_TYPE_OUTCOME_ALL_TRANSACTIONS');
                }
                if (state.allTransactions.length !== 0) {
                    commit('SUCCESS_FILTER_BALANCE_ALL_TRANSACTIONS', options);

                    if (state.allTransactions.length !== 0) {
                        commit('SUCCESS_FILTER_DATE_ALL_TRANSACTIONS', options.date);
                    }
                }
                resolve();
            } else {
                reject('Selected wallets is not found');
            }
        });
    },
    additionTransactionRequest: ({commit}, walletAddressArray) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_ADDITION_TRANSACTION');
            let host = 'https://ale-demo-4550.nodechef.com/transactions/list';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: walletAddressArray,
                method: 'POST'
            }).then(resp => {
                //временно
                for (let i = 0; i < resp.data.length; i++) {
                    for (let j = 0; j < resp.data[i].transactions.length; j++) {
                        if (resp.data[i].transactions[j].walletDestination === resp.data[i].address) {
                            resp.data[i].transactions[j].balanceInfo.before = resp.data[i].transactions[j].balanceInfoDest.before;
                            resp.data[i].transactions[j].balanceInfo.after = resp.data[i].transactions[j].balanceInfoDest.after;
                        }
                        delete resp.data[i].transactions[j].balanceInfoDest
                    }
                }
                commit('SUCCESS_ADDITION_TRANSACTION', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error transactions wallet address');
                commit('ERROR_ADDITION_TRANSACTION', err);
                reject(err)
            });
        });
    },
    addMissingTransactionsRequest: ({commit, dispatch}, addresses) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_ADD_MISSING_TRANSACTIONS');
            let host = 'https://ale-demo-4550.nodechef.com/transactions/list';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: addresses,
                method: 'POST'
            }).then(resp => {
                //временно
                for (let i = 0; i < resp.data.length; i++) {
                    for (let j = 0; j < resp.data[i].transactions.length; j++) {
                        if (resp.data[i].transactions[j].walletDestination === resp.data[i].address) {
                            resp.data[i].transactions[j].balanceInfo.before = resp.data[i].transactions[j].balanceInfoDest.before;
                            resp.data[i].transactions[j].balanceInfo.after = resp.data[i].transactions[j].balanceInfoDest.after;
                        }
                        delete resp.data[i].transactions[j].balanceInfoDest
                    }
                }
                commit('SUCCESS_ADD_MISSING_TRANSACTIONS', resp.data);
                dispatch('copyAllTransactions', resp.data);
                resolve(resp);
            }).catch(err => {
                console.log(err, 'error transactions wallet address');
                commit('ERROR_ADD_MISSING_TRANSACTIONS', err);
                reject(err)
            });
        });
    },
    transactionsRequest: ({commit, dispatch}, address) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_TRANSACTIONS');
            let host = `https://ale-demo-4550.nodechef.com/transactions/${address}`;
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
            let host = `https://ale-demo-4550.nodechef.com/transactions/${address}`;
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
            let host = `https://ale-demo-4550.nodechef.com/transactions/${address}`;
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
            let host = `https://ale-demo-4550.nodechef.com/transactions/send`;
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

// function kek () {
//
// }

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
    SUCCESS_COPY_ALL_TRANSACTIONS: (state, arr) => {
        arr.forEach(item => {
            state.filteredAllTransactions.push(item);
        });
    },
    RESTORE_ALL_TRANSACTIONS: (state, arr) => {
        state.allTransactions = JSON.parse(JSON.stringify(arr));
    },
    SUCCESS_FILTER_BALANCE_ALL_TRANSACTIONS: (state, options) => {
        if (!options.balance.from)
            options.balance.from = 0;

        state.allTransactions = state.allTransactions.filter(item => {
            return options.selectedWallets.find(address => {
                return item.address === address;
            }) && item.transactions.filter(transaction => {
                return transaction.count >= parseInt(options.balance.from) && transaction.count <= parseInt(options.balance.to);
            }).length !== 0
        });

        state.allTransactions.forEach((item, i, arr) => {
            arr[i].transactions = item.transactions.filter(transaction => {
                return transaction.count >= parseInt(options.balance.from) && transaction.count <= parseInt(options.balance.to);
            });
        });

        state.allTransactions = state.allTransactions.filter(item => {
            return item.transactions.length !== 0;
        });
    },
    ERROR_FILTER_BALANCE_ALL_TRANSACTIONS: (state) => {

    },
    SUCCESS_FILTER_TYPE_INCOME_ALL_TRANSACTIONS: (state) => {
        state.allTransactions.forEach((item, i, arr) => {
            arr[i].transactions = item.transactions.filter(transaction => {
                return transaction.balanceInfo.after - transaction.balanceInfo.before > 0;
            });
        });

        state.allTransactions = state.allTransactions.filter(item => {
            return item.transactions.length !== 0;
        });
    },
    ERROR_FILTER_TYPE_INCOME_ALL_TRANSACTIONS: (state) => {

    },
    SUCCESS_FILTER_TYPE_OUTCOME_ALL_TRANSACTIONS: (state) => {
        state.allTransactions.forEach((item, i, arr) => {
            arr[i].transactions = item.transactions.filter(transaction => {
                return transaction.balanceInfo.after - transaction.balanceInfo.before < 0;
            });
        });

        state.allTransactions = state.allTransactions.filter(item => {
            return item.transactions.length !== 0;
        });
    },
    ERROR_FILTER_TYPE_OUTCOME_ALL_TRANSACTIONS: (state) => {

    },
    SUCCESS_FILTER_DATE_ALL_TRANSACTIONS: (state, date) => {
        let filterDateFrom = null,
            filterDateTo = null;

        if (date.secondary.from && date.secondary.to) {
            filterDateFrom = date.secondary.from;
            filterDateTo = date.secondary.to;
        } else {
            filterDateFrom = date.primary.from;
            filterDateTo = date.primary.to;
        }

        state.allTransactions = state.allTransactions.filter(item => {
            return item.transactions.filter(transaction => {
                return transaction.timestamp >= parseInt(filterDateFrom) && transaction.timestamp <= parseInt(filterDateTo);
            }).length !== 0;
        });

        state.allTransactions = state.allTransactions.filter(item => {
            return item.transactions.length !== 0;
        });

        state.dateIntervalFromFilterAllTransactions = new Date(state.allTransactions.map(item =>
            item.transactions
        ).reduce((prev, curr) =>
            prev.concat(curr)
        ).map(item =>
            item.timestamp
        ).reduce((prev, curr) =>
            (curr < prev) ? curr : prev
        ));
        state.dateIntervalFromFilterAllTransactions.setHours(0);
        state.dateIntervalFromFilterAllTransactions.setMinutes(0);
        state.dateIntervalFromFilterAllTransactions.setSeconds(0);
        state.dateIntervalFromFilterAllTransactions.setMilliseconds(0);
        state.dateIntervalFromFilterAllTransactions = state.dateIntervalFromFilterAllTransactions.getTime();

        state.dateIntervalToFilterAllTransactions = new Date(state.allTransactions.map(item =>
            item.transactions
        ).reduce((prev, curr) =>
            prev.concat(curr)
        ).map(item =>
            item.timestamp
        ).reduce((prev, curr) =>
            (curr > prev) ? curr : prev
        ));
        state.dateIntervalToFilterAllTransactions.setHours(23);
        state.dateIntervalToFilterAllTransactions.setMinutes(59);
        state.dateIntervalToFilterAllTransactions.setSeconds(59);
        state.dateIntervalToFilterAllTransactions.setMilliseconds(999);
        state.dateIntervalToFilterAllTransactions = state.dateIntervalToFilterAllTransactions.getTime();

        state.allTransactions.forEach((item, i, arr) => {
            arr[i].transactions = item.transactions.filter(transaction => {
                return transaction.timestamp >= parseInt(filterDateFrom) && transaction.timestamp <= parseInt(filterDateTo);
            });
        });

        state.allTransactions = state.allTransactions.filter(item => {
            return item.transactions.length !== 0;
        });
    },
    ERROR_DATE_FILTER_ALL_TRANSACTIONS: (state) => {

    },
    REQUEST_ADDITION_TRANSACTION: (state) => {
        state.additionTransactionStatus = 'loading';
    },
    SUCCESS_ADDITION_TRANSACTION: (state, walletTransactions) => {
        state.allTransactions.push(walletTransactions[0]);
        state.additionTransactionStatus = 'success';
    },
    ERROR_ADDITION_TRANSACTION: (state) => {
        state.additionTransactionStatus = 'error';
    },
    REQUEST_ADD_MISSING_TRANSACTIONS: (state) => {
        state.addMissingTransactionsStatus = 'loading';
    },
    SUCCESS_ADD_MISSING_TRANSACTIONS: (state, missingTransactions) => {
        missingTransactions.forEach(item => {
            state.allTransactions.push(item);
        });
        state.addMissingTransactionsStatus = 'success';
    },
    ERROR_ADD_MISSING_TRANSACTIONS: (state) => {
        state.addMissingTransactionsStatus = 'error';
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
    ERROR_TRANSACTIONS: (state) => {
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

    minCountAllTransactions: state => {
        let min = state.filteredAllTransactions[0].transactions[0].count;
        state.filteredAllTransactions.map(item => {
            return item.transactions;
        }).reduce((combArr, currArr) => {
            return combArr.concat(currArr);
        }).forEach(item => {
            if (item.count < min)
                min = item.count;
        });
        return min;
    },
    maxCountAllTransactions: state => {
        let max = state.filteredAllTransactions[0].transactions[0].count;
        state.filteredAllTransactions.map(item => {
            return item.transactions;
        }).reduce((combArr, currArr) => {
            return combArr.concat(currArr);
        }).forEach(item => {
            if (item.count > max)
                max = item.count;
        });
        return max;
    },
    dateFromFilterConstTransactions: state => {
        let from = new Date(state.filteredAllTransactions.map(item =>
            item.transactions
        ).reduce((prev, curr) =>
            prev.concat(curr)
        ).map(item =>
            item.timestamp
        ).reduce((prev, curr) =>
            (curr < prev) ? curr : prev
        ));
        from.setHours(0);
        from.setMinutes(0);
        from.setSeconds(0);
        from.setMilliseconds(0);
        return from.getTime();
    },
    dateToFilterConstTransactions: state => {
        let to = new Date(state.filteredAllTransactions.map(item =>
            item.transactions
        ).reduce((prev, curr) =>
            prev.concat(curr)
        ).map(item =>
            item.timestamp
        ).reduce((prev, curr) =>
            (curr > prev) ? curr : prev
        ));
        to.setHours(23);
        to.setMinutes(59);
        to.setSeconds(59);
        to.setMilliseconds(999);
        return to.getTime();
    },


    // clearAllTransactions: state => {
    //     // console.log(state.filteredAllTransactions, 'clearAllTransactions: state => {');
    //     // return state.filteredAllTransactions;
    // },

    filteredAllTransactions: state => {
        //разбить всё таки на несколько геттеров
        let count = null,
            min = null,
            max = null;

        if (state.allTransactions.length !== 0) {
            count = state.allTransactions.map(item => {
                return item.transactions.length;
            }).reduce((sum, curr) => {
                return sum + curr;
            });

            state.allTransactions = state.allTransactions.filter(item => {
                return item.transactions.length !== 0;
            });

            if (state.allTransactions.length !== 0) {
                min = state.allTransactions[0].transactions[0].count;
                max = state.allTransactions[0].transactions[0].count;
                state.allTransactions.map(item => {
                    return item.transactions;
                }).reduce((combArr, currArr) => {
                    return combArr.concat(currArr);
                }).forEach(item => {
                    if (item.count < min)
                        min = item.count;
                    if (item.count > max)
                        max = item.count;
                });
            }
        }

        return {
            transactions: state.allTransactions,
            count: count || 0,
            min: min,
            max: max
        };
    },

    dateIntervalFromFilterAllTransactions: state => state.dateIntervalFromFilterAllTransactions,

    dateIntervalToFilterAllTransactions: state => state.dateIntervalToFilterAllTransactions,

    dateFromFilterAllTransactions: state => {
        if (state.allTransactions.length !== 0) {
            let from = new Date(state.allTransactions.map(item =>
                item.transactions
            ).reduce((prev, curr) =>
                prev.concat(curr)
            ).map(item =>
                item.timestamp
            ).reduce((prev, curr) =>
                (curr < prev) ? curr : prev
            ));
            from.setHours(0);
            from.setMinutes(0);
            from.setSeconds(0);
            from.setMilliseconds(0);
            return from.getTime();
        }
        return null;
    },
    dateToFilterAllTransactions: state => {
        if (state.allTransactions.length !== 0) {
            let to = new Date(state.allTransactions.map(item =>
                item.transactions
            ).reduce((prev, curr) =>
                prev.concat(curr)
            ).map(item =>
                item.timestamp
            ).reduce((prev, curr) =>
                (curr > prev) ? curr : prev
            ));
            to.setHours(23);
            to.setMinutes(59);
            to.setSeconds(59);
            to.setMilliseconds(999);
            return to.getTime();
        }
        return null;
    },
    disableFieldsFilter: state => {
        return {
            type: state.isDisableType,
            balance: state.isDisableBalance
        }
    },


    transactions: state => state.transactions,
    transactionsCount: state => state.transactions.length,
    constantTransactions: state => {
        return state.filteredAllTransactions.filter(item => {
            return item.transactions.length !== 0;
        });
    },
    constantTransactionsCount: state => {
        return state.filteredAllTransactions.map(item => {
            return item.transactions;
        }).reduce((prev, curr) => {
            return prev.concat(curr);
        }).length;
    },
    // dateTransactions: state => state.dateTransactions,
    transactionStatus: state => state.transactionStatus,
    transactionsLazyStatus: state => state.transactionsLazyStatus,
    initiateFilterDateStatus: state => state.initiateFilterDateStatus,
    dateFrom: state => state.dateFrom,
    dateTo: state => state.dateTo,
    disabledDate: state => state.disabledDate,
    searchText: state => state.searchText,
    changedTransactions: state => state.changedTransactions,

    countAllTransactions: state => {
        let count = 0;
        for (let i = 0; i < state.allTransactions.length; i++) {
            count += state.allTransactions[i].transactions.length;
        }
        return count;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
