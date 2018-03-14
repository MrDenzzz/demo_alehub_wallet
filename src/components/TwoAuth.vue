<template>
    <div class="twoAuth">
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

                                <div class="control noline" @click="focusInput">
                                    <label for="pin">2fa pin code</label>
                                    <the-mask
                                            mask="######"
                                            placeholder="code"
                                            type="text"
                                            id="pin"
                                            :class="{error:isErrorCode}"
                                            @keyup.enter.native="checkTwoAuth"
                                            @input.native="resetError"
                                            v-model="twoauth"
                                    />
                                </div>

                                <div class="btn-control">
                                    <router-link :to="{ path: '/main' }" tag="button" class="buttons btn-default">Back
                                    </router-link>
                                    <button class="buttons btn-black" @click="checkTwoAuth">
                                        Confirm
                                    </button>
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

    export default {
        name: 'twoAuth',
        components: {
            Navbar
        },
        data() {
            return {
                isErrorCode: false,
                twoauth: ''
            }
        },
        methods: {
            checkTwoAuth() {
                if (this.twoauth.length != 6) {
                    this.$toasted.show("The two-factor code should consist of 6 symbols", {
                        duration: 10000,
                        type: 'error',
                    });
                    this.isErrorCode = true;
                    document.getElementById('pin').focus()
                } else {
                    localStorage.setItem('token', 'ih34hr512rnu32gugn548hgn49hn');
                    this.$router.push('/wallet');
                }
            },
            focusInput() {
                document.getElementById('pin').focus()
            },
            resetError() {
                this.isErrorCode = false
            },
        },
        mounted() {
            this.focusInput()
        }
    }
</script>

<style lang="scss" scoped>
    .error {
        text-decoration: underline;
        text-decoration-color: #d93f1f;
    }
</style>
