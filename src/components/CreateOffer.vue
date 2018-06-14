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
                                <div class="control">
                                    <label>Offer Name</label>
                                    <input type="text">
                                </div>
                                <div class="control">
                                    <label>Offer Description</label>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                                <div class="control">
                                    <div style="display: flex;">
                                        <div style="display: flex; flex-direction: column;">
                                            <label>Start Date</label>
                                            <input type="date">
                                        </div>
                                        <div style="display: flex; flex-direction: column;">
                                            <label>Final Date</label>
                                            <input type="date">
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column;" class="control">
                                    <label>Project Name</label>
                                    <input type="text">
                                </div>
                                <div style="display: flex; flex-direction: column;" class="control">
                                    <label>Requirements and Skills</label>
                                    <input type="text">
                                </div>
                                <div style="display: flex; flex-direction: column;" class="control">
                                    <label>Offer Price</label>
                                    <input type="text">
                                </div>
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
import PanelHeading from './layouts/PanelHeading';
import InputControl from './layouts/forms/InputControl';
import TextareaControl from './layouts/forms/TextareaControl';
import AutocompleteRequirementsControl from './layouts/forms/AutocompleteRequirementsControl';
import DatepickerControl from './layouts/forms/DatepickerControl';
import PriceControl from './layouts/forms/PriceControl';


export default {
    name: 'CreateOffer',
    components: {
        Navbar,
        PanelHeading,
        InputControl,
        TextareaControl,
        AutocompleteRequirementsControl,
        DatepickerControl,
        PriceControl
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
                skills: [],
                price: 0
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.control
    display flex
    flex-direction column
    align-items flex-start

    input
        z-index unset 
        opacity 1
        display unset 
        position unset
</style>
