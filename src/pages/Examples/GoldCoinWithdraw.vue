<script setup lang="ts">
import { reactive } from 'vue';
import AppHeader from 'comps/@lgs/AppHeader/AppHeader.vue';
import Tools from '@likg/tools';
interface ConfigProps {
  desc: string;
  amounts: {
    feeRate: number /** 手续费 */;
    money: number /** 提现金额 */;
  }[];
}
interface StateProps {
  config: ConfigProps;
  selectedIndex: number;
  showDialog: boolean;
}
// -- state
const state = reactive<StateProps>({
  selectedIndex: 0,
  showDialog: false,
  config: {
    amounts: [
      { feeRate: 1, money: 0.01 },
      { feeRate: 1, money: 5 },
      { feeRate: 1, money: 20 },
      { feeRate: 1, money: 50 },
    ],
    desc: `
        <div>1.10000金币可兑换1元</div>
        <div>2.每人每天只能提现一次</div>
        <div>3.提现将在3个工作日内审核到账，节假日不处理审批</div>
        `,
  },
});

// -- constants
const env = Tools.getEnv();

// -- events
const onSubmit = () => {
  state.showDialog = true;
};
</script>

<template>
  <div class="page">
    <!-- 导航栏 -->
    <app-header
      v-if="env !== 'weixin'"
      title="金币提现"
      rightButtonText="金币明细"
      @rightButtonTap="$router.push('/examples/gold-coin-details')"
      :showBack="true"
      :show-status-bar="false"
    />
    <!-- 内容 -->
    <div class="mt-14 bg-FFFFFF px-17 pt-16 pb-35">
      <!-- 金币余额 -->
      <div
        class="flex-h-start pb-21 border-bottom"
        style="border-color: #eeeeee"
        @click="$router.push('/examples/gold-coin-details')"
      >
        <img
          class="icon-60x60 flex-shrink mr-16"
          src="@/assets/images/icon_gold.png"
        />
        <div>
          <div class="f13 lh-20 mb-10" style="color: #00000050">
            金币余额 1093100
          </div>
          <div class="flex-h-start lh-20" style="color: #ff6634">
            <span class="f25 ff-DIN-Bold">109.31</span>
            <span class="f16 ml-3">元</span>
          </div>
        </div>
      </div>
      <!-- 提现方式 -->
      <div class="mt-17 pb-14 border-bottom" style="border-color: #97979720">
        <div class="f14 lh-20 mb-13">提现方式</div>
        <div class="flex-h-between">
          <div class="pay-type-button px-16 flex-h-start">
            <img class="icon-20x20 mr-10" src="@/assets/images/icon_alipay.png" />
            <span class="flex-1">支付宝</span>
            <img class="icon-12x12" src="@/assets/images/icon_checked.png" />
          </div>
          <div class="pay-type-button px-16 flex-h-start">
            <img class="icon-weixin mr-10" src="@/assets/images/icon_weixin.png" />
            <span class="flex-1">微信钱包</span>
            <img class="icon-12x12" src="@/assets/images/icon_checked.png" />
          </div>
        </div>
        <div class="mt-19 flex-h-between">
          <div class="f14 lh-20">
            <span class="mr-8">支付宝账号</span>
            <span style="color: #3174eb">未绑定</span>
          </div>
          <div class="bind-button f12 flex-h-center lh-17">绑定账号</div>
        </div>
      </div>
      <!-- 提现金额 -->
      <div class="mt-18">
        <div class="f14 lh-20 mb-13">提现方式</div>
        <div class="amount-list">
          <div
            v-for="(item, index) in state.config.amounts"
            class="item"
            @click="state.selectedIndex = index"
            :key="index"
            :class="{ checked: state.selectedIndex === index }"
          >
            <span class="ff-DIN-Bold">{{ item.money }}</span>
            <span class="f-400">元</span>
          </div>
        </div>
      </div>
      <!-- 提现按钮 -->
      <div class="withdraw-button rounded-25 flex-h-center" @click="onSubmit">
        立即提现
      </div>
      <!-- 提现说明 -->
      <div class="f14 lh-20 mb-13">提现方式</div>
      <div
        v-html="state.config.desc"
        class="f11 lh-16"
        style="color: #9e9e9e"
      ></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pay-type-button {
  width: 162px;
  height: 45px;
  background: #f8f8f8;
  border-radius: 9px;
  border: 1px solid #e0e0e0;
  font-size: 15px;
  font-weight: 600;
  .icon-weixin {
    width: 20px;
    height: 16px;
  }
}
.bind-button {
  width: 70px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #939393;
}

.amount-list {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  .item {
    height: 45px;
    border-radius: 9px;
    border: 1px solid #e0e0e0;
    flex: 0 0 calc((100% - 2 * 10px) / 3);

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;
    font-weight: 600;
    &.checked {
      color: #ff6634;
      border-color: #ff6634;
    }
  }
  .item:not(:nth-child(3n)) {
    margin-right: 10px;
  }
  .item:not(:nth-last-child(-n + 3)) {
    margin-bottom: 10px;
  }
}
.withdraw-button {
  width: 277px;
  height: 50px;
  background: linear-gradient(90deg, #fb8523 0%, #ff5a40 100%);
  margin: 26px auto 31px;
  font-size: 16px;
  color: #fff;
}
</style>
