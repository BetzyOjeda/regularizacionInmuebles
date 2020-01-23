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