<template>
    <div class="connect-page" v-if="load">
        <div class="connect-header">
            <h1 class="title">Ale</h1>
        </div>
        <div class="connect-body">
            <img src="../../assets/img/spinner-sync.svg" alt="">
        </div>
        <div class="connect-footer">
            <span class="message">Connecting network…</span>
        </div>
    </div>
    <!--<div v-else-if="isSync">-->
        <!--<div class="sync-page">-->
            <!--<div class="sync-header">-->
                <!--<h1 class="title">Ale</h1>-->
            <!--</div>-->
            <!--<div class="sync-body">-->
                <!--<img src="../../assets/img/spinner-sync-black.svg" alt="">-->
            <!--</div>-->
            <!--<div class="sync-footer">-->
                <!--<div class="progress-bar">-->
                    <!--<div class="static">-->
                        <!--<span>{{ syncCount }}%</span>-->
                        <!--<span>{{ 100-syncCount }}%</span>-->
                    <!--</div>-->
                    <!--<div class="line">-->
                        <!--<div class="done" :style="{ width: syncCount + '%' }"></div>-->
                        <!--<div class="progress" :style="{ width: parseProgressLine + '%' }"></div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>
<script>
    export default {
        name: 'sync-loader',
        props: {
            load: {
                type: [Boolean, String],
                required: true
            }
        },
        data () {
            return {
                isTryConnect: false,
                isSync: false,
                syncCount: 0
            }
        },
        methods: {
            syncData () {
                if(this.syncCount !== 100) {
                    this.syncCount = this.syncCount+1;
                    setTimeout(()=>{
                        this.syncData();
                    }, 50);
                }
            }
        },
        computed: {
            parseProgressLine () {
                return 100-this.syncCount;
            }
        },
        created () {
            this.isTryConnect = true;
            setTimeout(()=>{
                this.isTryConnect = false;
                this.isSync = true;
                this.syncData();
            },1000);
        }
    }
</script>

<style scoped lang="stylus">
    .sync-page
        background-color #ffd24f
        width: 100%
        height 100vh
        display flex
        flex-direction column
        justify-content space-between

        .sync-header
            width 100%
            height 64px
            display flex
            justify-content center
            align-items center

            .title
                margin 0
                font-family Fairview
                font-size 32px
                color #34343e
                font-weight 300

        .sync-body
            text-align center
            img
                width 66px
                height 66px
                -webkit-animation rotating 1s linear infinite
                -moz-animation rotating 1s linear infinite
                -ms-animation rotating 1s linear infinite
                -o-animation rotating 1s linear infinite
                animation rotating 1s linear infinite

        .sync-footer
            .progress-bar
                .static
                    display flex
                    justify-content space-between
                    padding 0 16px
                    margin-bottom 8px

                    font-family MuseoSansCyrl500
                    font-size 16px
                    font-weight 500
                    color #34343e

                .line
                    width 100%
                    display flex
                    .done
                        transition all 0.05s
                        background-color #34343e
                        height 8px

                    .progress
                        transition all 0.05s
                        width 20%
                        background-color #34343e
                        height 8px
                        opacity 0.3

    .connect-page
        background-color #34343e
        width: 100%
        height 100vh
        display flex
        flex-direction column
        justify-content space-between

        .connect-header
            width 100%
            height 64px
            display flex
            justify-content center
            align-items center

            .title
                margin 0
                font-family Fairview
                font-size 32px
                color #ffffff
                font-weight 300

        .connect-body
            text-align center
            img
                width 66px
                height 66px
                -webkit-animation rotating 1s linear infinite
                -moz-animation rotating 1s linear infinite
                -ms-animation rotating 1s linear infinite
                -o-animation rotating 1s linear infinite
                animation rotating 1s linear infinite

        .connect-footer
            text-align center
            margin-bottom 67px
            .message
                font-family MuseoSansCyrl300
                font-size 16px
                font-weight 300
                line-height 1.25
                text-align center
                color #ffffff

    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>