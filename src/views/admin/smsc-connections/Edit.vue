<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save SMSC Connection</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <smsc-col>
        <smsc-col-item>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('username')}"
            name="username"
            type="text"
            label="User Name"
            placeholder="Enter username"
            v-model="payload.username"
          />
          <span class="text-danger text-xs">{{ errors.first('username') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('password')}"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            v-model="payload.password"
          />
          <span class="text-danger text-xs">{{ errors.first('password') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('smsc_id')}"
            name="smsc_id"
            type="text"
            label="SMSC ID"
            placeholder="Enter SMSC ID"
            v-model="payload.smsc_id"
          />
          <span class="text-danger text-xs">{{ errors.first('smsc_id') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <label class="vs-input--label">Type</label>
          <v-select
            v-validate="'required'"
            data-vv-validate-on="input"
            :class="{'is-danger': errors.has('type')}"
            name="type"
            :options="types"
            label="name"
            v-model="selected.type"
            @input="payload.type = $event && $event.value"
          />
          <span class="text-danger text-xs">{{ errors.first('type') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required|ip'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('ip')}"
            name="ip"
            type="text"
            label="IP"
            placeholder="Enter IP"
            v-model="payload.ip"
          />
          <span class="text-danger text-xs">{{ errors.first('ip') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required|integer|max:6'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('port')}"
            name="port"
            type="text"
            label="Port"
            placeholder="Enter port"
            v-model="payload.port"
          />
          <span class="text-danger text-xs">{{ errors.first('port') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            class="w-100"
            name="throughput"
            type="number"
            label="Throughput"
            placeholder="Enter throughput"
            v-model="payload.throughput"
          />
        </smsc-col-item>
      </smsc-col>
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
      types: [
        { name: 'smpp', value: 'smpp' },
        { name: 'fake', value: 'fake' },
        { name: 'http', value: 'http' },
        { name: 'loopback', value: 'cmpp' },
        { name: 'cmpp', value: 'loopback' }
      ],

      // Selects value
      selected: {
        type: null
      },

      // Item ID
      id: this.$route.params.id,

      // Request body
      payload: {}
    }
  },
  created () {
    this.FetchData()
  },
  methods: {
    SetSelectsValue (obj_array) {
      // { options: this.types, value: "http", to: 'type' }
      obj_array.forEach(obj => {
        this.selected[obj.to] = obj.options.find(item => item.value === obj.value)
      })
    },
    async FetchData() {
      this.$vs.loading()
      const p1 = await this.$store.dispatch('smscConnection/GetById', this.id)

      Promise.all([p1])
      .then(res => {
        // this.SetSelectsValue([{ options: this.types, value: 'fake', to: 'type' }])
        this.payload = this.TransformPayload(res[0].payload)
        this.selected = this.TransformSelected(res[0].payload)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async Edit() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      // These fields not required
      if (!this.payload.throughput) {
        delete this.payload.throughput
      }

      this.$vs.loading()
      this.$store.dispatch('smscConnection/Edit', { id: this.id, data: this.payload })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-smsc-connections-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'SMSC Connection has been edited' })
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
    },

    // Transform functions
    TransformPayload (payload) {
      return {
        username: payload.username,
        password: payload.password,
        smsc_id: payload.smsc_id,
        type: payload.type,
        ip: payload.ip,
        port: payload.port,
        throughput: payload.throughput
      }
    },
    TransformSelected (payload) {
      return {
        type: payload.type
      }
    }
  }
}
</script>