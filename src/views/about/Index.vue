<template>
  <div>
    <h1>This is About page!</h1>
    <el-button @click="handleLink">
      到home
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    handleLink() {
      this.$router.push('/home');
    },
  },
};
</script>
