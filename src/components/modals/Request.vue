<template>
    <modal name="request" height="auto" class="modal-md" @opened='focusButton()'>
        <div class="heading">
            <p class="title">{{ $t('modals.request.title') }}</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">{{ $t('modals.request.receiver') }}</label>
                    <p class="address" id="accountAddress">{{ getCurrentWalletAddress }}</p>
                </div>
            </div>

            <div class="qr-code">
                <qriously :value="getCurrentWalletAddress" :size="300"/>
                <span class="muted upperCase">{{ $t('modals.request.qrShare') }}</span>
            </div>

            <div class="modal-footer">
                <button class="buttons btn-yellow" id="btnCopyAddress" v-clipboard:copy="getCurrentWalletAddress" v-clipboard:success="successCopyAddress">
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
            getCurrentWalletAddress: function () {
                if (this.getCurrentWallet !== null)
                    return this.getCurrentWallet.address;
                return 0;
            }
        },
        methods: {
            closeModal() {
                this.$modal.hide("request");
            },
            focusInput(id) {
                document.getElementById(id).focus();
            },
            successCopyAddress() {
                this.$parent.$emit('successCopyAddress', this.getCurrentWalletAddress);
            },
            focusButton() {
                document.getElementsByTagName('html')[0].addEventListener('keyup', function(e) {
                    if (!document.getElementById('btnCopyAddress')) return false;
                    if (e.key === 'Enter') document.getElementById('btnCopyAddress').click();
                })
            }
        }
    };
</script>

<style lang="scss">
    @import "./modals.scss";

    .modal-control {
        & .address {
            font-family: MuseoSansCyrl500;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.29;
            color: #34343e;
            word-break: break-all;
        }
    }
    .qr-code {
        & .upperCase {
            text-transform: uppercase;
            font-weight: bold;
        }
    }
</style>
