<template>
    <div>
        <header class="navbar">
            <div class="navbar-nav" v-if="isNavigate">
                <div v-if="isBack" class="back-icon" @click="backLink">
                    <img src="../../assets/img/back-ic.svg" width="24.5" height="17">
                </div>

                <router-link :to="{ path: '/wallet' }" v-else>
                    <div class="logo">ALE</div>
                </router-link>

                <div class="actions">
                    <router-link
                        class="item"
                        active-class="active"
                        v-for="(link, indexLink) in navbarLinks"
                        :key="indexLink"
                        :to="{ path: link.path }"
                        exact
                    >
                        <img
                            :src="getNavbarIcon(link.iconName)"
                            :width="link.iconWidth"
                            :height="link.iconHeight"
                        >
                        <span
                            v-if="notifBadge && link.isBadge === true"
                              class="badge">
                        </span>
                    </router-link>
                </div>

            </div>
            <span class="title">{{ title }}</span>
            <div class="balance" :class="{ 'gridBalance': !rightMenu }" v-if="isBalance || rightMenu">
                <span class="count" v-if="isBalance">
                    <vue-numeric
                            :value="getCurrentWalletBalance"
                            :separator="correctLangSep"
                            :decimal-separator="correctLangDecSep"
                            :precision="correctValuePrecision"
                            :read-only="true"
                    />
                </span>
                <div
                        v-if="isBalance"
                        class="count"
                >
                    {{ 'ALE' }}
                </div>

                <div class="options" v-if="rightMenu">
                    <img src="../../assets/img/options.svg" alt="" width="3" height="16">

                    <div class="dropdown-options"
                         :class="{'horizontal-dropdown-options': rightMenu.horizontal, 'textList': !rightMenu.horizontal }">
                        <div class="item" v-for="(item, index) in rightMenu.list" :key="index">
                            <router-link v-if="item.type === 'link' && !item.isHide && !item.mail"
                                         :to="{ path: item.link }"
                                         active-class="active">
                                <span>{{ item.name }}</span>
                            </router-link>
                            <a v-if="item.mail" :href="'mailto:'+item.mail"><span>{{ item.name }}</span></a>
                            <a v-if="item.type === 'event'"
                               @click="startEvent(item.function)"><span>{{ item.name }}</span></a>
                            <span v-if="item.type === 'modal' && !item.isHide" @click="openModal(item.target)">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else></div>
        </header>

    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        component: {

        },
        props: {
            title: {
                type: String,
                required: true
            },
            isNavigate: [String, Boolean],
            isBalance: [String, Boolean],
            rightMenu: Object,
            isBack: [String, Boolean]
        },
        data() {
            return {
                isFullScreen: false,
            }
        },
        computed: {
            navbarLinks() {
                return this.$store.state.Navbar.links;
            },
            notifBadge() {
                return this.$store.state.Notifications.isNewNotification
            },

            getCurrentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },

            getCurrentWalletBalance: function () {
                if (this.getCurrentWallet !== null){
                    return this.getCurrentWallet.balance;
                }
                return 0;
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
                if (Number(this.getCurrentWalletBalance) % 1 !== 0 && Number(this.getCurrentWalletBalance) === this.getCurrentWalletBalance)
                    return this.getCurrentWalletBalance.toString().split('.')[1].toString().length;
                else
                    return 0;
            }
        },
        methods: {
            getNavbarIcon: function (name) {
                return require('../../assets/img/' + name + '.svg');
            },
            parseBalance: function (count) {
                return numeral(count).format('0,0');
            },
            backLink: function () {
                this.$router.go(-1);
            },
            openModal: function (name) {
                this.$modal.show(name);
            },
            startEvent(type) {
                this.$parent.$emit(type)
            },
            newSelect(value, id) {
                if (id === 'offersonpage') {
                    this.selectedOffersOnPage = value;
                }
                if (id === 'sortby') {
                    this.selectedSortBy = value;
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .count-currency
        cursor pointer
        display inline-block
        width 70px
        padding 0 10px 0 10px
        margin-right 0 !important

    .dropdown-currency
        position absolute
        background-color #0d1717
        list-style none
        padding 0
        margin-top 0
        top 11px
        right 84px

        li.active-currency
            background-color #ffd24f
            color #34343e

        li
            font-family Fairview
            font-size 32px
            color white
            padding 5px 10px 5px 10px
            cursor pointer

            &:hover
                background-color #ffd24f
                color #34343e

</style>
