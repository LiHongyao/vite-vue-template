export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
    },
    "postcss-pxtorem": {
      // -- Vant 官方根字体大小是 37.5
      rootValue: 37.5,
      propList: ["*"],
      // -- 过滤掉.norem-开头的class，不进行rem转换
      selectorBlackList: [".norem"],
    },
  },
};
