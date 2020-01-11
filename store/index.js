import { createStore } from 'redux'
import { reducer } from './reducer'
const store = createStore(reducer);

export default store;

export const themes = {
  login: [
    {
      one_color: '#ffffff',
      two_color: '#333',
      three_color: "#f7f7fb",
      four_color: '#eee',
      five_color: "#fa4169",
      six_color: "#fa416999",
      seven_color: "#d0d0ff",
      eight_color: '#282828',
      nine_color: '#69707f',
      ten_color: '#1d1e2f',
      ten1_color: '#ffffff',
      bar_style: 'dark-content',
    },
    {
      one_color: '#1a1a1a',
      two_color: '#5f5f5f',
      three_color: "#282828",
      four_color: '#282828',
      five_color: "#1a1a1a",
      six_color: "#1a1a1a99",
      seven_color: "#1a1a1a",
      eight_color: '#282828',
      nine_color: '#69707f',
      ten_color: '#5f5f5f',
      ten1_color: '#5f5f5f',
      bar_style: 'light-content',
    }
  ],
  home: [
    {
      one_color: '#f8f8f8',
      two_color: '#222c69',
      three_color: "#fff",
      four_color: '#222c69',
      five_color: "#1a1a1a",
      six_color: "#1a1a1a99",
      seven_color: "#1a1a1a",
      bar_style: 'dark-content',
    },
    {
      
    }
  ]
};

export const getThemeConfig = (page, themeIndex) => {
  const theme = themes[page] && themes[page][themeIndex] || {
    one_color: '#ffffff',
    two_color: '#333',
    three_color: "#f7f7fb",
    four_color: '#eee',
    five_color: "#fa4169",
    six_color: "#fa416999",
    seven_color: "#d0d0ff",
    eight_color: '#282828',
    nine_color: '#69707f',
    ten_color: '#1d1e2f',
    ten1_color: '#ffffff',
    bar_style: 'dark-content',
  };
  return theme;
};