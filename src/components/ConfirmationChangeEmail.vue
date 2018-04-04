<template>
    <div class="confirmation-change-email">
        <navbar
                :title="'ALE'"
                :isNavigate="false"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <spinner v-if="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import Spinner from './layouts/Spinner';

    export default {
        name: 'confirmation-change-email',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                loading: true
            }
        },
        created() {
            this.$store.dispatch('confirmationChangeEmail',
                this.$route.params.token
            ).then(() => {
                console.log('Success confirmation change email');
            }).catch(() => {
                console.log('Error confirmation change email');
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .d-block
        display block
</style>