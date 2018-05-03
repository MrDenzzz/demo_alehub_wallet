<template>
    <div class="login">
        <Navbar
                :title="'ALE'"
                :isNavigate="false"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="login-form">
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

                                    <button type="submit" class="btn btn-black btn-block nomargin"
                                            @click="isLoadingTwoAuthCheck">
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
        name: 'login-two-auth',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                token: null,
                isError2fa: false,
                isLoading: false
            }
        },
        computed: {
            ...mapGetters([
                'authStep',
                'authStatus',
                'userTwoAuth',
                'userStatus',
                'userHaveWallets',
                'userEmail',
                'userPassword',
                // 'userHaveTransactions',
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
            loginWithTwoAuth: function () {
                this.isLoading = true;

                this.$store.dispatch('authTwoFaRequest', {
                    email: this.userEmail,
                    password: this.userPassword,
                    token: this.token
                }).then(() => {
                    this.$store.dispatch('userRequest'
                    ).then(() => {
                        this.$store.dispatch('walletsRequest'
                        ).then(() => {
                            localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);
                            this.$store.dispatch('transactionsRequest',
                                this.currentWallet.address || ''
                            ).then(() => {
                                this.$router.push('/');
                            }).catch(() => {
                                //это не срабатывает???
                                this.isLoading = false;
                                console.log('You do not have transactions');
                                this.$router.push('/');
                            });
                        }).catch(() => {
                            this.isLoading = false;
                            console.log('You do not have wallets');
                            this.$router.push('/');
                        });
                        // this.$router.push('/');
                    }).catch(() => {
                        this.isLoading = false;
                        console.log('Error userRequest');
                    });
                }).catch(() => {
                    this.isLoading = false;
                    console.log('Error authTwoFaRequest');
                });
            },

            isLoadingTwoAuthCheck: function () {
                if (!this.token) {
                    this.isLoading = false;
                    return;
                }

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
                if (type === 'token') {
                    this.isError2fa = false;
                }
            }
        },


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
    // .d-block
    //     display block

    // .is-center
    //     display flex
    //     justify-content center

    // .is-2fa-loader
    //     margin-top -20px
    //     margin-bottom 20px

    // .error
    //     text-decoration underline
    //     text-decoration-color #d93f1f

    // .error-block
    //     color red
    //     font-family MuseoSansCyrl300
    //     text-align center

    // .login-form
    //     .text
    //         font-family MuseoSansCyrl300

    //         a
    //             font-family MuseoSansCyrl700
</style>