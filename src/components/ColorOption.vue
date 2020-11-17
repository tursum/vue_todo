<template>
  <li class="color-option">
    <div class="color-option__block" :class="{active: color.isActive}" :style="{backgroundColor: color.color}">
      <p class="color-option__quantity">{{color.quantity}}</p>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'ColorOption',
    props: {
      color: {
        type: Object,
        default: function() {
          return {
            color: 'transparent',
            isActive: false,
            quantity: -1
          }
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  
</style>