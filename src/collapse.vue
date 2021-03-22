<template>
  <div class="w-collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "WheelsCollapse",
  props: {
    // 是否只显示一个
    single: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
    },
  },
  data() {
    return {
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    // 向collapse-item组件传递选择的item数组
    this.eventBus.$emit("update:selected", this.selected);

    // 增加选中的选项
    this.eventBus.$on("update:addselected", (name) => {
      let selectedCopy = JSON.parse(JSON.stringify(this.selected));
      // 如果是单选就直接赋值一个单值数组
      if (this.single) {
        selectedCopy = [name];
      } else {
        // 不是的话就push新值
        selectedCopy.push(name);
      }
      this.eventBus.$emit("update:selected", selectedCopy);
      this.$emit("update:selected", selectedCopy);
    });

    // 移除selected中的选项
    this.eventBus.$on("update:removeselected", (name) => {
      let selectedCopy = JSON.parse(JSON.stringify(this.selected));
      let index = this.selected.indexOf(name);
      selectedCopy.splice(index, 1);
      this.eventBus.$emit("update:selected", selectedCopy);
      this.$emit("update:selected", selectedCopy);
    });
  },
};
</script>

<style scoped lang="scss">
@import "var";
.w-collapse {
  border: 2px solid $border-color;
}
</style>