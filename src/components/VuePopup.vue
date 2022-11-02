<script setup lang="ts">
import { onMounted, ref } from "vue";

const show = ref(false);
const isMounted = ref(false);

function open() {
  show.value = true;
}
function close() {
  show.value = false;
}

onMounted(() => {
  isMounted.value = true;
});

defineExpose({
  open,
  close,
});
</script>

<template>
  <teleport to=".app" v-if="isMounted">
    <transition>
      <div v-if="show" class="popup" @click="show = false">
        <div class="popup__container" @click.stop>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.popup {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.548);
  animation: fade 0.5s;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@keyframes fade {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.548);
  }
}
.popup__container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-background-soft);
  padding: 10px;
  border-radius: 5px;
  width: 90%;
  max-width: 450px;
  max-height: 90%;
  overflow: hidden;
}
</style>
