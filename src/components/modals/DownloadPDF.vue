<template>
    <modal name="download-pdf" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Download statistics</p>
            <i class="close" @click="closeModal('download-pdf')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="makeAndDownloadPDF">
                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner />
                </div>

                <div class="modal-btn">
                    <button class="btn btn-yellow btn-large" type="button">
                        Download
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    import JsPDF from 'jspdf';

    import {mapGetters} from 'vuex';

    export default {
        name: 'customization-download-pdf',
        components: {
            Spinner
        },
        data() {
            return {
                dataProcessing: false
            }
        },
        computed: {
            ...mapGetters([

            ])

        },
        methods: {
            closeModal: function (name) {
                this.$modal.hide(name);
            },
            makeAndDownloadPDF: function () {

            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>

</style>