<template>
  <div
    class="tabs-item"
    @click="onClick"
    :class="classes"
    :data-name="name"
    data-color="#66B1FF"
  >
    <w-canvas :drawed="active" v-if="!disabled"></w-canvas>
    <slot></slot>
  </div>
</template>
<script>
import Canvas from "./canvas";
export default {
  name: "WheelsTabsItem",
  inject: ["eventBus"],
  components: {
    "w-canvas": Canvas,
  },
  data() {
    return {
      active: false,
      isOverflowHidden: false,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    // name是每一个item的标记，用来确定选择的是哪一个item
    name: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled,
        "is-overflow-hidden": this.isOverflowHidden,
      };
    },
  },
  created() {
    // 判断此item有没有被选中
    if (this.eventBus) {
      this.eventBus.$on("update:selected", (name) => {
        this.active = name === this.name;
      });
    }
  },
  mounted() {
    const explorer = window.navigator.userAgent;
    // 替换不支持 clip-path 浏览器为 overflow: hidden
    if (
      explorer.indexOf("Trident") >= 0 ||
      explorer.indexOf("Edge") >= 0 ||
      explorer.indexOf("Opera") >= 0
    ) {
      this.isOverflowHidden = true;
    } else {
      this.isOverflowHidden = false;
    }
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }
      this.eventBus && this.eventBus.$emit("update:selected", this.name, this); // 发布事件更新选项
      this.$emit("click", this); // 触发点击事件
    },
  },
};
</script>
<style scoped lang="scss">
@import "var";

.tabs-item {
  flex-shrink: 0;
  padding: 0 2rem;
  height: 100%;
  font-family: $font-family;
  display: flex;
  align-items: center;
  // 裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); // 是一个矩形
  position: relative;
  cursor: pointer;
  &.active {
    color: $color-primary;
  }
  &.disabled {
    color: $color-info;
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.is-overflow-hidden {
  overflow: hidden;
}
</style>