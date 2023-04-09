<template>
  <div class="wrapper">
    <Settings 
      v-if="settingsActive" 
      @create="openSettings"
    />
    <div class="elevator-position">
      <Elevator
        v-for="elevator in getElevatorCount"
        v-bind:key = elevator.id
        :number="elevator.id"
      />
    </div>
    <div class="floors-position">
      <Floor
        v-for="floor in getFloorCount"
        v-bind:key = floor.id
        :floor="floor"
      />
    </div>
    <div class="btn-position">
      <div class="btn" @click="openSettings()">
        Настройки
      </div>
      <InformationWidget />
    </div>
  </div>
</template>

<script>
import Floor from "@/components/floor.vue"
import Elevator from "@/components/elevator.vue"
import Settings from "@/components/settings.vue"
import InformationWidget from "@/components/informationWidget.vue"

export default {
  components: {
    Floor, 
    Elevator,
    Settings,
    InformationWidget,
  },
  data() {
    return {
      settingsActive: false,
    }
  },
  methods: {
    openSettings() {
      if(this.settingsActive === false){
        this.settingsActive = true;
      } else {
        this.settingsActive = false;
      }
    }
  },
  computed: {
    getFloorCount() {
      return this.$store.getters.GET_FLOOR_COUNT;
    },
    getElevatorCount() {
      return this.$store.getters.GET_ELEVATOR_COUNT;
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
  justify-content: flex-end;
  width: 100%;
}
.elevator-position{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 60%;
}
.floors-position{
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  align-items: space-between;
}
.btn-position{
  width: 20%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
  height: 100vh;
}
.btn{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 50%;
  height: 3%;
  margin-top: 5%;
  padding: 3%;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  font-size: 25px;
  background: #00db6a;
  border-radius: 5px;
  color: #fff;
  transition: 0.3s;
  margin-bottom: 50px;
}
.btn:hover{
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
