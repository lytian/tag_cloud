# tag_cloud
百度前端技术学院的第三个作业 3D 标签云

使用方法：

1. 标签元素需要有类名 "tag"

2. 标签元素需要包裹在 id 为 "tag-cloud"的父元素下

3. 需要加载 tagCloud.js文件

4. 参数：
<pre><code>
tagCloud.config({
	  radius:number  球体的半径，默认为200，
	  maxFont：number 最大的标签的字体大小，默认为30,
	  color：true|色值 标签字体颜色，如果为true则都是随机颜色，如果是色值，标签就是这个颜色
	  rotateAngleXbase：number 默认旋转速度基数，数越小速度越快，默认为300
	  rotateAngleYbase：number 同上
	  hover：boolean 是否开启悬浮联动， 默认为true
})
</code></pre>
