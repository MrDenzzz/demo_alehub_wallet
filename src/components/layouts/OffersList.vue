<template>
    <div class="offers-list">
        <div class="offers-offer"
             v-for="(offer, i) in filteredOffers"
             :key="offer.id"
             :class="offer.status"
             :style="{width: 10 * offer.steps + '%'}">
            <div class="row-top">
                <div class="offer-info">
                    <img class="offer-logo"
                         :src="offer.logoSrc" :alt="offer.company">
                    <router-link class="info-text"
                                 tag="div"
                                 :to="offer.to">
                        <p class="title">
                            {{ offer.title }}
                        </p>
                        <p class="subtitle">
                            {{ offer.company }}
                        </p>
                    </router-link>
                </div>
                <div class="contractors-list">
                    <div class="contractors-item"
                         v-for="contractor in filteredOfferContractors[i]"
                         :key="contractor.id">
                        <div class="contractors-content">
                            <div class="circle"
                                 :class="contractorTypeType(contractor.typeId)"
                                 @click="toggleContractorDialog($event, contractor)">
                                <span class="initials">
                                {{ contractor.initials }}
                                </span>
                            </div>
                            <div class="contractors-info"
                                 @click="toggleContractorDialog($event, contractor)">
                                <p class="title">
                                    {{ contractor.name }}
                                </p>
                                <p class="subtitle">
                                    {{ contractorTypeName(contractor.typeId) }}
                                </p>
                            </div>
                            <!--<div class="key-icon"-->
                                 <!--v-for="key in contractor.keys"-->
                                 <!--:key="key.id">-->
                                <!--<img :src="key" alt="key">-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
                <div class="circle circle-big"
                     :class="'circle-' + offer.status">
                    <img :src="getStatusIcon(offer.status, 'circles')"
                         :alt="offers.status">
                </div>
            </div>
            <div class="progress-row">
                <div class="progress-bar"
                     :id="progressBarId(offer.id)"
                     :class="offer.status">
                    <img :src="getStatusIcon(offer.status, 'arrows')"
                         :alt="offer.status"
                         class="arrow">
                    <div class="step"
                         v-for="n in offer.steps"
                         :key="n"
                         :class="{ 'one-step': offer.steps <= 1 }">
                        Month
                    </div>
                    <div class="key-block"
                         :id="'key' + offer.id + key.id"
                         v-for="key in offer.keys"
                         @click="test($event)"
                         :key="offer.id.toString() + key.id.toString()">
                        <img :src="key.src" alt="key">
                    </div>
                </div>
            </div>
            <div class="row-bottom">
                <div class="date">
                    {{ toFormatDate(offer.startDate) }}
                </div>
                <div class="date">
                    {{ toFormatDate(offer.finalDate) }}
                </div>
            </div>
        </div>

        <offers-contractor-dialog v-if="openedContractorDialog"
                                  :coordinates="contractorDialogCoordinates"/>

    </div>
</template>

<script>
    import OffersContractorDialog from './OffersContractorDialog';

    import moment from 'moment';

    import {mapGetters} from 'vuex';

    export default {
        name: 'OffersOffer',
        components: {
            OffersContractorDialog
        },
        data() {
            return {
                openedContractorDialog: false,

                contractorDialogCoordinates: {
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
                }
            }
        },
        computed: {
            ...mapGetters(
                [
                    'types',
                    'offers',
                    'filteredOffers',
                    'contractors',
                    'offerContractors',
                    'filteredOfferContractors',
                    'selectedContractor'
                ]
            ),
        },
        methods: {
            test: function (event) {
                console.log(event.currentTarget);
            },
            /**
             *
             * @param {Number} offerId
             */
            progressBarId: function (offerId) {
                return 'progress-bar-' + offerId;
            },
            /**
             *
             *
             * @param {Object} key
             * @param {number} offerStart
             * @param {number} offerEnd
             */
            calcKeyCoordinates: function (key, offerStart, offerEnd, offerId) {
                let diff = offerEnd - offerStart,
                    diffKeyStart = offerEnd - key.start,
                    currentProgressBar = '';

                    console.log(document.getElementById(offerId), '123123');
                // let promise = new Promise((resolve, reject) => {
                //
                //     a = document.getElementById(offerId);
                //
                //     if (a)
                //         resolve(true);
                //     else
                //         reject(true);
                // });

                // promise.then(() => {
                //     console.log('resolve');
                // }, () => {
                //     console.log('reject');
                // });

                // setTimeout(() => {

                    // currentProgressBar = document.getElementById(offerId.toString());
                    // console.log(currentProgressBar.offsetWidth, 'currentProgressBar');
                    // let offsetRightKey = currentProgressBar.offsetWidth * (diffKeyStart / diff);
                    // console.log(offsetRightKey, 'offsetRightKey');
                    // return offsetRightKey + 'px';
                // }, 0);
            },
            /**
             * return data of type contractor
             *
             * @param {number} contractorTypeId
             * @returns {*}
             */
            contractorType: function (contractorTypeId) {
                return this.types.find(type => type.id === contractorTypeId);
            },
            /**
             * return name of type contractor
             *
             * @param {number} contractorTypeId
             * @returns {*}
             */
            contractorTypeName: function (contractorTypeId) {
                return this.contractorType(contractorTypeId).name;
            },
            /**
             * return type of contractor
             *
             * @param {number} contractorTypeId
             * @returns {*}
             */
            contractorTypeType: function (contractorTypeId) {
                return this.contractorType(contractorTypeId).type;
            },
            /**
             *
             *
             * @param {Object} e
             * @param {Object} contractor
             * @returns {boolean}
             */
            toggleContractorDialog: function (e, contractor) {
                this.contractorDialogCoordinates.top = e.pageY;
                this.contractorDialogCoordinates.left = e.pageX;

                if (!this.openedContractorDialog) {
                    this.$store.dispatch('selectContractor',
                        contractor
                    ).then((resp) => {
                        this.openedContractorDialog = true;
                    }).catch(() => {
                        console.error('error toggle contractor dialog');
                    });

                    return true;
                } else if (this.openedContractorDialog === true && contractor.id !== this.selectedContractor.id) {
                    this.$store.dispatch('selectContractor',
                        contractor
                    ).then(() => {

                    }).catch(() => {
                        console.error('error toggle SAME contractor dialog');
                    });

                    return true;
                }
                this.openedContractorDialog = false;
                return false;
            },
            getIcon: function (name) {
                return this.selectedTheme === 'dark' ? require(`../../../static/img/${name}_dark.svg`) : require(`../../../static/img/${name}.svg`);
            },
            checkContractorType: function (type) {
                return type;
            },
            toFormatDate: function (date) {
                return moment(date).format('DD MMMM, YYYY');
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
            }
        },
        mounted() {
            console.log(document.getElementById('key11'), '123123');

            for (let i = 0; i < this.offers.length; i++) {

                let currentProgressBar = document.getElementById(this.progressBarId(this.offers[i].id));

                for (let j = 0; j < this.offers[i].keys.length; j++) {

                    let diff = this.offers[i].finalDate - this.offers[i].startDate,
                        diffKeyStart = this.offers[i].finalDate - this.offers[i].keys[j].start;

                    document.getElementById('key' + this.offers[i].id + this.offers[i].keys[j].id).style['right'] = currentProgressBar.offsetWidth * (diffKeyStart / diff) +'px';
                }
            }

        }
    }
</script>

<style lang="stylus" scoped>
    .offers-list
        display flex
        flex-direction column
        align-items flex-start
        width 100%

        .offers-offer
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

            .row-top
                display flex
                width 100%

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

                .offer-info
                    display flex

                    .offer-logo
                        max-width 48px
                        max-height 48px
                        -webkit-clip-path circle(50% at center)
                        clip-path circle(50% at center)

                    .info-text
                        cursor pointer
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

                            @media (max-width 860px)
                                top 46px

                            @media (max-width 620px)
                                display none

                            //&:nth-child(4)
                            //    left -300px

                        .contractors-info
                            cursor pointer
                            margin-left 8px

                            @media (max-width 990px)
                                display none

                        .circle
                            cursor pointer
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

                            img
                                width 80%
                                height 80%
                                -webkit-clip-path circle(50% at center)
                                clip-path circle(50% at center)

                            .circle__overlay
                                /*z-index 2*/
                                position absolute

                            .initials
                                position absolute
                                font-family MuseoSansCyrl500
                                font-size 16px
                                color #fcfcfc

                            &.ts
                                background-color #b63c2c
                                background-image unset

                            &.ts-ex
                                background-color #0391a6
                                background-image unset

                            &.ch
                                background-color #e09a00
                                background-image unset

                            &.qa
                                background-color #7e20c0
                                background-image unset

                            &.ts__unset
                                background-color #d29792
                                background-image unset

                            &.ts-ex__unset
                                background-color #78c2cf
                                background-image unset

                            &.ch__unset
                                background-color #e7c67c
                                background-image unset

                            &.qa__unset
                                background-color #b689dc
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
                            left
                        -86px

                        @media (max-width 860px)
                            left
                        -78px

                    .key-block
                        position absolute

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
</style>