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
                            :src="getIcon(link.iconName)"
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
            <div class="themes">
                <label for="main">Main</label>
                <input
                        type="radio" id="main"
                        class="duration_arr"
                        value="Main" name="theme"
                        :checked="selectedTheme === 'main'"
                        @click="selectTheme('main')"
                >
                <label for="dark">Dark</label>
                <input
                        type="radio" id="dark"
                        class="duration_arr"
                        value="Dark" name="theme"
                        :checked="selectedTheme === 'dark'"
                        @click="selectTheme('dark')"
                >
                <label for="white">White</label>
                <input
                        type="radio" id="white"
                        class="duration_arr"
                        value="White" name="theme"
                        :checked="selectedTheme === 'white'"
                        @click="selectTheme('white')"
                >
            </div>
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
                    <img :src="getIcon('options')" alt="" width="3" height="16">

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
    import {mapMutations} from "vuex";

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
            selectedTheme () {
                return this.$store.state.Themes.theme;
            },
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
            },
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            }
        },
        methods: {
            ...mapMutations({
                setTheme: "SET_THEME"
            }),
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
            },
            selectTheme (name) {
                let body = document.getElementsByTagName('body')[0];
                this.setTheme(name);
                switch (name) {
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
            },
            getIcon(name) {
                if (this.selectedTheme === 'dark') return require(`../../assets/img/${name}.svg`);
                else if (this.selectedTheme === 'white') return require(`../../assets/img/${name}_white.svg`);
                else return require(`../../assets/img/${name}.svg`);
            }
        },
        created () {
            this.selectTheme(this.selectedTheme);
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
