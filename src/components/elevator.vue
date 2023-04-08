<template>
    <div class="elevator">
        <div class="elevator-title"> 1 </div>
        <div class="elevator-btn-outside">
            2
        </div>
    </div>
</template>

<script>
export default {
    props: {
        floor: {
            type: Object,
        }
    }
}
</script>

<style scoped>
.elevator{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 120px;
    background: #fff;
    border: 2px solid #000;
}
.elevator-title{
    
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