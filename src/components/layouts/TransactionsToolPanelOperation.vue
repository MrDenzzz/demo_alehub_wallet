<template>
    <div class="top">
        <div class="searchControl" @click="makeFocusSearch()">
            <img src="../../assets/img/search-ic.svg" width="16" height="16">
            <input
                    type="text"
                    id="search-transactions"

                    @input="searchTransaction()"
                    :placeholder="$t('pages.summary.searchPanel.search')"
                    v-model="searchCurrentText">
        </div>

        <send-request/>
    </div>
</template>

<script>
    import SendRequest from './SendRequest';

    import {mapGetters} from 'vuex';

    export default {
        name: 'transactions-operation-tool-panel',
        components: {
            SendRequest
        },
        props: {
            resetSearch: {
                type: Boolean
            }
        },
        watch: {
            'resetSearch': function (val) {
                if (val) {
                    this.searchCurrentText = '';
                    this.$parent.$emit('successResetSearchToTool');
                }
            }
        },
        data() {
            return {
                searchCurrentText: ''
            }
        },
        methods: {
            makeFocusSearch: function () {
                document.getElementById('search-transactions').focus();
            },
            searchTransaction: function () {

                this.$store.dispatch('setSearchText',
                    this.searchCurrentText
                ).then(() => {
                    // console.log('Success set search text');
                }).catch(() => {
                    console.log('Error set search text');
                });

            },
        }
    }
</script>
