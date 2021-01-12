<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <user-icon
      size="1.3x"
      class="hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-companies-company-accounts', params: { id: params.data.company_uuid } })"
    />
    <eye-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-companies-transaction-history', params: { id: params.data.company_uuid } })"
    />
    <plus-circle-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-companies-invoice-history', params: { id: params.data.company_uuid } })"
    />
    <dollar-sign-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-companies-payment-history', params: { id: params.data.company_uuid } })"
    />
    <edit-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="$router.push({ name: 'admin-companies-edit', params: { id: params.data.company_uuid } })"
    />
    <trash-2-icon
      size="1.3x"
      class="ml-3 hover:text-primary cursor-pointer"
      @click="ConfirmDelete"
    />
  </div>
</template>

<script>
import { UserIcon, EyeIcon, PlusCircleIcon, DollarSignIcon, EditIcon, Trash2Icon } from 'vue-feather-icons'

export default {
  name: 'CellRendererActions',
  components: {
    UserIcon,
    EyeIcon,
    PlusCircleIcon,
    DollarSignIcon,
    EditIcon,
    Trash2Icon
  },
  methods: {
    ConfirmDelete () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure?',
        text: 'You will not be able to recover this Company!',
        accept: this.Delete,
        acceptText: 'Delete'
      })
    },
    Delete () {
      this.$store.dispatch("company/Delete", this.params.data.company_uuid)
      .then(() => {
        this.params.data.refreshData()
        this.ShowSuccessMessage({
          title: 'Company Deleted',
          text: 'The selected Company was successfully deleted'
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
