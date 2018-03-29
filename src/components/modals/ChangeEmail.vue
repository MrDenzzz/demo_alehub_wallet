<template>
    <modal name="changeemail" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Change email</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <form @submit.prevent="changeEmail()">
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">2fa key</label>
                        <input
                                id="twoauth-change-email"
                                type="number"
                                class="input"
                                placeholder="Enter 2fa code"
                                v-model="token"
                                required>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">Email</label>
                        <input
                                id="email-change-email"
                                type="email"
                                class="input"
                                placeholder="Enter new email"
                                v-model="email"
                                required>
                    </div>
                </div>

                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner v-if="dataProcessing" />
                </div>

                <div class="modal-btn text-center">
                    <button type="submit" class="btn btn-yellow btn-large">
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
        name: 'change-email-modal',
        components: {
            Spinner
        },
        data() {
            return {
                email: '',
                token: '',
                dataProcessing: false
            }
        },
        computed: {},
        methods: {
            closeModal: function () {
                this.$modal.hide('changeemail');
            },
            changeEmail: function () {
                if (this.token.length === 6 && this.email.length !== 0) {
                    this.dataProcessing = true;
                    document.getElementById('twoauth-change-email').disabled = true;
                    document.getElementById('email-change-email').disabled = true;
                    const {email, token} = this;
                    this.$store.dispatch('changeEmail', {
                        email, token
                    }).then(() => {
                        this.email = '';
                        this.token = '';
                        this.dataProcessing = false;
                        this.closeModal();
                        this.$toasted.show(`Confirmation of the change of email was sent to this address '${this.email}'`, {
                            duration: 5000,
                            type: 'success',
                        });
                        this.$parent.$emit('changeEmail', email);
                    }).catch((err) => {
                        this.email = '';
                        this.token = '';
                        this.$toasted.show(`You are sent to me wrong email data`, {
                            duration: 10000,
                            type: 'error',
                        });
                        this.dataProcessing = false;
                    });
                } else {
                    this.email = '';
                    this.token = '';
                    this.$toasted.show(`The 2fa code length must be 6 digits`, {
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