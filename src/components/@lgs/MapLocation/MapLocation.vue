<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

export interface MapChangeDataProps {
  cityname: string;
  lat: number;
  lng: number;
  poiaddress: string;
  poiname: string;
}

interface IProps {
  visible: boolean;
  mapKey: string;
  referer: string;
}

withDefaults(defineProps<IProps>(), {
  visible: false,
});

const emits = defineEmits<{
  (e: "change", data: MapChangeDataProps): void;
}>();

const onMapConfirm = (event: any) => {
  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
  var loc = event.data;
  if (loc && loc.module == "locationPicker") {
    // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
    const {
      cityname,
      poiaddress,
      poiname,
      latlng: { lat, lng },
    } = loc;
    emits("change", { cityname, poiaddress, poiname, lat, lng });
  }
};
onMounted(() => {
  window.addEventListener("message", onMapConfirm, false);
});
onUnmounted(() => {
  window.removeEventListener("message", onMapConfirm, false);
});
</script>

<template>
  <div class="map" :class="visible ? 'visible' : ''">
    <iframe
      class="map__iframe"
      frameborder="0"
      :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${mapKey}&referer=myapp`"
    />
  </div>
</template>

<style lang="less" scoped>
.map {
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: -1;
  opacity: 0;
  transition: all 0.25s linear;
  background-color: rgba(0, 0, 0, 0.65);
  &.visible {
    z-index: 999;
    opacity: 1;
  }
  &__iframe {
    width: 100%;
    height: 90%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
