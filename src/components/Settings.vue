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
                    <Spinner v-if="authStatus !== 'success'" />
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
                                                    :checked="twoauth"
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

        <change-password-modal />
        <change-email-modal />

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
    import ChangeEmailModal from './modals/ChangeEmailModal';
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
            Spinner
        },
        data() {
            return {
                isShow: false,
                notifText: '',
                twoauth: this.userTwoAuth,
                selectedLanguage: 'English'
            }
        },
        computed: {
            ...mapGetters([
                'authStatus',
                'userName',
                'userEmail',
                'userTwoAuth'
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
        mounted() {

            // console.log(this.userName, 'this.userName');

            this.$on('onselect', function (id, value) {
                this.newSelect(id, value)
            });
            this.$on('changePassword', function (password) {
                if (data.new === '') {
                    this.isShow = true;
                    this.isSuccessNotif = false;
                    this.notifText = 'Password is not';
                } else
                    this.closeModal('changepassword');
            });
            this.$on('receiveTitleOffer', function (value) {
                console.log(value, 'zxczxc');
            });
            this.$on('changeChecker', function (value) {
                // this.twoauth = value;

                this.openModal();

                // this.$store.dispatch('twoauthRequest').then(() => {
                    // this.$router.push('/')

                // });


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
</style>
