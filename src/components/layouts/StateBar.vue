<template>
    <div class="state-bar">
        <div class="state-wrap">
            <div class="state">
                <span class="title">
                    {{ 'Contractor' }}
                </span>
                <span class="bold-text">
                    {{ contractor }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.timeInterval') }}
                </span>
                <span class="bold-text">
                    {{ dateFrom }} - {{ dateTo }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.timeInterval') }}
                </span>
                <span class="bold-text">
                    {{ currentFilter.name }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.rating') }}
                </span>
                <span class="bold-text">
                    {{ currentFilter.ratingFrom }} - {{ currentFilter.ratingTo }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.price') }}
                </span>
                <span class="bold-text">
                    {{ currentFilterPriceFrom }} - {{ currentFilter.priceTo }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.certification') }}
                </span>
                <span class="bold-text">
                    {{ currentFilterCertification }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.verified') }}
                </span>
                <span class="bold-text">
                    {{ currentFilterVerified }}
                </span>
            </div>
        </div>
        <div>
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
            isDateFrom: function () {
                return this.dateFrom;
            },
            isDateTo: function () {
                return this.dateTo;
            },
            isName: function () {
                return this.name;
            },
            currentFilterPriceFrom: function () {
                console.log(typeof this.currentFilter.priceFrom, 'typeof this.currentFilter.priceFrom');

                if (typeof this.currentFilter.priceFrom !== 'number')
                    return 'not a number';

                if (this.currentFilter.priceFrom)
                    return this.currentFilter.priceFrom;

                return 'not set';
            },
            currentFilterCertification: function () {
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
            currentFilterVerified: function () {
                if (!(this.currentFilter.verified instanceof Array))
                    return 'not set';

                let verified = '';

                if (this.currentFilter.verified.length !== 0) {
                    this.currentFilter.verified.forEach(filter => {
                        verified += filter + ' ';
                    });
                }

                return verified;
            }
        },
        methods: {
            getIcon: function () {
                return '';
            }
        },
        mounted() {
            console.log(this.currentFilter, 'current filter');
            console.log(this.dateFrom, 'date from');
        }
    }
</script>

<style lang="stylus" scoped>
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

    .dark
        .state-bar
            background-color #3f435e

            .state-wrap
                .state
                    color #fcfcfc
</style>