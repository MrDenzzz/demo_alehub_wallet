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

    import {mapGetters} from 'vuex';

    export default {
        name: 'confirmation-change-email',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                dataProcessing: true
            }
        },
        computed: {
            ...mapGetters([
                'confirmationChangeEmailStatus',
                'cancellationChangeEmailStatus'
            ])
        },
        created() {
            this.$store.dispatch('confirmationChangeEmail', {
                confirmToken: this.$route.params.token
        }).then(() => {
                if (this.confirmationChangeEmailStatus === 'success' || this.cancellationChangeEmailStatus === 'success') {
                    this.$router.push('/');
                }
            }).catch(() => {
                console.log('Error confirmation change email');
            });
        }
    }
</script>

<style lang="stylus" scoped>
    // .d-block
    //     display block
</style>