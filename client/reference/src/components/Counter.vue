<template>
    <div>
        <p>{{ count }}</p>
        <p>
          <button @click="increment">+</button>
          <button @click="decrement">-</button>
        </p>
    </div>
</template>

<script>
import * as types from '../store/mutation-types'

export default {
  name: 'counter',
  computed: {
    count () {
      return this.$store.state.counter.count
    }
  },
  methods: {
    increment () {
      this.$store.commit(types.INCREMENT)
    },
    decrement () {
      this.$store.commit(types.DECREMENT)
    }
  }
}
</script>
