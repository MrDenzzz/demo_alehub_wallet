<template>
    <div class="form-group">
        <label for="name">
            {{ title }}
        </label>
        <input type="text" id="name"
               v-model="value"
               @blur="emitChangeValue(value)">
    </div>
</template>

<script>
    export default {
        name: 'InputFilter',
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                value: ''
            }
        },
        methods: {
            emitChangeValue: function (value) {
                this.$parent.$emit('changeName', value);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .form-group
        display flex
        flex-direction column
        align-items flex-start
        margin-bottom 24px

        label
            margin-bottom 12px
            font-family MuseoSansCyrl500
            font-size 13px
            font-weight bold
            color #34343e

        input
            border-radius 2px
            background-color #f7f7f7
            border solid 1px #979797
            width 100%
            padding 6px 8px
            font-family MuseoSansCyrl500
            font-size 12px
            color #34343e
</style>