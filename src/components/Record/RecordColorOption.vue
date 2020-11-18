<template>
  <li class="color-option" :class="{active: recordColor == color}">
    <input :id="`r${recordId}_${color}`" type="radio" name="color" :value="color" @click="$emit('changeRecordColor')">
    <label :for="`r${recordId}_${color}`" :style="{backgroundColor: color}"></label>
  </li>
</template>

<script>
  export default {
    name: 'RecordColorOption',
    props: {
      color: String,
      recordId: Number,
      recordColor: String
    }
  }
</script>

<style scoped lang="sass">
  .color-option
    margin-left: 3px
    position: relative
    transition: .3s
    transform: translateY(0)
    & label
      position: absolute
      border-radius: 50%
      border: 1px solid #ddd
      width: 13px
      height: 13px
      left: 0
      top: 0
      cursor: pointer
    &.active
      transform: translateY(-5px)
</style>