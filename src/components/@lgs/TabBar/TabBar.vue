<script setup lang="ts">
export interface TabBarItemProps {
  path: string;
  text: string;
  iconPath: string;
  selectedIconPath: string;
}
defineProps({
  list: Array<TabBarItemProps>,
});
</script>
<template>
  <div class="tab-bar">
    <template v-for="(item) in list" :key="item.path">
      <router-link replace class="tab-bar-item" :to="item.path">
        <img
          :src="
            item.path === $route.path ? item.selectedIconPath : item.iconPath
          "
          class="icon"
          alt="{{item.text}}"
        />
        <span class="text">{{ item.text }}</span>
      </router-link>
    </template>
  </div>
</template>

<style lang="less" scoped>
.tab-bar {
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;

  height: calc(50px + env(safe-area-inset-bottom));
  display: flex;

  position: fixed;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 10000;
}

.tab-bar-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #b5b5b5;
  &.router-link-active {
    color: #ff7a23;
  }
}
.icon {
  width: 22px;
  height: 22px;
}
.text {
  margin-top: 1px;
  font-size: 10px;
  line-height: 14px;
}
</style>
