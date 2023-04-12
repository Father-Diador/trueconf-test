<template>
    <div class="elevator-pos">
        <div class="elevator" 
            v-bind:style="{ transform: transformValue, transition: transitionValue, height: getFloorsCount}"
        >
            <div class="elevator-inside"
                v-bind:style="{ background: backgroundValue }"
            >
                <div class="elevator-title"> 
                    <div class="numb">
                        {{ direction }}
                    </div>
                    <div class="numb">
                        {{ getElevators[this.number - 1].currentFloor }} 
                    </div>
                </div>
                <div class="elevator-doors"> 
                    <div class="door left"
                        v-bind:style="{ width: widthValue }"
                    >
                    </div>
                    <div class="door right"
                        v-bind:style="{ width: widthValue }"
                    >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElevatorManager } from '@/service';

export default {
    props: {
        number: {
            type: Number,
        }
    },
    data() {
        return {
            transformValue: 'translate(0, calc(-120px * 0))',
            backgroundValue: '#ccc',
            transitionValue: '1s linear',

            colorValue: '#000',

            start: true,
            direction: ' ',
            currentFloor: 1,
            widthValue: '50%',
        }
    },
    computed: {
        getFloorsCount() {
            let arr = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let height = 'calc(100vh / ' + arr.length + ')';
            return height;
        },
        getElevators() {
            return this.$store.getters.GET_ELEVATOR_COUNT;
        },
        getQueue() {
            return this.$store.getters.GET_QUEUE;
        },
    },
    watch: {
        currentFloor(){
            if(this.getElevators[this.number - 1].currentFloor === this.getElevators[this.number - 1].destinationFloor){
                this.onMove();
            }
        }
    },  
    methods: {
        closeDoors(){
            this.widthValue = '50%';
        },
        setInactive() {
            // смена стилей на остановку лифта
            this.backgroundValue = '#ccc';
            this.colorValue = '#000';

            ElevatorManager.buttonInactive(this.number);

            ElevatorManager.cleansingQueue();
            
            ElevatorManager.cleansingElDestination(this.number);

            this.direction = ' ';
            this.start = true; //разрешение на запуск повторной функции
        },
        onMove() {
            // функция на смену стилей при отдыхе лифта
            this.backgroundValue = '#3574e8';
            this.colorValue = '#fff';
            this.widthValue = '10%';

            setTimeout(this.closeDoors, 2000); // запуск функции на закрытие дверей
            setTimeout(this.setInactive, 3000); // запуск функции на инактив лифта
        },
        elevatorStart() {
            this.start = false; // запрет на старт функции заново
                
            this.direction = ElevatorManager.moveDirection(this.number); // стрелочки
            let currentPosition = this.getElevators[this.number - 1].currentFloor;
            let destinationPosition = this.getElevators[this.number - 1].destinationFloor;
            if(currentPosition < destinationPosition) {
                let time = destinationPosition - currentPosition;
                this.transformValue = this.transformValue + ElevatorManager.moveCycle('-1');
                let timerForFloorPlus = setInterval(() => {
                    currentPosition = Number(currentPosition) + 1;
                    this.currentFloor = currentPosition;
                    ElevatorManager.setCurrentFloor(this.number, currentPosition);
                    if(currentPosition != destinationPosition){
                        this.transformValue = this.transformValue + ElevatorManager.moveCycle('-1')
                    }
                    localStorage.setItem('Elevators', JSON.stringify(this.$store.getters.GET_ELEVATOR_COUNT));
                }, 1000);
                setTimeout(() => { clearInterval(timerForFloorPlus); }, time * 1000);
            } 
            else if(currentPosition > destinationPosition) {
                let time = currentPosition - destinationPosition;
                this.transformValue = this.transformValue + ElevatorManager.moveCycle('1');
                let timerForFloorMin = setInterval(() => {
                    currentPosition = Number(currentPosition) - 1;
                    this.currentFloor = currentPosition;
                    ElevatorManager.setCurrentFloor(this.number, currentPosition);
                    if(currentPosition != destinationPosition){
                        this.transformValue = this.transformValue + ElevatorManager.moveCycle('1')
                    } 
                    localStorage.setItem('Elevators', JSON.stringify(this.$store.getters.GET_ELEVATOR_COUNT));
                }, 1000);
                setTimeout(() => { clearInterval(timerForFloorMin); }, time * 1000);
            } 
            else if(currentPosition == destinationPosition) {
                this.onMove();
            }
            
            this.backgroundValue = '#42aaff';
            this.colorValue = '#fff';
            let allElevators = this.getElevators; // получение списка лифтов
            console.log("Лифт номер: " + allElevators[this.number - 1].id + ", едет на этаж: " + allElevators[this.number - 1].destinationFloor + ", с этажа: " + allElevators[this.number - 1].currentFloor);
        },
        elevatorCheck() {
            if(this.getQueue[this.number] && this.start === true) { // проверка на существование очереди
                let checkCurrentExecution = ElevatorManager.checkCurrentExecution(this.number); // проверка на выполнение задачи другим лифтом
                if(checkCurrentExecution === false) {
                    return
                }
                this.elevatorStart(); // запуск лифта
            }
        },
        mountingFunction() {
            let arr = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let El = this.$store.getters.GET_ELEVATOR_COUNT[this.number - 1];
            let height = 'calc(100vh / ' + arr.length + ')';
            if(El.currentFloor){
                this.transformValue = 'translate(0, calc( -1 * ' + height + ' * ' + (Number(El.currentFloor) - 1) + ' ))';
            } else {
                return
            }
            if(this.getQueue[this.number]){
                this.elevatorStart(); // запуск лифта
            }
        },
    },
    beforeMount() {
        this.mountingFunction();
    },
    beforeUpdate(){
        this.elevatorCheck();
    }
}
</script>

<style scoped>
.elevator-pos{
  background: #4f4f4f;
  position: relative;
  width: 20%;
  height: 100vh;
  border: 2px solid #000;
  box-sizing: border-box;
}
.elevator{
    position: absolute;
    bottom: 0;
    width: 100%;
}
.elevator-inside{
    transition: 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
}
.elevator-title{
    border: 2px solid#000;
    padding: 2px 10px;
    background: #fff;
    border-radius: 5px;
    margin-top: 3%;
    margin-bottom: 3%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 60%;
    height: 20%;
    transition: 1s;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    font-size: 30px;
    box-sizing: border-box;
}
.numb{
    margin: auto 0;
}
.elevator-doors{
    width: 100%;
    height: 74%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 2px solid#000;
    background: #b5b8b1;
}
.door{
    background: #666666;
    transition: 1s;
}
.left{
    border-right: 2px solid#000;
}
.right{
    border-left: 2px solid#000;
}
</style>