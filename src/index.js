import Notifications from './Notifications.vue'
import { events }    from './events'

const Notify = {
  install(Vue, args = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = args

    Vue.component(args.componentName || 'notifications', Notifications)

    const notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }

      if (typeof params === 'object') {
        events.$emit('add', params)
      }
    }

    notify.error = (params) => {
      events.$emit('add', Object.assign(params, {type:"error"}))
    }
    notify.success = (params) => {
      events.$emit('add', Object.assign(params, {type:"success"}))
    }
    notify.warn = (params) => {
      events.$emit('add', Object.assign(params, {type:"warn"}))
    }

    notify.close = function (id) {
      events.$emit('close', id)
    }

    const name = args.name || 'notify'

    Vue.prototype['$' + name] = notify
    Vue[name] = notify
  }
}

export default Notify
