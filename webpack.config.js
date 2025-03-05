module.exports = {
  // ...existing code...
  module: {
    rules: [
      // ...existing rules...
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [
          /node_modules\/bootstrap\/dist\/css/,
          // ...other exclusions if necessary...
        ],
      },
    ],
  },
  devtool: "source-map", // Add this line to suppress warnings
  // ...existing code...
};
