<template>
    <div
        v-for="elevator in getElevatorCount"
        v-bind:key = elevator.id
        class="elevator-info-wrapper"
    >
        <div class="elevator-info-text"> Лифт номер: {{ elevator.id }} </div>
        <div 
            v-if="elevator.destinationFloor"
            class="elevator-info-text"
        > 
            Eдет на этаж: {{ elevator.destinationFloor }} 
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    getElevatorCount() {
      return this.$store.getters.GET_ELEVATOR_COUNT;
    },
  }
}
</script>

<style scoped>
.elevator-info-wrapper{
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 20px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
}
.elevator-info-text{
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
}
</style>