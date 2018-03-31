<template>
    <div class="transactions-buttons">
        <button class="buttons btn-yellow" @click="openModal('send')">
            <img :src="getIcon('send')" width="18" height="15" class="icon">
            {{ $t('pages.summary.buttons.send') }}
        </button>
        <button class="buttons btn-default" @click="openModal('request')">
            <img :src="getIcon('receive')" width="18" height="15" class="icon">
            {{ $t('pages.summary.buttons.request') }}
        </button>

        <modal-send/>
        <modal-request/>
    </div>
</template>

<script>
    import ModalSend from '../modals/Send';
    import ModalRequest from '../modals/Request';

    export default {
        name: 'send-request',
        components: {
            ModalSend,
            ModalRequest
        },
        data() {
            return {
                ModalSend,
                ModalRequest
            }
        },
        computed: {
            selectedTheme() {
                return this.$store.state.Themes.theme;
            }
        },
        methods: {
            openModal: function (name) {
                this.$modal.show(name);
            },
            getIcon: function (name) {
                if (this.selectedTheme === 'dark')
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === 'white')
                    return require(`../../assets/img/${name}_dark.svg`);

                return require(`../../assets/img/${name}.svg`);
            }
        },
        created() {

        },
        mounted() {
            this.$on('successCopyAddress', function () {
                this.$modal.hide('request');

                this.$toasted.show('You have successfully copied the address of the wallet', {
                    duration: 5000,
                    type: 'success',
                });
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .transactions-buttons
        .buttons
            margin-bottom 0
    
    @media(max-width: 375px)
        .transactions-buttons
            width 100%
            .buttons
                width 100%
                margin-bottom 10px 
</style>