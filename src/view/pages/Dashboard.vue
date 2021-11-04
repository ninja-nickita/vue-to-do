<template>
  <div class="applications">
    <div class="container">
      <applications-list />
      <sidebar />
    </div>
  </div>
</template>
<script>
import ApplicationsList from "@/components/ApplicationsList";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Dashboard",

  components: {
    ApplicationsList,
    Sidebar
  }
};
</script>
