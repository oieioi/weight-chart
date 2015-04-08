module.exports = {
  entry: './src/components/main.jsx',
  output: {
    filename: 'main.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css'
    ]
  }
};
