/**
 * Created by MaoX on 2016/3/7.
 */
$(function(){
    $('.remove').click(function(e){
        var target = $(e.target);
        var storeId= target.data('store-id');
        var userId = target.data('user-id');
        var tr = $('.item-id-'+userId);

        $.ajax({
            type:'post',
            url:'/admin/store/removeUser',
            data:'storeId='+storeId+'&userId='+userId
        }).done(function(results){
            if(results.success ===1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })
});