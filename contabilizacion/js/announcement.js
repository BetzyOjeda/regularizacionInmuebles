/**
 * @file Contents all functions that is needed to show the container of the web page, including eventlisteners, asign options and execute services.
 */
$("#btn-exit").click(function () {
    logout();
});

var toggleModule = function ($head) {
    if (!$head.hasClass("animated")) {
        $content = $("#" + $head.attr("data-target"));
        $head.addClass("animated");
        if ($head.hasClass("is-open")) {
            $head.removeClass("is-open");
            $content.slideUp(400, function() {
                $head.removeClass("animated");
            });
        } else {
            for (var i = 0; i < $(".accordion .step-header").length; i++) {
                element = $(".accordion .step-header")[i];
                if ($(element).hasClass("is-open") &&
                    $(element).attr("data-target") != $head.attr("data-target")) {
                    $idTemp = $("#" + $(element).attr("data-target"));
                    $idTemp.slideUp();
                }
            }
            $(".accordion .step-header").not("data-target", $head.attr("data-target")).removeClass("is-open");
            $head.addClass("is-open");
            $content.slideDown(400, function() {
                $head.removeClass("animated");
            });
        }
    }
};
$(".accordion .step-header").click(function(e) {
    if (hasAttr($(this),"data-catalog") && $(this).attr("data-loaded")=="false") {
        _lcatalog=$(this).attr("data-catalog");
        fn_verifyCatalogs(loadModule.moduleCatalog[_lcatalog].list(),loadModule.moduleCatalog[_lcatalog].callback);
    }else{
        toggleModule($(this));
    }
});

$("#email, #email2, #email3").blur(function() {
    if($("#email").val() != "" && $("#email").val() == $("#email2").val()){
        $("#email2").showError("No se permiten correos duplicados");
    }
    if($("#email2").val() != "" && $("#email2").val() == $("#email3").val()){
        $("#email3").showError("No se permiten correos duplicados");
    }
    if($("#email").val() != "" && $("#email").val() == $("#email3").val()){
        $("#email3").showError("No se permiten correos duplicados");
    }
});


//Datos personales
$("#dbirthdate").comboSelect(day);

$("#mbirthdate").comboSelect(month);


/**
 *Function that fills the combos of catalogs
 *
 * @param {string} id the Element's id to apply the combo options
 * @param {Object[]} object contains the combo object to be list
 * @param {function} fn callback function when a option is selected
 */
var fnFillCatalogs =  function (id, object, fn) {
    object = object || [];
    $("#"+id).comboSelect(object, fn);
};

$("#dsclass").comboSelect(day);

$("#msclass").comboSelect(month);
//buttons

$("#btn_savegd").data("complete", function(_data) {
    alert("llenar info");
});




/**
 *This function is executed when the "Finalizar registro" button is pressed, it executes the service that confirm all student information
 *
 */
function saveglobal(){
    restExec({
        service: 'UPDATE_ANNOUNCEMENT',
        data: {
                "scholarshipProgram":{
                   "id": moduleInitData.announcement.scholarshipProgram.id
                },
                "scholar":{
                   "Id": ivUser
                }
        },
        showWait: true,
        success: rest_fnUpdateScholarshipAnnouncementStatus
    });
}

/**
 *Function that change a module status to complete and shows a success message as a result
 *
 * @param {Object} $idContent the header module element to change status
 * @param {?string} tit optional title message for the success message modal, default value: "Datos guardados"
 * @param {?string} msg optional message content for the success message modal, default value: "Tus datos se han almacenado correctamente, gracias"
 */
function changeStatusSel($idContent, tit, msg) {
    _title = tit ? tit : "Datos guardados";
    _message = msg ? msg : "Tus datos se han almacenado correctamente, gracias";
    $elstatus = $idContent.siblings(".step-header").find(".step-status");
    $idContent.siblings(".step-header").removeClass("is-open");
    $idContent.slideUp();
    loadTemplate($("#modal_generic .body"), miniTemplates.success, {
        title: _title,
        message: _message
    });
}

/**
 *Function that changes the module status, if the status value is "complete" then the module status is changed to "complete" otherwise the status is changed to "incomplete"
 *
 * @param {object} $idContent module content element to chance status
 * @param {string} status status to set
 */
function changeModuleSatus($idContent, status) {
    $elstatus = $idContent.siblings(".step-header").find(".step-status");
    if (status == "complete") {
        $elstatus.removeClass("incomplete");
        $elstatus.addClass("complete");
        $elstatus.html('<i class="bbva-icon ui-checkmark-filled"></i>Completo');
    } else {
        $elstatus.removeClass("complete");
        $elstatus.addClass("incomplete");
        $elstatus.html('<i class="bbva-icon ui-warning"></i>Incompleto');
    }
}
/*MODAL*/
$(".modal .icon-close").click(function() {
    $(this).parents(".modal").removeAttr("open");
    callbackCloseModal();
});






$(".o_two").comboSelect((function() {
    _arr_0_2 = [];
    for (var i = 0; i < 2; i++) {
        _arr_0_2.push({
            id: "" + i,
            description: "" + i
        });
    }
    _arr_0_2.push({
        id: "2",
        description: "2 o más"
    });
    return _arr_0_2;
})());

$('.r-options').onChecked();




/**
 *Returns true if the date is a valid date
 *
 * @param {string} date date with format mm/dd/yyyy
 * @returns {boolean}
 */
function vali_date(date) {
    var _month = date[0] + date[1];
    var newdate = new Date(date);
    if (parseInt(_month) != parseInt((newdate.getMonth() + 1))) {
        return false;
    } else {
        return true;
    }
}
$('#dbirthdate').onSelect(function() {
    if (!fbdate) {
        var dateto = $('#mbirthdate').getOptionSelected().id + '/' + $('#dbirthdate').getOptionSelected().description + '/' + $('#ybirthdate').val();
        if (vali_date(dateto)) {
            fbdate = true;
            $('#mbirthdate').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});
$('#mbirthdate').onSelect(function() {
    if (!fbdate) {
        var dateto = $('#mbirthdate').getOptionSelected().id + '/' + $('#dbirthdate').getOptionSelected().description + '/' + $('#ybirthdate').val();
        if (vali_date(dateto)) {
            fbdate = true;
            $('#dbirthdate').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});
$('#dsclass').onSelect(function() {
    if (!fcdate) {
        var dateto = $('#msclass').getOptionSelected().id + '/' + $('#dsclass').getOptionSelected().description + '/' + $('#ysclass').val();
        if (vali_date(dateto)) {
            fcdate = true;
            $('#msclass').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});
$('#msclass').onSelect(function() {
    if (!fcdate) {
        var dateto = $('#msclass').getOptionSelected().id + '/' + $('#dsclass').getOptionSelected().description + '/' + $('#ysclass').val();
        if (vali_date(dateto)) {
            fcdate = true;
            $('#dsclass').removeComboError();
        } else {
            $(this).showComboError("Fecha inválida");
        }
    }
});

$("#btn_save_all").click(function() {
    alert("salvar todo");
});

/**
 * Contains the module functions to get the module information
 * @type {Object}
 */
var loadModule = {
	
	/**
     *Executes the 'LIST_CATALOGS' service and saves the result on catalogs variable
     *
     * @param {string} cat the catalog to get
     * @param {function} finallySuccess callback function when the catalog is got
     */
    getCatalog: function (cat, finallySuccess) {
        if (catalogs[cat] == undefined || catalogs[cat].length == 0) {
            restExec({
                service: 'LIST_CATALOGS',
                type: 'GET',
                async: true,
                showWait:true,
                hasUrlParam: true,
                urlParam: {
                    catalog: cat,
                },
                data: {},
                finallyError: function () {
                    finallySuccess();
                },
                finallySuccess: [function (data) {
                    rest_fnGetSchoolCatalog(cat, data);
                },finallySuccess]
            });
        }else{
            finallySuccess(catalogs[cat]);
        }
    },

   /**
     *Has the catalog list by module, it execute those catalogs before the module is shown.
     *
     */
    moduleCatalog: {
        general:{
            list: function () {
                return ["CAT_BANK", "CAT_CREDITMORTGAGE", "CAT_CREDITCOMMERCIAL", "CAT_GRAVAMEN"];
            },
            callback: function () {
                fnFillCatalogs("sec1generatingbank", __.get(catalogs,"CAT_BANK",[]), function(el) {});
                fnFillCatalogs("sec1mortgagecredittype", __.get(catalogs,"CAT_CREDITMORTGAGE",[]), function(el) {});
                fnFillCatalogs("sec1commercialcredit", __.get(catalogs,"CAT_CREDITCOMMERCIAL",[]), function(el) {});
                fnFillCatalogs("sec1gravamen", __.get(catalogs,"CAT_GRAVAMEN",[]), function(el) {});
                $('[data-target="general-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.general != "undefined") {
                    rest_fnGetGeneralData(moduleInitData.general);
                }
                toggleModule($('[data-target="general-data"]'));
            }
        },
        notarydata: {
            list: function () {
                return ["CAT_TYPEPROPERTY", "CAT_NOTARY", "NOTARY_DATA", "CAT_STATE"];
            },
            callback: function () {
                fnFillCatalogs("sec2typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                fnFillCatalogs("sec2notarysquare", __.get(catalogs,"CAT_NOTARY",[]), function(el) {});
                fnFillCatalogs("sec2notarynumber", __.get(catalogs,"NOTARY_DATA",[]), function(el) {});
                fnFillCatalogs("sec2state", __.get(catalogs,"CAT_STATE",[]));
                fnFillCatalogs("sec2municipality", __.get(catalogs,"CAT_STATE",[]));
                $('[data-target="schoolar-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.notarydata != "undefined"){
                    rest_fnGetScholarInf(moduleInitData.notarydata);
                }
                                
                toggleModule($('[data-target="schoolar-data"]'));
            }
        },
        dataInmueble: {
            list: function () {
                return ["CAT_TYPEPROPERTY","CAT_SUBTYPEPROPERTY","CAT_STATE"];
            },
            callback: function () {
                fnFillCatalogs("sec2typepropertie", __.get(catalogs,"CAT_TYPEPROPERTY",[]));
                fnFillCatalogs("subtypeproperty", __.get(catalogs,"CAT_SUBTYPEPROPERTY",[]));
                fnFillCatalogs("propertystate", __.get(catalogs,"CAT_STATE",[]));
                fnFillCatalogs("sec3state", __.get(catalogs,"CAT_STATE",[]),function(ele) {
                    var otraClaseElems = $("#municipalities").find(".disabled").removeClass('disabled');
                    console.log("otraClaseElems",otraClaseElems);
                });

                
                $('[data-target="inmueble-data"]').attr("data-loaded","true");
                if (typeof moduleInitData.dataInmueble != "undefined"){
                    rest_fnGetHomeServices(moduleInitData.dataInmueble);
                }
                toggleModule($('[data-target="inmueble-data"]'));
            }
        }
    },
    /**
     *Verify if the student info is allready confirmed and if there is no incomplete modules, if so it hides the confirm button
     *
     */
    checkStatus: function() {
        setTimeout(function () {
            if ($(".step-header .step-status.incomplete").length == 0 && __.get(moduleInitData,"announcement.globalStatus","0") == '0') {//no hay módulos incompletos
                $(".submtbtn.send").removeAttr("style");
            }else{
                $(".submtbtn.send").attr("style","display: none");
            }
        },450);
    },
    /**
     *Returns true if the parameter is a function
     *
     * @param {?Object} funct the object to validate
     * @returns {boolean}
     */
    ensureFun: function(funct) {
        return typeof funct == "function"?funct:rest_fnNothig;
    },
    /**
     *Gets the states
     *
     * @param {function} finallySuccess optional callback function
     */
    getStates: function (finallySuccess) {
        if (stateTransactions == undefined || stateTransactions.length == 0) {
            restExec({
                showWait:true,
                service: 'GET_STATES',
                type: 'POST',
                data: {},
                asyn: false,
                finallySuccess: [function (data) {
                    rest_fnGetStates(data);
                },finallySuccess],
                finallyError: [function (data) {
                    rest_fnGetStates(data);
                },finallySuccess]
            });
        }else{
            finallySuccess(stateTransactions);
        }
    },
    /**
     *Gets the municipalities of a state
     *
     * @param {string|number} id the state id
     * @param {function} finallySuccess optional callback function
     */
    getMunicipalities: function (id, finallySuccess) {
        if (municipalityTransactions[id] == undefined || municipalityTransactions[id].length == 0) {
            restExec({
                showWait:true,
                service: 'GET_MUNICIPALITY',
                type: 'POST',
                asyn: false,
                data: {
                    state:id
                },
                finallySuccess: [function (data) {
                    rest_fnGetMunicipalities(id, data);
                },finallySuccess],
                finallyError: [function (data) {
                    rest_fnGetMunicipalities(id, data);
                },finallySuccess]
            });
        }else{
            finallySuccess(municipalityTransactions[id]);
        }
    }
};


/**
 *Executes the services needed to load tha main module "datos generales"
 *
 */
var loadMainModules = function () {
alert("loadMainModules");
};

/**
 *Execute services to show the next modules
 *
 * @param {function} _cllback callback function
 */
var loadNextModules = function (_cllback) {
    if (typeof _cllback !== 'function') {
        _cllback = loadModule.checkStatus;
    }
    // LIST_SERVICES.listRestExec({
        // service: 'GET_LEGAL',
        // type: 'GET',
        // hasUrlParam: true,
        // urlParam: {
            // scholarId: ivUser,
            // scholarshipProgramId: moduleInitData.announcement.scholarshipProgram.id,
            // moduleID: 31
        // },
        // data: {},
        // success: rest_fnGetLegalDisclaimers,
    // },_cllback);
};

/**
 * Validates if the user is a FUN type, if so 'SCHOLAR_DETAIL' is executed to detect if the user is allready registered
*/

//pre-load templates
Object.keys(templates).forEach(function(_template) {
    $.get(templates[_template].path,function (templatetext) {
        templates[_template].html = templatetext;
    });
});

var fn_opennotification = function () {
    fn_showModal();
 };

$("#currentYear").text(new Date().getFullYear());

var fn_opennotification = function () {
    fn_showModal();
};
