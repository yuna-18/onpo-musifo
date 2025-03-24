// 右の値はnullを避けるためのデフォルト
const topPagePath = import.meta.env.VITE_HOME_PATH || '/';

export const redirectToHome = () => {
  const baseURL = window.location.origin;
  window.location.href = `${baseURL}${topPagePath}`;
};

export const isHomePath = () => {
  const currentPath = window.location.pathname;
  return currentPath === topPagePath;
};
