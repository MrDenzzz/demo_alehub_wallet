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
                                <form @submit.prevent="login">
                                    <div class="control" @click="focusInput('email')">
                                        <label for="email">e-mail</label>
                                        <input
                                                v-validate="'required|email'"
                                                class="d-block"
                                                :class="{error: isErrorEmail}"
                                                @keyup.enter="checkLogin"
                                                @input="resetError('login')"
                                                type="text"
                                                placeholder="e-mail"
                                                id="email"
                                                v-model="email"
                                                autofocus
                                        >
                                    </div>

                                    <div class="control" @click="focusInput('password')">
                                        <label for="password">password</label>
                                        <input
                                                class="d-block"
                                                :class="{error:isErrorPassword}"
                                                @keyup.enter="checkLogin"
                                                @input="resetError('password')"
                                                type="password"
                                                placeholder="password"
                                                id="password"
                                                v-model="password">
                                    </div>

                                    <button type="submit"
                                            class="btn btn-black btn-block nomargin">
                                        Login
                                    </button>
                                </form>

                                <p class="text">Don’t have an account?
                                    <router-link :to="{ path: '/registration' }">
                                        Create one.
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
    import sha256 from 'sha256';

    import {mapMutations} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'login',
        components: {
            Navbar
        },
        data() {
            return {
                email: null,
                password: null,
                isErrorEmail: false,
                isErrorPassword: false,
            }
        },
        computed: {
            getTestAccounts: function () {
                return this.$store.state.Users.testAccounts;
            }
        },
        methods: {
            // ...mapMutations({}),
            ...mapActions([
                'authRequest'
            ]),
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

                // this.$http.post(`${this.$host}/users/login`, {
                //     email: this.email,
                //     password: this.password
                // }, {
                //     headers: {
                //         'Content-Type': 'application/json; charset=UTF-8',
                //         'Accept': 'application/json'
                //     }
                // }).then(response => {
                //     console.log(response);
                //
                //     const { username, password } = this;

                const {email, password} = this;

                this.$store.dispatch('authRequest', {email, password}).then(() => {
                    this.$router.push('/')
                });

                // localStorage.setItem(sha256('2o_H-Zu7nNDcmSaZX'), response.body.user_id);
                // localStorage.setItem(sha256('TdlMDdlYzViMmQ5OCI'), response.body.user_token);
                // this.$router.push('/');
                // }, response => {
                //     console.log('error', response);
                // });
            },
            focusInput: function (id) {
                document.getElementById(id).focus()
            },
            resetError: function (type) {
                if (type === 'login') this.isErrorEmail = false;
                if (type === 'password') this.isErrorPassword = false;
            }
        },
        mounted() {
            // console.log(sha256('2o_H-Zu7nNDcmSaZX'));
            console.log(sha256('TdlMDdlYzViMmQ5OCI'));
        }
    }
</script>

<style lang="stylus" scoped>
    .d-block
        display block

    .error
        text-decoration underline
        text-decoration-color #d93f1f

    .login-form
        .text
            font-family MuseoSansCyrl300

            a
                font-family MuseoSansCyrl700
</style>
