<template>
  <div class="wrapper">
    <!-- <div class="elevator-position">
      <Elevator 
        v-for="floor in getFloorCount"
        v-bind:key = floor.id
        :floor="floor"
      />
    </div> -->
    <div class="floors-position">
      <Floor
        v-for="floor in getFloorCount"
        v-bind:key = floor.id
        :floor="floor"
      />
    </div>
  </div>
</template>

<script>
import Floor from "@/components/floor.vue"
import Elevator from "@/components/elevator.vue"

export default {
  components: {
    Floor, 
    Elevator,
  },
  computed: {
    getFloorCount() {
      return this.$store.getters.GET_FLOOR_COUNT;
    },
    getQueue() {
      return this.$store.getters.GET_QUEUE;
    }
  },
}
</script>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.elevator-position{
  display: flex;
  flex-direction: column;
  align-items: space-between;
}
.floors-position{
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
}
</style>
