<template>
    <div class="feeling" :class="customClass" :style="{ backgroundImage: 'url(https://sezin.ams3.digitaloceanspaces.com/' + data.image + ')' }">
    </div>
    <p class="feeling-p2" v-if="data.title">{{ data.title }}</p>
</template>
<script>
export default {
    props: ['data']
}
</script>
<style lang="scss" scoped>
.articSize {
    height: 200px !important;
}
.feeling {
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
    position: relative;
    transition: all 0.5s ease;
    @media screen and (max-width: 768px) {
        height: 250px;
    }
    &-p1 {
        position: absolute;
        top: 10px;
        left: 10px;
        border: 1px solid #252525;
        background: #FFEACC;
        border-radius: 20px;
        font-weight: 500;
        padding: 0 16px;
        font-size: 12px;
        color: #252525;
    }
    &-p2 {
        margin-top: 10px;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        color: #252525;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
}
</style>