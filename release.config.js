module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/alipay-mini-api-promise.umd.js',
            label: 'umd.js'
          },
          {
            path: 'dist/alipay-mini-api-promise.umd.min.js',
            label: 'umd.min.js'
          }
        ]
      }
    ]
  ]
}
