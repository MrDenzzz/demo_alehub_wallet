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
                    <Spinner v-if="authStatus !== 'success' && userStatus !== 'success'"/>
                    <div class="row" v-else>
                        <div class="col-12">
                            <panel-heading :title="'General'" :isTop="true"/>
                            <div class="form">
                                <input-control
                                        :label-value="'Full name'"
                                        :input-id="'fullname'"
                                        :input-value="userName"
                                        :input-type="'text'"
                                />

                                <div class="control">
                                    <div class="wrap-input">
                                        <label>E-mail</label>
                                        <div class="textbox">
                                            <p
                                                    class="text full-line"
                                                    @click="openModal('changeemail')"
                                            >
                                                {{userEmail}}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="control">
                                    <div class="wrap-input">
                                        <label>Password</label>
                                        <div class="textbox">
                                            <p
                                                    class="text full-line"
                                                    @click="openModal('changepassword')"
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

                            <panel-heading
                                    :title="'Security'"
                            />
                            <div class="form">
                                <div class="control">
                                    <div class="wrap-input">
                                        <label>Two-factor authentification</label>
                                        <div class="wrap-container">
                                            <p class="text">
                                                You can add a second layer of protection with 2-Step
                                                Verification, switch requires a single-use code sent
                                                to your phone or using third-party authentification app.
                                            </p>
                                            <switch-control
                                                    v-if="userStatus === 'success'"
                                                    :checked="updatableTwoAuth"
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
                                    Logout
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

        <!-- изменить на тостер -->

        <!--<notif-line-->
        <!--:isShow="isShow"-->
        <!--:text="notifText"-->
        <!--:isSuccess="isSuccessNotif"-->
        <!--/>-->

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
                selectedLanguage: 'English'
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
            ...mapActions([
                'authLogout'
            ]),
            logout: function () {
                this.$store.dispatch('authLogout').then(() => {
                    this.$router.push('/login')
                });

                this.$router.push('/login');
            },
            // changeFullName: function () {
            //     if () {
            //
            //     }
            // },
            newSelect: function (value, id) {
                if (id === "language") {
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
            }
        },
        created() {

        },
        mounted() {

            this.$on('onselect', function (id, value) {
                this.newSelect(id, value)
            });
            this.$on('changePassword', function (password) {
                if (data.new === '') {
                    this.isShow = true;
                    this.isSuccessNotif = false;
                    this.notifText = 'Password is not';
                } else
                    this.closeModal('change-password');
            });
            this.$on('receiveFullName', function (value) {
                if (value !== this.userName) {

                }
            });
            this.$on('changeChecker', function (value) {
                // this.changeableValue = value;
                this.openModal('change-two-auth');
            });
            this.$on('cancelSwitchControl', function (value) {
                this.switchValueAuth = value;
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

    .form .deletelink {
        margin-top: -8px;
        padding-top: 0px;
    }

    @media screen and (max-width: 1024px) {
        .main {
            & .content {
                padding-left: 0;
            }
        }
    }
</style>
