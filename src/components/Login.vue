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

                                <div class="control" @click="focusInput('email')">
                                    <label for="email">e-mail</label>
                                    <input
                                            v-validate="'required|email'"
                                            :class="{error:isErrorEmail}"
                                            @keyup.enter="checkLogin"
                                            @input="resetError('login')"
                                            type="text"
                                            placeholder="e-mail"
                                            id="email"
                                            v-model="login"
                                            autofocus
                                    >
                                </div>

                                <div class="control" @click="focusInput('password')">
                                    <label for="password">password</label>
                                    <input
                                            :class="{error:isErrorPassword}"
                                            @keyup.enter="checkLogin"
                                            @input="resetError('password')"
                                            type="password"
                                            placeholder="password"
                                            id="password"
                                            v-model="password">
                                </div>

                                <button class="btn btn-black btn-block nomargin" @click="checkLogin">
                                    Login
                                </button>

                                <p class="text">Don’t have an account?
                                    <router-link :to="{ path: '/register' }">
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

    import {mapMutations} from "vuex";

    export default {
        name: 'login',
        components: {
            Navbar
        },
        data() {
            return {
                login: null,
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
            ...mapMutations({}),
            checkLogin() {

                let e = this.errors.items;

                if (!this.login && !this.password) {
                    this.focusInput('email');
                    this.$toasted.show('Enter your email and password', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false
                }

                if (!this.login || !this.password) {
                    if (!this.login) {
                        this.focusInput('email');
                        this.$toasted.show('Enter your email', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false
                    }
                    if (!this.password) {
                        this.focusInput('password');
                        this.$toasted.show('Enter your password', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false
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
                        return false
                    }
                }

                let account = this.getTestAccounts.filter(item => {
                    return item.email === this.login && item.password === this.password;
                });

                if (account.length === 0) {
                    this.focusInput('email');
                    this.$toasted.show('Account not found', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false
                } else {
                    localStorage.setItem('id', account[0].id);
                    return this.$router.push('/twoauth')
                }
            },
            focusInput(id) {
                document.getElementById(id).focus()
            },
            resetError(type) {
                if (type === 'login') this.isErrorEmail = false;
                if (type === 'password') this.isErrorPassword = false;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .error
        text-decoration underline
        text-decoration-color #d93f1f

    .login-form
        .text
            font-family: MuseoSansCyrl300

            a
                font-family MuseoSansCyrl700
</style>
