<template>
    <div class="select-widget">
        <div class="option-selected"
             @click="openListOptions"
             v-if="!openedList">
            {{ currentOption.title }}
        </div>
        <div class="option"
             v-for="option in options"
             v-if="openedList"
             @click="selectOption(option)">
            {{ option.title }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SelectWidget',
        props: {
            options: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                currentOption: this.options[0],
                openedList: false
            }
        },
        computed: {},
        methods: {
            /**
             * open a list of options
             */
            openListOptions: function () {
                this.openedList = true;
            },
            /**
             * select a current option from options list
             *
             * @param option
             */
            selectOption: function (option) {
                this.openedList = false;
                this.currentOption = option;
            }
        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>
    .select-widget

        .option-selected,
        .option
            cursor pointer
            height 36px
            background-color #f0f0f0
            font-family MuseoSansCyrl300
            padding 9px 18px

</style>