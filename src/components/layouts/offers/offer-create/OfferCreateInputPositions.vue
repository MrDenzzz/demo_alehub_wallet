<template>
    <div class="offer-create-input-positions">
        <div class="control">
            <div class="wrap-input full-width">
                <label class="wrap-input-label">
                    Select positions
                </label>
                <div class="wrap-input-checkbox">
                    <input-list-checkbox :data="positions"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputListCheckbox from '../../forms/input/InputListCheckbox';

    export default {
        name: 'OfferCreateInputPositions',
        components: {
            InputListCheckbox
        },
        props: {
            positions: {
                type: [Array],
                required: true
            },
        },
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
            this.$on('returnChangeData', selectedPositions => {
                this.$parent.$emit('returnSelectedPositions', selectedPositions);
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .control
        .wrap-input
            .wrap-input-label
            label
                white-space unset

            .wrap-input-checkbox
                margin-top 18px
</style>