<template>
    <div class="login">
        <navbar
                :title="'ALE'"
                :isNavigate="false"
                :isBalance="false"/>

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="login-form" v-if="authStep !== 1">
                                <form @submit.prevent="login">
                                    <div class="control" @click="focusInput('email')">
                                        <label for="email">e-mail</label>
                                        <input v-validate="'required|email'"
                                               class="d-block"
                                               :class="{error: isErrorEmail}"
                                               @input="resetError('login')"
                                               type="text"
                                               placeholder="e-mail"
                                               id="email"
                                               v-model="email"
                                               required
                                               autofocus>
                                    </div>

                                    <div class="control" @click="focusInput('password')">
                                        <label for="password">{{ $t('pages.login.password') }}</label>
                                        <input class="d-block"
                                               :class="{error: isErrorPassword}"
                                               @input="resetError('password')"
                                               type="password"
                                               placeholder="password"
                                               id="password"
                                               v-model="password"
                                               required>
                                    </div>

                                    <button type="submit"
                                            class="btn btn-black btn-block nomargin"
                                            @click="isLoadingCheck">
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
                'isLoaderUserAuth',
                'isErrorLogin',
                'wallets',
                'walletStatus',
                'currentWallet',
                'transactionStatus',
                'currentWalletHaveTransactions',
                'initiateFilterDateStatus'
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

                this.isLoading = true;

                this.$store.dispatch('authRequest', {
                    email: this.email,
                    password: this.password,
                    // password: PasswordEncryption(this.password)
                }).then(() => {
                    if (this.authStep === 0) {
                        this.$store.dispatch('userRequest').then(() => {
                            this.$store.dispatch('walletsRequest').then(() => {
                                localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);
                                this.$store.dispatch('transactionsRequest', this.currentWallet.address || '').then(() => {
                                    this.$router.push('/');
                                }).catch(() => {
                                    //это не срабатывает???
                                    console.log('You do not have transactions');
                                    this.isLoading = false;
                                    this.$router.push('/');
                                });
                            }).catch(() => {
                                console.log('You do not have wallets');
                                this.isLoading = false;
                                this.$router.push('/');
                            });
                        }).catch(() => {
                            this.isLoading = false;
                            console.log('Wrong user');
                        });
                    } else {
                        this.isLoading = false;
                        this.$router.push('/login/twoauth');
                    }
                }).catch(() => {
                    this.isLoading = false;
                    console.log('Wrong auth');
                });
            },
            isLoadingCheck: function () {
                if (!this.email && !this.password) {
                    this.isLoading = false;
                    return;
                }

                (this.userStatus !== 'success') ? this.isLoading = false : this.isLoading = true;

                if ((this.authStatus === 'success' && this.userStatus === 'success' && !this.userHaveWallets && !this.currentWalletHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && !this.currentWalletHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && this.currentWalletHaveTransactions && this.transactionStatus === 'success' && this.initiateFilterDateStatus === 'success'))
                    this.isLoading = false;
                else
                    this.isLoading = true;
            },
            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            resetError: function (type) {
                if (type === 'login') {
                    this.isErrorEmail = false;
                }

                if (type === 'password') {
                    this.isErrorPassword = false;
                }

            }
        },
        beforeDestroy() {
            if (this.authStep) {
                this.$store.dispatch('resetAuthStep'
                ).then(() => {
                    console.log('Success resetAuthStep');
                }).catch(() => {
                    console.log('Error resetAuthStep');
                });
            }

            if (this.isErrorLogin) {
                this.$store.dispatch('isErrorLoginReset'
                ).then(() => {
                    console.log('Success is errorLoginReset. Login.vue');
                }).catch(() => {
                    console.log('Error is errorLoginReset. Login.vue');
                });
            }
        }
    }
</script>

<style lang="stylus">
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
        -webkit-box-shadow 0 0 0 1000px #f0f0f0 inset !important
</style>

<style lang="stylus" scoped>
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