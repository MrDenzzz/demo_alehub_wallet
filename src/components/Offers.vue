<template>
    <div class="contract-list">
        <navbar title="Contract List"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"/>
        <div class="info-header">
            <div class="info-wrap">
                <div class="info">
                    <span class="title">Contract period</span>
                    <span class="bold-text">{{ infoHeader.startDate}} - {{ infoHeader.finalDate }}</span>
                </div>
                <div class="info">
                    <span class="title">Name</span>
                    <span class="bold-text">{{ infoHeader.name }}</span>
                </div>
                <div class="info">
                    <span class="title">Rating</span>
                    <span class="bold-text">{{ infoHeader.rating }}</span>
                </div>
                <div class="info">
                    <span class="title">Certification</span>
                    <span class="bold-text">{{ infoHeader.certification }}</span>
                </div>
                <div class="info">
                    <span class="title">Verified</span>
                    <span class="bold-text">{{ infoHeader.verified }}</span>
                </div>
                <div class="info">
                    <span class="bold-text">Verified by me</span>
                </div>
            </div>
            <div>
                <img :src="getIcon('menu')" alt="">
            </div>
        </div>

        <div class="row-page">
            <div class="sidebar">
                <div class="vertical-progress">
                    <div class="circle circle-top circle-yellow">
                        <div class="triangle-icon"></div>
                    </div>

                    <div class="whole-line">
                        <div class="selected-area">
                            <div class="marker-calendar marker-calendar-top" @click="openedTopDatepicker = !openedTopDatepicker">
                                <div class="block">
                                    <img src="../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
                                    <div class="triangle"></div>
                                </div>
                            </div>

                            <datepicker id="1"
                                        class="2"
                                        v-if="openedTopDatepicker"
                                        v-model="testTopDatepicker"
                                        :language="$t('modals.pdf.lang')"
                                        :inline="true"/>

                            <div class="marker-calendar marker-calendar-bottom">
                                <div class="block">
                                    <img src="../../static/img/calendar-ic_black.svg" alt="" width="16px" height="16px">
                                    <div class="triangle"></div>
                                </div>
                            </div>
                        </div>
                        <div class="dividers-container">
                            <div class="divider horizontal" v-for="n in 8" :key="n"></div>
                        </div>
                        <button class="circle circle-big circle-yellow">
                            <img src="../../static/img/ale-logo.svg" alt="" width="21px" height="25px">
                            <div class="triangle">
                                <div class="filters-block">
                                    <div class="circle circle-gray">
                                        <span class="title">TS</span>
                                    </div>
                                    <div class="circle circle-gray">
                                        <span class="title">TS</span>
                                        <span class="subtitle">EX</span>
                                    </div>
                                    <div class="circle circle-gray">
                                        <span class="title">CH</span>
                                    </div>
                                    <div class="circle circle-gray"
                                         :class="{qa: qaIsActive}"
                                         @click="qaIsActive = !qaIsActive">
                                        <span class="title">QA</span>
                                    </div>
                                    <div class="dialog" v-if="qaIsActive">
                                        <form>
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input type="text">
                                            </div>
                                            <div class="form-group">
                                                <label>Contractor rating</label>
                                                <div class="double-input-block">
                                                    <div class="double-input">
                                                        <label>from</label>
                                                        <input type="text">
                                                    </div>
                                                    <div class="double-input">
                                                        <label>to</label>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="one-line">
                                                    <label>Country</label>
                                                    <button>Select all</button>
                                                </div>
                                                <input type="text">
                                                <div class="form-checkbox country">
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>Afhganistan</span>
                                                    </label>
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>Åland Islands</span>
                                                    </label>
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>Albania</span>
                                                    </label>
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>Algeria</span>
                                                    </label>
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>American Samoa</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Certification</label>
                                                <div class="form-checkbox">
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>ГОСТ</span>
                                                    </label>
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span>DIN</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Verified</label>
                                                <div class="form-radio">
                                                    <label class="control control-radio">
                                                        <input type="radio"
                                                               name="verified">
                                                        <div class="control-indicator"></div>
                                                        <span>Yes</span>
                                                    </label>
                                                    <label class="control control-radio">
                                                        <input type="radio"
                                                               name="verified">
                                                        <div class="control-indicator"></div>
                                                        <span>No</span>
                                                    </label>
                                                    <label class="control control-radio">
                                                        <input type="radio"
                                                               name="verified">
                                                        <div class="control-indicator"></div>
                                                        <span>Doesn't matter</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="form-checkbox">
                                                    <label class="control control-checkbox">
                                                        <input type="checkbox">
                                                        <div class="control-indicator"></div>
                                                        <span class="bold-text">Verified by me</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                        <button class="buttons btn btn-yellow">Clear</button>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div class="circle circle-bottom circle-green">
                        <img src="../../static/img/icons-for-circle/infinity.svg" alt="" width="12px" height="6px">
                        <div class="triangle">
                            <div class="filters-block">
                                <div class="circle circle-green">
                                    <img src="../../static/img/icons-for-circle/infinity.svg" alt="">
                                </div>
                                <div class="circle circle-yellow">
                                    <img src="../../static/img/icons-for-circle/check.svg" alt="">
                                </div>
                                <div class="circle circle-red">
                                    <img src="../../static/img/icons-for-circle/hourglass.svg" alt="">
                                </div>
                                <div class="circle circle-black">
                                    <img src="../../static/img/icons-for-circle/line.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-result">
                <div class="progress-list">
                    <div class="progress-item"
                         v-for="project in projects"
                         :key="project.id"
                         :class="project.status"
                         :style="{width: 10 * project.steps + '%'}">
                        <div class="row-top">
                            <div class="project-info">
                                <div class="circle circle-big">
                                    <img src="#" alt="">
                                </div>
                                <router-link class="info-text"
                                             tag="div"
                                             style="cursor: pointer;"
                                             :to="project.to">
                                    <p class="title">
                                        {{ project.title }}
                                    </p>
                                    <p class="subtitle">
                                        {{ project.company }}
                                    </p>
                                </router-link>
                            </div>
                            <div class="contractors-list">
                                <div class="contractors-item"
                                     v-for="contractor in project.contractors"
                                     :key="contractor.id">
                                    <div class="contractors-content">
                                        <!--<div class="circle"-->
                                             <!--:class="checkContractorType(contractor.type)">-->
                                        <div class="circle"
                                             :class="checkContractorType(contractor.type)"
                                             @click="toggleContractorDialog($event, contractor)">
                                            <img v-if="contractor.src"
                                                 :src="contractor.src"
                                                 :alt="contractor.title">
                                            <span v-else class="initials">
                                                {{ contractor.initials }}
                                            </span>
                                        </div>
                                        <div class="contractors-info"
                                             @click="toggleContractorDialog($event, contractor)">
                                            <p class="title">
                                                {{ contractor.name }}
                                            </p>
                                            <p class="subtitle">
                                                {{ contractor.type }}
                                            </p>
                                        </div>
                                        <div v-for="key in contractor.keys"
                                             :key="key.id"
                                             class="key-icon">
                                            <img :src="key" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="circle circle-big"
                                 :class="'circle-' + project.status">
                                <img :src="getStatusIcon(project.status, 'circles')" alt="">
                            </div>
                        </div>
                        <div class="progress-row">
                            <div class="progress-bar" :class="project.status">
                                <img :src="getStatusIcon(project.status, 'arrows')"
                                     alt=""
                                     class="arrow">
                                <div class="step"
                                     v-for="n in project.steps"
                                     :key="n"
                                     :class="{ 'one-step': project.steps <= 1 }">
                                    Month
                                </div>
                            </div>
                        </div>
                        <div class="row-bottom">
                            <div class="date">
                                {{ toFormatDate(project.startDate) }}
                            </div>
                            <div class="date">
                                {{ toFormatDate(project.finalDate) }}
                            </div>
                        </div>
                    </div>

                    <offers-contractor-dialog v-if="isOpenedContractorDialog"
                                              :coordinates="clickCoordinates"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import Datepicker from 'vuejs-datepicker';
    import OffersContractorDialog from './layouts/OffersContractorDialog';

    import {mapGetters} from 'vuex';

    export default {
        name: 'Offers',
        components: {
            Navbar,
            OffersContractorDialog,
            Datepicker
        },
        data() {
            return {
                openedTopDatepicker: false,
                testTopDatepicker: 0,
                openedContractorDialog: false,
                clickCoordinates: {
                    top: false,
                    left: false
                },
                qaIsActive: true,
                projects: [
                    {
                        title: 'CryptoStore',
                        company: 'Serokell',
                        to: '/offer',
                        startDate: 1517495409000,
                        finalDate: 1543588209000,
                        status: 'completed',
                        projectLogo: '../../static/img/react.svg',
                        steps: 10,
                        contractors: [
                            {
                                id: 1,
                                initials: 'VD',
                                name: 'Vova Dmitrov',
                                src: '../../static/img/logo/telegram.png',
                                position: 'TS execution',
                                rating: 8.1,
                                sinceDate: 1487967146000,
                                webAddress: '',
                                githubAddress: '',
                                countOfProject: 1328,
                                avgCostPerProject: 7500,
                                type: 'TS execution',
                                keys: [
                                    '../../static/img/keys/ts-key.svg'
                                ]
                            },
                            {
                                id: 2,
                                initials: 'DV',
                                name: 'Deus Virus',
                                src: '../../static/img/logo/ubuntu.png',
                                position: 'Executor',
                                rating: 9.2,
                                sinceDate: 1487927146000,
                                webAddress: '',
                                githubAddress: '',
                                countOfProject: 5748,
                                avgCostPerProject: 4000,
                                type: 'TS execution',
                                keys: [
                                    '../../static/img/keys/ts-exec-key.svg'
                                ]
                            },
                            {
                                id: 3,
                                initials: 'NG',
                                name: 'Nicola Glumac',
                                src: false,
                                type: 'Check',
                                keys: [
                                    '../../static/img/keys/check-key.svg',
                                    '../../static/img/keys/check-key.svg'
                                ]
                            },
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance',
                                keys: [
                                    '../../static/img/keys/qa-key.svg',
                                    '../../static/img/keys/qa-key.svg'
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Alehub',
                        company: 'Effective Energy',
                        to: '/offer',
                        startDate: 1523370609000,
                        finalDate: 1543588209000,
                        status: 'ongoing',
                        steps: 8,
                        contractors: [
                            {
                                id: 5,
                                initials: 'QB',
                                name: 'Quality Boy',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'TS',
                                keys: [
                                    '../../static/img/keys/ts-key.svg'
                                ]
                            },
                            {
                                id: 6,
                                initials: 'GA',
                                name: 'Galvadon',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'TS execution',
                                keys: [
                                    '../../static/img/keys/ts-exec-key.svg'
                                ]
                            },
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance',
                                keys: [
                                    '../../static/img/keys/qa-key.svg'
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Virtual reality pluggin',
                        company: 'Nike',
                        to: '/offer',
                        startDate: 1525185009000,
                        finalDate: 1525703409000,
                        status: 'canceled',
                        projectLogo: '../../static/img/ale-logo.svg',
                        steps: 1,
                        contractors: [
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance'
                            }
                        ]
                    },
                    {
                        title: 'Virtual reality pluggin',
                        company: 'Nike',
                        to: '/offer',
                        startDate: 1525185009000,
                        finalDate: 1525703409000,
                        status: 'timelag',
                        projectLogo: '../../static/img/ale-logo.svg',
                        steps: 1,
                        contractors: [
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance'
                            }
                        ]
                    },
                    {
                        title: 'CryptoStore',
                        company: 'Serokell',
                        to: '/offer',
                        startDate: 1517495409000,
                        finalDate: 1543588209000,
                        status: 'completed',
                        projectLogo: '../../static/img/ale-logo.svg',
                        steps: 10,
                        contractors: [
                            {
                                id: 1,
                                initials: 'VD',
                                name: 'Vova Dmitrov',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'TS',
                                keys: [
                                    '../../static/img/keys/ts-key.svg'
                                ]
                            },
                            {
                                id: 2,
                                initials: 'DV',
                                name: 'Deus Virus',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'TS execution',
                                keys: [
                                    '../../static/img/keys/ts-exec-key.svg'
                                ]
                            },
                            {
                                id: 3,
                                initials: 'NG',
                                name: 'Nicola Glumac',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Check',
                                keys: [
                                    '../../static/img/keys/check-key.svg',
                                    '../../static/img/keys/check-key.svg'
                                ]
                            },
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance',
                                keys: [
                                    '../../static/img/keys/qa-key.svg',
                                    '../../static/img/keys/qa-key.svg'
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Alehub',
                        company: 'Effective Energy',
                        to: '/offer',
                        startDate: 1523370609000,
                        finalDate: 1543588209000,
                        status: 'ongoing',
                        steps: 8,
                        contractors: [
                            {
                                id: 5,
                                initials: 'QB',
                                name: 'Quality Boy',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'TS',
                                keys: [
                                    '../../static/img/keys/ts-key.svg'
                                ]
                            },
                            {
                                id: 6,
                                initials: 'GA',
                                name: 'Galvadon',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'TS execution',
                                keys: [
                                    '../../static/img/keys/ts-exec-key.svg'
                                ]
                            },
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance',
                                keys: [
                                    '../../static/img/keys/qa-key.svg'
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Virtual reality pluggin',
                        company: 'Nike',
                        to: '/offer',
                        startDate: 1525185009000,
                        finalDate: 1525703409000,
                        status: 'canceled',
                        projectLogo: '../../static/img/ale-logo.svg',
                        steps: 1,
                        contractors: [
                            {
                                id: 4,
                                initials: 'RC',
                                name: 'Rift & Co',
                                src: '../../static/img/logo/ubuntu.png',
                                type: 'Quality Assurance'
                            }
                        ]
                    }
                ],
                statusIcons: {
                    arrows: {
                        canceled: '../../static/img/arrows/arrow-canceled.svg',
                        completed: '../../static/img/arrows/arrow-completed.svg',
                        ongoing: '../../static/img/arrows/arrow-ongoing.svg',
                        timelag: '../../static/img/arrows/arrow-timelag.svg'
                    },
                    circles: {
                        canceled: '../../static/img/icons-for-circle/canceled.svg',
                        completed: '../../static/img/icons-for-circle/completed.svg',
                        ongoing: '../../static/img/icons-for-circle/ongoing.svg',
                        timelag: '../../static/img/icons-for-circle/timelag.svg'
                    }
                },
                infoHeader: {
                    startDate: '23.02.2018',
                    finalDate: '01.05.2018',
                    name: 'Rift',
                    rating: '2.5-9.8',
                    certification: 'DIN',
                    verified: "Doesn't matter"
                },

                rightMenu: {
                    horizontal: false,
                    list: [
                        {
                            type: 'link',
                            name: this.$t('pages.summary.rightMenu.summary'),
                            link: '/'
                        },
                        {
                            type: 'link',
                            name: this.$t('pages.summary.rightMenu.walletSettings'),
                            link: '/wallet/settings'
                        }
                    ]
                },
            }
        },
        computed: {
            ...mapGetters(
                [
                    'selectedContractor'
                ]
            ),
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            isOpenedContractorDialog: function () {
                return this.openedContractorDialog;
            }
        },
        methods: {
            toggleContractorDialog: function (e, contractor) {
                // this.openedContractorDialog = !this.openedContractorDialog;

                // this.currentContractorId = contractor.id;

                if (!this.openedContractorDialog) {
                    console.log(1);
                    this.clickCoordinates.top = e.pageY;
                    this.clickCoordinates.left = e.pageX;
                    this.$store.dispatch('selectContractor',
                        contractor
                    ).then((resp) => {
                        this.openedContractorDialog = true;
                        //почитать ещё про промисы, then и catch
                    }).catch(() => {
                        console.log('reject 1')
                    });

                    return true;
                } else if (this.openedContractorDialog === true && contractor.id !== this.selectedContractor.id) {
                    console.log(2);
                    this.clickCoordinates.top = e.pageY;
                    this.clickCoordinates.left = e.pageX;
                    this.$store.dispatch('selectContractor',
                        contractor
                    ).then(() => {

                    }).catch(() => {
                        console.log('reject 2')
                    });
                    return true;
                }
                console.log(3);
                this.openedContractorDialog = false;
                return false;
            },
            toFormatDate: function (date) {
                let dateFormat = new Date(date);
                return dateFormat.toDateString();
            },
            getStatusIcon: function (status, iconType) {
                switch (status) {
                    case 'completed':
                        return iconType === 'arrows' ? this.statusIcons.arrows.completed : this.statusIcons.circles.completed;
                    case 'ongoing':
                        return iconType === 'arrows' ? this.statusIcons.arrows.ongoing : this.statusIcons.circles.ongoing;
                    case 'timelag':
                        return iconType === 'arrows' ? this.statusIcons.arrows.timelag : this.statusIcons.circles.timelag;
                    default:
                        return iconType === 'arrows' ? this.statusIcons.arrows.canceled : this.statusIcons.circles.canceled;
                }
            },
            getIcon: function (name) {
                return this.selectedTheme === 'dark' ? require(`../../static/img/${name}_dark.svg`) : require(`../../static/img/${name}.svg`);
            },
            checkContractorType: function (type) {
                switch (type) {
                    case 'TS':
                        return 'ts';
                    case 'TS execution':
                        return 'ts-exec';
                    case 'Check':
                        return 'ch';
                    default:
                        return 'qa'
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #1
        position absolute
        z-index 100000
</style>

<style lang="stylus">
    .contract-list
        background-color #f0f4fa

        @media (max-width 620px)
            overflow-x hidden

        .info-header
            padding 87px 32px 23px 110px
            background-color #eceef1
            display flex
            justify-content space-between
            align-items center

            @media (max-width 1200px)
                padding-left 32px

            .info-wrap
                display flex
                align-items flex-end

                @media (max-width 990px)
                    justify-content space-between
                    width 100%
                    margin-right 32px

                .info
                    font-family MuseoSansCyrl500
                    font-size 12px
                    font-weight 500
                    color #34343e
                    margin-right 64px
                    display flex
                    flex-direction column

                    @media (max-width 990px)
                        margin-right 0

                    .title
                        opacity 0.5
                        white-space nowrap

                    .bold-text
                        font-size 17px
                        white-space nowrap

                        @media (max-width 1100px)
                            font-size 15px

                        @media (max-width 990px)
                            font-size 13px

                        @media (max-width 620px)
                            font-size 11px

        .row-page
            padding-top 32px
            padding-right 68px
            padding-left 68px
            display flex

            @media (max-width 768px)
                flex-direction column
                padding-top 60px
                padding-right 32px
                padding-left 32px

            .sidebar
                display flex
                flex-direction column
                align-items center
                padding-top 18px

                @media (max-width 768px)
                    align-items flex-start
                    padding-left 18px

                @media (max-width 620px)
                    padding-right 18px

                .vertical-progress
                    position relative

                    @media (max-width 768px)
                        width 80%

                    @media (max-width 620px)
                        width 100%

                    .circle-top
                        z-index 2
                        top -18px
                        position absolute
                        display flex
                        justify-content center

                        @media (max-width 768px)
                            top 0
                            left -18px

                        .triangle-icon
                            border 6px solid transparent
                            border-top 6px solid #34343e
                            position absolute
                            top 17px

                            @media (max-width 768px)
                                border 6px solid transparent
                                border-left 6px solid #34343e
                                left 15px
                                top unset

                    .circle-bottom
                        bottom -18px
                        position absolute

                        @media (max-width 768px)
                            bottom 0
                            right -18px

                        .triangle
                            border 6px solid transparent
                            border-left 6px solid #aab7c7
                            position absolute
                            left 56px

                            @media (max-width 768px)
                                border 6px solid transparent
                                border-top 6px solid #aab7c7
                                left 12px
                                top 56px

                    .filters-block
                        position absolute
                        top -96px
                        left 8px
                        display flex
                        flex-direction column
                        height 192px
                        justify-content space-between

                        @media (max-width 768px)
                            flex-direction row
                            width 192px
                            top 8px
                            left -96px

                        @media (max-width 620px)
                            flex-direction column
                            align-items center

                        .circle
                            box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.2)

                    .whole-line
                        width 36px
                        height 544px
                        background-image linear-gradient(to bottom, #e7eaee, #bcc5d1)
                        border 1px solid #d2dae2
                        position relative

                        @media (max-width 768px)
                            width 100%
                            height 36px

                        @media (max-width 768px)
                            background-image linear-gradient(to right, #e7eaee, #bcc5d1)

                        .marker-calendar-top
                            left -50px
                            top -18px

                            @media (max-width 768px)
                                left -16px
                                bottom 0
                                top -50px

                        .marker-calendar-bottom
                            left -50px
                            bottom -18px

                            @media (max-width 768px)
                                top -50px
                                right -16px
                                left unset

                        .marker-calendar-bottom, .marker-calendar-top
                            .block
                                background-image linear-gradient(to bottom, #ffe082, #ffd24f)

                                .triangle
                                    @media (max-width 768px)
                                        border 16px solid transparent
                                        border-top 8px solid #ffd24f
                                        top 32px
                                        left 0

                        .circle-big
                            top 190px
                            left -6px
                            position absolute
                            z-index 2

                            @media (max-width 768px)
                                top -6px
                                left 190px

                            .triangle
                                border 6px solid transparent
                                border-left 6px solid #aab7c7
                                position absolute
                                left 60px

                                @media (max-width 768px)
                                    border 6px solid transparent
                                    border-top 6px solid #aab7c7
                                    top 60px
                                    left 16px

                        .dividers-container
                            flex-direction column

                            @media (max-width 768px)
                                flex-direction row

                        .selected-area
                            background-image linear-gradient(to bottom, rgba(255, 224, 130, 0.3), rgba(255, 210, 79, 0.3))
                            border solid 1px #ffd24f
                            height 312px
                            position absolute
                            width 36px
                            top 58px
                            left -1px
                            z-index 1

                            @media (max-width 768px)
                                width 60%
                                height 36px
                                top -1px
                                left 58px

            .search-result
                padding-left 100px
                width 100%
                max-width 1332px

                @media (max-width 768px)
                    padding-left 0
                    padding-top 120px

                @media (max-width 620px)
                    padding-top 260px

                .progress-list
                    display flex
                    flex-direction column
                    align-items flex-start
                    width 100%

                    .progress-item
                        display flex
                        flex-direction column
                        justify-content center
                        position relative
                        min-height 132px
                        min-width 612px
                        border 2px solid gray
                        margin-bottom 24px
                        padding 10px

                        @media (max-width 1200px)
                            min-width 512px

                        @media (max-width 990px)
                            min-width 412px

                        &.completed
                            background-image linear-gradient(to right, rgba(255, 224, 130, 0.1), rgba(254, 211, 85, 0.1))
                            border-style solid
                            border-width 2px
                            -webkit-border-image linear-gradient(to right, #ffe082, #fed355) 1
                            border-image linear-gradient(to right, #ffe082, #fed355) 1

                        &.ongoing
                            background-image linear-gradient(to right, rgba(87, 222, 151, 0.1), rgba(43, 214, 92, 0.1))
                            border-style solid
                            border-width 2px
                            -webkit-border-image linear-gradient(to right, #57de97, #2bd65c) 1
                            border-image linear-gradient(to right, #57de97, #2bd65c) 1

                        &.timelag
                            background-image linear-gradient(to right, rgba(255, 130, 130, 0.1), rgba(255, 79, 79, 0.1))
                            border-style solid
                            border-width 2px
                            -webkit-border-image linear-gradient(to right, #ff8282, #ff4f4f) 1
                            border-image linear-gradient(to right, #ff8282, #ff4f4f) 1

                        &.canceled
                            background-image linear-gradient(to right, rgba(51, 26, 26, 0.1), rgba(51, 16, 16, 0.1))
                            border-style solid
                            border-width 2px
                            -webkit-border-image linear-gradient(to right, #331a1a, #331010) 1
                            border-image linear-gradient(to right, #331a1a, #331010) 1

                        .progress-row
                            padding 0 56px

                            @media (max-width 990px)
                                padding 0 32px

                            @media (max-width 860px)
                                padding 0 24px

                            .progress-bar
                                width 100%
                                height 36px
                                background-color #ffffff
                                position relative
                                background-image linear-gradient(to right, #eceef1, #bac4d0)
                                border-radius 18px
                                display flex
                                align-items center

                                .step
                                    width 120px
                                    height 32px
                                    border-right 2px solid #fff
                                    opacity 0.5
                                    font-family MuseoSansCyrl500
                                    font-size 16px
                                    color #fff
                                    display flex
                                    justify-content center
                                    align-items center

                                    @media (max-width 1100px)
                                        font-size 14px

                                    @media (max-width 990px)
                                        font-size 12px

                                    &:last-child
                                        border-right none

                                    &.one-step
                                        display flex
                                        justify-content center
                                        width 100%

                                .arrow
                                    position absolute
                                    top -20px
                                    left -110px

                                    @media (max-width 990px)
                                        left -86px

                                    @media (max-width 860px)
                                        left -78px

                        .row-top
                            display flex
                            width 100%

                            .circle-big
                                @media (max-width 860px)
                                    width 40px
                                    height 40px
                                    min-width 40px
                                    min-height 40px

                                &:last-child
                                    margin-left 104px

                                    @media (max-width 1200px)
                                        margin-left 12px

                            .project-info
                                display flex

                                .info-text
                                    display flex
                                    flex-direction column
                                    margin-left 8px
                                    margin-right 8px

                                .title
                                    margin 0
                                    font-family MuseoSansCyrl500
                                    font-size 16px
                                    color #34343e
                                    white-space nowrap

                                    @media (max-width 1100px)
                                        font-size 14px

                                .subtitle
                                    margin 0
                                    opacity 0.5
                                    font-family MuseoSansCyrl500
                                    font-size 12px
                                    color #34343e
                                    white-space nowrap

                                    @media (max-width 1100px)
                                        font-size 10px

                            .contractors-list
                                display flex
                                justify-content space-between
                                width 100%

                                @media (max-width 990px)
                                    justify-content space-around

                                .contractors-content
                                    display flex
                                    position relative

                                    .key-icon
                                        z-index 3
                                        position absolute
                                        top 54px
                                        left -10px

                                        @media (max-width 860px)
                                            top 46px

                                        @media (max-width 620px)
                                            display none

                                        &:nth-child(4)
                                            left -300px

                                    .contractors-info
                                        cursor pointer
                                        margin-left 8px

                                        @media (max-width 990px)
                                            display none

                                    .circle
                                        cursor pointer

                                        img
                                            width 80%
                                            height 80%
                                            -webkit-clip-path circle(50% at center)
                                            clip-path circle(50% at center)

                                        .circle__overlay
                                            z-index 2
                                            position absolute

                                        .initials
                                            position absolute
                                            font-family MuseoSansCyrl500
                                            font-size 16px
                                            color #fcfcfc


                                    .circle.qa
                                        background-color #7e20c0
                                        background-image unset

                                    .circle.ch
                                        background-color #e09a00
                                        background-image unset

                                    .circle.ts-exec
                                        background-color #0391a6
                                        background-image unset

                                    .circle.ts
                                        background-color #b63c2c
                                        background-image unset



                                    .title
                                        margin 0
                                        font-family MuseoSansCyrl500
                                        opacity 0.5
                                        font-size 16px
                                        color #34343e
                                        white-space nowrap

                                        @media (max-width 1100px)
                                            font-size 14px

                                    .subtitle
                                        margin 0
                                        font-family MuseoSansCyrl500
                                        opacity 0.25
                                        font-size 12px
                                        color #34343e
                                        white-space nowrap

                                        @media (max-width 1100px)
                                            font-size 10px

                        .row-bottom
                            display flex
                            justify-content space-between
                            padding 0 66px

                            @media (max-width 990px)
                                padding 0 32px

                            @media (max-width 860px)
                                padding 0 24px

                            .date
                                font-family MuseoSansCyrl500
                                font-size 12px
                                color #34343e
                                margin-top 14px

                                @media (max-width 860px)
                                    font-size 10px

    .circle
        width 36px
        min-width 36px
        height 36px
        background-image linear-gradient(to right, #dde1e7, #cad2db)
        border-radius 50%
        display flex
        justify-content center
        align-items center
        flex-direction column
        border none

        &.circle-big
            width 48px
            height 48px
            min-width 48px
            min-height 48px

        &.circle-black
            background-image linear-gradient(to right, #331a1a, #331010)

        &.circle-red
            background-image linear-gradient(to right, #ff8282, #ff4f4f)

        &.circle-green
            background-image linear-gradient(to right, #4dc484, #26bd51)

        &.circle-yellow
            background-image linear-gradient(to right, #ffe082,
            #ffd24f)
            box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.2)

        &.circle-gray
            background-color #aab7c7
            background-image none

        &.ts
            background-image linear-gradient(to right, #c07b44, #b63c2c)

        &.ts-exec
            background-image linear-gradient(to right, #0db79a, #0391a6)

        &.check
            background-image linear-gradient(to right, #ddc41c, #e09a00)

        &.qa
            background-image linear-gradient(to right, #b46dd0, #7e20c0)

        &.circle-completed
            background-image unset
            border-style solid
            border-width 2px
            border-color #fed355

        &.circle-ongoing
            background-image unset
            border-style solid
            border-width 2px
            border-color #2bd65c

        &.circle-canceled
            background-image unset
            border-style solid
            border-width 2px
            border-color #331010

        &.circle-timelag
            background-image unset
            border-style solid
            border-width 2px
            border-color #ff4f4f

        .title
            font-family MuseoSansCyrl500
            color #fcfcfc
            font-size 16px
            text-transform uppercase
            line-height 1
            letter-spacing 1px
            color #fcfcfc
            text-shadow 0 0 2px rgba(0, 0, 0, 0.24)

        .subtitle
            font-family MuseoSansCyrl500
            color #fcfcfc
            font-size 9px
            text-transform uppercase
            text-shadow 0 0 2px rgba(0, 0, 0, 0.24)

    .marker-calendar
        position absolute

        .block
            width 32px
            height 32px
            background-image linear-gradient(to right, #ffe082, #ffd24f)
            position relative
            display flex
            justify-content space-around
            align-items center

            .triangle
                border 16px solid transparent
                border-left 8px solid #ffd24f
                position absolute
                top 0
                left 32px

    .dividers-container
        display flex
        justify-content space-between
        align-items center
        height 100%
        width 100%
        position absolute
        top 0

        .divider
            width 2px
            height 32px
            opacity 0.6
            background-color #fff

            &.horizontal
                width 32px
                height 2px

                @media (max-width 768px)
                    width 2px
                    height 32px

            &:first-child, &:last-child
                visibility hidden

    .dialog
        width 208px
        border-radius 4px
        background-color #fafafa
        position absolute
        z-index 5
        box-shadow 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        left 54px
        top 158px
        padding 16px

        .btn
            margin-left 0
            width 100%
            height 26px
            padding 0
            font-size 12px
            color #34343e

        .form-group
            display flex
            flex-direction column
            align-items flex-start
            margin-bottom 24px

            label
                margin-bottom 12px
                font-family MuseoSansCyrl500
                font-size 13px
                font-weight bold
                color #34343e

            input
                border-radius 2px
                background-color #f7f7f7
                border solid 1px #979797
                width 100%
                padding 6px 8px
                font-family MuseoSansCyrl500
                font-size 12px
                color #34343e

            .one-line
                width 100%
                display flex
                justify-content space-between
                align-items flex-start

                button
                    padding 0
                    border none
                    background-color transparent
                    font-family MuseoSansCyrl500
                    font-size 12px
                    color #34343e
                    opacity 0.5

            .double-input-block
                display flex

                .double-input
                    position relative
                    display flex
                    align-items center
                    border 1px solid #979797
                    border-radius 2px
                    padding-left 8px

                    label
                        margin-bottom 0
                        font-family MuseoSansCyrl500
                        font-size 12px
                        line-height 1.17
                        color #34343e

                    input
                        border none
                        flex-grow 1
                        background-color transparent
                        font-family MuseoSansCyrl700
                        color #979797
                        font-size 12px

                    &:first-child
                        margin-right 12px

            .form-checkbox, .form-radio
                width 100%

                .control
                    input:checked ~ .control-indicator
                        border solid 0.6px #979797

                .control-checkbox, .control-radio
                    display flex
                    align-items center
                    justify-content flex-start
                    width 100%

                    &:last-child
                        margin-bottom 0

                    span
                        padding-left 22px
                        font-family MuseoSansCyrl500
                        font-size 12px
                        color #34343e
                        font-weight 500

                        &.bold-text
                            font-size 13px
                            font-weight bold

                &.country
                    margin-top 12px

                    label
                        span:first-letter
                            color #ab7713

    // Dark Theme

    .dark
        .contract-list
            background-color #4a4e65

            .info-header
                background-color #3f435e

                .info
                    color #fcfcfc

            .row-page
                .search-result
                    .progress-list
                        .progress-item
                            .row-top
                                .project-info
                                    .title, .subtitle
                                        color #fcfcfc

                                .contractors-list
                                    .contractors-content
                                        .title, .subtitle
                                            color #fcfcfc

                            .progress-row
                                .progress-bar
                                    background-image linear-gradient(to right, #3a3a4a, #272730)

                                    .step
                                        border-color #272730

                            .row-bottom
                                .date
                                    color #fcfcfc

                .sidebar
                    .vertical-progress
                        .whole-line
                            background-image linear-gradient(to bottom, #3a3a4a, #272730)
                            border-color #272730

                            @media (max-width 768px)
                                background-image linear-gradient(to right, #3a3a4a, #272730)

                            .selected-area
                                border-color #8a7643

            .dividers-container
                .divider
                    background-color #272730

            .circle
                .title, .subtitle
                    color #34343e

                &.qa, &.ts, &.ts-exec, &.check
                    .title
                        color #fcfcfc
</style>


