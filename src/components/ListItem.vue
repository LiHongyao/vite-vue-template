<script setup lang="ts">
// ==> props
withDefaults(defineProps<{ data?: API.ListItemProps }>(), {
  data: () => ({} as API.ListItemProps),
});
</script>

<template>
  <div class="pl-25 pr-22">
    <div class="pt-19 pb-13 border-bottom" style="border-color: #97979720">
      <!-- 内容 -->
      <div class="flex-h-between mb-11">
        <div class="flex-1">
          <div class="flex-h-start">
            <div class="f15 f-500 mr-14 lh-20" style="color: #414141">
              {{ data.title }}
            </div>
            <div v-if="data.status === 1" class="status flex-h-center">提现成功</div>
            <div v-if="data.status === 0" class="status flex-h-center fail">提现失败</div>
          </div>
          <div class="f13 lh-19 mt-3" style="color: #929292">
            {{ data.date }}
          </div>
        </div>
        <div class="flex-h-start">
          <span class="f21 f-500 ff-DIN-Bold" style="color: #606060">-{{ data.count }}</span>
          <img class="icon-15x15 ml-5" src="@/assets/images/icon_gold_coin.png" />
        </div>
      </div>
      <!-- 失败原因 -->
      <div v-if="data.status === 0" class="fail-msg">{{ data.failMsg }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.status {
  width: 50px;
  height: 17px;
  border-radius: 3px;
  border: 1px solid #66c328;
  font-size: 10px;
  font-weight: 400;
  color: #3bc226;
  &.fail {
    color: #df5359;
    border-color: #df5359;
  }
}
.fail-msg {
  background: #f9f9f9;
  border-radius: 3px;
  padding: 7px 11px 9px 7px;
  font-size: 11px;
  font-weight: 400;
  color: #c1c1c1;
  line-height: 15px;
}
</style>
