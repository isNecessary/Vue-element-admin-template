<template>
  <div class="flex-between" style="width: 100%;height: 100%">
    <transition
      :name="transition"
    >
      <div
        v-show="showPopper"
        ref="popper"
        :name="group"
        class="v-popover"
        :style="{ top: top + 'px', height: `calc(100% - ${y + 50 + 30}px)` }"
        role="tooltip"
      >
        <div class="angle" :style="{left: left + 'px'}" />
        <slot />
      </div>
    </transition>
    <slot name="reference" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { on } from './dom'
export default {
  name: 'Popover',

  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 200
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    tabindex: {
      type: Number,
      default: 0
    },
    // gropu相同为同一组，需要打开一项关闭同一组的其他项
    group: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 1
    },
    name: {
      type: Number,
      default: 1
    }
  },
  data() {
    this.resizeObserver = null
    return {
      x: 0,
      width: 0
    }
  },
  computed: {
    ...mapState('setting', ['scale']),
    left() {
      return this.x + (this.width / 2)
    },
    top() {
      return this.y + 30
    },
    showPopper() {
      return this.name === this.value
    }
  },
  mounted() {
    const _this = this
    let reference = this.referenceElm = this.$refs.reference
    if (!reference && this.$slots.reference && this.$slots.reference[0]) {
      reference = this.referenceElm = this.$slots.reference[0].elm
    }
    resizePage()
    function resizePage() {
      // 通过缩放将一下2项还原成scale=1时的尺寸
      const { x, width } = reference.getBoundingClientRect()
      _this.x = x
      _this.width = width
    }
    on(reference, 'click', this.toggle)
  },
  methods: {
    toggle() {
      this.$emit('tab-click', this.name)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "index";
</style>
