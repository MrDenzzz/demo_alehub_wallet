<template>
    <div class="state-bar">
        <div class="state-wrap">
            <div class="state">
                <span class="title">
                    {{ 'Contractor' }}
                </span>
                <span class="bold-text">
                    {{ currentContractor }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.name') }}
                </span>
                <span class="bold-text">
                    {{ currentName }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.timeInterval') }}
                </span>
                <span class="bold-text">
                    {{ currentDate }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.rating') }}
                </span>
                <span class="bold-text">
                    {{ currentRating }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.price') }}
                </span>
                <span class="bold-text">
                    {{ currentPrice }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.certification') }}
                </span>
                <span class="bold-text">
                    {{ currentCertification }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.verified') }}
                </span>
                <span class="bold-text">
                    {{ currentVerified }}
                </span>
            </div>
        </div>
        <div class="state-control">
            <button type="button" class="buttons btn-default m-r-20"
                    @click="clearFilter">
                Clear filter
            </button>

            <router-link tag="button" to="/offers/createoffer"
                         class="buttons btn-yellow">
                <img src="../../../static/img/add-dark-ic.svg" alt="create">
                <span>Create offer</span>
            </router-link>
            <!--<img :src="getIcon('menu')"-->
            <!--alt="icon">-->
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'StateBar',
        data() {
            return {
                dateFrom: 0,
                dateTo: 0,
                contractor: '',
                name: '',
                ratingFrom: 0,
                ratingTo: 0,
                priceFrom: 0,
                priceTo: 0,
                certification: '',
                verified: ''
            }
        },
        computed: {
            ...mapGetters(
                [
                    'currentFilter'
                ]
            ),
            /**
             * validation and type contractor output
             *
             * @returns {string}
             */
            currentContractor: function () {
                if (!this.contractor)
                    return 'not set';

                return this.contractor;
            },
            /**
             * validation and name output
             *
             * @returns {string}
             */
            currentName: function () {
                if (!this.name)
                    return 'not set';

                return this.name;
            },
            /**
             * validation and date output
             *
             * @returns {string}
             */
            currentDate: function () {
                if (!this.dateFrom && !this.dateTo)
                    return 'not set';

                if (this.dateFrom && !this.dateTo)
                    return 'from ' + this.dateFrom;

                if (!this.dateFrom && this.dateTo)
                    return 'to ' + this.dateTo;

                return this.dateFrom + ' - ' + this.dateTo;
            },
            /**
             * validation and rating output
             *
             * @returns {string}
             */
            currentRating: function () {
                if (!this.ratingFrom && !this.ratingTo)
                    return 'not set';

                if (this.ratingFrom && !this.ratingTo)
                    return 'from ' + this.ratingFrom;

                if (!this.ratingFrom && this.ratingTo)
                    return 'to ' + this.ratingTo;

                return this.ratingFrom + ' - ' + this.ratingTo;
            },
            /**
             * validation and price output
             *
             * @returns {string}
             */
            currentPrice: function () {
                if (!this.priceFrom && !this.priceTo)
                    return 'not set';

                if (this.priceFrom && !this.priceTo)
                    return 'from ' + this.priceFrom;

                if (!this.priceFrom && this.priceTo)
                    return 'to ' + this.priceTo;

                return this.priceFrom + ' - ' + this.priceTo;
            },
            /**
             * validation and certification data output
             *
             * @returns {string}
             */
            currentCertification: function () {
                if (!(this.currentFilter.certification instanceof Array))
                    return 'not set';

                let certification = '';

                if (this.currentFilter.certification.length !== 0) {
                    this.currentFilter.certification.forEach(certificate => {
                        certification += certificate.title + ' ';
                    });
                }

                return certification;
            },
            /**
             * validation and verification data output
             *
             * @returns {string}
             */
            currentVerified: function () {
                if (!(this.currentFilter.verified instanceof Array))
                    return 'not set';

                let verified = '';

                if (this.currentFilter.verified.length !== 0) {
                    this.currentFilter.verified.forEach(filter => {
                        verified += filter + ' ';
                    });
                }

                return verified;
            },
        },
        methods: {
            getIcon: function () {
                return '';
            },
            clearFilter: function () {
                this.$store.dispatch('clearFilterOffers'
                ).then(resp => {

                }).catch(err => {

                });
            }
        },
        mounted() {
            console.log(this.currentFilter, 'current filter');
            console.log(this.dateFrom, 'date from');
        }
    }
</script>

<style lang="stylus" scoped>
    .m-r-20
        margin-right 20px

    .buttons
        margin-bottom 0
        display flex
        align-items center
        justify-content center

        img
            margin-right 10px

    .state-bar
        padding 87px 32px 23px 110px
        background-color #eceef1
        display flex
        justify-content space-between
        align-items center

        @media (max-width 1200px)
            padding-left 32px

        .state-wrap
            display flex
            align-items flex-end

            @media (max-width 990px)
                justify-content space-between
                width 100%
                margin-right 32px

            .state
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

        .state-control
            display flex
            align-items center

    .dark
        .state-bar
            background-color #3f435e

            .state-wrap
                .state
                    color #fcfcfc
</style>