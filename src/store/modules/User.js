import axios from 'axios';
import sha256 from 'sha256';
import router from '../../router'

const state = {
    authStep: 0,
    name: '',
    email: '',
    password: '',
    avatar: '',
    lastUpdatedPassword: '',
    token: localStorage.getItem(sha256('user-token')) || '',
    twoAuth: '',
    haveTransactions: null,
    haveWallets: null,
    userStatus: '',
    status: '',
    logoutStatus: '',
    twoAuthGeneratedCode: '',
    twoAuthSecret: '',
    twoAuthStatus: '',
    disableTwoAuthStatus: '',
    changeUserNameStatus: '',
    isLoader: false,
    isErrorLogin: false,

    changeEmailStatus: '',
    changePasswordStatus: '',
    setAvatarStatus: '',

    changeTwoAuthStatus: '',

    confirmationChangeEmailStatus: '',
    cancellationChangeEmailStatus: '',

    confirmationRegistrationStatus: ''
};

const actions = {
    authRequest: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_AUTH');
            let host = 'https://ale-demo-4550.nodechef.com/users/login';
            axios({
                url: host,
                data: user,
                method: 'POST'
            }).then(resp => {
                if (resp.data.statusLogin === 200) {
                    commit('SUCCESS_AUTH_CHANGE_STEP', user);
                } else {
                    const token = resp.data.user_token;
                    localStorage.setItem(sha256('user-token'), token);
                    axios.defaults.headers.common['Authorization'] = token;
                    commit('SUCCESS_AUTH');
                }
                resolve(resp);
            }).catch(err => {
                commit('ERROR_AUTH', err);
                localStorage.removeItem(sha256('user-token'));
                delete axios.defaults.headers.common['Login'];
                reject(err)
            });
        })
    },
    authTwoFaRequest: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_AUTH');
            let host = 'https://ale-demo-4550.nodechef.com/users/login/2fa';
            axios({
                url: host,
                data: user,
                method: 'POST'
            }).then(resp => {
                const token = resp.data.user_token;
                localStorage.setItem(sha256('user-token'), token);
                axios.defaults.headers.common['Authorization'] = token;
                commit('SUCCESS_AUTH');
                resolve(resp);
            }).catch(err => {
                commit('ERROR_AUTH', err);
                localStorage.removeItem(sha256('user-token'));
                delete axios.defaults.headers.common['Login'];
                reject(err)
            });
        })
    },
    authLogout: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_LOGOUT');
            let host = 'https://ale-demo-4550.nodechef.com/users/logout';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'DELETE'
            }).then(resp => {
                console.log(resp, 'logout');
                commit('SUCCESS_LOGOUT');
                localStorage.removeItem(sha256('user-token'));
                localStorage.removeItem(sha256('current-wallet'));
                delete axios.defaults.headers.common['Authorization'];
                resolve(resp);
            }).catch(err => {
                console.log(err);
                commit('ERROR_LOGOUT', err);
                reject(err)
            });
        })
    },
    userRequest: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_USER');
            let host = 'https://ale-demo-4550.nodechef.com/users/get-user-data';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'GET'
            }).then(resp => {
                console.log(resp.data, 'user data');
                commit('SUCCESS_AUTH');
                commit('SUCCESS_USER', resp.data);
                dispatch('setChangeTwoAuthStatus', resp.data.isTwoAuth);
                resolve(resp);
            }).catch(err => {
                // console.log(err, 'errrrrrrr');
                if (err.response.data.message === 'User is not found') {
                    localStorage.removeItem(sha256('user-token'));
                    router.push('/login');
                }
                commit('ERROR_USER', err);
                commit('ERROR_AUTH', err);
                reject(err);
            });
        });
    },
    confirmationRegistration: ({commit}, token) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_CONFIRMATION_REGISTRATION');
            let host = 'https://ale-demo-4550.nodechef.com/users/confirm-reg';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                data: token,
                method: 'POST'
            }).then(resp => {
                commit('SUCCESS_CONFIRMATION_REGISTRATION');
                resolve(resp);
            }).catch(err => {
                commit('ERROR_CONFIRMATION_REGISTRATION', err);
                reject(err);
            });
        });
    },
    twoAuthRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_TWOAUTH');
            let host = 'https://ale-demo-4550.nodechef.com/users/generate-qr';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                method: 'GET'
            }).then(resp => {
                let twoauth = {
                    qrPath: resp.data.qr_path,
                    secret: resp.data.secret
                };
                commit('SUCCESS_TWOAUTH', twoauth);
                resolve(resp);
            }).catch(err => {
                commit('ERROR_TWOAUTH', err);
                reject(err);
            });
        });
    },
    isErrorLoginReset: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_ERROR_LOGIN_RESET');
            resolve();
        });
    },
    enableTwoAuth: ({commit, dispatch}, authData) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_ENABLE_TWOAUTH');
            let host = 'https://ale-demo-4550.nodechef.com/users/enable-two-auth';
            axios({
                url: host,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                data: authData,
                method: 'POST'
            }).then(resp => {
                commit('SUCCESS_ENABLE_TWOAUTH');
                dispatch('setChangeTwoAuthStatus', true);
                resolve(resp);
            }).catch(err => {
                commit('ERROR_ENABLE_TWOAUTH', err);
                reject(err);
            });
        });
    },
    disableTwoAuth: ({commit, dispatch}, confirmDisableData) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_DISABLE_TWOAUTH');
            let host = 'https://ale-demo-4550.nodechef.com/users/disable-two-auth';
            axios({
                url: host,
                data: confirmDisableData,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                console.log(resp);
                commit('SUCCESS_DISABLE_TWOAUTH');
                dispatch('setChangeTwoAuthStatus', false);
                resolve(resp);
            }).catch(err => {
                console.log(err);
                commit('ERROR_DISABLE_TWOAUTH', err);
                reject(err);
            });
        });
    },
    changeUserName: ({commit, dispatch}, name) => {
        return new Promise((resolve, reject) => {
            let host = 'https://ale-demo-4550.nodechef.com/users/change-name';
            axios({
                url: host,
                data: name,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                commit('SUCCESS_CHANGE_USERNAME', resp);
                resolve(resp);
            }).catch(err => {
                console.log(err);
                commit('ERROR_CHANGE_USERNAME', err);
                reject(err);
            });
        });
    },
    changeEmail: ({commit, dispatch}, emailData) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_CHANGE_EMAIL');
            let host = 'https://ale-demo-4550.nodechef.com/users/change-email';
            axios({
                url: host,
                data: emailData,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                commit('SUCCESS_CHANGE_EMAIL');
                resolve(resp);
            }).catch(err => {
                console.log(err);
                commit('ERROR_CHANGE_EMAIL', err);
                reject(err);
            });
        });
    },
    confirmationChangeEmail: ({commit}, token) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_CONFIRMATION_CHANGE_EMAIL');
            let host = 'https://ale-demo-4550.nodechef.com/users/confirm-change-email';
            axios({
                url: host,
                data: token,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                console.log(resp, 'confirmation change email success');
                if (resp.data.message === 'Cancellation of mail changes was successful') {
                    commit('SUCCESS_CANCELLATION_CHANGE_EMAIL');
                } else {
                    const token = resp.data.user_token;
                    localStorage.setItem(sha256('user-token'), token);
                    axios.defaults.headers.common['Authorization'] = token;
                    commit('SUCCESS_CONFIRMATION_CHANGE_EMAIL', resp.data.user_email);
                }
                resolve(resp);
            }).catch(err => {
                console.log(err);
                commit('ERROR_CONFIRMATION_CHANGE_EMAIL', err);
                reject(err);
            });
        });
    },
    resetConfirmationChangeEmailStatus: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_RESET_CONFIRMATION_CHANGE_EMAIL_STATUS');
            resolve();
        });
    },
    resetCancellationChangeEmailStatus: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_RESET_CANCELLATION_CHANGE_EMAIL_STATUS');
            resolve();
        });
    },
    changePassword: ({commit, dispatch}, passData) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_CHANGE_PASSWORD');
            let host = 'https://ale-demo-4550.nodechef.com/users/change-password';
            axios({
                url: host,
                data: passData,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                console.log(resp, 'change password');
                commit('SUCCESS_CHANGE_PASSWORD');
                resolve(resp);
            }).catch(err => {
                // console.log(err);
                commit('ERROR_CHANGE_PASSWORD', err);
                reject(err);
            });
        });
    },
    setAvatar: ({commit, dispatch}, avatarData) => {
        return new Promise((resolve, reject) => {
            commit('REQUEST_SET_AVATAR');
            let host = 'https://ale-demo-4550.nodechef.com/users/set_avatar';
            axios({
                url: host,
                data: avatarData,
                headers: {
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                method: 'POST'
            }).then(resp => {
                console.log(resp, 'change avatar')
                commit('SUCCESS_SET_AVATAR');
                resolve(resp);
            }).catch(err => {
                commit('ERROR_SET_AVATAR');
                reject(err);
            })
        })
    },
    resetAuthStep: ({commit}) => {
        return new Promise((resolve) => {
            commit('SUCCESS_RESET_AUTH_STEP');
            resolve();
        });
    },
    setChangeTwoAuthStatus: ({commit}, status) => {
        return new Promise((resolve) => {
            commit('SUCCESS_SET_CHANGE_TWO_AUTH_STATUS', status);
            resolve();
        });
    }
};

const mutations = {
    REQUEST_AUTH: (state) => {
        state.isErrorLogin = false;
        state.isLoader = true;
        state.status = 'loading';
    },
    SUCCESS_AUTH: (state, token) => {
        state.isErrorLogin = false;
        state.isLoader = false;
        state.status = 'success';
        state.token = token;
    },
    SUCCESS_AUTH_CHANGE_STEP: (state, user) => {
        state.email = user.email;
        state.password = user.password;
        state.isErrorLogin = false;
        state.isLoader = false;
        state.authStep = 1;
    },
    ERROR_AUTH: (state) => {
        state.isErrorLogin = true;
        state.isLoader = false;
        state.status = 'error';
    },
    SUCCESS_ERROR_LOGIN_RESET: (state) => {
        state.isErrorLogin = false;
    },
    REQUEST_LOGOUT: (state) => {
        state.logoutStatus = 'loading';
    },
    SUCCESS_LOGOUT: (state) => {
        state.status = '';
        state.userStatus = '';
        state.token = '';
        state.logoutStatus = 'success';
    },
    ERROR_LOGOUT: (state) => {
        state.logoutStatus = 'error';
    },
    REQUEST_USER: (state) => {
        state.userStatus = 'loading';
    },
    SUCCESS_USER: (state, user) => {
        state.name = user.name;
        state.email = user.email;
        state.avatar = user.avatar;
        state.twoAuth = user.isTwoAuth;
        state.lastUpdatedPassword = user.lastUpdatedPassword;
        state.haveTransactions = user.haveTransactions;
        user.walletsList.length === 0 ? state.haveWallets = false : state.haveWallets = true;
        state.userStatus = 'success';
    },
    ERROR_USER: (state) => {
        state.userStatus = 'error';
    },
    REQUEST_CONFIRMATION_REGISTRATION: (state) => {
        state.confirmationRegistrationStatus = 'loading';
    },
    SUCCESS_CONFIRMATION_REGISTRATION: (state) => {
        state.confirmationRegistrationStatus = 'success';
        console.log(state.confirmationRegistrationStatus, 'state.confirmationRegistrationStatus check');
    },
    ERROR_CONFIRMATION_REGISTRATION: (state) => {
        state.confirmationRegistrationStatus = 'error';
    },
    REQUEST_TWOAUTH: (state) => {
        state.twoauthStatus = 'loading';
    },
    SUCCESS_TWOAUTH: (state, twoauth) => {
        state.twoAuthStatus = 'success';
        state.twoAuthGeneratedCode = twoauth.qrPath;
        state.twoAuthSecret = twoauth.secret;
    },
    ERROR_TWOAUTH: (state) => {
        state.twoAuthStatus = 'error';
    },
    REQUEST_ENABLE_TWOAUTH: (state) => {
        state.enableTwoAuthStatus = 'loading';
    },
    SUCCESS_ENABLE_TWOAUTH: (state) => {
        state.enableTwoAuthStatus = 'success';
        state.twoAuth = true;
    },
    ERROR_ENABLE_TWOAUTH: (state) => {
        state.enableTwoAuthStatus = 'error'
    },
    REQUEST_DISABLE_TWOAUTH: (state) => {
        state.disableTwoAuthStatus = 'loading';
    },
    SUCCESS_DISABLE_TWOAUTH: (state) => {
        state.disableTwoAuthStatus = 'success';
        state.twoAuth = false;
    },
    ERROR_DISABLE_TWOAUTH: (state) => {
        state.disableTwoAuthStatus = 'error';
    },
    SUCCESS_CHANGE_USERNAME: (state, name) => {
        state.name = name;
        state.changeUserNameStatus = 'success';
    },
    ERROR_CHANGE_USERNAME: (state, err) => {
        state.changeUserNameStatus = 'error';
    },
    REQUEST_CHANGE_EMAIL: (state) => {
        state.changeEmailStatus = 'loading';
    },
    SUCCESS_CHANGE_EMAIL: (state) => {
        state.changeEmailStatus = 'success';
    },
    ERROR_CHANGE_EMAIL: (state) => {
        state.changeEmailStatus = 'error';
    },
    REQUEST_CONFIRMATION_CHANGE_EMAIL: (state) => {
        state.confirmationChangeEmailStatus = 'loading';
    },
    SUCCESS_CONFIRMATION_CHANGE_EMAIL: (state, email) => {
        state.email = email;
        state.confirmationChangeEmailStatus = 'success';
    },
    SUCCESS_CANCELLATION_CHANGE_EMAIL: (state) => {
        state.cancellationChangeEmailStatus = 'success';
    },
    ERROR_CONFIRMATION_CHANGE_EMAIL: (state) => {
        state.confirmationChangeEmailStatus = 'error';
    },
    SUCCESS_RESET_CONFIRMATION_CHANGE_EMAIL_STATUS: (state) => {
        state.confirmationChangeEmailStatus = '';
    },
    SUCCESS_RESET_CANCELLATION_CHANGE_EMAIL_STATUS: (state) => {
        state.cancellationChangeEmailStatus = '';
    },
    REQUEST_CHANGE_PASSWORD: (state) => {
        state.changePasswordStatus = 'loading';
    },
    SUCCESS_CHANGE_PASSWORD: (state) => {
        state.changePasswordStatus = 'success';
    },
    ERROR_CHANGE_PASSWORD: (state) => {
        state.changePasswordStatus = 'error';
    },
    REQUEST_SET_AVATAR: (state) => {
        state.setAvatarStatus = 'loading';
    },
    SUCCESS_SET_AVATAR: (state) => {
        state.setAvatarStatus = 'success';
    },
    ERROR_SET_AVATAR: (state) => {
        state.setAvatarStatus = 'error';
    },
    SUCCESS_RESET_AUTH_STEP: (state) => {
        state.authStep = 0;
    },
    SUCCESS_SET_CHANGE_TWO_AUTH_STATUS: (state, status) => {
        state.changeTwoAuthStatus = status;
    }
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStep: state => state.authStep,
    authStatus: state => state.status,
    userName: state => state.name,
    userEmail: state => state.email,
    userPassword: state => state.password,
    userAvatar: state => state.avatar,
    userStatus: state => state.userStatus,
    userTwoAuth: state => state.twoAuth,
    userHaveWallets: state => state.haveWallets,
    userHaveTransactions: state => state.haveTransactions,
    userLastUpdatedPassword: state => state.lastUpdatedPassword,
    twoAuthStatus: state => state.twoAuthStatus,
    twoAuthGeneratedCode: state => state.twoAuthGeneratedCode,
    twoAuthSecret: state => state.twoAuthSecret,
    changeUserNameStatus: state => state.changeUserNameStatus,
    isLoaderUserAuth: state => state.isLoader,
    isErrorLogin: state => state.isErrorLogin,
    changeTwoAuthStatus: state => state.changeTwoAuthStatus,

    confirmationChangeEmailStatus: state => state.confirmationChangeEmailStatus,
    cancellationChangeEmailStatus: state => state.cancellationChangeEmailStatus,
};

export default {
    state,
    mutations,
    actions,
    getters
};