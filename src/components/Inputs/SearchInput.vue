<template>
  <div class="primary-input-container">
    <p vi-if="name" class="pimary-input-title">{{name}}</p>
    <div class="search-input">
      <img src="../../assets/Icon/Search.svg" class="icon" alt />
      <input
        :type="type"
        :value="value"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "type", "placeholder", "name", "maxlength", "disabled"]
};
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
}

.search-input {
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  .icon {
    left: 5px;
    position: absolute;
    height: 30px;
    width: 30px;
  }
  input {
    z-index: 2;
    width: 100%;
    height: 100%;
    border: 1px solid #edeef3;
    border-radius: 4px;
    background-color: #ffffff;
    //font-family: "Helvetica Neue";
    font-size: 14px;
    line-height: 25px;
    padding-left: 40px;
    background-color: transparent;
    ::placeholder {
      color: #55616e;
    }
  }
  input:focus {
    border: 1px solid #51a3f3;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
