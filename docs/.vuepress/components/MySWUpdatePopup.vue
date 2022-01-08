<template>
  <SWUpdatePopup v-slot="{ enabled, reload, buttonText }">
    <div
      v-if="enabled"
      class="my-sw-update-popup">
      <p>发现新内容可用，点击 <strong>刷新</strong> 进行更新</p>
      <div class="my-sw-update-btn">
        <button @click="reload">{{ buttonText }}</button>
      </div>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  name: 'MySWUpdatePopup',
  components: { SWUpdatePopup }
}
</script>

<style scoped>
.my-sw-update-popup {
  position: fixed;
  right: 1em;
  bottom: 1em;
  padding: 1em;
  border: 1px solid #2c68ff;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  z-index: 3;
  font-size: 16px;
}

.my-sw-update-btn {
  display: flex;
  justify-content: center;
}

.my-sw-update-btn > button {
  margin-top: 0.5em;
  padding: 0 16px;
  border: 0 none;
  border-radius: 4px;
  height: 32px;
  min-width: 64px;
  text-align: center;
  outline: 0;
  user-select: none;
  background-color: #2c68ff;
  color: #fff;
  cursor: pointer;
}

.my-sw-update-popup-enter-active, .my-sw-update-popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.my-sw-update-popup-enter, .my-sw-update-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>