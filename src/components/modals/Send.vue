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
                            <label class="title">AMOUNT</label>
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
                            <label class="title clicked" @click="useMax">use max</label>
                        </div>
                    </div>
                    <div class="modal-control" @click="focusInput('address')">
                        <div class="modal-input">
                            <label class="title">ADDRESS</label>
                            <the-mask
                                mask="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                type="text"
                                :masked="false"
                                placeholder="Enter the address of the cryptographic wallet"
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
                            <label class="title">TOTAL</label>
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
                            Next
                        </button>
                    </div>
                </div>
                <div class="body" v-if="step == 2">
                    <div class="modal-control">
                        <div class="modal-input">
                            <p class="small">
                                You are sending
                                <vue-numeric separator="," v-model="amountAle" :precision="2"
                                             :read-only="true"></vue-numeric>
                                <span>ALC</span> <!-- (with <span>{{fees}}</span> ALC of fees) --> to
                                <span>{{address}}</span>. <!-- Type your spending password to confirm transaction. -->
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="buttons btn-yellow openModal" @click="send">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import SelectControl from "../layouts/forms/Select";
    import numeral from 'numeral';
    import {mapMutations} from "vuex";

    export default {
        name: "send",
        components: {
            SelectControl
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
                maxlength: 18
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
            ...mapMutations({
                addNewNotificaiton: "ADD_NEW_NOTIFICATION",
                toggleNotifBadge: "TOGGLE_NOTIF_BADGE"
            }),
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
                this.$toasted.show('Sending success', {
                    duration: 5000,
                    type: 'success',
                });
                if (this.nextCheck) {

                    this.$http.post(`${this.$host}/transactions/send`, {
                        walletAddress: this.currentWallet.address,
                        walletDestination: this.address,
                        count: parseInt(this.amountAle),
                    }, {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        }
                    }).then(response => {
                        this.addNewNotificaiton(response.body.model)
                        this.$socket.emit('get transactions', {sender: this.currentWallet.address, receiver: this.address});
                        let adresses = JSON.parse(localStorage.getItem('wallets'));
                        this.$socket.emit('get balance', adresses);
                    }, response => {
                        console.log('error', response);
                    });

                    this.addNewNotificaiton(`**${numeral(this.amountAle).format('0,0')}** ALE <span class="accepted">success send</span> to **${this.address}**`);
                    this.toggleNotifBadge(true);
                    this.closeModal();
                }
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

    .buttons
        &:disabled
            opacity 0.4
            border-radius 2px
            background-color #ffd24f

            &:hover
                cursor default

    .clicked
        cursor pointer

    .modal-input
        & input
            width 350px !important


    .no-spinners
        -moz-appearance textfield

    .no-spinners::-webkit-outer-spin-button,
    .no-spinners::-webkit-inner-spin-button
        -webkit-appearance none
        margin 0
</style>
