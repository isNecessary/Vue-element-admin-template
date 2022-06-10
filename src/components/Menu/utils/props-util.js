import classNames from 'classnames'
import _typeof from 'babel-runtime/helpers/typeof'
import _extends from 'babel-runtime/helpers/extends'
var camelizeRE = /-(\w)/g
var filterEmpty = function filterEmpty() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

  return children.filter(function(c) {
    return !isEmptyElement(c)
  })
}
export var setStyle = function setStyle(elem, styleProperty, value) {
  if (elem && _typeof(elem.style) === 'object') {
    elem.style[styleProperty] = value
  }
}
export var getWidth = function getWidth(elem) {
  var width = elem && typeof elem.getBoundingClientRect === 'function' && elem.getBoundingClientRect().width
  if (width) {
    width = +width.toFixed(6)
  }
  return width || 0
}
var getScopedSlots = function getScopedSlots(ele) {
  return ele.data && ele.data.scopedSlots || {}
}
var getComponentFromProp = function getComponentFromProp(instance, prop) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : instance
  var execute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true

  if (instance.$createElement) {
    var h = instance.$createElement
    var temp = instance[prop]
    if (temp !== undefined) {
      // 渲染文字和...vnode
      return typeof temp === 'function' && execute ? temp(h, options) : temp
    }
    // 渲染submenu
    return instance.$slots[prop] || undefined
  } else {
    var _h = instance.context.$createElement
    var _temp = getPropsData(instance)[prop]
    if (_temp !== undefined) {
      return typeof _temp === 'function' && execute ? _temp(_h, options) : _temp
    }
    var slotScope = getScopedSlots(instance)[prop]
    if (slotScope !== undefined) {
      return typeof slotScope === 'function' && execute ? slotScope(_h, options) : slotScope
    }
    var slotsProp = []
    var componentOptions = instance.componentOptions || {};
    (componentOptions.children || []).forEach(function(child) {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs) {
          delete child.data.attrs.slot
        }
        if (child.tag === 'template') {
          slotsProp.push(child.children)
        } else {
          slotsProp.push(child)
        }
      }
    })
    return slotsProp.length ? slotsProp : undefined
  }
}
export function getListeners(context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {}
}
var getClass = function getClass(ele) {
  var data = {}
  if (ele.data) {
    data = ele.data
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data
  }
  var tempCls = data['class'] || {}
  var staticClass = data.staticClass
  var cls = {}
  staticClass && staticClass.split(' ').forEach(function(c) {
    cls[c.trim()] = true
  })
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach(function(c) {
      cls[c.trim()] = true
    })
  } else if (Array.isArray(tempCls)) {
    classNames(tempCls).split(' ').forEach(function(c) {
      cls[c.trim()] = true
    })
  } else {
    cls = _extends({}, cls, tempCls)
  }
  return cls
}
export function isEmptyElement(c) {
  return !(c.tag || c.text && c.text.trim() !== '')
}

var getPropsData = function getPropsData(ele) {
  var componentOptions = ele.componentOptions
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions
  }
  return componentOptions ? componentOptions.propsData || {} : {}
}
var parseStyleText = function parseStyleText() {
  var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''
  var camel = arguments[1]

  var res = {}
  var listDelimiter = /;(?![^(]*\))/g
  var propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter)
      if (tmp.length > 1) {
        var k = camel ? camelize(tmp[0].trim()) : tmp[0].trim()
        res[k] = tmp[1].trim()
      }
    }
  })
  return res
}
var camelize = function camelize(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : ''
  })
}
export { getClass, getPropsData, parseStyleText, camelize, filterEmpty, getComponentFromProp }
