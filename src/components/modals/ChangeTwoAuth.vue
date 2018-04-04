<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <modal name="change-two-auth" height="auto" class="modal-xs" @opened="getQr()" @before-close="resetChangeTwoAuthStatus">
        <div class="heading">
            <p class="title" v-if="!userTwoAuth">
                {{ $t('modals.changeTwoAuth.title.enable') }}
            </p>
            <p class="title" v-else>
                {{ $t('modals.changeTwoAuth.title.disable') }}
            </p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">

            <div class="qr-code" v-if="!userTwoAuth">
                <Spinner v-if="twoAuthStatus !== 'success'"/>
                <qriously
                        v-else
                        :value="qrPath"
                        :size="qrcodeWidth"/>
                <span class="warning-title">
                    {{ $t('modals.changeTwoAuth.warning') }}
                </span>
                <span
                        v-if="secret"
                        id="secret-key"
                        class="two-auth-secret upperCase">
                    {{secret}}
                </span>
            </div>

            <div class="modal-control" v-if="userTwoAuth">
                <div class="modal-input">
                    <label class="title">{{ $t('modals.changeTwoAuth.fields.secret.label') }}</label>
                    <input
                            type="text"
                            class="input"
                            :placeholder="$t('modals.changeTwoAuth.fields.secret.placeholder')"
                            v-model="secret">
                </div>
            </div>

            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">{{ $t('modals.changeTwoAuth.fields._2fa.label') }}</label>
                    <input
                            type="text"
                            class="input"
                            :placeholder="$t('modals.changeTwoAuth.fields._2fa.placeholder')"
                            v-model="token">
                </div>
            </div>

            <div class="modal-btn two-auth">
                <button
                        v-if="!userTwoAuth"
                        id="copy-secret"
                        type="button"
                        class="buttons btn-default"
                        v-clipboard:copy="copySecret()"
                        @click="successCopySecret">
                    <img class="icon-copy" :src="getIcon('tmp_copy_icon')" alt="">
                    {{ $t('modals.changeTwoAuth.buttons.copy') }}
                </button>
                <button
                        v-if="!userTwoAuth"
                        type="button"
                        class="buttons btn-yellow"
                        :class="{'disable': !checkFilledEnableTwoAuth}"
                        :disabled="!checkFilledEnableTwoAuth"
                        @click="makeEnableTwoAuth()">
                    {{ $t('modals.changeTwoAuth.buttons.enable') }}
                </button>
                <button
                        v-if="userTwoAuth"
                        type="button"
                        class="buttons btn-default"
                        :class="{'disable': !checkFilledDisableTwoAuth}"
                        :disabled="!checkFilledDisableTwoAuth"
                        @click="makeDisableTwoAuth()">
                    {{ $t('modals.changeTwoAuth.buttons.disable') }}
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
                secret: '',
                windowWidth: ''
            }
        },
        computed: {
            ...mapGetters([
                'twoAuthStatus',
                'twoAuthGeneratedCode',
                'twoAuthSecret',
                'userTwoAuth'
            ]),
            qrcodeWidth: function () {
                if (this.windowWidth <= 425)
                    return 220;
                return 300;
            },
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            checkFilledEnableTwoAuth: function () {
                if (this.token.length === 6 && this.twoAuthStatus === 'success')
                    return true;

                return false;
            },
            checkFilledDisableTwoAuth: function () {
                if (this.token.length === 6 && this.secret.length === 32)
                    return true;

                return false;
            }
        },
        methods: {
            closeModal: function () {
                this.$parent.$emit('cancelSwitchControl', this.userTwoAuth);
                this.$modal.hide('change-two-auth');
            },
            resetChangeTwoAuthStatus: function () {
                this.$store.dispatch('setChangeTwoAuthStatus',
                    this.userTwoAuth
                ).then(() => {
                    console.log('Success reset change two auth status Settings.vue')
                }).catch(() => {
                    console.log('Error reset change two auth status Settings.vue')
                });
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
                return this.secret;
            },
            successCopySecret: function () {
                this.$toasted.show('You have successfully copied the secret code', {
                    duration: 5000,
                    type: 'success',
                });
            },
            makeDisableTwoAuth: function () {
                const {token, secret} = this;
                this.$store.dispatch('disableTwoAuth', {
                    token,
                    secret
                }).then(() => {
                    this.token = '';
                    this.secret = '';
                    this.$modal.hide('change-two-auth');
                    this.$toasted.show('You have successfully DISABLED dual authentication', {
                        duration: 5000,
                        type: 'success',
                    });
                }).catch(() => {
                    this.$toasted.show('You have failed DISABLE dual authentication', {
                        duration: 10000,
                        type: 'error',
                    });
                });
            },
            makeEnableTwoAuth: function () {
                const {token, secret} = this;
                this.$store.dispatch('enableTwoAuth', {
                    token,
                    secret
                }).then(() => {
                    this.token = '';
                    this.secret = '';
                    this.qrPath = '';
                    this.$modal.hide('change-two-auth');
                    this.$toasted.show('You have successfully ENABLED dual authentication', {
                        duration: 5000,
                        type: 'success',
                    });
                }).catch(() => {
                    this.$toasted.show('You have failed ENABLE dual authentication', {
                        duration: 10000,
                        type: 'error',
                    });
                });
            },
            getIcon: function (name) {
                if (this.selectedTheme === "dark")
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === "white")
                    return require(`../../assets/img/${name}_dark.svg`);
                else
                    return require(`../../assets/img/${name}.svg`);
            }
        },
        created() {
            this.windowWidth = window.outerWidth;
            window.addEventListener('resize', (e) => {
                if (!this.windowWidth)
                    return false;
                this.windowWidth = e.target.outerWidth;
            })
        },
        mounted() {
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

        .disable
            opacity 0.4

    .modal-xs
        /*.v--modal-box*/
        /*width 500px !important*/

        .body
            .modal-btn
                .btn-large
                    padding 11px

    @media (max-width: 425px)
        .two-auth
            .btn-default
                margin-right 0

            .btn-yellow
                margin-left 0


</style>