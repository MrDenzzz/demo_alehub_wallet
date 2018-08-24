<template>
    <div class="multiple-file-uploader">
        <!--ref="myVueDropzone"-->
        <dropzone id="customdropzone"
                  class="dropzone"
                  :options="dropzoneOptions"
                  :include-styling="includeStyling"/>
    </div>
</template>

<script>
    // import Dropzone from 'vue2-dropzone';

    export default {
        name: 'InputFileDropzone',
        components: {
            Dropzone
        },
        data() {
            return {
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    headers: {'My-Awesome-Header': 'header value'},
                    maxFilesize: 10, // MB
                    maxFiles: 6,
                    chunking: true,
                    chunkSize: 500, // Bytes
                    thumbnailWidth: 150, // px
                    thumbnailHeight: 150,
                    addRemoveLinks: true,
                    dictDefaultMessage: 'Drop files here to upload',
                    previewTemplate: this.template(),
                },
                includeStyling: false
            }
        },
        methods: {
            template: function () {
                return `<div class="dz-preview dz-file-preview">
                            <div class="dz-message">
                                <span data-dz-message></span>
                            </div>
                            <div class="dz-image">
                                <div data-dz-thumbnail-bg></div>
                            </div>
                            <div class="dz-details">
                                <div class="dz-size"><span data-dz-size></span></div>
                                <div class="dz-filename"><span data-dz-name></span></div>
                            </div>
                            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                            <div class="dz-error-message"><span data-dz-errormessage></span></div>
                            <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                            <div class="dz-error-mark"><i class="fa fa-close"></i></div>
                    </div>`;
            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import '~vue2-dropzone/dist/vue2Dropzone.css';

    #customdropzone {
        background-color: transparent;
        font-family: 'Arial', sans-serif;
        letter-spacing: 0.2px;
        color: #777;
        transition: background-color .2s linear;
        height: 200px;
        padding: 40px;
    }

    #customdropzone .dz-preview {
        width: 160px;
        display: inline-block
    }

    #customdropzone .dz-preview .dz-image {
        width: 80px;
        height: 80px;
        margin-left: 40px;
        margin-bottom: 10px;
    }

    #customdropzone .dz-preview .dz-image > div {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background-size: contain;
    }

    #customdropzone .dz-preview .dz-image > img {
        width: 100%;
    }

    #customdropzone .dz-preview .dz-details {
        color: white;
        transition: opacity .2s linear;
        text-align: center;
    }

    #customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
        display: none;
    }
</style>