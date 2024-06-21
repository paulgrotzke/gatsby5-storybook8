import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.story.ts"],
  typescript: {
    reactDocgen: false,
  },
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
      },
    });

    // modify storybook's file-loader rule only if you use inline svg
    config.module.rules.find((r) => r.test.test(".svg")).exclude = /\.svg$/;
    config.module.rules.push({ test: /\.svg$/, loader: "svg-react-loader" });
    return config;
  },
};
export default config;
