// Por Diego Chourio

// External imports
import { createPinia } from 'pinia';
import { watch } from 'vue';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedUser = localStorage.getItem('currentUser');

    pinia.state.value = {
      user: { user: savedUser ? JSON.parse(savedUser) : null },
    };

    watch(
      () => pinia.state.value.user,
      (userState) => {
        if (userState?.user) {
          localStorage.setItem('currentUser', JSON.stringify(userState.user));
        } else {
          localStorage.removeItem('currentUser');
        }
      },
      { deep: true },
    );

    return pinia;
  }
}
