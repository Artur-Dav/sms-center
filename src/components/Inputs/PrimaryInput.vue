<template>
  <div class="primary-input-container">
    <p v-if="label_name || name" class="pimary-input-title">{{label_name || name}}</p>
    <input :type="type"
           :value="value"
           @input="$emit('input', $event.target.value)"
           :name="name"
           :v-card-focus="cardFocus"
           :disabled="disabled"
           :placeholder="placeholder"
           class="pimary-input" />
  </div>
</template>

<script>
export default {
  props: ['value', 'type', 'placeholder', 'name', 'disabled', 'cardFocus', 'label_name']
}
</script>

<style lang="scss" scoped>
.first_name input{
    text-transform: capitalize;
}
.primary-input-container {
  width: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .pimary-input-title {
    color: #000000;
    // font-family: "Helvetica Neue";
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.21px;
    line-height: 15px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  .pimary-input {
    width: 100%;
    height: 40px;
    border: 1px solid #edeef3;
    border-radius: 4px;
    background-color: #ffffff;
    // font-family: "Helvetica Neue";
    font-size: 14px;
    line-height: 25px;
    padding-left: 15px;
  }
  input:focus {
    border: 1px solid #51a3f3;
  }
  input::placeholder {
    color: #55616e !important;
    opacity: 1;
  }
}
</style>