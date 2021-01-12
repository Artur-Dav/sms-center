<template>
  <div class="data-not-found">{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'No Data Found'
    }
  }
}
</script>

<style scoped>
.data-not-found {
  width: 100%;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background-color: #f2f2f2;
  color: #9a9a9a;
  font-size: 20px;
  font-weight: 500;
}
</style>