import 'font-awesome/css/font-awesome.min.css'
import DuoInput from './packages/input/'

const components = [
  DuoInput
]

const install = (Vue) => {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install,
  DuoInput
}
