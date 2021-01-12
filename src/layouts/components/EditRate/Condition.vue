<template>
  <div class="condition">
    <div class="vertical-line" :style="{ height: tail + 'px' }"></div>
    <div class="body">
      <div class="condition-icon">
        <svg class="svg-condition" viewBox="0 0 30 30" version="1.1">
          <path
            d="M21.4696919,6.01274052 L8.50140056,6.01274052 C6.57070028,6.01274052 5,7.56586589 5,9.47489504 L5,17.3839913 C5,19.2930204 6.57070028,20.8460904 8.50140056,20.8460904 L16.7615126,20.8461458 L20.7156303,24.7558251 C20.8496359,24.8883819 21.0286835,24.9586764 21.2109804,24.9586764 C21.3011765,24.9586764 21.3921569,24.9413936 21.4787675,24.9058863 C21.7404482,24.7987551 21.9110924,24.5463819 21.9110924,24.2662566 L21.9110924,20.8187259 C23.6342857,20.6035219 24.9710924,19.1452303 24.9710924,17.3839913 L24.9710924,9.47489504 C24.9710924,7.56586589 23.4003922,6.01274052 21.4696919,6.01274052 Z M23.5705322,17.3840466 C23.5705322,18.5294752 22.6281232,19.4613061 21.4696919,19.4613061 L21.2108123,19.4613061 C20.8240896,19.4613061 20.5105322,19.7713994 20.5105322,20.1537259 L20.5105322,22.5945889 L17.5467787,19.664102 C17.4154622,19.5342041 17.237423,19.4613061 17.0515966,19.4613061 L8.50140056,19.4613061 C7.34296919,19.4613061 6.40056022,18.5294752 6.40056022,17.3840466 L6.40056022,9.47495044 C6.40056022,8.32952187 7.34296919,7.39769096 8.50140056,7.39769096 L21.4696919,7.39769096 C22.6281232,7.39769096 23.5705322,8.32952187 23.5705322,9.47495044 L23.5705322,17.3840466 Z M20.1396078,10.915793 L9.83148459,10.915793 C9.4447619,10.915793 9.13120448,11.2257755 9.13120448,11.6082128 C9.13120448,11.9905948 9.4447619,12.3006327 9.83148459,12.3006327 L20.1396078,12.3006327 C20.5263305,12.3006327 20.839888,11.9905948 20.839888,11.6082128 C20.839888,11.2257755 20.5263866,10.915793 20.1396078,10.915793 Z M20.1396078,14.793344 L9.83148459,14.793344 C9.4447619,14.793344 9.13120448,15.1033265 9.13120448,15.4857638 C9.13120448,15.8682012 9.4447619,16.1781837 9.83148459,16.1781837 L20.1396078,16.1781837 C20.5263305,16.1781837 20.839888,15.8681458 20.839888,15.4857638 C20.839888,15.1033819 20.5263866,14.793344 20.1396078,14.793344 Z"
            id="path-1"
          ></path>
        </svg>
      </div>
      <div class="condition-form">
        <primary-select
          type="text"
          name="condition"
          class="select"
          v-validate="'required'"
          v-model="condition.condition"
        >
          <option v-for="(val, k) in conditions" :key="k">{{val}}</option>
        </primary-select>
      </div>
      <div class="close-btn">
        <svg class="svg-close" viewBox="0 0 30 30" version="1.1" @click="removeSelf">
          <g transform="rotate(45) translate(6, -15)">
            <path
              d="M14.9776692,5 C9.47601504,5 5,9.47593985 5,14.977594 C5,20.4792481 9.47593985,24.955188 14.977594,24.955188 C20.4792481,24.955188 24.9551128,20.4792481 24.9551128,14.977594 C24.9551128,9.47593985 20.4793233,5 14.9776692,5 Z M14.9776692,23.8273684 C10.0978195,23.8273684 6.12781955,19.8574436 6.12781955,14.977594 C6.12781955,10.0977444 10.0978195,6.12781955 14.9776692,6.12781955 C19.8573684,6.12781955 23.8273684,10.0978195 23.8273684,14.977594 C23.8273684,19.8573684 19.8573684,23.8273684 14.9776692,23.8273684 Z M18.4926901,14.3550877 L15.7499108,14.3550877 L15.7499108,11.6578947 C15.7499108,11.2944737 15.4504601,11 15.0808967,11 C14.7113333,11 14.4118826,11.2944737 14.4118826,11.6578947 L14.4118826,14.3550877 L11.6690141,14.3550877 C11.2994507,14.3550877 11,14.6495614 11,15.0129825 C11,15.3764035 11.2994507,15.6708772 11.6690141,15.6708772 L14.4117934,15.6708772 L14.4117934,18.3681579 C14.4117934,18.7315789 14.7112441,19.0260526 15.0808075,19.0260526 C15.4503709,19.0260526 15.7498216,18.7315789 15.7498216,18.3681579 L15.7498216,15.6708772 L18.4926009,15.6708772 C18.8621643,15.6708772 19.161615,15.3764035 19.161615,15.0129825 C19.161615,14.6495614 18.8621643,14.3550877 18.4926901,14.3550877 Z"
              id="path-1"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <div class="branching">
      <div class="branch yes-branch">
        <div class="vertical-line"></div>
        <div class="main">
          <div class="horizontal-part">
            <div class="horizontal-line left"></div>
            <div class="icon yes-icon">yes</div>
            <div class="horizontal-line right"></div>
          </div>
          <div
            class="content"
            :class="{ 'empty': !condition.condition_yes.action && !condition.condition_yes.condition }"
          >
            <action
              v-if="condition.condition_yes.action"
              :action="condition.condition_yes.action"
              :tail="0"
              @removeAction="onRemoveAction('condition_yes')"
            ></action>
            <condition
              v-if="condition.condition_yes.condition"
              :condition="condition.condition_yes.condition"
              :tail="condition.condition_yes.action ? 30 : 0"
              @removeCondition="onRemoveCondition('condition_yes')"
            ></condition>
            <add-action-or-condition
              v-else
              @addAction="onAddAction('condition_yes')"
              @addCondition="onAddCondition('condition_yes')"
              :tail="condition.condition_yes.action ? 30.5 : 0"
            ></add-action-or-condition>
          </div>
        </div>
      </div>
      <div class="branch no-branch">
        <div class="main">
          <div class="horizontal-part">
            <div class="horizontal-line left"></div>
            <div class="icon no-icon">no</div>
            <div class="horizontal-line right"></div>
          </div>
          <div
            class="content"
            :class="{ 'empty': !condition.condition_no.action && !condition.condition_no.condition }"
          >
            <action
              v-if="condition.condition_no.action"
              :action="condition.condition_no.action"
              :tail="0"
              @removeAction="onRemoveAction('condition_no')"
            ></action>
            <condition
              v-if="condition.condition_no.condition"
              :condition="condition.condition_no.condition"
              :tail="condition.condition_no.action ? 30 : 0"
              @removeCondition="onRemoveCondition('condition_no')"
            ></condition>
            <add-action-or-condition
              v-else
              @addAction="onAddAction('condition_no')"
              @addCondition="onAddCondition('condition_no')"
              :tail="condition.condition_no.action ? 30.5 : 0"
            ></add-action-or-condition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    PrimarySelect: () => import("@/components/Inputs/PrimarySelect.vue"),
    AddActionOrCondition: () =>
      import("@/components/EditRate/AddActionOrCondition.vue"),
    Action: () => import("@/components/EditRate/Action.vue"),
    Condition: () => import("@/components/EditRate/Condition.vue")
  },
  props: {
    tail: Number,
    condition: {
      condition: String,
      condition_yes: {
        action: Object,
        condition: Object
      },
      condition_no: {
        action: Object,
        condition: Object
      }
    }
  },
  data: function() {
    return {
      conditions: [
        "response received",
        "call answered"
        ]
    };
  },
  methods: {
    removeSelf: function() {
      this.$emit("removeCondition");
    },
    onAddAction: function(branch) {
      if (this.condition[branch].action) return;

      this.condition[branch].action = {
        action: null,
        call_date_time: null,
        delay_before_action: null
      };
    },
    onAddCondition: function(branch) {
      if (this.condition[branch].condition || !this.condition[branch].action) return;

      let reAction;

      switch (this.condition[branch].action.action) {
        case 'at work text':
          reAction = {
            action: 're-send at work text',
            delay_before_action: null
          };
          break;
        case 'schedule call':
          reAction = {
            action: 'text re-schedule call'
          };
          break;
        default:
          reAction = null;
          break;
      }

      this.condition[branch].condition = {
        condition: null,
        condition_yes: {
          action: null,
          condition: null
        },
        condition_no: {
          action: reAction,
          condition: null
        }
      };
    },
    onRemoveAction: function(branch) {
      this.condition[branch].action = null;
    },
    onRemoveCondition: function(branch) {
      this.condition[branch].condition = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.condition {
  display: inline-flex;
  flex-direction: column;
  & > .vertical-line {
    width: 0;
    border-left: 2px solid #bdbfd8;
    margin-left: 19px;
  }
  .body {
    display: inline-flex;
    .condition-icon {
      height: 60px;
      width: 40px;
      border-radius: 30px;
      background-color: #55616e;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      text-align: center;
      padding: 15px 0;
      .svg-condition {
        width: 30px;
        height: 30px;
        fill: #ffffff;
      }
    }
    .condition-form {
      margin-left: 25px;
      .select {
        width: 300px;
      }
    }
    .close-btn {
      display: inline-flex;
      padding-top: 20px;
      margin-left: 10px;
      align-items: center;
      .svg-close {
        width: 30px;
        height: 30px;
        fill: #55616e;
        cursor: pointer;
      }
    }
  }
  .branching {
    display: inline-flex;
    flex-direction: column;
    margin-left: 19px;
    .branch {
      display: inline-flex;
      flex-direction: column;
      .vertical-line {
        width: 0;
        height: 50px;
        border-left: 2px solid #bdbfd8;
      }
      .main {
        display: inline-flex;
        .horizontal-part {
          display: inline-flex;
          .horizontal-line {
            height: 0;
            border-top: 2px solid #bdbfd8;
          }
          .horizontal-line.left {
            width: 10px;
          }
          .horizontal-line.right {
            width: 25px;
          }
          .icon {
            display: inline-flex;
            position: relative;
            top: -13px;
            height: 30px;
            width: 60px;
            border-radius: 125px;
            background-color: #24e2b8;
            text-transform: uppercase;
            color: #ffffff;
            font-family: "Helvetica Neue";
            font-size: 15px;
            font-weight: 500;
            line-height: 18px;
            align-items: center;
            justify-content: center;
          }
          .icon.yes-icon {
            background-color: #24e2b8;
          }
          .icon.no-icon {
            background-color: #d2305b;
          }
        }
        .content {
          display: inline-flex;
          flex-direction: column;
          position: relative;
          top: -28px;
        }
        .content.empty {
          display: inline-flex;
          flex-direction: column;
          position: relative;
          top: -19px;
        }
      }
    }
    .branch.yes-branch {
      & > .main {
        border-left: 2px solid #bdbfd8;
        & > .content {
          padding-bottom: 30px;
        }
      }
    }
    .branch.no-branch {
      .main {
        .horizontal-part {
          .horizontal-line.left {
            width: 12px;
          }
        }
      }
    }
  }
}
</style>

