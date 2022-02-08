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
const prefixCls = systemConfig.publicPrefixCls + '-card-box'
defineProps({
  title: String,
  icon: String
})
</script>

<style lang="scss" scoped>
  .shete-card-box {
    border-radius: 20px;
    border: 1px solid #888;
    background-color: $--color-bg;
    &-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: 10px 20px;
      span {
        margin-left: 10px;
      }
    }
  }
</style>