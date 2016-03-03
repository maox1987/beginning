/**
 * Created by MaoX on 2016/3/1.
 */

$(function(){
   /* var target = $('.pageUI');
    var current = target.data('current');
    var total = target.data('page');
    var count = target.data('count');
    var url = target.data('url');

    var i=0;
    var ul = '<ul class="pagination">';*/
    var url = "/admin/user/list";
    $('.mx').on('click',function(e){
        var target = $(e.target);

        $.get(url,{page:target.data('page')});
    });
   // ul.append('<li ')
});