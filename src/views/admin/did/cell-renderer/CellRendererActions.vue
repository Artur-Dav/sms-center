<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <edit-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="Edit"
    />
  </div>
</template>

<script>
import { EditIcon } from 'vue-feather-icons'

export default {
  name: 'CellRendererActions',
  components: {
    EditIcon,
  },
  methods: {
    Edit () {
      // console.log('Edit')
      // this.$emit('refresh-data', 1)
      console.log(this)
    },
    ShowSuccessMessage ({ title, text }) {
      this.$vs.notify({
        iconPack: 'feather',
        icon: 'icon-check',
        color: 'success',
        title,
        text
      })
    },
    ShowErrorMessage ({ title, text }) {
      this.$vs.notify({
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger',
        title,
        text
      })
    },
  }
}
</script>
