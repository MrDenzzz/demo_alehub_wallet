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
                            <div class="login-form">
                                <div class="control" @click="focusInput('fullname')">
                                    <label for="fullname">full name</label>
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
                                    <label for="email">e-mail</label>
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

                                <div class="control" @click="focusInput('phone')">
                                    <label for="phone">phone number</label>
                                    <input
                                            type="text"
                                            id="phone"
                                            class="d-block"
                                            placeholder="phone number"
                                            @keyup.enter="register"
                                            v-model="phoneNumber"
                                    >
                                </div>

                                <div class="control" @click="focusInput('password')">
                                    <label for="password">password</label>
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
                                    <label for="repeatpass">Repeat Password</label>
                                    <input
                                            type="password"
                                            id="repeatpass"
                                            class="d-block"
                                            placeholder="password"
                                            @keyup.enter="register"
                                            v-model="passwordConfirm"
                                    >
                                </div>

                                <button class="btn btn-yellow btn-block nomargin" @click="registerUser()">Create</button>

                                <p class="text">Already have an account?
                                    <router-link :to="{ path: '/' }">
                                        Log in.
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

    export default {
        name: 'register',
        components: {
            Navbar
        },
        data() {
            return {
                isErrorEmail: false,
                isErrorPassword: false,
                fullName: '',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirm: '',
            }
        },
        methods: {
            registerUser: function () {
                var e = this.errors.items;
                if (!this.fullName && !this.email && !this.phoneNumber && !this.password && !this.passwordConfirm) {
                    this.focusInput('fullname');
                    this.$toasted.show('Fill in all the fields', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                if (!this.fullName || !this.email || !this.phoneNumber || !this.password || !this.passwordConfirm) {
                    if (!this.fullName) {
                        this.focusInput('fullname');
                        this.$toasted.show('Enter your full name', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                    if (!this.email) {
                        this.focusInput('email');
                        this.$toasted.show('Enter your email', {
                            duration: 10000,
                            type: 'error',
                        });
                        return false;
                    }
                    if (!this.phoneNumber) {
                        this.focusInput('phone');
                        this.$toasted.show('Enter your phone number', {
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
                    if (!this.passwordConfirm) {
                        this.focusInput('repeatpass');
                        this.$toasted.show('Repeat password', {
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
                    this.$toasted.show('Password must be at least 8 characters long', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false
                }
                if (this.password !== this.passwordConfirm) {
                    this.$toasted.show('Passwords do not match', {
                        duration: 10000,
                        type: 'error',
                    });
                    this.focusInput('password');
                    return false;
                }



                return this.$router.push('/twoauth');
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

<style lang="stylus" scoped>
    .d-block
        display block

    .login-form
        .text
            font-family MuseoSansCyrl300

            a
                font-family MuseoSansCyrl700

</style>
