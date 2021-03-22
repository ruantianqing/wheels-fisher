<template>
  <canvas ref="wCanvas" @click="press" class="w-canvas"></canvas>
</template>
<script>
export default {
  name: "WheelsCanvas",
  props: {
    drawed: {
      type: Boolean,
      default: false,
    },
    globalListen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clickedEvent: "",
      clickedParentElement: "",
      insideRadius: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.drawed && this.$refs.wCanvas) {
        const canvas = this.$refs.wCanvas;
        const context = canvas.getContext("2d");
        context.fillStyle = canvas.parentElement.dataset.color; // 填充颜色,填充父元素的color
        context.beginPath();
        context.arc(
          // 绘制圆弧路径
          0, // 圆心坐标x
          0, // 圆心坐标y
          // 圆弧的半径，getTheBevel返回长和宽平方和的开平方
          this.getTheBevel(
            canvas.parentElement.offsetWidth,
            canvas.parentElement.offsetHeight
          ),
          0, // 圆弧的起始点
          2 * Math.PI, // 圆弧的终点
          false // false表示顺时针，true表示逆时针
        );
        context.fill(); // 根据当前的填充样式，填充当前或已存在的路径的方法
      }
    });
  },
  destroyed() {
    if (this.$refs.wCanvas && this.globalListen) {
      document.removeEventListener("click", this.onClickDocument);
    }
  },
  methods: {
    getTheBevel(x, y) {
      // 返回x,y平方和的开平方
      return Math.sqrt(x * x + y * y);
    },
    onClickDocument(e) {
      if (
        this.$refs.wCanvas &&
        (this.$refs.wCanvas === e.target ||
          this.$refs.wCanvas.contains(e.target))
      ) {
        return;
      }
      this.clearRect(); // 清除矩形
      document.removeEventListener("click", this.onClickDocument);
    },

    // 点击触发的事件
    press(event) {
      this.insideRadius = 0;
      this.clickedEvent = event;
      this.clickedParentElement = event.target.parentElement;
      this.draw(); // 动画填充颜色
      if (this.globalListen) {
        this.$nextTick(() => {
          document.addEventListener("click", this.onClickDocument);
        });
      }
    },

    // 清除矩形及填充的颜色
    clearRect() {
      const canvass = document.getElementsByClassName("w-canvas");
      for (let i = 0; i < canvass.length; i++) {
        const context = canvass[i].getContext("2d");
        if (context.fillStyle !== "#000000") {
          context.fillStyle = "#000000";
          context.clearRect(0, 0, canvass[i].width, canvass[i].height); // 这个方法通过把像素设置为透明以达到擦除一个矩形区域的目的
        }
      }
    },

    // 绘制填充颜色，绘制半径会一点点增加，变成动画效果，直到等于父元素的长度
    draw() {
      this.clearRect(); // 点击的时候需要先清除填充的颜色，然后再重新填充颜色
      const context = this.clickedEvent.target.getContext("2d");
      context.beginPath();
      context.arc(
        this.clickedEvent.layerX || this.clickedEvent.offsetX,
        this.clickedEvent.layerY || this.clickedEvent.offsetY,
        this.insideRadius, // 半径，初始值为0
        0,
        2 * Math.PI,
        false
      );
      context.fillStyle = this.clickedParentElement.dataset.color;
      context.fill();
      this.insideRadius += 5; // 每一次绘制就会加5
      if (
        this.insideRadius <
        this.getTheBevel(
          this.clickedParentElement.offsetWidth,
          this.clickedParentElement.offsetHeight
        )
      ) {
        // 如果insideRadius小于父元素的长度，就继续循环执行，变成动画效果
        window.requestAnimationFrame(this.draw); // 你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.w-canvas {
  cursor: pointer;
  opacity: 0.25;
  position: absolute;
  top: 0;
  left: 0;
}
</style>