<template>
  <div class="env-tips">
    <img class="icon-info" src="./IconTips.png" />
    <h4 class="tips">请在微信或支付宝客户端打开链接</h4>
  </div>
</template>

<style scoped="scoped" lang="less">
.env-tips {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  text-align: center;
  padding-top: 100px;
  .icon-info {
    width: 64px;
    height: 64px;
  }
  .tips {
    margin-top: 30px;
    font-weight: 400;
    font-size: 20px;
  }
}
</style>
