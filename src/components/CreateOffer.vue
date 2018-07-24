<template>    
    <div class="create-offer">
        <Navbar
                :title="$t('pages.newOffer.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="form">
                                <input-control
                                    :labelValue="'Offer Name'"
                                    :inputId="'offerName'"
                                    :placeholder="'Enter the name of the offer'"
                                    :fullWidth="true"
                                />
                                <textarea-control
                                    :label-value="$t('pages.newOffer.fields.description.label')"
                                    :textarea-id="'description'"
                                    :placeholder="'Type your description here'"
                                    :fullWidth="true"
                                />
                                <div class="control">
                                    <div class="wrap-input datepick">
                                        <label for="offerName">Start Date</label>
                                        <datepicker
                                            id="datepicker"
                                            v-model="newOffer.startDate"
                                            language="en"
                                            :placeholder="'Choose start time'"
                                        />
                                    </div>
                                </div>
                                <div class="control">
                                    <div class="wrap-input datepick">
                                        <label for="offerName">Final Date</label>
                                        <datepicker
                                            id="datepicker"
                                            v-model="newOffer.finalDate"
                                            language="en"
                                            :placeholder="'Choose final time'"
                                        />
                                    </div>
                                </div>
                                <input-control
                                    :labelValue="'Offer Price'"
                                    :inputId="'offerPrice'"
                                    :placeholder="'Enter the price of the offer'"
                                    :fullWidth="true"
                                    :inputType="'number'"
                                />
                            </div>
                            <button class="buttons btn btn-yellow" @click="createNewOffer(newOffer)">Create Offer</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from './layouts/Navbar';
import TextareaControl from './layouts/forms/TextareaControl';
import InputControl from './layouts/forms/InputControl';
import Datepicker from 'vuejs-datepicker';
import { mapActions } from 'vuex';

export default {
    name: 'CreateOffer',
    components: {
        Navbar,
        TextareaControl,
        InputControl,
        Datepicker
    },
    data() {
        return {
            newOffer: {
                name: '',
                description: '',
                projectName: '',
                companyName: '', // take from current user
                companyLogo: '', // take from current user
                startDate: '',
                finalDate: '',
                skills: '',
                price: null
            }
        }
    },
    methods: {
        ...mapActions([
            'createNewOffer'
        ])
    }
}
</script>

<style lang="stylus" scoped>
.form
    margin-bottom 24px

.control

    .wrap-input
        width 100%

        input 
            opacity 1

    &:last-child
        border none !important 



</style>

<style lang="stylus">
.control
    .datepick
        input
            opacity 1 !important
</style>

