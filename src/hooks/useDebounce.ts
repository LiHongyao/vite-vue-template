/*
 * @Author: Li-HONGYAO
 * @Date: 2021-06-29 22:16:55
 * @LastEditors: Li-HONGYAO
 * @LastEditTime: 2021-06-29 22:17:55
 * @Description:
 */
export default function useDebounce<T extends Function>(fn: T, delay = 200): T {
  if (delay <= 0) return fn;

  let timer: ReturnType<typeof setTimeout> | undefined;

  function wrapper(this: any, ...args: any[]) {
    const exec = () => {
      timer = undefined;
      return fn.apply(this, args);
    };
    // 如果已经存在时间回调，重新刷新定时器
    if (timer) clearTimeout(timer);

    timer = setTimeout(exec, delay);
  }

  return wrapper as any as T;
}
