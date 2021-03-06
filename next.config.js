const path = require("path");
const withTM = require("next-plugin-transpile-modules");
const styledJsxLoader = require("styled-jsx/webpack");

module.exports = withTM({
  webpack(config, options) {
    // Perform customizations to webpack config
    config.module.rules.push({
      // shader import support
      test: /\.glsl$/,
      use: [
        {
          loader: "emit-file-loader",
          options: {
            name: "dist/[path][name].[ext]",
          },
        },
        "babel-loader",
        "webpack-glsl-loader",
      ],
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: styledJsxLoader.loader,
          options: {
            type: "scoped",
          },
        },
      ],
    });
    return config;
  },
  transpileModules: ["gsap"],
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[local]___[hash:base64:5]",
  },
  exportPathMap: () => ({
    "/": { page: "/Index" },
  }),
});
