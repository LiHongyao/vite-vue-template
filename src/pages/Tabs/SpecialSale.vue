<script setup lang="ts">
// -- imports
import { ref } from 'vue';
import AppHeader from 'comps/@lgs/AppHeader/AppHeader.vue';
import Tools from '@likg/tools';

// -- constants
const env = ref(Tools.getEnv());
</script>

<template>
  <div class="tab-page">
    <!-- 导航栏 -->
    <app-header v-if="env !== 'weixin'" title="特卖" :showStatusBar="false" />
    <!-- 按钮  -->
    <div class="pt-100 flex-h-center f12">
      <div
        class="button flex-h-center mr-20"
        @click="$router.push('/examples/list')"
      >
        LIST PAGE
      </div>
      <div class="button flex-h-center" @click="$router.push('/examples/tab')">
        TAB PAGE
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.button {
  width: 100px;
  height: 30px;
  background: orangered;
  color: #fff;
  border-radius: 6px;
}
</style>
