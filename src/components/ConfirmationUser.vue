<template>
    <div class="confirmation-user">
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
                            <div v-if="dataProcessing" class="wrap-spinner">
                                <spinner/>
                            </div>
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
        name: 'confirmation-email',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                dataProcessing: true
            }
        },
        created() {
            this.$store.dispatch('confirmationRegistration', {
                token: this.$route.params.token
            }).then(() => {
                this.dataProcessing = false;
                this.$router.push('/login');
            }).catch((err) => {
                console.log('Error with confirmation user', err);
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .d-block
        display block
</style>