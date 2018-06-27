<template>
    <div class="register">
        <navbar :title="'ALE'"
                :isNavigate="false"
                :isBalance="false"/>

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="is-center" v-if="processingSendRequest">
                                <spinner/>
                            </div>

                            <div v-if="!processingSendRequest && successSendRequest"
                                 class="wrap-completion-reg">
                                <p>{{ $t('pages.registration.completionRegistration') }}
                                    <span class="alert-completion-reg">
                                        {{email}}
                                    </span>
                                </p>
                            </div>
                            <div class="login-form" v-if="!processingSendRequest && !successSendRequest">
                                <form @submit.prevent="registerUser()">
                                    <div class="control" @click="focusInput('fullname')">
                                        <label for="fullname">{{ $t('pages.registration.form.name.label') }}</label>
                                        <input type="text"
                                               id="fullname"
                                               class="d-block"
                                               required
                                               :placeholder="$t('pages.registration.form.name.placeholder')"
                                               v-model="fullName"
                                               autofocus>
                                        <!--@keyup.enter="register"-->
                                    </div>

                                    <div class="control" @click="focusInput('email')">
                                        <label for="email">{{ $t('pages.registration.form.email.label') }}</label>
                                        <input type="email"
                                               id="email"
                                               class="d-block"
                                               required
                                               :placeholder="$t('pages.registration.form.email.placeholder')"
                                               v-validate="'email'"
                                               v-model="email">
                                        <!--@keyup.enter="register"-->
                                    </div>

                                    <div class="control" @click="focusInput('password')">
                                        <label for="password">{{ $t('pages.registration.form.password.label') }}</label>
                                        <input type="password"
                                               id="password"
                                               class="d-block"
                                               required
                                               :placeholder="$t('pages.registration.form.password.placeholder')"
                                               v-model="password">
                                        <!--@keyup.enter="register"-->
                                    </div>

                                    <div class="control" @click="focusInput('repeatpass')">
                                        <label for="repeatpass">{{ $t('pages.registration.form.repeatPassword.label') }}</label>
                                        <input type="password"
                                               id="repeatpass"
                                               class="d-block"
                                               required
                                               :placeholder="$t('pages.registration.form.repeatPassword.placeholder')"
                                               v-model="passwordConfirm">
                                        <!--@keyup.enter="register"-->
                                    </div>

                                    <div class="is-center" v-if="dataProcessing">
                                        <spinner/>
                                    </div>

                                    <button type="submit"
                                            class="btn btn-yellow btn-block nomargin">
                                        {{ $t('pages.registration.create') }}
                                    </button>
                                </form>

                                <p class="text">
                                    {{ $t('pages.registration.haveAccount') }}
                                    <router-link :to="{ path: '/login' }">
                                        {{ $t('pages.registration.login') }}
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

    import PasswordValidator from 'password-validator';
    import isPasswordBlacklist from 'password-blacklist';

    export default {
        name: 'registration',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                isErrorEmail: false,
                isErrorPassword: false,
                fullName: '',
                email: '',
                password: '',
                passwordConfirm: '',
                successSendRequest: false,
                processingSendRequest: false,
                dataProcessing: false,
                isExistUser: false,

                Schema: false
            }
        },
        methods: {
            /**
             * show error toast
             *
             * @param text
             */
            errorToasted: function (text) {
                this.$toasted.show(text, {
                    duration: 10000,
                    type: 'error',
                    action: {
                        text: 'hide',
                        class: 'toasted-action-hide',
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    }
                });
            },
            validateVal: function (val) {
                //добавить проверки на специальные символы
                if (val.length === 0)
                    return false;
                return true;
            },
            /**
             * validation of emails according to specified rules
             *
             * @returns {boolean}
             */
            validateEmail: function () {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(String(this.email).toLowerCase())) {
                    this.errorToasted(this.$t('pages.registration.toast.error.email'));
                    return false;
                }
                return true;
            },
            /**
             * password validation according to the specified rules
             *
             * @returns {boolean}
             */
            validatePassword: function (pass) {
                let res = this.Schema.validate(pass);
                if (!res) {
                    this.errorToasted(this.$t('pages.registration.toast.error.password'));
                    return false;
                }
                return true;
            },
            /**
             * verification of the password for compliance
             *
             * @returns {boolean}
             */
            checkPassToPassConfirm: function () {
                if (this.password !== this.passwordConfirm) {
                    this.$toasted.show(this.$t('pages.registration.toast.error.repeatPassword'), {
                        duration: 10000,
                        type: 'error',
                        action: {
                            text: 'hide',
                            class: 'toasted-action-hide',
                            onClick: (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        }
                    });
                    this.focusInput('password');
                    return false;
                }
                return true;
            },

            registerUser: function () {
                this.isExistUser = false;

                if (!this.validateEmail())
                    return false;

                if (!this.validatePassword(this.password))
                    return false;

                if (!this.checkPassToPassConfirm())
                    return false;

                this.dataProcessing = true;

                this.$store.dispatch('userRegisterRequest', {
                    name: this.fullName,
                    email: this.email,
                    password: this.password
                }).then(resp => {
                    this.successSendRequest = true;
                    this.processingSendRequest = true;
                    this.processingSendRequest = false;
                    this.dataProcessing = false;
                }).catch(err => {
                    this.dataProcessing = false;
                    if (err.response.status === 406)
                        this.errorToasted(this.$t('pages.registration.toast.error.userAlreadyExist'));
                });
            },
            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            resetError: function (type) {
                if (type === 'login')
                    this.isErrorEmail = false;

                if (type === 'password')
                    this.isErrorPassword = false;
            },
            /**
             * initiate validate password schema
             */
            initValidateSchema: function () {
                this.Schema = new PasswordValidator();

                this.Schema
                    .is().min(8)
                    .is().max(100)
                    .has().uppercase()
                    .has().lowercase()
                    .has().digits()
                    .has().not().spaces();
            },
            /**
             * checking the password in the black list of passwords
             *
             * @param pass user entered password
             */
            checkPassInBlackList: function (pass) {
                isPasswordBlacklist(pass).then(blacklisted => {
                    return blacklisted;
                })
            },
        },
        mounted() {
            this.initValidateSchema();
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
    .wrap-completion-reg
        display flex
        justify-content center
        font-family MuseoSansCyrl500

        .alert-completion-reg
            font-family MuseoSansCyrl700

    .is-center
        display flex
        justify-content center
        margin-top -10px
        margin-bottom 25px

    .error-block
        color red
        font-family MuseoSansCyrl300
        text-align center
        margin-top -20px

    .d-block
        display block

    .login-form
        .text
            font-family MuseoSansCyrl300

            a
                font-family MuseoSansCyrl700

</style>
