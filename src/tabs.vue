<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "WheelsTabs",
  props: {
    selected: {
      // 选中的item
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) >= 0;
      },
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
  methods: {
    // 判断tabs组件里面有没有子组件，没有的话警告
    checkChildren() {
      if (this.$children.length === 0) {
        console &&
          console.warn &&
          console.warn(
            "tabs的子组件应该是tabs-head和tabs-body，但你没有写子组件"
          );
      }
    },
    //
    selectTab() {
      // 循环子组件，如果子组件是tabs-head组件，就循环tabs-head的子组件，如果是tabs-item组件，就emit一个更新选择tab的事件，传入选择的序号和子组件
      this.$children.forEach((vm) => {
        if (vm.$options.name === "WheelsTabsHead") {
          vm.$children.forEach((childVm) => {
            if (
              childVm.$options.name === "WheelsTabsItem" &&
              childVm.name === this.selected // 时tabs-item组件并且
            ) {
              // 触发更新选择的事件，传入选择和
              this.eventBus.$emit("update:selected", this.selected, childVm);
            }
          });
        }
      });
    },
  },
  mounted() {
    this.checkChildren();
    this.selectTab();
  },
};
</script>