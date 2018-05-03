<template>
    <div class="list-panel-heading" :class="{ 'mr-t0': isTop }">
        <h3>{{ title }}</h3>
        <h3 class="small" v-if="isSmall">{{ smallTitle }}</h3>
        <label v-if="checkBox" class="control control-checkbox">
            {{ checkBoxName }}
            <input type="checkbox" class="type_project_arr" :value="checkBoxValue" @change="toggleCheckBox"
                   :checked="checkBoxState">
            <div class="control-indicator"></div>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'panelHeading',
        props: {
            title: String,
            isTop: [String, Boolean],
            isSmall: [String, Boolean],
            smallTitle: String,
            checkBox: [String, Boolean],
            checkBoxName: String,
            checkBoxValue: String,
            checkBoxState: [String, Boolean]
        },
        methods: {
            toggleCheckBox() {
                this.$parent.$emit('toggleCheckBox', this.checkBoxValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
    // .control-checkbox {
    //     width: auto;
    // }

    // .control {
    //     font-size: 14px;
    //     color: rgba(52, 52, 62, 0.7);
    //     padding-left: 26px;

    //     & .control-indicator {
    //         height: 18px;
    //         width: 18px;

    //         &::after {
    //             top: 1.5px;
    //             width: 5px;
    //             height: 9px;
    //             border-width: 0px 1.5px 1.5px 0;
    //         }
    //     }
    // }
</style>
