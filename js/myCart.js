$(function (){
    // 判断购物车是否有数据
    if (localStorage.getItem('goods')) {
        var goodsArr = JSON.parse(localStorage.getItem('goods'));
        // 加载数据
        $.ajax({
            url: './data/goods.json',
            type: 'get',
            dataType: 'json',
            success: function (jsonArr){
                $.each(goodsArr,function (index,item){
                    $.each(jsonArr,function (i,obj){
                        if (item.code === obj.code) {
                            var goodsDom = `<li>
                                <img src="${obj.imgurl}" alt="">
                                <h3>${obj.title}</h3>
                                <p>${obj.price}</p>
                                <span>${item.num}</span>
                                <em code="${obj.code}">删除</em>
                            </li>`;
                            $('.list').append(goodsDom);
                        }
                    })
                })
            }
        });

        // 删除购物车商品
        $('.list').on('click','li em',function (){

            // 当前商品的编号
            var code = $(this).attr('code');
            // 删除数组元素：pop()  unshift()  splice(start,1)
            $.each(goodsArr,function (index,item){
                if (item.code === code) {
                    goodsArr.splice(index,1);
                    return false;
                }
            });

            if (goodsArr.length > 0) {
                // 把数据更新到本地存储
                localStorage.setItem('goods',JSON.stringify(goodsArr));
            } else {
                localStorage.clear();
                var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
                $('.list').html(newLi);
            }

            // 删除页面的节点
            $(this).parent().remove();
            alert(' 商品成功移出购物车！');
        })
    } else {
        var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
        $('.list').html(newLi);
    }

})
