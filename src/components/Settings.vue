<template>
    <div class="settings">
        <navbar :title="$t('pages.settings.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"/>

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <panel-heading :title="$t('pages.settings.panelHeadingGeneral')"
                                           :isTop="true"/>
                            <div class="form">
                                <input-control :label-value="$t('pages.settings.fullName')"
                                               :input-id="'fullname'"
                                               :input-value="userName"
                                               :input-type="'text'"/>

                                <div class="control"
                                     @click="checkPossibleOpenModal('changeemail', 'E-MAIL')">
                                    <div class="wrap-input">
                                        <label>E-mail</label>
                                        <div class="textbox">
                                            <p class="text full-line">
                                                {{ userEmail }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="control"
                                     @click="checkPossibleOpenModal('change-password', 'PASSWORD')">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings.password') }}</label>
                                        <div class="textbox">
                                            <p class="text full-line">
                                                {{ textLastUpdatedPass }}
                                                <!--{{ $t('pages.settings.passwordLabel') }}-->
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="control">
                                    <div class="wrap-input">
                                        <label for="upload-avatar" style="display: flex; flex-direction: column; cursor: pointer;">
                                            <p>Add photo</p>
                                            <div class="circle">
                                                <img :src="'https://ale-demo-4550.nodechef.com/'+ userAvatar" alt="" width="67" height="67" v-if="!newAvatar">
                                                <img :src="'https://ale-demo-4550.nodechef.com/'+ newAvatar" alt="" width="67" height="67" v-else>
                                            </div>
                                        </label>
                                        <input type="file" id="upload-avatar" name="upload-avatar" ref="uploadAvatar" @change="setUserAvatar" @click="onClickInputFile">
                                    </div>
                                </div>

                                <div class="control border-none"
                                     @click.stop="changeLanguage">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings.language') }}</label>
                                        <select-control :current="selectedLang"
                                                        :all-options="['English', 'Русский']"
                                                        :id="'language'"/>
                                    </div>
                                </div>
                            </div>

                            <panel-heading :title="$t('pages.settings.theme')"
                                           :isTop="false"/>
                            <!-- <div class="group-settings">
                                <div class="form select-main" @click="selectTheme('main')">
                                    <img src="../../static/img/logo_main.svg" alt="">
                                </div>
                                <div class="form select-dark" @click="selectTheme('dark')">
                                    <img src="../../static/img/logo_dark.svg" alt="">
                                </div>
                                <div class="form select-white" @click="selectTheme('white')">
                                    <img src="../../static/img/logo_white.svg" alt="">
                                </div>  -->
                                <div class="form">
                                    <div class="theme-list">
                                        <div class="theme-item active" v-for="theme in themes" :key="theme" @click="selectTheme(theme)" :class="'theme-' + theme">
                                            <div class="theme-header">
                                                <span class="theme-logo">ALEHUB</span>
                                            </div>
                                            <div style="display: flex; height: 100%;">
                                                <div class="theme-menu">
                                                    <div class="menu-item"></div>
                                                </div>
                                                <div class="theme-main">
                                                    <div class="theme-btn">
                                                        <div class="button button-first"></div>
                                                        <div class="button button-second"></div>
                                                    </div>
                                                    <div class="theme-block"></div>
                                                    <div class="theme-line recieved"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- </div> -->

                            <panel-heading :title="$t('pages.settings.security')"/>
                            <div class="form">
                                <div class="control">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings._2fa') }}</label>
                                        <div class="wrap-container">
                                            <p class="text">
                                                {{ $t('pages.settings._2faText') }}
                                            </p>
                                            <switch-control v-if="userStatus === 'success'"
                                                            @click.native.prevent="openChangeTwoAuthModal"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="dataProcessing"
                                 class="wrap-spinner">
                                <spinner/>
                            </div>

                            <div class="text-center">
                                <a href="#"
                                   class="logout-link"
                                   @click="logout">
                                    {{ $t('pages.settings.logout')}}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <change-password-modal/>
        <change-email-modal/>
        <change-two-auth-modal/>

    </div>
</template>


<script>
    import Navbar from './layouts/Navbar';
    import SelectControl from './layouts/forms/Select';
    import InputControl from './layouts/forms/InputControl';
    import SwitchControl from './layouts/forms/SwitchControl';
    import PanelHeading from './layouts/PanelHeading';
    import ChangePasswordModal from './modals/ChangePassword';
    import ChangeEmailModal from './modals/ChangeEmail';
    import ChangeTwoAuthModal from './modals/ChangeTwoAuth';
    import Spinner from './layouts/Spinner';

    import {mapGetters} from 'vuex';
    import {mapMutations} from 'vuex';

    export default {
        name: 'settings',
        components: {
            Navbar,
            SelectControl,
            SwitchControl,
            InputControl,
            PanelHeading,
            ChangePasswordModal,
            ChangeEmailModal,
            ChangeTwoAuthModal,
            Spinner
        },
        data() {
            return {
                isShow: false,
                notifText: '',
                switchValueAuth: true,
                selectedLanguage: 'English',
                newName: '',
                dataProcessing: false,
                newAvatar: '',
                themes: [
                       'main',
                       'dark',
                       'white'
                ],
            }
        },
        watch: {},
        computed: {
            ...mapGetters([
                'authStatus',
                'userStatus',
                'userName',
                'userEmail',
                'userAvatar',
                'userTwoAuth',
                'userLastUpdatedPassword',
                'twoAuthStatus'
            ]),
            selectedLang: function () {
                switch (localStorage.getItem('systemLang')) {
                    case 'eng':
                        return 'English';
                    case 'rus':
                        return 'Русский';
                    default:
                        return 'English';
                }
            },
            textLastUpdatedPass: function () {
                let now = new Date(),
                    diff = Math.floor((now.getTime() - parseInt(this.userLastUpdatedPassword)) / (86400000));
                if (diff === 0)
                    return 'The last password change was today';
                else if (diff === 1)
                    return 'Last password change was yesterday';
                else if (diff < 4 && localStorage.getItem('systemLang') === 'rus')
                    return this.$t('pages.settings.passwordLabel.first')+' '+ diff+' '+this.$t('pages.settings.passwordLabel.second');
                else if (localStorage.getItem('systemLang') === 'rus')
                    return this.$t('pages.settings.passwordLabel.first')+' '+ diff+' '+this.$t('pages.settings.passwordLabel.third');
                else if (diff < 4)
                    return this.$t('pages.settings.passwordLabel.first')+' '+ diff+' '+this.$t('pages.settings.passwordLabel.second');
            }
        },
        methods: {
            ...mapMutations({
                setTheme: 'SET_THEME'
            }),
            openModal: function (name) {
                this.$modal.show(name);
            },
            checkPossibleOpenModal: function (name, type) {
                if (this.userTwoAuth)
                    this.openModal(name);
                else
                    this.$toasted.show(this.$t("modals.error.changePassword.first") +' '+type+' '+this.$t("modals.error.changePassword.second"), {
                        duration: 10000,
                        type: 'error',
                        action: {
                            text: 'hide',
                            class: 'toasted-action-hide',
                            onClick: (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        }
                    });
            },
            logout: function () {
                this.dataProcessing = true;

                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                }, 40);
                this.$store.dispatch('authLogout'
                ).then(() => {
                    this.dataProcessing = false;
                    this.$router.push('/login')
                }).catch(() => {
                    this.dataProcessing = false;
                    this.$toasted.show(this.$t('modals.error.logout'), {
                        duration: 10000,
                        type: 'error',
                    });
                });
            },
            newSelect: function (value, id) {
                if (id === 'language') {
                    if (value === 'English')
                        localStorage.setItem('systemLang', 'eng');
                    if (value === 'Русский')
                        localStorage.setItem('systemLang', 'rus');
                    this.selectedLanguage = value;
                    this.$i18n.locale = localStorage.getItem('systemLang');
                    this.$parent.$emit('changeSystemLanguage');
                }
            },
            changeLanguage: function (e) {
                if (e.target.localName === 'li')
                    return false;
                if (e.target.className === 'value')
                    return false;
                document.getElementsByClassName('value')[0].click();
            },
            openChangeTwoAuthModal: function () {
                this.$store.dispatch('setChangeTwoAuthStatus',
                    !this.userTwoAuth
                ).then(() => {
                    this.openModal('change-two-auth');
                }).catch(() => {
                    console.log('Error set change two auth status Settings.vue')
                });
            },
            selectTheme: function (name) {
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
            onClickInputFile: function () {
                this.$refs.uploadAvatar.click();
            },
            setUserAvatar: function () {
                let avatar = new FormData();
                avatar.append('avatar', document.getElementById('upload-avatar').files[0]);

                this.$store.dispatch('setAvatar', avatar).then((resp) => {
                    console.log('avatar success');
                    this.newAvatar = resp.data.avatar_path;
                    this.$toasted.show(this.$t('modals.success.setAvatar'), {
                        duration: 10000,
                        type: 'success',
                    });
                }).catch(() => {
                    console.log('avatar error');
                    this.$toasted.show(this.$t('modals.error.setAvatar'), {
                        duration: 10000,
                        type: 'error'
                    });
                })
            }
        },
        mounted() {
            this.$on('onselect', function (id, value) {
                this.newSelect(id, value)
            });

            this.$on('changeFullName', function (value) {
                if (this.userName !== value) {
                    this.$store.dispatch('changeUserName', {newName: value}).then(() => {
                        this.$toasted.show(this.$t('modals.success.changeName'), {
                            duration: 5000,
                            type: 'success',
                        });
                    });
                }
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .form
        margin-bottom 10px
        .control
            &:last-child
                border-bottom none
            .wrap-input
                .full-line
                    width 100%
                
                button
                    margin-left 0
                    width 67px

                .circle
                    border-radius 50%
                    width 67px
                    height 67px
                    background-color #d3d9e1
                    margin-bottom 12px

                    img
                        border-radius 50%

                p
                    margin-top 0
                
                #upload-avatar
                    opacity 0
                    position absolute

                .error
                    color #b10303
                    text-transform none 
                    font-weight 500

    .form .deletelink
        margin-top -8px
        padding-top 0

    .border-none
        border none

    .form .deletelink
        margin-top -8px
        padding-top 0px

    .theme-list
        margin-left 16px 
        margin-right 16px 
        margin-top 22px 
        margin-bottom 22px 
        display flex

        @media(max-width 790px)
            flex-wrap wrap

        .theme-item
            background-color #f7f7f7
            width 200px 
            height 120px 
            margin-right 40px 
            border 1px solid #d1d1d1 
            display flex 
            flex-direction column
            opacity 1

            @media(max-width 790px)
                margin-bottom 24px
        
            &:last-child
                margin-right 0

            &:nth-child(2)
                @media(max-width 600px)
                    margin-right 0

                @media(max-width 550px)
                    margin-right 40px

            &.theme-main
                .theme-menu
                    background-color #474b4b

                .theme-btn
                    .button-first
                        background-color #ffd24f

                    .button-second
                        background-color #e6e7e7

                .theme-line
                    &.recieved
                        background-color #f9e095

            &.theme-dark
                &.theme-item
                    background-color #4a4e65

                .theme-menu
                    background-color #404455

                    .menu-item
                        background-color #4a4e65

                .theme-btn
                    .button-first
                        background-color #28388e

                    .button-second
                        background-color #20232a

                .theme-line, .theme-block
                    background-color #393a4a

                    &.recieved
                        background-color #5b5f73

            &.theme-white
                .theme-menu
                    background-color #aaaec1

                .theme-header
                    background-color #eff0f3

                .theme-logo
                    color #43414a

                .theme-btn
                    .button-first
                        background-color #3c4af0

                    .button-second
                        background-color #adb1c3

                .theme-line, .theme-block
                    background-color #eff0f3

                    &.recieved
                        background-color #fff
                        
            .theme-header
                height 20px
                width 100% 
                background-color #0d1717 
                display flex 
                justify-content center 
                align-items center

            .theme-logo
                font-family Fairview
                color #fcfcfc 
                font-size 14px

            .theme-menu
                height 100% 
                width 50px
                position relative

                .menu-item
                    position absolute
                    background-color #f7f7f7
                    height 15px 
                    width 48px
                    top 15px

            .theme-main
                margin 5px

            .theme-btn
                display flex
                justify-content flex-end
                margin-bottom 5px
                margin-top 3px

                .button
                    width 30px
                    height 10px
                    background-color #e6e7e7

                    &:first-child
                        margin-right 5px

            .theme-block
                width 140px
                height 20px
                background-color #f0f0f0
                margin-bottom 10px

            .theme-line
                width 140px
                height 10px
                background-color #f0f0f0
                margin-bottom 12px

    @media (max-width: 1024px)
        .main
            .content
                padding-left 0

    @media (max-width: 425px)
        .form
            .control
                .wrap-input
                    padding-left 0
</style>