<template>
  <div class="smsc-dropdown">
    <label v-if="label" class="vs-input--label">{{ label }}</label>
    <div class="smsc-dropdown__container">
      <select
        class="smsc-dropdown__select"
        :class="{'smsc-danger': danger}"
        :value="value"
        :disabled="disabled"
        @change="$emit('input', $event.target.value)"
      >
        <option
          v-for="(item, index) in options"
          :key="`option-${index}`"
          :value="item.value"
        >{{ item.name }}</option>
      </select>
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <path d="M14.6619803,15.2477667 L18.909747,11 L20.3239606,12.4142136 L14.6671063,18.0710678 L14.6619803,18.0659418 L14.6568542,18.0710678 L9,12.4142136 L10.4142136,11 L14.6619803,15.2477667 Z" id="path-1"></path>
        </defs>
        <g id="Icon-/-Arrow-/-Down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <mask id="mask-2" fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <use id="Combined-Shape" fill="#D8D8D8" xlink:href="#path-1"></use>
          <g id="Color-/-Dark-4" mask="url(#mask-2)" fill="#8b8b8b">
            <rect id="Rectangle" x="0" y="0" width="30" height="30"></rect>
          </g>
        </g>
      </svg>
    </div>
    <div
      v-if="danger"  
      class="smsc-select__danger-text"
    >{{ dangerText }}</div>
  </div>
</template>

<script>
export default {
  name: 'smsc-dropdown',
  props: {
    label:       { type: String,  default: ''       },
    options:     { type: Array,   default: () => [] },
    value:       {                default: null     },
    disabled:    { type: Boolean, default: false    },
    danger:      { type: Boolean, default: false    },
    dangerText:  { type: String,  default: ''       }
  }
}
</script>

<style lang="scss" scoped>
.smsc-dropdown {
  width: 100%;

  .smsc-dropdown__container {
    position: relative;
    width: 100%;
    height: 37.6px;

    .smsc-dropdown__select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0 30px 0 6px;
      border: 1px solid rgba(60, 60, 60, 0.26);
      border-radius: 4px;
      font-size: 14px;
      font-family: "Montserrat", Helvetica, Arial, sans-serif;
      color: #626262;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;

      &.smsc-danger {
        border-color: #ea5455;
      }
    }
    svg {
      position: absolute;
      top: 4px;
      right: 2px;
      z-index: 1000;
      width: 30px;
      height: 30px;
    }
  }
  .smsc-select__danger-text {
    padding: 2px 4px 4px;
    font-size: 9.1px;
    color: #ea5455;
  }
}
</style>