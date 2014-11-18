/*
 * beamDialog 1.0.0
 * Copyright (c) 2014 Beam.Leung  http://about.me/beam
 * Date: 2014-11-18
 * 针对bootstrap V3 模态对话框的二次封装。
 */

(function($) {
	$.fn.beamDialog = function(options) {
		var defaults = {
			title: '对话框',
			content: '内容',
			showCloseButtons: true //显示关闭按钮
			,otherButtons: [] //其他按钮,样式默认,["好的","不好"]
			,otherButtonStyles: [] //其他按钮的样式,['btn-primary','btn-primary']
			,bsModalOption: {} //默认的bootstrap模态对话框参数
			,dialogShow: function() {} //对话框即将显示事件
			,dialogShown: function() {} //对话框已经显示事件
			,dialogHide: function() {} //对话框即将关闭事件
			,dialogHidden: function() {} //对话框已经关闭事件
			,clickButton: function(sender, modal, index) {} //选中按钮的序号,，排除关闭按钮。sender:按钮jquery对象，model:对话框jquery对象,index:按钮的顺序,otherButtons的数组下标.
		}
		var options = $.extend(defaults, options);
		var modalID = '';
		//生成一个唯一的ID
		function random(a, b) {return Math.random() > .5 ? -1 : 1};
		function getModalID() {return "beamDialog-"+['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'q', 'W', 'w', 'E', 'e', 'R', 'r', 'T', 't', 'Y', 'y', 'U', 'u', 'I', 'i', 'O', 'o', 'P', 'p', 'A', 'a', 'S', 's', 'D', 'd', 'F', 'f', 'G', 'g', 'H', 'h', 'J', 'j', 'K', 'k', 'L', 'l', 'Z', 'z', 'X', 'x', 'C', 'c', 'V', 'v', 'B', 'b', 'N', 'n', 'M', 'm'].sort(random).join('').substring(5, 10)};
		//关闭模态框事件
		$.fn.extend({
			closeDialog:function(modal){
				var modalObj = modal;
				modalObj.modal('hide');
			}
		});
		return this.each(function(){
			var obj = $(this);
			modalID = getModalID();
			var tmpHtml= '<div class="modal fade" id="{ID}" tabindex="-1" role="dialog" aria-labelledby="{ID}Label" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="{ID}Label">{title}</h4></div><div class="modal-body"><p>{body}</p></div><div class="modal-footer">{button}</div></div></div></div>';
			var buttonHtml = '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
			if (!options.showCloseButtons && options.otherButtons.length > 0) {buttonHtml = ''};
			//动态创建按钮
			var btnClass = 'cls-' + modalID;
			for (var i=0;i<options.otherButtons.length;i++){
				buttonHtml += '<button type="button" buttonIndex="'+i+'" class="'+btnClass+' btn '+options.otherButtonStyles[i]+'" data-loading-text="执行中...">'+options.otherButtons[i]+'</button>';
			}
			//替换模板标记
			tmpHtml = tmpHtml.replace(/{ID}/g,modalID).replace(/{title}/g,options.title).replace(/{body}/g,options.content).replace(/{button}/g,buttonHtml);
			obj.append(tmpHtml);
			var modalObj = $('#' + modalID);
			//绑定按钮事件,排除关闭按钮
			modalObj.on('click','.' + btnClass,function(){
				var index = $(this).attr('buttonIndex');
				options.clickButton($(this), modalObj, index);
			});
			//绑定本身事件
			//对话框即将显示事件
			modalObj.on('show',function(){options.dialogShow()});
			//对话框已经显示事件
			modalObj.on('shown',function(){options.dialogShown()});
			//对话框即将关闭事件
			modalObj.on('hide',function(){options.dialogHide()});
			//对话框已经关闭事件
			modalObj.on('hidden',function(){options.dialogHidden();modalObj.remove()});
			modalObj.modal(options.bsModalOption);
		});
	};
	$.extend({
		beamDialog: function(options) {
			$("body").beamDialog(options);
		}
	});
})(jQuery);