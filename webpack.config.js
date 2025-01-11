// ...existing code...
module: {
  rules: [
    // ...existing rules...
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
    // ...existing rules...
  ]
}
// ...existing code...
