<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-title`">
      <Icon v-if="icon" size="20" :icon="icon"></Icon>
      <span v-if="title">{{title}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import {systemConfig} from '@/config/system'
import Icon from '../iconSvg/icon.vue';
const prefixCls = systemConfig.publicPrefixCls + '-CardBox'
defineProps({
  title: String,
  icon: String
})
</script>

<style lang="scss" scoped>
  .shete-CardBox {
    border-radius: 20px;
    position: relative;
    background-color: transparent;
    backdrop-filter: blur(25px);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
    &-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      padding: 10px 20px;
      color: $--text-color;
      span {
        margin-left: 10px;
      }
    }
  }
</style>
