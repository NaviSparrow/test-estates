import { customRef } from 'vue';

export default function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>;

  return customRef((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue: T) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        value = newValue;
        trigger();
      }, delay);
    },
  }));
}
