<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="handleClick">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data() {
    return {
      title: 'hello',
      description: 'world',
      buttonText: 'myButton'
    }
  },
  props: {
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>