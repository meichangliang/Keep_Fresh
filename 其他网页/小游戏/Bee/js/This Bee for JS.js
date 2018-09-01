var gkNum=0;
window.onload=function () {
	var oBtn=document.getElementById('gameBtn');
	oBtn.onclick=function () {
		this.style.display='none';
		Game.init('div1');  //调用Game对象中的init对象，开始游戏GOGOGOGO!!
	}
};
var Game = {		//创建对象开始游戏相关数据
	oEnemy : {		//敌人的数据
		e1 : { style : 'enemy1' , blood : 1 , speed : 5 , score : 1  },
		e2 : { style : 'enemy2' , blood : 2 , speed : 7 , score : 2  },
		e3 : { style : 'enemy3' , blood : 3 , speed : 10 , score : 3  },
	},
	gk : [ 	//关卡的数据
	 	{
	 		eMap : [	//第一关
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 		],
	 		colNum : 10,
	 		iSpeedX : 10,
	 		iSpeedY : 10,
	 		times : 2000
	 	},
	 	{
	 		eMap : [	//第二关
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 		],
	 		colNum : 10,
	 		iSpeedX : 10,
	 		iSpeedY : 10,
	 		times : 2000
	 	},
	 	{
	 		eMap : [	//第三关
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 		],
	 		colNum : 10,
	 		iSpeedX : 10,
	 		iSpeedY : 10,
	 		times : 2000
	 	},
	 	{
	 		eMap : [	//第四关
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 		],
	 		colNum : 10,
	 		iSpeedX : 10,
	 		iSpeedY : 10,
	 		times : 2000
	 	},
	 	{
	 		eMap : [	//第五关
	 			'e2','e3','e3','e3','e2','e2','e3','e3','e3','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 			'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
	 		],
	 		colNum : 10,
	 		iSpeedX : 10,
	 		iSpeedY : 10,
	 		times : 2000
	 	}
	],
	air : {		//飞机的数据
		style : 'air1',
		bulletsyle : 'bullet'
	},
	init : function (id) {		//初始化，调用函数开始游戏
		this.oParent = document.getElementById(id);
		this.createScore();		//积分
		this.createEnemy(0);	//敌人
		this.createAir();		//飞机
	},
	createScore : function () {		//积分的创建
		var oS = document.createElement('div');
		oS.id = 'score';
		oS.innerHTML = '积分：<span>0</span>';
		this.oParent.appendChild(oS);
		this.oSNum = oS.getElementsByTagName('span')[0];
	},
	createEnemy : function (iNow) {		//创建敌人
		if (this.oUl) {		//判断是否存在敌人
			clearInterval(this.oUl.timer);		//清除敌人移动的定时器
			this.oParent.removeChild(this.oUl);		//删除全部敌人
		}
		console.log('第'+(iNow+1)+'关');		//在文档的title里面添加关卡显示
		var gk = this.gk[iNow];		//调用对象里面的关卡数据
		var arr = [];		//创建数组放置敌人数据
		var oUl = document.createElement('ul'); 		//创建ul用来放置敌人
		oUl.id = 'bee';		//设置ID调用CSS样式表
		oUl.style.width = gk.colNum * 40 + 'px';
		this.oParent.appendChild(oUl);
		oUl.style.left = (this.oParent.offsetWidth - oUl.offsetWidth)/2 + 'px';
		this.oUl = oUl;
		for (var i=0;i<gk.eMap.length;i++) {
			var oLi = document.createElement('li');
			oLi.className = this.oEnemy[ gk.eMap[i] ].style;
			oLi.blood = this.oEnemy[ gk.eMap[i] ].blood;
			oLi.speed = this.oEnemy[ gk.eMap[i] ].speed;
			oLi.score = this.oEnemy[ gk.eMap[i] ].score;
			oUl.appendChild(oLi);
		}
		this.aLi = oUl.getElementsByTagName('li');
		
		for (var i=0;i<this.aLi.length;i++) {
			arr.push([this.aLi[i].offsetLeft,this.aLi[i].offsetTop]);
		}
		
		for (var i=0;i<this.aLi.length;i++) {
			this.aLi[i].style.position = 'absolute';
			this.aLi[i].style.left = arr[i][0] + 'px';
			this.aLi[i].style.top = arr[i][1] + 'px';
		}		
		this.runEnemy(gk);
	},
	runEnemy : function (gk) {	//移动敌人
		var This = this;
		var L = 0;
		var R = this.oParent.offsetWidth - this.oUl.offsetWidth;
		this.oUl.timer = setInterval(function () {
			if ( This.oUl.offsetLeft > R) {
				gk.iSpeedX *=-1;
				This.oUl.style.top = This.oUl.offsetTop + gk.iSpeedY + 'px';
			} 
			else if( This.oUl.offsetLeft < L){
				gk.iSpeedX *=-1;
				This.oUl.style.top = This.oUl.offsetTop + gk.iSpeedY + 'px';
			}
			This.oUl.style.left = This.oUl.offsetLeft + gk.iSpeedX + 'px';
			
		},200);
		setInterval(function () {
			This.oneMove();
		},gk.times);
	},
	createAir : function () {	//飞机的创建
		var oA = document.createElement('div');
		oA.className = this.air.style;
		this.oA = oA;
		this.oParent.appendChild(oA);
		oA.style.left = (this.oParent.offsetWidth - oA.offsetWidth)/2 + 'px';
		oA.style.top = this.oParent.offsetHeight - oA.offsetHeight + 'px';
		this.bindAir();
	},
	oneMove : function(){		//敌机单兵作战
		var nowLi = this.aLi[Math.floor( Math.random()*this.aLi.length)];	//随机其中一个敌机
		var This = this;
		nowLi.timer = setInterval(function () {
			//计算敌机的速度和方向
			var a = (This.oA.offsetLeft + This.oA.offsetWidth/2) - (nowLi.offsetLeft + nowLi.parentNode.offsetLeft + This.oA.offsetWidth/2);
			var b = (This.oA.offsetTop + This.oA.offsetHeight/2) - (nowLi.offsetTop + nowLi.parentNode.offsetTop + This.oA.offsetHeight/2);
			var c = Math.sqrt(a*a+b*b);
			//则
			var isX = nowLi.speed * a/c;
			var isY = nowLi.speed * b/c;
			//那么移动的敌机轨迹则为
			nowLi.style.left = nowLi.offsetLeft + isX +'px';
			nowLi.style.top = nowLi.offsetTop + isY +'px';
			//如果碰到就死亡,弹出，刷新浏览器
			if (This.pz(This.oA,nowLi)) {
				alert('游戏结束');
				window.location.reload();
			}			
		},30)
	},
	bindAir : function () {		//操作飞机
		var timer,timer2;
		var $$ = '可以执行',$$2 = '可以执行';
		var iNum = 0;
		var This = this;
		document.onkeydown = function (e) {
			var e = e || window.event;
			if ($$ == '可以执行') {
				clearInterval(timer);
				timer = setInterval(show,30);
				$$ = '不可执行';
			}			
			if (e.keyCode == 37) {
				iNum = 1;
			}
			else if(e.keyCode == 39){
				iNum = 2;
			}
			//  	空格
	    	if (e.keyCode==32) {
	    		if ($$2 == '可以执行') {
	    			clearInterval(timer2);
	    			timer2 = setInterval(function () {
	    				This.createBullet();
	    			},130);
	    			$$2 = '不可执行';
	    		}
	    	}
		};
		document.onkeyup = function (e) {
			var e = e || window.event;
			if (e.keyCode==39 || e.keyCode==37) {
     			clearInterval(timer);
     			$$ = '可以执行';
    		}
			if (e.keyCode==32) {	//空格
     			clearInterval(timer2);
     			This.createBullet();
     			$$2 = '可以执行';
     		}
//			if (e.keyCode == 32) {	//发射子弹子弹
//				This.createBullet();
//			}
		}
		function show () {
			if (iNum==1) {
				This.oA.style.left = This.oA.offsetLeft - 10 + 'px';
				if (This.oA.offsetLeft	<=	0) {	//判断是否超出边缘
					This.oA.style.left = This.oA.style.width;
				}
			} else if (iNum==2) {
				This.oA.style.left = This.oA.offsetLeft + 10 + 'px';
				if (This.oA.offsetLeft >= This.oParent.offsetWidth - This.oA.offsetWidth) {
					This.oA.style.left = This.oParent.offsetWidth - This.oA.offsetWidth + "px";
				}
			}
		}
	},
	createBullet : function xx() {	//创建子弹
		console.log(this.air.bulletsyle);
		var oB = document.createElement('div');
		oB.className = 'bullet';
		this.oParent.appendChild(oB);
		oB.style.left = this.oA.offsetLeft + this.oA.offsetWidth/2 +'px';
		oB.style.top = this.oA.offsetTop + 10 +'px';
		this.runBullet(oB);
	},
	runBullet : function (oB) {		//子弹运动
		var This = this ;
		oB.timer = setInterval(function () {
			if (oB.offsetTop < -10) {
				clearInterval(oB.timer);
				This.oParent.removeChild( oB);
			}else{
				oB.style.top = oB.offsetTop - 10 + 'px';				
			}
			for (var i=0;i<This.aLi.length;i++) {	////碰撞检测调用
				if(This.pz(oB,This.aLi[i])){
					if (This.aLi[i].blood == 1) {
						clearInterval(This.aLi[i].timer);
						This.oSNum.innerHTML = parseInt(This.oSNum.innerHTML) + This.aLi[i].score;						
						This.oUl.removeChild(This.aLi[i]);
					} else{
						This.aLi[i].blood--;
					}					
					clearInterval(oB.timer);
					This.oParent.removeChild( oB );
				}
			}
			if(!This.aLi.length){
				gkNum++;
				This.createEnemy(gkNum);
			}
		},30)
	},
	pz : function (obj1,obj2) {	//碰撞检测
		//对象一的边缘值
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.offsetWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetTop + obj1.offsetHeight;
		//对象二得边缘值
		var L2 = obj2.offsetLeft + obj2.parentNode.offsetLeft;
		var R2 = obj2.offsetLeft + obj2.offsetWidth + obj2.parentNode.offsetLeft;
		var T2 = obj2.offsetTop + obj2.parentNode.offsetTop;
		var B2 = obj2.offsetTop + obj2.offsetHeight + obj2.parentNode.offsetTop;
		if (R1<L2 || L1>R2 || B1<T2 || T1>B2) {
			return false;
		} else{
			return true;
		};
	}
};