<template>
    <modal
            name="deletewallet"
            height="auto"
            class="modal-md"
            @before-close="beforeClose"
            @opened="modalOpen">
        <div class="heading">
            <p class="title">
                {{ $t('modals.deleteWallet.title') }}
            </p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <div class="modal-warning" :class="{ 'bl': consentRmWallet }">
                <p class="agreed">
                    {{ $t('modals.deleteWallet.confirm.titleStart') }} <b>{{ currentWallet.name }}</b>
                    {{ $t('modals.deleteWallet.confirm.titleEnd') }}
                </p>

                <label class="control control-checkbox">
                    <span> {{ $t('modals.deleteWallet.confirm.subtitle') }}</span>
                    <input
                            id="checkbox-access"
                            class="type_project_arr"
                            type="checkbox"
                            :checked="consentRmWallet"
                            @change="changeStatusConsentRmWallet"/>
                    <div class="control-indicator"></div>
                </label>
            </div>

            <div class="modal-control nobl" id="modal-wallet-name" @click="makeWalletNameFocus"
                 v-if="consentRmWallet">
                <div class="modal-input">
                    <label id="wallet-name-label" class="title lc">
                        {{ $t('modals.deleteWallet.fields.walletName.label') }}
                    </label>
                    <input
                            id="wallet-name-input"
                            class="input"
                            type="text"
                            :placeholder="$t('modals.deleteWallet.fields.walletName.placeholder')"
                            v-model="rmWalletName"/>
                </div>
            </div>

            <div v-if="dataProcessing" class="wrap-spinner">
                <spinner v-if="dataProcessing"/>
            </div>

            <div class="modal-btn text-center">
                <button
                        class="btn btn-default btn-large"
                        :class="{ 'disabled': dataProcessing }"
                        :disabled="dataProcessing">
                    {{ $t('modals.deleteWallet.buttons.cancel') }}
                </button>
                <button
                        id="removing-current-wallet"
                        class="btn btn-yellow btn-large"
                        :class="{ 'disabled': checkCorrectRmWallet || timer !== 0 || dataProcessing }"
                        :disabled="checkCorrectRmWallet || timer !== 0 || dataProcessing"
                        @click="removeCurrentWallet()">
                    {{ $t('modals.deleteWallet.buttons.delete') }}
                    <span v-if="timer !== 0">
                        ({{ timer }})
                    </span>
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    import sha256 from 'sha256';

    import {mapGetters} from 'vuex';

    export default {
        name: 'deletewallet',
        components: {
            Spinner
        },
        data() {
            return {
                timer: 0,
                consentRmWallet: false,
                rmWalletName: '',
                dataProcessing: false
            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'currentWallet',
                'currentWalletAddress',
                'currentWalletIndex',

                'transactions'
            ]),
            checkCorrectRmWallet: function () {
                if (this.currentWallet.name === this.rmWalletName)
                    return false;
                return true;
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide('deletewallet');
            },
            beforeClose: function () {
                this.timer = 1;
                this.consentRmWallet = false;
                this.rmWalletName = '';
            },
            modalOpen: function () {
                this.timer = 3;
                this.countDown();
            },
            countDown: function () {
                if (this.timer !== 0) {
                    setTimeout(() => {
                        this.timer--;
                        this.countDown();
                    }, 1000);
                }
            },
            changeStatusConsentRmWallet: function () {
                this.consentRmWallet = !this.consentRmWallet;
                if (this.consentRmWallet) {
                    setTimeout(() => {
                        document.getElementById('wallet-name-input').focus();
                    }, 40);
                }
            },
            makeFocusCheckbox: function () {
                document.getElementById('checkbox-access').click();
            },
            makeWalletNameFocus: function () {
                document.getElementById('wallet-name-input').focus();
            },
            changeCurrentWalletAfterDeleting: function (newIndex, oldIndex) {
                this.$store.dispatch('changeCurrentWallet',
                    this.wallets[newIndex].address
                ).then(() => {
                    this.$store.dispatch('removeWalletFromWallets',
                        oldIndex
                    ).then(() => {
                        this.$store.dispatch('removeTransactions'
                        ).then(() => {

                            this.$store.dispatch('transactionsRequestLazy',
                                this.currentWalletAddress
                            ).then(() => {

                                this.$toasted.show(`Wallet '${this.currentWallet.name}' was successfully deleted`, {
                                    duration: 5000,
                                    type: 'success',
                                });
                                this.dataProcessing = false;
                                this.$modal.hide('deletewallet');
                            }).catch(() => {
                                console.log('Error wallets request lazy');
                            });
                        }).catch(() => {
                            console.log('Error remove transactions');
                        });
                    }).catch(() => {
                        console.log('Error removing purse from wallets list');
                    });
                }).catch(() => {
                    console.log('Error changing current wallet');
                });
            },
            removeCurrentWallet: function () {
                this.dataProcessing = true;

                this.$store.dispatch('removeWallet', {
                    address: this.currentWallet.address
                }).then(() => {
                    if (this.wallets[this.currentWalletIndex + 1])
                        this.changeCurrentWalletAfterDeleting(this.currentWalletIndex + 1, this.currentWalletIndex);
                    else if (this.wallets[this.currentWalletIndex - 1])
                        this.changeCurrentWalletAfterDeleting(this.currentWalletIndex - 1, this.currentWalletIndex);
                    else if (this.wallets.length === 1) {
                        this.$store.dispatch('removeWalletFromWallets',
                            this.currentWalletIndex
                        ).then(() => {
                            this.$store.dispatch('removeTransactions'
                            ).then(() => {
                                this.$toasted.show(`Wallet '${this.currentWallet.name}' was successfully deleted`, {
                                    duration: 5000,
                                    type: 'success',
                                });
                                this.dataProcessing = false;
                                localStorage.removeItem(sha256('current-wallet'));
                                this.$router.push('/');
                                this.$modal.hide('deletewallet');
                            }).catch(() => {
                                console.log('Error reset transactions');
                            });

                        }).catch(() => {
                            console.log('Error removing wallet from wallets list');
                        });
                    }
                }).catch(() => {
                    this.dataProcessing = false;
                    this.$toasted.show(`There was an error deleting the wallet '${this.currentWallet.name}'`, {
                        duration: 10000,
                        type: 'error',
                    });
                });
            }
        },
        created() {
            document.addEventListener('keyup', (event) => {
                if (document.getElementById('removing-current-wallet')) {
                    if (event.keyCode === 32 && document.getElementById('wallet-name-input') !== document.activeElement) {
                        document.getElementById('checkbox-access').click();
                    }

                    setTimeout(() => {
                        if (event.keyCode === 13 && !document.getElementById('removing-current-wallet').disabled) {
                            document.getElementById('removing-current-wallet').click();
                        }
                    }, 40);
                }
            })
        }
    }
</script>

<style lang="stylus">
    .wrap-spinner
        display flex
        justify-content center
        padding 1em 0

    .modal-input
        input
            width 100%

    .modal-md
        .v--modal
            width 776px

    .nobl
        border-bottom none !important

    .modal-btn
        .btn-yellow
            .disabled
                opacity 0.3
                border-radius 2px
                background-color #ffd24f

                &:hover
                    cursor default

    .lc
        text-transform capitalize !important

    .modal-warning
        margin-left 24px
        margin-right 24px
        margin-top 4px

        & .agreed
            font-family MuseoSansCyrl300
            font-size 14px
            line-height 1.29
            color #34343e

            b
                font-family MuseoSansCyrl700
                font-weight bold

        .checkbox-contol
            display flex
            justify-content space-between
            align-items center

            input
                width 18px
                height 18px
                border-radius 2px
                background-color #f7f7f7
                border solid 0.5px #979797
                margin-right 18px
                cursor pointer

            span
                font-family MuseoSansCyrl300
                font-size 14px
                line-height 1.29
                color #34343e
                cursor pointer

        .bl
            border-bottom 1px solid #d1d1d1
            padding-bottom 18px

    .no-activate
        border-bottom none !important

        .modal-checkbox
            margin-bottom 0 !important

    #wallet-name-label, #modal-wallet-name
        cursor pointer

    @media (max-width: 425px)
        .modal-warning
            .checkbox-contol
                input
                    min-width 18px

</style>
