<template>
    <modal name="changeemail" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Change email</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">

            <div class="qr-code">
                <qriously :value="'123'" :size="300"/>
                <span class="muted upperCase">{{ $t('modals.request.qrShare') }}</span>
            </div>

            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">2fa key</label>
                    <input type="text" class="input" placeholder="enter secret key">
                </div>
            </div>

            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">Email</label>
                    <input type="email" class="input" placeholder="email">
                </div>
            </div>

            <div class="modal-btn text-center">
                <button class="btn btn-yellow btn-large">
                    Change
                </button>
            </div>

        </div>
    </modal>
</template>

<script>

    export default {
        name: "change-email-modal",
        components: {

        },
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {
            closeModal: function () {
                this.$modal.hide('changeemail');
            }
        },
        create() {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>

</style>