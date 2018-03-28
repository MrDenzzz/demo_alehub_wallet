<template>
    <div id="app" :class="systemLanguage">
        <div v-if="isLoading" key="save">
            <sync-loader :load="isLoading"/>
        </div>
        <div v-else key="edit">
            <!--<New-wallet/>-->
            <router-view/>
            <div
                    v-if="transactionsChanged"
                    @click=""
                    style="position: fixed; bottom: 0; width: 100%; color: #ffffff; background-color: #1bac2c;
             z-index: 10000; display: flex; justify-content: center; align-items: center; justify-content: center;
             padding-top: 1em; padding-bottom: 1em; cursor: pointer; font-family: MuseoSansCyrl500;">
                You have received new data. Click to refresh.
            </div>
            <Connection-modal/>
        </div>
    </div>
</template>

<script>
    import ConnectionModal from './components/modals/ConnectionModal';
    import NewWallet from './components/modals/NewWallet';
    import Spinner from './components/layouts/Spinner';
    import SyncLoader from './components/layouts/SyncLoader';

    import sha256 from 'sha256';

    import {mapGetters} from 'vuex';

    export default {
        name: 'alehub',
        components: {
            ConnectionModal,
            NewWallet,
            Spinner,
            SyncLoader
        },
        data() {
            return {
                language: localStorage.getItem('systemLang'),
                isOpenModal: false,
                isLoader: false,
                token: localStorage.getItem(sha256('user-token')),
                readyToPing: false,

                setIntervalId: 0
            }
        },
        watch: {
            // readyToPing: function (val) {
            //     clearInterval(this.setIntervalId);
            //     this.setIntervalId = setInterval(this.pingTransactions(), 2000);
            // }
        },
        computed: {
            ...mapGetters([
                'authStatus',
                'userStatus',
                'walletStatus',
                'userHaveWallets',
                'userHaveTransactions',
                'transactionStatus',
                'initiateFilterDateStatus',
                'lengthWalletList',
                'currentWalletAddress',
                'transactionsChanged'
            ]),
            systemLanguage: function () {
                if (this.language === null) return 'eng';
                else return this.language;
            },
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            isLoading: function () {
                if (localStorage.getItem(sha256('user-token')) === null) {
                    return false;
                }

                if ((this.authStatus === 'success' && this.userStatus === 'success' && !this.userHaveWallets && !this.userHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && !this.userHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && this.userHaveTransactions && this.transactionStatus === 'success' && this.initiateFilterDateStatus === 'success')) {

                    this.readyToPing = true;

                    console.log('Load app');

                    return false;
                }

                return true;
            }
        },
        methods: {
            updateOnlineStatus: function (e) {
                if (!navigator.onLine) {
                    return this.$modal.show('connectionmodal');
                }
            },
            pingTransactions: function () {
                if (this.readyToPing) {
                    console.log('check');
                    this.$store.dispatch('transactionsRequestPing',
                        this.currentWalletAddress
                    ).then(() => {
                        console.log('Success ping transactions');
                    }).catch(() => {
                        console.log('Error ping transactions');
                    });
                }
            },
            refreshTransactionsCurrentWallet: function () {
                this.$store.dispatch();
            }
        },
        created() {
            let body = document.querySelector('body');
            switch (this.selectedTheme) {
                case 'main':
                    body.classList.remove("dark", "white");
                    break;
                case 'dark':
                    body.classList.remove("white");
                    body.classList.add("dark");
                    break;
                case 'white':
                    body.classList.remove("dark");
                    body.classList.add("white");
                    break;
            }


            this.isOpenModal = false;
            if (localStorage.getItem('wallets') === null) {
                return false;
            }
        },
        mounted() {
            // this.setIntervalId = setInterval(this.pingTransactions, 60000);

            if (!navigator.onLine) {
                this.isLoader = true;
                return this.$modal.show('connectionmodal');
            }

            this.$on('changeSystemLanguage', function () {
                this.language = localStorage.getItem('systemLang');
            });

            this.isLoader = false;
        }
    }
</script>

<style lang="stylus">
    .rus
        .navbar
            .title
                font-family DINProCondensedBold
                font-size 26px
                @media (max-width: 1200px)
                    transform translateX(-40%)
                @media (max-width: 1150px)
                    transform translateX(-30%)
                @media (max-width: 1100px)
                    transform translateX(-20%)
                @media (max-width: 1050px)
                    transform translateX(-10%)
                @media (max-width: 1024px)
                    transform translateX(-50%)

    .china
        .navbar
            .title
                font-family PingFangSCBold

    .fade-enter-active, .fade-leave-active
        transition opacity .3s

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
        opacity 0.5

</style>
