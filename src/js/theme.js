const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const bodyEl = document.querySelector('body');
const switchTheme = document.querySelector('#theme-switch-toggle');
const STORAGE_KEY = 'light-theme';
const savedTheme = localStorage.getItem(STORAGE_KEY);

bodyEl.classList.add(theme.LIGHT);
switchTheme.addEventListener('change', onSwitchThemeclick);

if (savedTheme === 'false') {
  bodyEl.classList.remove(theme.LIGHT);
  bodyEl.classList.add(theme.DARK);
  switchTheme.checked = true;
}

function onSwitchThemeclick() {
  bodyEl.classList.toggle(theme.LIGHT);
  bodyEl.classList.toggle(theme.DARK);

  const lightTheme = bodyEl.classList.contains(theme.LIGHT);
  localStorage.setItem(STORAGE_KEY, lightTheme);
}
