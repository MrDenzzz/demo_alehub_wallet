<template>
    <div class="offer-create-reqs-input-autocomplete">
        <input-autocomplete :title-control="titleControl"
                            :placeholder="placeholder"
                            :input-id="inputId"
                            :requirements-list="requirementsList"/>
    </div>
</template>

<script>
    import InputAutocomplete from '../../forms/input/InputAutocomplete';

    export default {
        name: 'OfferCreateReqsInputAutocomplete',
        components: {
            InputAutocomplete
        },
        props: {
            titleControl: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                required: true
            },
            inputId: {
                type: String,
                required: true
            },
            requirementsList: {
                type: [Array],
                required: true
            }
        },
        mounted() {
            this.$on('returnDataList', dataList => {
                this.$parent.$emit('returnCreateOfferRequirements', dataList);
            });
        }
    }
</script>

<style lang="stylus" scoped>

</style>