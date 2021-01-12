<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <eye-icon
      size="1.3x"
      class="hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-reseller-transaction-history', params: { id: params.data.reseller_uuid } })"
    />
    <plus-circle-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-reseller-invoice-history', params: { id: params.data.reseller_uuid } })"
    />
    <dollar-sign-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="Edit"
    />
    <edit-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="Edit"
    />
    <trash-2-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="ConfirmDelete"
    />
  </div>
</template>

<script>
import { EyeIcon, PlusCircleIcon, DollarSignIcon, EditIcon, Trash2Icon } from 'vue-feather-icons'

export default {
  name: 'CellRendererActions',
  components: {
    EyeIcon,
    PlusCircleIcon,
    DollarSignIcon,
    EditIcon,
    Trash2Icon
  },
  methods: {
    Edit () {
      // console.log('Edit')
      // this.$emit('refresh-data', 1)
      console.log(this)
    },
    ConfirmDelete () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure?',
        text: 'You will not be able to recover this Reseller!',
        accept: this.Delete,
        acceptText: 'Delete'
      })
    },
    Delete () {
      this.$store.dispatch("reseller/Delete", this.params.data.reseller_uuid)
      .then(() => {
        this.ShowSuccessMessage({
          title: 'Reseller Deleted',
          text: 'The selected Reseller was successfully deleted'
        })
      })
      .catch(err => {
        this.ShowErrorMessage({ title: 'Error', text: err })
      })
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
