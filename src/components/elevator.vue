<template>
    <div class="elevator" 
        @click="elevatorMovement()"
        v-bind:style="{ transform: transformValue, background: backgroundValue}"
    >
        <div class="elevator-title"
            v-bind:style="{ color: colorValue}"
        > 
            {{ getQueue[0].value }} 
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transformValue: 'translate(0, calc(-120px * 0))',
            backgroundValue: '#ccc',

            colorValue: '#000',
        }
    },
    computed: {
        getQueue() {
            return this.$store.getters.GET_QUEUE;
        }
    },
    methods: {
        // elevatorMovement() {
        //     if (this.getQueue[0].id == undefined){
        //         return
        //     } else {
        //         this.transformValue = 'translate(0, calc(-120px * ' + this.getQueue[0].id + '))';
        //     }
        //     // let queue = this.$store.getters.GET_QUEUE;
        //     // queue.shift();
        //     // console.log(queue);
        //     // this.$store.commit('SET_QUEUE', queue);

        //     console.log(this.getQueue[0]);
        // }
        setIsactive() {
            this.backgroundValue = 'Red';
            this.colorValue = '#000';
            
            let floors = this.$store.getters.GET_FLOOR_COUNT;
            for(let value of floors){
                if (value.id == this.getQueue[0].id) {
                    value.active = false;
                    this.$store.commit('SET_FLOORS', floors);
                    
                }
            }

            let queue = this.$store.getters.GET_QUEUE;
            queue.pop();
            console.log(queue);
            this.$store.commit('SET_QUEUE', queue);
        }
    },
    beforeUpdate(){
            if (this.getQueue[0].id == undefined){
                return
            } else {
                this.transformValue = 'translate(0, calc(-120px * ' + this.getQueue[0].id + '))';
                this.backgroundValue = '#808080';
                this.colorValue = '#fff';

            }
            if (this.getQueue[1]){
                setTimeout(this.setIsactive, 3000)
            }
    }
}
</script>

<style scoped>
.elevator{
    transition: 1s;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 120px;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
}
/* .movement{
    background: #000;
    transform: translate(0, -120px);
    transition: 1s;
} */
.elevator-title{
    transition: 1s;
    font-size: 30px;
}
/* .elevator-btn-outside{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 50px;
    height: 50px;
} */
/* .elevator-btn-inside{
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    border-radius: 50%;
    text-align: center;
} */
</style>