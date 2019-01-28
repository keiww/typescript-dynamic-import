import { setId } from './auth'

export default function init(id: string): Promise<any> {
  setId(id)
  return Promise.resolve()
}
