<template>
  <button class="secondary-button">
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.secondary-button {
  cursor: pointer;
  height: 100%;
  width: 100%;
  border: 1px solid #bdbfd8;
  border-radius: 4px;
  background-color: #ffffff;
  color: #55616e;
  font-family: "" Helvetica Neue "";
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  padding: 10px 20px 10px 20px;
}
button:focus {
  border: 1px solid #51a3f3;
}
</style>
