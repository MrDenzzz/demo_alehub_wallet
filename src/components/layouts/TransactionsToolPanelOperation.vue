<template>
    <div class="top">
        <div class="searchControl" @click="makeFocusSearch()">
            <img src="../../assets/img/search-ic.svg" width="16" height="16">
            <input
                    type="text"
                    id="search-transactions"
                    @input="searchTransaction()"
                    :placeholder="$t('pages.summary.searchPanel.search')"
                    v-model="searchText">
        </div>
        <div>
            <button class="buttons btn-yellow" @click="openModal('send')">
                <img :src="getIcon('send')" width="18" height="15" class="icon">
                {{ $t('pages.summary.buttons.send') }}
            </button>
            <button class="buttons btn-default" @click="openModal('request')">
                <img :src="getIcon('receive')" width="18" height="15" class="icon">
                {{ $t('pages.summary.buttons.request') }}
            </button>
        </div>

        <modal-send/>
        <modal-request/>
    </div>
</template>

<script>
    import ModalSend from '../modals/Send';
    import ModalRequest from '../modals/Request';

    export default {
        name: 'transactions-operation-tool-panel',
        components: {
            ModalSend,
            ModalRequest
        },
        data() {
            return {
                searchText: ''
            }
        },
        computed: {},
        methods: {
            getIcon: function (name) {
                if (this.selectedTheme === 'dark')
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === 'white')
                    return require(`../../assets/img/${name}_dark.svg`);

                return require(`../../assets/img/${name}.svg`);
            },
            openModal: function (name) {
                this.$modal.show(name);
            },
            makeFocusSearch: function () {
                //rewrite. bad method
                document.getElementById('search-transactions').focus();
            },
            searchTransaction: function () {
                this.$parent.$emit('searchTransaction', this.searchText);
            },
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>
    //переместить эти стили в общие

    .top
        display flex
        justify-content space-between
        align-items flex-end
        padding-bottom 18px
        border-bottom 1px solid #d1d1d1
        margin-bottom 24px

        .searchControl
            display flex
            justify-content flex-start
            width calc(100% - 350px)
            cursor pointer

            input
                background none
                outline none
                border none
                border-bottom 1px solid #ccc
                opacity 0.5
                font-family MuseoSansCyrl300
                font-size 14px
                line-height 1.29
                color #34343e
                margin-left 18px
                padding 0
                margin-top 0

                &:focus
                    width 100% !important
                    @media screen and (max-width: 768px)
                        width auto !important

        #search-transactions
            width auto


        .buttons
            margin-bottom 0
</style>