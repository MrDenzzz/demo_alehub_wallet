<template>
    <div class="folded-filter" :style="{ 'bottom': offsetBottom }">
        <div class="title">
            Title
        </div>
        <button type="button" class="unfold" @click="toUnfold">
            <img src="../../../static/img/arrow-down-light.svg" alt="">
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
            offsetBottom: {
                type: String,
                required: false
            },
            foldOption: {
                type: String,
                required: false
            }
        },
        methods: {
            toUnfold: function () {
                this.$parent.$emit('onFold', false);

                switch (this.foldOption) {
                    case 'ts' :
                        this.$parent.$emit('onFoldTs', false);
                        break;
                    case 'ts-ex' :
                        this.$parent.$emit('onFoldTsEx', false);
                        break;
                    case 'ch' :
                        this.$parent.$emit('onFoldCh', false);
                        break;
                    case 'qa' :
                        this.$parent.$emit('onFoldQa', false);
                        break;
                    default :
                        break;
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .folded-filter
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