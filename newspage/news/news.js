//复用保存判断标志
var flag = true
//渲染数据
loaddata()
function loaddata(){
    $.ajax({
        type: "post",
        url: "../php/readdata.php",  //同目录下的php文件
        dataType:"json", //声明成功使用json数据类型回调
        success: function(msg){  //请求成功后的回调函数
            let top = ''
            $.each(msg, function(i, data){
            if(data[4]==1){
                top='(置顶)'
            }else{
                top='    '
            }    
            $('.input').after(`
            <div id="` +data[3] +`">
            <input type="checkbox"> <b>`+ data[0] +`</b>    `+top+`   `+ data[1] +`  撰稿人：XXXX
            <a class="D_news">删除</a><a class="E_news">编辑</a> <button class="sbtn">取消发布</button>
            </div>
            `)
            })    
        }
    })
}
//重新加载
function reloaddata(){
    $('#news>div').detach()
    $('.en-input').val('')
    $('textarea').val('')
    loaddata()
}
//----------发布与否
$('#news').on('click', '.sbtn',function(){
   if ($(this).text() === '发布'){
    $(this).text('不发布')
   }else{
    $(this).text('发布')
   }
})
//---------创建新闻功能
$('#C-news').on('click',function(){
    $('#news').toggle();
    $('#editnews').toggle();
    $.ajax({
        type:'post',
        url:'../php/draftnews.php',
        dataType: 'json',
        success: function(msg){
            $('[name="title"]').val( msg[0][0])
            $('[name="time"]').val( msg[0][1])
            $('[name="newscontent"]').val(msg[0][2])
        }
    })
})
// -----创建新闻模块-----
//取消创建新闻
$('#cancel-C').on('click',function(){
    $('#news').toggle();
    $('#editnews').toggle();
    reloaddata()
    flag = true
})
//--------------删除新闻
$('#news').on('click', '.D_news',function(){
    $.ajax({
        type: "post",
        url: "../php/deletedata.php",
        data:"id=" + $(this).parent().attr('id'),
        dataType:"json", //声明成功使用json数据类型回调
        success: function(msg){  //请求成功后的回调函数
            console.log(msg);
        }
    })
    reloaddata()
})
// ---------------编辑新闻
$('#news').on('click', '.E_news',function(){
    flag = false
    $('#news').toggle();
    $('#editnews').toggle();
    $.ajax({
        type:'post',
        url:'../php/eidtnews.php',
        data:'id='+$(this).parent().attr('id'),
        dataType: 'json',
        success: function(msg){
            $('[name="title"]').val( msg[0][0])
            $('[name="time"]').val( msg[0][1])
            $('[name="newscontent"]').val(msg[0][2])
        }
    })
})
//--------------保存新闻
$('#keep').on('click', function(){
    let title = $('[name="title"]').val()
    let time= $('[name="time"]').val()
    let newscontent = $('[name="newscontent"]').val()
    
    let infor = "title="+title+"&time="+time+"&newscontent="+newscontent
    if (title == "" || time =="" || newscontent ==""){
        alert("请输入完整信息")    
    }else{
        if(flag === true){
        $.ajax({
            type: "post",
            url: "../php/createnews.php",
            data:infor,
            success:function(msg){
                alert("保存成功");
                window.location.href="../news/news.html"
            }
        })
        }else{
            $.ajax({
                type: "post",
                url: "../php/updatenews.php",
                data: infor +'&id='+$(this).parent().attr('id'),
                success: function(msg){
                    alert("修改成功");
                    window.location.href="../news/news.html"
                }
            })
            flag = true
        }}
})
//--------------勾选框删除
$('#D-news').on('click', function(){
    if($('input:checkbox:checked').length==0){
        return
    }
    $.each($('input:checkbox:checked').parent(),function(i, data){
        $.ajax({
            type: "post",
            url: "../php/deletedata.php",
            data:"id=" + $(data).attr('id'),
            dataType:"json", //声明成功使用json数据类型回调
            success: function(msg){  //请求成功后的回调函数
                console.log(msg);
            }
        })
    })
    reloaddata()  
})
// -----------勾选框置顶
$('#T-news').on('click', function(){
    $.each($('input:checkbox:checked').parent(),function(i, data){
        $.ajax({
            type: "post",
            url: "../php/topdata.php",
            data:"id=" + $(data).attr('id'),
            dataType:"json", //声明成功使用json数据类型回调
            success: function(msg){  //请求成功后的回调函数
                console.log(msg);
            }
        })
    })
    reloaddata()
})
//-----------搜索信息功能
$('#seach').on('blur', function(){
    if($(this).val().length != 0){
        $.ajax({
            type: "post",
            url: "../php/seachdata.php",
            data:"title=" + $(this).val(),
            dataType:"json", //声明成功使用json数据类型回调
            success: function(msg){  //请求成功后的回调函数
                if(msg.length===0){
                    alert('没有找到相关的信息')
                }else{
                    $('#news>div').detach()
                    let top = ''
                    $.each(msg, function(i, data){
                    if(data[4]==1){
                        top='(置顶)'
                    }else{
                        top='    '
                    }    
                    $('.input').after(`
                    <div id="` +data[3] +`">
                    <input type="checkbox"> <b>`+ data[0] +`</b>    `+top+`   `+ data[1] +`  撰稿人：XXXX
                    <a class="D_news">删除</a><a class="E_news">编辑</a> <button class="sbtn">取消发布</button>
                    </div>
                    `)
                    })
                }   
            }
        })
    }else{
        reloaddata()
    }
})
//-----------存为草稿
$('#draft').on('click', function(){
    let title = $('[name="title"]').val()
    let time= $('[name="time"]').val()
    let newscontent = $('[name="newscontent"]').val()
    
    let infor = "title="+title+"&time="+time+"&newscontent="+newscontent
    $.ajax({
        type: "post",
        url: "../php/keepdraft.php",
        data: infor +'&id='+$(this).parent().attr('id'),
        success: function(msg){
            alert("保存草稿成功");
        }
    })
})
