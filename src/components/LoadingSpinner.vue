<template>
  <b-overlay
    :show="loading"
    rounded
    opacity="0.6"
    spinner-small
    spinner-variant="primary"
    class="d-inline-block w-100 loading-spinner"
  >
    <slot />
  </b-overlay>
</template>

<script>
export default {
  name: "LoadingSpinner",

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
