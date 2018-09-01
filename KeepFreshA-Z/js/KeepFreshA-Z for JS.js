$(function () {
	var A_Z=$('.A_Z');
//	设置宽高
	$('.wapper').css({'height':$(window).height(),'width':$(window).width()});
	A_Z.children('li').css({'height':A_Z.height()/4,'width':A_Z.width()/7});
//	给每一个对应的li添加类名,并且插入一张图片
	var sub=[];
	var color=['rgba(20,48,69,0.9)','rgba(160,183,195,0.9)','rgba(190,73,46,0.9)','rgba(2,178,173,0.9)','rgba(169,180,191,0.9)','rgba(246,129,115,0.9)','rgba(20,64,65,0.9)','rgba(137,142,145,0.9)','rgba(108,127,65,0.9)','rgba(125,111,62,0.9)','rgba(228,182,103,0.9)','rgba(16,43,62,0.9)','rgba(108,20,27,0.9)','rgba(184,74,46,0.9)','rgba(128,165,165,0.9)','rgba(1,164,161,0.9)','rgba(3,163,158,0.9)','rgba(180,71,44,0.9)','rgba(106,56,33,0.9)','rgba(40,36,38,0.9)','rgba(31,45,45,0.9)','rgba(242,141,174,0.9)','rgba(170,65,46,0.9)','rgba(43,34,36,0.9)','rgba(236,177,196,0.9)','rgba(177,199,210,0.9)','rgba(131,148,175,0.9)'];
	A_Z.children('li').each(function (i) {
		sub.push($(this).text());
		$(this).addClass(sub[i]);//添加类名结束
		if (i==0 || i==27) {
			if (i==27) {
				$(this).on('click',function () {
					window.location.href="../其他网页/小游戏/小游戏主页.html";
				})
			} else{
				$(this).on('click',function () {
					window.location.href="../Keep Fresh.html";
				})
			}			
		}else{
			$(this).on('click',tiaozhuan)
			function tiaozhuan() {
				window.location.href="A-Z/"+i+".html";
			};
		}
		if (i < A_Z.children('li').length-1) {//除开最后一个,其他的都添加上图片和DIV并且清除内容
			$(this).text('');
			$(this).append($('<img src="img/'+i+'.jpg"/>'));
			$(this).append($('<div></div>'));
			$(this).children('div').css('background-color',color[i]);
			$(this).on('mouseenter mouseleave',function (e) {
				var w = $(this).width();
				var h = $(this).height();
				var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
				var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
				var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
				if (e.type=='mouseenter') {//进入
					$('<embed src="../sings/商务简短提示音.mp3" hidden="true" class="embed_hover"/>').appendTo($('body'));
					$(this).children('div').stop().animate({
						'fontSize':'40px',
						'fontWeight':'700',
						'lineHeight':'280%',
					},120,function () {
						//为0上,1右,2为下,3为左
						if (direction==0) {
							$(this).css({
								'top':'0',
								'left':'0'
							}).stop().animate({
								'top':'100%',
								'left':'0'
							},170)
						}
						if (direction==2) {
							$(this).css({
								'top':'0',
								'left':'0'
							}).stop().animate({
								'top':'-100%',
								'left':'0'
							},170)
						}
						if (direction==1) {
							$(this).css({
								'top':'0',
								'left':'0'
							}).stop().animate({
								'top':'0',
								'left':'-100%'
							},170)
						}
						if (direction==3) {
							$(this).css({
								'top':'0',
								'left':'0'
							}).stop().animate({
								'top':'0',
								'left':'100%'
							},170)
						}						
					})
				}else{//离开
					$('.embed_hover').remove();
					$(this).children('div').stop().animate({
						'font-size':'88px',
						'font-weight': '900',
						'line-height':'174%'
					},120,function () {
						if (direction==0) {
							$(this).css({
								'top':'100%',
								'left':'0'
							}).stop().animate({
								'top':'0',
								'left':'0'
							},170)
						}
						if (direction==2) {
							$(this).css({
								'top':'-100%',
								'left':'0'
							}).stop().animate({
								'top':'0',
								'left':'0'
							},170)
						}
						if (direction==1) {
							$(this).css({
								'top':'0',
								'left':'-100%'
							}).stop().animate({
								'top':'0',
								'left':'0'
							},170)
						}
						if (direction==3) {
							$(this).css({
								'top':'0',
								'left':'100%'
							}).stop().animate({
								'top':'0',
								'left':'0'
							},170)
						}						
					})
				}
			})
		}		
	})
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
//添加字幕
$.each(A_Z.children('li'), function(i) {
	if (0 < i && i < A_Z.children('li').length-1) {
		$(this).children('div').text(sub[i])
	}
})
//右下角的小飞机
	$('.game_plan').hover(function () {
		var t=parseInt($('.game_plan').css('background-position-y'));
		timer=setInterval(run,25)
		function run() {
			t--;
			$('.game_plan').css('background-position-y',t)
		}
	},function () {
		clearInterval(timer)
	})
});

























