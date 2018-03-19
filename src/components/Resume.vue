<template>
    <div class="resumes">
        <Navbar
                :title="$t('pages.summary.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
        />
        <section class="main">
            <div class="content nomenu">
                <div class="container" v-if="isLoader">
                    <div class="row">
                        <div class="col-12">
                            <Spinner/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from "./layouts/Navbar";
    import Spinner from "./layouts/Spinner";

    export default {
        name: "resume",
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                isLoader: false
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>