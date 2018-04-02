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
                                <div class="is-center">
                                    <Spinner v-if="isLoader"/>
                                    <div v-else>
                                        <p>{{ resultMessage }}</p>
                                        <router-link v-if="isSuccess" :to="{ path: '/login' }" class="btn btn-black btn-block nomargin" tag="button">Login</router-link>
                                    </div>
                                </div>
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
            isLoader: false,
            resultMessage: '',
            isSuccess: false
        }
    },
    methods: {
        checkRecoveryToken () {
            this.isLoader = true;
            this.isSuccess = false;
            this.$http.post(`http://192.168.1.39:4000/users/recovery-confirm`, {
                recoveryToken: this.$route.params.token
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            }).then(response => {
                this.isLoader = false;
                if(response.body.message === 'Token not found') return this.resultMessage = 'Token not found';
                if(response.body.message === 'User not found') return this.resultMessage = 'User not found';
                this.resultMessage = `Your new password - ${response.body.newPassword}`;
                return this.isSuccess = true;
            }, response => {
                this.isLoader = false;
                this.resultMessage = 'An error has occurred';
            });
        }
    },
    created () {
        this.checkRecoveryToken();
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

    .login-form
        font-family MuseoSansCyrl300
        text-align center

    .is-center
        display flex
        justify-content center
</style>