<template>
    <div class="wrapper-set" @click="closeSettings()">
        <div class="settings-window-pos" @click.stop>
            <div class="settings-window">
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
            <div class="error">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import { ConfigManager } from '@/service';

export default {
    data() {
        return{
            error: ' ',
        }
    },
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
            this.error = ConfigManager.floorsCounter(status); 
        },
        elevCounter(status) {
            this.error = ConfigManager.elevCounter(status);
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
.settings-window-pos{
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    height: calc(100vh / 2);
    background: #fff;
    border-radius: 10px;
}
.settings-window{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
    width: 100%;
}
.settings-title{
    width: 45%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 500;
    font-size: 30px;
}
.error{
    font-family: 'Courier New', Courier, monospace;
    font-weight: 500;
    font-size: 25px;
    border: none;
    color: #000;
    transition: 0.3s;
    text-align: center;
}
.settings-btn-pos{
    width: 50%;
    margin-top: 30px;
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