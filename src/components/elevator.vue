<template>
    <div class="elevator" 
        v-bind:style="{ transform: transformValue, background: backgroundValue, transition: transitionValue}"
    >
        <div class="elevator-title"
            v-bind:style="{ color: colorValue}"
        > 
            {{ direction }}
            <div v-if="!getQueue[this.number]">
                {{ getQueueEl[0].value }} 
            </div>
            <div v-if="getQueue[this.number]">
                {{ getQueue[this.number].value }} 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        number: {
            type: String,
        }
    },
    data() {
        return {
            transformValue: 'translate(0, calc(-120px * 0))',
            backgroundValue: '#ccc',
            transitionValue: '1s',

            colorValue: '#000',

            start: true,
            direction: '',
        }
    },
    computed: {
        getQueue() {
            return this.$store.getters.GET_QUEUE;
        },
        getQueueEl() {
            return this.$store.getters.GET_QUEUE_EL;
        }
    },
    methods: {
        setIsactive() {
            this.backgroundValue = '#ccc';
            this.colorValue = '#000';
            
            let floors = this.$store.getters.GET_FLOOR_COUNT;
            for(let value of floors){
                if (value.id == this.getQueue[this.number].id) {
                    value.active = false;
                    this.$store.commit('SET_FLOORS', floors);
                }
            }

            let queue = this.$store.getters.GET_QUEUE;
            queue.shift();
            this.$store.commit('SET_QUEUE', queue);
            this.start = true;
        }
    },
    beforeUpdate(){
            if(this.getQueue[this.number] && this.start === true) {
                if(this.getQueue[this.number].id < this.getQueue[0].id){
                    this.direction = '↓';
                } else{
                    this.direction = '↑';
                }
                this.start = false;
                this.transformValue = 'translate(0, calc(-120px * ' + this.getQueue[this.number].id + '))';
                let firstTime = 0;
                if(this.getQueue[0].value === ''){
                    firstTime = 1;
                } else {
                    firstTime = this.getQueue[0].value
                }
                let time = Math.abs(firstTime - this.getQueue[this.number].value);
                this.transitionValue = time + 's';
                this.backgroundValue = '#808080';
                this.colorValue = '#fff';
                let timeoutTime = 3000 + (time * 1000);
                console.log(timeoutTime);
                setTimeout(this.setIsactive, timeoutTime)
            }

    }
}
</script>

<style scoped>
.elevator{
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
.elevator-title{
    transition: 1s;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    font-size: 30px;
}
</style>