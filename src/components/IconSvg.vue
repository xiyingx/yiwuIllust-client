<template>
<div class="svg-box">
  <i v-if="iconName.indexOf('el-icon-') === 0" :class="iconName" />
  <svg v-else class="svg-icon" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="`#icon-${iconName}`" />
  </svg>
  <span>
    <slot></slot>
  </span>
</div>
  

</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.svg-box{
  display: inline-block;
  width: fit-content;
  height: fit-content;
}
.svg-icon {
  width: 1em;
  height: 1em;
  margin-right: 2px;
  overflow: hidden;
  fill: currentColor;
}
.svg-box span{
  vertical-align: 10%;
}
</style>
