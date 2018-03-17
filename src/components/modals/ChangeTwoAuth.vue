<template>
    <modal name="change-two-auth" height="auto" class="modal-xs" @opened="getQr()">
        <div class="heading">
            <p class="title">Enable TWO AUTH</p>
            <!--<p class="title">Disable TWO AUTH</p>-->
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">

            <div class="qr-code" v-if="twoauthStatus">
                <Spinner v-if="this.twoAuthStatus !== 'success'" />
                <qriously
                        v-else
                        :value="qrPath"
                        :size="300"/>
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
    import Spinner from '../layouts/Spinner';

    import {mapGetters} from 'vuex';

    export default {
        name: "change-two-auth-modal",
        props: {
            twoauthStatus: {
                type: [Boolean, String],
                required: true
            }
        },
        components: {
            Spinner
        },
        data() {
            return {
                qrPath: '',
            }
        },
        computed: {
            ...mapGetters([
                'twoAuthStatus',
                'twoAuthGeneratedCode',
                'twoAuthSecret'
            ])

        },
        methods: {
            closeModal: function () {
                this.$modal.hide('change-two-auth');
            },
            getQr: function () {
                if (this.twoauthStatus) {
                    this.$store.dispatch('twoauthRequest').then(() => {
                        // console.log('success get twoauthcode');
                        console.log(this.twoAuthStatus, 'this.twoAuthStatus');
                        console.log(decodeURIComponent(this.twoAuthGeneratedCode), 'this.twoAuthGeneratedCode');
                        console.log(this.twoAuthSecret, 'this.twoAuthSecret');

                        this.qrPath = decodeURIComponent(this.twoAuthGeneratedCode);
                    });
                } else {
                    console.log('qr is not need');
                }
            }
        },
        create() {

        },
        mounted() {
            // this.$store.dispatch('twoauthRequest').then(() => {
            //     console.log('success get twoauthcode');
            // });
        }
    }
</script>

<style lang="stylus" scoped>

</style>