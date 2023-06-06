<template>
    <div class="fun">
        <p class="fun-p1">{{ fun.title }}</p>
        <!-- <p class="fun-p2">{{ fun.description }}</p> -->
        <p class="fun-p3">{{ fun.description }}</p>
    </div>
</template>
<script>
export default {
    props: ['fun']
}
</script>
<style lang="scss" scoped>
.fun {
    background: #F8F0FF;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    height: 320px;
    box-sizing: border-box;
    flex-direction: column;
    &-p1 {
        font-weight: 700;
        font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
    }
    &-p2 {
        font-weight: 500;
        font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
        height: 60px;
    }
    &-p3 {
        margin-top: 40%;
        text-align: center;
        width: fit-content;
        font-weight: 400;
        word-break: break-all;
        font-size: 30px;
    }
}
</style>