<template>
    <div class="state-bar">
        <div class="state-wrap">
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
                    {{ name }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.rating') }}
                </span>
                <span class="bold-text">
                    {{ ratingFrom }} - {{ ratingTo }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.price') }}
                </span>
                <span class="bold-text">
                    {{ priceFrom }} - {{ priceTo }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.certification') }}
                </span>
                <span class="bold-text">
                    {{ certification }}
                </span>
            </div>
            <div class="state">
                <span class="title">
                    {{ $t('stateBar.verified') }}
                </span>
                <span class="bold-text">
                    {{ verified }}
                </span>
            </div>
        </div>
        <div>
            <!--<img :src="getIcon('menu')"-->
            <!--alt="icon">-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'StateBar',
        date() {
            return {
                dateFrom: 1,
                dateTo: 2,
                name: 'q',
                ratingFrom: 3,
                ratingTo: 4,
                priceFrom: 5,
                priceTo: 6,
                certification: 'a',
                verified: 's'
            }
        },
        computed: {
            isDateFrom: function () {
                return this.dateFrom;
            },
            isDateTo: function () {
                return this.dateTo;
            },
            isName: function () {
                return this.name;
            }
        },
        methods: {
            getIcon: function () {
                return '';
            }
        },
        mounted() {
            console.log(this.dateFrom, 'date from');
        }
    }
</script>

<style lang="stylus" scoped>
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
</style>