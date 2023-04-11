<template>
    <div class="wrapper-set" @click="closeSettings()">
        <div class="settings-window" @click.stop>
            <div class="settings-title">
                Колличество этажей
                <div class="settings-btn-pos">
                    <button class="green" @click="floorsCounter(1)">+</button>
                    <p> {{ floorsCount }} </p>
                    <button class="red" @click="floorsCounter(2)">-</button>
                </div>
            </div>
            <div class="settings-title">
                Колличество лифтов
                <div class="settings-btn-pos">
                    <button class="green" @click="elevCounter(1)">+</button>
                    <p> {{ elevatorsCount }} </p>
                    <button class="red" @click="elevCounter(2)">-</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        floorsCount() {
            let arrFloors = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let countFl = arrFloors.length;
            return countFl;
        },
        elevatorsCount() {
            let arrElevators = JSON.parse(JSON.stringify(this.$store.getters.GET_ELEVATOR_COUNT));
            let countEl = arrElevators.length;
            return countEl;
        }
    },
    methods: {
        closeSettings() {
            this.$emit('create');
        },
        floorsCounter(status) {
            let floors = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let floorsCount =  floors.length;
            if(status === 1){
                if(floorsCount === 10){
                    alert('Достигнута макссимальная величина');
                    return;
                } else {
                    let plusFloor = {id: floorsCount, value: floorsCount + 1, name: floorsCount + 1 + " Floor", active: false};
                    floors.push(plusFloor);
                    console.log(floors);
                }
            } else {
                if (floorsCount === 2) {
                    alert('Достигнута минимальная величина');
                    return;
                } else {
                    floors.pop();
                    console.log(floors);
                }
            }
            this.$store.commit('SET_FLOORS', floors);
        },
        elevCounter(status) {
            let floors = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let floorsCount =  floors.length - 1;

            let elevators = JSON.parse(JSON.stringify(this.$store.getters.GET_ELEVATOR_COUNT));
            let elevatorsCount =  elevators.length;
            console.log(elevatorsCount);
            if(status === 1){
                if(elevatorsCount === floorsCount){
                    alert('Достигнута макссимальное колличество лифтов для колличества этажей');
                    return;
                }
                let plusEl = {id: elevatorsCount + 1};
                elevators.push(plusEl);
                console.log(elevators);
            } else {
                if (elevatorsCount === 1) {
                    alert('Достигнута минимальная величина');
                    return;
                }
                elevators.pop();
                console.log(elevators);
            }
            this.$store.commit('SET_ELEVATORS', elevators);
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper-set{
    z-index: 2;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
}
.settings-window{
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
    width: 60%;
    height: calc(100vh / 2);
    background: #fff;
    border-radius: 10px;
}
.settings-title{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 30%;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 500;
    font-size: 30px;
}
.settings-btn-pos{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    button{
        cursor: pointer;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 600;
        font-size: 30px;
        border: none;
        width: 50px;
        height: 50px;
        color: #fff;
        transition: 0.3s;
    }
}
.green{
    background: #00db6a;
}
.red{
    background: #ff4d00;
}
.green:hover{
    background: #00a851;
}
.red:hover{
    background: #cc3d00;
}
</style>