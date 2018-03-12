<template>
    <div id="app" :class="systemLanguage">
        <router-view/>
        <Connection-modal/>
        <New-wallet v-if="isOpenModal" />
    </div>
</template>

<script>
    import ConnectionModal from './components/modals/ConnectionModal';
    import NewWallet from './components/modals/NewWallet';

    import {mapMutations} from "vuex";

    export default {
        name: 'alehub',
        components: {
            ConnectionModal,
            NewWallet
        },
        data() {
            return {
                language: localStorage.getItem('systemLang'),
                isOpenModal: false
            }
        },
        methods: {
            ...mapMutations ({
                setCurrentWallet: 'CHANGE_NEW_WALLET',
                createNewWallet: 'CREATE_NEW_WALLET',
                addNewTransactions: 'ADD_NEW_TRANSACTION',
                setNewBalance: 'SET_NEW_BALANCE',
                changeTransactionLoaderState: 'CHANGE_TRANSACTION_LOADER_STATE'
            }),
            updateOnlineStatus: function (e) {
                if (!navigator.onLine) {
                    console.log('offline again');
                    return this.$modal.show('connectionmodal');
                }
            },
            getTransactions: function (address) {
                this.changeTransactionLoaderState(true);
                this.$http.get(`${this.$host}/transactions/${address}`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    this.addNewTransactions(response.body);
                    this.changeTransactionLoaderState(false);
                }, response => {
                    console.log('error', response);
                });
            },
            getWalletsInfo () {
                this.$http.post(`${this.$host}/wallet/addressInfo`, {
                    addresses: JSON.parse(localStorage.getItem('wallets')),
                }, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {

                    if (response.body.foundedAddresses.length !== 0) {
                        for (let i = 0; i < response.body.foundedAddresses.length; i++) {
                            this.createNewWallet(response.body.foundedAddresses[i]);
                        }
                        this.setCurrentWallet(response.body.foundedAddresses[0].address);

                        this.getTransactions(response.body.foundedAddresses[0].address);
                    }

                }, response => {
                    console.log('error', response);
                });
            },
            getIntervalWalletsInfo () {
                this.$http.post(`${this.$host}/wallet/addressInfo`, {
                    addresses: JSON.parse(localStorage.getItem('wallets')),
                }, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(response => {

                    if (response.body.foundedAddresses.length !== 0) {
                        this.setNewBalance(response.body.foundedAddresses);
                    }

                }, response => {
                    console.log('error', response);
                });
            }
        },
        computed: {
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            systemLanguage: function () {
                if (this.language === null) return 'eng';
                else return this.language;
            }
        },
        created() {
            let _this = this;
            this.isOpenModal = false;
            if (localStorage.getItem('wallets') === null) {
                return false;
            }
            this.getWalletsInfo()
            setInterval(_this.getIntervalWalletsInfo, 15000);

        },
        mounted() {
            if (!navigator.onLine) return this.$modal.show('connectionmodal');
            this.$on('changeSystemLanguage', function () {
                this.language = localStorage.getItem('systemLang');
            });
            if (localStorage.getItem('wallets') === null) {
                this.isOpenModal = true;
                return this.$modal.show("newwallet");
            }
        }
    }
</script>

<style lang="stylus">
    .rus
        .navbar
            .title
                font-family DINProCondensedBold

    .china
        .navbar
            .title
                font-family PingFangSCBold

</style>
