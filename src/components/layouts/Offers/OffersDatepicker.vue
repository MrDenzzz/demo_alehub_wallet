<template>
    <div class="offers-datepicker">
        <datepicker id="dateOffersFrom"
                    class="dateOffersFrom"
                    v-if="opened"
                    v-model="offersDateFrom"
                    :language="$t('modals.pdf.lang')"
                    :inline="inline"/>
    </div>
</template>

<script>
    export default {
        name: 'OffersDatepicker',
        props: {
            isDatepickerFrom: {
                type: Boolean,
                required: true
            },
            isDatepickerTo: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                inline: true,
                opened: false,

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>