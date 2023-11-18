

<script setup lang="ts">

withDefaults(
  defineProps<{
    tips?: string;
    top?: number;
  }>(),
  {
    top: 50,
  }
);
</script>

<template>
  <div class="no-data" :style="{ paddingTop: top + 'px' }">
    <img src="./images/no-data__3.png" alt="" />
    <p v-if="!!tips" class="tips">{{ tips }}</p>
  </div>
</template>

<style scoped="scoped" lang="less">
.no-data {
  text-align: center;
  img {
    width: 151.66px;
  }
  .tips {
    font-size: 16px;
    text-align: center;
    color: #c9c9c9;
  }
}
</style>
