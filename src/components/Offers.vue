<template>
    <div class="contract-list">
        <navbar title="Contract List"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"/>

        <state-bar/>

        <div class="row-page">
            <div class="sidebar">
                <div class="vertical-progress">
                    <div class="circle circle-top circle-yellow">
                        <div class="triangle-icon"></div>
                    </div>

                    <div class="whole-line">
                        <div class="selected-area">
                            <div class="marker-calendar marker-calendar-top"
                                 @click="openedFromDatepicker = !openedFromDatepicker">
                                <div class="block">
                                    <img src="../../static/img/calendar-ic_black.svg"
                                         alt="date from" width="16px" height="16px">
                                    <div class="triangle"></div>
                                </div>
                            </div>

                            <datepicker id="dateOffersFrom"
                                        class="dateOffersFrom"
                                        v-if="openedFromDatepicker"
                                        v-model="offersDateFrom"
                                        :language="$t('modals.pdf.lang')"
                                        :inline="true"/>

                            <div class="marker-calendar marker-calendar-bottom"
                                 @click="openedToDatepicker = !openedToDatepicker">
                                <div class="block">
                                    <img src="../../static/img/calendar-ic_black.svg"
                                         alt="date to" width="16px" height="16px">
                                    <div class="triangle"></div>
                                </div>
                            </div>

                            <datepicker id="dateOffersTo"
                                        class="dateOffersTo"
                                        :style="{ 'top': getSelectedAreaHeight }"
                                        v-if="openedToDatepicker"
                                        v-model="offersDateTo"
                                        :language="$t('modals.pdf.lang')"
                                        :inline="true"/>
                        </div>
                        <div class="dividers-container">
                            <div class="divider horizontal"
                                 v-for="n in 8" :key="n">
                            </div>
                        </div>
                        <div class="circle circle-big circle-yellow">
                            <img src="../../static/img/ale-logo.svg"
                                 alt="ale logo" width="21px" height="25px">
                            <div class="triangle">

                                <group-filter-buttons :filterElementOptions="changedFilterElementOptions"/>

                                <offers-filter v-for="item in filters"
                                               v-if="item.opened"
                                               :key="item.id"
                                               :id="item.id"
                                               :offset-top="filterOffsetTop(item.id)"/>

                                <offers-filter-folded v-for="item in filters"
                                                      v-if="item.folded"
                                                      :key="item.id"
                                                      :id="item.id"
                                                      :title="item.title"
                                                      :queue="item.queue"/>
                            </div>
                        </div>
                    </div>

                    <div class="circle circle-bottom circle-green">
                        <img src="../../static/img/icons-for-circle/infinity.svg" alt="" width="12px" height="6px">
                        <div class="triangle">
                            <group-status-buttons/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-result">
                    <offers-list/>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import StateBar from './layouts/StateBar';
    import OffersList from './layouts/OffersList';
    import OffersFilter from './layouts/OffersFilter';
    import OffersFilterFolded from './layouts/OffersFilterFolded';
    import GroupFilterButtons from './layouts/GroupFilterButtons';
    import GroupStatusButtons from './layouts/GroupStatusButtons';

    import Datepicker from 'vuejs-datepicker';

    import {mapGetters} from 'vuex';

    export default {
        name: 'Offers',
        components: {
            Navbar,
            StateBar,
            OffersList,
            OffersFilter,
            OffersFilterFolded,
            GroupFilterButtons,
            GroupStatusButtons,
            Datepicker
        },
        watch: {
            offersDateFrom: function (val) {
                console.log(val, 'offersDateFrom');
            },
            offersDateTo: function (val) {
                console.log(val, 'offersDateTo');
            },

            filters: {
                handler: function (filter) {
                    // console.log(filter, 'filters');
                },
                deep: true
            }
        },
        data() {
            return {

                changedFilterElementOptions: {},


                filters: [],

                openedFromDatepicker: false,
                openedToDatepicker: false,
                offersDateFrom: 0,
                offersDateTo: 0,

                openedContractorDialog: false,

                clickCoordinates: {
                    top: false,
                    left: false
                },

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
                    'types',
                    'offers',
                    'contractors',
                    'filtersCondition'
                ]
            ),
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            getSelectedAreaHeight: function () {
                return getComputedStyle(document.querySelector('.selected-area')).height;
            }
        },
        methods: {
            /**
             * return data of type contractor
             *
             * @param contractorTypeId
             * @returns {*}
             */
            contractorType: function (contractorTypeId) {
                return this.types.find(type => type.id === contractorTypeId);
            },
            /**
             * return type of contractor
             *
             * @param contractorTypeId
             * @returns {*}
             */
            contractorTypeType: function (contractorTypeId) {
                return this.contractorType(contractorTypeId).type;
            },
            getCoords: function (elem) {
                if (!elem)
                    return false;

                return {
                    top: elem.getBoundingClientRect().top + pageYOffset,
                    left: elem.getBoundingClientRect().left + pageXOffset
                };
            },
            filterOffsetTop: function (id) {
                if (!id) {
                    console.error('Wrong argument value');
                    return '0px';
                }

                return this.getCoords(document.getElementById(this.contractorTypeType(id))).top -
                       this.getCoords(document.getElementById('group-filter-buttons')).top + 'px';
            },

            toggleContractorDialog: function (e, contractor) {
                // this.openedContractorDialog = !this.openedContractorDialog;

                // this.currentContractorId = contractor.id;

                if (!this.openedContractorDialog) {
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
        },
        created() {
            this.filters = this.filtersCondition;
        },
        mounted() {
            this.$on('onFold', (obj) => {
                this.changedFilterElementOptions = obj;

            });
        }
    }
</script>

<style lang="stylus" scoped>
    .contract-list
        background-color #f0f4fa

        @media (max-width 620px)
            overflow-x hidden

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
                            position absolute
                            left 56px

                            @media (max-width 768px)
                                border 6px solid transparent
                                border-top 6px solid #aab7c7
                                left 12px
                                top 56px

                    .filters-block
                        position relative
                        display flex
                        flex-direction column
                        justify-content space-between
                        align-items center
                        height 192px

                        &:before
                            content ""
                            position absolute
                            left -7px
                            top calc(50% - 6px)
                            bottom 0
                            width 0
                            height 0
                            border-left 6px solid #a6aaae
                            border-top 6px solid transparent
                            border-bottom 6px solid transparent

                        @media (max-width 768px)
                            flex-direction row
                            width 192px
                            top 8px
                            left -96px

                        @media (max-width 620px)
                            flex-direction column
                            align-items center

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
                            /*z-index 2*/
                            top 190px
                            left -6px
                            position absolute

                            @media (max-width 768px)
                                top -6px
                                left 190px

                            .triangle
                                border 6px solid transparent
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

                            .dateOffersFrom, .dateOffersTo
                                z-index 3

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

    .circle
        width 36px
        min-width 36px
        height 36px
        border-radius 50%
        display flex
        justify-content center
        align-items center
        flex-direction column
        border none
        -webkit-transition all .3s ease
        -moz-transition all .3s ease
        -o-transition all .3s ease
        transition all .3s ease

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
            background-image linear-gradient(to right, #ffe082, #ffd24f)
            box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.2)

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
        cursor pointer
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


