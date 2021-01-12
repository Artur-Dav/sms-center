<template>
  <div class="active-only-container">
    <vs-checkbox
      v-model="is_active"
      @input="Toggle"
    >Active Only</vs-checkbox>
  </div>
</template>

<script>
export default {
  name: 'active-only',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      is_active: false
    }
  },
  methods: {
    Toggle (e) {
      this.$emit('toggle', e ? 'active' : false)
    }
  }
}
</script>

<style lang="scss" scoped>
.active-only-container {
  width: 120px;
}
</style>