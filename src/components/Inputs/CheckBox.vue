<template>
  <div class="checkbox noselect">
    <svg @click="Check"
         v-if="checked"
         xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         viewBox="0 0 24 24">
      <path fill="none"
            d="M0 0h24v24H0V0z" />
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z" />
    </svg>
    <svg @click="Check"
         v-else
         xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         viewBox="0 0 24 24">
      <path fill="none"
            d="M0 0h24v24H0V0z" />
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>

    <p>{{label}}</p>
  </div>
</template>

<script>
export default {
  props: ['height', 'width', 'label'],
  data: () => ({
    checked: false
  }),
  methods: {
    Check() {
      this.checked = !this.checked;
      this.$emit('checked', this.checked)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #212b36;
  //font-family: "Helvetica Neue";
  font-size: 14px;
  line-height: 20px;
  svg {
    cursor: pointer;
    fill: #51a3f3;
    margin-right: 7px;
  }
}
</style>

