<template>
  <div class="modal" :class="{ 'is-active': isShown }" v-if="isShown">
    <div class="modal-background" @click="fecharModal"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalComponent",
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    fecharModal() {
      this.$emit("fecharModal");
    },
  },
});
</script>
