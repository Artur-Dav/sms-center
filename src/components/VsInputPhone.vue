<template>
  <div id="phone-container" class="country-code" v-if="is_fetched">
    <vue-country-code
      class="country-code__dropdown"
      :disabledFetchingCountry="true"
      :defaultCountry="numberObj.iso2"
      @onSelect="SetCountryCode"
    />
    <span ref="phone-code" class="phone-code">{{ phone_code }}</span>
    <vs-input
      ref="phone-input"
      v-validate="'required'"
      data-vv-validate-on="input"
      name="phone"
      :class="{'is-danger': errors.has('phone')}"
      type="text"
      label="Phone"
      :value="numberObj.number"
      @input="Input"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('phone') }}</span>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      countries: [],
      phone_code: null,
      phone: null,
      is_fetched: false
    }
  },
  computed: {
    numberObj () {
      const finded_country = this.countries.find(country => this.value.indexOf(country.phone_code) === 0)
      return finded_country ? {
        code: finded_country.phone_code,
        iso2: finded_country.iso2,
        number: this.value.slice(finded_country.phone_code.length)
      } : {
        code: this.phone_code && this.phone_code.slice(1),
        iso2: null,
        number: this.value
      }
    }
  },
  async created () {
    const { total } = await this.$store.dispatch('country/GetList', { page: 0, per_page: 0 })
    const { items } = await this.$store.dispatch('country/GetList', { page: 0, per_page: total })
    this.countries = items.map(this.TransformCountry)
    this.is_fetched = true
  },
  updated () {
    if (this.$refs['phone-input'].$el.children[1].children[0].classList.contains('normal')) {
      this.$refs['phone-input'].$el.children[1].children[0].classList.remove('normal')
    }
  },
  methods: {
    Input (e) {
      this.$emit('input', `${this.numberObj.code}${e}`)
    },
    SetCountryCode (e) {
      this.phone_code = `+${e.dialCode}`
      const padding_left = (String(e.dialCode).length * 8) + 61
      this.$refs['phone-input'].$el.children[1].children[0].style.paddingLeft = `${padding_left}px`
    },

    // Transform functions
    TransformCountry (item) {
      return {
        phone_code: item.phone_code,
        iso2: item.iso2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#phone-container.country-code {
  position: relative;

  .country-code__dropdown {
    position: absolute;
    top: 25px;
    left: 3px;
    z-index: 100;
    border: none;
    background: transparent;
    box-shadow: none;

    > div:hover {
      background-color: transparent;
    }
  }
  .phone-code {
    position: absolute;
    top: 30px;
    left: 48px;
    z-index: 1000;
  }
}
</style>