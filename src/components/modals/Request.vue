<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <modal name="request"
           height="auto"
           class="modal-md request"
           @opened="focusButton()">

        <div class="heading">
            <p class="title">
                {{ $t('modals.request.title') }}
            </p>
            <i class="close"
               @click="closeModal('request')">
            </i>
        </div>
        <div class="body">
            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">
                        {{ $t('modals.request.receiver') }}
                    </label>
                    <p class="address" id="accountAddress">
                        {{ currentWalletAddress }}
                    </p>
                </div>
            </div>

            <div class="qr-code">
                <qriously :value="currentWalletAddress"
                          :size="widthCanvas"/>
                <span class="muted upperCase">
                    {{ $t('modals.request.qrShare') }}
                </span>
            </div>

            <div class="modal-footer">
                <button id="btnCopyAddress"
                        class="buttons btn-yellow"
                        v-clipboard:copy="currentWalletAddress"
                        v-clipboard:success="successCopyAddress">
                    {{ $t('modals.request.button') }}
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: 'request',
        computed: {
            getCurrentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            widthCanvas: function () {
                if (window.screen.width <= 350)
                    return 240;
                else
                    return 300
            },
            currentWalletAddress: function () {
                if (this.getCurrentWallet !== null)
                    return this.getCurrentWallet.address;
                return 0;
            }
        },
        methods: {
            closeModal: function (name) {
                this.$modal.hide(name);
            },
            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            successCopyAddress: function () {
                this.$parent.$emit('successCopyAddress');
            },
            focusButton: function () {
                document.getElementsByTagName('html')[0].addEventListener('keyup', function (e) {
                    if (!document.getElementById('btnCopyAddress'))
                        return false;

                    if (e.key === 'Enter') {
                        document.getElementById('btnCopyAddress').click();
                    }
                })
            }
        }
    };
</script>

<style lang="stylus">
    @import "./modals.scss";

    .modal-control
        .address
            font-family MuseoSansCyrl500
            font-size 14px
            font-weight 500
            line-height 1.29
            color #34343e
            word-break break-all

    .qr-code
        .upperCase
            text-transform uppercase
            font-weight bold

    .modal-md
        .v--modal
            width 620px !important

    .v--modal-overlay
        .v--modal-background-click
            padding-bottom 0 !important
</style>
