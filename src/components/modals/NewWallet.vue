<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">

    <modal name="newwallet" height="auto" class="modal-md newwallet" :clickToClose="isCloseModal" @opened="modalOpen" @closed="modalClosed">
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
                        <input id="newWalletName" type="text" class="input" v-model="walletName"
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
                                v-model="walletName"
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

            <div v-if="dataProcessing" class="wrap-spinner">
                <spinner/>
            </div>

            <div class="modal-btn text-center">
                <button
                        id="continue-to-recovery"
                        class="btn btn-yellow btn-large btn-bottom btn-timer"
                        :disabled="countTimer || !isAgreedRecovery || dataProcessing"
                        :class="{ 'disabled': countTimer !== 0 || !isAgreedRecovery || dataProcessing}"
                        @click="getRandomSeed()">
                    {{ $t('modals.newWallet.recovery.phrase.btn') }}
                    <span v-if="countTimer !== 0">({{ countTimer }})</span>
                </button>
            </div>
        </div>

        <div v-if="newWalletStep === 2 && recoveryStep === 2">
            <div class="modal-warning">
                <p class="agreed">{{ $t('modals.newWallet.recovery.mnemonic.text') }}</p>
            </div>

            <div class="phrase">
                <span class="mnemonic-phrase" v-for="mnemonic in recoveryMnemonicPhrase">{{ mnemonic }} </span>
            </div>

            <div class="modal-btn text-center">
                <button
                        id="copy-mnemonic"
                        type="button"
                        class="buttons button-copy btn-default"
                        v-clipboard:copy="copyMnemonic()"
                        @click="successCopyMnemonic">
                    <img class="icon-copy" :src="getIcon('tmp_copy_icon')" alt="">
                    {{ $t('modals.newWallet.recovery.mnemonic.btnCopy') }}
                </button>
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
                            id="input-to-mnemonic-recovery"
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

            <div v-if="dataProcessing" class="wrap-spinner">
                <spinner/>
            </div>

            <div class="modal-btn text-center">
                <button
                        class="btn btn-default btn-large"
                        :class="{ 'disabled': mnemonicsRecovery.length === 0 || dataProcessing}"
                        @click="clearRecoveryPhrase"
                        :disabled="mnemonicsRecovery.length === 0 || dataProcessing"
                >
                    {{ $t('modals.newWallet.recovery.finish.btn.clear') }}
                </button>
                <button
                        id="create-new-wallet"
                        class="btn btn-yellow btn-large"
                        :class="{ 'disabled': isConfirmRecovery || dataProcessing}"
                        :disabled="isConfirmRecovery || dataProcessing"
                        @click="newCreateWallet"
                >
                    {{ $t('modals.newWallet.recovery.finish.btn.confirm') }}
                </button>
            </div>

        </div>

    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    import {mapGetters} from 'vuex';
    import mnGen from 'mngen';
    import sha256 from 'sha256';

    export default {
        name: 'newWallet',
        components: {
            Spinner
        },
        data() {
            return {
                walletType: 'new',
                isOpenOptions: false,
                walletName: '',
                dropDownOption: [
                    {
                        title: this.$t('modals.newWallet.new.label'),
                        isSelected: true, value: 'new'
                    },
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
                },

                dataProcessing: false
            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'currentWallet',
                'currentWalletAddress',
                'checkNewWalletMatchPassword'
            ]),
            isImport: function () {
                if (this.mnemonicsRecovery.length === 0 || this.walletName === '')
                    return true;
                return false;
            },
            isConfirmRecovery: function () {
                if (this.restorationAgreements.deviceOnly === false || this.restorationAgreements.phraseSecure === false
                    || JSON.stringify(this.mnemonicsRecovery) !== JSON.stringify(this.recoveryMnemonicPhrase))
                    return true;
                return false;
            },
            newWallets: function () {
                return this.$store.state.Wallets.newWallet
            },
            modalTitle: function () {
                let type = this.dropDownOption.filter(item => {
                    return item.isSelected
                });
                return type[0].title;
            },
            checkNewWalletFields: function () {
                if (this.walletName.length === 0) {
                    return true;
                }
                return false;
            },
            isCloseModal: function () {
                if (this.$store.state.Wallets.currentWallet == null)
                    return false;
                return true;
            },
            getCurrentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            selectedTheme() {
                return this.$store.state.Themes.theme;
            },
        },
        methods: {
            getRandomSeed: function () {
                this.dataProcessing = true;

                this.$store.dispatch('getRandomSeed'
                ).then(resp => {
                    this.recoveryMnemonicPhrase = resp.data.seed;
                    this.dataProcessing = false;
                    this.changeRecoveryStep('next');
                }).catch(() => {
                    this.dataProcessing = false;
                    console.log('Error get random seed');
                });
            },
            recoveryBlur: function () {
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
                if (this.newWalletStep === 1 && this.walletName === '') return false
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
            changeType: function (index) {
                for (let i = 0; i < this.dropDownOption.length; i++) {
                    this.dropDownOption[i].isSelected = false;
                }
                this.mnemonics = [];
                this.mnemonicField = '';
                this.walletName = '';
                this.dropDownOption[index].isSelected = true;
                this.isOpenOptions = false;
                this.walletType = this.dropDownOption[index].value;
                if (this.walletType === 'new')
                    this.focusInput('newWalletName');
                if (this.walletType === 'redemption')
                    this.focusInput('redemptionWalletName');
            },
            closeModal: function () {
                this.$modal.hide('newwallet');
            },
            modalClosed: function () {
                this.walletType = 'new';
                this.newWalletStep = 1;
                this.recoveryStep = 1;
                this.isOpenOptions = false;
                //this.activityChecked(false);
                //this.walletName('');
                // for (let i = 0; i < this.dropDownOption.length; i++)
                //     this.dropDownOption[i].isSelected = false;

                // this.dropDownOption[0].isSelected = true;
                this.walletName = '';
                this.redemtionKey = '';
                this.newWalletStep = 1;
                this.countTimer = 3;
                this.isAgreedRecovery = false;
                this.mnemonics = [];
                this.mnemonicField = '';
                this.recoveryMnemonicPhrase = mnGen.list(10);
                this.mnemonicFieldRecovery = '';
                this.mnemonicsRecovery = [];
                this.restorationAgreements.deviceOnly = false;
                this.restorationAgreements.phraseSecure = false;
                this.dataProcessing = false;
            },
            modalOpen: function () {
                this.walletType = 'new';
                this.newWalletStep = 1;
                this.recoveryStep = 1;
                this.isOpenOptions = false;
                //this.activityChecked(false);
                //this.walletName('');
                // for (let i = 0; i < this.dropDownOption.length; i++)
                //     this.dropDownOption[i].isSelected = false;

                // this.dropDownOption[0].isSelected = true;
                this.walletName = '';
                this.focusInput('newWalletName');
                this.redemtionKey = '';
                this.newWalletStep = 1;
                this.countTimer = 3;
                this.isAgreedRecovery = false;
                this.mnemonics = [];
                this.mnemonicField = '';
                this.recoveryMnemonicPhrase = mnGen.list(10);
                this.mnemonicFieldRecovery = '';
                this.mnemonicsRecovery = [];
                this.restorationAgreements.deviceOnly = false;
                this.restorationAgreements.phraseSecure = false;
                this.dataProcessing = false;

                // walletType: 'new',
                //     isOpenOptions: false,
                //     walletName: '',
                //     dropDownOption: [
                //     {title: this.$t('modals.newWallet.new.label'), isSelected: true, value: 'new'},
                //     // {title: this.$t('modals.newWallet.import.label'), isSelected: false, value: 'import'}
                // ],
                //     redemtionKey: '',
                //     newWalletStep: 1,
                //     countTimer: 3,
                //     isAgreedRecovery: false,
                //     recoveryStep: 1,
                //     mnemonics: [],
                //     mnemonicField: '',
                //     recoveryMnemonicPhrase: '',
                //     mnemonicFieldRecovery: '',
                //     mnemonicsRecovery: [],
                //     restorationAgreements: {
                //     deviceOnly: false,
                //         phraseSecure: false
                // },
                //
                // dataProcessing: false
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
                this.dataProcessing = true;

                this.$store.dispatch('newWallet', {
                        name: this.walletName,
                        seed: this.mnemonicsRecovery
                    }
                ).then(() => {
                    this.dataProcessing = true;
                    localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);

                    this.$store.dispatch('transactionsRequestLazy',
                        this.currentWalletAddress
                    ).then((resp) => {
                        this.$store.dispatch('resetTransactionsUpdated'
                        ).then(() => {
                            this.$toasted.show(`Wallet '${this.currentWallet.name}' successful created!`, {
                                duration: 5000,
                                type: 'success',
                            });
                            this.dataProcessing = false;
                            this.closeModal();
                        }).catch(() => {
                            console.log('Error reset transactionsUpdated. WalletList.vue');
                        });
                        console.log(resp, 'transactions new wallet resp success');
                    }).catch((err) => {
                        console.log(err, 'transactions new wallet resp err');
                    });
                }).catch(() => {
                    console.log('Error request new wallet');
                });
            },


            importWallet: function () {
                if (!this.walletName) {
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
            },
            copyMnemonic: function () {
                return this.recoveryMnemonicPhrase.join(' ');
            },
            successCopyMnemonic: function () {
                this.$toasted.show(this.$t('modals.newWallet.recovery.mnemonic.toastedSuccessMnemonic'), {
                    duration: 5000,
                    type: 'success',
                });
            },
            getIcon(name) {
                if (this.selectedTheme === "dark")
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === "white")
                    return require(`../../assets/img/${name}_dark.svg`);
                else return require(`../../assets/img/${name}.svg`);
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


            document.addEventListener('keyup', (event) => {
                if (this.newWalletStep === 2 && this.recoveryStep === 1) {
                    if (event.keyCode === 32) {
                        this.isAgreedRecovery = !this.isAgreedRecovery;
                    }

                    setTimeout(() => {
                        if (event.keyCode === 13 && !document.getElementById('continue-to-recovery').disabled) {
                            document.getElementById('continue-to-recovery').click();
                        }
                    }, 40);
                }
                if (this.newWalletStep === 2 && this.recoveryStep === 3 && document.getElementById('input-to-mnemonic-recovery') !== document.activeElement) {
                    setTimeout(() => {
                        if (event.keyCode === 13 && !document.getElementById('create-new-wallet').disabled) {
                            document.getElementById('create-new-wallet').click();
                        }
                    }, 40);
                }
            })
        }
    }
</script>