import axios from 'axios';
import sha256 from 'sha256';

const state = {
    currentPage: 1,
    currentSavedPage: 1,
    countOfferPerPage: 10,
    currentSortBy: "CONTRACTOR RATING",
    priority: -1,
    maxPrice: 0,
    minPrice: 0,
    maxRating: 0,
    minRating: 0,
    sortPriority: 'decrease',
    type: ["all"],
    professionalArea: ["all"],
    projectDuration: [0],
    premium: "all",
    stablishOffersList: [],
    currentOffer: 0,
    offersList: [],
    offersStatus: '',
    offersSavedList: []
};

const actions = {
    getOffers: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('OFFERS_STATUS', 'loading')
            let host = 'http://192.168.1.42:4000/offers';
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
                commit('OFFERS_STATUS', 'success');
                commit('SET_NEW_OFFERS_LIST', resp.data)
                console.log(resp);
                resolve(resp);
            })
            .catch(err => {
                commit('OFFERS_STATUS', 'error')
                console.log('oshibka', err)
                reject(err)
            });
        })
    },
    createOffer: ({commit, dispatch}, offerModel) => {
        return new Promise((resolve, reject) => {
            let host = 'http://192.168.1.42:4000/offers';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST',
                data: offerModel
            })
            .then(resp => {
                console.log('newOffer', resp)
                resolve(resp);
            })
            .catch(err => {
                
            })
        })
    }
}

const mutations = {
    SET_NEW_SELECT(state, item) {
        if (typeof item === "number") {
            state.countOfferPerPage = item;
        } else {
            state.currentSortBy = item;
        }

        state.currentPage = 1;
    },
    OFFERS_STATUS: (state, status) => {
        state.offersStatus = status;
    },
    SET_COUNT_OFFERS_PER_PAGE(state, item) {
        state.countOfferPerPage = item;
    },
    SET_SORT_PRIORITY(state, item) {
        state.sortPriority = item;
    },
    SET_CURRENT_PAGE(state, item) {
        state.currentPage = item;
    },
    SET_CURRENT_PRIORITY(state, item) {
        state.priority = item;
    },
    SET_PRICE_FORK(state, max, min) {
        state.maxPrice = max;
        state.minPrice = min;
    },
    SET_MIN_PRICE(state, item) {
        state.minPrice = item;
    },
    SET_MAX_PRICE(state, item) {
        state.maxPrice = item;
    },
    SET_MIN_RATING(state, item) {
        state.minRating = item;
    },
    SET_MAX_RATING(state, item) {
        state.maxRating = item;
    },
    SET_NEW_OFFERS_LIST(state, item) {
        state.offersList = item;
    },
    SET_STABLISH_OFFERS_LIST(state, item) {
        state.stablishOffersList = item;
    },
    SET_TYPE_PROJECT(state, item) {
        state.type = item;
    },
    SET_PROFESSIONAL_AREA(state, item) {
        state.professionalArea = item;
    },
    SET_PROJECT_DURATION(state, item) {
        state.projectDuration = item;
    },
    SET_PREMIUM_PROJECT(state, item) {
        state.premium = item;
    },
    SET_CURRENT_OFFER(state, item) {
        state.currentOffer = item;
    },
    SET_SAVED_ELEMENT_IN_OFFERS_LIST(state, id) {
        state.offersList.find(item => {
            return parseInt(item.id) === parseInt(id);
        }).saved = true;
    },
    UNSET_SAVED_ELEMENT_FROM_OFFER_LIST(state, id) {
        state.offersList.find(item => {
            return parseInt(item.id) === parseInt(id);
        }).saved = false;
    },
    ACCEPT_SOLUTION(state, id) {
        for (let i = 0; i < state.offersList.length; i++) {
            if (state.offersList[i].id == id)
                state.offersList[i].completed = true;
        }
    },
    SUBMIT_SOLUTION(state, obj) {
        for (let i = 0; i < state.offersList.length; i++) {
            if (state.offersList[i].id == obj.id)
                state.offersList[i].submited = true;
            state.offersList[i].fileSolution = obj.fileSolution;
        }
    },
    ADD_NEW_OFFER(state, offer) {
        state.offersList.push(offer);
    },
    UPDATE_OFFERS_LIST(state, offer) {
        let i = state.offersList.findIndex(item => {
            return item.id === offer.id;
        });
        state.offersList[i] = offer;
    },

    REMOVE_OFFERS(state, offersId) {
        for (let i = 0; i < offersId.length; i++) {
            let rmOfferInd = state.offersList.findIndex(item => {
                return parseInt(item.id) === parseInt(offersId[i].id);
            });
            state.offersList.splice(rmOfferInd, 1);
        }
    }
};

const getters = {
    getComputedOfferList: state => {
        return state.offersList.filter(item => {
            return !item.apply || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.contractorId))
                || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.ownerId)) && !item.completed;
        })
    },
    getPartOffersList: state => {
        return state.offersList.filter(item => {
            return !item.apply || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.contractorId))
                || (item.apply && parseInt(localStorage.getItem('id')) === parseInt(item.ownerId)) && !item.completed;
        }).slice((state.currentPage - 1) * state.countOfferPerPage, state.currentPage * state.countOfferPerPage);
    },
    //переписать в соответствии с данными для сейвд пейдж
    getPartOfferSavedList: state => {
        return state.offersList.filter(function (el) {
            return el.saved;
        }).slice((state.currentPage - 1) * state.countOfferPerPage, state.currentPage * state.countOfferPerPage);
    },
    doSortByRatingIncrease: state => {
        return state.offersList.sort(function (a, b) {
            return a.rating - b.rating;
        });
    },
    doSortByRatingDecrease: state => {
        return state.offersList.sort(function (a, b) {
            return b.rating - a.rating;
        });
    },
    doSortByPriceIncrease: state => {
        return state.offersList.sort(function (a, b) {
            return a.price - b.price;
        });
    },
    doSortByPriceDecrease: state => {
        return state.offersList.sort(function (a, b) {
            return b.price - a.price;
        });
    },
    doSortByEndDateIncrease: state => {
        return state.offersList.sort(function (a, b) {
            return a.date - b.date;
        });
    },
    doSortByEndDateDecrease: state => {
        return state.offersList.sort(function (a, b) {
            return b.date - a.date;
        });
    },

    doSortByRatingIncreaseSaved: state => {
        return state.offersList.filter(function (el) {
            return el.saved;
        }).sort(function (a, b) {
            return a.rating - b.rating;
        });
    },

    getMaxPriceOffers: state => {
        let maxPrice = Math.max.apply(Math, state.offersList.map(function (o) {
            return o.price;
        }));

        if (maxPrice !== -Infinity)
            return maxPrice;
        else
            return Math.max.apply(Math, state.stablishOffersList.map(function (o) {
                return o.price;
            }));
    },
    getMinPriceOffers: state => {
        let minPrice = Math.min.apply(Math, state.offersList.map(function (o) {
            return o.price;
        }));

        if (minPrice !== Infinity)
            return minPrice;

        return Math.min.apply(Math, state.stablishOffersList.map(function (o) {
            return o.price;
        }));
    },
    getMaxRatingOffers: state => {
        let maxRating = Math.max.apply(Math, state.offersList.map(function (o) {
            return o.rating;
        }));

        if (maxRating !== -Infinity)
            return maxRating;

        return Math.max.apply(Math, state.stablishOffersList.map(function (o) {
            return o.rating;
        }))
    },
    getMinRatingOffers: state => {
        let minRating = Math.min.apply(Math, state.offersList.map(function (o) {
            return o.rating;
        }));

        if (minRating !== Infinity)
            return minRating;

        return Math.min.apply(Math, state.stablishOffersList.map(function (o) {
            return o.rating;
        }));
    },
    doFilter: state => {
        let checkOption = function (el, state) {
            let check = false;
            for (let i = 0; i < state.length; i++) {
                if (el.includes(state[i])) {
                    check = true;
                } else {
                    check = false;
                    break;
                }
            }
            return check;
        };
        let checkProjectDuration = function (el, state) {
            let check = false;

            if (state.length === 1)
                return true;

            for (let i = 0; i < state.length; i++) {
                switch (state[i]) {
                    case "7":
                        if (el <= 7 && el > 0)
                            check = true;
                        break;
                    case "30":
                        if (el <= 30 && el > 7)
                            check = true;
                        break;
                    case "60":
                        if (el > 30)
                            check = true;
                        break;
                    case "0":
                        check = true;
                        break;
                }
            }

            return check;
        };
        return state.offersList.filter(function (el) {
            return el.rating <= state.maxRating && el.rating >= state.minRating &&
                el.price <= state.maxPrice && el.price >= state.minPrice &&
                el.premium.includes(state.premium) && checkOption(el.type, state.type) &&
                checkOption(el.professionalArea, state.professionalArea) &&
                checkProjectDuration(el.projectDuration, state.projectDuration);
        });
    },
    getCurrentOffer: state => {
        return state.offersList.find(function (el) {
            return parseInt(el.id) === parseInt(state.currentOffer);
        });
    },
    getCountOfferList: state => {
        return state.offersList.length;
    },
    offersStatus: state => state.offersStatus
};

export default {
    state,
    mutations,
    getters,
    actions
}
