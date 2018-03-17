import axios from 'axios';
import sha256 from 'sha256';


const state = {
    name: '',
    email: '',
    twoauth: '',
    userStatus: '',
    token: localStorage.getItem(sha256('2o_H-Zu7nNDcmSaZX')) || '',
    status: '',
    twoauthGeneratedCode: '',
    twoauthStatus: ''
};

const actions = {
    authRequest: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST');
            let host = 'http://192.168.1.37:4000/users/login';
            // dispatch('userRequest', '123123');
            axios({
                url: host,
                data: user,
                method: 'POST'
            })
                .then(resp => {
                    const token = resp.data.user_token;
                    localStorage.setItem(sha256('user-token'), token);
                    axios.defaults.headers.common['Authorization'] = token;
                    commit('AUTH_SUCCESS');
                    dispatch('userRequest');
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem(sha256('user-token'));
                    delete axios.defaults.headers.common['Login'];
                    reject(err)
                });
        })
    },
    authLogout: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_LOGOUT');
            localStorage.removeItem(sha256('user-token'));
            delete axios.defaults.headers.common['Authorization'];
            resolve();
        })
    },
    userRequest: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('USER_REQUEST');
            let host = 'http://192.168.1.37:4000/users/get-user-data';
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
                    let user = {
                        name: resp.data.name,
                        email: resp.data.email,
                        twoauth: resp.data.twoauth_status
                    };
                    commit('USER_SUCCESS', user);
                    commit('AUTH_SUCCESS');
                    resolve(resp);
                })
                .catch(err => {
                    commit('USER_ERROR', err);
                    commit('AUTH_ERROR', err);
                    reject(err);
                });
        });
    },
    twoauthRequest: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('TWOAUTH_REQUEST');
            let host = 'http://192.168.1.37:4000/users/generate-qr';
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
                    console.log(resp);
                    // commit('TWOAUTH_SUCCESS', resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit('TWOAUTH_ERROR', err);
                    reject(err);
                });
        });
    }
};

const mutations = {
    AUTH_REQUEST: (state) => {
        state.status = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
        state.status = 'success';
        state.token = token;
    },
    AUTH_ERROR: (state) => {
        state.status = 'error';
    },
    AUTH_LOGOUT: (state) => {
        state.status = 'not authorized';
        state.token = '';
    },
    USER_REQUEST: (state) => {
        state.userStatus = 'loading';
    },
    USER_SUCCESS: (state, user) => {
        state.userStatus = 'success';
        state.name = user.name;
        state.email = user.email;
        state.twoauth = user.twoauth;
    },
    USER_ERROR: (state) => {
        state.userStatus = 'error';
    },
    TWOAUTH_REQUEST: (state) => {
        state.twoauthStatus = 'loading';
    },
    TWOAUTH_SUCCESS: (state, twoauthCode) => {
        state.twoauthStatus = 'success';
        state.twoauthGeneratedCode = twoauthCode;
    },
    TWOAUTH_ERROR: (state) => {
        state.twoauthStatus = 'error';
    }
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    userName: state => state.name,
    userEmail: state => state.email,
    userTwoAuth: state => state.twoauth
};

export default {
    state,
    mutations,
    actions,
    getters
};