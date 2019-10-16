(function ($) {

	$.fn.comboSelect = function (options, onSelectCallback) {
		return this.each(function () {
			var context = $(this);
			if (typeof onSelectCallback === 'function') {
				context.data('selectCallback', onSelectCallback);
			} else if (typeof context.data('selectCallback') !== 'function') {
				context.data('selectCallback', function () {});
			}
			context.data('options', options);
			context.data('selected', null);
			context.find('.list-result').html(Mustache.to_html($.fn.comboSelect.template, {
				items: options
			}));

			var _optionSelect = context.find(".option-select");
			_optionSelect.data('open', false);
			_optionSelect.removeAttr('open');

			_optionSelect.find("li").click(function () {
				var $liSelected = $(this);
				var _options = context.data('options');
				if(context.data('selected') == null || $liSelected.attr('data-id') != context.data('selected').id){
					for (var i = 0; i < _options.length; i++) {
						var element = _options[i];
						if (element.id == $liSelected.attr('data-id')) {
							context.data('selected', element);
							context.removeComboError();
							context.find(".option-text").removeClass("center");
							context.find(".selected-option").text(element.description);
							context.addClass("noempty");
							$.fn.hideOptions(_optionSelect);
							context.data('selectCallback')(element);
							break;
						}
					}
				}
			});

			if(context.data("inicializate") === true) return;
			_optionSelect.find(".select-title").click(function () {
				if (!_optionSelect.data('open')) {
					$.fn.showOptions(_optionSelect);
				} else {
					$.fn.hideOptions(_optionSelect);
				}
			});
			context.data("inicializate", true);
			if($(document).data("comboselectatached")==undefined){
				$(document).click(function(event) {
					if (!$(event.target).hasClass("sl")) {
						$formOpened = $(".form-group-select .option-select[open]");
						if ($formOpened.length != 0) {
							$.fn.hideOptions($formOpened);
						}
					}
				});
				$(document).data("comboselectatached", true);
			}
			if (typeof context.data("promess-select") !== "undefined") {
				context.selectOptionId(context.data("promess-select"));
				context.data("promess-select", undefined);
			}
			if (typeof context.data("promess-selectdesc") !== "undefined") {
				context.selectOptionDescription(context.data("promess-selectdesc"));
				context.data("promess-select", undefined);
			}
		});
	};

	$.fn.showOptions = function (_optionSelect) {
		if (_optionSelect.hasClass("disabled")) return;
		$.fn.hideOptions($(".form-group-select .option-select[open]").not(_optionSelect));
		_optionSelect.find("ul").slideDown();
		_optionSelect.data("open", true);
		_optionSelect.attr('open','');
		_optionSelect.find(".select-title .bbva-icon").css({
			'transform': 'rotate(180deg)'
		});
	};

	$.fn.selectOptionId = function(id){
		context = this;
		var _options = context.data('options');
		if (typeof _options == "undefined") {
			context.data("promess-select", id);
			return;
		}
		for (var i = 0; i < _options.length; i++) {
			var element = _options[i];
			if (element.id == id) {
				context.data('selected', element);
				context.removeComboError();
				context.find(".option-text").removeClass("center");
				context.find(".selected-option").text(element.description);
				context.data('selectCallback')(element);
				break;
			}
		}
	};

	$.fn.selectOptionDescription = function(desc){
		context = this;
		var _options = context.data('options');
		if (typeof _options == "undefined") {
			context.data("promess-selectdesc", desc);
			return;
		}
		for (var i = 0; i < _options.length; i++) {
			var element = _options[i];
			if (element.description == desc) {
				context.data('selected', element);
				context.removeComboError();
				context.find(".option-text").removeClass("center");
				context.find(".selected-option").text(element.description);
				context.data('selectCallback')(element);
				break;
			}
		}
	};

	$.fn.hideOptions = function (_optionSelect) {
		_optionSelect.find("ul").slideUp();
		_context = _optionSelect.closest(".form-group-select");
		if(_context.hasClass("required") && _context.getOptionSelected()==null) _context.showComboError();
		_optionSelect.data("open", false);
		_optionSelect.removeAttr('open');
		_optionSelect.find(".select-title .bbva-icon").css({
			'transform': 'rotate(0deg)'
		});
	};

	$.fn.getOptionSelected = function () {
		return this.data('selected') || null;
	};

	$.fn.onSelect = function (callback) {
		if (typeof callback === 'function') {
			this.data('selectCallback', callback);
		}
	};

	$.fn.reset = function () {
		this.find(".option-text").addClass("center");
		this.find(".selected-option").text("");
		this.find(".option-select").removeClass("disabled");
		this.removeComboError();
		this.removeClass("noempty");
		this.data('selected',null);
		return this;
	};

	$.fn.showComboError = function(message) {
		return this.each(function() {
			$(this).addClass("hasError");
			message = message?message:"Selecciona una opción";
			$(this).find("span.text-message").html('<i class="bbva-icon ui-warning"></i>'+message);
		});
	};

	$.fn.removeComboError = function() {
		return this.each(function() {
			$(this).removeClass("hasError");
			$(this).find("span.text-message").html('&nbsp;');
		});
	};

	$.fn.comboSelect.template = '<ul style="display:none">' +
		'{{#items}}' +
		'<li data-id="{{id}}">{{description}}</li>' +
		'{{/items}}' +
		'</ul>';

}(jQuery));

var day = [{
	id: '01',
	description: '01'
},
{
	id: '02',
	description: '02'
},
{
	id: '03',
	description: '03'
},
{
	id: '04',
	description: '04'
},
{
	id: '05',
	description: '05'
},
{
	id: '06',
	description: '06'
},
{
	id: '07',
	description: '07'
},
{
	id: '08',
	description: '08'
},
{
	id: '09',
	description: '09'
},
{
	id: '10',
	description: '10'
},
{
	id: '11',
	description: '11'
},
{
	id: '12',
	description: '12'
},
{
	id: '13',
	description: '13'
},
{
	id: '14',
	description: '14'
},
{
	id: '15',
	description: '15'
},
{
	id: '16',
	description: '16'
},
{
	id: '17',
	description: '17'
},
{
	id: '18',
	description: '18'
},
{
	id: '19',
	description: '19'
},
{
	id: '20',
	description: '20'
},
{
	id: '21',
	description: '21'
},
{
	id: '22',
	description: '22'
},
{
	id: '23',
	description: '23'
},
{
	id: '24',
	description: '24'
},
{
	id: '25',
	description: '25'
},
{
	id: '26',
	description: '26'
},
{
	id: '27',
	description: '27'
},
{
	id: '28',
	description: '28'
},
{
	id: '29',
	description: '29'
},
{
	id: '30',
	description: '30'
},
{
	id: '31',
	description: '31'
}
];

var month = [{
	id: '01',
	description: 'Ene',
	monthcomplete: "ENERO"
},
{
	id: '02',
	description: 'Feb',
	monthcomplete: "FEBRERO"
},
{
	id: '03',
	description: 'Mar',
	monthcomplete: "MARZO"
},
{
	id: '04',
	description: 'Abr',
	monthcomplete: "ABRIL"
},
{
	id: '05',
	description: 'May',
	monthcomplete: "MAYO"
},
{
	id: '06',
	description: 'Jun',
	monthcomplete: "JUNIO"
},
{
	id: '07',
	description: 'Jul',
	monthcomplete: "JULIO"
},
{
	id: '08',
	description: 'Ago',
	monthcomplete: "AGOSTO"
},
{
	id: '09',
	description: 'Sep',
	monthcomplete: "SEPTIEMBRE"
},
{
	id: '10',
	description: 'Oct',
	monthcomplete: "OCTUBRE"
},
{
	id: '11',
	description: 'Nov',
	monthcomplete: "NOVIEMBRE"
},
{
	id: '12',
	description: 'Dic',
	monthcomplete: "DICIEMBRE"
}
];

