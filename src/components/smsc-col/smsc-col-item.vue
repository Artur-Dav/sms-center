<template>
  <div
    class="smsc-col__item"
    :style="{ 'flex-basis': `${100 / colQuantity}%` }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'smsc-col-item',
  props: {
    'col-quantity': {
      type: Number,
      default: 3
    }
  }
}
</script>
