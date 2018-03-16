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
                    <div class="row">
                        <div class="col-12">

                            <Panel-heading :title="$t('pages.settings.panelHeadingGeneral')" :isTop="true"/>

                            <div class="form">

                                <div class="control" @click.stop="changeLanguage">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings.language') }}</label>
                                        <select-control
                                            :current="selectedLang"
                                            :allOptions="['English', 'Русский']"
                                            :id="'language'"
                                        />
                                    </div>
                                </div>

                                <!--<router-link  :to="{ path: '/sync' }">12323</router-link>-->

                            </div><br>

                            <Panel-heading :title="'Select theme'" :isTop="false"/>

                            <div class="form">

                                <div class="control" @click.stop="changeLanguage">
                                    <div class="wrap-input">
                                        <label>{{ $t('pages.settings.language') }}</label>
                                        <select-control
                                            :current="selectedLang"
                                            :allOptions="['English', 'Русский']"
                                            :id="'language'"
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import SelectControl from './layouts/forms/Select';
    import PanelHeading from './layouts/PanelHeading';

    import { mapMutations } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        name: 'settings',
        data() {
            return {
                selectedLanguage: 'English'
            }
        },
        components: {
            Navbar,
            SelectControl,
            PanelHeading
        },
        computed: {
            selectedLang() {
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
            newSelect(value, id) {
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
            changeLanguage(e) {
                if (e.target.localName === 'li') return false;
                if (e.target.className === 'value') return false;
                document.getElementsByClassName('value')[0].click();
            }
        },
        mounted() {
            this.$on("onselect", function (id, value) {
                this.newSelect(id, value)
            });
        }
    }
</script>

<style lang="scss" scoped>
    .control {
        border-bottom: none;
        & .wrap-input {
            & .full-line {
                width: 100%;
            }
        }
    }

    .form .deletelink {
        margin-top: -8px;
        padding-top: 0px;
    }
</style>
