<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "WheelsLayout",
  data() {
    return {
      // hasSider的初始值是false
      layoutClass: {
        hasSider: false,
      },
    };
  },
  mounted() {
    // 循环layout的child,如果child的name是sider，就把hasSider的值设为true
    this.$children.forEach((vm) => {
      if (vm.$options.name === "WheelsSider") {
        this.layoutClass.hasSider = true;
      }
    });
  },
};
</script>
<style scoped lang="scss">
.layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &.hasSider {
    display: flex;
    flex-direction: row;
  }
}
</style>