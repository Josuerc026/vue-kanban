<template>
    <header>
        <div class="container">
            <div class="overflow-auto">
                <div class="logo">
                    <img src="https://cdn.onlinewebfonts.com/svg/img_561956.png" alt="kanban project">
                </div>
                <div class="item-count">
                    <span><span class="item">{{ itemCount }}</span> Boards</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "mainHeader",
        props: ['itemCount']
    }
</script>

<style scoped>
header{
    width: 100%;
}
.container{
    width: 75%;
    height: auto;
    margin: 0 auto;
    padding: 10px
}
.overflow-auto{
    overflow: auto;
}
.logo{
    float: left;
    height: 100%;
    padding: 5px 0;
}
.item-count{
    float: right;
    font-weight: bold;
    padding: 5px 0;
}
.item-count .item{
    font-size:1.2rem;
    color: #fff;
    display: block;
    background: black;
}
.logo img{
    width: 50px;
    height: auto;
}
</style>