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
                                <form @submit.prevent="sendLink">
                                    <div class="control" @click="focusInput('userEmail')">
                                        <label for="userEmail">Your E-mail</label>
                                        <input
                                            type="text"
                                            id="userEmail"
                                            class="d-block"
                                            placeholder="Enter your E-mail"
                                            v-validate="'required|email'"
                                            :class="{error: isErrorEmail}"
                                            @input="resetError('email')"
                                            autofocus
                                            v-model="email"
                                            required>
                                    </div>

                                    <button type="submit" class="btn btn-black btn-block nomargin">
                                        Send link to recover
                                    </button>
                                    <div class="error-block" :class="{ 'success': isNotificationSuccess }" v-if="isNotification">
                                        <p>{{ notificationText }}</p>
                                    </div>
                                    <div class="is-center" v-if="isLoader">
                                        <Spinner  />
                                    </div>
                                </form>

                                <p class="text">Already have an account?
                                    <router-link :to="{ path: '/login' }">
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
import Spinner from './layouts/Spinner';

export default {
    name: 'Recover',
    components: {
        Navbar,
        Spinner
    },
    data () {
        return {
            email: '',
            isErrorEmail: false,
            isLoader: false,
            isNotification: false,
            notificationText: '',
            isNotificationSuccess: false
        }
    },
    methods: {
        resetError: function (type) {
            this.isErrorEmail = false;
        },
        focusInput: function (id) {
            document.getElementById(id).focus();
        },
        sendLink () {
            this.isNotification = false;
            let e = this.errors.items;

            if (this.email.length === 0) {
                this.focusInput('userEmail');
                this.$toasted.show('Enter your E-mail', {
                    duration: 10000,
                    type: 'error',
                });
                return false;
            }

            if (e.length !== 0) {
                this.isErrorEmail = true;
                this.focusInput('userEmail');
                if (e[0].rule === 'email') {
                    this.$toasted.show('Enter your valid email', {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
            }

            this.isLoader = true;

            this.$http.post(`http://192.168.1.47:4000/users/recovery`, {
                email: this.email
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            }).then(response => {
                this.isLoader = false;
                if(response.body.message === 'User not found') {
                    this.notificationText = 'User not found';
                    this.isNotificationSuccess = false;
                    return this.isNotification = true;
                }
                if(response.body.message === 'Link successfully sent') {
                    this.notificationText = 'Check your E-mail for recovery';
                    this.isNotificationSuccess = true;
                    return this.isNotification = true;
                }
            }, response => {
                this.isLoader = false;
                this.notificationText = 'An error has occurred';
                this.isNotificationSuccess = false;
                return this.isNotification = true;
            });
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

    // .success
    //     color green

    // .login-form
    //     .text
    //         font-family MuseoSansCyrl300

    //         a
    //             font-family MuseoSansCyrl700
</style>