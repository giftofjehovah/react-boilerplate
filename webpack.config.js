const buildConfig = (env) => require(`./config/webpack.config.${env || 'dev'}`)()

module.exports = buildConfig
