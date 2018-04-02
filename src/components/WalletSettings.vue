<template>
    <div class="walletSettings">
        <Navbar
            :title="$t('pages.walletSettings.navbarTitle')"
            :isNavigate="true"
            :isBalance="true"
            :rightMenu="rightMenu"
        />

        <section class="main">
            <Wallets-list
                :selectedWallet="currentWallet"
                :new-wallets="walletList"
            />

            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="form">
                                <div class="control">
                                    <div class="wrap-input">
                                        <label for="walletname">{{ $t('pages.walletSettings.fields.name.walletName') }}</label>
                                        <input
                                            type="text"
                                            id="walletname"
                                            :value="currentWallet.name"
                                            @input="changeWalletName"
                                            v-on:blur="reqChangeWalletName"
                                            @keyup.enter="reqChangeWalletName">
                                    </div>
                                </div>

                                <div class="text-center">
                                    <a class="deletelink" @click="deleteWallet">
                                        {{ $t('pages.walletSettings.fields.deleteWallet') }}</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Modal-delete-wallet/>
        <Modal-send/>
        <New-wallet/>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import WalletsList from './layouts/WalletsList';
    import SelectControl from './layouts/forms/Select';
    import SwitchControl from './layouts/forms/SwitchControl';
    import ModalDeleteWallet from './modals/DeleteWallet';
    import ModalSend from './modals/Send';
    import NewWallet from './modals/NewWallet';

    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: 'walletSettings',
        components: {
            Navbar,
            WalletsList,
            SelectControl,
            SwitchControl,
            ModalDeleteWallet,
            ModalSend,
            NewWallet
        },
        data() {
            return {
                rightMenu: {
                    horizontal: false,
                    list: [
                        {
                            type: "link",
                            name: this.$t('pages.summary.rightMenu.summary'),
                            link: "/"
                        }, {
                            type: "link",
                            name: this.$t('pages.summary.rightMenu.walletSettings'),
                            link: "/wallet/settings"
                        }
                    ]
                },
                newWalletName: '',
            }
        },
        computed: {
            ...mapGetters([
                'currentWallet'
            ]),
            walletList: function () {
                return this.$store.state.Wallets.wallets;
            },
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            }
        },
        methods: {
            reqChangeWalletName: function (e) {
                e.target.blur();

                this.$store.dispatch('changeCurrentWalletName', {
                    walletAddress: this.currentWallet.address,
                    newWalletName: this.newWalletName
                }).then(() => {
                    this.$toasted.show('The name of the wallet was successfully changed', {
                        duration: 5000,
                        type: 'success',
                    });
                }).catch(() => {
                    this.$toasted.show('There was an error changing your wallet name', {
                        duration: 10000,
                        type: 'error',
                    });
                });
            },
            deleteWallet: function () {
                this.$modal.show('deletewallet');
            },
            changeWalletName: function (e) {
                this.newWalletName = e.target.value;
            },
            changeChecker: function (id, value) {
                if (id === 'spendingPassword') {
                    this.spendingPassword = value
                }
            },
            initWalletName: function () {
                this.newWalletName = this.currentWallet.name;
            },
            newSelect: function (value, id) {
                if (id === "security")
                    this.selectedSecurityLevel = value;
            },

        },
        mounted() {
            this.initWalletName();

            //разобраться со вьюксом что происходит
            this.$on('selectWallet', function (index) {
                console.log(345345);
                this.changeWallet(index);
            });
            this.$on('changeChecker', function (id, value) {
                console.log(90900);
                this.changeChecker(id, value);
            });
            this.$on('selectNewWallet', function (walletId) {
                console.log(1231233);
                this.changeNewWallet(walletId);
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .deletelink:hover
        cursor: pointer

    .control
        .wrap-input
            input
                &:focus
                    color #1f202a
                    opacity 1
</style>
