<template>
    <div class="article container">
        <p class="article-title">{{ $t('staties') }}</p>
        <div class="article__content">
            <div v-for="(item, idx) in articles" :key="item" class="article__content-card">
                <FillingCard  :feeling="filling[idx]" :data="item" @showArticle="showArticle" :idx="idx"/>
            </div>
        </div>
    </div>
    
    <ArticleComponent
        v-if="isShowArticle"
        :article="article"
        @close="hideArticle"
    />
</template>
<script>
import ArticleComponent from "@/components/alert/article.vue";
import FillingCard from '@/components/FillingCard.vue';
import filling from '@/data/filling.json'

export default {
    components: { FillingCard, ArticleComponent },
    data() {
        return {
            isShowArticle: false,
            filling: filling.filling,
            articles: [],
            article: false
        }
    },
    methods: {
        showArticle(article) {
            this.article = article;
            this.isShowArticle = true;
        },
        hideArticle() {
            this.isShowArticle = false;
        },
    },
    mounted() {

        this.$axios.get("article")
            .then(res => {
                this.articles = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },
}
</script>
<style lang="scss" scoped>
.article {
    margin-top: 56px;
    margin-bottom: 76px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 768px) {
        padding: 20px 0;
        margin-top: 80px;
        margin-bottom: 136px;
    }
    &-title {
        color: #1C194E;
        font-weight: 700;
        font-size: 36px;
        text-align: center;
    }
    &__content {
        margin-top: 16px;
        background: #FFFFFF;
        padding: 64px 64px;
        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
        border-radius: 24px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 32px;
        @media screen and (max-width: 768px) {
            padding: 12px;
        }
        &-card {
            width: 32%;
            @media screen and (max-width: 768px) {
                width: 49%;
            }
        }
    }
}
</style>