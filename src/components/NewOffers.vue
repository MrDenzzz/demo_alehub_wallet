<template>
    <div class="offers">
        <Navbar
                :title="$t('pages.jobOffers.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"
        />

        
    </div>
</template>

<script>
import Navbar from './layouts/Navbar'
export default {
    name: 'NewOffers',
    components: {
        Navbar
    },
    data () {
        return {
            rightMenu: {
                horizontal: false,
                list: [
                    {
                        type: "link",
                        name: this.$t("pages.jobOffers.rightMenu.savedOffers"),
                        link: "/offers/saved"
                    },
                    {
                        type: "link",
                        name: this.$t("pages.jobOffers.rightMenu.createOffer"),
                        link: "/offers/new"
                    }
                ]
            }
        }
    }
}
</script>

<style lang="stylus">

</style>
