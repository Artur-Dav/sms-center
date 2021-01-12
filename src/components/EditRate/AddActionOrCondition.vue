<template>
    <div class="add-action-or-condition">
        <div class="vertical-line" :style="{ height: tail + 'px' }"></div>
        <div class="body">
            <div class="plus-icon">
                <svg class="svg-plus" width="30px" height="30px" viewBox="0 0 30 30" version="1.1">
                    <path d="M14.9776692,5 C9.47601504,5 5,9.47593985 5,14.977594 C5,20.4792481 9.47593985,24.955188 14.977594,24.955188 C20.4792481,24.955188 24.9551128,20.4792481 24.9551128,14.977594 C24.9551128,9.47593985 20.4793233,5 14.9776692,5 Z M14.9776692,23.8273684 C10.0978195,23.8273684 6.12781955,19.8574436 6.12781955,14.977594 C6.12781955,10.0977444 10.0978195,6.12781955 14.9776692,6.12781955 C19.8573684,6.12781955 23.8273684,10.0978195 23.8273684,14.977594 C23.8273684,19.8573684 19.8573684,23.8273684 14.9776692,23.8273684 Z M18.4926901,14.3550877 L15.7499108,14.3550877 L15.7499108,11.6578947 C15.7499108,11.2944737 15.4504601,11 15.0808967,11 C14.7113333,11 14.4118826,11.2944737 14.4118826,11.6578947 L14.4118826,14.3550877 L11.6690141,14.3550877 C11.2994507,14.3550877 11,14.6495614 11,15.0129825 C11,15.3764035 11.2994507,15.6708772 11.6690141,15.6708772 L14.4117934,15.6708772 L14.4117934,18.3681579 C14.4117934,18.7315789 14.7112441,19.0260526 15.0808075,19.0260526 C15.4503709,19.0260526 15.7498216,18.7315789 15.7498216,18.3681579 L15.7498216,15.6708772 L18.4926009,15.6708772 C18.8621643,15.6708772 19.161615,15.3764035 19.161615,15.0129825 C19.161615,14.6495614 18.8621643,14.3550877 18.4926901,14.3550877 Z" id="path-1"></path>
                </svg>
            </div>
            <div class="buttons-wrapper">
                <secondary-button class="add-action-btn" @click.native="addAction">Add Action</secondary-button>
                <secondary-button class="add-condition-btn" @click.native="addCondition">Add Condition</secondary-button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    components: {
      SecondaryButton: () => import('@/components/Buttons/SecondaryButton.vue')
    },
    props: {
      tail: Number
    },
    methods: {
      addAction: function () {
        this.$emit('addAction');
      },
      addCondition: function () {
        this.$emit('addCondition');
      }
    }
  };
</script>

<style lang="scss" scoped>
    .add-action-or-condition {
        .vertical-line {
            width: 0;
            border-left: 2px solid #BDBFD8;
            margin-left: 19px;
        }
        .body {
            display: inline-flex;
            .plus-icon {
                box-sizing: border-box;
                height: 41px;
                width: 41px;
                border: 1px solid #24e2b8;
                border-radius: 30px;
                background-color: #ffffff;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                .svg-plus {
                    fill: #24e2b8;
                    margin: 4px;
                }
            }
            .buttons-wrapper {
                display: inline-flex;
                align-items: center;
                width: fit-content;
                margin-left: 24.5px;
                .add-action-btn {
                    height: 40px;
                    width: 118px;
                    border: 1px solid #24e2a5;
                    color: #24e2a5;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 18px;
                    text-align: center;
                }
                .add-condition-btn {
                    height: 40px;
                    width: 140px;
                    border: 1px solid #24e2a5;
                    color: #24e2a5;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 18px;
                    text-align: center;
                    margin-left: 10px;
                }
            }
        }
    }
</style>
