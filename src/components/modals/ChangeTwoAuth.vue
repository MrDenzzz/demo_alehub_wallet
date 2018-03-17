<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <modal name="change-two-auth" height="auto" class="modal-xs" @opened="getQr()">
        <div class="heading">
            <p class="title" v-if="!userTwoAuth">Enable TWO AUTH</p>
            <p class="title" v-else>Disable TWO AUTH</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">

            <div class="qr-code" v-if="!userTwoAuth">
                <Spinner v-if="twoAuthStatus !== 'success'"/>
                <qriously
                        v-else
                        :value="qrPath"
                        :size="300"/>
                <span class="warning-title">Save this secret code to safe place</span>
                <span
                        v-if="secret"
                        id="secret-key"
                        class="two-auth-secret upperCase">
                    {{secret}}
                </span>
            </div>

            <div class="modal-control" v-if="userTwoAuth">
                <div class="modal-input">
                    <label class="title">Secret key</label>
                    <input type="text" class="input" placeholder="Enter your secret key" v-model="secret">
                </div>
            </div>

            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">2fa key</label>
                    <input type="text" class="input" placeholder="Enter your 2fa key" v-model="token">
                </div>
            </div>

            <div class="modal-btn two-auth">
                <button
                        v-if="!userTwoAuth"
                        id="copy-secret"
                        type="button"
                        class="buttons btn-default"
                        v-clipboard:copy="copySecret()">
                    <img class="icon-copy" src="../../assets/img/tmp_copy_icon.png" alt="">
                    Copy secret key
                </button>
                <button
                        v-if="!userTwoAuth"
                        type="button"
                        class="buttons btn-yellow"
                        @click="makeEnableTwoAuth()">
                    Enable
                </button>
                <button
                        v-if="userTwoAuth"
                        type="button"
                        class="buttons btn-default"
                        @click="makeDisableTwoAuth()">
                    Disable
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
        components: {
            Spinner
        },
        data() {
            return {
                token: '',
                qrPath: '',
                secret: ''
            }
        },
        computed: {
            ...mapGetters([
                'twoAuthStatus',
                'twoAuthGeneratedCode',
                'twoAuthSecret',
                'userTwoAuth'
            ])
        },
        methods: {
            closeModal: function () {
                this.$parent.$emit('cancelSwitchControl', this.userTwoAuth);
                this.$modal.hide('change-two-auth');
            },
            getQr: function () {
                if (!this.userTwoAuth) {
                    this.$store.dispatch('twoAuthRequest').then(() => {
                        this.qrPath = decodeURIComponent(this.twoAuthGeneratedCode);
                        this.secret = this.twoAuthSecret;
                    });
                }
            },
            copySecret: function () {
                if (this.secret.length > 0) {
                    return this.secret;
                }
            },
            makeDisableTwoAuth: function () {
                const {token, secret} = this;
                this.$store.dispatch('disableTwoAuth', {token, secret}).then(() => {
                    console.log('disable two auth done');
                });
            },
            makeEnableTwoAuth: function () {
                this.$modal.hide('change-two-auth');
                const {token, secret} = this;
                this.$store.dispatch('enableTwoAuth', {token, secret}).then(() => {
                    this.secret = '';
                    this.qrPath = '';
                });
            }
        },
        created() {

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

<style lang="stylus">
    .warning-title
        font-weight 700

    .two-auth-secret
        margin-top 12px
        margin-bottom 18px

    .two-auth
        display flex
        justify-content space-around
        margin-right 24px
        margin-left 24px

        .buttons
            flex-grow 1

        .btn-default
            display flex
            align-content center
            justify-content center
            margin-right 4px

            .icon-copy
                height 19px
                margin-right 5px

        .btn-yellow
            margin-left 4px

    .modal-xs
        /*.v--modal-box*/
        /*width 500px !important*/

        .body
            .modal-btn
                .btn-large
                    padding 11px
</style>