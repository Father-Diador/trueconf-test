<template>
    <div class="floor"
        v-bind:style="{ height: getFloorsCount }"
    >
        <div> {{ floor.name }} </div>
        <div class="floor-btn-outside" 
            @click="setQueue()"
            v-bind:class="{ active: floor.active }"
        >
            <div class="floor-btn-inside">
                <div class="floor-btn-circle"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { FloorManager } from '@/service';

export default {
    props: {
        floor: {
            type: Object,
        }
    },
    computed: {
        getFloorsCount() {
            let arr = JSON.parse(JSON.stringify(this.$store.getters.GET_FLOOR_COUNT));
            let height = 'calc(100vh / ' + arr.length + ')';
            return height;
        }
    },
    methods: {
        setQueue(){
            FloorManager.setTaskInQueue(this.floor);
        }
    }
}
</script>

<style lang="scss" scoped>
.floor{
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    font-size: 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    // height: 120px;
    background: #fff;
    border: 2px solid #000;
}
.floor-btn-outside{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 60px;
    height: 60px;
    border: 2px solid #000;
    border-radius: 5px;
    transition: 0.3s;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.floor-btn-outside:hover{
    -webkit-box-shadow: -4px -4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -4px -4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: -4px -4px 8px 0px rgba(34, 60, 80, 0.2);
}
.active{
    border: 2px solid #ff4e33;
    -webkit-box-shadow: -4px -4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -4px -4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: -4px -4px 8px 0px rgba(34, 60, 80, 0.2);
    .floor-btn-inside{
        border: 3px solid #ff4e33;
    }
    .floor-btn-circle{
        background: #ff4e33;
    }
}
.floor-btn-inside{
    transition: 0.3s;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 3px solid #000;
    border-radius: 50%;
}
.floor-btn-circle{
    transition: 0.3s;
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
}
</style>