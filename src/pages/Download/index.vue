<script setup lang="ts">
// -- imports
import Tools from '@likg/tools';
import { showToast } from 'vant';
import { reactive, toRefs } from 'vue';

// -- interfaces
interface StateProps {
  platform: 'ios' | 'android' | 'weixin' | 'alipay' | 'unknown';
  ani: string;
}

// -- state
const state = reactive<StateProps>({
  platform: Tools.getEnv(),
  ani: '',
});

// -- events
const onDownload = () => {
  switch (state.platform) {
    case 'ios':
      showToast('暂未开放');
      // window.location.href = 'Download url for iOS.';
      break;
    case 'android':
      showToast('暂未开放');
      // window.location.href = 'Download url for Android.';
      break;
    case 'weixin':
      state.ani = 'ani';
      setTimeout(() => {
        state.ani = '';
      }, 1000);
      break;
    case 'unknown':
      break;
  }
};
const onOpenApp = () => {
  showToast('暂未开放');
  // window.location.href = "APP's Scheme Address.";
};

const { platform, ani } = toRefs(state);
</script>

<template>
  <div class="page">
    <!-- 底图 -->
    <img src="./images/bg.png" />
    <!-- 内容区域 -- 定位 -->
    <div class="wrap">
      <img src="./images/icon_logo.png" class="icon-70x70" />
      <div class="platform">
        <img
          v-if="platform === 'android'"
          src="./images/icon_android.png"
          class="icon-env"
        />
        <img
          v-if="platform === 'ios'"
          src="./images/icon_ios.png"
          class="icon-env"
        />
        <span class="app-name">多多汇宝</span>
      </div>
      <div class="download-button" @click="onDownload">点击安装</div>
      <div v-if="platform !== 'weixin'" class="open-tips" @click="onOpenApp">
        已安装?立即打开
      </div>
    </div>
    <!-- 空白符：如果背景图片没有撑起页面高度，则需要占位容器，占位容器背景和背景图最底部的色值保持一致 -->
    <div class="space flex-1" style="background: rgba(244, 197, 60)"></div>
    <!-- 微信环境文案提示 -->
    <img
      :class="`tips ${platform === 'weixin' ? 'show' : ''} ${ani}`"
      src="./images/tips.png"
    />
  </div>
</template>

<style lang="less" scoped>
@keyframes debounce {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

.page {
  position: relative;
  .wrap {
    position: absolute;
    top: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .platform {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .icon-env {
    width: 12px;
    height: 15px;
    margin-right: 5px;
  }
  .app-name {
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
    color: #ffffff;
  }
  .download-button {
    width: 211px;
    height: 40px;
    background: #ffffff;
    margin-top: 17px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    border-radius: 22px;
    color: #333333;
    font-size: 15px;
  }
  .open-tips {
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
    line-height: 21px;
    color: #fb4545;
  }
  .tips {
    display: none;
    width: 160px;
    position: absolute;
    right: 6px;
    top: 0;
    &.show {
      display: block;
    }
    &.ani {
      animation: debounce 1s;
    }
  }
}
</style>
