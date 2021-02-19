const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      return {
        dest: 'public',
        runtimeCaching,
      };
    }

    return config;
  },
});
