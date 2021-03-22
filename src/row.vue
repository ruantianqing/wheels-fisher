<template>
  <div class="row" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "WheelsRow",
  props: {
    // 每一列之间的间隔
    gutter: {
      type: [Number, String],
    },
    // 水平对齐方式
    align: {
      type: String,
      validator(value) {
        return ["left", "right", "center"].indexOf(value) >= 0;
      },
    },
  },
  computed: {
    // 根据gutter返回css style，gutter会增加row的长度
    rowStyle() {
      let { gutter } = this;
      return {
        marginLeft: -gutter / 2 + "px",
        marginRight: -gutter / 2 + "px",
      };
    },
    // 返回水平对齐方式的类名格式
    rowClass() {
      let { align } = this;
      return [align && `align-${align}`];
    },
  },
  mounted() {
    // 为row每一个child col设置gutter每列分栏间隔
    this.$children.forEach((vm) => {
      vm.gutter = this.gutter;
    });
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  &.align-center {
    justify-content: center;
  }
  display: flex;
}
</style>