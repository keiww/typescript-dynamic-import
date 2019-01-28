import 'promise-polyfill/src/polyfill'

import init from './modules/init'
import loadPlugins from './modules/loadPlugins'
import { getId } from './modules/auth'

const lib: Lib = {
  init: init,
  getId: getId,
  loadPlugins: loadPlugins,
}

export default lib
