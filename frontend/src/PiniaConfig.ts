import { createPinia } from 'pinia';
import { watch } from 'vue';

import { taskSeeder } from '@/stores/taskseeder';
import { goalSeeder } from '@/stores/goalseeder';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (!parsed.auth) {
        parsed.auth = { registeredUsers: [] };
      }
      if (!parsed.goal) {
        parsed.goal = { goals: goalSeeder };
      }
      pinia.state.value = parsed;
    } else {
      pinia.state.value = {
        task: { tasks: taskSeeder },
        goal: { goals: goalSeeder },
        user: { user: null },
        auth: { registeredUsers: [] },
      };

      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}