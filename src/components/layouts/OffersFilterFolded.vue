<template>
    <!--:style="{ 'left': (queue - 1) * 153 + 'px' }"-->
    <div class="folded-filter"
         :style="{ 'bottom': queue * 30 + 'px' }">
        <div class="title">
            {{ title }}
        </div>
        <button type="button" class="unfold"
                @click="toUnfold">
            <img src="../../../static/img/arrow-down-light.svg" alt="to fold">
        </button>
    </div>
</template>

<script>
    export default {
        name: 'OffersFilterFolded',
        data() {
            return {}
        },
        props: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            queue: {
                type: Number,
                required: true
            }
        },
        methods: {
            toUnfold: function () {
                this.$parent.$emit('onFold', {id: this.id, opened: true, folded: false});
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .folded-filter
        z-index 3
        position fixed
        left 20px
        width 150px
        padding 5px 10px
        display flex
        justify-content space-between
        align-items center
        background-color #34343e

        .title
            text-transform unset

        .unfold
            cursor pointer
            width 25px
            background-color transparent
            border none

            &:focus
                outline none

            img
                width 100%
                transform rotateX(180deg)
</style>