<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <edit-icon
      size="1.3x"
      class="hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-users-edit', params: { id: params.data.user_id } })"
    />
    <trash-2-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="ConfirmDelete"
    />
  </div>
</template>

<script>
import { EditIcon, Trash2Icon } from 'vue-feather-icons'

export default {
  name: 'CellRendererActions',
  components: {
    EditIcon,
    Trash2Icon
  },
  methods: {
    ConfirmDelete () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure?',
        text: 'You will not be able to recover this User!',
        accept: this.Delete,
        acceptText: 'Delete'
      })
    },
    Delete () {
      this.$store.dispatch("vendor/Delete", this.params.data.user_id)
      .then(() => {
        this.params.data.refreshData()
        this.ShowSuccessMessage({
          title: 'Vendor Deleted',
          text: 'The selected Vendor was successfully deleted'
        })
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
    },

    // Notify
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
    }
  }
}
</script>
