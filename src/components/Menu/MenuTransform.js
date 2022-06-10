import { Menu, Submenu } from 'element-ui'
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray'
import { getClass, getPropsData, setStyle, getWidth } from './utils/props-util'
import { cloneElement } from './utils/vnode'
import ResizeObserver from 'resize-observer-polyfill'
var MENUITEM_OVERFLOWED_CLASSNAME = 'menuitem-overflowed'
var FLOAT_PRECISION_ADJUST = 0.5
var MenuTransform = {
  name: 'MenuTransform',
  props: ['theme', 'mode', 'title', 'level', 'collapse', 'defaultActive', 'defaultOpeneds', 'menu-trigger', 'router'],
  data() {
    this.resizeObserver = null
    return {
      lastVisibleIndex: undefined
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setChildrenWidthAndResize()
      if (this.level === 1 && this.mode === 'horizontal') {
        var menuUl = this.$el
        if (!menuUl) {
          return
        }
        this.resizeObserver = new ResizeObserver((entries) => {
          entries.forEach(this.setChildrenWidthAndResize)
        })
        Array.prototype.slice.call(menuUl.children).concat(menuUl).forEach((el) => {
          this.resizeObserver.observe(el)
        })
      }
    })
  },
  methods: {
    getOverflowedSubMenuItem: function getOverflowedSubMenuItem(keyPrefix, overflowedItems, renderPlaceholder) {
      var h = this.$createElement
      var _$props = this.$props
      var level = _$props.level
      var mode = _$props.mode
      var prefixCls = _$props.prefixCls
      if (level !== 1 || mode !== 'horizontal') {
        return null
      }
      // put all the overflowed item inside a submenu
      // with a title of overflow indicator ('...')
      var style = {}
      var key = keyPrefix + '-overflowed-indicator'
      if (renderPlaceholder) {
        style = {
          visibility: 'hidden',
          // prevent from taking normal dom space
          position: 'absolute'
        }
        key = keyPrefix + '-placeholder'
      }
      if (overflowedItems.length === 0) {
        style = {
          display: 'none'
        }
      }
      var subMenuProps = {
        'class': prefixCls + '-overflowed-submenu',
        props: {
          attrs: { index: key },
          index: key
        },
        style: style
      }
      return h(
        Submenu,
        subMenuProps,
        [overflowedItems]
      )
    },
    getMenuItemNodes: function getMenuItemNodes() {
      var prefixCls = this.$props.prefixCls

      var ul = this.$el
      if (!ul) {
        return []
      }

      // filter out all overflowed indicator placeholder
      return [].slice.call(ul.children).filter(function(node) {
        return node.className.split(' ').indexOf(prefixCls + '-overflowed-submenu') < 0
      })
    },
    renderChildren: function renderChildren(children) {
      var _this3 = this
      // need to take care of overflowed items in horizontal mode
      var lastVisibleIndex = this.lastVisibleIndex
      var className = getClass(this)
      return (children || []).reduce(function(acc, childNode, index) {
        var item = childNode
        var eventKey = getPropsData(childNode).index
        if (_this3.mode === 'horizontal') {
          var overflowed = _this3.getOverflowedSubMenuItem(eventKey, [])
          if (lastVisibleIndex !== undefined && className[_this3.prefixCls + '-root'] !== -1) {
            if (index > lastVisibleIndex) {
              item = cloneElement(childNode,
              // 这里修改 eventKey 是为了防止隐藏状态下还会触发 openkeys 事件
                {
                  style: { display: 'none' },
                  props: { index: eventKey + '-hidden' },
                  'class': MENUITEM_OVERFLOWED_CLASSNAME
                })
            }
            if (index === lastVisibleIndex + 1) {
              _this3.overflowedItems = children.slice(lastVisibleIndex + 1)
              overflowed = _this3.getOverflowedSubMenuItem(eventKey, _this3.overflowedItems)
            }
          }
          var ret = [].concat(_toConsumableArray(acc), [overflowed, item])
          if (index === children.length - 1) {
            ret.push(_this3.getOverflowedSubMenuItem(eventKey, [], true))
          }
          return ret
        }
        // _this3.$nextTick(() => {
        //   _this3.$emit('setDefaultActive', _this3.$props['defaultActive'])
        // })
        return [].concat(_toConsumableArray(acc), [item])
      }, [])
    },
    setChildrenWidthAndResize: function setChildrenWidthAndResize() {
      if (this.mode !== 'horizontal') {
        return
      }
      var ul = this.$el

      if (!ul) {
        return
      }

      var ulChildrenNodes = ul.children

      if (!ulChildrenNodes || ulChildrenNodes.length === 0) {
        return
      }

      var lastOverflowedIndicatorPlaceholder = ul.children[ulChildrenNodes.length - 1]

      // need last overflowed indicator for calculating length;
      setStyle(lastOverflowedIndicatorPlaceholder, 'display', 'inline-block')

      var menuItemNodes = this.getMenuItemNodes()

      // reset display attribute for all hidden elements caused by overflow to calculate updated width
      // and then reset to original state after width calculation

      var overflowedItems = menuItemNodes.filter(function(c) {
        return c.className.split(' ').indexOf(MENUITEM_OVERFLOWED_CLASSNAME) >= 0
      })
      overflowedItems.forEach(function(c) {
        setStyle(c, 'display', 'inline-block')
      })

      this.menuItemSizes = menuItemNodes.map(function(c) {
        return getWidth(c)
      })

      overflowedItems.forEach(function(c) {
        setStyle(c, 'display', 'none')
      })
      this.overflowedIndicatorWidth = getWidth(ul.children[ul.children.length - 1])
      this.originalTotalWidth = this.menuItemSizes.reduce(function(acc, cur) {
        return acc + cur
      }, 0)
      this.handleResize()
      // prevent the overflowed indicator from taking space;
      setStyle(lastOverflowedIndicatorPlaceholder, 'display', 'none')
    },
    handleResize: function handleResize() {
      var _this2 = this

      if (this.mode !== 'horizontal') {
        return
      }
      var ul = this.$el
      if (!ul) {
        return
      }
      var width = getWidth(ul)

      this.overflowedItems = []
      var currentSumWidth = 0

      // index for last visible child in horizontal mode
      var lastVisibleIndex = void 0

      // float number comparison could be problematic
      // e.g. 0.1 + 0.2 > 0.3 =====> true
      // thus using FLOAT_PRECISION_ADJUST as buffer to help the situation
      if (this.originalTotalWidth > width + FLOAT_PRECISION_ADJUST) {
        lastVisibleIndex = -1

        this.menuItemSizes.forEach(function(liWidth) {
          currentSumWidth += liWidth
          if (currentSumWidth + _this2.overflowedIndicatorWidth <= width) {
            lastVisibleIndex += 1
          }
        })
      }

      this.lastVisibleIndex = lastVisibleIndex
    }
  },
  render: function render(h) {
    return h(
      Menu,
      {
        props: { ...this.$props },
        on: {
          'select': (val) => {
            this.$emit('change', val)
          }
        }
      },
      [this.renderChildren(this.$slots.default)]
    )
  }
}
export default MenuTransform
