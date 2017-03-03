;(function(){
	//获取标签父元素和标签数组
	var tagContainer=document.getElementById('tag-cloud');
	var tags=[];
	var api={
		add:function(opts){
			//默认参数
			var options=[
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
				{content:"标签",href:"###"},
			];
			var setting=[];
			opts?setting=opts:setting=options;
			//创建文档片段
			var tagGroup=document.createDocumentFragment();
			for(var i=0,length=setting.length;i<length;i++){
				var tag=document.createElement("a");
				tag.innerText=setting[i].content;
				tag.setAttribute("href",setting[i].href);
				tag.setAttribute("class","tag");
				tag.style.cssText+="position:absolute;left:0;top:0;text-decoration:none;font-weight:bolder;"
				tagGroup.appendChild(tag);
				tags.push(tag);
			};
			tagContainer.appendChild(tagGroup);
			//让标签元素相对标签云元素绝对定位
			tagContainer.style.position="relative";
			return this;
		},
		config:function(opts){
			//默认参数
			var options={
				radius:200,
				maxFont:30,
				color:true, //设置标签颜色，设置为true为随机颜色，也可以设置其他色值
				rotateAngleXbase:300,//默认旋转速度基数，数越小速度越快
				rotateAngleYbase:300,
				hover:true,//是否开启悬浮联动
			}
			//合并传入的参数和默认参数，最终参数为setting
			var setting={};
			for(prop in options){
				setting[prop]=options[prop];
			}
			for (prop in opts){
				setting[prop]=opts[prop]
			};
			var allTag=[];//标签数组
			var rotateAngleX=Math.PI/setting.rotateAngleXbase;
			var rotateAngleY=Math.PI/setting.rotateAngleYbase;
			function init(r){
				for(var i=0,length=tags.length;i<length;i++){
					if(setting.color === true){
						tags[i].style.color="rgb("+Math.round(255*Math.random())+","+Math.round(255*Math.random())+","+Math.round(255*Math.random())+")";
					}else{
						tags[i].style.color=setting.color;
					}

					// 获取球面上均匀的点的经纬度 θ = arccos( ((2*num)-1)/all - 1); Φ = θ*sqrt(all * π);
					var angleX=Math.acos((2*(i+1)-1)/length-1);
					var angleY=angleX*Math.sqrt(length*Math.PI);
					//根据经纬度获取点的坐标，球中心的点坐标是 (0,0,0) x=r*sinθ*cosΦ   y=r*sinθ*sinΦ   z=r*cosθ;
					var x=r*Math.sin(angleX)*Math.cos(angleY);
					var y=r*Math.sin(angleX)*Math.sin(angleY);
					var z=r*Math.cos(angleX);
					//每个标签对象都有四对值
					var tag={
						x:x,y:y,z:z,ele:tags[i]
					};
					allTag.push(tag);
				}
			}
			//设置每个标签的坐标位置和字体大小以及透明度
			function setPosition(tag,r,maxFont){
				tag.ele.style.transform="translate("+(tag.x+tagContainer.offsetWidth/2-tag.ele.offsetWidth/2)+"px,"+(tag.y+tagContainer.offsetHeight/2-tag.ele.offsetHeight/2)+"px)";
				tag.ele.style.opacity=tag.z/r/2+0.7;
				tag.ele.style.fontSize=(tag.z/r/2+0.5)*maxFont+"px";
			}
			//绕x轴旋转的函数
			function rotateX(tag){
				var cos=Math.cos(rotateAngleX);
				var sin=Math.sin(rotateAngleX);
				var y1=tag.y*cos - tag.z*sin;
				var z1=tag.y*sin + tag.z*cos;
				tag.y=y1;
				tag.z=z1;
			}
			//绕y轴旋转的函数
			function rotateY(tag){
				var cos=Math.cos(rotateAngleY);
				var sin=Math.sin(rotateAngleY);
				var x1=tag.z*sin+tag.x*cos;
				var z1=tag.z*cos-tag.x*sin;
				tag.x=x1;
				tag.z=z1;
			}
			//鼠标悬浮改变转速和方向
			if(setting.hover){
				tagContainer.onmousemove=function(e){
					rotateAngleY=(e.pageX-this.offsetLeft-this.offsetWidth/2)/10000;
					rotateAngleX=-(e.pageY-this.offsetTop-this.offsetHeight/2)/10000;
				}
			}else{
				tagContainer.onmousemove=null;
			}
			init(setting.radius);
			//开始转动的函数
			setInterval(function(){
				for(var i=0;i<tags.length;i++){
					rotateX(allTag[i]);
					rotateY(allTag[i]);
					setPosition(allTag[i],setting.radius,setting.maxFont);
				}
			},17)
		},
	}
	this.tagCloud=api;
})();