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
</template>

<style scoped>
.position-info{
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
</style>