<template>
    <div class="feeling" :class="customClass" :style="{ backgroundImage: 'url(' + require('@/assets/images/cards/'+ feeling.image +'.png') + ')' }"  @click="$emit('showArticle', data)">
        <p class="feeling-p1">{{ data.title }}</p>
        <p class="feeling-p2" v-if="feeling.text">{{ data.description }}</p>
    </div>
</template>
<script>
export default {
    props: ['feeling', 'customClass', 'data', 'idx'],
    data() {
        return {
            isLoading: false,
            feelings: [],
            selectedItemIndex: 0,
        }
    },
    mounted() {
        this.loadAllFeelings();
    },
    methods: {
        loadAllFeelings() {
         this.feelings = JSON.parse(localStorage.getItem('myFeelings')) || []
        },
    }
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
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #5353C9;
        border-radius: 20px;
        color: white;display: -webkit-box;
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