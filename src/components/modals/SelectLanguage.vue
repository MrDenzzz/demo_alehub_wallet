<template>
    <div>
        <modal name="selectLanguage" height="auto" class="modal-md" :adaptive="true">
            <div class="heading">
                <i v-if="parseInt(step) === 2" class="back" @click="step = 1"></i>
                <p class="title">{{ $t('modals.lang.title') }}</p>
            </div>
            <div class="langModal">
                <div class="body">
                        <div class="langButtons">
                            <button class="buttons btn-default"
                                    @click="newSelect('Русский', 'language')"
                                    :current="selectedLang"
                                    :id="'language'"
                                    value="rus">Русский</button>

                            <button class="buttons btn-default"
                                    @click="newSelect('English', 'language')"
                                    :current="selectedLang"
                                    :id="'language'"
                                    value="eng">English</button>

                            <button class="buttons btn-default"  disabled>中國</button>
                            <button class="buttons btn-default" disabled>Український</button>
                            <button class="buttons btn-default" disabled>日本語</button>
                            <button class="buttons btn-default" disabled>Deutsch</button>
                        <button @click="openModal('newwallet');
                                        hideModal('selectLanguage');" class="buttons btn-yellow openModal">{{ $t('modals.lang.submit') }}</button><!--modal-footer-->
                    </div>
                </div>
            </div>
        </modal>
        <new-wallet/>
    </div>
</template>

<script>
    import SelectControl from '../layouts/forms/Select';
    import Spinner from '../layouts/Spinner';
    import NewWallet from './NewWallet';


    import numeral from 'numeral';

    import sha256 from 'sha256';

    export default {
        name: "selectLanguage",
        components: {
            SelectControl,
            Spinner,
            NewWallet,
        },
        data() {
            return {
                selectedLanguage: 'English',
            };
        },
        computed: {
            selectedLang: function () {
                switch (localStorage.getItem('systemLang')) {
                    case 'eng':
                        return 'English';
                    case 'rus':
                        return 'Русский';
                }
            },
        },
        mounted(){
            this.$on('onselect', function (id, value) {
                this.newSelect(id, value)
            });
        },
        methods: {
            newSelect: function (value, id) {
                if (id === 'language') {
                    if (value === 'English')
                        localStorage.setItem('systemLang', 'eng');
                    if (value === 'Русский')
                        localStorage.setItem('systemLang', 'rus');
                    this.selectedLanguage = value;
                    this.$i18n.locale = localStorage.getItem('systemLang');
                    this.$parent.$emit('changeSystemLanguage');
                }
            },
                        changeLanguage: function () {
                            document.getElementsByClassName('value')[0].click();
                        },
            openModal: function (name) {
                this.$modal.show(name);
            },
            hideModal: function (name) {
                this.$modal.hide(name);
            },
        }
    }

</script>

<style lang="stylus">
    @import "./modals.scss"
    .langModal
        display flex

    .langButtons
        text-align center
        margin 20px

    .body
        flex-wrap wrap
        flex-direction row

    .buttons
        justify-content space-between
        flex-direction row
        flex-wrap wrap
        &:disabled
            opacity 0.4
            border-radius 2px
            background-color rgba(13, 23, 23, 0.08) !important



            &:hover
                cursor default

    .clicked
        cursor pointer



</style>
