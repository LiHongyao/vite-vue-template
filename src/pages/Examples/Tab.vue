<script setup lang="ts">
import { reactive,  watchEffect } from 'vue';
import AppHeader from 'comps/@lgs/AppHeader/AppHeader.vue';
import NoData from '@/components/@lgs/NoData/NoData.vue';
import FriendsItem from './FriendsItem.vue';
import { apiExamples } from "@/api/apiServer";
import Tools from '@likg/tools';

// -- props
interface TabProps extends API.ListProps<API.FriendsItemProps[] | null> {
  queryFriendType: number; // 查询好友的类型 1, 直邀 2, 间接
}

interface StateProps {
  friendsDirect: TabProps;
  friendsIndirect: TabProps;
  active: number;
}

type TabKeyType = 'friendsDirect' | 'friendsIndirect';

// -- state
const state = reactive<StateProps>({
  friendsDirect: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: 'refresh',
    queryFriendType: 1,
  },
  friendsIndirect: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: 'refresh',
    queryFriendType: 2,
  },
  active: 0,
});

// -- constants
// 1. 微信环境 无导航栏
// 2. 非微信环境 有导航栏
const env = Tools.getEnv();
const showStatusBar = false;

// -- methods
const getDataSource = async (key: TabKeyType) => {
  try {
    const resp = await apiExamples.friends({
      current: state[key].page,
      pageSize: 10,
      queryFriendType: state[key].queryFriendType,
    });
    const { current, pages, data } = resp.data;
    // 处理数据
    if (state[key].type === 'refresh' || state[key].data === null) {
      state[key].data = data;
      state[key].isRefreshing = false;
    } else {
      state[key].data = [...state[key].data!, ...data];
      state[key].isLoading = false;
    }
    state[key].isFinished = current >= pages;
  } catch (error) {
    console.log(error);
  }
};

// -- events
const onRefresh = (key: TabKeyType) => {
  state[key].page = 1;
  state[key].type = 'refresh';
  setTimeout(() => {
    getDataSource(key);
  }, 1000);
};
const onLoad = (key: TabKeyType) => {
  state[key].page += 1;
  state[key].type = 'load';
  setTimeout(() => {
    getDataSource(key);
  }, 1000);
};

// -- watchEffects
watchEffect(() => {
  switch (state.active) {
    case 0:
      state['friendsDirect'].data === null && getDataSource('friendsDirect');
      break;
    case 1:
      state['friendsIndirect'].data === null &&
        getDataSource('friendsIndirect');
      break;
  }
});
</script>

<template>
  <div class="page">
    <!-- 导航栏 -->
    <app-header
      v-if="env !== 'weixin'"
      title="我的好友 16"
      :showBack="true"
      :show-status-bar="showStatusBar"
    />
    <!-- 内容 -->
    <van-tabs v-model:active="state.active" color="#ff5e33" swipeable>
      <van-tab title="直接好友 1">
        <van-pull-refresh
          v-model="state.friendsDirect.isRefreshing"
          @refresh="onRefresh('friendsDirect')"
        >
          <template v-if="state.friendsDirect.data">
            <van-list
              v-model:loading="state.friendsDirect.isLoading"
              finished-text="没有更多了~"
              :finished="state.friendsDirect.isFinished"
              :offset="50"
              :immediate-check="false"
              @load="onLoad('friendsDirect')"
            >
              <template v-if="state.friendsDirect.data.length > 0">
                <FriendsItem
                  v-for="(item, index) in state.friendsDirect.data"
                  :key="index"
                  :data="item"
                />
              </template>
              <no-data v-else />
            </van-list>
          </template>
          <van-loading v-else color="#FF5E33" vertical>加载中...</van-loading>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="间接好友 15">
        <van-pull-refresh
          v-model="state.friendsIndirect.isRefreshing"
          @refresh="onRefresh('friendsIndirect')"
        >
          <template v-if="state.friendsIndirect.data">
            <van-list
              v-model:loading="state.friendsIndirect.isLoading"
              finished-text="没有更多了~"
              :finished="state.friendsIndirect.isFinished"
              :offset="50"
              :immediate-check="false"
              @load="onLoad('friendsIndirect')"
            >
              <template v-if="state.friendsIndirect.data.length > 0">
                <FriendsItem
                  v-for="(item, index) in state.friendsIndirect.data"
                  :key="index"
                  :data="item"
                />
              </template>
              <no-data v-else />
            </van-list>
          </template>
          <van-loading v-else color="#FF5E33" vertical>加载中...</van-loading>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
:deep(.van-tabs__wrap) {
  height: 50px;
  position: fixed;
  left: 0;
  z-index: 999;
  width: 100%;
}
:deep(.van-tabs__content) {
  margin-top: 50px;
}
.van-loading {
  margin-top: 120px;
}
</style>
