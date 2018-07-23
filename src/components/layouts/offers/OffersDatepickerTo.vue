<template>
    <div class="offers-datepicker-to">
        <div class="marker-calendar">
            <div class="marker-block">
                <img src="../../../../static/img/calendar-ic_black.svg"
                     alt="date from">
            </div>
            <div class="marker-arrow"></div>
        </div>
        <datepicker id="dateOffersTo"
                    class="dateOffersTo"
                    v-if="opened"
                    v-model="dateTo"
                    :language="$t('modals.pdf.lang')"
                    :inline="inline"/>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'OffersDatepickerTo',
        components: {
            Datepicker
        },
        data() {
            return {
                inline: true,
                opened: false,
                dateTo: null
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .marker-calendar
        position relative
        display flex
        width 50px
        height 32px

        .marker-block
            background-color #ffd24f
            width 32px
            height 100%
            display flex
            justify-content center
            align-items center

        .marker-arrow
            content ''
            border-top 16px solid transparent
            border-left 10px solid #ffd24f
            border-bottom 16px solid transparent
            right 0
            margin-left 0

        img
            width 50%
</style>