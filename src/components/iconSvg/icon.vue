<template>
  <svg class="icon" aria-hidden="true" :style="getStyle">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue'
const props = defineProps<{
  icon: string
  size?: string | number
}>()
const getStyle = computed(() => {
  return {
    width: props.size,
    height: props.size
  }
})
</script>