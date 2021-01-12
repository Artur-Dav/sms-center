<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base"    label="Domain Name" icon-no-border />
    <vs-input class="w-full mb-base"    label="Contact Email" icon-no-border />
    <div class="">
      <vs-checkbox v-model="checkBox">Enable Registration</vs-checkbox>
    </div>
    </vx-card>
</template>

<script>
export default {
  data () {
    return {
      checkBox:true
    }
  }
}
</script>
