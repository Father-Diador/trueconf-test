import store from '@/store';

export class FloorManager {
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
    setTaskInQueue(floor) {
        let queue = this.getQueue(); // получение очереди вызовов
        if(queue[1]){
            for(let singleRow of queue){
                if(singleRow.id === floor.id && singleRow.value === floor.value){
                    if(queue[0].id != floor.id && queue[0].value != floor.value){
                        return
                    }
                }
            }
        }
        
        let queueObj = {id: floor.id, value: floor.value}; // добавление вызова в очередь
        queue.push(queueObj);
        this.setQueue(queue);
        localStorage.setItem('Queue', JSON.stringify(queue));

        let floors = this.getFloors(); // смена кнопки этажа на активную
        for(let value of floors){
            if (value.id === floor.id) {
                value.active = true;
                this.setFloors(floors);
                localStorage.setItem('Floors', JSON.stringify(floors));
                return
            }
        }
    }
}