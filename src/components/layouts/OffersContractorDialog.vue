<template>
    <div class="dialog"
         :style="{ 'top': offsetY, 'left': offsetX }">
        <div class="rating">
            <span>{{ rating }}</span>
        </div>
        <div class="save">
            <img src="../../../static/img/star-off.svg" alt="save contractor">
        </div>
        <div class="header">
            <div class="logo__wrap">
                <img class="logo" :src="contractor.src"  v-if="contractor.src"
                     alt="">

                <div class="placeholder" v-else
                     :class="checkContractorType(contractor.type)">
                    <span class="initials">
                        {{ contractor.initials }}
                    </span>
                </div>
            </div>

            <div class="info">
                <h4 class="name">
                    {{ contractor.name }}
                </h4>
                <h5 class="position">
                    {{ position }}
                </h5>
                <p class="date">
                    {{ sinceDate }}
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
    import {mapGetters} from 'vuex';

    export default {
        name: 'OffersContractorDialog',
        props: {
            coordinates: {
                type: Object,
                required: true
            }
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters(
                [
                    'selectedContractor'
                ]
            ),
            offsetY: function () {
                return this.coordinates.top + 'px';
            },
            offsetX: function () {
                return this.coordinates.left + 'px';
            },
            contractor: function () {
                return this.selectedContractor;
            },
            position: function () {
                return (this.contractor.position) ? this.contractor.position : 'position not established';
            },
            rating: function () {
                return (this.contractor.rating || this.contractor.rating === 0) ? this.contractor.rating : '?';
            },
            sinceDate: function () {
                let date = new Date(this.contractor.sinceDate);

                if (Object.prototype.toString.call(date) === '[object Date]') {
                    if (isNaN(date.getTime())) {  // d.valueOf() could also work
                        return 'date not defined';
                    } else {
                        return date;
                    }
                } else {
                    return 'date not defined';
                }
            }
        },
        methods: {
            checkContractorType: function (type) {
                switch (type) {
                    case 'TS':
                        return 'ts';
                    case 'TS execution':
                        return 'ts-exec';
                    case 'Check':
                        return 'ch';
                    case 'QA':
                        return 'qa';
                    default:
                        return 'undefined';
                }
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
        width 220px
        height 300px
        padding 16px
        border-radius 4px
        background-color #fafafa
        -webkit-box-shadow 0 2px 8px 0 rgba(0, 0, 0, .24)
        -moz-box-shadow 0 2px 8px 0 rgba(0, 0, 0, .24)
        box-shadow 0 2px 8px 0 rgba(0, 0, 0, .24)

        .rating
            z-index 2
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
            z-index 1
            flex-basis 25%
            display flex
            flex-direction row

            .logo__wrap
                position relative
                width 40%

                .logo
                    height 100%
                    width auto
                    -webkit-clip-path circle(50% at center)
                    clip-path circle(50% at center)

                .placeholder
                    height 67px
                    width 67px
                    -webkit-clip-path circle(50% at center)
                    clip-path circle(50% at center)

                    .initials
                        color #fcfcfc

            .placeholder.ts
                background-color #b63c2c

            .placeholder.ts-exec
                background-color #0391a6

            .placeholder.ch
                background-color #e09a00

            .placeholder.qa
                background-color #7e20c0

            .placeholder.undefined
                background-color #aab7c7

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