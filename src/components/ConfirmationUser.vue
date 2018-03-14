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
                                    <label for="confirmUserInput">Confirmation user code</label>
                                    <!--<textarea-->
                                            <!--name=""-->
                                            <!--id="confirmUserInput"-->
                                            <!--rows="10"-->
                                            <!--v-model="confirmUser"-->
                                    <!--&gt;-->
                                    <!--</textarea>-->

                                    <TextareaControl
                                            textarea-id="confirmUserInput"
                                            placeholder="Enter code from your email"
                                    />
                                    <!--:input-value="confirmUser"-->
                                    <!--<the-mask-->
                                            <!--mask="######"-->
                                            <!--class="d-block"-->
                                            <!--placeholder="code"-->
                                            <!--type="text"-->
                                            <!--id="confirmUserInput"-->
                                            <!--:class="{error:isErrorCode}"-->
                                            <!--@input.native="resetError()"-->
                                            <!--v-model="confirmUser"-->
                                    <!--/>-->
                                    <!--@keyup.enter.native="checkConfirmationUser()"-->
                                </div>

                                <div class="btn-control">
                                    <router-link
                                            :to="{ path: '/login' }"
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
    import TextareaControl from './layouts/forms/TextareaControl';

    export default {
        name: 'confirmation-email',
        components: {
            Navbar,
            TextareaControl
        },
        data() {
            return {
                isErrorCode: false,
                confirmUserCode: ''
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



                // /users/confirm-reg
                // body => confirmLink

                console.log(this.confirmUserCode, 'this.confirmUserCode');

                this.$http.post(`${this.$host}/users/confirm-reg`, {
                    confirmLink: this.confirmUserCode,
                }, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    console.log(response);
                    // return this.$router.push('/registration/confirmationuser');
                }, response => {
                    console.log('error', response);
                });

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

            this.$on('getConfirmationUserCode', function (code) {
                this.confirmUserCode = code;
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .d-block
        display block

</style>