/**
 * @file Contains all validation variables and functions
 */


/**
 * Regular expressions
 * @namespace
 * @property {Object} expRegs.[EXP].regEx the regular expression or object that contents the custom test function
 * @property {string} expRegs.[EXP].error Error message when regular expression does not match
 */
var expRegs = {
    CURP: {
        regEx: /^[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,
        error: "Ingresa una CURP válida"
    },
    EMAIL: {
        regEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        error: "Ingresa un email válido"
    },
    ZIPCODE: {
        regEx: /^\d{5}/,
        error: "Por favor ingresa un código postal válido"
    }
};

/**
 * Contains the form element validations
 * @namespace
 * @property {string} formvalidations[].selector the jquery element selector string
 * @property {function} formvalidations[].invalid return true if the element validation is invalid
 * @property {function} formvalidations[].saveValue save the 'ele' element value into the 'obj' object setting the element id as the object key
 * @property {function} formvalidations[].resetValue clean the element value
 * @property {function} formvalidations[].showError show the custom error on the element
 */
var formvalidations = [
    {
        selector: "input.form-control,textarea.form-control",
        invalid: function(ele) {
            return (ele.prop('required') && (ele.val().trim() == "" || ele.parents(".form-group").hasClass("hasError")));
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = (typeof ele.inputmask !== "undefined") ? ele.inputmask('unmaskedvalue') : ele.val();
        },
        resetValue: function (ele) {
            ele.clearInput();
        },
        showError: function(ele) {
            if (!ele.parents(".form-group").hasClass("hasError")) {
                ele.showError("Campo obligatorio");
            }
        }
    },
    {
        selector: ".form-group-select",
        invalid: function(ele) {
            return (ele.hasClass("required") && ele.getOptionSelected() == null);
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getOptionSelected();
        },
        resetValue: function (ele) {
            ele.reset();
        },
        showError: function(ele) {
            ele.showComboError("Selecciona una opción");
        }
    },
    {
        selector: ".radio-section",
        invalid: function(ele) {
            return (ele.hasClass("required") && ele.getButtonSelected().id == undefined);
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getButtonSelected();
        },
        resetValue: function (ele) {
            ele.clearRadio();
        },
        showError: function(ele) {
            ele.showRadioError("Selecciona una opción");
        }
    },
    {
        selector: ".checkbox",
        invalid: function(ele) {
            return (ele.hasClass("required") && !ele.isChecked());
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.isChecked();
        },
        resetValue: function (ele) {
            ele.unCheck();
        },
        showError: function(ele) {
            ele.showCheckBoxError("");
        }
    },
    {
        selector: ".list-filter-result",
        invalid: function(ele) {
            return false;
        },
        saveValue: function(ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getSelected();
        },
        resetValue: function (ele) {
            ele.unselect();
        },
        showError: function(ele) {
            return;
        }
    }
];

/**
 *Validate if an element has an attribute
 *
 * @param {Object} element DOM element
 * @param {string} attrib attribute to validate
 * @returns {boolean}
 */
function hasAttr(element, attrib) {
    var _attr = element.attr(attrib);
    return (typeof _attr !== typeof undefined && _attr !== false);
}

(function(el, win) {

    /**
     *Validate the form elements
     *
     * @param {Object} formItem form element, it could be the submit button
     * @returns {Object} the form element values and the isValid flag
     */
    function validateForm(formItem) {
        var formvalues = {
            isValid: true
        };
        _$form = $(formItem).closest("form");
        for (var _i in formvalidations) {
            _$form.find(formvalidations[_i].selector).each(function() {
                formvalidations[_i].saveValue($(this), formvalues);
                if (formvalidations[_i].invalid($(this))) {
                    formvalues.isValid = !1;
                    formvalidations[_i].showError($(this));
                }
            });
        }
        return formvalues;
    }

    /**
     * Add the basic validations to each element inside indicated element
     *
     * @param {Object} $el the DOM element
     */
    win.validateControl = function($el) {
        $el.find(".openuploadfile").click(function() {
            loadTemplate($("#modal_generic .body"), templates.ufile, {
            });
        });
        $el.find("input[type='text']").inputable();
        $el.find("textarea").inputable();
        $el.find(".radio-section").radiobutton();
        $el.find(".uppercase").keyup(function(e) {
            $(this).val($(this).val().replace(/á/gi, "A").replace(/é/gi, "E").replace(/í/gi, "I").replace(/ó/gi, "O").replace(/ú/gi, "U").toUpperCase());
        });
        $el.find(".letters").keypress(function(key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode == 0) || //Borrar
                (key.charCode == 32) || //Espacio
                (key.charCode == 45) || //guion
                (key.charCode == 46) || //punto
                (key.charCode == 209) || //enhe may
                (key.charCode == 241) || //enhe min
                (key.charCode == 225) || //á
                (key.charCode == 233) || //é
                (key.charCode == 237) || //í
                (key.charCode == 243) || //ó
                (key.charCode == 250) || //ú
                (key.charCode == 193) || //Á
                (key.charCode == 201) || //É
                (key.charCode == 205) || //Í
                (key.charCode == 211) || //Ó
                (key.charCode == 218) || //Ú
                (key.charCode == 220) || //Ü
                (key.charCode == 252) //ü
            ) return true;
            return false;
        });
        //Ñ not included
        $el.find(".alphanumeric").keypress(function(key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 0) || //Borrar
                (key.charCode == 32)
            ) return true;
            return false;
        });
        $el.find(".letnum").keypress(function(key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode == 0) || //Borrar
                (key.charCode == 32) || //Espacio
                (key.charCode == 45) || //guion
                (key.charCode == 46) || //punto
                (key.charCode == 209) || //enhe may
                (key.charCode == 241) || //enhe min
                (key.charCode == 225) || //á
                (key.charCode == 233) || //é
                (key.charCode == 237) || //í
                (key.charCode == 243) || //ó
                (key.charCode == 250) || //ú
                (key.charCode == 193) || //Á
                (key.charCode == 201) || //É
                (key.charCode == 205) || //Í
                (key.charCode == 211) || //Ó
                (key.charCode == 218) || //Ú
                (key.charCode == 220) || //Ü
                (key.charCode == 252) || //ü
                (key.charCode >= 48 && key.charCode <= 57) //nums
            ) return true;
            return false;
        });
        $el.find(".decimals").keypress(function(key) {
            if ((key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 46) //dot
            ) return true;
            return false;
        });
        $el.find(".numbers").keypress(function(key) {
            if ((key.charCode >= 48 && key.charCode <= 57) //nums
            ) return true;
            return false;
        });
        $el.find(".numg").keypress(function(key) {
            if ((key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 45) || //dash
                (key.charCode >= 97 && key.charCode <= 122) || //Uppercase
                (key.charCode >= 65 && key.charCode <= 90) //lowercase
            ) return true;
            return false;
        });

        $el.find("input[data-regex]").not("input[data-confirm]").blur(function() {
            _$this = $(this);
            _regex = $(this).attr("data-regex");
            _thisval = $(this).val();
            if (_thisval != "" && !expRegs[_regex].regEx.test(_thisval)) {
                _$this.showError(expRegs[_regex].error);
            }else{
                _$this.removeError();
            }
        });
        $el.find("input[required]").attr("data-required", true);
        $el.find("input[data-confirm]").each(function() {
            confirm_element = $(this);
            main_element = $(confirm_element.attr("data-confirm"));
            main_element.keyup(function() {
                $confirm_element = $('[data-confirm="#'+$(this).attr("id")+'"]');
                if ($(this).val() != "") {
                    if (!hasAttr($(this), "data-required")) {
                        $(this).attr("required", "required");
                    }
                    if (!hasAttr($confirm_element, "data-required")) {
                        $confirm_element.parents(".grid-item").slideDown();
                        $confirm_element.attr("required", true);
                    }
                } else {
                    if (!hasAttr($confirm_element, "data-required")) {
                        $confirm_element.parents(".grid-item").slideUp();
                        $confirm_element.removeAttr("required");
                        $confirm_element.val("");
                        $confirm_element.removeError();
                    }
                }
            });
            confirm_element.add(main_element).blur(function() {
                var $confirm_element;
                var $main_element;
                if (hasAttr($(this),"data-confirm")) {
                    $confirm_element = $(this);
                    $main_element = $($confirm_element.attr("data-confirm"));
                }else {
                    $confirm_element = $('[data-confirm="#'+$(this).attr("id")+'"]');
                    $main_element = $(this);
                }
                if ($confirm_element.val() != "" && $confirm_element.val() != $main_element.val()) {
                    $confirm_element.showError("Los correos no coinciden");
                    $main_element.showError("");
                } else if ($main_element.val() == "" && !hasAttr($main_element, "data-required")) {
                    $main_element.removeAttr("required");
                    $main_element.removeError();
                    $confirm_element.removeError();
                    $confirm_element.removeAttr("required");
                }else if ($confirm_element.val() != "" && $confirm_element.val() == $main_element.val()) {
                    $confirm_element.removeError();
                    $main_element.removeError();
                    if (!expRegs.EMAIL.regEx.test($main_element.val())) {
                        $main_element.showError(expRegs.EMAIL.error);
                        $confirm_element.showError(expRegs.EMAIL.error);
                    }
                }
            });
        });
        $el.find("input.phonenumber").inputmask({
            mask: '(999) 999-9999',
            showMaskOnHover: false
        }).blur(function() {
            _phonen = $(this).inputmask('unmaskedvalue').length;
            if (_phonen > 0 && _phonen < 10) {
                $(this).showError("Ingresa el número completo");
            }
        });
        $el.find("input.no-repeat").each(function(){
            $(this).keyup(function(){
                var group=$('.no-repeat');
                var item="";
                var item2="";
                var v1= $().add($(this));
                var contador=0;

                $.each(group, function(key,val){

                    item=$().add(val);
                    if(!v1.is(item)){
                        if(v1.val()===item.val()){
                           v1.showError("No se permite número telefónico repetido");
                           v1.addClass("repeated");
                        }
                    }

                });
                for(var i=0;i<group.length;i++){
                    item=$().add(group[i]);
                    contador=0;
                    for(var j=0;j<group.length;j++){
                        item2=$().add(group[j]);
                        if(!item.is(item2)){
                             if(item.hasClass("repeated")&&item.val()!==item2.val()){
                                 contador++;
                             }
                        }
                    }
                    if(contador===2){
                        item.removeError();
                        item.removeClass("repeated");
                    }
                }
            });
        });
        $el.find("input.mxnamount").focus(function() {
            $(this).inputmask("currency", {
                rightAlign: false,
                autoUnmask: true,
                allowPlus: false,
                allowMinus: false,
                integerDigits:"13",
            });
        }).blur(function() {
            if ($(this).inputmask && $(this).inputmask('unmaskedvalue').length == 0) {
                $(this).inputmask('remove');
            }
        });
        $el.find(".lastnameb").each(function(){
            $(this).keyup(function(){
                var item=$().add($(this));
                var checkinp = item.closest(".grid-container").find( '[data-targetdisable="#' + item.attr('id') + '"]');
                checkinp.addClass("disabled");
                var checkapp = item.closest(".grid-container").find( '[data-targettoggle="#' + checkinp.attr('id') + '"]');
                if(item.val()==="" &&  !(checkapp.hasClass("checked"))){
                    checkinp.removeClass("disabled");
                }
            });
        });
        /*VALIDATION FORM (form-control)*/
        $el.find("form").each(function() {
            $form = $(this);
            $form.find("input.form-control").each(function() {
                $formelement = this;
                $formelement.addEventListener("blur", function() {
                    $(this).val($(this).val().trim());
                    if (this.required && $(this).val().length == 0) {
                        $(this).showError($(this).attr("data-emptymessage") || "Campo obligatorio");
                    }
                });
            });
            $form.find(".form-group-select").each(function() {
                $formcombo = $(this);
                $formcombo.find(".option-select").append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            });
            $form.find(".checkbox").checkeable();
            $form.find(".checkbox[data-targettoggle]").each(function() {
                $(this).ckeckCallback(
                    function() {
                        $($(this).attr("data-targetdisable")).clearInput().prop("disabled", true).prop("required", false);
                        $($(this).attr("data-targettoggle")).unCheck().addClass("disabled").data("uncheck",true);
                        $($(this).attr("data-targetdisable")).setValue("XXXXX");
                    }.bind(this),
                    function() {
                        $($(this).attr("data-targetdisable")).clearInput().prop("disabled", false).prop("required", true);
                        var checkinp=$($($(this).attr("data-targettoggle")).attr("data-targetdisable"));
                        if(checkinp.val()===""){
                            $($(this).attr("data-targettoggle")).removeClass("disabled").data("uncheck",false);
                        }

                    }.bind(this)
                );
            });
            $form.find(".e-tooltip-f").each(function() {
                $etooltip = $(this);
                new Tooltip($etooltip, {
                    placement: 'bottom',
                    trigger: 'focus',
                    html: true,
                    title: $etooltip.attr("data-tooltitle")
                });
            });
            $form.find(".e-tooltip").each(function() {
                $etooltip = $(this);
                new Tooltip($etooltip, {
                    placement: 'bottom',
                    html: true,
                    title: $etooltip.attr("data-tooltitle")
                });
            });

            $form.find("textarea.form-control").each(function() {
                $formelement = this;
                $formelement.addEventListener("blur", function() {
                    $(this).val($(this).val().trim());
                    if (this.required && $(this).val().length == 0) {
                        $(this).showError($(this).attr("data-emptymessage") || "Campo obligatorio");
                    }
                });
            });

            $form.find(".btn__submit").click(function() {
                if ($(this).hasClass("btn__disabled")) return;
                _$form = $(this).closest("form");
                allDataForm = validateForm(this);
                formValidations = typeof _$form.data("validations") === "function"? _$form.data("validations")(allDataForm):true;
                if (_$form.hasClass("notify-on-error") && (!allDataForm.isValid || !formValidations)) {
                    if (!_$form.parents(".modal").length) {
                        _scrollTo = hasAttr(_$form, 'data-notify') ? _$form.attr('data-notify') : BrowserDetect.browser=="Edge"?'body':'html';
                        $(_scrollTo).animate({
                            scrollTop: _$form.offset().top - 100
                        }, 2000, "swing", function() {
                            notifyElem = _$form.prev();
                            if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                            loadTemplate(_$form, miniTemplates.notification, {
                                type: 'error',
                                title: 'Datos obligatorios incompletos',
                                message: 'Por favor ingresa todos campos obligatorios'
                            }, 'before');
                        });
                    }else{
                        notifyElem = _$form.find(".actionsection:last").prev();
                        if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                        loadTemplate(_$form.find(".actionsection:last"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Datos obligatorios incompletos',
                            message: 'Por favor ingresa todos campos obligatorios'
                        }, 'before');
                    }

                    if (hasAttr(_$form,"data-status")) {
                        $(_$form.attr("data-status")).removeClass("complete");
                        $(_$form.attr("data-status")).addClass("incomplete");
                        $(_$form.attr("data-status")).html('<i class="bbva-icon ui-warning"></i>Incompleto');
                    }
                }else{
                    if (_$form.prev().length != 0 && _$form.prev().hasClass("notification")) _$form.prev().remove();
                    if (typeof $(this).data("complete") === "function") {
                        $(this).data("complete")(allDataForm);
                    }
                }
            });
        });
    };
    win.validateControl(el);

    /**
     *Fill the form elements
     *
     * @param {Object} $frm form element
     * @param {Object} fdata the values to set on each element, the object key es considered as the element id
     */
    win.fillForm = function ($frm, fdata) {
        $.each( fdata, function( key, value ) {
            $3l = $frm.find("#"+key);
            if ($3l.is("input") || $3l.is("textarea")) {
                $3l.clearInput();
                $3l.setValue(value);
            }else if ($3l.hasClass("form-group-select")) {
                $3l.reset();
                if (value != null) {
                    $3l.selectOptionId(typeof value == 'object'?value.id:value);
                }
            }else if ($3l.hasClass("radio-section")) {
                $3l.clearRadio();
                $3l.selectRadioId(typeof value == 'object'?value.id:value);
            }else if ($3l.hasClass("list-filter-result")) {
                $3l.unselect();
                $3l.selectFromList(value);
            }else if ($3l.hasClass("checkbox")) {
                $3l.unCheck();
                if (value) {
                    $3l.doCheck();
                }
            }else{
                console.log("fillForm: Element "+key+" doesn't exists in form",$frm);
            }
        });
    };

    /**
     *Reset all form elements value
     *
     * @param {Object} $frm form element
     */
    win.resetForm = function ($frm) {
        for (var _i in formvalidations) {
            $frm.find(formvalidations[_i].selector).each(function() {
                formvalidations[_i].resetValue($(this));
            });
        }
    };
})($(document), window);

var __ = (function() {
    /**
     *Core function to get a json path into an object
     *
     * @param {Object} obj the JSON object
     * @param {string} path path to get
     * @returns {string|Object} the path value if it exists, otherwise, an undefined object
     */
    var baseGet = function(obj, path) {
        var args = path.split('.');
        for (var i = 0; i < args.length; i++) {
            wasArray = {
                flag: false,
                value: 0
            };
            if (args[i].indexOf('[')!=-1) {
                wasArray.flag = true;
                wasArray.value = args[i].substring(args[i].indexOf("[")+1, args[i].indexOf("]"));
                args[i] = args[i].split('[')[0];
            }
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return undefined;
            }
            obj = wasArray.flag? obj[args[i]][wasArray.value] : obj[args[i]];
        }
        return typeof obj == "string"?obj.trim():obj;
    };
    return {
        /**
         *Get the path value into a JSON object
         *
         * @param {Object} object the JSON object
         * @param {string} path the path to get
         * @param {any} defaultValue default value if the path does not exist
         * @returns {any} the path value or the default value
         */
        get: function(object, path, defaultValue) {
            var result = object == null ? undefined : baseGet(object, path);
            return result === undefined ? defaultValue : result;
        }
    };
})();