<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <modal name="request" height="auto" class="modal-md request" @opened="focusButton()">
        <div class="heading">
            <p class="title">{{ $t('modals.request.title') }}</p>
            <i class="close" @click="closeModal('request')"></i>
        </div>
        <div class="body">
            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">{{ $t('modals.request.receiver') }}</label>
                    <p class="address" id="accountAddress">{{ currentWalletAddress }}</p>
                </div>
            </div>

            <div class="qr-code">
                <qriously :value="currentWalletAddress" :size="widthCanvas"/>
                <span class="muted upperCase">{{ $t('modals.request.qrShare') }}</span>
            </div>
            <!--z-->
            <div class="modal-footer">
                <button
                        id="btnCopyAddress"
                        class="buttons btn-yellow copy"
                        v-clipboard:copy="currentWalletAddress"
                        v-clipboard:success="successCopyAddress">
                    <img class="icon-copy icon"
                         width="20"
                         height="20"
                         :src="getIcon('tmp_copy_icon')"/>
                    {{ $t('modals.request.button') }}
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "request",
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
            },
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
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
            },
            // z
            getIcon: function (name) {
                if (this.selectedTheme === "dark")
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === "white")
                    return require(`../../assets/img/${name}_dark.svg`);
                else return require(`../../assets/img/${name}.svg`);
            }
        }
    };
</script>

<style lang="stylus">
    @import "./modals.scss";
    /*z*/
    .copy
        display: flex
        justify-content center !important
    .modal-footer
        display: flex;
        justify-content: center;
    .icon-copy
        justify-content: center;
        align-items: center;


    /*z*/

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
