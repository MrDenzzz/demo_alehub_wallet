import axios from 'axios';
import sha256 from 'sha256';


const state = {
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
        state.status = 'error'
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
                    localStorage.setItem(sha256('user-token'), token); // store the token in localstorage
                    commit('AUTH_SUCCESS', token);
                    // dispatch('userRequest');
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem(sha256('user-token'));
                    reject(err)
                })
        })

        // return new Promise((resolve, reject) => {
        //
        //     commit('AUTH_REQUEST');
        //
        //     // Vue.prototype.$host = 'http://192.168.1.37:4000';
        //     // axios({url: 'http://192.168.1.37:4000', data: user, method: 'POST'})
        //     //     .then(resp => {
        //     //         const token = resp.data.token;
        //     //         localStorage.setItem('user-token', token); // store the token in localstorage
        //     //         commit(AUTH_SUCCESS, token);
        //     //         // you have your token, now log in your user :)
        //     //         dispatch(USER_REQUEST);
        //     //         resolve(resp);
        //     //     })
        //     //     .catch(err => {
        //     //         commit(AUTH_ERROR, err);
        //     //         localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
        //     //         reject(err);
        //     //     })
        //     let host = 'http://192.168.1.37:4000';
        //     Vue.http.post(`${host}/users/login`,
        //         user, {
        //         headers: {
        //             'Content-Type': 'application/json; charset=UTF-8',
        //             'Accept': 'application/json'
        //         }
        //     }).then(response => {
        //         const token = response.body.user_token;
        //         localStorage.setItem(sha256('user-token'), token);
        //         commit('AUTH_SUCCESS', token);
        //         dispatch('userRequest');
        //         console.log(response);
        //         resolve(response);
        //         console.log('555');
        //     }, response => {
        //         console.log('error', response);
        //         // localStorage.removeItem(sha256('user-token'));
        //         // commit('AUTH_ERROR', response);
        //         // reject(response);
        //     });
        // }).catch(err => {
        //     commit('AUTH_ERROR', err);
        //     localStorage.removeItem(sha256('user-token'));
        //     reject(err);
        // });
    },

    // AUTH_LOGOUT: ({commit, dispatch}) => {
    //     return new Promise((resolve, reject) => {
    //         commit(AUTH_LOGOUT);
    //         localStorage.removeItem('user-token'); // clear your user's token from localstorage
    //         resolve();
    //     })
    // },
    userRequest: ({commit, dispatch}) => {

    }
};

export default {
    state,
    mutations,
    actions,
    getters
};