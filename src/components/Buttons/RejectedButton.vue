<template>
    <button class="rejected">
    <slot />
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.rejected {
    box-sizing: border-box;	
    height: 24px;	
    width: 74px;	
    border: 2px solid #FFFFFF;	
    border-radius: 100px;	
    background-color: #D2305B;	
    color: #FFFFFF;	
    font-family: "Helvetica Neue";	
    font-size: 13px;	
    line-height: 16px;    
}
button:focus {
  
}
</style>
