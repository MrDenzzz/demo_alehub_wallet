<template>
    <div class="index">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h3 class="title">
                        Page Not Found
                    </h3>
                    <router-link tag="a" to="/" class="buttons btn-yellow">
                        Back
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'not-found'
    }
</script>

<style lang="stylus" scoped>
    // .index
    //     background-color #f7f7f7

    //     .col-12
    //         display flex
    //         justify-content center
    //         align-items center
    //         flex-direction column
    //         height calc(100vh - 48px)

    //         .title
    //             font-family MuseoSansCyrl500

    //         a.buttons
    //             display flex
    //             justify-content center
    //             align-items center
    //             text-decoration none
</style>
