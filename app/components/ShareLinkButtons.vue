<template>
  <div class="flex gap-x-2">
    <div @click="handleElementClicked">
      <NuxtLink :to="linkUrl">
        <Icon
          class="text-gray-300 hover:custom-green"
          name="mdi:pencil-outline"
          color="black"
        />
      </NuxtLink>
    </div>
    <!-- disable this since the share feature is not ready <div>
      <Icon
        class="text-gray-300 hover:custom-green"
        name="mdi:share-variant-outline"
        color="black"
      />
    </div> -->
    <div @click="handleElementClicked">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  linkUrl: string;
  onLinkClicked?: () => void;
}>();

const handleElementClicked = () => {
  if (props.onLinkClicked) {
    props.onLinkClicked();
  }
};
</script>

<style>
.hover\:custom-green:hover {
  color: #03a58d;
}
</style>
