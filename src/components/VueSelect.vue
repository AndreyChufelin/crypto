<script setup lang="ts">
import { ref, watch } from "vue";
import IconArrow from "./icons/IconArrow.vue";

const props = defineProps<{
  modelValue: any;
  options: Array<{ lable: string; value: any } | any>;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

const selectedOption = ref(props.options[0]);

const isOptionsOpened = ref(false);

selectedOption.value = ref(props.modelValue);

watch(selectedOption, (value) => {
  emit("update:modelValue", value);
});

document.addEventListener("click", () => (isOptionsOpened.value = false));
</script>

<template>
  <div class="select">
    <button
      class="select__input"
      @click.stop="isOptionsOpened = !isOptionsOpened"
    >
      <Transition name="slide-fade" mode="out-in">
        <div :key="modelValue">
          <slot name="input" :value="modelValue">
            {{ modelValue.lable ?? modelValue }}
          </slot>
        </div>
      </Transition>
      <IconArrow
        class="select__arrow"
        :class="{ select__arrow_opened: isOptionsOpened }"
      />
    </button>
    <Transition v-show="isOptionsOpened" name="slide-fade">
      <ul class="select__options">
        <li v-for="option in options" :key="option.lable ?? option">
          <button class="select__options-item" @click="selectedOption = option">
            <slot name="option" :message="option.lable ?? option">{{
              option.lable ?? option
            }}</slot>
          </button>
        </li>
        <slot name="additional"></slot>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.select {
  position: relative;
}
.select__input {
  display: flex;
  align-items: center;
  column-gap: 5px;
}
.select__options {
  padding: 5px 10px;
  background-color: var(--color-background-soft);
  border-radius: 5px;
  z-index: 100;
  position: absolute;
}
.select__options-item:hover {
  color: var(--color-additional);
  transition: color 0.25s;
}
.select__arrow {
  width: 10px;
  transform: rotate(-90deg);
  transition: all 0.25s;
}
.select__arrow_opened {
  transform: rotate(90deg);
}
.select__input:hover .select__arrow {
  fill: var(--color-text-soft);
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
