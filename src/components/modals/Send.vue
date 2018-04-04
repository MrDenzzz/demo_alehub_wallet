<template>
    <div>
        <modal name="send" height="auto" class="modal-md" @opened="resetState" :adaptive="true">
            <div @click="hideDesc">
                <div class="heading">
                    <i v-if="parseInt(step) === 2" class="back" @click="step = 1"></i>
                    <p class="title">{{ $t('modals.send.title') }}</p>
                    <i class="close" @click="closeModal"></i>
                </div>
                <div class="body" v-if="parseInt(step) === 1">
                    <div class="modal-control double" @click="focusInput('amount')">
                        <div class="modal-input">
                            <label class="title">{{ $t('modals.send.amount') }}</label>
                            <p class="count">
                                <input
                                    type="text"
                                    v-model="amountAle"
                                    id="amount"
                                    placeholder="0"
                                    @keypress="checkTypingChar"
                                    :maxlength="maxlength">
                                ALC
                            </p>
                        </div>
                    </div>
                    <div class="modal-control double">
                        <div class="modal-input">
                            <label class="title clicked" @click="useMax">{{ $t('modals.send.max') }}</label>
                        </div>
                    </div>
                    <div class="modal-control" @click="focusInput('address')">
                        <div class="modal-input address">
                            <label class="title">{{ $t('modals.send.address')}}</label>
                            <the-mask
                                mask="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                type="text"
                                :masked="false"
                                :placeholder="$t('modals.send.addressPlaceholder')"
                                class="input"
                                :class="{error:errorAddress}"
                                @keyup.enter.native="nextCheck"
                                @input="resetError('address')"
                                v-model="address"
                                id="address"
                                @paste.native="pasteHandler">
                            </the-mask>
                        </div>
                    </div>
                    <div class="modal-control last">
                        <div class="modal-input">
                            <label class="title">{{ $t('modals.send.total') }}</label>
                            <p class="total">
                                <vue-numeric :separator='correctLangSep' :decimal-separator='correctLangDecSep'
                                             :value="amountAle" :precision="correctValuePrecision"
                                             :read-only="true"></vue-numeric>
                                ALC
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="buttons btn-yellow openModal" @click="nextCheck"
                                :disabled="!amountAle || !address">
                            {{ $t('modals.send.buttons.next') }}
                        </button>
                    </div>
                </div>
                <div class="body" v-if="step === 2">
                    <div class="modal-control">
                        <div class="modal-input">
                            <p class="small">
                                {{ $t('modals.send.sendText') }}
                                <vue-numeric separator="," v-model="amountAle" :precision="2"
                                             :read-only="true"></vue-numeric>
                                <span>ALC</span> <!-- (with <span>{{fees}}</span> ALC of fees) --> {{ $t('modals.send.to') }}
                                <span>{{address}}</span>. <!-- Type your spending password to confirm transaction. -->
                            </p>
                        </div>
                    </div>

                    <div v-if="dataProcessing" class="wrap-spinner">
                        <spinner v-if="dataProcessing"/>
                    </div>

                    <div class="modal-footer">
                        <button class="buttons btn-yellow openModal" @click="send">
                            {{ $t('modals.send.buttons.send') }}
                        </button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import SelectControl from '../layouts/forms/Select';
    import Spinner from '../layouts/Spinner';

    import numeral from 'numeral';

    import sha256 from 'sha256';

    export default {
        name: "send",
        components: {
            SelectControl,
            Spinner
        },
        data() {
            return {
                amountAle: '',
                amountUsd: 161,
                step: 1,
                description: {
                    selected: false,
                    text: 'Add a note to remember what this transaction was for. Only you will see this note.'
                },
                fees: 0.02,
                address: '',
                defaultDescriptionText: 'Add a note to remember what this transaction was for. Only you will see this note.',
                selectedType: '',
                errorAddress: false,
                errorAmount: false,
                errorPassword: false,
                password: '',
                maxlength: 18,

                dataProcessing: false
            };
        },
        computed: {
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            getWalletPassword() {
                return this.$store.state.Wallets.selectedWallet.password;
            },
            getWalletId() {
                return this.$store.state.Wallets.currentWallet.id;
            },
            correctLangSep: function () {
                if (localStorage.getItem('systemLang') === 'eng')
                    return ',';
                return 'space';
            },
            correctLangDecSep: function () {
                if (localStorage.getItem('systemLang') === 'eng')
                    return '.';
                return ',';
            },
            correctValuePrecision: function () {
                if (Number(this.amountAle) % 1 !== 0) {
                    return this.amountAle.toString().split('.')[1].toString().length;
                }
                else
                    return 0;
            }
        },
        methods: {
            checkTypingChar: function (e) {
                let event = e || window.event;
                let key = event.keyCode || event.which;
                key = String.fromCharCode(key);
                let regex = /[0-9]/;
                if (key === '.')
                    this.maxlength;
                if (!regex.test(key)) {
                    event.returnValue = false;
                    if (event.preventDefault) event.preventDefault();
                }
            },
            amountEnterHandler: function () {
                let self = this;
                setTimeout(() => {
                    document.getElementById('amount').addEventListener('keypress', function (e) {
                        if (e.keyCode == 13) {
                            if (!self.address) {
                                self.focusInput('address');
                            } else {
                                self.nextCheck();
                            }
                        }
                    })
                }, 40);
            },
            resetState: function () {
                this.step = 1;
                this.amountAle = '';
                this.address = '';
                this.password = '';
                this.errorPassword = false;
                this.errorAmount = false;
                this.errorAddress = false;
                setTimeout(() => {
                    this.focusInput('amount');
                }, 100);
                this.amountEnterHandler();
            },
            pasteHandler: function () {
                setTimeout(() => {
                    this.address = document.getElementById('address').value;
                }, 100);
            },
            closeModal() {
                this.$modal.hide("send");
            },
            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            hideDesc: function (event) {
                if (event.target.id !== 'description-area' &&
                    event.target.id !== 'description' &&
                    event.target.id !== 'description-div' &&
                    event.target.id !== 'description-child' &&
                    event.target.id !== 'description-label') {
                    this.description.selected = false;
                    if (this.description.text === '') this.description.text = this.defaultDescriptionText;
                }
            },
            newSelect: function (value, id) {
                if (id === "selectFeesType") {
                    this.selectedType = value;
                }
            },
            nextCheck: function () {
                if (this.amountAle <= 0) {
                    this.$toasted.show('Transaction amount must be greater than 0', {
                        duration: 10000,
                        type: 'error',
                    });
                    this.errorAmount = true;
                    this.focusInput('amount');
                    return false;
                }

                if (this.currentWallet.balance < this.amountAle) {
                    this.$toasted.show('You can not send more coins than there are in your account', {
                        duration: 10000,
                        type: 'error',
                    });
                    this.amountAle = this.currentWallet.balance;
                    this.errorPassword = true;
                    this.focusInput('address');
                    return false;
                }

                if (!this.address) {
                    // this.isNotif = true;
                    this.errorAddress = true;
                    // this.isSuccess = false;
                    // this.notifText = 'Enter the correct wallet address';
                    // this.startNotif();
                    this.focusInput('address');
                    return false;
                }

                if (this.address === this.currentWallet.address) {
                    this.$toasted.show('You can not send tokens to yourself', {
                        duration: 10000,
                        type: 'error',
                    });
                    this.errorAddress = true;
                    this.address = '';
                    this.focusInput('address');
                    return false;
                }

                this.step = 2;
            },
            send: function () {
                if (this.nextCheck) {
                    this.dataProcessing = true;
                    this.$store.dispatch('sendCoins', {
                        walletAddress: this.currentWallet.address,
                        walletDestination: this.address,
                        count: parseInt(this.amountAle),
                    }).then(() => {

                        this.$store.dispatch('walletsRequestLazy'
                        ).then(() => {
                            this.$store.dispatch('transactionsRequestLazy',
                                this.currentWallet.address
                            ).then(() => {
                                this.$toasted.show('Sending was successful', {
                                    duration: 5000,
                                    type: 'success',
                                });

                                this.$store.dispatch('getNotifications'
                                ).then(() => {
                                    this.changeToggleNotificationBadge(true);
                                    console.log('Success getting notifications');
                                }).catch(() => {
                                    console.log('Error getting notifications');
                                });

                                this.dataProcessing = false;
                                this.closeModal();

                            }).catch(() => {
                                console.log('Moment transactions has an error');
                            });
                        }).catch(() => {
                            console.log('Lazy wallets has an error');
                        });

                    }).catch(() => {
                        this.dataProcessing = false;
                        this.closeModal();
                        this.$toasted.show('Sending failed', {
                            duration: 10000,
                            type: 'success',
                        });
                    });
                }
            },
            changeToggleNotificationBadge: function (val) {
                this.$store.dispatch('toggleNotificationBadge',
                    val
                ).then(() => {
                    console.log('Success toggle notifications badge');
                }).catch(() => {
                    console.log('Error toggle notifications badge');
                });
            },
            resetError: function (type) {
                switch (type) {
                    case 'address':
                        this.errorAddress = false;
                        break;
                    case 'amount':
                        this.errorAmount = false;
                        break;
                    case 'spending':
                        this.errorPassword = false;
                        break;
                }
            },
            useMax: function () {
                this.amountAle = this.currentWallet.balance;
                this.focusInput('address');
            }
        }
    };
</script>

<style lang="stylus">
    @import "./modals.scss"

    .wrap-spinner
        display flex
        justify-content center
        padding 1em 0

    .buttons
        &:disabled
            opacity 0.4
            border-radius 2px
            background-color #ffd24f

            &:hover
                cursor default

    .clicked
        cursor pointer

    .no-spinners
        -moz-appearance textfield

    .no-spinners::-webkit-outer-spin-button,
    .no-spinners::-webkit-inner-spin-button
        -webkit-appearance none
        margin 0

</style>
