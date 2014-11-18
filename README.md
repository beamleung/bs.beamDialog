bootstrap.beamDialog Version:1.0.0
=========

beamDialog 是基于bootstrap V3版本中的modal进行二次封装的结果.主要用于方便的调用modal框体.

* 个人主页: http://about.me/beam
* [Look Demo in JsFiddle:](http://jsfiddle.net/beamleung/m8py5bfL/8/embedded/result/)

参数设置:
-------------
	$.beamDialog(options);
	var defaults = {
		title:'标题',
		content:'内容',
		showCloseButton:true,
		//显示关闭按钮
		otherButtons:[],
		//其他按钮文本，样式默认,["确定","取消"]
		otherButtonStyles:[],
		//其他按钮的样式，['btn-primary','btn-primary'],bootstrap按钮样式
		bsModalOption:{},
		//默认的bootstrap模态对话框参数
		dialogShow:function(){},
		//对话框即将显示事件
		dialogShown:function(){},
		//对话框已经显示事件
		dialogHide:function(){},
		//对话框即将关闭
		dialogHidden:function(){},
		//对话框已经关闭事件
		clickButton:function(sender,modal,index){}
	}

完整例子代码:
-------------
	$.beamDialog({
		title:'系统提示',
		content:'确认删除本条记录?',
		showCloseButton:true,
		otherButtons:["确定","取消"],
		otherButtonStyles:['btn-primary','btn-primary'],
		bsModalOption:{keyboard: true},
		dialogShow:function(){
			alert('即将显示对话框');
		},
		dialogShown:function(){
			alert('显示对话框');
		},
		dialogHide:function(){
			alert('即将关闭对话框');
		},
		dialogHidden:function(){
			alert('关闭对话框');
		},
		clickButton:function(sender,modal,index){
			alert('选中第'+index+'个按钮：'+sender.html());
			$(this).closeDialog(modal);
		}
	});


简单调用例子代码:
-------------
	obj.event function(){
		$.beamDialog({
			title:'系统提示',
			content:'确认删除本条记录?'
		});
	}
