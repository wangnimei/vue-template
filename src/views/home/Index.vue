<template>
  <div>
    <h1>This is Home page!</h1>
    <el-button @click="handleLink">
      到about
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {};
  },
  methods: {
    handleLink() {
      this.$router.push({ name: 'about' }).catch(() => {});
    },
  },
};
</script>
