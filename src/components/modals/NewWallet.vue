<template>
    <modal name="newwallet" height="auto" class="modal-md" :clickToClose="isCloseModal" @opened="modalOpen">
        <div class="heading" v-if="newWalletStep === 1">
            <p class="title">{{ dropDownOption[0].title }}</p>
            <!--<p class="title title-expand" @click="openDropDown">{{ modalTitle }}<i class="arrow"></i></p>-->
            <i class="close" @click="closeModal" v-if="isCloseModal"></i>
            <!--<div class="dropdown-list list-select" v-show="isOpenOptions">-->
                <!--<ul>-->
                    <!--<li v-for="(option, optionIndex) in dropDownOption" :class="{ 'selected': option.isSelected }"-->
                        <!--@click="changeType(optionIndex)">-->
                        <!--{{ option.title }}-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</div>-->
        </div>

        <div class="heading" v-if="newWalletStep !== 1">
            <i class="back" @click="changeRecoveryStep"></i>
            <p class="title">{{ $t('modals.newWallet.recovery.phrase.title') }}</p>
            <i class="close" @click="closeModal" v-if="isCloseModal"></i>
        </div>

        <div v-if="newWalletStep === 1">

            <div class="body" v-if="walletType === 'new'">
                <!--<div class="modal-control" @click="focusInput('newWalletName')">-->
                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.newWallet.new.fields.title.label') }}</label>
                        <input id="newWalletName" type="text" class="input" v-model="walletName1"
                               :placeholder="$t('modals.newWallet.new.fields.title.placeholder')"
                               @keyup.enter="changeStepCreate('next')">
                    </div>
                </div>

                <div class="modal-btn text-center">
                    <button
                            class="btn btn-yellow btn-large"
                            @click="changeStepCreate('next')"
                            :disabled="checkNewWalletFields"
                            :class="{ 'disabled': checkNewWalletFields }"
                    >
                        {{ $t('modals.newWallet.new.button') }}
                    </button>
                </div>
            </div>

            <div class="body" v-if="walletType === 'import'">

                <div class="modal-control" @click="focusInput('redemptionWalletName')">
                    <div class="modal-input">
                        <label class="title">{{ $t('modals.newWallet.import.fields.title.label') }}</label>
                        <input
                                type="text"
                                id="redemptionWalletName"
                                class="input"
                                :placeholder="$t('modals.newWallet.import.fields.title.placeholder')"
                                v-model="walletName1"
                        />
                    </div>
                </div>

                <div class="modal-control" @click="focusInput('redemptionKey')">
                    <div class="modal-input input-phrase">
                        <label class="title">{{ $t('modals.newWallet.import.fields.mnemonic.label') }}</label>
                        <div class="badge-control" v-if="mnemonicsRecovery.length !== 0">
                            <span class="badge" v-for="mnemonic in mnemonicsRecovery">{{ mnemonic }}</span>
                        </div>
                        <input
                                type="text"
                                class="input"
                                id="redemptionKey"
                                placeholder="Mnemonic phrase"
                                v-on:keyup.188="addMnemonic"
                                v-model="mnemonicFieldRecovery"
                                @keyup.enter="addMnemonicRecovery"
                                @keyup.delete="removeMnemonicRecovery"
                                @keyup.space="addMnemonicRecovery"
                                @blur="onBlurNewWallet"
                        />
                    </div>
                </div>

                <div class="modal-btn text-center">
                    <button
                            class="btn btn-yellow btn-large"
                            @click="importWallet()"
                            :disabled="isImport"
                            :class="{ 'disabled': isImport }"
                    >
                        {{ $t('modals.newWallet.import.button') }}
                    </button>
                </div>
            </div>

        </div>

        <div v-if="newWalletStep === 2 && recoveryStep === 1">
            <div class="modal-warning">
                <p class="agreed">{{ $t('modals.newWallet.recovery.phrase.text') }}</p>

                <label class="control control-checkbox">
                    <span>{{ $t('modals.newWallet.recovery.phrase.checkbox') }}</span>
                    <input type="checkbox" class="type_project_arr" v-model="isAgreedRecovery"/>
                    <div class="control-indicator"></div>
                </label>

            </div>

            <div class="modal-btn text-center">
                <button
                        class="btn btn-yellow btn-large btn-bottom btn-timer"
                        :disabled="countTimer || !isAgreedRecovery"
                        :class="{ 'disabled': countTimer !== 0 || !isAgreedRecovery }"
                        @click="getRandomSeed()">
                    {{ $t('modals.newWallet.recovery.phrase.btn') }} <span
                        v-if="countTimer !== 0">({{ countTimer }})</span>
                </button>
            </div>
        </div>

        <div v-if="newWalletStep === 2 && recoveryStep === 2">
            <div class="modal-warning">
                <p class="agreed">{{ $t('modals.newWallet.recovery.mnemonic.text') }}</p>
            </div>

            <div class="phrase">
                <span v-for="mnemonic in recoveryMnemonicPhrase">{{ mnemonic }} </span>
            </div>

            <div class="modal-btn text-center">
                <button class="btn btn-yellow btn-large btn-bottom" @click="changeRecoveryStep('next')">
                    {{ $t('modals.newWallet.recovery.mnemonic.btn') }}
                </button>
            </div>

        </div>

        <div v-if="newWalletStep === 2 && recoveryStep === 3" class="body">

            <div class="modal-warning agreed-border">
                <p class="agreed">
                    {{ $t('modals.newWallet.recovery.finish.each') }}
                </p>
            </div>

            <div class="modal-control modal-control-noMargin">
                <div class="modal-input input-phrase">
                    <label class="title">
                        {{ $t('modals.newWallet.recovery.finish.fields.phrase.title') }}
                    </label>
                    <div class="badge-control" v-if="mnemonicsRecovery.length !== 0">
                        <span class="badge" v-for="mnemonic in mnemonicsRecovery">{{ mnemonic }}</span>
                    </div>
                    <input
                            type="text"
                            class="input"
                            :placeholder="$t('modals.newWallet.recovery.finish.fields.phrase.placeholder')"
                            v-on:keyup.188="addMnemonicRecovery"
                            v-model="mnemonicFieldRecovery"
                            @keyup.enter="addMnemonicRecovery"
                            @keyup.delete="removeMnemonicRecovery"
                            @keyup.space="addMnemonicRecovery"
                            @blur="recoveryBlur"
                    />
                </div>
            </div>

            <div class="modal-warning">

                <label class="control control-checkbox">
                    <span>{{ $t('modals.newWallet.recovery.finish.fields.deviceOnly') }}</span>
                    <input type="checkbox" class="type_project_arr" v-model="restorationAgreements.deviceOnly"/>
                    <div class="control-indicator"></div>
                </label>

                <label class="control control-checkbox">
                    <span>{{ $t('modals.newWallet.recovery.finish.fields.secure') }}</span>
                    <input type="checkbox" class="type_project_arr" v-model="restorationAgreements.phraseSecure"/>
                    <div class="control-indicator"></div>
                </label>

            </div>

            <div class="modal-btn text-center">
                <button
                        class="btn btn-default btn-large"
                        :class="{ 'disabled': mnemonicsRecovery.length === 0 }"
                        @click="clearRecoveryPhrase"
                        :disabled="mnemonicsRecovery.length === 0"
                >
                    {{ $t('modals.newWallet.recovery.finish.btn.clear') }}
                </button>
                <button
                        class="btn btn-yellow btn-large"
                        :class="{ 'disabled': isConfirmRecovery }"
                        :disabled="isConfirmRecovery"
                        @click="newCreateWallet"
                >
                    {{ $t('modals.newWallet.recovery.finish.btn.confirm') }}
                </button>
            </div>

        </div>

    </modal>
</template>

<script>
    import {mapMutations} from "vuex";
    import {mapGetters} from 'vuex';
    import mnGen from 'mngen';
    import sha256 from 'sha256';

    export default {
        name: 'newWallet',
        data() {
            return {
                walletType: 'new',
                isOpenOptions: false,
                walletName1: '',
                dropDownOption: [
                    {title: this.$t('modals.newWallet.new.label'), isSelected: true, value: 'new'},
                    // {title: this.$t('modals.newWallet.import.label'), isSelected: false, value: 'import'}
                ],
                redemtionKey: '',
                newWalletStep: 1,
                countTimer: 3,
                isAgreedRecovery: false,
                recoveryStep: 1,
                mnemonics: [],
                mnemonicField: '',
                recoveryMnemonicPhrase: '',
                mnemonicFieldRecovery: '',
                mnemonicsRecovery: [],
                restorationAgreements: {
                    deviceOnly: false,
                    phraseSecure: false
                }
            }
        },
        computed: {
            ...mapGetters([
                'checkNewWalletMatchPassword'
            ]),
            isImport() {
                if (this.mnemonicsRecovery.length === 0 || this.walletName1 === '') return true;
                return false;
            },
            isConfirmRecovery() {
                if (this.restorationAgreements.deviceOnly === false || this.restorationAgreements.phraseSecure === false || JSON.stringify(this.mnemonicsRecovery) !== JSON.stringify(this.recoveryMnemonicPhrase)) return true;
                return false;
            },
            newWallets() {
                return this.$store.state.Wallets.newWallet
            },
            modalTitle() {
                let type = this.dropDownOption.filter(item => {
                    return item.isSelected
                });
                return type[0].title;
            },
            checkNewWalletFields() {
                if (this.walletName1.length === 0) {
                    return true;
                }
                return false;
            },
            isCloseModal() {
                if (this.$store.state.Wallets.currentWallet == null) return false;
                return true;
            },
            getUserId() {
                return localStorage.getItem('id');
            },
            getUserWallets() {
                return this.$store.state.Wallets.wallets.filter(item => {
                    return parseInt(item.ownerId) === parseInt(this.getUserId);
                });
            },
            getCurrentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            }
        },
        methods: {
            ...mapMutations({
                walletName: "NEW_WALLET_NAME",
                activityChecked: "CHECKED_ACTIVITY",
                walletPassword: "NEW_WALLET_PASSWORD",
                walletRepeatPassword: "WALLET_REPEAT_PASSWORD",
                createNewWallet: "CREATE_NEW_WALLET",
                createNewNewWallet: "CREATE_NEW_NEW_WALLET"
            }),
            getRandomSeed: function () {
                this.$http.get(`${this.$host}/wallet/seed`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    this.recoveryMnemonicPhrase = response.body.seed;
                    this.changeRecoveryStep('next');
                }, response => {
                    console.log('error', response);
                });
            },
            recoveryBlur() {
                this.mnemonicFieldRecovery = '';
            },
            onBlurNewWallet() {
                this.mnemonicField = '';
            },
            clearRecoveryPhrase() {
                this.mnemonicsRecovery = [];
            },
            changeRecoveryStep(step) {
                if (step === 'next') {
                    return this.recoveryStep = this.recoveryStep + 1;
                }
                if (this.recoveryStep === 1 && step !== 'next') {
                    this.newWalletStep = 1;
                }
                else this.recoveryStep = this.recoveryStep - 1;
            },
            removeMnemonicRecovery() {
                if (this.mnemonicFieldRecovery !== '' || this.mnemonicsRecovery.length === '') return false;
                this.mnemonicFieldRecovery = this.mnemonicsRecovery[this.mnemonicsRecovery.length - 1];
                this.mnemonicsRecovery.pop();
            },
            removeMnemonic() {
                if (this.mnemonics.length === 0 || this.mnemonicField !== '') return false;
                this.mnemonicField = this.mnemonics[this.mnemonics.length - 1];
                this.mnemonics.pop();
            },
            addMnemonic() {
                let newMnemonic = this.mnemonicField.replace(/,/g, '');
                if (newMnemonic === '') return false;
                this.mnemonics.push(newMnemonic);
                this.mnemonicField = '';
            },
            addMnemonicRecovery() {
                let newMnemonic = this.mnemonicFieldRecovery.replace(/,/g, ' ');
                if (newMnemonic === '') return false;
                for (let i = 0; i < newMnemonic.split(' ').length; i++) {
                    if (newMnemonic.split(' ')[i] !== '') this.mnemonicsRecovery.push(newMnemonic.split(' ')[i]);
                }
                this.mnemonicFieldRecovery = '';
            },
            countDown() {
                if (this.countTimer !== 0) {
                    setTimeout(() => {
                        this.countTimer--;
                        this.countDown();
                    }, 1000);
                }
            },
            changeStepCreate(step) {
                if (step === 'next') this.newWalletStep = this.newWalletStep + 1;
                else this.newWalletStep = this.newWalletStep - 1;
                if (this.newWalletStep === 2) {
                    this.countTimer = 3;
                    this.countDown();
                    this.recoveryStep = 1;
                    this.isAgreedRecovery = false;
                }
            },
            focusInput: function (id) {
                // setTimeout(() => {
                document.getElementById(id).focus();
                // }, 40);
            },
            openDropDown() {
                this.isOpenOptions = !this.isOpenOptions;
            },
            changeType(index) {
                for (let i = 0; i < this.dropDownOption.length; i++) {
                    this.dropDownOption[i].isSelected = false;
                }
                this.mnemonics = [];
                this.mnemonicField = '';
                this.walletName1 = '';
                this.dropDownOption[index].isSelected = true;
                this.isOpenOptions = false;
                this.walletType = this.dropDownOption[index].value;
                if (this.walletType === 'new')
                    this.focusInput('newWalletName');
                if (this.walletType === 'redemption')
                    this.focusInput('redemptionWalletName');
            },
            changePassword(e) {
                this.walletPassword(e.target.value);
            },
            closeModal() {
                this.$modal.hide('newwallet');
            },
            modalOpen() {
                this.walletType = 'new';
                this.newWalletStep = 1;
                this.recoveryStep = 1;
                this.isOpenOptions = false;
                //this.activityChecked(false);
                //this.walletName('');
                for (let i = 0; i < this.dropDownOption.length; i++) {
                    this.dropDownOption[i].isSelected = false;
                }
                this.dropDownOption[0].isSelected = true;
                this.walletName1 = '';
                this.focusInput('newWalletName');
                this.redemtionKey = '';
                this.newWalletStep = 1;
                this.countTimer = 3;
                this.isAgreedRecovery = false;
                this.recoveryStep = 1;
                this.mnemonics = [];
                this.mnemonicField = '';
                this.recoveryMnemonicPhrase = mnGen.list(10);
                this.mnemonicFieldRecovery = '';
                this.mnemonicsRecovery = [];
                this.restorationAgreements.deviceOnly = false;
                this.restorationAgreements.phraseSecure = false;
            },

            saveDataToFieldLocalStorage: function (data) {
                let items = [];
                items = JSON.parse(localStorage.getItem('wallets'));
                items.push(data);
                localStorage.setItem('wallets', JSON.stringify(items));
            },
            saveDataToEmptyLocalStorage: function (data) {
                let item = [];
                item.push(JSON.parse('"' + data + '"'));
                localStorage.setItem('wallets', JSON.stringify(item));
            },

            newCreateWallet: function () {

                this.$store.dispatch('newWallet', {
                        name: this.walletName1,
                        seed: this.mnemonicsRecovery
                    }
                ).then(() => {

                });


                this.closeModal();
            },


            importWallet() {
                if (!this.walletName1) {
                    this.focusInput('redemptionWalletName');
                    return false;
                }
                if (!this.mnemonicField) {
                    this.focusInput('redemptionKey')
                }
                this.$http.post(`${this.$host}/wallet/redeem`, {
                    seed: this.mnemonicsRecovery
                }, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {

                    this.createNewNewWallet(response.body.walletInfo);

                    if (localStorage.getItem('wallets')) {
                        this.saveDataToFieldLocalStorage(response.body.walletInfo.address);
                    } else {
                        this.saveDataToEmptyLocalStorage(response.body.walletInfo.address);
                    }
                    this.$toasted.show(`Wallet "${response.body.walletInfo.name}" successful created!`, {
                        duration: 5000,
                        type: 'success',
                    });

                    this.closeModal();

                }, response => {
                    this.$toasted.show('Wallet not found', {
                        duration: 10000,
                        type: 'error',
                    });

                    this.closeModal();
                });
            }
        },
        created() {
            let self = this;
            setTimeout(() => {
                window.onclick = function (e) {
                    let t = e.target;
                    if (t.className.indexOf('value') == -1 && t.className.indexOf('selected') == -1) {
                        let lists = document.getElementsByClassName('list-select');
                        for (let i = 0; i < lists.length; i++) {
                            lists[i].style.display = 'none';
                        }
                    }
                }
            }, 5);
        }
    }
</script>

<style lang="scss" scoped>

    // .input-phrase {
    //     display: flex;
    //     align-items: center;
    //     justify-content: flex-start;
    // }

    .control-checkbox {
        font-size: 14px;
        color: rgba(52, 52, 62, 0.7);
        padding-left: 26px;
        margin-top: 12px;
        width: 100%;

        & span {
            margin-left: 10px;
            display: flex;
        }

        & .control-indicator {
            height: 18px;
            width: 18px;

            &:after {
                top: 1.5px;
                left: 5px;
                width: 5px;
                height: 9px;
                border-width: 0px 1.5px 1.5px 0;
            }
        }
    }

    .phrase {
        background-color: rgba(13, 23, 23, 0.04);
        border-radius: 2px;
        padding: 12px 0;
        text-align: center;
        margin: 24px 42px 42px;

        & span {
            font-family: MuseoSansCyrl700;
            font-size: 14px;
            font-weight: bold;
            color: #34343e;
            user-select: text;
        }
    }

    .modal-warning {
        margin: 0 42px;
        position: relative;
        top: 4px;

        & .agreed {
            font-family: MuseoSansCyrl300;
            font-size: 14px;
            font-weight: 300;
            line-height: 1.29;
            color: #34343e;

            & b {
                font-family: MuseoSansCyrl700;
                font-weight: bold;
            }
        }

        &.agreed-border {
            margin-bottom: 0;
            & .agreed {
                border-bottom: 1px solid #d1d1d1;
                padding-bottom: 18px;
            }
        }

        & .checkbox-contol {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;

            & label {
                margin: 0;
                & input {
                    position: absolute;
                    z-index: -1;
                    opacity: 0;
                }

                .checkbox-indicator {
                    width: 18px;
                    height: 18px;
                    border-radius: 2px;
                    background-color: #f7f7f7;
                    border: solid 0.5px #979797;
                    margin-right: 18px;

                    &:after {
                        left: 30%;
                        top: 1px;
                        width: 3px;
                        height: 7px;
                        border: solid #34343e;
                        border-width: 0 2px 2px 0;
                        transform: rotate(45deg);
                    }
                }
            }

            & label {
                font-family: MuseoSansCyrl300;
                font-size: 14px;
                line-height: 1.29;
                color: #34343e;
            }
        }
    }

    .modal-input {
        margin: 0;

        & input {
            width: 100%;
        }
    }

    .modal-btn {
        & .btn-timer {
            margin-top: 24px;
        }
        & .btn-yellow {
            color: #34343e;
            &.disabled {
                opacity: 0.5;
                border-radius: 2px;
                background-color: #ffd24f;

                &:hover {
                    cursor: default;
                }
            }

            &.btn-bottom {
                margin-bottom: 24px;
            }
        }

        & .btn-large {
            padding: 10px 70px 10px 70px;
            font-size: 16px;
            font-family: MuseoSansCyrl500;
        }
    }

    .heading {
        & .title-expand {
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                cursor: pointer;
            }

            & .arrow {
                background-image: url('../../assets/img/expand-arrow.svg');
                width: 11.5px;
                height: 7px;
                background-size: cover;
                opacity: 0.5;
                margin: -2px 0 0 8px;
            }
        }
    }

    .modal-control {
        padding-bottom: 18px;
        border-bottom: 1px solid #d1d1d1;
        margin-right: 42px;
        margin-left: 42px;

        & .badge-control {
            width: 70%;
            display: flex;
            flex-wrap: wrap;

            & .badge {
                border-radius: 2px;
                background-color: rgba(13, 23, 23, 0.08);
                padding: 0 6px;
                font-family: MuseoSansCyrl500;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.29;
                color: #34343e;
                margin: 0 3px;
                margin-bottom: 6px;
            }
        }

        & .modal-input {
            margin: 0;
        }

        &.modal-control-noMargin {
            margin-bottom: 0;
            padding-top: 10px;

            & .modal-input {
                margin: 0 !important;
            }
        }

        & .modal-desc {
            margin-top: 0;

            &.errorText {
                color: red;
            }
        }
    }

    .no-activate {
        border-bottom: none !important;

        & .modal-checkbox {
            margin-bottom: 0 !important;
        }
    }

    $l-r-padding: 18px;
    $t-b-padding: 9px;

    .dropdown-list {
        position: absolute;
        top: 50px;
        min-width: 200px;
        max-width: 250px;
        width: 100%;
        left: 230px;
        height: auto;
        background: #fff;
        opacity: 1;
        outline: none;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.12);
        overflow: hidden;
        transition: opacity 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
        z-index: 2;

        & ul {
            display: block;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;

            & li {
                display: block;
                list-style: none;
                font-family: MuseoSansCyrl500;
                font-size: 14px;
                color: #1f202a;
                padding: $t-b-padding $l-r-padding;
                cursor: pointer;
                position: relative;

                &:hover {
                    background-color: #f0f0f0;
                }

                &.selected {
                    &::before {
                        content: "";
                        position: absolute;
                        background: url(../../assets/img/selected-ic.svg);
                        background-size: cover;
                        width: 11.5px;
                        height: 7px;
                        top: 13px;
                        right: 18px;
                        z-index: 1;
                        color: #000;
                        line-height: 40px;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    @media(max-width: 425px) {
        .phrase {
            padding: 12px;
        }
        .modal-btn {
            margin: 0 42px;
            & .btn-large {
                padding: 10px 10px;
                width: 100%;
            }
        }
        .v--modal-overlay {
            & .v--modal-box {
                & .body {
                    & .modal-control {
                        margin: 0 42px;
                        & .modal-input {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                        }
                    }
                }
            }
        }
    }
    @media(max-width: 320px) {
        .control-checkbox {
            font-size: 10px;
        }
        .v--modal-overlay {
            & .v--modal-box {
                & .heading {
                    margin-bottom: 0;
                    & .title {
                        height: 15px;
                        padding-bottom: 0;
                    }
                }
                & .body {
                    & .modal-btn {
                        margin-bottom: 15px;
                        margin-top: 20px;
                        & .btn-large {
                            padding: 5px 10px;
                            font-size: 12px;
                        }
                    }
                    & .modal-control {
                        margin: 0 20px;
                    }
                    & .modal-warning {
                        margin: 0 20px;
                        & .agreed {
                            margin-top: 10px;
                        }
                        &.agreed-border {
                            & .agreed {
                                padding-bottom: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .v--modal {
        min-width: 610px;
        border-radius: 10px;
        background-color: #fafafa;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 1024px) {
        .v--modal {
            min-width: 100%;
        }
    }

    /*@import './modals.scss'*/
</style>
