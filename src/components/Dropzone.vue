<template>
  <vue-dropzone @vdropzone-complete="$emit('fileAdd', $event)" 
                @vdropzone-removed-file="$emit( 'remove', $event)" 
                ref="dropzone" 
                id="dropzone" 
                :options="options">
  </vue-dropzone>
</template>
<script>
  import vue2Dropzone  from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';
  import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
  

  export default {
    name: 'dropzone',
    props: [
      'optionsProp',
      'dictMessage'
    ],
    components: {
      'vue-dropzone': vue2Dropzone ,
      PrimaryButton
    },
    data() {
      return {
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 200,
          maxFilesize: 0.5,
          addRemoveLinks: true,
          clickable: true,
          headers: { "My-Awesome-Header": "header value" },
          dictDefaultMessage: `<primary-button 
                v-model="photo"
                class="upload-button"
                style="
                      height: 40px;	
                      width: 136px;	
                      border-radius: 4px;	
                      background-color: #51A3F3;
                      margin: 0;
                      padding: 9px 0;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                "
                >Upload File</primary-button>`,
        }
      }
    },
    computed: {
      options() {
        return {...this.dropzoneOptions, ...this.optionsProp}
      }
    },
  }
</script>
<style lang="scss" scoped>
  .vue-dropzone {
    border: 1px dashed #5171F3;	
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #FFFFFF;
    min-height: 240px;
    margin-right: 15px;
    position: relative;
    transition: background-color .2s linear;
  }
  .upload-button {
    height: 40px;	
    width: 136px;	
    border-radius: 4px;	
    background-color: #51A3F3;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<style>
  .dropzone .dz-preview {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 0px;
    height: fit-content;
    width: fit-content;
    margin-left: -100px;
    left: 50%;
    min-height: 100px;
  }
</style>
