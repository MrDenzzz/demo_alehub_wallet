<template>
    <div id="app" :class="systemLanguage">
        <transition name="fade" mode="out-in">
            <div v-if="isLoading" key="save">
                <sync-loader :load="isLoading"/>
            </div>
            <div v-else key="edit">
                <!--<New-wallet/>-->
                <router-view/>
                <Connection-modal/>
            </div>
        </transition>
    </div>
</template>

<script>
    import ConnectionModal from './components/modals/ConnectionModal';
    import NewWallet from './components/modals/NewWallet';
    import Spinner from './components/layouts/Spinner';
    import SyncLoader from './components/layouts/SyncLoader';

    import sha256 from 'sha256';

    import {mapMutations} from 'vuex';
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
                token: localStorage.getItem(sha256('user-token'))
            }
        },
        computed: {
            ...mapGetters([
                'authStatus',
                'userStatus',
                'walletStatus',
                'userHaveWallets',
                'userHaveTransactions',
                'transactionStatus',
                'lengthWalletList'
            ]),
            // currentToken: function () {
            //     return this.$store.state.User.token;
            // },
            // currentStatus: function () {
            //     return this.$store.state.User.status;
            // },
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            systemLanguage: function () {
                if (this.language === null) return 'eng';
                else return this.language;
            },
            selectedTheme() {
                return this.$store.state.Themes.theme;
            },
            isLoading: function () {
                if (localStorage.getItem(sha256('user-token')) === null) {
                    return false;
                }

                if ((this.authStatus === 'success' && this.userStatus === 'success' && !this.userHaveWallets && !this.userHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && !this.userHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && this.userHaveTransactions && this.transactionStatus === 'success')) {

                    console.log('IM HEEEEEEEEEEEEEEEEEEEEEEEEEEEEAR');

                    return false;
                }

                return true;
            }
        },
        methods: {
            ...mapMutations({
                setCurrentWallet: 'CHANGE_NEW_WALLET',
                createNewWallet: 'CREATE_NEW_WALLET',
                addNewTransactions: 'ADD_NEW_TRANSACTION',
                setNewBalance: 'SET_NEW_BALANCE',
                changeTransactionLoaderState: 'CHANGE_TRANSACTION_LOADER_STATE'
            }),

            updateOnlineStatus: function (e) {
                if (!navigator.onLine) {
                    return this.$modal.show('connectionmodal');
                }
            },
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

    .china
        .navbar
            .title
                font-family PingFangSCBold

    .fade-enter-active, .fade-leave-active
        transition opacity .3s

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
        opacity 0.5

</style>
