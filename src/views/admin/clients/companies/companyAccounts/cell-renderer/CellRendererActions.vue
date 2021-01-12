<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <edit-icon
      size="1.3x"
      class="hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-companies-company-accounts-edit', params: { user_id: params.data._id } })"
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
        text: 'You will not be able to recover this DID!',
        accept: this.Delete,
        acceptText: 'Delete'
      })
    },
    Delete () {
      this.$store.dispatch("user/Delete", this.params.data._id)
      .then(() => {
        this.params.data.refreshData()
        this.ShowSuccessMessage({
          title: 'User Deleted',
          text: 'The selected User was successfully deleted'
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
