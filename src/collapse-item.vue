<template>
  <div class="w-collapse-item">
    <div class="w-title" @click="toggle">{{ title }}</div>
    <div class="w-content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WheelsCollapseItem",
  props: {
    // item title
    title: {
      type: String,
      required: true,
    },
    // 每一个item的标识
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  inject: ["eventBus"],
  mounted() {
    // 更新选项，从collapse传入的selected数组，如果包含此组件中的items，则此item展开
    this.eventBus &&
      this.eventBus.$on("update:selected", (names) => {
        if (names.indexOf(this.name) >= 0) {
          this.open = true;
        } else {
          this.open = false;
        }
      });
  },
  methods: {
    // 切换item的展开和收起
    toggle() {
      if (this.open) {
        this.eventBus &&
          this.eventBus.$emit("update:removeselected", this.name);
      } else {
        this.eventBus && this.eventBus.$emit("update:addselected", this.name);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "var";
.w-collapse-item {
  > .w-title {
    border: 2px solid $border-color;
    background-color: lightskyblue;
    color: #fff;
    margin: -2px;
    line-height: 32px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  > .w-content {
    padding: 8px;
  }
}
</style>