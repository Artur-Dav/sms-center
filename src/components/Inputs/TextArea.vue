<template>
  <div class="primary-input-container">
    <p v-if="name" class="pimary-input-title">{{name}}</p>
    <div class="text-area-container">
      <p class="character-count">Character Count: {{value.length}}/160</p>
      <textarea :name="name"
                :placeholder="placeholder"
                :value="value"
                :disabled="disabled"
                @input="updateSelf($event.target.value)"
                :maxlength="maxlength"
                :cols="cols"
                :rows="rows"></textarea>
    </div>

  </div>
</template>

<script>
export default {
  props: ['value', 'type', 'placeholder', 'name', 'count', 'maxlength', 'disabled', 'cols', 'rows'],
  methods: {
    updateSelf (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.primary-input-container {
  width: 100%;
  .pimary-input-title {
    color: #000000;
    //font-family: "Helvetica Neue";
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.21px;
    line-height: 15px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  .text-area-container {
    position: relative;
    height: calc(100% - 20px);
    width: 100%;
    .character-count {
      position: absolute;
      top: calc(100% - 25px);
      left: calc(100% - 167px);
      height: 15px;
      color: #55616e;
      //font-family: "Helvetica Neue";
      font-size: 13px;
      line-height: 15px;
    }
    textarea {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 10px 10px 10px 15px;
      border: 1px solid #edeef3;
      border-radius: 4px;
      outline: none;
      //font-family: "Helvetica Neue";
      font-size: 14px;
      line-height: 25px;
      resize: none;
    }
    ::placeholder {
      color: #55616e !important;
      opacity: 1;
    }
  }
  :focus {
    border: 1px solid #51a3f3;
  }
}
</style>