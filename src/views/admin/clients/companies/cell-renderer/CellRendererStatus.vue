<template>
  <div class="status-field flex items-center h-100">
    <div
      class="status cursor-pointer"
      :class="params.data.status ? 'active' : 'inactive'"
      @click="ChangeStatus"
    ></div>
    <div class="field">{{ params.data.company_name }}</div>
  </div>
</template>

<script>
export default {
  methods: {
    ChangeStatus () {
      const payload = {
        id: this.params.data.company_uuid,
        data: { is_active: !this.params.data.status }
      }

      this.$vs.loading()
      this.$store.dispatch('company/Edit', payload)
      .then(res => {
        if (res.success) {
          this.params.data.refreshData()
          this.ShowSuccessMessage({ title: 'Success', text: 'Company status has been changed' })
        }
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
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
