/**
 * @file Contains the main function to load and inset templates, also contains the template configurations.
 */

/**
 * Represents the structure for loading a template
 * @namespace
 * @property {Object} templates[name] - Object that represents an success view template
 * @property {string} templates[name.path] - template root path
 * @property {function} templates[name.onload] - function that is executed once the template is inserted
 */
var templates = {
    "conf": {
        path: "./views/modal/confirm_m.html",
        onload: fn_confirmModal
    },
    "ufile": {
        path: "./views/modal/uploadfile.html",
        onload: fn_uploadfilemodal
    },
    "notify": {
        path: "./views/modal/notifications.html",
        onload: fn_opennotification
    }
};

/**
 * Load a template
 *
 * @param {Object} element Represent a DOM object
 * @param {Object} template  Represents a view template
 * @param {Object} data Info are passed to the template to render
 * @param {string} inserttype Template insertion Type with respect to the DOM object
 */
function loadTemplate(element,template,data,inserttype){
    function placeTemplate(templatetext) {
        var temp = $(Mustache.to_html(templatetext,data));
        element[inserttype](temp);
        if (inserttype=="html")window.validateControl(element);
        if (typeof template.html !== 'undefined') {
            template.html = templatetext;
        }
        template.onload(temp,data);
    }

    if (typeof inserttype === "undefined") inserttype="html";
    if(!template){console.error("loadTemplate: template is undefined ["+element+"]");return;}
    if(data){
        if (typeof template.html !== 'undefined') {
            placeTemplate(template.html);
        }else if (typeof template.path !== 'undefined') {
            $.get(template.path,placeTemplate);
        }
    }else{
        console.warn("loadTemplate: data is null ["+template+"]");
    }
}

/**
 * Represents a mini template view
 * @namespace
 * @property {Object} miniTemplates[name] - Object that represents a mini template
 * @property {function} miniTemplates[name.onload] - Function that is executed once the template is inserted
 * @property {string} miniTemplates[name.html]  - Represents the template and renders the variables passed to the template
 */
var miniTemplates = {
    success: {
        onload: fn_aceptModal,
        html: '<div class="title-gray">'+
                '{{title}}'+
            '</div>'+
            '<div class="step-container">'+
                '<div class="icon-m icon-s"></div>'+
                '<div class="grid-c">'+
                    '<div class="grid-item">'+
                        '<div class="message-modal">'+
                            '<div>{{message}}</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="actionsection">'+
                    '<div class="submtbtn">'+
                        '<span title="Enviar" aria-label="Enviar" class="btn__basic btn_acept">'+
                            '<span aria-hidden="true">Aceptar</span>'+
                        '</span>'+
                    '</div>'+
                '</div>'+
            '</div>'
    },
    error: {
        onload: fn_aceptModal,
        html: '<div class="title-gray">'+
                '{{title}}'+
            '</div>'+
            '<div class="step-container">'+
                '<div class="icon-m icon-e"></div>'+
                '<div class="grid-c">'+
                    '<div class="grid-item">'+
                        '<div class="message-modal">'+
                            '<div>{{message}}</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="actionsection">'+
                    '<div class="submtbtn">'+
                        '<span title="Enviar" aria-label="Enviar" class="btn__basic btn_acept">'+
                            '<span aria-hidden="true">Aceptar</span>'+
                        '</span>'+
                    '</div>'+
                '</div>'+
            '</div>'
    },
    notification: {
        onload: fn_closeNotification,
        html: '<div class="notification {{type}}" style="display: none;">'+
                    '<div class="wrapper">'+
                        '<div class="icon">'+
                            '<i class="bbva-icon"></i>'+
                        '</div>'+
                        '<div class="message">'+
                            '<div class="message__heading">'+
                                '{{title}}'+
                            '</div>'+
                            '<span class="message__body">'+
                                '{{message}}'+
                            '</span>'+
                        '</div>'+
                        '<div class="close-button">'+
                            '<i class="bbva-icon ui-x"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    },
    filepreview: {
        html: '<div class="uploadfile animated fadeInLeft">' +
            '<div class="wrapper">' +
            '<div class="message">' +
            '<div class="message__heading dz-filename"><span data-dz-name></span></div>' +
            '<span class="message__body">' +
            '<span class="remove btn-delete-file"><i class="ui-trash"></i> Eliminar</span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>'
    },
    visorProfile: {
        onload: function(){},
        html: '<div id="profile-view">'+
                '<figure>'+
                    '<img src="{{photo}}" alt="">'+
                '</figure>'+
               '</div>'+
               '<div class="submtbtn">'+
                  '<span title="Continuar" aria-label="Continuar" class="help_section" id="btn_change_profile">' +
                     '<span aria-hidden="true" class="h_h1">Cambiar foto <i class="bbva-icon ui-camera"></i></span>' +
                  '</span>'+
                '</div>'
    },
    
};