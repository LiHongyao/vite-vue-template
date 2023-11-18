<script setup lang="ts">
// -- imports
import { showToast } from "vant";
import { onMounted, reactive } from "vue";
import { apiExamples } from "@/api/apiServer";

// -- define props
interface SignInItemProps {
  label: string /** 第x天 */;
  value: number /** 值（送多少金币） */;
  status: boolean /** 签到状态 */;
}

interface StateProps {
  isRefreshing: boolean;
  signIn: SignInItemProps[];
  taskConfigs: API.TaskResponseProps | null;
}

// -- state
const state = reactive<StateProps>({
  isRefreshing: false,
  signIn: [
    { label: "第1天", value: 30, status: true },
    { label: "第2天", value: 30, status: true },
    { label: "第3天", value: 30, status: false },
    { label: "第4天", value: 30, status: false },
    { label: "第5天", value: 30, status: false },
    { label: "第6天", value: 30, status: false },
    { label: "第7天", value: 30, status: false },
  ],
  taskConfigs: null,
});

// ==> methods
const getTaskConfigs = async () => {
  try {
    const resp = await apiExamples.task();
    state.taskConfigs = resp.data;
  } catch (error) {
    console.log(error);
  }
};
// ==> events
const onRefresh = () => {
  setTimeout(() => {
    state.isRefreshing = false;
  }, 500);
};
const onSignIn = () => {
  showToast("签到成功");
};
// ==> life circles
onMounted(() => {
  getTaskConfigs();
});
</script>

<template>
  <div class="tab-page px-12">
    <van-pull-refresh v-model="state.isRefreshing" @refresh="onRefresh">
      <!-- 我的金币 -->
      <div class="pt-36 px-17 flex-h-between">
        <div class="color-FFFFFF">
          <div class="f14 lh-20 f-400">我的金币</div>
          <div class="flex-h-start">
            <span class="f30 lh-40 f-600 ff-DIN-Bold mr-8">1093100</span>
            <div
              class="py-3 px-11 border rounded-10 flex-h-start"
              style="border-color: #ffffff50; background: #ffffff20"
              @click="$router.push('/examples/gold-coin-withdraw')"
            >
              <span class="f14 color-FFFFFF lh-20 mr-3">提现</span>
              <img
                class="icon-arrow-right"
                src="@/assets/images/icon_arrow_right_1.png"
              />
            </div>
          </div>
          <div class="f11 lh-15" style="color: #ffffff66">约&nbsp;109.31元</div>
        </div>
        <img class="icon-gold" src="@/assets/images/icon_gold_shadow.png" />
      </div>
      <!-- 签到 -->
      <div class="mt-18 bg-FFFFFF rounded-10 p-16">
        <div class="flex-h-between">
          <div
            class="sign-in-item f10 lh-14 flex-v-center rounded-4"
            :class="{ checked: !!item.status }"
            v-for="(item, index) in state.signIn"
            :key="index"
          >
            <div class="">{{ item.label }}</div>
            <div class="value icon-26x26 flex-h-center mt-7 color-FFFFFF">
              {{ item.value }}
            </div>
          </div>
        </div>
        <div
          class="sign-in-button f16 flex-h-center color-FFFFFF mx-auto mt-21"
          @click="onSignIn"
        >
          立即签到
        </div>
      </div>
      <!-- 多多福宝 -->
      <div class="pt-11 px-12 pb-21 bg-FFFFFF rounded-10 mt-15">
        <div class="title f16 lh-23 f-600 position-relative">
          <div class="position-relative zIndex-1">多多福宝</div>
          <div class="bar" />
        </div>
        <div class="flex-h-between mt-13">
          <div class="ddfb-item" data-v="2381元"></div>
          <div class="ddfb-item" data-v="15:00开抢"></div>
          <div class="ddfb-item" data-v="幸运转盘"></div>
        </div>
      </div>
      <!-- 基础任务 -->
      <div
        v-if="state.taskConfigs"
        class="pt-11 px-12 pb-21 bg-FFFFFF rounded-10 mt-15"
      >
        <div class="title f16 lh-23 f-600 position-relative mb-18">
          <div class="position-relative zIndex-1">基础任务</div>
          <div class="bar" />
        </div>
        <!-- 视频赚金币 -->
        <div class="flex-h-between mb-26">
          <img class="icon-41x41 flex-shrink" src="@/assets/images/task_1.png" />
          <div class="flex-1 mx-10">
            <div class="f15 f-600 lh-21 color-555555 flex-h-start mb-3">
              <span>视频赚金币</span>
              <span class="ml-7 mr-5" style="color: #fc3230">+50</span>
              <img class="icon-15x15" src="@/assets/images/icon_gold_coin.png" />
            </div>
            <div class="f12 lh-17">
              <span class="mr-6" style="color: #a2a2a2">
                {{ state.taskConfigs.videoSubTitle }}</span
              >
              <span style="color: #ffa9a9"
                >0/ {{ state.taskConfigs.videoCount }}</span
              >
            </div>
          </div>
          <div class="action-button flex-h-center f12 color-FFFFFF rounded-20">
            去观看
          </div>
        </div>
        <!-- 邀请好友 -->
        <div class="flex-h-between mb-26">
          <img class="icon-41x41 flex-shrink" src="@/assets/images/task_2.png" />
          <div class="flex-1 mx-10">
            <div class="f15 f-600 lh-21 color-555555 flex-h-start mb-3">
              <span>邀请好友</span>
              <span class="ml-7 mr-5" style="color: #fc3230">+50</span>
              <img class="icon-15x15" src="@/assets/images/icon_gold_coin.png" />
            </div>
            <div class="f12 lh-17" style="color: #a2a2a2">
              {{ state.taskConfigs.inviteSubTitle }}
            </div>
          </div>
          <div class="action-button flex-h-center f12 color-FFFFFF rounded-20">
            去邀请
          </div>
        </div>
        <!-- 每日宝箱 -->
        <div class="flex-h-between">
          <img class="icon-41x41 flex-shrink" src="@/assets/images/task_3.png" />
          <div class="flex-1 mx-10">
            <div class="f15 f-600 lh-21 color-555555 flex-h-start mb-3">
              <span>每日宝箱</span>
              <span class="ml-7" style="color: #fc3230">最高奖188元</span>
            </div>
            <div class="f12 lh-17" style="color: #a2a2a2">
              {{ state.taskConfigs.treasureSubTitle }}
            </div>
          </div>
          <div
            class="action-button flex-h-center f12 color-FFFFFF rounded-20"
            :class="{ disabled: !!state.taskConfigs.treasureStatus }"
          >
            开宝箱
          </div>
        </div>
      </div>
      <!-- 运营位置 -->
      <div
        class="mt-15 rounded-10 flex-h-center f13 lh-66"
        style="background: #dadada; color: #41414150"
      >
        运营位置
      </div>
      <!-- 占位 -->
      <div class="space-50"></div>
      <div style="height: 3000px"></div>
    </van-pull-refresh>
  </div>
</template>

<!-- 脚本文件 -->

<!-- 样式文件 -->
<style lang="less" scoped>
.tab-page {
  background: linear-gradient(
    to bottom,
    #fd2e3e 15%,
    #f4f4f4 50%,
    #f4f4f4 100%
  );
}
.icon-arrow-right {
  width: 5px;
  height: 7px;
}
.icon-gold {
  width: 63px;
  height: 72px;
}
.sign-in-item {
  width: 40px;
  height: 59px;
  color: #575757;
  background: #f6f6f6;
  &.checked {
    color: #ffffff;
    background: #ff737e;
  }
  .value {
    background: url("@/assets/images/sign_in_bg.png") no-repeat center center;
    background-size: cover;
  }
}
.sign-in-button {
  width: 188px;
  height: 40px;
  background: linear-gradient(90deg, #fb8523 0%, #ff5a40 100%);
  border-radius: 20px;
}
.title .bar {
  display: block;
  width: 64px;
  height: 7px;
  background: linear-gradient(270deg, #fffbe9 0%, #fef3bd 100%);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.ddfb-item {
  width: 100px;
  height: 114px;
  background-size: 100% 100% !important;
  position: relative;
  &::after {
    content: attr(data-v);
    display: block;
    width: 100%;
    text-align: center;
    font-size: 9px;
    line-height: 13px;
    color: #fd323d;
    font-family: PingFangSC-Medium, PingFang SC;
    position: absolute;
    top: 3px;
  }
  &:nth-child(1) {
    background: url("@/assets/images/ddfb_1.png");
  }
  &:nth-child(2) {
    background: url("@/assets/images/ddfb_2.png");
  }
  &:nth-child(3) {
    background: url("@/assets/images/ddfb_3.png");
  }
}
.action-button {
  width: 74px;
  height: 28px;
  background: linear-gradient(90deg, #fb8523 0%, #ff5a40 100%);
  &.disabled {
    opacity: 0.5;
  }
}
</style>
