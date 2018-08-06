<template>
    <div class="offer-panel-timeline-grid">
        <div class="line">

        </div>
        <!--<div class="dot" v-for="n in contractors">-->
<!---->
        <!--</div>-->
        <!--<div class="grid-line" v-for="i in numLines + 1">-->
            <!--<div class="segment" v-for="j in 10">-->
                <!--<span class="dot">-->
                <!--</span>-->
                <!--<span class="line">-->
                <!--</span>-->
                <!--<span class="dot" v-if="j === 10">-->
                <!--</span>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: 'OfferPanelTimelineGrid',
        props: {
            contractors: {
                type: Array,
                required: true
            }
        },
        mounted() {
            console.log(this.contractors, 'contractors');
        }
    }
</script>

<style lang="stylus" scoped>
    $padding-l = 16px
    $padding-t = 8px

    .offer-panel-timeline-grid
        width 100%
        height 12px
        display flex
        align-items flex-end
        //height "calc(100% - %s * 2)" % $padding-t

        .line
            height 1px
            width 100%
            background-color red

        .dot
            position absolute
            height 3px
            width 3px
            background-color black

        /*.grid-line
            width 100%
            height 12px
            display flex

            .segment
                width calc(100% / 9)
                height 3px
                display flex
                align-items center

                .dot
                    width 3px
                    height 3px
                    background-color #b6c4d6
                    border-radius 50%

                .line
                    width calc(100% - 3px)
                    height 1px
                    background-color #cdd2d8*/
</style>