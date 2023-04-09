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
                    <div v-if="!getQueue[this.number]" class="numb">
                        {{ getQueueEl[0].value }} 
                    </div>
                    <div v-if="getQueue[this.number]" class="numb">
                        {{ getQueue[this.number].value }} 
                    </div>
                </div>
                <div class="current-floor"> {{ currentFloor }} </div>
            </div>
            
        </div>
    </div>
</template>

<script>
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
        }
    },
    computed: {
        getFloorsCount() {
            let arr = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let height = 'calc(100vh / ' + arr.length + ')';
            return height;
        },
        getQueue() {
            return this.$store.getters.GET_QUEUE;
        },
        getQueueEl() {
            return this.$store.getters.GET_QUEUE_EL;
        }
    },
    methods: {
        currentFloorCounter() {
            if(this.currentFloor < this.getQueue[this.number].value){
                let timerId = setInterval(() => this.currentFloor += 1, 1000);
                setTimeout(() => { clearInterval(timerId); this.currentFloor = this.getQueue[this.number].value}, this.getQueue[this.number].id * 1000);
                console.log(this.currentFloor, this.getQueue[this.number].value);

            } else if (this.currentFloor > this.getQueue[this.number].value) {
                let timerId = setInterval(() => this.currentFloor -= 1, 1000);
                setTimeout(() => { clearInterval(timerId); this.currentFloor = this.getQueue[this.number].value}, (this.currentFloor - this.getQueue[this.number].value) * 1000);
                console.log(this.currentFloor, this.getQueue[this.number].value);
            }
            console.log(this.currentFloor + "w" + this.getQueue[this.number].value);
        },
        setIsactive() {
            this.transitionValue = '1s linear';
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
        },
        onMove() {
            this.transitionValue = '1s linear';
            this.backgroundValue = '#3574e8';
            this.colorValue = '#fff';
            setTimeout(this.setIsactive, 3000)
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
                this.transformValue = 'translate(0, calc( -1 * ' + this.getFloorsCount + ' * ' + this.getQueue[this.number].id + '))';
                let firstTime = 0;
                if(this.getQueue[0].value === ''){
                    firstTime = 1;
                } else {
                    firstTime = this.getQueue[0].value
                }
                let time = Math.abs(firstTime - this.getQueue[this.number].value);
                this.transitionValue = time + 's linear';
                this.backgroundValue = '#42aaff';
                this.colorValue = '#fff';
                let timeoutTime = time * 1000;
                
                this.currentFloorCounter();

                setTimeout(this.onMove, timeoutTime);
            }
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
    /* display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box; */
}
.elevator-inside{
    transition: 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    box-sizing: border-box;
}
.elevator-title{
    border: 2px solid#000;
    padding: 5px 10px;
    background: #fff;
    border-radius: 5px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 60%;
    transition: 1s;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    font-size: 30px;
}
.numb{
    margin: auto 0;
}
.current-floor{
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    font-size: 20px;
    margin-top: 40px;
    background: #fff;
    padding: 10px;
    border: 2px solid #000;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
}
</style>