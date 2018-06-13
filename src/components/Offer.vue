<template>
    <div class="offers">
        <navbar title="Contract Overview"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"/>

        <info-bar/>

        <contractors-list/>

        <timeline/>

    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import InfoBar from './layouts/InfoBar';
    import ContractorsList from './layouts/ContractorsList';
    import Timeline from './layouts/Timeline';

    export default {
        name: 'NewOffers',
        components: {
            Navbar,
            InfoBar,
            ContractorsList,
            Timeline
        },
        data() {
            return {
                rightMenu: {
                    horizontal: false,
                    list: [
                        {
                            type: 'link',
                            name: this.$t('pages.jobOffers.rightMenu.savedOffers'),
                            link: '/offers/saved'
                        },
                        {
                            type: 'link',
                            name: this.$t('pages.jobOffers.rightMenu.createOffer'),
                            link: '/offers/new'
                        }
                    ]
                },
            }
        },
        computed: {
            selectedTheme() {
                return this.$store.state.Themes.theme;
            }
        }
    }
</script>

<style lang="stylus">
</style>
