<template>
    <div class="select-widget"
         :id="identifier">
        <div class="select-widget-option-selected"
             @click="openListOptions"
             v-if="!openedList || !opened">
            <span>
                {{ currentOption.title }}
            </span>
            <img class="arrow-down"
                 src="../../../../static/img/arrows/arrow-down.svg" alt="show">
        </div>
        <div class="select-widget-list" v-if="openedList && opened">
            <div class="select-widget-option"
                 :class="{ 'select-widget-option__active': checkCurrentOption(option) }"
                 v-for="option in options"
                 @click="selectOption(option)">
            <span>
                {{ option.title }}
            </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SelectWidget',
        props: {
            identifier: {
                type: String,
                required: true
            },
            opened: {
                type: Boolean,
                required: true
            },
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
            },
            /**
             * checking the current option for compliance
             *
             * @param option
             * @returns {*|boolean}
             */
            checkCurrentOption: function (option) {
                return this.currentOption.equals(option);
            }
        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>
    .select-widget

        .select-widget-option-selected,
        .select-widget-option
            width 150px
            cursor pointer
            height 36px
            font-size 14px
            padding 9px 18px

        .select-widget-option-selected
            background-color #f0f0f0
            display flex
            justify-content space-between
            align-items center

            .arrow-down
                height 7px

            span
                font-family MuseoSansCyrl500
                color #1f202a
                opacity .7

        .select-widget-list
            -webkit-box-shadow 0 5px 20px 0 rgba(0, 0, 0, .12)
            -moz-box-shadow 0 5px 20px 0 rgba(0, 0, 0, .12)
            box-shadow 0 5px 20px 0 rgba(0, 0, 0, .12)

            .select-widget-option
                background-color #ffffff
                transition background-color .1s linear

                &:hover
                    background-color #f0f0f0

                span
                    font-family MuseoSansCyrl500
                    color #1f202a

                &.select-widget-option__active
                    background-color #ffd24f
</style>