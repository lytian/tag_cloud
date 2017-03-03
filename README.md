# tag_cloud
百度前端技术学院的第三个作业 3D 标签云

使用方法：

1.需要创建 id 为 tag-cloud 的空元素

2.使用实例 tagCloud.add([]).copnfig({});

3.第一个方法的参数是一个数组，数组的每一项都是对象，每个对象有两对值

<pre><code>
add([
	{
		content:string 每个标签的内容
		href：string 每个标签的链接
	}
])
</code></pre>
4.第二个方法的参数是一个对象，
<pre><code>
config({
	  radius:number  球体的半径，默认为200，
	  maxFont：number 最大的标签的字体大小，默认为30,
	  color：true|色值 标签字体颜色，如果为true则都是随机颜色，如果是色值，标签就是这个颜色
	  rotateAngleXbase：number 默认旋转速度基数，数越小速度越快，默认为300
	  rotateAngleYbase：number 同上
	  hover：boolean 是否开启悬浮联动， 默认为true
})
</code></pre>

