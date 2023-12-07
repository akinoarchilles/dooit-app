module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@interfaces': './src/interfaces',
          '@components': './src/components',
          '@constants': './src/constants',
          '@providers': './src/providers',
          '@features': './src/features',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@@@': '.',
          '@@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
