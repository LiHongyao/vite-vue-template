import { defineStore } from 'pinia';

interface StoreProps {
  count: number;
}

interface ActionProps {
  increment: () => void;
  decrement: () => void;
}

export const useStore = defineStore<string, StoreProps, any, ActionProps>(
  'appStore',
  {
    state: () => ({ count: 0 }),
    actions: {
      async increment() {},
      async decrement() {},
    },
  }
);