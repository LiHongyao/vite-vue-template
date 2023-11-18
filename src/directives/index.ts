import type { App } from 'vue';

export default (app: App) => {
  // -- 图片懒加载
  app.directive('img', {
    beforeMount(el, binding) {
      let url = binding.value;
      let image = new Image();
      image.onload = function () {
        if (image.width > 1) {
          el.setAttribute('src', url);
        }
      };
      image.src = url;
    },
  });
  // -- 百度统计
  app.directive('track', {
    beforeMount(el, binding) {
      el.onclick = function () {
        if (window._hmt) {
          window._hmt.push(['_trackEvent', binding.value, 'click']);
        }
      };
    },
  });
  
};
