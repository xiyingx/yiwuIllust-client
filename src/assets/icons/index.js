import Vue from 'vue'
import IconSvg from '@/components/IconSvg.vue'
Vue.component('svg-icon',IconSvg);
const req = require.context('@/assets/icons/svg',false,/\.svg$/)
const requireAll = requireContext =>{
    requireContext.keys().map(requireContext)
}
requireAll(req)
