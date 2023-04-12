<template>
    <div class="position-info">
        <div class="block-pos"> 
          <div class="dormant-state block-color"></div>
          Состояние покоя
        </div>
        <div class="block-pos"> 
          <div class="move-state block-color"></div>
          Состояние движения
        </div>
        <div class="block-pos"> 
          <div class="rest-state block-color"></div>
          Состояние отдыха
        </div>
    </div>
    <ElevatorInfo />
    <button class="delete-local" @click="deleteLocalStorage()"> 
      Очистить локальное хранилище 
    </button>
</template>

<script>
import { ConfigManager } from '@/service';
import ElevatorInfo from "@/components/elevatorInfo.vue";

export default {
  components: {
    ElevatorInfo,
  },
  methods: {
    deleteLocalStorage() {
      ConfigManager.deleteLocalStorage();
      console.log("Успешно очищено!");
    }
  }
}
</script>

<style scoped>
.position-info{
    margin-bottom: 50px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.block-pos{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
  font-weight: 500;
}
.block-color{
  width: 40px;
  height: 40px;
  margin-right: 40px;
}
.dormant-state{
  background: #ccc;
}
.rest-state{
  background: #3574e8;
}
.move-state{
  background: #42aaff;
}
.delete-local{
  width: 70%;
  box-sizing: border-box;
  padding: 10px 20px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
  font-weight: 500;
  background: #ff9466;
  cursor: pointer;
  border: none;
  transition: 0.3s;
  color: #fff;
}
.delete-local:hover{
    background: #ff4d00;
}
</style>