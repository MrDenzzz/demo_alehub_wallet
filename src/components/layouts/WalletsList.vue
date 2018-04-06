<template>
    <div class="dragParent">
        <div class="menu" :class="{'is-opened': isToggle, 'scrollable': scrollable}">
            <div class="wallet-list wallet-search" v-if="newWallets.length">
                <div class="wrap-in-wallet">
                    <img id="loupe"
                         class="icon"
                         :src="getIcon('loupe')"
                         width="18"
                         height="15">
                    <input type="text"
                           :placeholder="$t('pages.walletsList.search')"
                           v-model="searchField"
                    >
                </div>
            </div>

            <div class="wallet-list wallet-element"
                 v-for="wallet in newWalletsList"
                 :key="wallet.address"
                 :id="wallet.address"
                 :class="{ active: checkActive(wallet.address) }"
                 @click="selectNewWallet(wallet.address)">

                <div class="wrap-in-wallet">
                    <p>{{ wallet.name }}</p>
                    <div class="separator"></div>
                    <p class="wallet">
                        <vue-numeric :separator='correctLangSep'
                                     :decimal-separator='correctLangDecSep'
                                     :value="wallet.balance"
                                     :precision="correctValuePrecision(wallet.balance)"
                                     :read-only="true">
                        </vue-numeric>
                        {{ ' ' + 'ALE'}}
                    </p>
                </div>

            </div>

            <div class="wallet-list wrap-between cursor-p" @click="addNewWalletModal">
                <div class="wrap-in-wallet">
                    <p class="new-wallet">{{ $t('pages.walletsList.addNew') }}</p>
                </div>
                <img src="../../assets/img/add-ic.svg" width="18" height="18"/>
            </div>

            <div class="drag" @click="checkScroll()"></div>

        </div>
    </div>
</template>

<script>
    import numeral from 'numeral';
    import SelectControl from '../layouts/forms/Select';
    import NewWallet from '../modals/NewWallet';

    import sha256 from 'sha256';
    import {Draggable} from '@shopify/draggable';

    import {mapGetters} from 'vuex';

    export default {
        name: 'walletsList',
        components: {
            SelectControl,
            NewWallet,
        },
        props: {
            newWallets: { //переименовать. рефактор
                type: Array,
                required: true
            },
        },
        data() {
            return {
                searchField: '',
                setIntervalId: 0,
                isToggle: false,
                scrollable: false,

                // walletsAddressesList: []
            }
        },
        watch: {
            newWalletsList() {
                // clearInterval(this.setIntervalId);
                // this.setIntervalId = setInterval(this.getTransactions, 15000);
                this.checkScroll();
            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'currentWallet',
                'allTransactions',

                'walletsLoadedAddresses'
            ]),
            newWalletsList: function () {
                if (this.searchField !== '') {
                    return this.newWallets.filter(item => {
                        return item.name.toLowerCase().includes(this.searchField.toLowerCase());
                    });
                }
                return this.newWallets
            },
            selectedTheme() {
                return this.$store.state.Themes.theme;
            },
            getCurrentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
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
            }
        },
        methods: {
            checkActive: function (address) {
                if (address === this.getCurrentWallet.address)
                    return true;
                return false;
            },
            addNewWalletModal: function () {
                this.$modal.show('newwallet');
            },
            selectNewWallet: function (address) {

                if (this.currentWallet.address !== address) {
                    this.$store.dispatch('changeCurrentWallet',
                        address
                    ).then(() => {

                        this.$store.dispatch('resetTransactionsUpdated'
                        ).then(() => {
                        }).catch(() => {
                            console.log('Error reset transactionsUpdated. WalletList.vue');
                        });

                        this.$store.dispatch('allTransactionsRequest', {
                            addresses: this.walletsLoadedAddresses
                        }).then(() => {
                            console.log(this.allTransactions, 'this.allTransactions from WalletsList.vue');
                        }).catch(() => {
                            console.log('Error request all transactions');
                        });

                        this.$store.dispatch('transactionsRequestLazy',
                            address
                        ).then(() => {
                            this.$store.dispatch('setFilterDate'
                            ).then(() => {
                                console.log('Success set filter date');
                            }).catch(() => {
                                console.log('Error set filter date. WalletList.vue');
                            });
                        }).catch((err) => {
                            console.log(err, 'Get transactions for current wallet impossible');
                        });

                    }).catch(() => {
                        console.log('Сan not change the current wallet. WalletList.vue');
                    });
                }
            },
            parseBalance: function (balance) {
                return numeral(balance).format('0,0');
            },
            correctValuePrecision: function (balance) {
                if (Number(balance) % 1 !== 0)
                    return balance.toString().split('.')[1].toString().length;
                return 0;
            },
            getIcon: function (name) {
                if (this.selectedTheme === 'dark')
                    return require(`../../assets/img/${name}.svg`);
                else if (this.selectedTheme === 'white')
                    return require(`../../assets/img/${name}_white.svg`);

                return require(`../../assets/img/${name}.svg`);
            },
            initDrag: function () {
                const draggable = new Draggable(document.querySelectorAll('.dragParent'), {
                    draggable: '.menu',
                    delay: 0,
                    handle: '.drag',
                    mirror: {
                        constrainDimensions: true,
                        yAxis: false
                    }
                });

                draggable.on('drag:move', (event) => {
                    if (event.mirror.getBoundingClientRect().x * -0.4 <= 90 && !(event.mirror.getBoundingClientRect().x >= 0)) {
                        this.isToggle = true;
                        document.querySelector('.draggable-mirror').style.left = `-${event.mirror.getBoundingClientRect().x * 0.66}px`
                    } else if (event.mirror.getBoundingClientRect().x >= 0) {
                        event.cancel();
                        document.querySelector('.draggable-mirror').style.transform = 'translate3d(0px, 64px, 0)';
                        document.querySelector('.draggable-mirror').style.left = 0
                    }
                });
            },
            closeMenu: function (event) {
                if (event.target.localName !== 'input') {
                    this.isToggle = false;
                }
            },
            checkScroll: function () {
                let scrollableEl = document.querySelector('.menu');
                if (!scrollableEl)
                    return false;

                (scrollableEl.scrollHeight > scrollableEl.clientHeight) ? this.scrollable = true : this.scrollable = false;
            }
        },
        created() {
            document.addEventListener('click', this.closeMenu);
            window.addEventListener('resize', this.checkScroll);

        },
        mounted() {
            this.initDrag();
        }
    }
</script>

