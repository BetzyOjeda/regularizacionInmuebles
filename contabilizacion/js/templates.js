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
    "school": {
        path: "./views/modal/no_school.html",
        onload: fn_reportschool
    },
    "family": {
        path: "./views/modal/familymember.html",
        onload: fn_familymodal
    },
    "efamily": {
        path: "./views/modal/efamilymember.html",
        onload: fn_efamilymodal
    },
    "fambbva": {
        path: "./views/modal/fam_bbva.html",
        onload: fn_fam_bbva
    },
    "deletefam": {
        path: "./views/modal/delete_fam.html",
        onload: fn_deleteFam
    },
    "selectboss": {
        path: "./views/modal/select_boss.html",
        onload: fn_selectboss
    },
    "confirmAllData": {
        path: "./views/modal/confirm_data.html",
        onload: fn_confirmAllModal
    },
    "confirmemail": {
        path: "./views/modal/confirm_email.html",
        onload: fn_confirmemail
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
    btnnotification: {
        onload: fn_closeBtnNotification,
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
                        '<div><span title="{{button}}" aria-label="{{button}}" class="btn__basic btn__addfam" data-group="{{section}}">'+
                            '<span aria-hidden="true">{{button}}</span>'+
                        '</span></div>'+
                    '</div>'+
                '</div>'
    },
    shcolarshipdetail: {
        onload: function () {},
        html: '<p><i class="bbva-icon ui-gradution-cap"></i>Tipo de apoyo: {{tipo}}</p><p><i class="bbva-icon ui-receipt"></i>Programa o institución: {{programa}}</p><p><i class="bbva-icon ui-ticket"></i>Monto mensual: ${{monto}}</p>'
    },
    familymembercard: {
        onload: fn_familymembercard,
        html: '<div class="grid-item card gray familycard animated fadeIn">'+
                '<p class="title">{{fam_name}} {{fam_appat}} {{fam_apmat}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{fam_relationship_des}}</p>'+
                '<div class="separator"></div>'+
                '<p class="checkbox-area">'+
                    '<span class="text inf">Jefe del hogar&nbsp;</span>'+
                    '<span class="checkbox familycardboss disabled{{familybossclass}}" data-member="{{memberid}}"><i class="bbva-icon ui-checkmark"></i></span>'+
                '</p>'+
                '<div class="moreinfo">'+
                    '<p class="inf">Edad: <span>{{fam_age}}</span></p>'+
                    '<p class="inf">Sexo: <span>{{fam_gender.description}}</span></p>'+
                    '<p class="inf">Estado civil: <span>{{fam_civil.description}}</span></p>'+
                    '<p class="inf">Grado de estudio: <span>{{fam_schoollevel.description}}</span></p>'+
                    '<p class="inf">Asiste a la escuela: <span>{{fam_studing.description}}</span></p>'+
                    '<p class="inf">Ocupación: <span>{{fam_ocupation.description}}</span></p>'+
                    '<p class="inf">Atención médica: <span>{{fam_medic.description}}</span></p>'+
                    '<p class="inf">Ingresos mensuales: <span>${{total_f}} MXN</span></p>'+
                    '<p class="inf">Trabajó el último mes: <span>{{fam_worked.description}}</span></p>'+
                    '<p class="inf">Recibe otra beca: <span>{{fam_otherschoolarship.description}} <i class="bbva-icon ui-show scholarship-tooltip" data-tooltip="{{infoscolarship}}"></i></span></p>'+
                '</div>'+
                '<div class="centertext">'+
                    '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg btn_editmember" data-member="{{memberid}}">'+
                        '<i class="bbva-icon ui-edit icon-fix"></i>'+
                        '<span aria-hidden="true">Modificar</span>'+
                    '</span>'+
                    '<span title="Eliminar" aria-label="Eliminar" class="btn__basic btn__clearbg btn_deletemember" data-member="{{memberid}}">'+
                        '<i class="bbva-icon ui-trash icon-fix"></i>'+
                        '<span aria-hidden="true">Eliminar</span>'+
                    '</span>'+
                '</div>'+
            '</div>'
    },
    efamilymembercard: {
        onload: fn_efamilymembercard,
        html:   '<div class="grid-item card gray familycard animated fadeIn">'+
                    '<p class="title">{{fam_name}} {{fam_appat}} {{fam_apmat}}<i class="bbva-icon ui-profile"></i></p>'+
                    '<p class="relationship">{{fam_relationship_des}}</p>'+
                    '<div class="separator"></div>'+
                    '<div class="moreinfo">'+
                        '<p class="inf">Ocupación: <span>{{fam_ocupation.description}}</span></p>'+
                        '<p class="inf">Vive: <span>{{fam_lives.description}}</span></p>'+
                        '<p class="inf">Aporta: <span>${{total_f}} MXN</span></p>'+
                    '</div>'+
                    '<div class="centertext">'+
                        '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg btn_editemember" data-member="{{memberid}}">'+
                            '<i class="bbva-icon ui-edit icon-fix"></i>'+
                            '<span aria-hidden="true">Modificar</span>'+
                        '</span>'+
                    '<span title="Eliminar" aria-label="Eliminar" class="btn__basic btn__clearbg btn_deletememberaway" data-member="{{memberid}}">'+
                        '<i class="bbva-icon ui-trash icon-fix"></i>'+
                        '<span aria-hidden="true">Eliminar</span>'+
                    '</span>'+
                    '</div>'+
                '</div>'
    },
    familybbvacard: {
        onload: fn_modify_bbva,
        html: '<div class="grid-item card gray familycard bounce">'+
                    '<p class="title">{{name_fbbva}} {{lastname_fbbva}} {{slastname_fbbva}}<i class="bbva-icon ui-profile"></i></p>'+
                    '<p class="relationship">{{relationship.description}}</p>'+
                    '<div class="separator"></div>'+
                '<div class="moreinfo">'+
                    '<p class="inf">Puesto: <span>{{workposition_fbbva}}</span></p>'+
                    '<p class="inf">Área de trabajo: <span>{{workstation_fbbva}}</span></p>'+
                '</div>'+
                '<br>'+
                '<div class="centertext">'+
                    '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg" id="btn_modify_bbva">'+
                        '<i class="bbva-icon ui-edit icon-fix"></i>'+
                        '<span aria-hidden="true">Modificar</span>'+
                    '</span>'+
                '</div>'+
            '</div>'
    },
    m_familycard: {
        onload: fn_nothing,
        html: '<div class="grid-item card gray  familycard mod">'+
                '<p class="title">{{name}} {{lastName}} {{secondLastName}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{relationship.description}}</p>'+
                '<div class="separator"></div>'+
                '<div class="read-only">'+
                    '<p>Edad: <span>{{personDetail.age}}</span></p>'+
                    '<p>Sexo: <span>{{personDetail.gender.id}}</span></p>'+
                    '<p>Estado civil: <span>{{personDetail.maritalStatus.description}}</span></p>'+
                    '<p>Grado de estudio: <span>{{personDetail.education.description}}</span></p>'+
                    '<p>Asiste a la escuela: <span>{{student}}</span></p>'+
                    '<p>Ocupaci&oacute;n: <span>{{personDetail.economicActivity.description}}</span></p>'+
                    '<p>Atenci&oacute;n m&eacute;dica: <span>{{personDetail.healthCareEntity.description}}</span></p>'+
                    '<p>Ingresos mensuales: <span>{{incomesamount}} MXN</span></p>'+
                    '<p>Trabaj&oacute; el &uacute;ltimo mes: <span>{{hasWorked}}</span></p>'+
                    '<p>Recibe otra beca: <span>{{isotherG}}</span></p>'+
                    '<div style="display: {{fam_otherschoolarship}}">'+
                        '<p>Tipo de beca: <span>{{personDetail.otherGovernmentScholarship.otherGovernmentScholarshipType.description}}</p>'+
                        '<p>Programa de beca: <span>{{otherScholarshipProgramDescription}}</p>'+
                        '<p>Monto de la beca: <span>{{otherGovernmentScholarshipamount}} MXN</p>'+
                    '</div>'+
                '</div>'+
            '</div>'
    },
    m_efamilycard: {
        onload: fn_nothing,
        html: '<div class="grid-item card gray  familycard mod">'+
                '<p class="title">{{name}} {{lastName}} {{secondLastName}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{relationship.description}}</p>'+
                '<div class="separator"></div>'+
                '<div class="read-only">'+
                    '<p>Ocupaci&oacute;n: <span>{{personDetail.economicActivity.description}}</span></p>'+
                    '<p>Vive: <span>{{personDetail.residencePlace.description}}</span></p>'+
                    '<p>Aporta: <span>{{incomesamount}} MXN</span></p>'+
                '</div>'+
            '</div>'
    },
    m_bbvafamilycard: {
        onload: fn_nothing,
        html: '<div class="grid-item card gray  familycard mod bounce">'+
                '<p class="title">{{name}} {{lastName}} {{secondLastName}}<i class="bbva-icon ui-profile"></i></p>'+
                '<p class="relationship">{{relationship.description}}</p>'+
                '<div class="separator"></div>'+
                '<div class="read-only">'+
                    '<p>Puesto: <span>{{personDetail.professionPosition}}</span></p>'+
                    '<p>&Aacute;rea de trabajo: <span>{{personDetail.managementUnit}}</span></p>'+
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