<template>
    <div class="dragParent">
        <div class="menu" :class="{'is-opened': isToggle}">
            <div class="wallet-list wallet-search" v-if="newWallets.length">
                <div class="wrap-in-wallet">
                    <img :src="getIcon('loupe')" width="18" height="15" class="icon" id="loupe">
                    <input
                        type="text"
                        :placeholder="$t('pages.walletsList.search')"
                        v-model="searchField"
                    >
                </div>
            </div>

            <div
                class="wallet-list wallet-element"
                v-for="wallet in newWalletsList"
                :key="wallet.address"
                :id="wallet.address"
                :class="{ active: checkActive(wallet.address) }"
                @click="selectNewWallet(wallet.address)"
            >
                <div class="wrap-in-wallet">
                    <p>{{ wallet.name }}</p>
                    <div class="separator"></div>
                    <p class="wallet">
                        <vue-numeric
                            :separator='correctLangSep'
                            :decimal-separator='correctLangDecSep'
                            :value="wallet.balance"
                            :precision="correctValuePrecision(wallet.balance)"
                            :read-only="true">
                        </vue-numeric>
                        {{ ' ' + 'ALC'}}
                    </p>
                </div>

            </div>

            <div class="wallet-list wrap-between cursor-p" @click="addNewWalletModal">
                <div class="wrap-in-wallet">
                    <p class="new-wallet">{{ $t('pages.walletsList.addNew') }}</p>
                </div>
                <img src="../../assets/img/add-ic.svg" width="18" height="18"/>
            </div>

            <div class="drag"></div>

        </div>
    </div>
</template>

<script>
    import numeral from 'numeral';
    import SelectControl from '../layouts/forms/Select';
    import NewWallet from '../modals/NewWallet';
    import sha256 from 'sha256';
    import {Draggable} from '@shopify/draggable';

    import {mapMutations} from 'vuex';

    export default {
        name: 'walletsList',
        components: {
            SelectControl,
            NewWallet,
        },
        props: {
            newWallets: { //переименовать
                type: Array,
                required: true
            },
        },
        data() {
            return {
                searchField: '',
                setIntervalId: 0,
                isToggle: false
            }
        },
        watch: {
            newWallets() {
                clearInterval(this.setIntervalId);
                this.setIntervalId = setInterval(this.getTransactions, 15000);
            }
        },
        computed: {
            newWalletsList: function () {
                if (this.searchField !== '') {
                    return this.newWallets.filter(item => {
                        return item.name.toLowerCase().includes(this.searchField.toLowerCase());
                    });
                }
                return this.newWallets
            },
            selectedTheme () {
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
            ...mapMutations({
                changeNewWallet: 'CHANGE_NEW_WALLET',
                addNewTransactions: 'ADD_NEW_TRANSACTION'
            }),
            checkActive: function (address) {
                if (address === this.getCurrentWallet.address)
                    return true;
                return false;
            },
            addNewWalletModal: function () {
                this.$modal.show('newwallet');
            },
            selectNewWallet: function (address) {
                clearInterval(this.setIntervalId);
                this.changeNewWallet(address);
                this.$parent.$emit('changeWallet', true, address);
                this.setIntervalId = setInterval(this.getTransactions, 15000);
            },
            parseBalance: function (balance) {
                return numeral(balance).format('0,0');
            },
            correctValuePrecision: function (balance) {
                if (Number(balance) % 1 !== 0)
                    return balance.toString().split('.')[1].toString().length;
                return 0;
            },
            getTransactions () {
                // if (!this.getCurrentWallet) return false;
                // this.$http.get(`${this.$host}/transactions/${this.getCurrentWallet.address}`, {
                //     headers: {
                //         'Content-Type': 'application/json; charset=UTF-8',
                //         'Accept': 'application/json',
                //         'Authorization': localStorage.getItem(sha256('user-token'))
                //     }
                // }).then(response => {
                //     console.log(response);
                //     this.addNewTransactions(response.body);
                // }, response => {
                //     console.log('error', response);
                // });
            },
            getIcon(name) {
                if (this.selectedTheme === 'dark') return require(`../../assets/img/${name}.svg`);
                else if (this.selectedTheme === 'white') return require(`../../assets/img/${name}_white.svg`);
                else return require(`../../assets/img/${name}.svg`);
            },
            initDrag () {
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
                    if (event.mirror.getBoundingClientRect().x * -0.66 <= 90 && !(event.mirror.getBoundingClientRect().x >= 0)) {
                        this.isToggle = true
                        document.querySelector('.draggable-mirror').style.left = `-${event.mirror.getBoundingClientRect().x * 0.66}px`
                    } else if (event.mirror.getBoundingClientRect().x >= 0) {
                        event.cancel();
                        document.querySelector('.draggable-mirror').style.transform = 'translate3d(0px, 64px, 0)'
                        document.querySelector('.draggable-mirror').style.left = 0
                    }
                });
            },
            closeMenu (event) {
                if (event.target.localName !== 'input') {
                    this.isToggle = false;
                }
            }
        },
        created () {
            document.addEventListener('click', this.closeMenu)
            // let _this = this;
            // this.setIntervalId = setInterval(_this.getTransactions, 15000);
        },
        mounted () {
            this.initDrag();
        }
    }
</script>

<style lang="stylus" scoped>
    .menu
        z-index 4
        .wallet-list
            &:not(.active)
                &:not(.wallet-search)
                    &:hover
                        background-color rgba(247, 247, 247, 0.15)

                        & .wrap-in-wallet
                            & p
                                color #fcfcfc

                            & .wallet
                                color #fcfcfc
                                opacity 0.7

            .wrap-in-wallet
                .separator
                    content ''
                    width 100%
</style>

<style lang="stylus">
    .menu
        z-index 4
        .type-list
            opacity 1

            .select
                min-width 200px
                display inline-grid

                .list
                    top inherit
                    bottom 25px

                    ul
                        background-color rgba(252, 252, 252, 0.7)
                        color #34343e

                        li
                            padding 9px 12px

                            &::before
                                top 14px
                                right 12px

                .value
                    color rgba(252, 252, 252, 0.7)

                    &::before
                        background none


    .wrap-between
        display flex
        justify-content space-between
        align-items center

        .new-wallet
            opacity 0.4
            font-family MuseoSansCyrl500 !important
            font-size 16px
            line-height 1.25
            color #fcfcfc

        img
            margin-right 20px

    .cursor-p
        cursor pointer
</style>
