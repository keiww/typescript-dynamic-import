type PluginName = 'a' | 'b'
type PluginNames = Array<PluginName>

interface Lib {
  init(id: string): Promise<any>
  getId(): string
  loadPlugins(plugins: PluginNames): Promise<any>

  // plugins' placeholder
  a?: any
  b?: any
}
