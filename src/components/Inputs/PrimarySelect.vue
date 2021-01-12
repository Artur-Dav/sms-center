<template>
  <div class="primary-input-container">
    <p v-if="label_name || name" class="pimary-input-title">{{label_name || name}}</p>
    <span v-if="items">Selected - {{items}}</span>
    <div class="primary-select-wrapper">
      <select
        :value="value"
        :name="name"
        :disabled="disabled"
        ref="sel"
        @focus="evn ? $refs.sel.size = 8 : null"
        @blur="evn ? $refs.sel.size = 1 : null"
        @change="evn ? $refs.sel.size = 1 : $emit('input', $event.target.value)"
      >
        <slot />
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >{{ option.name }}</option>
      </select>
      <img src="../../assets/Icon/Arrow/Down.svg" class="icon-down" alt />

      <!-- <multiselect :value="value"
                  :name="name"
                  :disabled="disabled"
                  v-model="selected"
                  @input="handleSelect"
                  :options="options"
                  :multiple="false"
                  :allow-empty="false"
                  :selectLabel="''"
                  :deselectLabel="''"
                  :closeOnSelect="true"
                  :show-labels="false"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder=""
                  label="name"
                  track-by="value"
                  :preselect-first="true">
        <template slot="selection"
                  slot-scope="{ values, search, isOpen, option }">
          <span class="multiselect__single"
                v-if="values.length &amp;&amp; !isOpen"> selected
          </span>
        </template>
      </multiselect>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'options', 'name', 'disabled', 'label_name', 'items', 'evn'],
  data: () => ({
    selected: null
  }),
  computed: {
    checkedOprtions () {
      return this.options.map((i) => ({ removable: false, ...i }))
    }
  },
  methods: {
    handleSelect (e) {
      this.$emit('input', e ? e.value : null)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.primary-input-container {
  width: 100%;
  padding: 0;
  .pimary-input-title {
    width: 100%;
    color: #000000;
    //font-family: "Helvetica Neue";
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.21px;
    line-height: 15px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  .primary-select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 1px solid #edeef3;
    border-radius: 4px;
    background-color: #ffffff;

    ::placeholder {
      color: #55616e;
    }
    select {
      -webkit-appearance: none; /* Webkit */
      -moz-appearance: none; /* FF */
      -ms-appearance: none; /* Edge */
      appearance: none; /* Future */

      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-left: 15px;
      //font-family: "Helvetica Neue";
      font-size: 16px;
      line-height: 25px;
    }
    select:focus {
      border: 1px solid #51a3f3;
    }
    select::-ms-expand {
      display: none;
    }
    .icon-down {
      //position: absolute;
      position: absolute;
      top: 4px;
      left: 100%;
      margin-left: -35px;
      background: #fff;
      pointer-events: none;
    }
  }
}
</style>