/**
 * @file Contains the functions that is executed when the templates are loaded into the web page, for each template exists a function to execute, those functions has two params, the first one is the DOM template and the second one is the JSON object sended to the template
 */

/**
 *Do nothing, it is used it a function is required
 *
 */
var fn_nothing = function () {
    return;
};

/**
 *Show the generic modal
 *
 */
var fn_showModal = function () {
    $("#modal_generic").attr('open', '');
};

/**
 *Hide the generic modal
 *
 */
var fn_hideModal = function () {
    $("#modal_generic").removeAttr("open");
};

/**
 *Accept modal loaded function
 *
 * @param {Object} _tmp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_aceptModal = function (_tmp,data) {
    fn_showModal();
    if (data.redirectToLogin) {
        $(".btn_acept").click(function (e) {
            e.preventDefault();
            redirectToLogin();
        });
    }else{
        if (typeof data.onAccept == 'function') {
            $(".btn_acept").click(function(){
                data.onAccept();
                fn_hideModal();
            });
        }else{
            $(".btn_acept").click(function (e) {
                e.preventDefault();
                fn_hideModal();
            });
        }
    }
};

/**
 *Delete family template function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_deleteFam = function (_temp, data) {
    fn_showModal();
    _temp.find("#btn_delete").click(data.onAccept.bind(data));
    _temp.find("#btn_decline").click(data.onDecline.bind(data));
    if (data.origin == 'family') {
        callbackCloseModal = function () {
            if ($('#n_family').getOptionSelected().id != family.fromhome.members.length) {
                $('#n_family').selectOptionId(family.fromhome.members.length);
            }
            callbackCloseModal = function () {};
        };
    } else {
        callbackCloseModal = function () {
            if ($('#extrafamily').getOptionSelected().id != family.awayfromhome.members.length) {
                $('#extrafamily').selectOptionId(family.awayfromhome.members.length);
            }
            callbackCloseModal = function () {};
        };
    }

};

/**
 *Select boss template function
 *
 * @param {Object} _temp the template DOM element
 */
var fn_selectboss = function (_temp) {
    /**
     *If the modal is closed, it is shown again
     */
    callbackCloseModal = function () {
        loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":family.fromhome.getMembers()});
        fn_showModal();
    };
    var $checkBoss = _temp.find(".checkbox");
    $checkBoss.ckeckCallback(function (thisCheckbox) {
        $("#formselectboss").find(".checkbox").addClass("disabled");
        thisCheckbox.removeClass("disabled");
    }, function () {
        $("#formselectboss").find(".checkbox").removeClass("disabled");
    });
    _temp.find("#btn_accept").click(function () {
        var bossSelected = $("#formselectboss").find(".checkbox.checked");
        function showBossError(_message) {
            if ($("#formselectboss").prev(".notification.error").length) $("#formselectboss").prev(".notification.error").remove();
            loadTemplate($("#formselectboss"), miniTemplates.notification, {
                type: 'error',
                title: 'Lo sentimos',
                message: _message
            }, 'before');
        }
        if (bossSelected.length == 0) {
            showBossError('Debes seleccionar a un jefe de familia');
        } else if (bossSelected.length == 1) {
            var bossIndex = Number(bossSelected.attr("data-index"));
            for (var i in family.fromhome.members) {
                if (i == bossIndex) {
                    family.fromhome.members[i].familyBoss = "Sí";
                } else {
                    family.fromhome.members[i].familyBoss = "No";
                }
            }
            fn_hideModal();
            callbackCloseModal = function () {};
            $("html").animate({
                scrollTop: $("#nfamilylist").offset().top - 200
            }, 1000, "swing", function () {
                $("#nfamilylist").empty();
                for (var i in family.fromhome.members) {
                    if (family.fromhome.members[i].fam_worked.id === undefined) {
                        family.fromhome.members[i].fam_worked.id = "false";
                        family.fromhome.members[i].fam_worked.description = "No";
                    }
                    if (family.fromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                    }
                }
            });
        } else {
            showBossError('Sólo puedes seleccionar a un jefe del hogar');
        }
    });
    fn_showModal();
};

/**
 *Confirm modal template function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_confirmModal = function (_temp, data) {
    data.onDecline = typeof data.onDecline == "function" ? data.onDecline : fn_hideModal;
    fn_showModal();
    _temp.find(".btn_acept").click(data.onAccept.bind(data));
    _temp.find(".btn_decline").click(data.onDecline.bind(data));
};

/**
 *Confirm all data modal function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_confirmAllModal = function (_temp, data) {
    data.onDecline = typeof data.onDecline == "function" ? data.onDecline : fn_hideModal;
    if (moduleInitData.announcement.scholarshipProgram.id != "7") {_temp.find(".inidatam").hide();}
    _familyMembers = jQuery.extend(true, {}, moduleInitData.sociodemographic);
    _famFromHome = [];
    _famAwayFromHome = [];
    _bbvamember = {};
    for (_i = 0; _i < _familyMembers.relatedPersons.length; _i++) {
        _member = _familyMembers.relatedPersons[_i];
        if (_member.personDetail.personType == "PERSONS_LIVE_HOME") {
            _famFromHome.push(_member);
        }else if (_member.personDetail.personType == "NOT_LIVE_HOME_ECONOMIC_SUPPORT") {
            _famAwayFromHome.push(_member);
        }else if (_member.personDetail.personType == "RELATIVE_WORKS_BBVA") {
            _bbvamember = _member;
        }
    }
    _temp.find("#n_fromhome").text(_famFromHome.length);
    if (_famFromHome.length) {
        for (_i = 0; _i < _famFromHome.length; _i++) {
            _famh = _famFromHome[_i];
            _famh.student = _famh.personDetail.isStudent?"Sí":"No";
            _famh.hasWorked = _famh.personDetail.hasWorkedLastMonth?"Sí":"No";
            _famh.otherScholarshipProgramDescription = "";
            _famh.otherGovernmentScholarshipamount = "";
            if (__.get(_famh,"personDetail.otherGovernmentScholarship.id","")!="") {
                _famh.isotherG = "Sí";
                _famh.fam_otherschoolarship = "block";
                _famh.otherScholarshipProgramDescription = _famh.personDetail.otherGovernmentScholarship.description;
                _famh.otherGovernmentScholarshipamount = formatMoney(_famh.personDetail.otherGovernmentScholarship.incomes[0].amount);
            }else{
                _famh.isotherG = "No";
                _famh.fam_otherschoolarship = "none";
            }
            _famh.incomesamount = formatMoney(_famh.personDetail.incomes[0].amount);
            loadTemplate(_temp.find("#membersfromhome"), miniTemplates.m_familycard, _famh,"append");
        }
    }else {
        _temp.find("#membersfromhome").remove();
    }

    _temp.find("#n_awayhome").text(_famAwayFromHome.length);
    if (_famAwayFromHome.length) {
        for (_i = 0; _i < _famAwayFromHome.length; _i++) {
            _fam = _famAwayFromHome[_i];
            _fam.incomesamount = formatMoney(_fam.personDetail.incomes[0].amount);
            loadTemplate(_temp.find("#membersawayhome"), miniTemplates.m_efamilycard, _fam,"append");
        }
    }else {
        _temp.find("#membersawayhome").remove();
    }

    _temp.find("#n_bbva").text(Object.keys(_bbvamember).length?"1":"0");
    if (Object.keys(_bbvamember).length) {
        loadTemplate(_temp.find("#bbvamember"), miniTemplates.m_bbvafamilycard, _bbvamember);
    }else {
        _temp.find("#bbvamember").remove();
    }

    fn_showModal();
    _temp.find(".btn_acept").click(data.onAccept.bind(data));
    _temp.find(".btn_decline").click(data.onDecline.bind(data));
};

/**
 *Confirm email modal template
 *
 * @param {Object} _temp the template DOM element
 */
var fn_confirmemail = function (_temp) {
    callbackCloseModal = function () {
        loadTemplate($("#modal_generic .body"), templates.confirmemail, {
            c_email: dataStudent.contactInf[0].email
        });
    };
    _temp.find("#econt").data("complete", function(_data) {
        if (_data.c_email != _data.c_email2) {
            $("#c_email2").showError("Los correos no coinciden");
            return;
        }
        callbackCloseModal = function () {};
        fn_hideModal();
        restExec({
            service: 'MODIF_UPLOADSCHOLAR',
            data: {
                "userCurrent": "ALUMNO",
                "registerType": "2",
                "student": [
                    {
                        "studentId": "",
                        "scholarUser": ivUser.trim(),
                        "programType": dataStudent.programKey,
                        "statusDispersion": dataStudent.statusDispersion,
                        "originRegion": dataStudent.originRegion,
                        "schoolCycle": dataStudent.schoolCycle,
                        "cdAssignedCR": dataStudent.cdAssignedCR,
                        "assignedCR": dataStudent.assignedCR,
                        "scholarNumber": dataStudent.scholarNumber,
                        "accountNumber": dataStudent.accountNumber,
                        "folioPhoto": "",
                        "name": dataStudent.name.trim(),
                        "firstName": dataStudent.firstName.trim(),
                        "lastName": dataStudent.lastName.trim(),
                        "CURP": dataStudent.CURP,
                        "scholarBirthdate":  dataStudent.scholarBirthdate.trim(),
                        "gender": dataStudent.gender,
                        "schoolData": [{
                            "duration": "",
                            "turn": "",
                            "typeCareer": "",
                            "nameCareer": "",
                            "area": "",
                            "school": [
                                {
                                    "cdState": "",
                                    "state": "",
                                    "cdMunicipality": "",
                                    "municipality": "",
                                    "CCT": "",
                                    "control": "",
                                    "initials": "",
                                    "type": "",
                                    "name": "",
                                    "domicile": ""
                                }
                            ]
                        }],
                        "domicile": [
                            {
                                "street": dataStudent.domicile[0].street.trim(),
                                "locality": dataStudent.domicile[0].locality.trim(),
                                "numExterior": dataStudent.domicile[0].numExterior.trim(),
                                "numInterior": dataStudent.domicile[0].numInterior.trim(),
                                "codePostal": dataStudent.domicile[0].codePostal.trim(),
                                "cdMunicipality": dataStudent.domicile[0].cdMunicipality.trim(),
                                "municipality": dataStudent.domicile[0].municipality.trim(),
                                "colony": dataStudent.domicile[0].colony.trim(),
                                "cdState": dataStudent.domicile[0].cdState.trim(),
                                "state": dataStudent.domicile[0].state.trim(),
                                "betweenStreet": dataStudent.domicile[0].betweenStreet.trim(),
                                "typeOfRoad1": dataStudent.domicile[0].typeOfRoad1.trim(),
                                "andTheStreet": dataStudent.domicile[0].andTheStreet.trim(),
                                "typeOfRoad2": dataStudent.domicile[0].typeOfRoad2.trim(),
                                "behindStreet": dataStudent.domicile[0].behindStreet.trim(),
                                "typeOfRoad3": dataStudent.domicile[0].typeOfRoad3.trim(),
                                "particularReferences": dataStudent.domicile[0].particularReferences.trim()
                            }
                        ],
                        "contactInf": [
                            {
                                "homePhone": dataStudent.contactInf[0].homePhone.trim(),
                                "cellPhone": dataStudent.contactInf[0].cellPhone.trim(),
                                "messagePhone": dataStudent.contactInf[0].messagePhone.trim(),
                                "email": _data.c_email.trim(),
                                "email1": dataStudent.contactInf[0].email1.trim(),
                                "email2": dataStudent.contactInf[0].email2.trim(),
                                "facebook": ""
                            }
                        ],
                        "tutorData": [
                            {
                                "tutorName": dataStudent.tutorData[0].tutorName.trim(),
                                "firstNameTutor": dataStudent.tutorData[0].firstNameTutor.trim(),
                                "lastNameTutor": dataStudent.tutorData[0].lastaNameTutor.trim(),
                                "kinship": dataStudent.tutorData[0].kinship.trim(),
                                "kinshipType": dataStudent.tutorData[0].kinshipType.trim()
                            }
                        ],
                        "program": [
                            {
                                "status": "",
                                "modalityParticipation": "",
                                "generation": "",
                                "originResources": "",
                                "projectSEPNumber": "",
                                "numberNMDP": "",
                                "schoolGrade": "",
                                "resultImpactEvaluation": ""
                            }
                        ]
                    }
                ]
            },
            showWait: true,
            success: function () {
                loadModule.scholarshipAnnouncement();
            }
        });
    });
    fn_showModal();
};

/**
 *Report school modal function
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} _data the JSON object sended to the template
 */
var fn_reportschool = function (_temp, _data) {
    $(".modal .closemodal").click(function () {
        $(this).parents(".modal").removeAttr("open");
    });
    $("input.reflectable").each(function () {
        inpval = $(this).val().trim();
        $newinp = $($(this).attr("data-reflecto"));
        $newinp.val(inpval);
        if ($newinp.val() != "") {
            $($(this).attr("data-reflecto")).siblings('.placeholder-simulator').attr("style",
                "top: 5px; font-size: 12px;");
        }
    });
    $(".form-group-select.reflectable").each(function () {
        dataOptions = $(this).data('options');
        $reflectTo = $($(this).attr("data-reflecto"));
        if (dataOptions != undefined) {
            $reflectTo.reset();
            $reflectTo.comboSelect(dataOptions);
            opSelected = $(this).getOptionSelected();
            if (opSelected != null) {
                $reflectTo.selectOptionId(opSelected.id);

            }
        }
    });
    if ($("#m_state_s").getOptionSelected()!=null && $("#m_state_s").getOptionSelected().id == "0") {
        $("#m_state_s").reset();
    }
    if ($("#m_municipalities_s").getOptionSelected()!=null && $("#m_municipalities_s").getOptionSelected().id == "0") {
        $("#m_municipalities_s").reset();
    }
    fn_showModal();
    state_id = $("#state_s").getOptionSelected().id;
    mun_id = $("#municipalities_s").getOptionSelected().id;
    state_id = $("#state_s").getOptionSelected().id;
    mun_id = $("#municipalities_s").getOptionSelected().id;
    loadModule.getCatalog("CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id, function () {
        _cat = catalogs["CAT_TPO_ESCUELA-"+state_id+"-"+mun_id+"-"+moduleInitData.announcement.scholarshipProgram.id].slice(0);
        _cat.push({
            "id": "x",
            "description": "Ninguno de los anteriores"
        });
        fnFillCatalogs("schoolType", _cat, function() {});
    });

    $('#m_state_s').onSelect(function (el) {
        loadModule.getMunicipalities(el.id, function () {
            $("#m_municipalities_s").reset();
            fnFillCatalogs("m_municipalities_s", municipalityTransactions[el.id]);
        });
    });

    $("#schoolform").data("complete", function (_data) {
        dateArray = moduleInitData.general.currentDate.split("-");
        var date="";
        var level="";
        month.find(function(index){
            if(index.id == dateArray[1]){
                date = dateArray[0]+" DE "+index.monthcomplete+" DE "+dateArray[2];
            }
        });
        if(moduleInitData.announcement.scholarshipProgram.id == "1"){
            level= "SECUNDARIA";
        }else if(moduleInitData.announcement.scholarshipProgram.id == "2"){
            level="PREPARATORIA";
        }else if(moduleInitData.announcement.scholarshipProgram.id == "7"){
            level="UNIVERSIDAD";
        }
        function messageBody(_arr) {
            _Tstr = "";
            for (var _k = 0; _k < _arr.length; _k++) {
                var element = _arr[_k];
                _Tstr = _Tstr + concatSpace(element.str,element.size);
            }
            return _Tstr;
        }
        var arrayValues = [{
                str: date,
                size: 25
            },
            {
                str: moduleInitData.general.student["0"].name,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].firstName,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].lastName,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].domicile["0"].state,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].domicile["0"].municipality,
                size: 50
            },
            {
                str: moduleInitData.general.student["0"].contactInf["0"].email,
                size: 100
            },
            {
                str: moduleInitData.general.student["0"].contactInf["0"].homePhone,
                size: 10
            },
            {
                str: _data.m_state_s.description,
                size: 50
            },
            {
                str: _data.m_municipalities_s.description,
                size: 50
            },
            {
                str: level,
                size: 50
            },
            {
                str: _data.schoolType.description,
                size: 150
            },
            {
                str: _data.m_school,
                size: 100
            }
        ];
        restExec({
            "service": "SEND_NOTIFICATION",
            "data": {
                "eventCode" : "0000001843",
                "senderId" : "0000000001",
                "devices": [
                    {
                        "id": "102",
                        "serviceProvider": {
                            "id": "@@@"
                        },
                        "receivers": [
                            scholsEmail[_data.m_state_s.id]
                        ]
                    }
                ],
                "message" : {
                      "messageBody" : messageBody(arrayValues)
                }
            },
            "success": fn_send_no_school,
            "showWait": true
        });
    });
};

/**
 *Show the report school success message
 *
 */
var fn_send_no_school = function (resp) {
    fn_hideModal();
    if(resp.data.devices[0].status.id == "PENDING"){
        loadTemplate($("#modal_generic .body"), miniTemplates.success, {
            title: "Información enviada",
            message: "Hemos recibido tu duda, Te contactaremos en un máximo de 24 horas"
        });
    }else{
        loadTemplate($("#modal_generic .body"), miniTemplates.error, {
			title: "Ocurrió un error al realizar operación",
			message: "Ocurri\u00f3 un problema, por favor intentalo m\u00e1s tarde"
		});
    }
    validateEmptyOption($("#state_s"));
    validateEmptyOption($("#municipalities_s"));
    $("#search_by").selectRadioId("CCT");
    $("#schoolname").setValue(dommySchools.getDommyDescription());
    $("#schoolslist").searchList({
        filterid: "keyWorkplace",
        filtertext: "schoolOficialName",
        items: [{
            "keyWorkplace": dommySchools.getDommyCCT(),
            "schoolOficialName": dommySchools.getDommyDescription()
        }]
    });
    $("#schoolslist").selectFromList(dommySchools.getDommyCCT());
    $("#cct").setValue(dommySchools.getDommyCCT());
    $("#search_by .radio-buttons").addClass("disabled");
    $("input#cct").prop("disabled", true);
};

/**
 *Add family modal function
 *
 * @param {Object} _template the template DOM element
 * @param {Object} fdata the JSON object sended to the template
 */
var fn_familymodal = function (_template, fdata) {
    /**
     *Validate the relationsip selected, if selected has the id 10 (other) the specify relationship input is shown
     *
     * @param {Object} el option selected
     */
    var validateRelationship = function (el) {
        if (el.id == '10') {
            $("#fam_o_relationship").clearInput();
            $("#fam_o_relationship").attr("required", "required");
            $("#fam_other_relationship").slideDown();
        } else {
            $("#fam_o_relationship").removeAttr("required");
            $("#fam_other_relationship").slideUp();
        }
    };
    _template.find("#total_sf").each(function(){
        $(this).keyup(function(){
            var object= $().add($(this));
            if(object.val()==="0.00"){
                object.showError("La cantidad no puede ser cero");
            }
        });
    });
    $("#fam_gender").comboSelect(genders);
    $("#fam_civil").comboSelect(catalogs.CAT_EDO_CIVIL);
    $("#fam_schoollevel").comboSelect(catalogs.CAT_MAX_NVL_ESTUDIO);
    fnFillCatalogs("fam_medic", catalogs.CAT_INST_MEDICA, function (sel) {
        if (sel.id == "7") {
            $("#other_medic").slideDown();
            $("#fam_omedic").prop("required", true);
        } else {
            $("#other_medic").slideUp();
            $("#fam_omedic").clearInput();
            $("#fam_omedic").prop("required", false);
        }
    });
    $("#fam_ocupation").comboSelect(catalogs.CAT_OCUPACION);
    $("#fam_age").on("keyup", function () {
        if (Number($(this).val()) >= 14) {
            $("#age14").slideDown("slow");
            $("#fam_worked").addClass("required");
            $("#fam_worked").clearRadio();
        } else {
            $("#age14").slideUp("slow");
            $("#fam_worked").removeClass("required");
            $("#fam_worked").selectRadioId("false");
        }
    });
    $('#fam_otherschoolarship').onChecked(function (rad) {
        if (rad.id == "0") {
            $(".schoolarshiparea").slideDown();
            $("#fam_kindschoolarship").addClass("required");
            $("#fam_programschoolarship").addClass("required");
            $("#total_sf").prop("required", true);
        } else {
            $(".schoolarshiparea").slideUp();
            $("#fam_kindschoolarship").removeClass("required");
            $("#fam_programschoolarship").removeClass("required");
            $("#fam_programschoolarship").reset();
            $("#total_sf").prop("required", false);
        }
    });
    $("#fam_kindschoolarship").comboSelect(catalogs.CAT_TPO_APOYO);
    $("#fam_programschoolarship").comboSelect(catalogs.CAT_INST_APOYO, function (_ssel) {
        if (_ssel.id == "6") {
            $("#oschoolarship").slideDown();
            $("#sprogramname").prop("required", true);
        } else {
            $("#oschoolarship").slideUp();
            $("#sprogramname").prop("required", false);
            $("#sprogramname").clearInput();
        }
    });
    _isStudent = ((fdata.flags.type == 'edit' && fdata.flags.memberid == 0) || family.fromhome.index() == "1");
    if (_isStudent) {
        $("#fam_relationship").comboSelect(catalogs["CAT_PARENTESCO-Miembro"], validateRelationship);
    } else {
        var opc_famx = jQuery.extend(true, {}, {
            rel: catalogs["CAT_PARENTESCO-Miembro"]
        });
        for (i = 0; i < opc_famx.rel.length; i++) {
            element = opc_famx.rel[i];
            if (element.id == "1") {
                opc_famx.rel.splice(i, 1);
                break;
            }
        }
        $("#fam_relationship").comboSelect(opc_famx.rel, validateRelationship);
    }
    $("#familyformbtn").data("complete", function (_data) {
        _data.infoscolarship = "";

        _data.total_f = formatMoney(_data.total_f,true);
        _data.total_sf = _data.total_sf==""?"":formatMoney(_data.total_sf,true);
        if (_data.fam_otherschoolarship != null && _data.fam_otherschoolarship.id == '0') {
            _data.infoscolarship = '{"tipo":"' + _data.fam_kindschoolarship.description + '","programa": "' + _data.fam_programschoolarship.description + '","monto": "' + _data.total_sf + '"}';
        }
        if (_data.fam_relationship.id != "10") {
            _data.fam_relationship_des = _data.fam_relationship.description;
        } else {
            _data.fam_relationship_des = _data.fam_o_relationship;
        }

        if (_data.flag == "edit") {
            if (_data.alreadyExists == "true") {
                _data.statusRelated = "Edit";
            }
            family.fromhome.members[_data.memberid] = _data;
        } else {
            _data.statusRelated = "Add";
            family.fromhome.members.push(_data);
        }
        $("#formfamily").slideUp("slow", function () {
            if (family.fromhome.index() <= family.fromhome.total) {
                fn_verifyCatalogs(["CAT_INST_MEDICA", "CAT_EDO_CIVIL", "CAT_OCUPACION", "CAT_TPO_APOYO", "CAT_INST_APOYO", "CAT_PARENTESCO-Miembro", "CAT_MAX_NVL_ESTUDIO"], function () {
                    loadTemplate($("#modal_generic .body"), templates.family, family.fromhome);
                });
            } else {
                if ($("#fam_members").prev().hasClass("error")) {
                    $("#fam_members").prev().remove();
                }
                var hasFamilyBoss = false;
                for (var i in family.fromhome.members) {
                    family.fromhome.members[i].memberid = i;
                    if (family.fromhome.members[i].familyBoss == "Sí") {
                        hasFamilyBoss = true;
                    }
                }
                if (this.flag != "edit" && !hasFamilyBoss) {
                    loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":family.fromhome.getMembers()});
                } else {
                    $("html").animate({
                        scrollTop: $("#nfamilylist").offset().top - 200
                    }, 1000, "swing", function () {
                        $("#nfamilylist").empty();
                        for (var i in family.fromhome.members) {
                            if (family.fromhome.members[i].statusRelated != "Delete") {
                                loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                            }
                        }
                    });
                    fn_hideModal();
                }
            }
        }.bind(_data));
    });
    if (fdata.flags.type == 'edit') {
        membertoedit = family[fdata.flags.group].members[fdata.flags.memberid];
        membertoedit.flag = 'edit';
        membertoedit.total_f = formatMoney(membertoedit.total_f);
        membertoedit.total_sf = formatMoney(membertoedit.total_sf);
        fillForm($("#formfamily"), membertoedit);
        $("#fam_o_relationship").setValue(membertoedit.fam_o_relationship);
        if (moduleInitData.general.student["0"].firstName == "XXXXX" && moduleInitData.general.student["0"].lastName != "XXXXX") {
            _template.find("#m_checkfirstname").doCheck();
        }
        if (moduleInitData.general.student["0"].lastName == "XXXXX" && moduleInitData.general.student["0"].firstName != "XXXXX") {
            _template.find("#m_checklastname").doCheck();
        }
    }
    if (_isStudent) {
        $("#fam_relationship").selectOptionId("1");
        $("#fam_relationship,#fam_schoollevel").find(".option-select").addClass("disabled");
        _template.find("#fam_name").setValue(moduleInitData.general.student["0"].name);
        _template.find("#fam_appat").setValue(moduleInitData.general.student["0"].firstName);
        _template.find("#fam_apmat").setValue(moduleInitData.general.student["0"].lastName);
        _template.find("#fam_age").setValue(moduleInitData.general.student["0"].age);
        _template.find("#fam_gender").selectRadioId(moduleInitData.general.student["0"].gender);
        if (moduleInitData.general.student["0"].firstName == "XXXXX" && moduleInitData.general.student["0"].lastName != "XXXXX") {
            _template.find("#m_checkfirstname").doCheck();
        }
        if (moduleInitData.general.student["0"].lastName == "XXXXX" && moduleInitData.general.student["0"].firstName != "XXXXX") {
            _template.find("#m_checklastname").doCheck();
        }

        _template.find("#fam_name").prop("disabled",true);
        _template.find("#fam_appat").prop("disabled",true);
        _template.find("#fam_apmat").prop("disabled",true);
        _template.find("#fam_age").prop("disabled",true);
        _template.find("#fam_gender .radio-buttons").addClass("disabled");
        _template.find("#m_checkfirstname").addClass("disabled");
        _template.find("#m_checklastname").addClass("disabled");

        switch (moduleInitData.announcement.scholarshipProgram.id) {
            case "1":
                $("#fam_schoollevel").selectOptionId("10");
                break;
            case "2":
                $("#fam_schoollevel").selectOptionId("12");
                break;
            case "7":
                $("#fam_schoollevel").selectOptionId("15");
                break;
            default:
                break;
        }
    }
    if (Number(_template.find("#fam_age").val()) >= 14) {
        $("#age14").slideDown("slow");
        $("#fam_worked").addClass("required");
    } else {
        $("#age14").slideUp("slow");
        $("#fam_worked").removeClass("required");
        $("#fam_worked").selectRadioId("false");
    }
    _template.find(".help_section .h_h1").click(function () {
        $h1sec = $(this).siblings(".h_h1_section");
        if ($h1sec.attr("data-collapsed")=="true") {
            $(this).find(".bbva-icon").removeClass("ui-simple-up").addClass("ui-simple-down");
            $h1sec.slideUp("slow",function () {
                $(this).attr("data-collapsed","false");
            });
        }else{
            $(this).find(".bbva-icon").removeClass("ui-simple-down").addClass("ui-simple-up");
            $h1sec.slideDown("slow",function () {
                $(this).attr("data-collapsed","true");
            });
        }
    });

    /**
     *When the modal is closed, it draw the families added and validate if selected family number is iqual to the family members added, if not, an error is shown
     *
     */
    callbackCloseModal = function () {
        if (family.fromhome.total != family.fromhome.getTotal()) {
            fn_showAddFam($("#fam_members"), "fromhome");
            if (family.fromhome.members.length) {
                $("#nfamilylist").empty();
                for (var i in family.fromhome.members) {
                    family.fromhome.members[i].memberid = i;
                    if (family.fromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                    }
                }
            }
        }
        callbackCloseModal = function () {};
    };
    fn_showModal();
    setTimeout(function () {
        $("#formfamily").slideDown("slow");
    }, 400);
};


/**
 *Function that is executed when family member card is loaded
 *
 * @param {Object} _temp the template DOM element
 * @param {Object} data the JSON object sended to the template
 */
var fn_familymembercard = function (_temp, data) {
    var $checkBoss = _temp.find(".checkbox.familycardboss");
    $checkBoss.checkeable(function (thisCheckbox) {
        $(".checkbox.familycardboss").addClass("disabled");
        thisCheckbox.removeClass("disabled");
        family.fromhome.members[Number(thisCheckbox.attr("data-member"))].familyBoss = "Sí";
        if (family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated == "OK") {
            family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated = "Edit";
        }
    }, function (thisCheckbox) {
        $(".checkbox.familycardboss").removeClass("disabled");
        family.fromhome.members[Number(thisCheckbox.attr("data-member"))].familyBoss = "No";
        if (family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated == "OK") {
            family.fromhome.members[Number(thisCheckbox.attr("data-member"))].statusRelated = "Edit";
        }
    });

    if (data.familyBoss == "Sí") {
        $checkBoss.removeClass("disabled").doCheck();
    }
    $scTooltip = _temp.find(".scholarship-tooltip");
    _objdata = $scTooltip.attr("data-tooltip");
    if (_objdata != "") {
        new Tooltip($scTooltip, {
            placement: 'top',
            html: true,
            title: Mustache.to_html(miniTemplates.shcolarshipdetail.html, JSON.parse(_objdata))
        });
    } else {
        $scTooltip.remove();
    }

    _temp.find(".btn_editmember").click(function () {
        var editfromhome = jQuery.extend(true, {}, family.fromhome);
        editfromhome.flags = {
            type: 'edit',
            text: 'Guardar',
            memberid: Number($(this).attr("data-member")),
            group: 'fromhome'
        };
        editfromhome.index = Number($(this).attr("data-member")) + 1;
        fn_verifyCatalogs(["CAT_INST_MEDICA", "CAT_EDO_CIVIL", "CAT_OCUPACION", "CAT_TPO_APOYO", "CAT_INST_APOYO", "CAT_PARENTESCO-Miembro", "CAT_MAX_NVL_ESTUDIO"], function () {
            loadTemplate($("#modal_generic .body"), templates.family, editfromhome);
        });
    });
    _temp.find(".btn_deletemember").click(function () {
        _minFam = moduleInitData.announcement.scholarshipProgram.id != "7"? 2:1;
        if (family.fromhome.getTotal() > _minFam) {
            if ($(this).attr("data-member") == "0") {
                loadTemplate($("#modal_generic .body"), miniTemplates.error, {
                    title: "Lo sentimos, no te puedes eliminar",
                    message: "Es obligatorio que te incluyas"
                });
                return;
            }
            loadTemplate($("#modal_generic .body"), templates.conf, {
                memberid: $(this).attr("data-member"),
                title: "¿Deseas eliminar a un familiar?",
                message: "Al eliminarlo ya no se podrá recuperar",
                onAccept: function () {
                    var _bossFamilyDeleted = false;
                    if (family.fromhome.members[this.memberid].familyBoss == "Sí") {
                        _bossFamilyDeleted = true;
                    }
                    if (__.get(family.fromhome.members[this.memberid], "alreadyExists", "") == "true") {
                        family.fromhome.members[this.memberid].statusRelated = "Delete";
                    } else {
                        family.fromhome.members.splice(this.memberid, 1);
                    }
                    family.fromhome.total = family.fromhome.getTotal();
                    $("#n_family").selectOptionId(family.fromhome.getTotal());
                    $("#nfamilylist").empty();
                    if (_bossFamilyDeleted) {
                        loadTemplate($("#modal_generic .body"), templates.selectboss, {"members":family.fromhome.getMembers()});
                    } else {
                        for (var i in family.fromhome.members) {
                            family.fromhome.members[i].memberid = i;
                            if (family.fromhome.members[i].statusRelated != "Delete") {
                                loadTemplate($("#nfamilylist"), miniTemplates.familymembercard, family.fromhome.members[i], "append");
                            }
                        }
                        fn_hideModal();
                    }
                }
            });
        } else {
            loadTemplate($("#modal_generic .body"), miniTemplates.error, {
                title: "Lo sentimos, no puedes eliminar",
                message: "El número mínimo de integrantes es "+_minFam
            });
        }
    });

};

/**
 *Add external home family support modal
 *
 * @param {Object} _template the template DOM element
 * @param {Object} fdata the JSON object sended to the template
 */
var fn_efamilymodal = function (_template, fdata) {
    var opc_famx = jQuery.extend(true, {}, {
        rel: catalogs["CAT_PARENTESCO-Miembro"]
    });
    //remove the student option from relationship catalog
    for (i = 0; i < opc_famx.rel.length; i++) {
        element = opc_famx.rel[i];
        if (element.id == "1") {
            opc_famx.rel.splice(i, 1);
            break;
        }
    }
    $("#fam_relationship").comboSelect(opc_famx.rel, function (el) {
        if (el.id == '10') {
            $("#fam_o_relationship").clearInput();
            $("#fam_o_relationship").attr("required", "required");
            $("#fam_other_relationship").slideDown();
        } else {
            $("#fam_o_relationship").removeAttr("required");
            $("#fam_other_relationship").slideUp();
        }
    });
    $("#fam_ocupation").comboSelect(catalogs.CAT_OCUPACION);
    $("#fam_lives").comboSelect(catalogs.CAT_RESIDENCIA);
    $("#efamilyformbtn").data("complete", function (_data) {
        if (_data.flag == "edit") {
            if (_data.alreadyExists == "true") {
                _data.statusRelated = "Edit";
            }
            family.awayfromhome.members[_data.memberid] = _data;
        } else {
            _data.statusRelated = "Add";
            family.awayfromhome.members.push(_data);
        }
        if (_data.fam_relationship.id != "10") {
            _data.fam_relationship_des = _data.fam_relationship.description;
        } else {
            _data.fam_relationship_des = _data.fam_o_relationship;
        }
        $("#formefamily").slideUp("slow", function () {
            if (family.awayfromhome.index() <= family.awayfromhome.total) {
                fn_verifyCatalogs(["CAT_OCUPACION", "CAT_RESIDENCIA", "CAT_PARENTESCO-Miembro"], function () {
                    loadTemplate($("#modal_generic .body"), templates.efamily, family.awayfromhome);
                });
            } else {
                if ($("#ext_family").prev().hasClass("error")) {
                    $("#ext_family").prev().remove();
                }
                $("html").animate({
                    scrollTop: $("#nextrafamilylist").offset().top - 200
                }, 1000, "swing", function () {
                    $("#nextrafamilylist").empty();
                    for (var i in family.awayfromhome.members) {
                        family.awayfromhome.members[i].memberid = i;
                        if (family.awayfromhome.members[i].statusRelated != "Delete") {
                            loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
                        }
                    }
                });
                fn_hideModal();
            }
        });
    });
    if (fdata.flags.type == 'edit') {
        membertoedit = family.awayfromhome.members[fdata.flags.memberid];
        membertoedit.flag = 'edit';
        fillForm($("#formefamily"), membertoedit);
        $("#fam_o_relationship").setValue(__.get(membertoedit,"fam_o_relationship",""));
    }
    /**
     *When the modal is closed, it draw the external families added and validate if selected external family number is iqual to the external family members added, if not, an error is shown
     *
     */
    callbackCloseModal = function () {
        if (family.awayfromhome.total != family.awayfromhome.getTotal()) {
            fn_showAddFam($("#ext_family"), "awayfromhome");
            if (family.awayfromhome.members.length) {
                $("#nextrafamilylist").empty();
                for (var i in family.awayfromhome.members) {
                    family.awayfromhome.members[i].memberid = i;
                    if (family.awayfromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
                    }
                }
            }
        }
        callbackCloseModal = function () {};
    };
    fn_showModal();
    setTimeout(function () {
        $("#formefamily").slideDown("slow");
    }, 400);
};

/**
 *Function that is executed when external family member card is loaded
 *
 * @param {Object} _temp the template DOM element
 */
var fn_efamilymembercard = function (_temp) {
    _temp.find(".btn_editemember").click(function () {
        var editawayfromhome = jQuery.extend(true, {}, family.awayfromhome);
        editawayfromhome.flags = {
            type: 'edit',
            text: 'Guardar',
            memberid: Number($(this).attr("data-member")),
            group: 'awayfromhome'
        };
        editawayfromhome.index = Number($(this).attr("data-member")) + 1;
        fn_verifyCatalogs(["CAT_OCUPACION", "CAT_RESIDENCIA", "CAT_PARENTESCO-Miembro"], function () {
            loadTemplate($("#modal_generic .body"), templates.efamily, editawayfromhome);
        });
    });
    _temp.find(".btn_deletememberaway").click(function () {
        loadTemplate($("#modal_generic .body"), templates.conf, {
            memberid: $(this).attr("data-member"),
            title: "¿Deseas eliminar a un familiar?",
            message: "Al eliminarlo ya no se podrá recuperar",
            onAccept: function () {
                if (family.awayfromhome.members[this.memberid].alreadyExists == "true") {
                    family.awayfromhome.members[this.memberid].statusRelated = "Delete";
                }else{
                    family.awayfromhome.members.splice(this.memberid, 1);
                }
                family.awayfromhome.total = family.awayfromhome.getTotal();
                $("#extrafamily").selectOptionId(family.awayfromhome.getTotal());
                $("#nextrafamilylist").empty();
                for (var i in family.awayfromhome.members) {
                    family.awayfromhome.members[i].memberid = i;
                    if (family.awayfromhome.members[i].statusRelated != "Delete") {
                        loadTemplate($("#nextrafamilylist"), miniTemplates.efamilymembercard, family.awayfromhome.members[i], "append");
                    }
                }
                fn_hideModal();
            }
        });
    });
};

/**
 *Add a bba family member modal function
 *
 */
var fn_fam_bbva = function () {
    $("#relationship_b").comboSelect(catalogs["CAT_PARENTESCO-Soporte"], function (el) {
        if (el.id == "19") {
            $("#other_relationship_b").slideDown("slow");
            $("#relationship_b_o").attr("required", "required");
            $("#relationship_b_o").clearInput();
        } else {
            $("#other_relationship_b").slideUp("slow");
            $("#relationship_b_o").removeAttr("required");
            $("#relationship_b_o").clearInput();
        }
    });
    fn_showModal();
    /**
     *When modal is closed validate if there is no family registered, if so, an error message is shown
     *
     */
    callbackCloseModal = function () {
        if (Object.keys(family.bbva.member).length == 0) {
            fn_showAddFam($("#bbva_employee"), "bbva");
        }
        callbackCloseModal = function () {};
    };
    if (family.bbva.flag == "edit") {
        fillForm($("form#fam_bbva"), family.bbva.member);
        $("#relationship_b_o").setValue(__.get(membertoedit,"relationship_b_o",""));
    }
    $("#familybbvabtn").data("complete", function (_data) {
        if (_data.relationship_b_o != "") {
            _data.relationship = {
                "id": _data.relationship_b.id,
                "description": _data.relationship_b_o
            };
        } else {
            _data.relationship = _data.relationship_b;
        }
        if (family.bbva.flag == "edit" && __.get(family, "bbva.member.alreadyExists", "false") == "true") {
            _data.statusRelated = "Edit";
        } else {
            _data.statusRelated = "Add";
        }
        fn_hideModal();
        family.bbva.member = _data;
        $("#fam_bbvacard").empty();
        loadTemplate($("#fam_bbvacard"), miniTemplates.familybbvacard, family.bbva.member);
        if (family.bbva.member && $("#bbva_employee").prev(".notification.error").length) {
            $("#bbva_employee").prev(".notification.error").slideUp("slow");
        }
    });
};

/**
 *Notification card template function
 *
 * @param {Object} notif notification DOM element
 */
var fn_closeNotification = function (notif) {
    /**
     *When the close button is clicked the notification card is removed
     */
    notif.find(".close-button").click(function () {
        $(this).closest(".notification").slideUp("slow", function () {
            $(this).remove();
        });
    });
    notif.slideDown("slow");
};

/**
 *Family member group error template
 *
 * @param {Object} notif DOM element
 */
var fn_closeBtnNotification = function (notif) {
    notif.find(".btn__addfam").click(function () {
        var group = $(this).attr("data-group");
        if (group == "bbva") {
            fn_verifyCatalogs(["CAT_PARENTESCO-Soporte"], function () {
                loadTemplate($("#modal_generic .body"), templates.fambbva, {
                    title: "Agrega la información de tu familiar"
                });
            });
        } else if (group == "fromhome") {
            fn_verifyCatalogs(["CAT_INST_MEDICA", "CAT_EDO_CIVIL", "CAT_OCUPACION", "CAT_TPO_APOYO", "CAT_INST_APOYO", "CAT_PARENTESCO-Miembro", "CAT_MAX_NVL_ESTUDIO"], function () {
                loadTemplate($("#modal_generic .body"), templates.family, family.fromhome);
            });
        } else if (group == "awayfromhome") {
            fn_verifyCatalogs(["CAT_OCUPACION", "CAT_RESIDENCIA", "CAT_PARENTESCO-Miembro"], function () {
                loadTemplate($("#modal_generic .body"), templates.efamily, family.awayfromhome);
            });
        }
    });
    notif.slideDown("slow");
};

/**
 *BBVA family member card
 *
 */
var fn_modify_bbva = function () {
    $("#btn_modify_bbva").click(function (e) {
        e.preventDefault();
        membertoedit = family.bbva.member;
        family.bbva.flag = "edit";
        fn_verifyCatalogs(["CAT_PARENTESCO-Soporte"], function () {
            loadTemplate($("#modal_generic .body"), templates.fambbva, {
                title: "Agrega la información de tu familiar"
            });
        });
    });
};

var uploadFile = {
    index: 0,
    onFinish: function () {  }
};
var fn_uploadfilemodal = function () {
    var fileIdCont = 0;
    var allFiles = {};
    var myDropzone = new Dropzone("#dragndrop", {
        acceptedFiles: 'application/pdf,image/jpeg,image/png',
        dictFileTooBig: "El archivo supera el tama\u00F1o permitido de {{maxFilesize}} MB",
        dictMaxFilesExceeded: "N\u00FAmero m\u00E1ximo de archivos alcanzado",
        dictInvalidFileType: "S\u00F3lo se permiten archivos JPG, PNG y PDF",
        autoProcessQueue: false,
        dictDefaultMessage: '',
        maxFiles: 2,
        maxFilesize: 12,
        previewTemplate: miniTemplates.filepreview.html,
        previewsContainer: "#file-preview-wrapper",
        url: "/",
        init: function () {
            this.on("addedfile", function (file) {});
            this.on("drop", function () {});
        },
        accept: function (file, done) {
            document.getElementById("filecontainer").classList.remove('empty');
            $("#sbtmfiles").show();
            var _tthis = this;
            file.idFile = fileIdCont;
            var button = file.previewTemplate.querySelector('.btn-delete-file');
            var myFile = file;
            button.addEventListener('click', function () {
                _tthis.removeFile(myFile);
            });
            allFiles[fileIdCont] = {
                "active": true,
                "base64": ""
            };
            fileIdCont++;
            done();
        },
        removedfile: function (file) {
            file.previewTemplate.remove();
            if (this.getAcceptedFiles().length == 0) {
                document.getElementById("filecontainer").classList.add('empty');
                $("#sbtmfiles").hide();
            }
        },
        error: function (file, errorMEssage) {
            if (!file.accepted) {
                this.removeFile(file);
                _$form = $(".fileform");
                notifyElem = _$form.prev();
                if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                loadTemplate(_$form, miniTemplates.notification, {
                    type: 'error',
                    title: errorMEssage
                }, 'before');
            }
        }
    });
    $("#btn_sbtmfiles").data("complete", function(formdata) {
        console.log(formdata);
        fn_hideModal();
        uploadFile.onFinish = function() {};
        uploadFile.index = 0;
        _fileDetails = myDropzone.getAcceptedFiles();
        function readIndexFile(iFile) {
            if (iFile == _fileDetails.length) {
                return;
            }
            currentFile = _fileDetails[iFile];
            var reader = new FileReader();
            reader.readAsDataURL(currentFile);
            reader.onload = function(e){
                if (iFile == _fileDetails.length) {
                    return;
                }
                var base64URL = e.target.result;
                fext = currentFile.name.split(".");
                fext = fext[fext.length - 1];
                uploadFile.onFinish = function(resp) {
                    console.log("resp", resp);
                };
                if (iFile == _fileDetails.length - 1) {
                    uploadFile.onFinish = function(data) {
                        console.log("_end_fn", data);
                        fn_sendDocument({
                            moduleIndicator: formdata.module,
                            typeDocument: formdata.document,
                            schoolGrade: formdata.grade,
                            schoolPeriod: formdata.period,
                            folio: data.referenceNumber,
                        });
                    };
                }
                /*fn_sendMultiDocumentArchiving({
                    ext: fext.toLowerCase(),
                    filename: currentFile.name,
                    typeDocument: formdata.document,
                    first: (iFile == 0) + "",
                    last: (iFile == _fileDetails.length - 1) + "",
                    base64: (base64URL.split(";base64,"))[1],
                    success: uploadFile.onFinish
                });*/
                uploadFile.index++;
                readIndexFile(uploadFile.index);
            };
        }
        readIndexFile(0);
    });
    fn_showModal();
};