<template>
  <div class="no-data">{{ message }}</div>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    message: {
      type: String,
      default: 'No Data'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  width: 100%;
  padding: 20px;
  font-size: 22px;
  background-color: #fff;
  color: #929292;
  text-align: center;
}
</style>