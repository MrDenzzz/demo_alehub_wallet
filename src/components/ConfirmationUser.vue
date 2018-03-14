<template>
    <div class="confirmation-user">
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

                                <div class="control noline" @click="focusInput()">
                                    <label for="confirmUserInput">2fa pin code</label>
                                    <the-mask
                                            mask="######"
                                            class="d-block"
                                            placeholder="code"
                                            type="text"
                                            id="confirmUserInput"
                                            :class="{error:isErrorCode}"
                                            @input.native="resetError()"
                                            v-model="confirmUser"
                                    />
                                    <!--@keyup.enter.native="checkConfirmationUser()"-->
                                </div>

                                <div class="btn-control">
                                    <router-link
                                            :to="{ path: '/main' }"
                                            tag="button" class="buttons btn-default">
                                        Back
                                    </router-link>
                                    <button class="buttons btn-black" @click="checkConfirmationUser()">
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
        name: 'confirmation-email',
        components: {
            Navbar
        },
        data() {
            return {
                isErrorCode: false,
                confirmUser: ''
            }
        },
        methods: {
            checkConfirmationUser: function () {
                // if (this.twoauth.length !== 6) {
                //     this.$toasted.show("The verification code must contain 30 characters", {
                //         duration: 10000,
                //         type: 'error',
                //     });
                //     this.isErrorCode = true;
                //     document.getElementById('pin').focus();
                // } else {
                // localStorage.setItem('token', 'ih34hr512rnu32gugn548hgn49hn');





                // this.$router.push('/wallet');

                // }
            },
            focusInput: function () {
                document.getElementById('confirmUserInput').focus();
            },
            resetError: function () {
                this.isErrorCode = false;
            },
        },
        mounted() {
            this.focusInput();
        }
    }
</script>

<style lang="stylus" scoped>
    .d-block
        display block

</style>