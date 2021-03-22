<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "WheelsTabsPane",
  inject: ["eventBus"],
  props: {
    // name是区别tabs-pane的标识
    name: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },
  created() {
    // 判断选择的是哪一个
    this.eventBus.$on("update:selected", (name) => {
      this.active = name === this.name;
    });
  },
};
</script>
<style scoped lang="scss">
.tabs-pane {
  padding: 1rem;
}
</style>