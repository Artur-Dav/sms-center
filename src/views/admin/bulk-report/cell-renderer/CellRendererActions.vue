<template>
  <div class="flex items-center h-100" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <play-circle-icon
      v-if="status === 'Hold'"
      size="1.3x"
      class="ml-4 hover:text-primary cursor-pointer"
      @click="ChangeStatus('Run')"
    />
    <stop-circle-icon
      v-if="status === 'Running'"
      size="1.3x"
      class="ml-4 hover:text-primary cursor-pointer"
      @click="ChangeStatus('Hold')"
    />
  </div>
</template>

<script>
import { PlayCircleIcon, StopCircleIcon } from 'vue-feather-icons'

export default {
  name: 'CellRendererActions',
  components: {
    PlayCircleIcon,
    StopCircleIcon,
  },
  computed: {
    status () {
      return this.params.data.status
    }
  },
  methods: {
    ChangeStatus (action) {
      this.$vs.loading()
      this.$store.dispatch(`bulk/${action}`, this.params.data.bulk_uuid)
      .then(() => {
        this.ShowSuccessMessage({ title: 'Success', text: `Bulk status has been changed` })
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
