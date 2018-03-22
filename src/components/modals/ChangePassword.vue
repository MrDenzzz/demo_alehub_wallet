<template>
    <modal name="changepassword" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Change password</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <div v-if="dataProcessing" class="wrap-spinner">
                <Spinner v-if="dataProcessing"/>
            </div>

            <form v-else @submit.prevent="changePassword()">
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">Old password</label>
                        <input
                                type="password"
                                class="input"
                                placeholder="Old password"
                                v-model="oldPass"
                                required>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">New password</label>
                        <input
                                type="password"
                                class="input"
                                placeholder="New password"
                                v-model="newPass"
                                required>
                    </div>
                </div>

                <div class="modal-control no-bottom">
                    <div class="modal-input">
                        <label class="title">Repeat password</label>
                        <input
                                type="password"
                                class="input"
                                placeholder="Confirm new password"
                                v-model="confirmPass"
                                required>
                    </div>
                </div>

                <div class="modal-btn text-center">
                    <button class="btn btn-yellow btn-large" type="submit">
                        Change
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    export default {
        name: 'change-password-modal',
        components: {
            Spinner
        },
        data() {
            return {
                oldPass: '',
                newPass: '',
                confirmPass: '',
                dataProcessing: false
            }
        },
        computed: {
        },
        methods: {
            closeModal() {
                this.$modal.hide('changepassword');
            },
            changePassword: function () {
                if (this.oldPass.length >= 8 || this.newPass.length >= 8 || this.confirmPass.length >= 8) {
                    if (this.newPass.length === this.confirmPass.length) {
                        this.dataProcessing = true;
                        this.$store.dispatch('changePassword', {old: this.oldPass, new: this.newPass}).then(() => {
                            this.dataProcessing = false;
                            this.closeModal();
                            this.$parent.$emit('changePassword');
                        }).catch(() => {
                            console.log('You are sent wrong password data');
                        });
                    } else {
                        this.$toasted.show(`New password and confirmed password do not match`, {
                            duration: 10000,
                            type: 'error',
                        });
                    }
                } else {
                    this.$toasted.show(`The password must be at least 8 characters in length`, {
                        duration: 10000,
                        type: 'error',
                    });
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .wrap-spinner
        display flex
        justify-content center
        padding 0 0 2em 0
</style>

<style lang="stylus">
    @import './modals.scss';

    .modal-input
        input
            width 100%

    .modal-xs
        .v--modal-box
            width 426px !important

    .modal-btn
        .btn-yellow
            .disabled
                opacity 0.3
                border-radius 2px
                background-color #ffd24f

                &:hover
                    cursor default
</style>
