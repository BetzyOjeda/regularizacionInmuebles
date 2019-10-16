(function ($) {
	$.fn.checkeable = function (onCheckCallback, onUncheckCallback) {
		return this.each(function () {
            if (typeof onCheckCallback != "function") onCheckCallback=function(){}
            if (typeof onUncheckCallback != "function") onUncheckCallback=function(){}
            $(this).data("checkcallback",onCheckCallback);
            $(this).data("uncheckcallback",onUncheckCallback);
            $(this).click(function () {
                if($(this).hasClass("disabled")) return;
                if ($(this).hasClass("checked")) {
                    $(this).removeClass("checked");
                    $(this).data("uncheckcallback")($(this));
                }else{
                    $(this).removeCheckboxError();
                    $(this).addClass("checked");
                    $(this).data("checkcallback")($(this));
                }
            });
		});
	};

	$.fn.isChecked = function () {
		return $(this).hasClass("checked");
    };

    $.fn.doCheck = function () {
        return this.each(function(){
            $(this).addClass("checked");
            $(this).data("checkcallback")($(this));
        });
    };
    $.fn.unCheck = function () {
        return this.each(function(){
            $(this).removeClass("checked");
        });
    };
    $.fn.showCheckBoxError= function(){
        $(this).addClass("error");
    }
    $.fn.removeCheckboxError=function(){
        $(this).removeClass("error");
    }
	$.fn.ckeckCallback = function (onCheckCallback, onUncheckCallback) {
		return this.each(function () {
            if (typeof onCheckCallback != "function") onCheckCallback=function(){}
            if (typeof onUncheckCallback != "function") onUncheckCallback=function(){}
            $(this).data("checkcallback",onCheckCallback);
            $(this).data("uncheckcallback",onUncheckCallback);
		});
    };

}(jQuery));