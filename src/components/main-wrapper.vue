<template>
<div class="main-wrapper">
  <catalog/>
</div>
</template>

<script>
import catalog from "@/components/catalog";
export default {
  name: "main-wrapper",
  components:{
    catalog
  }
}
</script>

<style scoped>
.main-wrapper{
  width: 1040px;
  margin: 0 auto;
}
</style>