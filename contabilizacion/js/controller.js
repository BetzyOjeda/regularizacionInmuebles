/**
 * @file Contains the main operational functions for the web page
*/

//Shows a warning to prevent the student to use the browser console
console.log("%cRealizar alguna modificación en esta sección puede provocar la pérdida de tu información\n", "color:#a90c0c;font-size:22px;");
/**
 * Save the server domain, it is use to know the server enviroment
 * @type {string}
 */
var servOrigin = window.location.origin;
/**
 * Indicates if the current server is a local server
 * @type {boolean}
 */
var isLocal = (servOrigin.indexOf("localhost") != -1);

//The enviroment is validate to enable logs
if (!isLocal) {
    window.oldconsole = {};
    window.oldconsole.log = console.log;
    console.log = function() {};
    window.console.log = console.log;
}
/**
 * Function to redirect to login validating the enviroment.
 */
function redirectToLogin() {
    var servOrigin = window.location.origin;
    if (servOrigin.indexOf("localhost") != -1) { //local
        return;
    } else if (servOrigin.indexOf("150.250.238.172") != -1) { //Desarrollo
        window.location = servOrigin + "/mgbfprv_des_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("150.250.238.173") != -1) { //Test
        window.location = servOrigin + "/mgbfprv_test_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("becasfmxt.mex.igrupobbva") != -1) { //Test
        window.location = servOrigin + "/mgbfprv_test_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("calplataformabecas.fundacionbbvabancomer.com.mx") != -1) { //Calidad
        window.location = servOrigin + "/mgbfprv_qa_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("plataformabecaslo.fundacionbbvabancomer.org") != -1) { //liga oculta
        window.location = servOrigin + "/mgbfprv_lo_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("plataformabecas.fundacionbbvabancomer.org") != -1) { //Prod
        window.location = servOrigin + "/mgbfprv_pr_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    } else if (servOrigin.indexOf("plataformabecas.fundacionbbva.mx") != -1) { //Prod
        window.location = servOrigin + "/mgbfprv_pr_mx_web/mgbf_mult_web_fundacionbancomerextranetwebfront_01/";
    }
}

/**
 *Shows a logout message and when it is accepted the web page is reloaded
 *
 * @param {string} _msn optional title message
 */
var showLogOut = function(_msn) {
    if (_msn) {
        loadTemplate($("#modal_generic .body"), miniTemplates.success, {
            title: _msn,
            message: "",
            onAccept: function() {
                location.reload();
            }
        });
    }else{
        loadTemplate($("#modal_generic .body"), miniTemplates.error, {
            title: "Error",
            message: "Tu sesi\u00F3n ha terminado por inactividad",
            onAccept: function() {
                location.reload();
            }
        });
    }
};

var countSession, minutes, timer;
var initCountSession = function() {
    stopCountSession();
    minutes = 8;
    timer = minutes;
    countSession = setInterval(function () {
        console.log("## timer",timer);
        if (--timer == 0) {
            showTimeSession();
            stopCountSession();
        }
    }, 60000);
};
var stopCountSession = function() {
    if (countSession!=undefined) {
        clearInterval(countSession);
    }
};

var refreshSession = function() {
    $("#modal_timeout").removeAttr('open');
    $("#modal_timeout").find(".btn_acept span").text("Continuar con sesión");
    showWait();
    $.ajax({
        type: 'GET',
        contentType: 'image/png',
        url: "images/favicons/16x16.png",
        cache:false,
        async: true,
        success: function(data){
            initCountSession();
            if (typeof data != "undefined" && data.indexOf("<title>Login</title>") != -1) {
                hideWait();
                redirectToLogin();
                return;
            }
            hideWait();
        },
        error: function(){
            hideWait();
            redirectToLogin();
        }
    });
};
var _timer, _minutes, _seconds;
var showTimeSession = function() {
    var _timer = 60, _minutes, _seconds;
    var _intcd = setInterval(function () {
        _minutes = parseInt(_timer / 60, 10);
        _seconds = parseInt(_timer % 60, 10);
        _minutes = _minutes < 10 ? "0" + _minutes : _minutes;
        _seconds = _seconds < 10 ? "0" + _seconds : _seconds;
        $("#cdSession").text(_minutes+":"+_seconds);
        if (--_timer < 0) {
            $("#modal_timeout").find(".btn_acept span").text("Continuar");
            clearInterval(_intcd);
        }
    }, 1000);
    console.info("## showTimeSession");
    $("#modal_timeout").attr('open', '');
};
$("#modal_timeout").find(".btn_acept").click(refreshSession);


/**
 *Finishes the user session on spring server and web seal side.
 *
 */
var logout = function() {
    showWait();
    setTimeout(function() {
        restExec({
            service: 'TERMINATE_SESSION',
            async: false,
            data: {},
            success: function(resp) {
                console.log("se cerró sesión en back end");
            },
            error: function(error) {
                console.log("no se cerró sesión en back end");
            }
        });
        $.ajax({
            type: 'GET',
            dataType: 'html',
            url: window.location.origin + "/pkmslogout.form",
            async: true,
            success: function(){redirectToLogin();},
            error: function(){redirectToLogin();}
        });
    }, 400);
};

/**
 *Shows the wait animation modal
 *
 */
function showWait() {
    $("body").addClass("loading");
}

/**
 *Hides the wait animation modal
 *
 */
function hideWait() {
    $("body").removeClass("loading");
}

/**
 *It is executed when a modal is closed, it can be change to set the close modal behavior. 
 *
 */
var callbackCloseModal = function() {};

/**
 *Format the string or number to money format
 *
 * @param {string|number} n the value to format
 * @param {boolean} nosymb if true the $ symbol is not added
 * @returns {string}
 */
function formatMoney(n,nosymb) {
    n=n+"";
    n = n.replace(/,/g, '').replace(/\$/g, '');
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = ".",
        t = ",",
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (nosymb?"":"$ ")+(j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

/**
 * Contains the functions and flags to simulate an sync ajax request for catalogs
 * @namespace
 * @property {Object[]} verifyCatalogs.catToVerify contains the catalogs to get
 * @property {number} verifyCatalogs.catIndex contains the catToVerify array index
 * @property {function} verifyCatalogs.callback contains the callback function when all the catalogs is got
 * @property {function} verifyCatalogs.loopCatalogs is executed for each catalog, it execute the loadModule.getCatalog function
 */
var verifyCatalogs = {
    catToVerify: [],
    catIndex: -1,
    callback: function() {},
    loopCatalogs: function() {
        verifyCatalogs.catIndex++;
        if (verifyCatalogs.catIndex < verifyCatalogs.catToVerify.length) {
            showWait();
            if(verifyCatalogs.catToVerify[verifyCatalogs.catIndex]=="STATES"){
                loadModule.getStates();
            }else{
                loadModule.getCatalog(verifyCatalogs.catToVerify[verifyCatalogs.catIndex], verifyCatalogs.loopCatalogs);
            }
        }else{
            verifyCatalogs.catToVerify = [];
            verifyCatalogs.catIndex = -1;
            verifyCatalogs.callback();
            verifyCatalogs.callback = function() {};
            hideWait();
        }
    }
};

/**
 *Main function to get sync catalogs.
 *
 * @param {Object[]} _cat array of catalogs to get
 * @param {function} _callback callback function when all the catalogs is got
 */
var fn_verifyCatalogs= function(_cat, _callback){
    verifyCatalogs.catToVerify = _cat;
    verifyCatalogs.callback=_callback;
    verifyCatalogs.loopCatalogs();
};

/**
 *Creates the sticky float buttons
 *
 */
function fillHelpSticky() {
    var helpStickyConfig = {
        placement: 'left',
        trigger: "click",
        html: true,
        closeOnClickOutside: true,
        title: '',
        tooltiptitle: {
            contactPhone: contact.phonetext,
            contactEmail: contact.email
        }
    };
    if (isMobile.any()) {
        $("body").addClass("mobile");
        helpStickyConfig.placement = 'top';
        helpStickyConfig.tooltiptitle.contactPhone = '<a href="tel:+52'+contact.phone+'">'+contact.phonetext+'</a>';
        helpStickyConfig.tooltiptitle.contactEmail = '<a href="mailto:'+contact.email+'">'+contact.email+'</a>';
    }
    new Tooltip($("#call_h"),helpStickyConfig)
        .updateTitleContent('<div class="tooltip_title">Ll\u00e1manos</div>' +
        '<div class="tooltip_message">Será un placer atenderte por télefono,'+
        '<b> de lunes a viernes </b>de <b>9 </b> a <b>18 h</b> en el:</div>'+
        '<div class="tooltip_contact">'+helpStickyConfig.tooltiptitle.contactPhone+'</div>'+
        '<div class="tooltip_message">Tiempo medio de espera:<br><b>5 minutos</b></div>');

    new Tooltip($("#email_h"),helpStickyConfig)
        .updateTitleContent('<div class="tooltip_title">Escríbenos</div>' +
        '<div class="tooltip_message">Será un placer atenderte por correo</div>'+
        '<div class="tooltip_contact">'+helpStickyConfig.tooltiptitle.contactEmail+'</div>'+
        '<div class="tooltip_message">Tiempo medio de espera:<br><b>24 horas</b></div>');

    helpScoolTooltip = new Tooltip($("#help_sh"),helpStickyConfig);
    helpScoolTooltip.updateTitleContent('<div class="tooltip_title">¿Te podemos ayudar?</div>' +
        '<div class="tooltip_message">Hemos detectado que no encuentras tu escuela</div>'+
        '<div class="btn_ht"><span title="Sí" aria-label="Sí" class="btn__basic btn__small" id="st_btn_reportschool">'+
            '<span aria-hidden="true">Sí</span>'+
        '</span></div>'+
        '<div class="btn_ht"><span title="No" aria-label="No" class="btn__basic btn__small" id="st_btn_cancel">'+
            '<span aria-hidden="true">No</span>'+
        '</span></div>');
    helpSticky();
}

/**
 *Add the help sticky buttons an event listener
 *
 */
function helpSticky() {
    $(".btn_help").click(function(e){
        e.preventDefault();
        if($(this).hasClass("active")){$(this).removeClass("active")}else{$(".btn_help").not("id", $(this).attr("id")).removeClass("active");
        $(this).addClass("active");}
    });

    $(".page-container").click(function() {
        if ($(".btn_help").hasClass("active")){
            $(".btn_help").removeClass("active");
            helpScoolTooltip.hide();
        }
    });
}

/**
 * Concatenates spaces at the end of the string until it has the size indicated
 * @param {string} str the string to extend length
 * @param {number} size the final string size
 * @return {string} the final string in uppercase
 */
function concatSpace(str, size){
    str = str.toUpperCase().replace(/Á/gi, "A").replace(/É/gi, "E").replace(/Í/gi, "I").replace(/Ó/gi, "O").replace(/Ú/gi, "U");
    return str.concat(" ".repeat(size - str.length));
}

/**
 *Validate if the element has an empty option value, if not, the empty option is added and selected.
 *
 * @param {Object} $el DOM combo option
 */
function validateEmptyOption($el) {
    _tmpOpts = $el.data('options') || [];
    _hasEmptyOp = false;
    for (var _io = 0; _io < _tmpOpts.length; _io++) {
        if (_tmpOpts[_io].id==0 || _tmpOpts[_io].id=="0") {
            _hasEmptyOp=true;
            break;
        }
    }
    if (!_hasEmptyOp) {
        _descSt = dommySchools.getDommyDescription();
        _tmpOpts.push({id: 0, description: _descSt});
        $el.comboSelect(_tmpOpts);
    }
    $el.data('selected', {id: 0, description: _descSt});
    $el.removeComboError();
    $el.find(".option-text").removeClass("center");
    $el.find(".selected-option").text(_descSt);
}

//*** SCROLL ANIMATION ***

// Get the navbar
var navbar = document.getElementsByClassName("header");

/**
 * Get current browser viewpane heigtht
 */
function _get_window_height() {
  return window.innerHeight || 
         document.documentElement.clientHeight ||
         document.body.clientHeight || 0;
}

/**
* Get current absolute window scroll position
*/
function _get_window_Yscroll() {
  return window.pageYOffset || 
         document.body.scrollTop ||
         document.documentElement.scrollTop || 0;
}

/**
* Get current absolute document height
*/
function _get_doc_height() {
  return Math.max(
      document.body.scrollHeight || 0, 
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0, 
      document.documentElement.offsetHeight || 0,
      document.body.clientHeight || 0, 
      document.documentElement.clientHeight || 0
  );
}


/**
* Get current vertical scroll percentage
*/
function _get_scroll_percentage() {
  return (
      (_get_window_Yscroll() + _get_window_height()) / _get_doc_height()
  ) * 100;
}



/**
 *When de page is scolling, it adds the sticky class to the navigation bar to keep it always on top
 *
 */
window.onscroll = function() {
  if (window.pageYOffset > 0) {
    if (_get_scroll_percentage() < 80) {
      navbar[0].classList.add("sticky");
    }
  } else {
    navbar[0].classList.remove("sticky");
  }
};
