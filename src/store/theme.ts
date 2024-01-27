interface Theme {
  name: string;
  icon: string;
  value: string;
}

interface ThemeState {
  themes: Theme[];
  currentTheme: string;
}

export default {
  namespaced: true,
  state: {
    themes: [
      { name: "Light", icon: "sun-fill", value: "light" },
      {
        name: "Dark",
        icon: "moon-stars-fill",
        value: "dark",
      },
      {
        name: "Auto",
        icon: "circle-half",
        value: "auto",
      },
    ],
    currentTheme: "auto",
  },
  mutations: {
    setTheme(state: ThemeState, newTheme: string) {
      state.currentTheme = newTheme;
      document.documentElement.setAttribute(
        "data-bs-theme",
        state.currentTheme
      );
    },
  },
  actions: {
    // 다른 액션들을 추가할 수 있음
  },
  getters: {
    themes: (state: ThemeState) => state.themes,
    currentTheme: (state: ThemeState) => state.currentTheme,
  },
};
