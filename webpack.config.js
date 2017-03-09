const buildConfig = (env) => require(`./webpack.config.${env || 'dev'}`)()

module.exports = buildConfig
