<script setup lang="ts">
import { reactive, toRefs, watchEffect } from "vue";
import AppHeader from "comps/@lgs/AppHeader/AppHeader.vue";
import NoData from "comps/@lgs/NoData/NoData.vue";
import Item from "comps/ListItem.vue";
import { apiExamples } from "@/api/apiServer";
import Tools from "@likg/tools";

interface TabProps extends API.ListProps<any[] | null> {
  queryType: number; // 查询类型 1-金币收入 2-好友贡献 3-金币支出
}
interface StateProps {
  active: number;
  incomeTab: TabProps;
  spendingTab: TabProps;
  contributionTab: TabProps;
}
type TabKeyType = "incomeTab" | "spendingTab" | "contributionTab";

// state
const state = reactive<StateProps>({
  active: 0,
  incomeTab: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: "refresh",
    queryType: 1,
  },
  spendingTab: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: "refresh",
    queryType: 1,
  },
  contributionTab: {
    page: 1,
    data: null,
    isRefreshing: false,
    isLoading: false,
    isFinished: false,
    type: "refresh",
    queryType: 1,
  },
});

// constants
const env = Tools.getEnv();
const pageCls = (() => {
  if (env === "weixin") {
    return "weixin-page";
  }
  return "";
})();

// methods
const getDataSource = async (key: TabKeyType) => {
  try {
    const resp = await apiExamples.goldCoins({
      current: state[key].page,
      pageSize: 20,
    });
    const { current, pages, data } = resp.data;
    // 处理数据
    if (state[key].type === "refresh" || state[key].data === null) {
      state[key].data = data;
      state[key].isRefreshing = false;
    } else {
      state[key].data = [...state[key].data!, ...data];
      state[key].isLoading = false;
    }
    state[key].isFinished = current >= pages;
  } catch (error) {}
};
// watchEffects
watchEffect(() => {
  switch (state.active) {
    case 0:
      state["incomeTab"].data === null && getDataSource("incomeTab");
      break;
    case 1:
      state["contributionTab"].data === null &&
        getDataSource("contributionTab");
      break;
    case 2:
      state["spendingTab"].data === null && getDataSource("spendingTab");
      break;
  }
});
// events
const onRefresh = (key: TabKeyType) => {
  state[key].page = 1;
  state[key].type = "refresh";
  setTimeout(() => {
    getDataSource(key);
  }, 1000);
};
const onLoad = (key: TabKeyType) => {
  state[key].page += 1;
  state[key].type = "load";
  setTimeout(() => {
    getDataSource(key);
  }, 1000);
};
const { active, incomeTab, spendingTab, contributionTab } = toRefs(state);
</script>

<template>
  <div :class="['page', pageCls]">
    <!-- 渐变层 -->
    <div class="gradient"></div>
    <!-- 导航栏 -->
    <app-header
      v-if="env !== 'weixin'"
      title="金币明细"
      theme="light"
      backgroundColor="transparent"
      :showBack="true"
      :show-status-bar="false"
    />
    <!-- 内容 -->
    <div class="contents">
      <van-tabs v-model:active="active" sticky offset-top="100px">
        <van-tab title="金币收入">
          <div class="wrap">
            <van-pull-refresh
              v-model="incomeTab.isRefreshing"
              @refresh="onRefresh('incomeTab')"
            >
              <template v-if="incomeTab.data">
                <van-list
                  v-model:loading="incomeTab.isLoading"
                  finished-text="没有更多了~"
                  :finished="incomeTab.isFinished"
                  :offset="50"
                  :immediate-check="false"
                  @load="onLoad('incomeTab')"
                >
                  <template v-if="incomeTab.data.length > 0">
                    <Item
                      v-for="(item, index) in incomeTab.data"
                      :key="index"
                      :data="item"
                    />
                  </template>
                  <no-data tips="没有更多啦~" v-else />
                </van-list>
              </template>
              <van-loading v-else vertical>加载中...</van-loading>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="好友贡献">
          <van-pull-refresh
            v-model="contributionTab.isRefreshing"
            @refresh="onRefresh('contributionTab')"
          >
            <template v-if="contributionTab.data">
              <van-list
                v-model:loading="contributionTab.isLoading"
                finished-text="没有更多了~"
                :finished="contributionTab.isFinished"
                :offset="50"
                :immediate-check="false"
                @load="onLoad('contributionTab')"
              >
                <template v-if="contributionTab.data.length > 0">
                  <Item
                    v-for="(item, index) in contributionTab.data"
                    :key="index"
                    :data="item"
                  />
                </template>
                <no-data tips="没有更多啦~" v-else />
              </van-list>
            </template>
            <van-loading v-else vertical>加载中...</van-loading>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="金币支出">
          <van-pull-refresh
            v-model="spendingTab.isRefreshing"
            @refresh="onRefresh('spendingTab')"
          >
            <template v-if="spendingTab.data">
              <van-list
                v-model:loading="spendingTab.isLoading"
                finished-text="没有更多了~"
                :finished="spendingTab.isFinished"
                :offset="50"
                :immediate-check="false"
                @load="onLoad('spendingTab')"
              >
                <template v-if="spendingTab.data.length > 0">
                  <Item
                    v-for="(item, index) in spendingTab.data"
                    :key="index"
                    :data="item"
                  />
                </template>
                <no-data tips="没有更多啦~" v-else />
              </van-list>
            </template>
            <van-loading v-else vertical>加载中...</van-loading>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 渐变层
.gradient {
  height: 159px;
  background: linear-gradient(180deg, #4fb4ed 0%, rgba(77, 219, 216, 0) 100%);
}
// 内容
.contents {
  width: calc(100% - 24px);
  margin: -100px auto 0;
  height: calc(100vh - 159px + 100px - 20px);

  background-color: #fff;
  border-radius: 10px;
  overflow: scroll;
}

:deep(.van-tabs) {
  .van-tabs__wrap {
    height: 50px;
    position: fixed;
    top: 59px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    width: calc(100% - 24px);

    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #97979720;
  }
  .van-tab__text {
    font-size: 15px;
    color: #00000050;
  }
  .van-tab--active .van-tab__text {
    color: #000000;
  }
  .van-tabs__line {
    width: 61px;
    height: 2px;
    background-color: #4fb4ec;
  }
  .van-tabs__content {
    margin-top: 50px;
  }
}

.weixin-page {
  .contents {
    margin: -139px auto 0;
    // 容器高度 - 渐变层高度 + 往上移动的高度 - 距离底部的间距
    height: calc(100vh - 159px + 139px - 20px);
  }
  :deep(.van-tabs__wrap) {
    top: 20px;
  }
}
</style>
