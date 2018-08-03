<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <modal name="newwallet"
        height="auto"
        class="modal-md newwallet"
        :clickToClose="isCloseModal"
        @opened="modalOpen"
        @closed="modalClosed">

        <Head
            :newWalletStep="newWalletStep"
            :dropDownOption="dropDownOption"
            :isCloseModal="isCloseModal"
            :isOpenOptions="isOpenOptions"
        />

        <Step1
            :walletType="walletType"
            :checkNewWalletFields="checkNewWalletFields"
            :mnemonics="mnemonics"
            :dataProcessing="dataProcessing"
            v-if="newWalletStep === 1"
        />

        <div v-if="newWalletStep === 2">
            <RecoveryStep1
                :dataProcessing="dataProcessing"
                :countTimer="countTimer"
                v-if="recoveryStep === 1"
            />
            <RecoveryStep2
                :recoveryMnemonicPhrase="recoveryMnemonicPhrase"
                v-if="recoveryStep === 2"
            />
            <RecoveryStep3
                :dataProcessing="dataProcessing"
                :mnemonicsRecovery="mnemonicsRecovery"
                :restorationAgreements="restorationAgreements"
                :isConfirmRecovery="isConfirmRecovery"
                v-if="recoveryStep === 3"
            />
        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';
    import Head from './new-wallet/Head';
    import Step1 from './new-wallet/Step1';
    import RecoveryStep1 from './new-wallet/RecoveryStep1'
    import RecoveryStep2 from './new-wallet/RecoveryStep2'
    import RecoveryStep3 from './new-wallet/RecoveryStep3'

    import {mapGetters} from 'vuex';
    import mnGen from 'mngen';
    import sha256 from 'sha256';

    export default {
        name: 'NewWallet',
        components: {
            Spinner,
            Head,
            Step1,
            RecoveryStep1,
            RecoveryStep2,
            RecoveryStep3
        },
        data() {
            return {
                walletType: 'new',
                isOpenOptions: false,
                walletName: '',
                dropDownOption: [
                    {
                        title: this.$t('modals.newWallet.new.label'),
                        isSelected: true,
                        value: 'new'
                    },
                    {
                        title: this.$t('modals.newWallet.redeem.label'),
                        isSelected: false,
                        value: 'redeem'
                    }
                    // {
                    //     title: this.$t('modals.newWallet.import.label'),
                    //     isSelected: false, value: 'import'
                    // },
                ],
                redemptionKey: '',  //redemptionKey
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
                'currentWalletAddress'
            ]),
            // isImport: function () {
            //     if (this.mnemonicsRecovery.length === 0 || this.walletName === '')
            //         return true;
            //     return false;
            // },
            isConfirmRecovery: function () {
                if (this.restorationAgreements.deviceOnly === false || this.restorationAgreements.phraseSecure === false
                    || JSON.stringify(this.mnemonicsRecovery) !== JSON.stringify(this.recoveryMnemonicPhrase))
                    return true;
                return false;
            },
            newWallets: function () {
                return this.$store.state.Wallets.newWallet
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
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            }
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
            changeRecoveryStep: function (step) {
                if (step === 'next') {
                    return this.recoveryStep = this.recoveryStep + 1;
                }
                if (this.recoveryStep === 1 && step !== 'next') {
                    this.newWalletStep = 1;
                }
                else this.recoveryStep = this.recoveryStep - 1;
            },
            countDown: function () {
                if (this.countTimer !== 0) {
                    setTimeout(() => {
                        this.countTimer--;
                        this.countDown();
                    }, 1000);
                }
            },
            /*
            * */
            formatVal: function (val) {
                //put this to external module
                let formatArr = val.split(''),
                    flag = false;

                if (formatArr[0] === ' ') {
                    flag = true;
                    formatArr = formatArr.filter(item => {
                        if (flag && item !== ' ') {
                            flag = false;
                        }
                        return !flag;
                    });
                }
                if (formatArr[formatArr.length - 1] === ' ') {
                    flag = true;
                    formatArr.reverse();
                    formatArr = formatArr.filter(item => {
                        if (flag && item !== ' ') {
                            flag = false;
                        }
                        return !flag;
                    });
                    formatArr.reverse();
                }
                return formatArr.join('');
            },
            /*
            * */
            validateVal: function (val) {
                //добавить проверки на специальные символы
                if (val.length === 0)
                    return false;
                return true;
            },
            changeStepCreate: function (step) {
                if (this.newWalletStep === 1) {
                    this.walletName = this.formatVal(this.walletName);
                    if (!this.validateVal(this.walletName)) {
                        this.$toasted.show('Your wallet name does not contain letters or numbers', {
                            duration: 5000,
                            type: 'error',
                        });
                        return false;
                    }
                }

                if (this.newWalletStep === 1 && this.walletName === '')
                    return false;

                if (step === 'next')
                    this.newWalletStep = this.newWalletStep + 1;
                else
                    this.newWalletStep = this.newWalletStep - 1;

                if (this.newWalletStep === 2) {
                    this.countTimer = 3;
                    this.countDown();
                    this.recoveryStep = 1;
                    this.isAgreedRecovery = false;
                }
            },
            focusInput: function (id) {
                setTimeout(() => {
                    document.getElementById(id).focus();
                }, 40);
            },
            openDropdown: function () {
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
            modalClosed: function () { //rename this function
                this.walletType = 'new';
                this.newWalletStep = 1;
                this.recoveryStep = 1;
                this.isOpenOptions = false;
                //this.activityChecked(false);
                //this.walletName('');
                for (let i = 0; i < this.dropDownOption.length; i++)
                    this.dropDownOption[i].isSelected = false;

                this.dropDownOption[0].isSelected = true;
                this.walletName = '';
                this.redemptionKey = '';
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
                this.redemptionKey = '';
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

                this.addListenersToButtons();
            },

            addListenersToButtons: function () {
                document.addEventListener('keyup', (event) => {
                    if (this.newWalletStep === 2 && this.recoveryStep === 1) {
                        if (event.key === ' ') {
                            this.isAgreedRecovery = !this.isAgreedRecovery;
                        }

                        setTimeout(() => {
                            if (event.key === 'Enter' && !document.getElementById('continue-to-recovery').disabled) {
                                document.getElementById('continue-to-recovery').click();
                            }
                        }, 40);
                    }
                    if (this.newWalletStep === 2 && this.recoveryStep === 3 &&
                        document.getElementById('input-to-mnemonic-recovery') !== document.activeElement) {
                        setTimeout(() => {
                            if (event.key === 'Enter' && !document.getElementById('create-new-wallet').disabled) {
                                document.getElementById('create-new-wallet').click();
                            }
                        }, 40);
                    }
                })
            },

            newCreateWallet: function () {
                this.dataProcessing = true;

                this.$store.dispatch('newWallet', {
                    name: this.walletName,
                    seed: this.mnemonicsRecovery
                }).then(() => {
                    this.dataProcessing = true;
                    localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);

                    this.$store.dispatch('transactionsRequestLazy',
                        this.currentWalletAddress
                    ).then((resp) => {
                        this.$store.dispatch('resetTransactionsUpdated'
                        ).then(() => {
                            this.$toasted.show(this.$t('modals.success.newWallet.wallet')+' '+this.currentWallet.name+' '+this.$t('modals.success.newWallet.create'), {
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
            redeemCreateWallet: function () {
                this.dataProcessing = true;
                this.$store.dispatch('redeemWallet', {
                    seed: this.mnemonics
                }).then((resp) => {
                    this.dataProcessing = false;
                    this.closeModal();
                    this.$toasted.show(this.$t('modals.success.newWallet.wallet')+' '+ resp.data.walletInfo.name+' '+this.$t('modals.success.newWallet.create'), {
                        duration: 5000,
                        type: 'success',
                    });
                }).catch(() => {
                    this.dataProcessing = false;
                    this.$toasted.show(this.$t('modals.success.walletRedeem'), {
                        duration: 10000,
                        type: 'error',
                    });
                });
            },

            // importWallet: function () {
            //     if (!this.walletName) {
            //         this.focusInput('redemptionWalletName');
            //         return false;
            //     }
            //     if (!this.mnemonicField) {
            //         this.focusInput('redemptionKey')
            //     }
            //     this.$http.post(`${this.$host}/wallet/redeem`, {
            //         seed: this.mnemonicsRecovery
            //     }, {
            //         headers: {
            //             'Content-Type': 'application/json; charset=UTF-8',
            //             'Accept': 'application/json'
            //         }
            //     }).then(response => {
            //
            //         if (localStorage.getItem('wallets')) {
            //             this.saveDataToFieldLocalStorage(response.body.walletInfo.address);
            //         } else {
            //             this.saveDataToEmptyLocalStorage(response.body.walletInfo.address);
            //         }
            //         this.$toasted.show(`Wallet "${response.body.walletInfo.name}" successful created!`, {
            //             duration: 5000,
            //             type: 'success',
            //         });
            //
            //         this.closeModal();
            //
            //     }, response => {
            //         this.$toasted.show('Wallet not found', {
            //             duration: 10000,
            //             type: 'error',
            //         });
            //
            //         this.closeModal();
            //     });
            // },
        },
        created() {
            setTimeout(() => {
                window.onclick = function (e) {
                    let t = e.target;
                    if (t.className.indexOf('value') === -1 && t.className.indexOf('selected') === -1) {
                        let lists = document.getElementsByClassName('list-select');
                        for (let i = 0; i < lists.length; i++)
                            lists[i].style.display = 'none';
                    }
                }
            }, 40);
        },
        mounted() {
            this.$on("openDropdown", function () {
                this.openDropdown();
            });
            this.$on("closeModal", function () {
                this.closeModal();
            });
            this.$on("changeType", function (index) {
                this.changeType(index);
            });
            this.$on("changeRecoveryStep", function (data) {
                this.changeRecoveryStep(data);
            });
            this.$on("changeWalletName", (name) => {
                this.walletName = name;
            });
            this.$on("changeMnemonicField", (data) => {
                this.mnemonicField = data;
            });
            this.$on("changeMnemonicFieldRecovery", (data) => {
                this.mnemonicFieldRecovery = data;
            })
            this.$on("changeAgreedRecovery", (data) => {
                this.isAgreedRecovery = data;
            });
            this.$on("changeStepCreate", function (data) {
                this.changeStepCreate(data);
            });
            this.$on("pushMnemonic", function (mnemonic) {
                this.mnemonics.push(mnemonic);
            });
            this.$on("pushMnemonicRecovery", function (mnemonic) {
                this.mnemonicsRecovery.push(mnemonic);
            });
            this.$on("popMnemonic", function () {
                this.mnemonics.pop();
            });
            this.$on("popMnemonicRecovery", function () {
                this.mnemonicsRecovery.pop();
            });
            this.$on("redeemCreateWallet", function () {
                this.redeemCreateWallet();
            });
            this.$on("getRandomSeed", function() {
                this.getRandomSeed();
            });
            this.$on("changeRestorationAgreements", function(data) {
                this.restorationAgreements[data] = !this.restorationAgreements[data];
            });
            this.$on("clearRecoveryPhrase", function() {
                this.mnemonicsRecovery = [];
            });
            this.$on("newCreateWallet", function() {
                this.newCreateWallet();
            });
        },
    }
</script>