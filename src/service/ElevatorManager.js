import store from '@/store';

export class ElevatorManager {
    getElevators() {
        return store.getters.GET_ELEVATOR_COUNT;
    }
    setElevators(elevators) {
        store.commit('SET_ELEVATORS', elevators);
    }
    getFloors() {
        return store.getters.GET_FLOOR_COUNT;
    }
    setFloors(floors) {
        store.commit('SET_FLOORS', floors);
    }
    getQueue() {
        return store.getters.GET_QUEUE;
    }
    setQueue(queue) {
        store.commit('SET_QUEUE', queue);
    }
    checkCurrentExecution(number) {
        let elevatorsList = this.getElevators(); // получение списка лифтов
        for(let elevIsActive of elevatorsList){ // проверка на выполнение задачи другим лифтом
            if(elevIsActive.destinationFloor === this.getQueue()[number].value){
                console.log('Задача уже в очереди');
                return false;
            }
        }

        this.elevatorGetTask(number);
        return true;
    }
    elevatorGetTask(number) {
        for(let elev of this.getElevators()){ // присвоение задачи лифту - если задача не занята другим лифтом
            if(elev.id === number){
                elev.destinationFloor = this.getQueue()[number].value;
            }
        }
    }
    moveDirection(number) {
        if(this.getElevators()[number - 1].currentFloor > this.getQueue()[1].value){ // стрелочки
            let direction = '↓';
            return direction;

        } else if(this.getElevators()[number - 1].currentFloor < this.getQueue()[1].value){
            let direction = '↑';
            return direction;
        } else {
            let direction = ' ';
            return direction;
        }
    }
    moveCycle(status) {
        let allFloors = JSON.parse(JSON.stringify(this.getFloors())); 
        let floorHeight = 'calc(100vh / ' + allFloors.length + ')'; // высота этажа
        let transformSizePerFloor = 'translate(0, calc( ' + Number(status) + ' * ' + floorHeight + '))'; // рассчет расстояния движения лифта
        return transformSizePerFloor;
    }
    setCurrentFloor(number, position) {
        let elevators = this.getElevators();
        for(let elev of elevators){
            if(elev.id === number) {
                elev.currentFloor = position;
                console.log("position: " + position);
            }
        }
        this.setElevators(elevators);
    }
    buttonInactive(number) {
        let floors = this.getFloors(); // кнопка вызова перестает быть активной (лифт доехал на этаж)
        for(let value of floors){
            if (value.id == this.getElevators()[number - 1].destinationFloor - 1) {
                value.active = false;
                this.setFloors(floors);
                localStorage.setItem('Floors', JSON.stringify(floors));
            }
        }
    }
    cleansingQueue() {
        let queue = this.getQueue(); // удаление вызова из очереди
        queue.shift();
        this.setQueue(queue);
        localStorage.setItem('Queue', JSON.stringify(this.getQueue()));
    }
    cleansingElDestination(number) {
        let allElevators = this.getElevators();
        for(let elevID of allElevators){  // удаление точки назначения у лифта
            if(elevID.id === number){
                elevID.destinationFloor = '';
            }
            console.log("Задача лифта сброшена: " + number);
        }
    }

}