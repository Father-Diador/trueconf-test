import store from '@/store';

export class ConfigManager {
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

    floorsCounter(status) {
        if(this.getQueue()[1]){
            let error = 'Лифт находиться в движении, повторите попытку позже!';
            return error;
        }
        let floors = JSON.parse(JSON.stringify(this.getFloors()));
        let floorsCount =  floors.length;

        let elevators = JSON.parse(JSON.stringify(this.getElevators()));
        let elevatorsCount =  elevators.length;
        if(status === 1){
            if(floorsCount === 10){
                let error = 'Достигнута макссимальная величина';
                return error;
            } else {
                let plusFloor = {id: floorsCount, value: floorsCount + 1, name: floorsCount + 1 + " Floor", active: false};
                floors.push(plusFloor);
            }
        } else {
            if (floorsCount === 2 || floorsCount === (elevatorsCount + 3)) {
                let error = 'Достигнута минимальная величина';
                return error;
            } else {
                floors.pop();
            }
        }
        this.setFloors(floors);
        localStorage.setItem('Floors', JSON.stringify(floors));
    }
    elevCounter(status) {
        if(this.getQueue()[1]){
            let error = 'Лифт находиться в движении, повторите попытку позже!';
            return error;
        }
        let floors = JSON.parse(JSON.stringify(this.getFloors()));
        let floorsCount =  floors.length - 1;

        let elevators = JSON.parse(JSON.stringify(this.getElevators()));
        let elevatorsCount =  elevators.length;
        if(status === 1){
            if(elevatorsCount === (floorsCount - 2)){
                let error = 'Достигнута макссимальное колличество лифтов для колличества этажей';
                return error;
            }
            let plusEl = {id: elevatorsCount + 1, destinationFloor: '', currentFloor: '1'};
            elevators.push(plusEl);
        } else {
            if (elevatorsCount === 1) {
                let error = 'Достигнута минимальная величина';
                return error;
            }
            elevators.pop();
        }
        this.setElevators(elevators);
        localStorage.setItem('Elevators', JSON.stringify(elevators));
    }

    deleteLocalStorage() {
        delete localStorage.Elevators;
        delete localStorage.Queue;
        delete localStorage.Floors;
    }
}