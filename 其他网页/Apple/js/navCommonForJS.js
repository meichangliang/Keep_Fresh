//公共导航栏部分
	//侧边栏的right适应屏幕变化
function IsPC(){  	//判断是否为移动端
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}  
var shopbag_right=$(window).width()-$('.nav-list .shop').offset().left-$(".shopbag").width()/2-6;
$(window).width()<1226?shopbag_right=5:shopbag_right;
$(".shopbag").css('right',shopbag_right);
$(window).on('resize',function () {
	if(IsPC()){
		console.log('目前是PC端');
		window.location.reload();
	}else{
		console.log('目前是移动端');
	}	
	var shopbag_right=$(window).width()-$('.nav-list .shop').offset().left-$(".shopbag").width()/2-6;
	$(window).width()<1226?shopbag_right=5:shopbag_right;
	$(".shopbag").css('right',shopbag_right);
})
//点击弹出购物袋
$('.shop').on('click',function (e) {
	event.stopPropagation();
	$(".shopbag").fadeToggle();
	$('.icon-keen').fadeToggle();
	$('.search-curtain').fadeOut();
	$('.nav-list>li').css({ 'transition':'transform 0.5s', 'transform':'scale(1)','position':''});
})
$(document).on('click',function () {
	event.stopPropagation();
	$(".shopbag").fadeOut();
	$('.icon-keen').fadeOut();
})
//XX按钮
var kk=true;
$('.btn').on('click',function () {
	if (kk==true) {
		$('.btn').css({'top': '-3px', 'transform': 'rotateZ(90deg)'});
		$('.btn-top').css('transform','rotateZ(45deg) translate(5px)');
		$('.btn-bottom').css('transform','rotateZ(-45deg) translate(5px)');
		kk=false;
		$('.nav-common nav').css('transition','background-color 0.4s').css('background-color','#000');
		$('.nav-list').animate({ 'height':$(window).height() });
		$('.nav-list>li').css({ 'transition':'transform 0.5s', 'transform':'scale(1)','position':''});
	}else{
		$('.btn').css({'top': '0px', 'transform': 'rotateZ(0deg)'});
		$('.btn-top').css('transform','rotateZ(0deg) translate(0px)');
		$('.btn-bottom').css('transform','rotateZ(0deg) translate(0px)');
		kk=true;
		$('.nav-common nav').css('transition', 'background-color 2.7s').css('background-color','rgba(0,0,0,0.8)');
		$('.nav-list').animate({ 'height':0 });
		$('.search-curtain').fadeOut();
		$('html').css('overflow','');
	}
})
//搜索按钮
$('.search').on('click',function () {
	$('.nav-list>li').each(function (i) {
		if (i>0 && i<$('.nav-list>li').length-1) {
			$(this).css({ 'transition':'transform 0.5s', 'transform':'scale(0)' });	
			$(this).css({'position':'relative','bottom':'9px'});
			var This=$(this);
			$('.search-curtain>div').on('click',function () {
				This.css({ 'transition':'transform 0.5s', 'transform':'scale(1)','position':''});
			})
		}
		if (i==0) {
			$(this).css({'position':'relative','bottom':'9px'});
			var This=$(this);
			$('.search-curtain>div').on('click',function () {
				This.css({'position':''});						
			})
		}
		if (i==$('.nav-list>li').length-1) {
			var x=$(this).offset().left,y=$(this).offset().right;//获取该元素的位置
			$(this).html('<b class="shop-left"></b><b class="shop-right"></b>');
			$('.nav-list>li:last-child>b').css('top','9px')
			setTimeout(function () {
				$('.shop-right').css({'transform': 'rotateZ(-45deg) translateX(-3.5px)' })
				$('.shop-left').css({'transform': 'rotateZ(45deg) translateX(3.5px)' })
			},1)
			var This=$(this);
			$('.search-curtain>div').on('click',function () {
				setTimeout(function () {
					window.location.reload()
				},500)
				$('.shop-right').css({'transform': '' })
				$('.shop-left').css({'transform': '' })
				This.html('<span class="shop iconfont">&#xe64b;</span><span class="icon-keen"></span>');
			})
		}
		$('.search-curtain>div').css({ 'left':x, 'top':y, })
	})
	$('.search-curtain>div').on('click',function () {	//关闭search-curtain
		$('.search-curtain').fadeOut(300);
		$('html').css('overflow','');
	})
	//打开search-curtain时的动画
	$('.search-curtain').fadeIn(800);
	$('html').css('overflow','hidden');
})
//本地存储
if (!!localStorage.username) {
	$('.Login').html(localStorage.username+' 注销');//将本地的username放到标签里面
	$('.Login').on('click',function () {		//这个时候点击是注销并刷新页面
		localStorage.clear();
		$('.Login').html('登陆');	
		window.location.reload();
		return false;
	})
}else{
	$('.Login').html('登陆');
}
//所有的<a>标签跳转设置
$('a').each(function(){
	$(this).on('click',function () {		
		var name=$(this).text().trim();
		var pattern=/^[\w]+$/i;//只能是字母或者下划线，不区分大小写
		if (pattern.test(name)) {
			window.location.href=name+".html";
		}
	})
})