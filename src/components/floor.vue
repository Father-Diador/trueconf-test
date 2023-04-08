<template>
    <div class="floor">
        <div> {{ floor.name }} </div>
        <div class="floor-btn-outside" @click="setQueue()">
            <div class="floor-btn-inside">
                {{ floor.value }}
                {{ floor.active }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        floor: {
            type: Object,
        }
    },
    methods: {
        setQueue(){
            let queue = this.$store.getters.GET_QUEUE;
            let queueObj = {id: this.floor.id, value: this.floor.value};
            queue.unshift(queueObj);
            console.log(queue);
            this.$store.commit('SET_QUEUE', queue);

            let floors = this.$store.getters.GET_FLOOR_COUNT;
            for(let value of floors){
                if (value.id == this.floor.id) {
                    value.active = true;
                    this.$store.commit('SET_FLOORS', floors);
                    return
                }
            }
        }
    }
}
</script>

<style scoped>
.floor{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 120px;
    background: #fff;
    border: 2px solid #000;
}
.floor-btn-outside{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: 2px solid #000;
}
.floor-btn-inside{
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    border-radius: 50%;
    text-align: center;
}
</style>