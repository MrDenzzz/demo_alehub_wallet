import axios from 'axios';
import sha256 from 'sha256';


const state = {
    user: {

    },
    token: localStorage.getItem(sha256('2o_H-Zu7nNDcmSaZX')) || '',
    status: ''
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
    AUTH_LOGOUT: () => {
        state.status = 'not authorized';
        state.token = '';
    },
    USER_REQUEST: (state) => {

    }
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};


const actions = {
    authRequest: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST');
            let host = 'http://192.168.1.37:4000/users/login';
            axios({url: host, data: user, method: 'POST' })
                .then(resp => {
                    console.log(resp);
                    const token = resp.data.user_token;
                    localStorage.setItem(sha256('user-token'), token);
                    axios.defaults.headers.common['Login'] = token;
                    commit('AUTH_SUCCESS', token);
                    // dispatch('userRequest');
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem(sha256('user-token'));
                    delete axios.defaults.headers.common['Login'];
                    reject(err)
                })
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

    }
};

export default {
    state,
    mutations,
    actions,
    getters
};