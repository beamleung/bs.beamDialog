/*
 * beamDialog 1.0.18
 * Copyright (c) 2014 Beam.Leung  http://about.me/beam
 * Date: 2014-11-18
 * 针对bootstrap V3 模态对话框的二次封装。
 */

(function($) {
	$.fn.beamDialog = function(options) {
		var defaults = {
			title: '标题',
			content: '<p>内容</p>',
			showCloseButton: true,
			otherButtons: [],
			otherButtonStyles: [],
			bootstrapModalOption: {},
			dialogShow: function() {},
			dialogShown: function() {},
			dialogHide: function() {},
			dialogHidden: function() {},
			clickButton: function(sender, modal, index) {}
		};
		options = $.extend(defaults, options);
		var modalID = '';

		//生成一个惟一的ID
		function random(a, b) {
			return Math.random() > 0.5 ? -1 : 1;
		}

		function getModalID() {
			return "beamDialog-" + ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'q', 'W', 'w', 'E', 'e', 'R', 'r', 'T', 't', 'Y', 'y', 'U', 'u', 'I', 'i', 'O', 'o', 'P', 'p', 'A', 'a', 'S', 's', 'D', 'd', 'F', 'f', 'G', 'g', 'H', 'h', 'J', 'j', 'K', 'k', 'L', 'l', 'Z', 'z', 'X', 'x', 'C', 'c', 'V', 'v', 'B', 'b', 'N', 'n', 'M', 'm'].sort(random).join('').substring(5, 20);
		}

		$.fn.extend({
			closeDialog: function(modal) {
				var modalObj = modal;
				modalObj.modal('hide');
			}
		});

		return this.each(function() {
			var obj = $(this);
			modalID = getModalID();
			var tmpHtml = '<div class="modal fade" id="{ID}" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button><h6 class="modal-title">{title}</h6></div><div class="modal-body">{body}</div><div class="modal-footer">{button}</div></div></div></div>';
			var buttonHtml = '<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>';
			if (!options.showCloseButton && options.otherButtons.length > 0) {
				buttonHtml = '';
			}
			//生成按钮
			var btnClass = 'cls-' + modalID;
			for (var i = 0; i < options.otherButtons.length; i++) {
				buttonHtml += '<button buttonIndex="' + i + '" class="' + btnClass + ' btn ' + options.otherButtonStyles[i] + '">' + options.otherButtons[i] + '</button>';
			}
			//替换模板标记
			tmpHtml = tmpHtml.replace(/{ID}/g, modalID).replace(/{title}/g, options.title).replace(/{body}/g, options.content).replace(/{button}/g, buttonHtml);
			obj.append(tmpHtml);

			var modalObj = $('#' + modalID);
			//绑定按钮事件,不包括关闭按钮
			$('.' + btnClass).click(function() {
				var index = $(this).attr('buttonIndex');
				options.clickButton($(this), modalObj, index);
			});
			//绑定本身的事件
			modalObj.on('show.bs.modal', function() {
				options.dialogShow();
			});
			modalObj.on('shown.bs.modal', function() {
				options.dialogShown();
			});
			modalObj.on('hide.bs.modal', function() {
				options.dialogHide();
			});
			modalObj.on('hidden.bs.modal', function() {
				options.dialogHidden();
				modalObj.remove();
			});
			modalObj.modal(options.bootstrapModalOption);
		});

	};

	$.extend({
		beamDialog: function(options) {
			$("body").beamDialog(options);
		}
	});

})(jQuery);
