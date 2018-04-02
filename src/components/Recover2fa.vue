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
                                    <div class="qr-code" v-if="isSuccessSecret">
                                        <qriously :value="qrCode" :size="200"/>

                                        <p>Your new secret key: <b style="color: red;">{{ newSecret }}</b></p>
                                        <p><b>Important</b>: Your secret code has been updated, scan the code and save the new secret code!</p>
                                        <router-link :to="{ path: '/login' }" class="btn btn-black btn-block nomargin" tag="button">
                                            Log in
                                        </router-link>
                                    </div>
                                    <div class="control" @click="focusInput('userSecretKey')" v-if="!isSuccessSecret">
                                        <label for="userSecretKey">Your secret key</label>
                                        <input
                                            type="text"
                                            id="userSecretKey"
                                            class="d-block"
                                            placeholder="Enter your secret key"
                                            v-validate="'required'"
                                            :class="{error: isErrorSecretKey}"
                                            @input="resetError('secretKey')"
                                            autofocus
                                            v-model="secretKey"
                                            required>
                                    </div>

                                    <button type="submit" class="btn btn-black btn-block nomargin" v-if="!isSuccessSecret">
                                        Recover
                                    </button>
                                    <div class="error-block" v-if="isNotification">
                                        <p>{{ notificationText }}</p>
                                    </div>
                                    <div class="is-center" v-if="isLoader">
                                        <Spinner  />
                                    </div>
                                </form>

                                <p class="text" v-if="!isSuccessSecret">Already have an account?
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
            secretKey: '',
            isErrorSecretKey: false,
            isLoader: false,
            isNotification: false,
            notificationText: '',
            isSuccessSecret: false,
            newSecret: '',
            qrCode: ''
        }
    },
    methods: {
        resetError: function (type) {
            this.isErrorSecretKey = false;
        },
        focusInput: function (id) {
            document.getElementById(id).focus();
        },
        sendLink () {
            this.isNotification = false;
            this.isSuccessSecret = false;
            let e = this.errors.items;

            if (this.secretKey.length === 0) {
                this.focusInput('userSecretKey');
                this.$toasted.show('Enter your E-mail', {
                    duration: 10000,
                    type: 'error',
                });
                return false;
            }

            this.isLoader = true;

            this.$http.post(`http://192.168.1.39:4000/users/restore-secret`, {
                secret: this.secretKey
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            }).then(response => {
                this.isLoader = false;
                this.isSuccessSecret = true;
                this.qrCode = decodeURIComponent(response.body.qrPath);
                this.newSecret = response.body.secret;

                console.log('S', response);
            }, response => {
                this.isNotification = true;
                this.isLoader = false;
                if(response.body.message === 'User not found') return this.notificationText = 'Invalid secret key';
                return this.notificationText = 'An error has occurred';
                console.log('E', response);
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

    .d-block
        display block

    .qr-code
        display flex
        justify-content center
        flex-direction column
        text-align center
        font-family MuseoSansCyrl300
        margin-top 0

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