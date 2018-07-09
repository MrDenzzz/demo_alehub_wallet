<template>
    <div class="offers-datepicker-to">
        <datepicker id="dateOffersTo"
                    class="dateOffersTo"
                    v-if="opened"
                    v-model="dateTo"
                    :language="$t('modals.pdf.lang')"
                    :inline="inline"/>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'OffersDatepickerTo',
        components: {
            Datepicker
        },
        data() {
            return {
                inline: true,
                opened: false,
                dateTo: null
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>