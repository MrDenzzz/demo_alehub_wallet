<template>
    <modal name="deletewallet" height="auto" class="modal-md" @before-close="beforeClose" @opened="modalOpen">
        <div class="heading">
            <p class="title">{{ $t('modals.deleteWallet.title') }}</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">

            <div class="modal-warning" :class="{ 'bl': delWallet.isAgreed }">
                <p class="agreed">{{ $t('modals.deleteWallet.confirm.titleStart') }} <b>{{ currentWallet.name }}</b> {{
                    $t('modals.deleteWallet.confirm.titleEnd') }}</p>
                <div class="checkbox-contol">
                    <input id="checkbox-access" type="checkbox" :value="delWallet.isAgreed" @change="agreedDelete"/>
                    <span id="label-checkbox" @click="makeFocusCheckbox">{{ $t('modals.deleteWallet.confirm.subtitle') }}</span>
                </div>
            </div>

            <div class="modal-control nobl" id="modal-wallet-name" @click="makeWalletNameFocus" v-if="delWallet.isAgreed">
                <div class="modal-input">
                    <label id="wallet-name-label" class="title lc" >{{ $t('modals.deleteWallet.fields.walletName.label') }}</label>
                    <input type="text" class="input" id="wallet-name-input"
                           :placeholder="$t('modals.deleteWallet.fields.walletName.placeholder')"
                           v-model="delWalletName"/>
                </div>
            </div>

            <div class="modal-btn text-center">
                <button class="btn btn-default btn-large">{{ $t('modals.deleteWallet.buttons.cancel') }}</button>
                <button
                    class="btn btn-yellow btn-large"
                    :class="{ 'disabled': checkCorrectDeleteWallet || timer != 0 }"
                    :disabled="checkCorrectDeleteWallet || timer != 0"
                    @click="removeCurrentWallet()">
                    {{ $t('modals.deleteWallet.buttons.delete') }}
                    <span v-if="timer != 0">({{ timer }})</span>
                </button>
            </div>

        </div>
    </modal>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: 'deletewallet',
        data() {
            return {
                timer: 0,
                delWalletName: ''
            }
        },
        computed: {
            newWallets() {
                return this.$store.state.Wallets.wallets;
            },
            userId: function () {
                return localStorage.getItem('id');
            },
            currentWallet: function() {
                return this.$store.state.Wallets.currentWallet;
            },

            delWallet: function() {
                return this.$store.state.Wallets.delWalletProperty;
            },
            checkCorrectDeleteWallet: function() {
                if (this.currentWallet.name === this.delWalletName)
                    return false;
                return true;
            }
        },
        methods: {
            ...mapMutations({
                deleteWallet: "DELETE_WALLET",
                agreedDelete: "AGREED_DELETE",

                removeWallet: 'REMOVE_WALLET',
                removeOffers: 'REMOVE_OFFERS',
                changeNewWallet: 'CHANGE_NEW_WALLET',
                removeTransactions: 'REMOVE_TRANSACTIONS'
            }),
            beforeClose: function () {
                this.agreedDelete();
                this.delWalletName = '';
            },
            closeModal() {
                this.$modal.hide('deletewallet');
                this.agreedDelete();
                this.delWalletName = '';
            },
            setMnemonic(e) {
                this.setMnemonicCode(e.target.value);
            },
            countDown() {
                if (this.timer != 0) {
                    setTimeout(() => {
                        this.timer--;
                        this.countDown();
                    }, 1000);
                }
            },
            makeFocusCheckbox: function () {
                document.getElementById('checkbox-access').click();
            },
            makeWalletNameFocus: function () {
                document.getElementById('wallet-name-input').focus();
            },
            modalOpen() {
                this.timer = 10;
                this.countDown();
            },
            getFirstAnotherWallet: function (rmWalletAddress) {
                return this.newWallets.find(item => {
                    return item.address !== rmWalletAddress;
                });
            },
            removeCurrentWallet: function () {
                let rmWalletAddress = this.currentWallet.address;
                this.changeNewWallet(this.getFirstAnotherWallet(rmWalletAddress).address);
                // localStorage.setItem('walletId', this.currentWallet.id);
                let walletsLS = JSON.parse(localStorage.getItem('wallets'));
                let rmIndexLS = walletsLS.findIndex(item => {
                    return item === rmWalletAddress;
                });
                walletsLS.splice(rmIndexLS, 1);
                localStorage.setItem('wallets', JSON.stringify(walletsLS));
                this.removeWallet(rmWalletAddress);
                this.$modal.hide('deletewallet');
            }
        }
    }
</script>

<style lang="scss">
    @import './modals.scss';

    .modal-input {
        & input {
            width: 100%;
        }
    }

    .modal-md {
        & .v--modal {
            width: 776px;
        }
    }

    .nobl {
        border-bottom: none !important;
    }

    .modal-btn {
        & .btn-yellow {
            &.disabled {
                opacity: 0.3;
                border-radius: 2px;
                background-color: #ffd24f;

                &:hover {
                    cursor: default;
                }
            }
        }
    }

    .lc {
        text-transform: capitalize !important;
    }

    .modal-warning {
        margin-left: 24px;
        margin-right: 24px;
        margin-top: 4px;

        & .agreed {
            font-family: MuseoSansCyrl300;
            font-size: 14px;
            line-height: 1.29;
            color: #34343e;

            & b {
                font-family: MuseoSansCyrl700;
                font-weight: bold;
            }
        }

        & .checkbox-contol {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & input {
                width: 18px;
                height: 18px;
                border-radius: 2px;
                background-color: #f7f7f7;
                border: solid 0.5px #979797;
                margin-right: 18px;
                cursor: pointer;
            }

            & span {
                font-family: MuseoSansCyrl300;
                font-size: 14px;
                line-height: 1.29;
                color: #34343e;
                cursor: pointer;
            }
        }

        &.bl {
            border-bottom: 1px solid #d1d1d1;
            padding-bottom: 18px;
        }
    }

    .no-activate {
        border-bottom: none !important;

        & .modal-checkbox {
            margin-bottom: 0 !important;
        }
    }

    #wallet-name-label, #modal-wallet-name {
        cursor: pointer;
    }
    @media (max-width: 425px) {
        .modal-warning {
            & .checkbox-contol {
                & input {
                    min-width: 18px;
                }
            }
        }
    }
</style>
