<template>
    <div>
        <header class="navbar">
            <div class="navbar-nav" v-if="isNavigate">
                <div v-if="isBack" class="back-icon" @click="backLink">
                    <img src="../../assets/img/back-ic.svg" width="24.5" height="17">
                </div>

                <router-link :to="{ path: '/' }" v-else>
                    <div class="logo">
                        ALEHUB
                        <!--<img :src="getLogo()" alt="">-->
                    </div>
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
            <div class="balance" :class="{ 'gridBalance': !rightMenu }">
                <span class="count" v-if="isBalance">
                    <vue-numeric
                            :value="currentWalletBalance"
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
                <div class="hamburger" :class="{'is-active': collapsed}" id="hamburger" @click="toggleMenu()">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </div>
            </div>
        </header>
        <div class="mobile-menu" :class="{ 'is-collapsed': collapsed }">
            <div class="menus">
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
                    <span class="linkName">{{$t('navbar.'+link.name)}}</span>
                </router-link>
            </div>
            <hr v-if="rightMenu">
            <div class="scMobileMenu" v-if="rightMenu">
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
</template>

<script>
    import {mapGetters} from "vuex";

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
                collapsed: false
            }
        },
        computed: {
            ...mapGetters([
                'currentWalletBalance'
            ]),
            selectedTheme () {
                return this.$store.state.Themes.theme;
            },
            navbarLinks() {
                return this.$store.state.Navbar.links;
            },
            notifBadge() {
                return this.$store.state.Notifications.isNewNotification
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
                if (Number(this.currentWalletBalance) % 1 !== 0)
                    return this.currentWalletBalance.toString().split('.')[1].toString().length;
                else
                    return 0;
            }
        },
        methods: {
            getLogo () {
                switch (this.selectedTheme) {
                    case 'main':
                        return require('../../../static/img/logo_main.svg');
                    case 'dark':
                        return require('../../../static/img/logo_dark.svg');
                    case 'white':
                        return require('../../../static/img/logo_white.svg');
                    default:
                        return require('../../../static/img/logo_main.svg');
                }
            },
            toggleMenu () {
                let nav = document.querySelector(".mobile-menu"),
                    navToggle = document.querySelector("#hamburger");
                if (!nav.classList.contains('is-collapsed')) {
                    this.collapsed = true;
                    nav.classList.add("is-collapsed");
                    navToggle.classList.add('is-active');
                    document.addEventListener('click', closeMenu, true)
                }
                else {
                    this.collapsed = false;
                    nav.classList.remove("is-collapsed");
                    navToggle.classList.remove('is-active');
                    document.removeEventListener('click', closeMenu, true)
                }
                function closeMenu () {
                    if (!event.target.classList.contains('hamburger') && !event.target.classList.contains('line') && nav.classList.contains('mobile-menu')) {
                        nav.classList.remove("is-collapsed");
                        navToggle.classList.remove('is-active');
                    }
                }
            },
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
            startEvent: function (type) {
                this.$parent.$emit(type)
            },
            newSelect: function (value, id) {
                if (id === 'offersonpage') {
                    this.selectedOffersOnPage = value;
                }
                if (id === 'sortby') {
                    this.selectedSortBy = value;
                }
            },
            getIcon: function (name) {
                if (this.selectedTheme === 'dark') return require(`../../assets/img/${name}.svg`);
                else if (this.selectedTheme === 'white') return require(`../../assets/img/${name}_white.svg`);
                else return require(`../../assets/img/${name}.svg`);
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
