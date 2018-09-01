var index=$('#waper').attr('class');
//获取类名并且根据类名来添加背景图片
$('#waper').css({
	'background':'url('+index+'.jpg) no-repeat top center',
	'height':$(window).height(),
	'width':$(window).width(),
	'background-size': '100%'
})
//给UL下的前三个LI上色
var color=['rgba(20,48,69,0.9)','rgba(160,183,195,0.9)','rgba(190,73,46,0.9)','rgba(2,178,173,0.9)','rgba(169,180,191,0.9)','rgba(246,129,115,0.9)','rgba(20,64,65,0.9)','rgba(137,142,145,0.9)','rgba(108,127,65,0.9)','rgba(125,111,62,0.9)','rgba(228,182,103,0.9)','rgba(16,43,62,0.9)','rgba(108,20,27,0.9)','rgba(184,74,46,0.9)','rgba(128,165,165,0.9)','rgba(1,164,161,0.9)','rgba(3,163,158,0.9)','rgba(180,71,44,0.9)','rgba(106,56,33,0.9)','rgba(40,36,38,0.9)','rgba(31,45,45,0.9)','rgba(242,141,174,0.9)','rgba(170,65,46,0.9)','rgba(43,34,36,0.9)','rgba(236,177,196,0.9)','rgba(177,199,210,0.9)','rgba(131,148,175,0.9)','rgba(20,48,69,0.9)'];
$('#goHome').children('ul').each(function (i) {
	$(this).children('li:lt(3)').css('background-color',color[index-1]);//前三个的颜色
	$(this).children('li:gt(2)').css('background-color',color[parseInt(index)+1]);//后三个的颜色
})
$('.share').css('background-color',color[index]);
$('.about').css('color',color[parseInt(index)+1])
//移动上去之后
$('#goHome').hover(function () {
	$(this).children('ul').first().stop().animate({
		'left':0
	},300)
	$(this).children('ul').first().next().stop().animate({
		'left':0
	},400)
	$(this).children('ul').last().stop().animate({
		'left':0
	},500)
},function () {
	$(this).children('ul').first().stop().animate({
		'left':'-100%'
	},300)
	$(this).children('ul').first().next().stop().animate({
		'left':'-100%'
	},400)
	$(this).children('ul').last().stop().animate({
		'left':'-100%'
	},500)
})
//点击XX关闭about和打开
$('.closeAbout')[0].addEventListener('click',close,false)
function close(){
	$('.about').animate({
		'bottom':'50'
	},300,function () {
		$(this).animate({
			'bottom':'-38%'
		},300)
	})
	this.removeEventListener('click',close,false)
	this.addEventListener('click',open,false)
}
function open(){
	$('.about').animate({
		'bottom':'0'
	},300)
	this.removeEventListener('click',open,false)
	this.addEventListener('click',close,false)
}
//遮罩层
$('.curtain').animate({
	'top':'-100%'
},1200)
$('.curtain_1').animate({
	'top':'0'
},1200)
$('.curtain_2').animate({
	'top':'0'
},1200)
$('#goHome').click(function () {
	$('.curtain').animate({
	'top':'100%'
	},1200)
	$('.curtain_1').animate({
		'bottom':'0'
	},1200)
	$('.curtain_2').animate({
		'bottom':'0'
	},1200)
	setTimeout(function () {
		window.location.href="../KeepFreshA-Z.html";		
	},900)
})
$('#goHome').on('mouseenter',function () {
	$('<embed src="../../sings/钢琴音.mp3" hidden="true" class="embed_enter"/>').appendTo($('body'));
})
$('.shang').on('click',function () {
	console.log('上')
	$('.curtain').animate({
		'top':'100%'
	},1200)
	$('.curtain_1').animate({
		'bottom':'0'
	},1200)
	$('.curtain_2').animate({
		'bottom':'0'
	},1200)
	setTimeout(function () {
		if ((index-1)==0) {
			window.location.href="../KeepFreshA-Z.html";
		} else{
			window.location.href=(index-1)+".html";
		}				
	},900)
})
$('.xia').on('click',function () {
	console.log('下')
	$('.curtain').animate({
		'top':'-100%'
	},1200)
	$('.curtain_1').animate({
		'top':'0'
	},1200)
	$('.curtain_2').animate({
		'top':'0'
	},1200)
	setTimeout(function () {		
		if ((parseInt(index)+1)==27) {
			window.location.href="../../Keep Fresh.html";
		} else{
			window.location.href=(parseInt(index)+1)+".html";
		}				
	},900)
})
$('.btn-slide').hover(function () {
	$('<embed src="../../sings/水滴.mp3" hidden="true" class="embed_hover"/>').appendTo($('body'));
},function () {
	$('.embed_hover').remove()
})