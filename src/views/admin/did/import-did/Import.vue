<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Import"
          >Import DID</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div slot="no-body" class="upload-form">
        <div class="upload-form__item first">
          <smsc-col>
            <smsc-col-item>
              <label class="vs-input--label">Method</label>
              <v-select
                v-validate="'required'"
                data-vv-validate-on="input"
                name="method"
                :class="{'is-danger': errors.has('method')}"
                label="name"
                :options="methods"
                v-model="selected.method"
                placeholder="Select Method"
                @input="payload.command = $event && $event.value"
              />
              <span class="text-danger text-xs">{{ errors.first('method') }}</span>
            </smsc-col-item>
            <smsc-col-item>
              <label class="vs-input--label">Error</label>
              <v-select
                v-validate="'required'"
                data-vv-validate-on="input"
                name="error"
                :class="{'is-danger': errors.has('error')}"
                label="name"
                :options="error_types"
                v-model="selected.error"
                placeholder="Select Error"
                @input="payload.on_error = $event && $event.value"
              />
              <span class="text-danger text-xs">{{ errors.first('error') }}</span>
            </smsc-col-item>
            <smsc-col-item>
              <label class="vs-input--label">Duplicate Action</label>
              <v-select
                v-validate="'required'"
                data-vv-validate-on="input"
                name="duplicate action"
                :class="{'is-danger': errors.has('duplicate action')}"
                label="name"
                :options="duplicate_actions"
                v-model="selected.duplicate_action"
                placeholder="Select Duplicate Action"
                @input="payload.on_duplicate = $event && $event.value"
              />
              <span class="text-danger text-xs">{{ errors.first('duplicate action') }}</span>
            </smsc-col-item>
            <smsc-col-item>
              <label class="vs-input--label">Company</label>
              <v-select
                name="company"
                label="name"
                :options="companies"
                v-model="selected.company"
                placeholder="Select Company"
                @input="payload.company_uuid = $event && $event.value"
              />
            </smsc-col-item>
            <smsc-col-item>
              <label class="vs-input--label">Vendor</label>
              <v-select
                name="vendor"
                label="name"
                :options="vendors"
                v-model="selected.vendor"
                placeholder="Select Vendor"
                @input="payload.vendor_uuid = $event && $event.value"
              />
            </smsc-col-item>
            <smsc-col-item>
              <label class="vs-input--label">User</label>
              <v-select
                name="user"
                label="name"
                :options="users"
                v-model="selected.user"
                placeholder="Select User"
                @input="payload.user_uuid = $event && $event.value"
              />
            </smsc-col-item>
            <smsc-col-item>
              <label class="vs-input--label">Ani Group</label>
              <v-select
                name="ani group"
                label="name"
                :options="ani_groups"
                v-model="selected.ani_group"
                placeholder="Select Ani Group"
                @input="payload.ani_group_uuid = $event && $event.value"
              />
            </smsc-col-item>
          </smsc-col>
        </div>
        <div class="upload-form__item second">
          <vs-upload
            name="file"
            :class="{'is-danger': errors.has('file')}"
            text="Upload Single"
            :limit="1"
            :show-upload-button="false"
            action="https://httpbin.org/post"
            automatic
            fileName="file"
            @on-success="SuccessFile"
            @on-delete="DeleteFile"
            @change="ChangeFile"
          />
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
// Packages
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  data() {
    return {
      // Dropdowns
      methods: [
        { name: 'ANI', value: 'ani' },
        { name: 'DNIS', value: 'dnis' },
        { name: 'remove_from_group', value: 'remove_from_group' },
        { name: 'remove', value: 'remove' }
      ],
      error_types: [
        { name: 'Skip', value: 'skip' },
        { name: 'Abort', value: 'abort' }
      ],
      duplicate_actions: [
        { name: 'Skip', value: 'skip' },
        { name: 'Overwrite', value: 'overwrite' }
      ],
      companies: [],
      vendors: [],
      users: [],
      ani_groups: [],

      // Selected
      selected: {
        file: null
      },

      // Request body
      payload: {
        file: null,
        on_duplicate: null,
        on_error: null,
        command: null,
        vendor_uuid: null,
        user_uuid: null,
        company_uuid: null,
        ani_group_uuid: null
      },

      file_name: null
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    DataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
        u8arr[n] = bstr.charCodeAt(n)
      }
      
      return new File([u8arr], filename, { type: mime })
    },
    SuccessFile (e) {
      const base64 = JSON.parse(e.currentTarget.response).files.file
      this.payload.file = this.DataURLtoFile(base64, this.file_name)
    },
    ChangeFile (e) {
      this.errors.remove('file')

      const splited_file_name = e.split('\\')
      const len = splited_file_name.length
      this.file_name = splited_file_name[len - 1]
    },
    DeleteFile () {
      this.errors.remove('file')

      this.file_name = null
      this.payload.file = null
    },
    async Import () {
      if (!this.payload.file) {
        this.errors.add({
          field: 'file',
          msg: "The file is required",
        })
      }

      const valid = await this.$validator.validate()

      return

      if (!valid) {
        return
      }

      // Not required field
      if (!this.payload.company_uuid) {
        delete this.payload.company_uuid
      }
      if (!this.payload.vendor_uuid) {
        delete this.payload.vendor_uuid
      }
      if (!this.payload.user_uuid) {
        delete this.payload.user_uuid
      }
      if (!this.payload.ani_group_uuid) {
        delete this.payload.ani_group_uuid
      }

      this.$vs.loading()

      this.$store.dispatch('did/ImportDid', this.payload)
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-did-import-log' })
          this.ShowSuccessMessage({ title: 'Success', text: 'DID has been imported' })
        }
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })

      const { total: TotalForUser } = await this.$store.dispatch('user/GetList', { per_page: 0 })
      const p2 = await this.$store.dispatch('user/GetList', { per_page: TotalForUser, order_by: 'user_name', order_dir: 'asc' })

      const { total: TotalForVendor } = await this.$store.dispatch('vendor/GetList', { per_page: 0 })
      const p3 = await this.$store.dispatch('vendor/GetList', { per_page: TotalForVendor, order_by: 'vendor_name', order_dir: 'asc' })

      const { total: TotalForAniGroup } = await this.$store.dispatch('aniGroup/GetList', { per_page: 0 })
      const p4 = await this.$store.dispatch('aniGroup/GetList', { per_page: TotalForAniGroup, order_by: 'ani_group_name', order_dir: 'asc' })

      Promise.all([p1, p2, p3, p4])
      .then(res => {
        this.companies = res[0].items.map(this.TransformCompany)
        this.users = res[1].items.map(this.TransformUser)
        this.vendors = res[2].items.map(this.TransformVendor)
        this.ani_groups = res[3].items.map(this.TransformAniGroup)
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

    // Transform functions
    TransformCompany(item) {
      return {
        name: item.company_name,
        value: item.company_uuid
      }
    },
    TransformUser(item) {
      return {
        name: item.user_name,
        value: item.user_id
      }
    },
    TransformVendor(item) {
      return {
        name: item.vendor_name,
        value: item.vendor_uuid
      }
    },
    TransformAniGroup(item) {
      return {
        name: item.ani_group_name,
        value: item.ani_group_uuid
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .upload-form__item {
    flex-grow: 1;
    min-width: 270px;
    padding: 10px;

    &.first {
      flex-basis: calc(100% - 270px);
    }
    &.second {
      flex-basis: 270px;
    }
  }
}
</style>
