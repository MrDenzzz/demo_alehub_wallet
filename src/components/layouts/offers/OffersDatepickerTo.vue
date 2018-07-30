<template>
    <div class="offers-datepicker-to">
        <!--@mouseup="dragEnd()"-->
        <div class="marker-calendar"
             @mousedown="dragStart($event)"
             @dragstart="stopDrag()"
             @mousemove="(xDrag && yDrag) ? dragMove($event) : 'false'"
             :style="calcY">
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
                dateTo: null,
                xDrag: 0,
                yDrag: 0
            }
        },
        computed: {
            calcY: function () {

            }
        },
        methods: {
            dragStart: function (e) {
                this.xDrag = e.pageX;
                this.yDrag = e.pageY;
            },
            dragEnd: function () {
                this.xDrag = 0;
                this.yDrag = 0;
            },
            stopDrag: function () {
                return false;
            },
            dragMove: function (e) {
                let xMove = e.pageX,
                    yMove = e.pageY;

                let xDiff = this.xDrag - xMove,
                    yDiff = this.yDrag - yMove;

                if (Math.abs(yDiff) > Math.abs(xDiff)) {
                    console.log(yDiff, 'yDiff');
                }
            }
        },
        mounted() {
            window.addEventListener('mouseup', function (event) {
                this.xDrag = 0;
                this.yDrag = 0;
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .marker-calendar
        position absolute
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