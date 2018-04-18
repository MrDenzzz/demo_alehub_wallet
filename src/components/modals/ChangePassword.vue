<template>
    <modal name="change-password" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">{{ $t('modals.changePassword.title') }}</p>
            <i class="close" @click="closeModal('change-password')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="changePassword()">
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.changePassword.fields._2fa.label') }}</label>
                        <input
                                type="number"
                                class="input"
                                :placeholder="$t('modals.changePassword.fields._2fa.placeholder')"
                                v-model="token"
                                required>
                    </div>
                </div>
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.changePassword.fields.oldPass.label') }}</label>
                        <input
                                type="password"
                                class="input"
                                :placeholder="$t('modals.changePassword.fields.oldPass.placeholder')"
                                v-model="oldPass"
                                required>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.changePassword.fields.newPass.label') }}</label>
                        <input
                                type="password"
                                class="input"
                                :placeholder="$t('modals.changePassword.fields.newPass.placeholder')"
                                v-model="newPass"
                                required>
                    </div>
                </div>

                <div class="modal-control no-bottom">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.changePassword.fields.confirmPass.label') }}</label>
                        <input
                                type="password"
                                class="input"
                                :placeholder="$t('modals.changePassword.fields.confirmPass.placeholder')"
                                v-model="confirmPass"
                                required>
                    </div>
                </div>

                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner />
                </div>

                <div class="modal-btn text-center">
                    <button class="btn btn-yellow btn-large" type="submit">
                        {{ $t('modals.changePassword.buttons.change') }}
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
                token: '',
                oldPass: '',
                newPass: '',
                confirmPass: '',
                dataProcessing: false
            }
        },
        computed: {
        },
        methods: {
            closeModal: function (nameModal) {
                this.$modal.hide(nameModal);
            },
            changePassword: function () {
                if (this.oldPass.length >= 8 || this.newPass.length >= 8 || this.confirmPass.length >= 8) {
                    if (this.newPass.length === this.confirmPass.length) {
                        this.dataProcessing = true;
                        this.$store.dispatch('changePassword', {
                            token: this.token,
                            old: this.oldPass,
                            new: this.newPass
                        }).then(() => {
                            this.token = '';
                            this.oldPass = '';
                            this.newPass = '';
                            this.confirmPass = '';
                            this.dataProcessing = false;
                            this.$toasted.show(this.$t("modals.success.changePass"), {
                                duration: 5000,
                                type: 'success',
                            });
                            this.closeModal();
                        }).catch(() => {
                            this.token = '';
                            this.oldPass = '';
                            this.newPass = '';
                            this.confirmPass = '';
                            this.dataProcessing = false;
                            this.$toasted.show(this.$t("modals.error.projectData"), {
                                duration: 5000,
                                type: 'error',
                            });
                        });
                    } else {
                        this.$toasted.show(this.$t("modals.error.differentPass"), {
                            duration: 10000,
                            type: 'error',
                        });
                    }
                } else {
                    this.$toasted.show(this.$t("modals.error.lengthPass"), {
                        duration: 10000,
                        type: 'error',
                    });
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button
        -webkit-appearance none
        margin 0

    .wrap-spinner
        display flex
        justify-content center
        padding 1em 0
</style>

<style lang="stylus">
    @import './modals.scss';

    .modal-input
        input
            width 100%

    .modal-xs
        .v--modal-box
            width 426px 

    .modal-btn
        .btn-yellow
            .disabled
                opacity 0.3
                border-radius 2px
                background-color #ffd24f

                &:hover
                    cursor default

    @media(max-width: 425px)
        .v--modal-overlay
            .v--modal-box
                .body
                    .modal-control
                        .modal-input
                            .title
                                padding-right 0
                                padding-bottom 0

                            .input
                                text-align right
                                 
    @media(max-width: 320px)
        .v--modal-overlay
            .v--modal-box
                .body
                    .modal-control
                        .modal-input
                            display flex 
                            flex-direction column
                            align-items flex-start

                            .title
                                padding-right 0
                                padding-bottom 10px

                            .input
                                text-align left 
</style>
