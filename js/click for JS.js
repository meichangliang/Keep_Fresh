//	Javascript跳转页面和打开新窗口等方法
//1.在原来的窗体中直接跳转用
//window.location.href="你所要跳转的页面";
//2、在新窗体中打开页面用：
//window.open('你所要跳转的页面');
//window.history.back(-1);返回上一页
//3、一些用法
//按钮式：
//<INPUT name="pclog" type="button" value="/GO" onClick="location.href='连接地址'">
//链接式：<a href="javascript:history.go(-1)">返回上一页</a>
//<a href="<%=Request.ServerVariables("HTTP_REFERER")%>">返回上一页</a>
//直接跳转式：
//<script>window.location.href='连接地址';</script>
//开新窗口：
//<a href="/javascript:" onClick="window.open('连接地址','','height=500,width=611,scrollbars=yes,status =yes')">123</a>
//window.open  
//('page.html','newwindow','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,  
//resizable=no,location=no, status=no')  
var about=$('.about');
about.css('height',$(window).height()+30);	
$('.enter').on('click',tiaozhuan);
$('.author').on('click',guanyu);
$('.closeAbout').on('click',close_guanyu)
function tiaozhuan() {
	window.location.href="KeepFreshA-Z/KeepFreshA-Z.html";
};
function  guanyu() {
	about.animate({
		'bottom':'0'
	},700)
	about.children('div').animate({
		'bottom':'0px'
	},900)
	about.children('div').children('div').animate({
		'margin-top':'3%'
	},900,function () {
		$(this).animate({
			'margin-top':'5%'
		},170)
	})
}
function close_guanyu() {
	about.children('div').animate({
		'bottom':'70'
	},170,function () {
		$(this).animate({
			'bottom':'-100%'
		},900)
	})
	setTimeout(function () {
		about.animate({
			'bottom':'-100%'
		},800)
	},600)
}
//当鼠标按住不放的时候文字变成中文
var tr=[]
$('.homeContentIntro').on('mousedown mouseup',function () {
	tr.push($(this).text())
	if (event.type=='mousedown') {
		$(this).text('据说，人在思考的时候，大脑释放的能量可以点亮一盏灯。这里是一个稀奇古怪的世界，欢迎大家来到这里！请保持你新鲜的思维，只有他才能让你的生活充满乐趣，开拓你的思维和眼界，松开你的鼠标尽情的浏览这个世界吧，注意！小心怪物！！')
	} else{
		$(this).text(tr[0])
	}
})
