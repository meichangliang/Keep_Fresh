$(function () {
//	初始化页面位置
	$('body').css('scrollTop','0px');
//	云朵出现在随机的位置
	var Clouds=$('.Clouds');
	var fx=$('.fx');
	Clouds.children('img').each(function(i){
			for (var n=0;n<=i;n++) {
				var x=Math.floor(Math.random()*(Clouds.width()));
			}
			for (var m=0;m<=i;m++) {
				var y=Math.floor(Math.random()*(Clouds.height()));
			}
		$(this).css({
			'top':y,
			'left':x
		})
	});
//	云朵向左边跑动
	Clouds.children('img').each(function begin() {		
		$(this).css('position','relative').animate({
			'left':'-1000px'
		},120000,'linear',function () {
			$(this).css('position','relative').animate({
				'left':'1000px'
			},1,begin)
		})
	})
//ENTER的跳动以及声音
	$('.enter').hover(function () {
		//可以在这里播放点击声音
		$('<embed src="sings/钢琴音.mp3" hidden="true" class="embed_enter"/>').appendTo($('body'));
		$('.s1').stop().animate({
			'top':'-20px'
		},50,orgin)		
		$('.s2').stop().animate({
			'top':'-20px'
		},100,function () {
			$(this).stop().animate({
				'top':'44px'
			},100,orgin)
		})		
		$('.s3').stop().animate({
			'top':'-20px'
		},150,function () {
			$(this).stop().animate({
				'top':'44px'
			},150,orgin)
		})		
		$('.s4').stop().animate({
			'top':'-20px'
		},200,function () {
			$(this).stop().animate({
				'top':'44px'
			},200,orgin)
		})		
		$('.s5').stop().animate({
			'top':'-20px'
		},250,function () {
			$(this).stop().animate({
				'top':'44px'
			},250,orgin)
		})
	},function () {
		$('.embed_enter').remove();
		$('.s1').stop().animate({
			'top':'44px'
		},250,function () {
			$(this).stop().animate({
				'top':'-20px'
			},250,orgin)
		})		
		$('.s2').stop().animate({
			'top':'44px'
		},200,function () {
			$(this).stop().animate({
				'top':'-20px'
			},200,orgin)
		})		
		$('.s3').stop().animate({
			'top':'44px'
		},150,function () {
			$(this).stop().animate({
				'top':'-20px'
			},150,orgin)
		})		
		$('.s4').stop().animate({
			'top':'44px'
		},100,function () {
			$(this).stop().animate({
				'top':'-20px'
			},100,orgin)
		})		
		$('.s5').stop().animate({
			'top':'44px'
		},50,orgin)		
	})		
	function orgin() {
		$(this).stop().animate({
			'top':'12px'
		},150)
	}
//加载动画
function jiazai_img() {
	$('.jiazai_3').fadeToggle(400,function () {
		$('.jiazai_2').fadeToggle(370,function () {
			$('.jiazai_1').fadeToggle(370,jiazai_img)
		})
	})
}
$('.jiazai').children('img').css('top','100%').animate({
	'top':'25%'
},500,function () {
	$(this).animate({
		'top':'35%'
	},200,function () {
		jiazai_img()
	})
})
setTimeout(function () {
	$('.jiazai').children('img').css('top','35%').animate({
		'top':'-100%'
	},500,function () {
		$('.jiazai').fadeOut(500)
	})
},3000)
	setTimeout(function () {
		$('.homeContent').fadeOut(500)
		$('body').stop().animate({
			'scrollTop':'2000'
		},2500,"swing");
	},5000)
//	背景和Home跳动动画	//标记
	setTimeout(function () {
		//背景图片跳动的动画
		$('.homeContent').fadeIn(200);
		$('.homeContentBottom').fadeIn(200);
		$('.homeContentIntro').fadeIn(200);
		$('.img_bg').show();
		$('.img_bg').animate({
			'bottom':'300px'
		},500,"swing",function () {
			$(this).animate({
				'bottom':'-100px'
			},400,"swing",function () {
				$(this).animate({
					'bottom':'50px'
				},300,"swing",function () {
					$(this).animate({
						'bottom':'0px'
					},200)
				})
			})
		})
		//背景跳动动画结束，同时开始执行.homeContentTop, .homeContentIntro , .homeContentBottom的动画
		$('.homeContentTop').animate({
			'top':'200'
		},500,"swing",function () {
			$(this).animate({
				'top':'-100'
			},400,"swing",function () {
				$(this).animate({
					'top':'100'
				},300,"swing",function () {
					$(this).animate({
						'top':'0'
					},200)
				})
			})
		})
//		说明的跳动
		$('.homeContentIntro').animate({
			'top':'200'
		},800,"swing",function () {
			$(this).animate({
				'top':'-100'
			},400,"swing",function () {
				$(this).animate({
					'top':'100'
				},300,"swing",function () {
					$(this).animate({
						'top':'0'
					},200)
				})
			})
		})
//		最后的按钮跳动
		$('.homeContentBottom').animate({
			'top':'400'
		},1000,"swing",function () {
			$(this).animate({
				'top':'-300'
			},800,"swing",function () {
				$(this).animate({
					'top':'300'
				},700,"swing",function () {
					$(this).animate({
						'top':'-200'
					},600,"swing",function () {
						$(this).animate({
							'top':'200'
						},500,"swing",function () {
							$(this).animate({
								'top':'-100'
							},400,"swing",function () {
								$(this).animate({
									'top':'100'
								},300,"swing",function () {
									$(this).animate({
										'top':'-50'
									},200,"swing",function () {
										$(this).animate({
											'top':'50'
										},150,"swing",function () {
											$(this).animate({
												'top':'0'
											},150,"swing",function () {
												$('.smog').fadeIn(9000);//烟雾出现
												fx.fadeIn(8000);//可以在此播放烧火的声音
												$('.img_boy').fadeIn(3000);//可以在此播放尖叫的声音
												$('.mingpai').fadeIn(1000);
												boat_run();
												setTimeout(emb_fx,2000);
												setTimeout(emb_jianjiao,4000);
												setTimeout(emb_huanjing,10000)
												function emb_huanjing() {
													$('<embed src="sings/环境音效.mp3" hidden="true"/>').appendTo($('body'));
												}
												function emb_fx() {
													$('<embed src="sings/烧火的声音.mp3" hidden="true"/>').appendTo($('body'));
												}
												function emb_jianjiao() {
													var emb_jian=$('<embed src="sings/尖叫的声音.mp3" hidden="true"/>');
													emb_jian.appendTo($('body'));
													setTimeout(function () {
														emb_jian.remove()
													},3500)
												}
											})
										})
									})
								})
							})
						})
					})
				})
			})
		})
	},6500)
//	跳动动画结束
//	开始页面背景上的一些小动画
	//	火焰的动画	
junmp_fx();
function junmp_fx() {
	var j_1=0;
	junmp_fx1();
	function junmp_fx1() {
		$('.fx_1').css('background-position-x',j_1)
		j_1-=10;
		if(j_1<=-70){
			j_1=0;
		}
		setTimeout(junmp_fx1,200)
	};
	var j_2=0;
	junmp_fx2();
	function junmp_fx2() {
		$('.fx_2').css('background-position-x', j_2)
		 j_2-=20;
		if(j_2<=-140){
			 j_2=0;
		}
		setTimeout(junmp_fx2,200)
	};
	var j_3=0;
	junmp_fx3();
	function junmp_fx3() {
		$('.fx_3').css('background-position-x',j_3)
		j_3-=30;
		if(j_4<=-210){
			j_3=0;
		}
		setTimeout(junmp_fx3,200)
	};
	var j_4=0;
	junmp_fx4();
	function junmp_fx4() {
		$('.fx_4').css('background-position-x',j_4)
		j_4-=40;
		if(j_4<=-280){
			j_4=0;
		}
		setTimeout(junmp_fx4,200)
	};
	var j_5=0;
	junmp_fx5();
	function junmp_fx5() {
		$('.fx_5').css('background-position-x',j_5)
		j_5-=50;
		if(j_5<=-350){
			j_5=0;
		}
		setTimeout(junmp_fx5,200)
	};
}
	//	火焰出现在父元素随机的位置
	fx.children('div').each(function(i){
			for (var n=0;n<=i;n++) {
				var x=Math.floor(Math.random()*(fx.width()-50));
			}
			for (var m=0;m<=i;m++) {
				var y=Math.floor(Math.random()*(fx.height()));
			}
		$(this).css({
			'top':y,
			'left':x
		})
	});
// 烟雾
var smo=0;
smog_run();
function smog_run() {
	$('.smog').css('background-position-x',smo)
	smo-=95;
	if(smo<=-1330){
		smo=0;
	}
	setTimeout(smog_run,200)
};
//船的动画
function boat_run() {
		$('.boat').fadeIn(1000);
		$('.water').fadeIn(1000);
	$('.boat').animate({
		'bottom': '1.5%',
		'right':'2%'
	},7000,function () {
		$(this).animate({
			'bottom': '1.3%',
			'right':'1.5%'
		},7000,function () {
			$(this).animate({
				'bottom': '1.1%',
				'right':'2.5%'
			},7000,function () {
				$(this).animate({
					'bottom': '0.9%',
					'right':'1.7%'
				},7000,function () {
					$(this).animate({
						'bottom': '0.7%',
						'right':'2.5%'
					},7000,function () {
						$(this).animate({
							'bottom': '0.5%',
							'right':'1.3%'
						},7000,function () {
							$(this).animate({
								'bottom': '0.2%',
								'right':'2.7%'
							},10000,function () {
								$(this).animate({
									'bottom': '-2%',
									'right':'3.5%'
								},70000)
							})
						})
					})
				})
			})
		})
	})
};//船动画结束
//当鼠标碰到名牌的时候
$('.mingpai').on('mouseenter',function () {
	$(this).animate({
		'transform':'rotate(90deg)',
		'bottom':'3%',
		'height':20
	},200)
})
})















