<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base"    label="Top - UP" icon-no-border />
    
    <div class="">      
        <vs-row vs-w="12">
          <vs-col vs-offset="2" v-tooltip="'col - 8'" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
            <vs-radio v-model="radios1" vs-name="radios1" vs-value="p"><img src="@/assets/images/payment/paypal.png"></vs-radio>
            <vs-radio v-model="radios1" vs-name="radios1" vs-value="primery"><img src="@/assets/images/payment/stripe.png"></vs-radio>
            <vs-radio v-model="radios1" vs-name="radios1" vs-value="primery"><img src="@/assets/images/payment/coin.png"></vs-radio>
          </vs-col>
      </vs-row>      
    </div>    
    </vx-card>
</template>

<script>
export default {
  data () {
    return {      
      radios1:'primery'
    }
  }
}
</script>
