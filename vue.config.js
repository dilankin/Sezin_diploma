const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  pwa: {
    name: 'Sezin',
    themeColor: '#FFFFFF', // Цвет темы вашего PWA
    msTileColor: '#ffffff', // Цвет плитки MS для Windows
    appleMobileWebAppCapable: 'yes', // Включает полноэкранный режим при запуске с домашнего экрана на iOS
    appleMobileWebAppStatusBarStyle: 'black', // Цвет строки состояния на iOS
    manifestOptions: {
      background_color: '#ffffff', // Цвет фона манифеста
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png', // Путь к иконке favicon размером 32x32
      favicon16: 'img/icons/favicon-16x16.png', // Путь к иконке favicon размером 16x16
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png', // Путь к иконке Apple Touch размером 152x152
      maskIcon: 'img/icons/safari-pinned-tab.svg', // Путь к иконке для закрепления в Safari
      msTileImage: 'img/icons/msapplication-icon-144x144.png', // Путь к иконке для плитки MS размером 144x144
    },
    iconOptions: {
      purpose: 'maskable',
    },
  },
})