<template>
    <div class="register">
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
                            <Spinner
                                    v-if="processingSendRequest"
                            />

                            <div v-if="!processingSendRequest && successSendRequest" style="display: flex; justify-content: center; font-family: MuseoSansCyrl500;">
                                <p>{{ $t('pages.registration.completionRegistration') }}
                                    <span style="font-family: MuseoSansCyrl700;">
                                        {{email}}
                                    </span>
                                </p>
                            </div>
                            <div class="login-form" v-if="!processingSendRequest && !successSendRequest">
                                <div class="control" @click="focusInput('fullname')">
                                    <label for="fullname">{{ $t('pages.registration.fullName') }}</label>
                                    <input
                                            type="text"
                                            id="fullname"
                                            class="d-block"
                                            placeholder="full name"
                                            @keyup.enter="register"
                                            v-model="fullName"
                                            autofocus
                                    >
                                </div>

                                <div class="control" @click="focusInput('email')">
                                    <label for="email">{{ $t('pages.registration.email') }}</label>
                                    <input
                                            type="text"
                                            id="email"
                                            class="d-block"
                                            placeholder="e-mail"
                                            v-validate="'email'"
                                            @keyup.enter="register"
                                            v-model="email"
                                    >
                                </div>

                                <div class="control" @click="focusInput('password')">
                                    <label for="password">{{ $t('pages.registration.password') }}</label>
                                    <input
                                            type="password"
                                            id="password"
                                            class="d-block"
                                            placeholder="password"
                                            @keyup.enter="register"
                                            v-model="password"
                                    >
                                </div>

                                <div class="control" @click="focusInput('repeatpass')">
                                    <label for="repeatpass">{{ $t('pages.registration.repeatPassword') }}</label>
                                    <input
                                            type="password"
                                            id="repeatpass"
                                            class="d-block"
                                            placeholder="password"
                                            @keyup.enter="register"
                                            v-model="passwordConfirm"
                                    >
                                </div>

                                <div class="is-center" v-if="isLoader">
                                    <Spinner  />
                                </div>

                                <div class="error-block" v-if="isExistUser">
                                    <p>Error login</p>
                                </div>

                                <button
                                        class="btn btn-yellow btn-block nomargin"
                                        @click="registerUser()"
                                >
                                    {{ $t('pages.registration.create') }}
                                </button>

                                <p class="text">{{ $t('pages.registration.haveAccount') }}
                                    <router-link :to="{ path: '/' }">
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

    export default {
        name: 'register',
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
                isLoader: false,
                isExistUser: false
            }
        },
        methods: {
            registerUser: function () {
                this.isExistUser = false;
                var e = this.errors.items;
                if (!this.fullName && !this.email && !this.phoneNumber
                    && !this.password && !this.passwordConfirm) {
                    this.focusInput('fullname');
                    this.$toasted.show(this.$t('pages.registration.fillAllFields'), {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                if (!this.fullName || !this.email || !this.phoneNumber
                    || !this.password || !this.passwordConfirm) {
                    if (!this.fullName) {
                        this.focusInput('fullname');
                        this.$toasted.show(this.$t('pages.registration.enterFullName'), {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                    if (!this.email) {
                        this.focusInput('email');
                        this.$toasted.show(this.$t('pages.registration.enterEmail'), {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                    if (!this.password) {
                        this.focusInput('password');
                        this.$toasted.show(this.$t('pages.registration.enterPassword'), {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                    if (!this.passwordConfirm) {
                        this.focusInput('repeatpass');
                        this.$toasted.show(this.$t('pages.registration.enterRepeatPassword'), {
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
                        this.$toasted.show(this.$t('pages.registration.enterValidEmail'), {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                }
                if (this.password.length < 8) {
                    this.focusInput('password');
                    this.$toasted.show(this.$t('pages.registration.enterCorrectLengthPassword'), {
                        duration: 10000,
                        type: 'error',
                    });
                    return false
                }
                if (this.password !== this.passwordConfirm) {
                    this.$toasted.show(this.$t('pages.registration.enterMatchPassword'), {
                        duration: 10000,
                        type: 'error',
                    });
                    this.focusInput('password');
                    return false;
                }

                
                this.isLoader = true;

                this.$http.post(`${this.$host}/users/new`, {
                    name: this.fullName,
                    email: this.email,
                    password: this.password
                }, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if(response.body.message === 'User already exist!') {
                        this.isLoader = false;
                        return this.isExistUser = true;
                    }
                    this.successSendRequest = true;
                    this.processingSendRequest = true;
                    console.log(response);
                    this.processingSendRequest = false;
                    // return this.$router.push('/registration/confirmationuser');
                }, response => {
                    console.log('error', response);
                });
            },
            focusInput: function (id) {
                document.getElementById(id).focus()
            },
            resetError: function (type) {
                if (type === 'login') this.isErrorEmail = false;
                if (type === 'password') this.isErrorPassword = false;
            }
        }
    }
</script>

<style>
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0px 1000px #f0f0f0 inset !important;
    }
</style>

<style lang="stylus" scoped>
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
