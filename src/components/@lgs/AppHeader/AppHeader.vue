<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import jsBridge from "@likg/js-bridge";

import IconBackButtonDark from "./images/back_btn_dark.png";
import IconBackButtonLight from "./images/back_btn_light.png";
import IconRefreshButtonDark from "./images/refresh_btn_dark.png";
import IconRefreshButtonLight from "./images/refresh_btn_light.png";

interface StateProps {
  height: string;
  opacity: number;
  innerBackgroundColor: string;
}

interface IProps {
  title?: string;
  type?: "APP" | "H5";
  theme?: "dark" | "light";
  showPlace?: boolean;
  showBack?: boolean;
  showStatusBar?: boolean;
  showRefresh?: boolean;
  rightButtonText?: string;
  backgroundColor?: string;
  gradientColor?: string;
  hideTitleInTop?: boolean;
  onBack?: () => void;
}
// ==> props
const props = withDefaults(defineProps<IProps>(), {
  type: "APP",
  theme: "dark",
  showPlace: false,
  showBack: false,
  showStatusBar: true,
  showRefresh: false,
  backgroundColor: "#FFFFFF",
  hideTitleInTop: false,
});

// ==> emits
const emits = defineEmits<{
  (e: "refreh"): void;
  (e: "rightButtonTap", data?: string): void;
}>();

const router = useRouter();
const isBangScreen = window && window.screen.height >= 812 && window.devicePixelRatio >= 2;
const state = reactive<StateProps>({
  height: props.showStatusBar ? (isBangScreen ? "88px" : "64px") : "44px",
  opacity: 0,
  innerBackgroundColor: props.gradientColor ? "transparent" : props.backgroundColor,
});

// ==> events
const onBackButtonTap = () => {
  if (router.currentRoute.value.query.appBack === "1") {
    jsBridge.nativeBack();
  } else {
    if (props.onBack) {
      props.onBack();
    } else {
      router.back();
    }
  }
};

window.addEventListener("scroll", (e) => {
  e = e || window.event;
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const target = 100;
  if (scrollTop < target) {
    state.opacity = scrollTop / target;
  } else {
    state.opacity = 1;
  }
});
// data
const { height, opacity, innerBackgroundColor } = toRefs(state);
</script>

<template>
  <div class="app-header">
    <!-- 占位元素 -->
    <div v-if="(!gradientColor && innerBackgroundColor !== 'transparent') || showPlace" class="app-header__place" :style="{ height }" />
    <!-- 内容 -->
    <div
      class="app-header__wrap"
      :style="{
        height,
        background: innerBackgroundColor,
        color: theme === 'dark' ? '#333333' : '#FFFFFF',
      }"
    >
      <div class="app-header__titleBar">
        <div class="app-header__leftButton">
          <div
            v-if="showBack"
            :class="`app-header__backButton ${type === 'APP' ? 'app' : 'h5'}`"
            :style="{
              background: `url(${theme === 'dark' ? IconBackButtonDark : IconBackButtonLight}) no-repeat 0 center`,
            }"
            @click="onBackButtonTap"
          />
        </div>
        <div
          class="app-header__title"
          :style="{
            opacity: hideTitleInTop ? opacity : 1,
          }"
        >
          {{ title }}
          <slot />
        </div>
        <div class="app-header__rightButton">
          <span v-if="rightButtonText" @click="emits('rightButtonTap')">{{ rightButtonText }}</span>
          <div
            v-if="showRefresh"
            :class="`app-header__refreshButton ${type === 'APP' ? 'app' : 'h5'}`"
            :style="{
              background: `url(${theme === 'dark' ? IconRefreshButtonDark : IconRefreshButtonLight}) no-repeat 100% center`,
            }"
            @click="emits('refreh')"
          />
          <slot name="right" />
        </div>
      </div>
      <!-- 渐变层 -->
      <div v-if="gradientColor" class="app-header__mask" :style="{ background: gradientColor, opacity }"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@titleBarHeight: 44px;
@padding: 16px;

.app-header {
  &__wrap {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
  &__titleBar {
    width: 100%;
    height: @titleBarHeight;
    position: relative;
  }

  &__leftButton {
    position: absolute;
    left: @padding;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  &__title {
    height: @titleBarHeight;
    text-align: center;
    max-width: 75%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__rightButton {
    display: flex;
    align-items: center;
    font-size: 14px;

    position: absolute;
    right: @padding;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  &__refreshButton,
  &__backButton {
    &.app {
      width: @titleBarHeight;
      height: @titleBarHeight;
      background-size: 20px 20px !important;
    }

    &.h5 {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15) !important;
      background-position: center center !important;
      background-size: 16px 16px !important;
    }
  }
  &__mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
  }
}
</style>
