import { ref } from 'vue';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string | VNode;
  type: ToastType;
  duration: number;
  elapsed: number;
}

const toasts = ref<Toast[]>([]);
let idCounter = 0;

export function useToast() {
  const addToast = (
    message: string | VNode,
    type: ToastType = 'info',
    duration = 2500,
  ) => {
    const id = idCounter++;

    if (type === 'info' || type === 'success') {
      const matchingToasts = toasts.value.filter((t) => t.type === type);
      if (matchingToasts.length >= 3) {
        const oldest = matchingToasts[0];
        toasts.value = toasts.value.filter((t) => t.id !== oldest.id);
      }
    }

    toasts.value.push({ id, message, type, duration, elapsed: 0 });

    const interval = setInterval(() => {
      const toast = toasts.value.find((t) => t.id === id);
      if (!toast) return;

      toast.elapsed += 10;

      if (toast.elapsed >= duration) {
        clearInterval(interval);
        toasts.value = toasts.value.filter((t) => t.id !== id);
      }
    }, 10);
  };

  return { toasts, addToast };
}
