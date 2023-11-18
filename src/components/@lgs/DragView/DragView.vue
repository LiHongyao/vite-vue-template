<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';

interface StateProps {
  sw: number;
  sh: number;
  w: number;
  h: number;
  pos: { x: number; y: number };
  bc: { x: number; y: number };
}

interface OptionProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

// ==> props
const props = withDefaults(defineProps<{ options?: OptionProps }>(), {
  options: () => ({ bottom: 80, right: 15 }),
});

// ==> emits
const emits = defineEmits<{
  (e: 'tap'): void;
}>();

// ==> state
const state = reactive<StateProps>({
  sw: window.innerWidth,
  sh: window.innerHeight,
  w: 0,
  h: 0,
  pos: { x: 0, y: 0 },
  bc: { x: 0, y: 0 },
});
// ==> refs
const wrap = ref<HTMLDivElement>();

const onTouchMove = (e: TouchEvent) => {
  const touch = e.touches[0];
  let x = touch.clientX - state.w / 2;
  let y = touch.clientY - state.h / 2;

  // 处理边界
  if (x < 0) {
    x = 0;
  } else if (x > state.bc.x) {
    x = state.bc.x;
  }
  if (y < 0) {
    y = 0;
  } else if (y > state.bc.y) {
    y = state.bc.y;
  }
  // 更新位置
  state.pos = { x, y };

  e.stopPropagation();
  e.preventDefault();
};

// ==> life circles
onMounted(() => {
  // 1. 获取元素尺寸信息 & 设置可拖拽边界值
  const size = wrap.value!.getBoundingClientRect();
  state.w = size!.width || 0;
  state.h = size!.height || 0;
  state.bc = {
    x: state.sw - state.w,
    y: state.sh - state.h,
  };
  // 2. 获取用户设置的位置信息
  const { top, right, bottom, left } = props.options;
  // 3. 定义记录临时坐标，默认在右下侧
  const __pos = {
    x: state.sw - state.w,
    y: state.sh - state.h,
  };

  // 4. 单独判断并设置各方向的值
  if (top !== undefined) {
    __pos.y = top;
  }
  if (right !== undefined) {
    __pos.x = state.sw - right - state.w;
  }
  if (bottom !== undefined) {
    __pos.y = state.sh - bottom - state.h;
  }
  if (left !== undefined) {
    __pos.x = left;
  }
  // 同一方向，如果同时设置top、bottom值，则bottom值有效；
  if (top !== undefined && bottom !== undefined) {
    __pos.y = state.sh - bottom - state.h;
  }
  // 同一方向，如果同时设置left、right值，则right值有效；
  if (left !== undefined && right !== undefined) {
    __pos.x = state.w - right - state.w;
  }

  // 更新拖拽元素位置
  state.pos = { ...__pos };

  document.body.addEventListener('touchmove', (e) => e.preventDefault());
});

const { pos } = toRefs(state);
</script>

<template>
  <div
    class="lg-drag-view"
    ref="wrap"
    :style="{ top: `${pos.y}px`, left: `${pos.x}px` }"
    @touchmove="onTouchMove"
    @click="emits('tap')"
  >
    <slot />
  </div>
</template>

<style lang="less" scoped>
.lg-drag-view {
  position: fixed;
  z-index: 10000;
}
</style>
