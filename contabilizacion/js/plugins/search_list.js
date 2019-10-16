(function ($) {
    $.fn.applyList = function (context, items) {
        context.find('.list-result').html(Mustache.to_html($.fn.searchList.templates[context.attr('data-template')], items));
        context.find('.list-result')[0].scrollTo(0, 0);
        context.find(".result-item").click(function (e) {
            context.find(".result-item").not(this).removeClass('selected');

            var _items = context.data('items');
            for (var i = 0; i < _items.items.length; i++) {
                var element = _items.items[i];
                if (element[_items.filterid] == $(this).attr('data-id')) {
                    context.data('selected', element);
                    context.find(".placeholder-simulator").attr("style", "top: 5px; font-size: 12px;");
                    context.find("input[name='filter']").val(element[_items.filtertext]).removeError();
                    context.find(".list-result").slideUp();
                    context.data('selectCallback')(element);
                    break;
                }
            }
            $(this).addClass('selected');
        });
    };
    $.fn.searchList = function (items, onSelectCallback) {
        return this.each(function () {
            var context = $(this);

            if (typeof onSelectCallback === 'function') {
                context.data('selectCallback', onSelectCallback);
            } else if (typeof context.data('selectCallback') !== 'function') {
                context.data('selectCallback', function () {});
            }
            context.data('items', items);
            context.data('selected', null);
            $.fn.applyList(context, items);

            var inputfilter = context.find("input[name='filter']");
            inputfilter.clearInput();
            context.find(".list-result").slideDown();
            if (context.data("search-atached") == undefined) {
                inputfilter.focus(function (e) {
                    e.preventDefault();
                    context.find(".list-result").slideDown();
                    $.fn.filterList(context, $(this).val());
                });
                inputfilter.blur(function (e) {
                    if (context.data('selected') != null) {
                        context.find(".placeholder-simulator").attr("style", "top: 5px; font-size: 12px;");
                        context.find("input[name='filter']").val(context.data('selected')[context.data('items').filtertext]).removeError();
                        context.find(".list-result").slideUp();
                    }
                });
                inputfilter.keyup(function (e) {
                    $.fn.filterList(context, inputfilter.val());
                });
            }
            context.data("search-atached",true);
            if (typeof context.data("promess-select") !== "undefined") {
				context.selectFromList(context.data("promess-select"));
				context.data("promess-select", undefined);
			}
        });
    };

    $.fn.selectFromList = function (_listid) {
        return this.each(function () {
            var context = $(this);
            _allitems = context.data('items');
            if (typeof _allitems == "undefined") {
                context.data("promess-select", _listid);
			    return;
            }else{
                for (var i = 0; i < _allitems.items.length; i++) {
                    var element = _allitems.items[i];
                    if (element[_allitems.filterid] == _listid) {
                        context.data('selected', element);
                        context.find(".placeholder-simulator").attr("style", "top: 5px; font-size: 12px;");
                        context.find("input[name='filter']").val(element[_allitems.filtertext]).removeError();
                        context.find(".list-result").slideUp();
                        context.data('selectCallback')(element);
                        break;
                    }
                }
            }
        });
    };

    $.fn.unselect = function () {
        return this.each(function () {
            var context = $(this);
            context.data('selected', null);
            context.find("input[name='filter']").clearInput();
        });
    };

    $.fn.filterList = function (context, filter) {
        var filtereditems = {
            "items": []
        };
        var regExFilter = new RegExp($.fn.escapeRegExp($.fn.removeAcute(filter)), 'i');
        var _items = context.data('items');
        filtereditems.items = $.map(_items.items, function (element) {
            if (regExFilter.test($.fn.removeAcute(element[_items.filtertext]))) return element;
        });
        $.fn.applyList(context, filtereditems);
    };
    $.fn.getSelected = function () {
        context = this;
        return this.data("selected") || null;
    };

    $.fn.escapeRegExp = function (string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    $.fn.removeAcute = function (in_string) {
        var acutelist = [{
                    i: "á",
                    o: "a"
                },
                {
                    i: "é",
                    o: "e"
                },
                {
                    i: "í",
                    o: "i"
                },
                {
                    i: "ó",
                    o: "o"
                },
                {
                    i: "ú",
                    o: "u"
                }
            ],
            out_string = in_string.toLowerCase();

        for (var i = 0; i < acutelist.length; i++) {
            var char = acutelist[i];
            out_string = out_string.replace(char.i, char.o);
        }
        return out_string;
    };
    $.fn.searchList.templates = {
        simple: '{{#items}}' +
            '<div class="result-item" data-id="{{description}}">' +
            '<div class="item-title"><i class="bbva-icon bbva-icon__2_027_place"></i>{{description}}</div>' +
            '</div>' +
            '{{/items}}',
        fulldetail: '{{#items}}' +
            '<div class="result-item" data-id="{{keyWorkplace}}">' +
            '<div class="item-title"><i class="bbva-icon bbva-icon__5_002_build"></i>{{schoolOficialName}}</div>' +
            '<div class="item-details">' +
            '<p><span class="tagname">Tipo:</span> {{schoolAcronym}}</p>' +
            '<p><span class="tagname">CCT:</span> {{keyWorkplace}}</p>' +
            '<p><span class="tagname">Dirección:</span> {{schoolAddress}}</p>' +
            '<p><span class="tagname">Localidad:</span></i> {{location}}</p>' +
            '</div>' +
            '</div>' +
            '{{/items}}'
    };
}(jQuery));