$(document).ready(function(){
    $(".search_text").focusin(function(){//搜索框获得焦点时
        hotShow();
    })
    $(".search_text").click(function(event){//搜索框阻止冒泡
        return false;
    })
    $(document).click(function(){//搜索框点击消失
        hotHide();
    })
    var timer=null;
    $(".search_text").on('input',function(){//热门搜索显示与隐藏
        var judge=$(".search_text").val();
        if(judge.length!=0){
            hotHide();
        }else if(judge.length==0){
            hotShow();
        }
    });

    function hotShow(){//热门搜索显示
        $(".search_hot").css({
            display:"block",
        })
    }
    function hotHide(){//热门搜索隐藏
        $(".search_hot").css({
            display:"none"
        })
    }
    var attr="";
    $(".guide_item").mouseenter(function(){ //header用户状态的颜色切换
        attr=$(this).find("use").attr("xlink:href");
        $(this).find("use").attr("xlink:href",""+attr+"-hover");
    });
    $(".guide_item").mouseleave(function(){
        $(this).find("use").attr("xlink:href",attr);
    });
    $("use").mouseenter(function(){
        var num=$(this).attr("xlink:href");
        if(num.indexOf("hover")==-1){
            $(this).find("use").attr("xlink:href",""+attr+"-hover");
        }
    })
    $(".header_download").hover(function(){ //App下载显示与隐藏
        $(".app_download").show();
    },function(){
        $(".app_download").hide();
    })
    $(".guide_Upload").hover(function(){ //投稿显示与隐藏
        $(".Upload_item").show();
    },function(){
        $(".Upload_item").hide();
    })

    $(".guide_item").each(function(index){//header右上角颜色切换
        $(this).hover(function(){
            $(this).find("i").css("color","#FD4B5C");
        },function(){
            $(this).find("i").css("color","#999");
        })
    })
    $(".header_banner").hover(function(){//point显示隐藏与限制范围
        $(".banner_point").show();
        $(".header_banner").mousemove(function(e){
            var left=e.pageX;
            var top=e.pageY;//获取坐标
            if(top<56){//限制上下
                top=56;
            }else if(top>202){
                top=203;
            }
            var w=$(".banner_point").width()+70;//获取宽度
            var clientW=$(window).width();//获取可视区宽度
            var revise=0;
            if(clientW<(left+w)){//当超出可视区point在左侧显示
                revise=w+20;
                $(".banner_point").addClass("left");//添加左侧
            }else{
                $(".banner_point").removeClass("left");//取消左侧
            }
            $(".banner_point").css({//位置
                "top":top-10+"px",
                "left":left+20-revise+"px",
            })
        })
    },function(){//隐藏
        $(".banner_point").hide();
    })

    $(window).scroll(function(){ //导航条滚动
        navPlay();
    })
    navPlay();
    function navPlay(){//导航条滚动
        var docTop=$(window).scrollTop();
        if(docTop>180){
            $(".nav").css({
                position:"fixed",
                top:"46px",
                background:"#F3F3F3",
                boxShadow:"0 3px 3px rgba(0,0,0,0.1)",
            });
        }else{
            $(".nav").css({
                position: "absolute",
                top:"226px",
                background:"#FFF",
                boxShadow:"none",
            })
        }
    }
    var timer="";
    var tiems="";
    $(".nav_parent a").hover(function(){//nav导航
        if($(".nav_container").width()==980){
            var arr1=[0,0,131,27,213,333,252,399,593,527,749];//item位置980px
        }else{
            var arr1=[0,11,183,92,291,424,356,516,723,670,905];//item位置1160px
        }
        clearTimeout(timer);  //先清定时器
        var num=$(".nav_parent a").index(this);//获取索引
        times=setTimeout(function(){ //等一段时间再开始
            $(".nav_con ul").hide(); //隐藏ul
            $(".nav_con").hide()//
            $(".nav_parent li").removeClass("hover");//删除红色
            $(".nav_item:eq("+(num-2)+")").parent().addClass("hover");//添加颜色
            if(num<2||num>12){//只让对应的item显示
                return;
            }
            $(".nav_con").show();//显示
            $(".nav_con ul:eq("+(num-2)+")").show();//对应的item显示

            $(".nav_con ul:eq("+(num-2)+")").css({//item位置
                marginLeft : ""+arr1[num-2]+"px"
            });
        },100)
    },function(){
        clearTimeout(times);
        timer=setTimeout(function(){
            $(".nav_con").hide();
            $(".nav_parent li").removeClass("hover");
        },1000)
    })
    $(".nav_con").hover(function(){//移到子选项
        clearTimeout(timer);
    },function(){
        timer=setTimeout(function(){//离开子选项
            $(".nav_con").hide();
            $(".nav_parent li").removeClass("hover");
        },1000)
    })
    //轮播图
    $(".slider_count span").click(function(){
        var index=$(this).index();//获取索引值
        move($(".slider"),index,"left");//执行运动
    })
    $(".slider").css("left","0");//将left置于0
    var timer1=null;
    function move(obj,index,attr){
        $(".slider_count span").removeClass("active");
        $(".slider_count span:eq("+index+")").addClass("active");//选择块改变
        var imgW=$(".slider li").width();//获取图片宽度 防止分辨率变化
        var target=-imgW*index;//获取目标
        clearInterval(timer1);
        timer1=setInterval(function(){
            var old=parseFloat($(".slider").css(attr));//每次获取更新的值
            var speed=(target-old)/40; //步长
            speed=speed>0?Math.ceil(speed):Math.floor(speed);//保持整数 最后直接可到达0
            $(".slider").css(attr,old+speed+"px"); //赋值
            if(speed<=0&&speed>-1||speed>=0&&speed<1){//清空
                clearInterval(timer1);
                $(".slider").css(attr,target+"px");
            }
        },2)
    }
    $(".section_1_left").mouseenter(function(){ //移入停止
        clearInterval(timer2);
    })
    $(".section_1_left").mouseleave(function(){//移出启动
        play();
    })
    var timer2=null;
    var inx=0;
    function play(){ //自动运行
        clearInterval(timer2);
        timer2=setInterval(function(){
            inx++;
            if(inx>4){
                inx=0;
            }
            move($(".slider"),inx,"left");
        },4000)
    }
    setTimeout(function(){//延迟运行
        play();
    },5000)

    $(".section_3 .sub_title a").click(function(){//日榜周榜切换
        var index=$(this).index();
        $(".section_3 .sub_title a").removeClass("active");
        $(".section_3 .sub_title a:eq("+index+")").addClass("active");
        $(".section_3 .video_list").hide();
        $(".section_3 .video_list:eq("+index+")").show();
    })

    var timer3=null;
    $(".article_title a").hover(function(){//文章列表切换
        clearTimeout(timer3);
        var index=$(this).index();
        timer3=setTimeout(function(){
            $(".article_title a").removeClass("active");
            $(".article_title a:eq("+index+")").addClass("active");
            $(".article_content").hide();
            $(".article_content:eq("+index+")").show();
        },200)
    },function(){
        clearTimeout(timer3);
        var index=$(".article_title a").index(this);
        timer3=setTimeout(function(){
            $(".article_title a").removeClass("active");
            $(".article_title a:eq("+index+")").addClass("active");
            $(".article_content").hide();
            $(".article_content:eq("+index+")").show();
        },200)
    })

    var timer4=null;
    var onOff=true;
    $(".video_change").click(function(){//换一批按钮旋转样式
        if(onOff){
            onOff=false;
            $(this).addClass("active");
            timer4=setTimeout(function(){
                $(".video_change").removeClass("active");
                onOff=true;
            },1500)
        }
    })
    var timer5=null;

    $(".video_item_first .video_danmu").hover(function(){//视频播放信息上卷下拉
        timer5=setTimeout(function(){
            $(".icon_bf").hide();
        },600)
    },function(){
        clearTimeout(timer5);
        $(".icon_bf").show();
    })
    $(".video_items").mouseenter(function(){
        $(this).find(".video_msg").css("bottom","-20px");
    })
    $(".video_items").mouseleave(function(){
        $(this).find(".video_msg").css("bottom","0");
    })

    $(".column .column_right .sub_title a").click(function(){ //侧边栏周榜日榜
        var index=$(this).index();
        $(this).parent().find("a").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".column_right").find(".video_side").hide();
        $(this).closest(".column_right").find(".video_side:eq("+index+")").show();
    })
    var time= new Date();//根据星期同步显示
    var w=time.getDay();
    var week=[6,0,1,2,3,4,5];
    $(".box_line").removeClass("active");
    $(".box_line:eq("+week[w]+")").addClass("active");

    $(".s5_sub_title a").click(function(){//番剧切换
        var index=$(this).index();
        $(".s5_sub_title a").removeClass("active");
        $(this).addClass("active");
        $(".column_box").hide();
        $(".column_box:eq("+index+")").show();
    })

    $(".ofc_img").mouseenter(function(){
        $(this).find("img").show();
    });
    $(".ofc_img").mouseleave(function(){
        $(this).find("img").hide();
    });

    function change_img(){ //ac表情切换
        var pic=Math.floor(Math.random()*54+1);
        $(".footer_ac img").attr("src","http://cdn.aixifan.com/dotnet/20130418/umeditor/dialogs/emotion/images/ac/"+pic+".gif")
    }
    change_img();
    var num_ac=1;
    $(".footer_ac").click(function(){//表情点击与动画
        $(".footer_ac .num").show();
        $(this).find(".num").html(num_ac);
        num_ac++;
        var spans=$("<span class='num_click' style='opacity:0;'>+1 click</span>")
        spans.animate({
            opacity: '1',
            top: '-25px',
        },250)
        setTimeout(function(){
            spans.animate({
                opacity: '0',
                top: '-40px',
            },250)
        },1200)
        $(".footer_ac").append(spans);
    })
    
})
