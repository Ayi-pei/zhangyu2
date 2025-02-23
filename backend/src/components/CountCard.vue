<template>
  <div>
    <el-card >
      <template #header>
        <div>{{ title }}</div>
        <slot name="tag"></slot>
      </template>
      <main>
        <svg-icon class="icon" name="salesVolume" />
        <div class="count" v-countTo="2000">
          {{ count }}
        </div>
      </main>
      <footer>
        {{ footer }}
      </footer>
    </el-card>
    <div>
      <p>{{ count }}</p>
      <button @click="increment">Increment</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import vCountTo from '../directives/countTo';
import { defineComponent, computed } from 'vue';
import { useMainStore } from '../store/mainStore';

defineProps({
  title:{
    type:String,
    default:'标题'
  },
  icon:{
    type:String,
    default:'salesVolume'
  },
  count:{
    type: Number,
    default: 0
  },
  footer:{
    type:String,
  }
})

const mainStore = useMainStore();
const count = mainStore.count;
const increment = mainStore.increment;
</script>

<style lang="less" scoped>
.el-card {
  width: 100%;
  height: 100%;

  :deep(.el-card__header) {
    display: flex;
    justify-content: space-between;
    height: 30%;
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    padding: 0;
    main {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 50%;
      .icon {
        flex: 2;
        color: @theme-label-active-color;
        width: 50%;
        height: 50%;
      }
      .count {
        flex: 3;
        font-size: 1.5em;
        text-align: center;
      }
    }
    footer {
      height: 20%;
      padding: 10px;
      border-top: 1px solid @theme-line-color;
      text-align: center;
    }
  }
}
</style>
