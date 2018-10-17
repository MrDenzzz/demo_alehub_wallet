<template>
    <div class="balance"
         :class="{ 'gridBalance': !rightMenu }">
        <span class="count" v-if="isBalance">
            <vue-numeric :value="currentWalletBalance"
                         :separator="correctLangSep"
                         :decimal-separator="correctLangDecSep"
                         :precision="correctValuePrecision"
                         :read-only="true"/>
        </span>

        <div v-if="isBalance"
             class="count">
            {{ 'ALE' }}
        </div>

        <div class="options"
             v-if="rightMenu">
            <img width="3"
                 height="16"
                 :src="getIcon('options')">

            <div class="dropdown-options"
                 :class="{'horizontal-dropdown-options': rightMenu.horizontal, 'textList': !rightMenu.horizontal }">
                <div class="item"
                     v-for="(item, index) in rightMenu.list"
                     :key="index">
                    <router-link v-if="item.type === 'link' && !item.isHide && !item.mail"
                                 :to="{ path: item.link }"
                                 active-class="active">
                        <span>
                            {{ item.name }}
                        </span>
                    </router-link>
                    <a v-if="item.mail"
                       :href="'mailto:'+item.mail">
                        <span>
                            {{ item.name }}
                        </span>
                    </a>
                    <a v-if="item.type === 'event'"
                       @click="startEvent(item.function)">
                        <span>
                            {{ item.name }}
                        </span>
                    </a>
                    <span v-if="item.type === 'modal' && !item.isHide"
                          @click="openModal(item.target)">
                        {{ item.name }}
                    </span>
                </div>
            </div>
        </div>
        <div id="hamburger"
             class="hamburger"
             :class="{'is-active': collapsed}"
             @click="toggleMenu()">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>
        <div class="profile-icon" @click="goToProfile" v-if="isProfile == false">
            <img :src="'https://ale-demo-4550.nodechef.com/'+ userAvatar">
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'NavbarBalance',
        props: {
            rightMenu: {
                type: Object,
                required: false,
            },
            isBalance: {
                type: Boolean,
                required: true,
            },
            collapsed: {
                type: Boolean,
                required: true,
            },
            isProfile: {
                type: Boolean,
                required: false
            }
        },
        computed: {
            ...mapGetters(
                [
                    'currentWalletBalance',
                    'userAvatar'
                ]
            ),
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
            getIcon: function (name) {
                switch (this.selectedTheme) {
                    case 'dark':
                        return require(`../../../assets/img/${name}.svg`);
                    case 'white':
                        return require(`../../../assets/img/${name}_white.svg`);
                    default:
                        return require(`../../../assets/img/${name}.svg`);
                }
            },
            startEvent: function (item) {
                this.$parent.$emit('startEvent', item);
            },
            openModal: function (target) {
                this.$parent.$emit('openModal', target);
            },
            toggleMenu: function () {
                this.$parent.$emit('toggleMenu');
            },
            goToProfile: function () {
                this.$router.push('/profile')
            }
        }
    }
</script>

<style lang="stylus" scoped>
.profile-icon
    width 64px
    height 100%
    display flex
    justify-content center
    align-items center
    margin-right 18px
    &:hover
        background: #474b4b;
        cursor: pointer;

    img
        width 36px
        height 36px
        object-fit cover
        border-radius 50%
</style>
