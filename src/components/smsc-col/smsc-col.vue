<template>
  <div>
    <div ref="wrapper" class="smsc-col">
      <slot :col-quantity="colQuantity" />
      <template v-if="items_length % colQuantity !== 0">
        <smsc-col-item
          v-for="item in additional_items"
          :key="`item-${item}`"
          :style="{ 'flex-basis': `${100 / colQuantity}%` }"
          class="empty-field"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'smsc-col',
  props: {
    'col-quantity': {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      items_length: null,
      additional_items: 0
    }
  },
  mounted () {
    this.items_length = this.$refs.wrapper && this.$refs.wrapper.children.length || 0
    this.additional_items = this.colQuantity - (this.items_length % this.colQuantity)
  }
}
</script>

<style lang="scss">
.smsc-col {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .smsc-col__item {
    flex-grow: 1;
    min-width: 270px;
    min-height: 88px;
    padding: 3px 10px;

    &.empty-field {
      min-height: 0;
      max-height: 0;
      padding: 0;
    }
  }
}
</style>