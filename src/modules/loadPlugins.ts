export default async function loadPlugins(
  this: Lib,
  plugins: PluginNames
): Promise<any> {
  return Promise.all(
    plugins.map(async (plugin: PluginName) => {
      const module: any = await import(/* webpackChunkName: "[request]" */ `../plugins/${plugin}`)
      if (module) {
        this[plugin] = module.default
      }
    })
  )
}
