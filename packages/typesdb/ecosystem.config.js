module.exports = {
  apps: [{
    name: 'vidalii.test1',
    script: 'src/test1.js',
    exec_interpreter: "babel-node",
    exec_mode: "fork",
    // watch: true,
    // ignore_watch: ["node_modules"],
    // watch_delay: 1000,
    // max_memory_restart: '1G',
    // watch_options: {
    //   "followSymlinks": false
    // },
  }]
};
