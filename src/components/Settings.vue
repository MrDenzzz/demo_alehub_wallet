<template>
    <div class="settings">
        <Navbar
                :title="$t('pages.settings.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <Spinner v-if="false"/>
                    <div class="row" v-else>
                        <div class="col-12">
                            <panel-heading :title="$t('pages.settings.panelHeadingGeneral')" :isTop="true"/>
                            <div class="form">
                                <input-control
                                        :label-value="$t('pages.settings.fullName')"
                                        :input-id="'fullname'"
                                        :input-value="userName"
                                        :input-type="'text'"
                                />

                                <div class="control" @click="openModal('changeemail')">
                                    <div class="wrap-input">
                                        <label>E-mail</label>
                                        <div class="textbox">
                                            <p
                                                    class="text full-line"
                                            >
                                                {{userEmail}}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="control" @click="openModal('changepassword')">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings.password') }}</label>
                                        <div class="textbox">
                                            <p
                                                    class="text full-line"
                                            >
                                                Last updated 15 days ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="control border-none" @click.stop="changeLanguage">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings.language') }}</label>
                                        <select-control
                                                :current="selectedLang"
                                                :all-options="['English', 'Русский']"
                                                :id="'language'"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Panel-heading :title="$t('pages.settings.theme')" :isTop="false"/>

                            <div class="group-settings">
                                <div class="form select-main" @click="selectTheme('main')">
                                    <img src="../../static/img/logo_main.svg" alt="">
                                </div>
                                <div class="form select-dark" @click="selectTheme('dark')">
                                    <img src="../../static/img/logo_dark.svg" alt="">
                                </div>
                                <div class="form select-white" @click="selectTheme('white')">
                                    <img src="../../static/img/logo_white.svg" alt="">
                                </div>
                            </div>

                            <panel-heading
                                    :title="$t('pages.settings.security')"
                            />
                            <div class="form">
                                <div class="control">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings._2fa') }}</label>
                                        <div class="wrap-container">
                                            <p class="text">
                                                {{ $t('pages.settings._2faText') }}
                                            </p>
                                            <switch-control
                                                    v-if="userStatus === 'success'"
                                                    :checked="updatableTwoAuth"
                                                    :flag="changeFlag"
                                                    :id="'twoauth'"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <a
                                        href="#"
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
    import sha256 from 'sha256';
    import {mapActions} from 'vuex';
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
                // switchValueAuth: this.userTwoAuth,
                switchValueAuth: true,
                // changeableValue: false,
                selectedLanguage: 'English',

                flag: null,

                newName: ''
            }
        },
        watch: {},
        computed: {
            ...mapGetters([
                'authStatus',
                'userStatus',
                'userName',
                'userEmail',
                'userTwoAuth',
                'twoAuthStatus'
            ]),
            changeFlag: function () {
                return this.flag;
            },
            updatableTwoAuth: function () {
                return this.userTwoAuth;
            },
            selectedLang: function () {
                switch (localStorage.getItem('systemLang')) {
                    case 'eng':
                        return 'English';
                    case 'rus':
                        return 'Русский';
                    default:
                        return 'English';
                }
            }
        },
        methods: {
            ...mapMutations({
                setTheme: 'SET_THEME'
            }),
            ...mapActions([
                'authLogout'
            ]),
            logout: function () {
                this.$store.dispatch('authLogout'
                ).then(() => {

                    this.$router.push('/login')
                }).catch(() => {

                });
                this.$router.push('/login');
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
            openModal: function (name) {
                this.$modal.show(name);
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
            }
        },
        created() {
        },
        mounted() {
            this.$on('onselect', function (id, value) {
                this.newSelect(id, value)
            });
            this.$on('changePassword', function (password) {
                // if (data.new === '') {
                //     this.isShow = true;
                //     this.isSuccessNotif = false;
                //     this.notifText = 'Password is not';
                // } else
                //     this.closeModal('change-password');
            });
            this.$on('receiveFullName', function (value) {
                //this func is not need
                // this.newName = value;
            });
            this.$on('changeChecker', function (value) {
                // this.changeableValue = value;
                this.flag = value;
                // console.log(this.flag, '111');
                this.openModal('change-two-auth');
            });
            this.$on('cancelSwitchControl', function (value) {
                this.switchValueAuth = value;
            });


            this.$on('changeFullName', function (value) {
                if (this.userName !== value) {
                    this.$store.dispatch('changeUserName', {newName: value}).then(() => {
                        // this.$router.push('/login')
                        console.log('change user name');
                    });
                }
            });

            this.$on('changeEmail', function (email) {
                if (email) {
                    this.$toasted.show(`A confirmation email has been sent to ${email}`, {
                        duration: 5000,
                        type: 'success',
                    });
                }
            });

            this.$on('changePassword', function () {
                this.$toasted.show(`Password changed`, {
                    duration: 5000,
                    type: 'success',
                });
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
    .form .deletelink
        margin-top -8px
        padding-top 0

    .border-none
        border none

    .form .deletelink 
        margin-top -8px
        padding-top 0px
    
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