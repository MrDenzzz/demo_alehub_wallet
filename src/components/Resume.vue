<template>
    <div class="index">
        <Navbar
                :title="$t('pages.summary.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
        />

        Много резюме от исполнителей
    </div>
</template>

<script>
    import Navbar from "./layouts/Navbar";

    export default {
        name: "resume",
        components: {
            Navbar
        }
    }
</script>

<style lang="stylus" scoped>

</style>