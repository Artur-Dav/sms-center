<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <template v-if="status === 'null'">
      <thumbs-up-icon
        size="1.3x"
        class="text-success cursor-pointer hover:fill-success"
        @click="ChangeStatus('Approve')"
      />
      <thumbs-down-icon
        size="1.3x"
        class="ml-3 text-danger cursor-pointer hover:fill-danger"
        @click="ChangeStatus('Reject')"
      />
    </template>
    <thumbs-up-icon
      v-else-if="status === 'approved'"
      size="1.3x"
      class="ml-4 text-success fill-success"
    />
    <thumbs-down-icon
      v-else
      size="1.3x"
      class="ml-4 text-danger fill-danger"
    />
  </div>
</template>

<script>
import { ThumbsUpIcon, ThumbsDownIcon } from 'vue-feather-icons'

export default {
  name: 'CellRendererActions',
  components: {
    ThumbsUpIcon,
    ThumbsDownIcon,
  },
  computed: {
    status () {
      return this.params.data.status
    }
  },
  methods: {
    ChangeStatus (status) {
      this.$vs.loading()
      this.$store.dispatch(`smsTemplate/${status}`, this.params.data.sms_template_uuid)
      .then(() => {
        this.ShowSuccessMessage({ title: 'Success', text: `Template has been ${status === 'Approve' ? 'approved' : 'rejected'}` })
        this.params.data.refreshData()
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
    },
  }
}
</script>
