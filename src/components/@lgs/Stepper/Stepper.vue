<!--
 * @Author: Lee
 * @Date: 2021-11-16 19:33:27
 * @LastEditors: Lee
 * @LastEditTime: 2021-11-27 17:30:17
-->
<template>
  <div class="stepper">
    <section
      v-show="!modelValue || +modelValue === 1"
      class="stepper__item stepper__minus stepper__disabled"
    />
    <section
      v-show="+modelValue > 1"
      class="stepper__item stepper__minus"
      @click="emits('update:model-value', +modelValue - 1)"
    />

    <input
      class="stepper__item stepper__input"
      :min="min"
      :max="max"
      type="number"
      :value="modelValue"
      @change="onChange"
    />

    <section
      v-show="modelValue >= max"
      class="stepper__item stepper__plus stepper__disabled"
    />
    <section
      v-show="modelValue < max"
      class="stepper__item stepper__plus"
      @click="emits('update:model-value', +modelValue + 1)"
    />
  </div>
</template>

<script setup lang="ts">
// ==> props
withDefaults(
  defineProps<{
    modelValue: number | string;
    min?: number | string;
    max?: number | string;
  }>(),
  {
    modelValue: '',
    min: 1,
    max: 10,
  }
);
// ==> emits
const emits = defineEmits<{
  (e: 'update:model-value', value: number | string): void;
}>();

const onChange = (e: Event) => {
  const inp = e.target as HTMLInputElement;
  emits('update:model-value', inp.value);
};
</script>

<style scoped="scoped" lang="less">
.stepper {
  display: flex;
  align-items: center;

  &__item {
    width: 50px;
    height: 30px;
    background-color: #ffe9d9;
    position: relative;
    font-size: 16px;
  }
  &__minus::before,
  &__plus::before {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #ff7e26;
    font-weight: bold;
  }
  &__minus::before {
    content: '-';
  }
  &__disabled {
    background: #f3f3f3;
  }
  &__plus::before {
    content: '+';
  }
  &__input {
    background-color: #f3f3f3;
    text-align: center;
    margin: 0 4px;
    border-radius: 3px;
    color: #686868;
    font-weight: 600;
    font-size: 10px;
  }
}
</style>
