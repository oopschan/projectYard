
$(function (){

    // 加载商品数据
    $.ajax({
        url: './data/goods.json',
        type: 'get',
        dataType: 'json',
        success: function (jsonArr){
            $.each(jsonArr,function (index,item){
                var goodsDom = `<div class="goods">
                    <img src="${item.imgurl}" alt="">
                    <p>${item.price}</p>
                    <h3>${item.title}</h3>
                    <div code="${item.code}">加入购物车</div>
                </div>`;
                $('.content').append(goodsDom);
            })
        }
    });
    
    // 点击加入购物车
    $('.content').on('click','.goods div', function (){
        // localStorage   key  /  value
        //goods /  [{code: 'abc1',num: 1},{code: 'abc1',num: 1}]
        var goodsArr = [];
        if (localStorage.getItem('goods')) {
            goodsArr = JSON.parse(localStorage.getItem('goods'));
        }
        // 当前商品的编码
        var code = $(this).attr('code');
        // 标记是否已经加入过购物车
        var flag = false;
        $.each(goodsArr,function (index,item){
            if (item.code === code) {
                item.num++;
                flag = true;
                return false;
            }
        })
        // 购物车没有此商品，push {code: 'abc1',num: 1}
        if (!flag) {
            goodsArr.push({"code": code,"num": 1});
        }
        // 数据存储到 localStorage中
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        alert('加入购物车成功！');
    })

})
