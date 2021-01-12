<template>
    <button class="approved">
    <slot />
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.approved {	
    color: #FFFFFF;	
    font-family: "Helvetica Neue";	
    font-size: 13px !important;
    line-height: 16px;
    box-sizing: border-box;	
    height: 24px;	
    width: 80px;	
    border: 2px solid #FFFFFF;	
    border-radius: 100px;	
    background-color: #24E2B8;
    
}
button:focus {
  
}
</style>
