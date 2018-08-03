<template>
    <div>
        <header class="navbar">
            <div class="navbar-nav" v-if="isNavigate">
                <back-button v-if="isBack" @click.native="backLink" />

                <router-link :to="{ path: '/' }" v-else>
                    <div class="logo">ALEHUB</div>
                </router-link>

                <actions 
                    :navbarLinks="navbarLinks"
                    :notifBadge="notifBadge"
                    :selectedTheme="selectedTheme"
                />
            </div>

            <span class="title">{{ title }}</span>

            <balance 
                :rightMenu="rightMenu"
                :isBalance="isBalance"
                :collapsed="collapsed"
            />
        </header>

        <mobile-menu 
            :collapsed="collapsed"
            :navbarLinks="navbarLinks"
            :rightMenu="rightMenu"
        />
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import BackButton from "./Navbar/BackButton"
    import Actions from "./Navbar/Actions"
    import Balance from "./Navbar/Balance"
    import MobileMenu from "./Navbar/MobileMenu"

    export default {
        name: 'Navbar',
        components: {
            BackButton,
            Actions,
            Balance,
            MobileMenu
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
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            navbarLinks: function () {
                return this.$store.state.Navbar.links;
            },
            notifBadge: function () {
                return this.$store.state.Notifications.isNewNotification
            }
        },
        methods: {
            toggleMenu: function () {
                let nav = document.querySelector(".mobile-menu"),
                    navToggle = document.querySelector("#hamburger"),
                    closeMenu = () => {
                        if (!event.target.classList.contains('hamburger') &&
                            !event.target.classList.contains('line') && nav.classList.contains('mobile-menu')) {
                            nav.classList.remove("is-collapsed");
                            navToggle.classList.remove('is-active');
                        }
                    };

                if (!nav.classList.contains('is-collapsed')) {
                    this.collapsed = true;
                    nav.classList.add("is-collapsed");
                    navToggle.classList.add('is-active');
                    document.addEventListener('click', closeMenu, true)
                } else {
                    this.collapsed = false;
                    nav.classList.remove("is-collapsed");
                    navToggle.classList.remove('is-active');
                    document.removeEventListener('click', closeMenu, true)
                }
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
        },
        mounted() {
            this.$on("startEvent", item => {
                this.startEvent(item);
            });
            this.$on("openModal", target => {
                this.openModal(target);
            });
            this.$on("toggleMenu", () => {
                this.toggleMenu();
            });
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
