<template>
    <div class="login">
        <Navbar
                :title="'ALE'"
                :isNavigate="false"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">


                <!--37 <label for="password">{{ $t('pages.login.password') }}</label>-->
                <!--45 :placeholder="$t('pages.login.password')"-->
                <!--53 {{ $t('pages.login.login') }}-->

                <div class="container">
                    <div class="row">

                        <div class="col-12">
                            <div class="login-form" v-if="authStep !== 1">
                                <form @submit.prevent="login">
                                    <div class="control" @click="focusInput('email')">
                                        <label for="email">e-mail</label>
                                        <input
                                                v-validate="'required|email'"
                                                class="d-block"
                                                :class="{error: isErrorEmail}"
                                                @input="resetError('login')"
                                                type="text"
                                                placeholder="e-mail"
                                                id="email"
                                                v-model="email"
                                                required
                                                autofocus
                                        >
                                    </div>

                                    <div class="control" @click="focusInput('password')">
                                        <label for="password">{{ $t('pages.login.password') }}</label>
                                        <input
                                                class="d-block"
                                                :class="{error: isErrorPassword}"
                                                @input="resetError('password')"
                                                type="password"
                                                placeholder="password"
                                                id="password"
                                                v-model="password"
                                                required>
                                    </div>

                                    <button type="submit" class="btn btn-black btn-block nomargin" @click="isLoadingCheck">
                                        {{ $t('pages.login.login') }}
                                    </button>
                                    <div class="error-block" v-if="isErrorLogin">
                                        <p>Login or password is incorrect</p>
                                    </div>
                                    <div class="is-center" v-if="isLoading">
                                        <Spinner/>
                                    </div>
                                </form>

                                <p class="text">{{ $t('pages.login.textForgotPassword') }}
                                    <router-link :to="{ path: '/recover' }">
                                        {{ $t('pages.login.recoverAccount') }}
                                    </router-link>
                                </p>

                                <p class="text">{{ $t('pages.login.textHaveAccount') }}
                                    <router-link :to="{ path: '/registration' }">
                                        {{ $t('pages.login.createAccount') }}
                                    </router-link>
                                </p>

                            </div>
                            <div class="login-form" v-else>
                                <form @submit.prevent="loginWithTwoAuth">
                                    <div class="control" @click="focusInput('twoAuthKey')">
                                        <label for="twoAuthKey">2fa code</label>
                                        <input
                                                type="text"
                                                id="twoAuthKey"
                                                class="d-block"
                                                placeholder="Enter your key"
                                                :class="{error: isError2fa}"
                                                @input="resetError('token')"
                                                v-model="token"
                                                autofocus
                                                required>
                                    </div>
                                    <div class="error-block" v-if="isErrorLogin">
                                        <p>Incorrect two-factor code</p>
                                    </div>

                                    <div class="is-center is-2fa-loader" v-if="isLoading">
                                        <Spinner/>
                                    </div>

                                    <button type="submit" class="btn btn-black btn-block nomargin">
                                        Submit code
                                    </button>

                                    <p class="text">
                                        <router-link :to="{ path: '/recover-twofactor' }">
                                            Recover two-factor code
                                        </router-link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import Spinner from './layouts/Spinner';

    import sha256 from 'sha256';

    import {mapGetters} from 'vuex';

    export default {
        name: 'login',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                email: null,
                password: null,
                token: null,
                isErrorEmail: false,
                isErrorPassword: false,
                isError2fa: false,
                isLoading: false,
                initialLoading: true
            }
        },
        computed: {
            ...mapGetters([
                'authStep',
                'authStatus',
                'userTwoAuth',
                'userStatus',
                'userHaveWallets',
                'userHaveTransactions',
                'isLoaderUserAuth',
                'isErrorLogin',
                'wallets',
                'walletStatus',
                'currentWallet',
                'transactionStatus'
            ]),
        },
        methods: {
            login: function () {

                let e = this.errors.items;

                if (!this.email && !this.password) {
                    this.focusInput('email');
                    this.$toasted.show('Enter your email and password', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                if (!this.email || !this.password) {
                    if (!this.email) {
                        this.focusInput('email');
                        this.$toasted.show('Enter your email', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                    if (!this.password) {
                        this.focusInput('password');
                        this.$toasted.show('Enter your password', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                }

                if (e.length !== 0) {
                    this.isErrorEmail = true;
                    this.focusInput('email');
                    if (e[0].rule === 'email') {
                        this.$toasted.show('Enter your valid email', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                }

                if (this.password.length < 8) {
                    this.focusInput('password');
                    this.$toasted.show('The password must be at least 8 characters in length', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }


                const {email, password} = this;

                this.$store.dispatch('authRequest', {email, password}).then(() => {
                    if (this.authStep === 0) {
                        this.$store.dispatch('userRequest').then(() => {
                            this.$store.dispatch('walletsRequest').then(() => {
                                localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);
                                this.$store.dispatch('transactionsRequest', this.currentWallet.address || '').then(() => {
                                    this.$router.push('/');
                                }).catch(() => {
                                    //это не срабатывает???
                                    console.log('You do not have transactions');
                                    this.$router.push('/');
                                });
                            }).catch(() => {
                                console.log('You do not have wallets');
                                this.$router.push('/');
                            });
                        }).catch(() => {
                            console.log('Wrong user');
                        });
                    }
                }).catch(() => {
                    console.log('Wrong auth');
                });
            },

            loginWithTwoAuth: function () {
                const {email, password, token} = this;
                this.$store.dispatch('authTwoFaRequest', {email, password, token}).then(() => {
                    this.$store.dispatch('userRequest').then(() => {
                        this.$store.dispatch('walletsRequest').then(() => {
                            localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);
                            this.$store.dispatch('transactionsRequest', this.currentWallet.address || '').then(() => {
                                this.$router.push('/');
                            }).catch(() => {
                                //это не срабатывает???
                                console.log('You do not have transactions');
                                this.$router.push('/');
                            });
                        }).catch(() => {
                            console.log('You do not have wallets');
                            this.$router.push('/');
                        });
                        this.$router.push('/');
                    });
                });
            },

            isLoadingCheck: function () {
                if ((this.authStatus !== 'success' && this.userStatus !== 'success') || (this.authStatus === 'success' && this.userStatus !== 'success'))
                    this.isLoading = false;
                else
                    this.isLoading = true;

                if ((this.authStatus === 'success' && this.userStatus === 'success' && !this.userHaveWallets && !this.userHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && !this.userHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && this.userHaveTransactions && this.transactionStatus === 'success')) {

                    console.log('Success loading');

                    this.isLoading = false;
                } else
                    this.isLoading = true;
            },

            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            resetError: function (type) {
                if (type === 'login')
                    this.isErrorEmail = false;

                if (type === 'password')
                    this.isErrorPassword = false;
            }
        },
        mounted() {
            // console.log(sha256('2o_H-Zu7nNDcmSaZX'));
            console.log(sha256('TdlMDdlYzViMmQ5OCI'));
        }
    }
</script>

<style>
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px #f0f0f0 inset !important;
    }
</style>

<style lang="stylus" scoped>
    /*.two-auth-form*/
    /*.control*/
    /*label*/
    /*text-transform uppercase*/
    /*margin 0*/
    /*white-space pre*/
    /*margin-left 16px*/
    /*margin-right 12px*/
    /*input*/
    /*width 100%*/
    /*font-size 14px*/
    /*background inherit*/
    /*border none*/
    /*text-align right*/
    /*outline none*/
    /*margin-right 16px*/
    /*position relative*/
    /*z-index 1*/
    /*opacity 1*/

    /*.two-auth-form*/
    /*width 426px*/
    /*padding 16px*/
    /*height auto*/
    /*background #f0f0f0*/
    /*display flex*/
    /*justify-content center*/
    /*border-radius 4px*/
    /*flex-direction column*/
    /*margin 0 auto*/

    .d-block
        display block

    .is-center
        display flex
        justify-content center

    .is-2fa-loader
        margin-top -20px
        margin-bottom 20px

    .error
        text-decoration underline
        text-decoration-color #d93f1f

    .error-block
        color red
        font-family MuseoSansCyrl300
        text-align center

    .login-form
        .text
            font-family MuseoSansCyrl300

            a
                font-family MuseoSansCyrl700
</style>