<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon  size="1x" icon="UserIcon" svgClasses="h-5 w-5 mr-2 hover:text-primary cursor-pointer" @click="$router.push('/pages/setting').catch(() => {})"/>
      <zoom-in-icon  size="1.2x" svgClasses="w-3 h-5 hover:text-primary cursor-pointer" class ="ml-2" @click="$router.push('/admin/payment').catch(() => {})" />
      <dollar-sign-icon size="1.2x" svgClasses="w-5 h-5 hover:text-primary cursor-pointer" class="ml-2" @click="$router.push('/reseller/invoice').catch(() => {})"></dollar-sign-icon>
      <trending-up-icon size="1.2x" svgClasses="w-5 h-5 hover:text-primary cursor-pointer" class="ml-2" @click="$router.push('/admin/payment').catch(() => {})"></trending-up-icon>      
    </div>
</template>

<script>
import { DollarSignIcon, ZoomInIcon, TrendingUpIcon} from 'vue-feather-icons'
// import { ZoomInIcon } from 'vue-feather-icons'
// import { TrendingUpIcon } from 'vue-feather-icons'

export default {
  components: {
    ZoomInIcon,
    DollarSignIcon,
    TrendingUpIcon
  },
  name: 'CellRendererActions',  
  methods: {
    editRecord () {
      this.$router.push(`/apps/user/user-edit/${  268}`).catch(() => {})

      /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.params.data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
      //   .then(()   => { this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>
