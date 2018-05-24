<template>
    <div class="dialog">
        <div class="rating">
            <span>9.2</span>
        </div>
        <div class="save">
            <img src="../../../static/img/star-off.svg" alt="save contractor">
        </div>
        <div class="header">
            <div class="logo">
                <img src="../../../static/img/dell.png"
                     alt="">
            </div>
            <div class="info">
                <h4 class="name">
                    Dell
                </h4>
                <h5 class="position">
                    Executor
                </h5>
                <p class="date">
                    In system since 27 October, 2017
                </p>
            </div>
        </div>
        <div class="body">
            <div class="line">
                <span class="left">
                    Web
                </span>
                <a class="right" href="#" target="_blank">
                    dell.com
                </a>
            </div>
            <div class="line">
                <span class="left">
                    GitHub
                </span>
                <a class="right" href="#" target="_blank">
                    /dell
                </a>
            </div>
            <div class="line">
                <span class="left">
                    Projects
                </span>
                <span class="right">
                    9,428
                </span>
            </div>
            <div class="line">
                <span class="left">
                    Avg. cost per week
                </span>
                <span class="right">
                    4,000$
                </span>
            </div>
        </div>
        <div class="footer">
            <button type="button" class="btn btn-yellow">
                Chat
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OffersContractorDialog',
        props: {
            contractor: {

            }
        },
        data() {
            return {

            }
        }

    }
</script>

<style lang="stylus" scoped>
    .dialog
        font-family MuseoSansCyrl500
        font-size 12px
        color #34343e
        position absolute
        display flex
        flex-direction column
        top 50%
        left 50%
        width 220px
        height 300px
        padding 16px
        border-radius 2px
        background-color #fafafa
        -webkit-box-shadow 0 2px 8px 0 rgba(0, 0, 0, .24)
        -moz-box-shadow 0 2px 8px 0 rgba(0, 0, 0, .24)
        box-shadow 0 2px 8px 0 rgba(0, 0, 0, .24)

        .rating
            position absolute
            left 0
            top 20px
            width 25px
            height 20px
            background-color #ffd24f
            padding 0 4px 0 0
            display flex
            justify-content flex-end
            align-items center

            &:before
                content ""
                position absolute
                right -7px
                bottom 0
                width 0
                height 0
                border-left 7px solid #ffd24f
                border-top 10px solid transparent
                border-bottom 10px solid transparent

            span
                margin 1px 0 0 0
                font-size 10px


        .save
            cursor pointer
            position absolute
            top 10px
            right 10px
            height 15px
            width 15px

            img
                width 100%
                height 100%

        .header
            flex-basis 25%
            display flex
            flex-direction row

            .logo
                flex-basis 40%

                img
                    height 100%

            .info
                flex-basis 60%
                display flex
                flex-direction column
                justify-content space-between

                .name, .position, .date
                    margin 0

                .name
                    font-size 14px
                    font-weight 700

                .position
                    font-size 12px
                    font-weight 500

                .date
                    color #838389

        .body
            flex-basis 65%
            display flex
            flex-direction column
            justify-content space-around

            .line
                display flex
                flex-direction row
                justify-content space-between

                .right
                    font-weight 700

                a.right
                    color #a87104

        .footer
            flex-basis 10%

            button
                width 100%
                height 100%
                background-color #ffd24f
</style>