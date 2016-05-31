var http = require('http');
var html ="";
var songs =[

];
//获取音乐链接
function getSoundUrl(url,callback){
    http.get(url,(res)=>{
        var data = '';
        res.on('data',function(chunk){
            data+=chunk;
        })
        res.on('end',()=>{
            callback(data);
        })
    })
};

$(function(){
    var $searchBtn = $('.btn-search-music');
        $searchBtn.bind('click',function(){

            var $musicText  = $('.music-name');
            var $searchName = $musicText.val();
            if(!$searchName){
                $musicText.css({borderColor:"#dd2726"});
                return false;
            }
            var url = "http://search.kuwo.cn/r.s?all="+$searchName+"&ft=music&itemset=web_2013&client=kt&pn=1&rn=6&rformat=json&encoding=utf8";
            var mp3_url = [];
            $.ajax({
                type:'get',
                async:false,
                url:url,
                dataType:"jsonp",
                success:function(result){
                    if(result.abslist){
                        var list = result.abslist;
                        var acc_url = "";
                        html = '';
                        for(var i=0,l=list.length;i<l;i++){
                            var m_id = list[i]['MUSICRID'];
                            var author_name = list[i]['ARTIST'];
                            var song_name   = list[i]['SONGNAME'];
                            var items  = [];
                            items.push(author_name);
                            items.push(song_name);
                            songs.push(items);
                            acc_url = "http://antiserver.kuwo.cn/anti.s?type=convert_url&rid="+m_id+"&format=aac|mp3&response=url";
                            getSoundUrl(acc_url,function(mp3){
                                mp3_url.push(mp3);
                                if(mp3_url.length == 6){
                                    for (var i = 0 ;i < 6 ; i++) {
                                        html += "<li>"+songs[i][0]+"【"+songs[i][1]+"】<a class='playing'>播放</a><a class='stop'>停止</a></li>";
                                    }
                                    $('.music-list').find('ul').html(html);
                                    $('.playing').each(function($index){
                                        var audio = new Audio(mp3_url[$index]);
                                        $(this).bind('click',function(){
                                            audio.currentTime = 0;
                                            audio.play();
                                        })
                                        $('.stop').eq($index).bind('click',function(){
                                            audio.pause();
                                        })
                                    })
                                }
                            });
                        }
                    }
                }
            })
        })
})