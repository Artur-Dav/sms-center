<template>
  <button :disabled="disabled" class="PrimaryButton ff-p fw-5 fs-15">
    <slot />
  </button>
</template>

<script>
//comments
export default {
  props: {
    to: {
      type: Object,
      default: () => {}
    },
    disabled: {}
  },
  methods: {
    navigate () {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.PrimaryButton {
  cursor: pointer;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  background: linear-gradient(135deg, #51a3f3 0%, #51b5f3 100%);
  color: white;
  outline: none;
  border: none;
  font-family: "Helvetica Neue";
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
  padding: 5px 20px 5px 20px;
}
.PrimaryButton:disabled {
  background: #d3d5d6;
  cursor: default;
}
</style>

