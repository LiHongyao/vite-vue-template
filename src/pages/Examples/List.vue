<script setup lang="ts">
// -- imports
import { onMounted, reactive } from "vue";
import AppHeader from "@/components/@lgs/AppHeader/AppHeader.vue";
import NoData from "@/components/@lgs/NoData/NoData.vue";
import { apiExamples } from "@/api/apiServer";
import Tools from "@likg/tools";

interface StateProps extends API.ListProps<API.RecordItemProps[] | null> {}

// -- state
const state = reactive<StateProps>({
  page: 1,
  data: null,
  type: "refresh",
  isRefreshing: false,
  isLoading: false,
  isFinished: false,
});

// -- constants
const statusColors = ["#FF7E26", "#39C83E", "#FF2A2A"];
const statusText = ["处理中", "提现成功", "提现失败"];
const env = Tools.getEnv();

// -- methods
const getDataSource = async () => {
  const resp = await apiExamples.records({
    current: state.page,
    pageSize: 20,
  });
  const { current, pages, data } = resp.data;
  // 处理数据
  if (state.type === "refresh" || state.data === null) {
    state.data = data;
    state.isRefreshing = false;
  } else {
    state.data = [...state.data!, ...data];
    state.isLoading = false;
  }
  state.isFinished = current >= pages;
};
// -- events
const onRefresh = () => {
  state.page = 1;
  state.type = "refresh";
  setTimeout(() => {
    getDataSource();
  }, 1000);
};
const onLoad = () => {
  state.page += 1;
  state.type = "load";
  setTimeout(() => {
    getDataSource();
  }, 1000);
};

onMounted(() => {
  getDataSource();
});
</script>

<template>
  <div class="page px-10">
    <app-header
      v-if="env !== 'weixin'"
      title="提现记录"
      :showBack="true"
      :show-status-bar="false"
    />
    <van-pull-refresh v-model="state.isRefreshing" @refresh="onRefresh">
      <template v-if="state.data">
        <van-list
          v-model:loading="state.isLoading"
          finished-text="没有更多了~"
          :finished="state.isFinished"
          :offset="50"
          :immediate-check="false"
          @load="onLoad"
        >
          <template v-if="state.data.length > 0">
            <div
              class="item"
              v-for="(item, index) in state.data"
              :key="index"
              :data="item"
            >
              <div>
                <div class="mb-8 ff-DIN-Bold">¥&nbsp;{{ item.amount }}</div>
                <div class="color-686868">{{ item.withdrawTime }}</div>
              </div>
              <div :style="{ color: statusColors[item.paymentStatus] }">
                {{ statusText[item.paymentStatus] }}
              </div>
            </div>
          </template>
          <no-data v-else />
        </van-list>
      </template>
      <van-loading v-else color="#FF5E33" vertical>加载中...</van-loading>
    </van-pull-refresh>
  </div>
</template>

<style lang="less" scoped>
.van-pull-refresh {
  min-height: 600px;
}
.van-loading {
  margin-top: 120px;
}
.item {
  height: 63px;
  background-color: #fff;
  margin-top: 6px;
  border-radius: 6px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 10px;
  line-height: 14px;
}
</style>
