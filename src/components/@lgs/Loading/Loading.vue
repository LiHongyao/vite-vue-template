<template>
  <div class="lg-loading" :style="{ paddingTop: `${top}px` }">
    <div class="lg-loading__ct">
      <img class="lg-loading__logo" src="./images/logo.png" />
      <div class="lg-loading__border"></div>
    </div>
    <div v-if="showTips" class="lg-loading__tips">{{ tips }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tips?: string;
    showTips?: boolean;
    top?: number;
  }>(),
  {
    tips: '数据加载中...',
    showTips: true,
    top: 100,
  }
);
</script>

<style lang="less" scoped>
.lg-loading {
  text-align: center;
  &__ct {
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__logo {
    width: 22px;
    height: 22px;
  }
  &__border {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url('./images/border.png') center center no-repeat;
    background-size: contain;
    -webkit-animation: rotate 1s linear infinite;
    animation: rotate 1s linear infinite;
  }
  &__tips {
    font-size: 12px;
    margin-top: 12px;
    letter-spacing: 1px;
    color: #999999;
  }
  @keyframes rotate {
    to {
      transform: rotateZ(360deg);
    }
  }
  @-webkit-keyframes rotate {
    to {
      -webkit-transform: rotateZ(360deg);
    }
  }
}
</style>
