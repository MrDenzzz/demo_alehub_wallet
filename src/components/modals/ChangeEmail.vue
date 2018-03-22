<template>
    <modal name="changeemail" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Change email</p>
            <i class="close" v-if="dataProcessing" @click="closeModal"></i>
        </div>
        <div class="body">
            <div v-if="dataProcessing" class="wrap-spinner">
                <Spinner v-if="dataProcessing"/>
            </div>

            <form v-else @submit.prevent="changeEmail()">
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">2fa key</label>
                        <input
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
                                type="email"
                                class="input"
                                placeholder="Enter new email"
                                v-model="email"
                                required>
                    </div>
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
        name: "change-email-modal",
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
                if (this.token.length === 6) {
                    this.dataProcessing = true;
                    const {email, token} = this;
                    this.$store.dispatch('changeEmail', {email, token}).then(() => {
                        this.email = '';
                        this.token = '';
                        this.dataProcessing = false;
                        this.closeModal();
                        this.$parent.$emit('changeEmail', email);
                    }).catch(() => {
                        console.log('You are sent to me wrong email data');
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
        },
        create() {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>
    .wrap-spinner
        display flex
        justify-content center
        padding 0 0 2em 0
</style>