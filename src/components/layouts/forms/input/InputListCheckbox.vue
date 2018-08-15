<template>
    <div class="input-checkbox">
        <div class="input-checkbox-inner"
             v-for="item in data">
            <input type="checkbox"
                   :id="item.title"
                   :value="item.id"
                   v-model="model"
                   @change="changeModel(model)">

            <label :for="item.title"
                   :class="calcActiveClass(item.id)">
                {{ item.label }}
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputCheckbox',
        props: {
            data: {
                type: [Array],
                required: true
            }
        },
        data() {
            return {
                model: []
            }
        },
        methods: {
            /**
             * when change data model checkbox trigger emit change data to parent component
             *
             * @param model
             */
            changeModel: function (model) {
                this.$parent.$emit('returnChangeData', model);
            },
            /**
             * calculate active class label by data
             *
             * @param itemId
             * @returns {string}
             */
            calcActiveClass: function (itemId) {
                if (this.model.find(m => m === itemId))
                    return 'active-label';
                return 'inactive-label';
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .input-checkbox
        display flex
        flex-direction column

        .input-checkbox-inner
            display flex

            &:not(:last-child)
                margin-bottom 12px

            input
                cursor pointer
                width auto !important
                margin 0 10px 0 0 !important

            label
                cursor pointer
                font-weight 500
                text-transform capitalize !important
                white-space unset !important

            .active-label
                color #34343e

            .inactive-label
                color #98989c
</style>