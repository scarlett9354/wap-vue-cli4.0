<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>
  </div>
</template>

<script>
import { routerTransitionMixin } from '@/mixin/router'
export default {
  mixins: [routerTransitionMixin]
}
</script>
