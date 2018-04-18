<template>
    <modal name="changeemail" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">{{ $t('modals.changeEmail.title') }}</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <form @submit.prevent="changeEmail()">
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.changeEmail.fields._2fa.label') }}</label>
                        <input
                                id="twoauth-change-email"
                                type="number"
                                class="input"
                                :placeholder="$t('modals.changeEmail.fields._2fa.placeholder')"
                                v-model="token"
                                required>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.changeEmail.fields.newEmail.label') }}</label>
                        <input
                                id="email-change-email"
                                type="email"
                                class="input"
                                :placeholder="$t('modals.changeEmail.fields.newEmail.placeholder')"
                                v-model="email"
                                required>
                    </div>
                </div>

                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner/>
                </div>

                <div class="modal-btn text-center">
                    <button
                            type="submit"
                            class="btn btn-yellow btn-large"
                            :class="{ 'disabled': !checkFilledChangeEmail || dataProcessing }"
                            :disabled="!checkFilledChangeEmail || dataProcessing">
                        {{ $t('modals.changeEmail.buttons.change') }}
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    export default {
        name: 'change-email-modal',
        components: {
            Spinner
        },
        data() {
            return {
                token: '',
                email: '',
                dataProcessing: false
            }
        },
        computed: {
            checkFilledChangeEmail: function () {
                if (this.token.length === 6 && this.email.length !== 0)
                    return true;

                return false;
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide('changeemail');
            },
            changeEmail: function () {
                if (this.token.length === 6 && this.email.length !== 0) {
                    this.dataProcessing = true;
                    document.getElementById('twoauth-change-email').disabled = true;
                    document.getElementById('email-change-email').disabled = true;
                    const {token, email} = this;

                    this.$store.dispatch('changeEmail', {
                        token,
                        email
                    }).then(() => {
                        this.email = '';
                        this.token = '';
                        this.dataProcessing = false;
                        document.getElementById('twoauth-change-email').disabled = false;
                        document.getElementById('email-change-email').disabled = false;
                        this.closeModal();
                        this.$toasted.show(this.$t('modals.success.changeMail')+this.email, {
                            duration: 10000,
                            type: 'success',
                        });
                        this.$parent.$emit('changeEmail', email);
                    }).catch((err) => {
                        this.email = '';
                        this.token = '';
                        this.$toasted.show(this.$t('modals.success.wrongMail'), {
                            duration: 10000,
                            type: 'error',
                        });
                        this.dataProcessing = false;
                    });
                } else {
                    this.email = '';
                    this.token = '';
                    this.$toasted.show(this.$t('modals.success.lenght2faCheck'), {
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

    .disabled
        opacity 0.4
</style>