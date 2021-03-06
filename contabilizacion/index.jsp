<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="org.springframework.web.context.request.ServletRequestAttributes" %>
<%@ page import="org.springframework.web.context.request.RequestContextHolder" %>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Convocatoria en l&iacute;nea</title>
    <link rel="stylesheet" href="css/bbva.fonts.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="images/favicons/57x57.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="images/favicons/72x72.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="images/favicons/76x76.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="images/favicons/114x114.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="images/favicons/120x120.png"/>
    <link rel="apple-touch-icon" sizes="144x144" href="images/favicons/144x144.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="images/favicons/152x152.png"/>
    <link rel="apple-touch-icon" sizes="167x167" href="images/favicons/167x167.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="images/favicons/180x180.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicons/16x16.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicons/32x32.png"/>
    <link rel="icon" type="image/png" sizes="96x96" href="images/favicons/96x96.png"/>
    <link rel="icon" type="image/png" sizes="128x128" href="images/favicons/128x128.png"/>
    <link rel="icon" type="image/png" sizes="192x192" href="images/favicons/192x192.png"/>
    <link rel="icon" type="image/png" sizes="195x195" href="images/favicons/195x195.png"/>
    <link rel="icon" type="image/png" sizes="196x196" href="images/favicons/196x196.png"/>
    <link rel="icon" type="image/png" sizes="228x228" href="images/favicons/228x228.png"/>
    <!--     <%=request.getHeader("iv_ticketservice")%>     -->
	<script>
		var ivUser="<%=request.getHeader("iv-user")%>";
	</script>
    <%
        HttpServletRequest requesttr = null;
        ServletRequestAttributes request1 = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        request1.getRequest().getSession().setAttribute("iv-ticketservice", request.getHeader("iv_ticketservice"));
        request1.getRequest().getSession().setAttribute("iv-user", request.getHeader("iv-user"));
        request1.getRequest().getSession().setMaxInactiveInterval(900);
        String ip = "";
        String stip = "";
        try {
            ip = request.getLocalAddr();
            stip = ip.substring(ip.lastIndexOf("."));
        }
        catch(Exception e) {
            stip = "";
        }
	%>
    <!--     v:<%=stip%>     -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-140669540-2"></script>
    <script>
        if (window.location.origin.indexOf("plataformabecas.fundacionbbvabancomer.org") != -1 || window.location.origin.indexOf("plataformabecas.fundacionbbva.mx") != -1) {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-140669540-2');
        }
    </script>
    <script src="scripts/jquery-2.1.1.min.js"></script>
    <script src="scripts/mustache.js"></script>
    <script src="scripts/popper.min.js"></script>
    <script src="scripts/tooltip.min.js"></script>
</head>

<body>
    <div class="page-container">
        <div class="header">
            <div class="header_container container flex-items">
                <div class="header_logo">
                    <a href="#" class="header__logo__link">
                        <img src="images/logo.png" class="header_image" alt="">
                    </a>
                </div>
                <div class="menu">
                    <div>&nbsp;</div>
                    <div class="btn-menu flex-items" id="btn-exit">
                        <img src="./images/icons/get-out-icon.svg" alt=""> &nbsp; Cerrar sesi&oacute;n
                    </div>
                </div>
            </div>
        </div>
        <div class="subheader">
            <div class="container">
                <i class="bbva-icon ui-gradution-cap"></i><span id="scholarshipProgram" ></span>
            </div>
        </div>
        <div class="content">
            <div class="container">
                <div class="card accordeon">
                    <div class="notification error" style="display: none" id="browserNotCompatibleError">
                        <div class="wrapper">
                            <div class="icon"><i class="bbva-icon"></i></div>
                            <div class="message">
                                <div class="message__heading">Navegador no compatible</div>
                                <span class="message__body">Puede que la p&aacute;gina no funcione de forma correcta, te recomendamos utilizar Chrome o Firefox en su &uacute;ltima versi&oacute;n<br/> <a href="https://www.google.com/chrome/"><b>Click aqu&iacute; para descargar Chrome</b></a> o <a href="https://www.mozilla.org/es-MX/firefox/"><b>aqu&iacute; para descargar Firefox</b></a> </span>
                            </div>
                        </div>
                    </div>
                    <div id="wf0" class="i-form accordion removeifNC">
                        <div class="step-header" data-target="general-data" data-loaded="false" data-catalog="general">
                            <div class="step-name">
                                <i class="bbva-icon ui-profile"></i>
                                1. Datos generales
                            </div>
                            <div id="statusgd" class="step-status incomplete">
                                <i class="bbva-icon ui-warning"></i>
                                Incompleto
                            </div>
                            <div class="step-arrow">
                                <i class="bbva-icon ui-"></i>
                            </div>
                        </div>
                        <div id="general-data" class="step-container" style="display: none">
                                <form name="form" action="#" class="form-gray notify-on-error" method="post" target="_top" id="formgendata" data-status="#statusgd">
                                <div class="subtitle-sec">Datos del tutor</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters" name="tutorname" id="tutorname" type="text" data-placeholder="Nombre" required autocomplete="off" value="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters lastnameb" data-reflecto="#m_firstname" name="tutorlastname" id="tutorlastname" type="text" data-placeholder="Apellido paterno" required autocomplete="off" value="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="item-fill">
                                                    <div class="item-corner">
                                                        <div class="checkbox-area">
                                                            <span class="checkbox" data-targetdisable="#tutorlastname" data-targettoggle="#checktutolastname" id="checktutofirstname"><i class="bbva-icon ui-checkmark"></i></span>
                                                            <span class="text">Sin apellido paterno</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters lastnameb" data-reflecto="#m_lastname" name="tutorslastname" id="tutorslastname" type="text" data-placeholder="Apellido materno" required autocomplete="off" value="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="item-fill">
                                                    <div class="item-corner">
                                                        <div class="checkbox-area">
                                                            <span class="checkbox" data-targetdisable="#tutorslastname" data-targettoggle="#checktutofirstname" id="checktutolastname"><i class="bbva-icon ui-checkmark"></i></span>
                                                            <span class="text">Sin apellido materno</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="form-group-select required" id="relationship">
                                                    <div class="option-select">
                                                        <div class="select-title sl">
                                                            <span class="option-text sl center">Parentesco</span>
                                                            <span class="selected-option sl"></span>
                                                            <i class="bbva-icon ui-simple-down sl"></i>
                                                        </div>
                                                        <div class="list-result"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item" id="other_relationship" style="display: none">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters" name="tutorslastname" id="o_relationship" type="text" data-placeholder="Especifica parentesco" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-item title2 sub">
                                    <span>Bajo protesta de decir verdad manifiesto ser el padre o tutor del aspirante respecto al cual a
                                    continuaci&oacute;n proporciono los datos personales.</span>
                                    <div class="grid-item">
                                        <div class="query_privacy">
                                            <span title="Consulta nuestro Aviso de Privacidad" aria-label="Consulta nuestro Aviso de Privacidad" class="btn__basic btn__clearbg">
                                                <span aria-hidden="true">Consulta nuestro Aviso de Privacidad</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <br>
                            <div class="subtitle-sec">Datos personales del alumno</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="label">
                                                    <label>&nbsp;</label>
                                                </div>
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters" name="username" id="username" data-reflecto="#m_username" type="text" data-placeholder="Nombre" required autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="label">
                                                    <label>&nbsp;</label>
                                                </div>
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters reflectable lastnameb" name="firstname" id="firstname" type="text" data-placeholder="Apellido paterno" required autocomplete="off" data-reflecto="#m_firstname">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="item-fill">
                                                    <div class="item-corner">
                                                        <div class="checkbox-area">
                                                            <span class="checkbox" data-targetdisable="#firstname" data-targettoggle="#checklastname" id="checkfirstname"><i class="bbva-icon ui-checkmark"></i></span>
                                                            <span class="text">No tengo apellido paterno</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase letters reflectable" name="lastname" id="lastname" type="text" data-placeholder="Apellido materno" required autocomplete="off" data-reflecto="#m_lastname">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="item-fill">
                                                    <div class="item-corner">
                                                        <div class="checkbox-area">
                                                            <span class="checkbox" data-targetdisable="#lastname" data-targettoggle="#checkfirstname" id="checklastname"><i class="bbva-icon ui-checkmark"></i></span>
                                                            <span class="text">No tengo apellido materno</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="label">
                                                    <label>Fecha de nacimiento</label>
                                                </div>
                                                <div class="grid-item-t">
                                                    <div class="grid-item">
                                                        <div class="form-group-select whitwait required mini" id="dbirthdate">
                                                            <div class="option-select">
                                                                <div class="select-title sl">
                                                                    <span class="option-text sl center">D&iacute;a</span>
                                                                    <span class="selected-option sl"></span>
                                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                                </div>
                                                                <div class="list-result"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="grid-item">
                                                        <div class="form-group-select whitwait required mini" id="mbirthdate">
                                                            <div class="option-select">
                                                                <div class="select-title sl">
                                                                    <span class="option-text sl center">Mes</span>
                                                                    <span class="selected-option sl"></span>
                                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                                </div>
                                                                <div class="list-result"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="grid-item">
                                                        <div class="form-validation-group">
                                                            <div class="form-group">
                                                                <input class="form-control numbers e-tooltip-f" name="ybirthdate" id="ybirthdate" type="text" data-placeholder="A&ntilde;o" required autocomplete="off" maxlength="4" data-regex="YEAR_80_ACT" data-tooltitle="Por ejemplo 2000">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="label">
                                                    <label>Sexo</label>
                                                </div>
                                                <div class="radio-section binary required fixed-radiosel" id="gender">
                                                    <div class="form-validation-group">
                                                        <div class="form-group">
                                                            <div class="radio-buttons ">
                                                                <div class="radio-button">
                                                                    <div class="ckeck-area">
                                                                        <div class="radio" data-id="Hombre"></div>
                                                                    </div>
                                                                    <div class="radio-label">Hombre</div>
                                                                </div>
                                                                <div class="radio-button">
                                                                    <div class="ckeck-area">
                                                                        <div class="radio" data-id="Mujer"></div>
                                                                    </div>
                                                                    <div class="radio-label">Mujer</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control uppercase alphanumeric" name="curp" id="curp" type="text" data-placeholder="CURP" required autocomplete="off" maxlength="18" data-regex="CURP" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subtitle-sec">Datos del domicilio</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control letnum uppercase" name="street" id="street" type="text" data-placeholder="Calle" required autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control letnum uppercase" name="outdoornum" id="outdoornum" type="text" data-placeholder="N&uacute;mero exterior" required autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control letnum uppercase" name="interiornum" id="interiornum" type="text" data-placeholder="N&uacute;mero interior" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control numbers" name="zipcode" id="zipcode" type="text" data-placeholder="C&oacute;digo postal" required autocomplete="off" maxlength="5" data-regex="ZIPCODE">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control letnum uppercase" name="neighborhood" id="neighborhood" type="text" data-placeholder="Colonia" required autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-group-select whitwait states required" id="state" data-reflecto="#m_state">
                                                    <div class="option-select">
                                                        <div class="select-title sl">
                                                            <span class="option-text sl center">Estado</span>
                                                            <span class="selected-option sl"></span>
                                                            <i class="bbva-icon ui-simple-down sl"></i>
                                                        </div>
                                                        <div class="list-result"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-group-select required" id="municipalities" data-reflecto="#m_municipalities">
                                                    <div class="option-select disabled">
                                                        <div class="select-title sl">
                                                            <span class="option-text sl center">Municipio</span>
                                                            <span class="selected-option sl"></span>
                                                            <i class="bbva-icon ui-simple-down sl"></i>
                                                        </div>
                                                        <div class="list-result"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <textarea class="form-control letnum uppercase e-tooltip-f" name="references" id="references" type="text" data-placeholder="Referencias" required autocomplete="off" data-tooltitle="Por ejemplo: Casa color verde, frente al parque"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subtitle-sec">Datos de contacto</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control phonenumber e-tooltip-f no-repeat" name="phone" id="phone" maxlength="14" type="text" data-placeholder="Tel&eacute;fono de casa" required autocomplete="off" data-reflecto="#m_cellphone" data-tooltitle="Si no tienes tel&eacute;fono de casa, puedes agregar cualquier otro n&uacute;mero telef&oacute;nico ya sea de casa o de celular.">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control phonenumber e-tooltip-f no-repeat" name="cellphone" id="cellphone" maxlength="14" type="text" data-placeholder="Tel&eacute;fono celular" required autocomplete="off" data-tooltitle="Si no tienes tel&eacute;fono de celular, puedes agregar cualquier otro n&uacute;mero telef&oacute;nico ya sea de casa o de celular.">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control phonenumber e-tooltip-f no-repeat" name="errandsphone" id="errandsphone" maxlength="14" type="text" data-placeholder="Tel&eacute;fono para recados" required autocomplete="off" data-tooltitle="Si no tienes tel&eacute;fono para recados, puedes agregar cualquier otro n&uacute;mero telef&oacute;nico ya sea de casa o de celular.">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control" data-reflecto="#m_email" name="email" id="email" type="text" data-placeholder="Correo electr&oacute;nico principal" required autocomplete="off" data-regex="EMAIL" data-reflecto="#m_email">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="emailconf" type="text" data-placeholder="Confirma tu correo principal" required autocomplete="off" data-regex="EMAIL" data-confirm="#email"
                                                oncopy="return false" onpaste="return false" oncut="return false">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="email2" type="text" data-placeholder="Correo electr&oacute;nico adicional 1 (opcional)" autocomplete="off" data-regex="EMAIL">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item" style="display:none">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="email2conf" type="text" data-placeholder="Confirmar el correo adicional 1" autocomplete="off" data-regex="EMAIL" data-confirm="#email2" oncut="return false" oncopy="return false" onpaste="return false" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="email3" type="text" data-placeholder="Correo electr&oacute;nico adicional 2(opcional)" autocomplete="off" data-regex="EMAIL">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item" style="display:none">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="email3conf" type="text" data-placeholder="Confirma el correo adicional 2" autocomplete="off" data-regex="EMAIL" data-confirm="#email3">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="submtbtn">
                                    <span title="Continuar" aria-label="Continuar" class="btn__basic btn__submit" id="btn_savegd">
                                        <span aria-hidden="true">Guardar</span>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="wf1" class="i-form accordion removeifNC">
                        <div class="step-header" data-target="schoolar-data" data-loaded="false" data-catalog="notarydata">
                            <div class="step-name">
                                <i class="bbva-icon ui-gradution-cap"></i>
                                2. Datos escolares
                            </div>
                            <div id="statussd" class="step-status incomplete">
                                <i class="bbva-icon ui-warning"></i>
                                Incompleto
                            </div>
                            <div class="step-arrow">
                                <i class="bbva-icon ui-"></i>
                            </div>
                        </div>
                        <div id="schoolar-data" class="step-container" style="display: none">
                            <form name="schoolardata" action="#" class="form-gray notify-on-error" method="post" target="_top" id="formschdata" data-status="#statussd">
                                <div class="subtitle-sec">Ingresa el promedio de <span id="lastLevel"></span>
                                    <i class="e-tooltip help bbva-icon ui-help" id="levelAverage" data-tooltitle=""></i>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control decimals e-tooltip-f" name="promgen" id="promgen" type="text" data-placeholder="Promedio general del bachillerato" required autocomplete="off" data-regex="PROM" data-tooltitle="Por ejemplo: 9.5 &oacute; 9.86 &oacute; 10">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subtitle-sec">Datos de la <span id="nextLevel"></span> donde estudiar&aacute;s</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="form-group-select whitwait states reflectable required" id="state_s" data-reflecto="#m_state_s">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Estado</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="form-group-select reflectable required" id="municipalities_s" data-reflecto="#m_municipalities_s">
                                            <div class="option-select disabled">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Municipio</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="school_s" style="display: none">
                                    <p class="title2 sub">Selecciona la informaci&oacute;n con la que cuentas para realizar la b&uacute;squeda de la escuela donde estudiar&aacute;s:</p>
                                    <div class="radio-section search-by" id="search_by">
                                        <div class="radio-buttons">
                                            <div class="radio-button">
                                                <div class="ckeck-area">
                                                    <div class="radio" data-id="CCT"></div>
                                                </div>
                                                <div class="radio-label">CCT <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="<div style='text-align:left'>Clave Centro de Trabajo (CCT)</div><div>Esta clave la puedes encontrar en tu constancia
                                                    <br>de pre-inscripci&oacute;n o preguntando en la escuela. <div><div style='text-align: justify; padding: 0 15%;'>Ejemplo: 00AAA0000A <ul> <li>2 n&uacute;meros (del 01 al 32)</li> <li>3 letras</li> <li>4 n&uacute;meros</li> <li>1 letra</li></ul></div>
                                                "></i>
                                                </div>
                                            </div>
                                            <div class="radio-button">
                                                <div class="ckeck-area">
                                                    <div class="radio" data-id="LOC"></div>
                                                </div>
                                                <div class="radio-label">Localidad  <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="<p style='text-align:justify'>Al escribir el nombre de la localidad, <br>aparecer&aacute;n posibles resultados para que <br>selecciones la ubicaci&oacute;n de la escuela </p>"></i></div>
                                            </div>
                                            <div class="radio-button">
                                                <div class="ckeck-area">
                                                    <div class="radio" data-id="TYP"></div>
                                                </div>
                                                <div class="radio-label">Tipo de escuela</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="search-filter">
                                            <div id ="snerror" class="notification error" style="display:none;">
                                                    <div class="wrapper">
                                                        <div class="icon"><i class="bbva-icon"></i></div>
                                                        <div class="message">
                                                            <div class="message__heading">Busca tu escuela</div><span class="message__body">Da click en buscar escuela y selecciona el nombre de tu escuela</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        <div class="filter filter_cct" style="display: none;">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <input class="form-control alphanumeric uppercase" name="cct" id="cct" maxlength="10" type="text" data-placeholder="CCT de tu escuela" autocomplete="off" data-regex="CCT">
                                                </div>
                                            </div>
                                            <div class="submtbtn">
                                                <span title="Continuar" aria-label="Continuar" class="btn__basic btn__disabled" id="btn_cct">
                                                    <span aria-hidden="true">Buscar escuela</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="filter filter_loc" style="display: none;">
                                            <div class="notification info">
                                                <div class="wrapper">
                                                    <div class="icon"><i class="bbva-icon"></i></div>
                                                    <div class="message">
                                                        <div class="message__heading">Ingresa el nombre de la localidad en la que se encuentra la escuela.</div><span class="message__body">Si te aparecen varias localidades, selecciona la opci&oacute;n correcta</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="list-filter-result simple" data-template="simple" id="localitieslist">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control" name="filter" id="localities" type="text" data-placeholder="Nombre de la localidad" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                            <div class="submtbtn">
                                                <span title="Continuar" aria-label="Continuar" class="btn__basic btn__disabled" id="btn_locality">
                                                    <span aria-hidden="true">Buscar escuela</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="filter filter_typ" style="display: none;">
                                            <div class="form-group-select" id="schoolT">
                                                <div class="option-select">
                                                    <div class="select-title sl">
                                                        <span class="option-text sl center">Selecciona el tipo de
                                                            escuela</span>
                                                        <span class="selected-option sl"></span>
                                                        <i class="bbva-icon ui-simple-down sl"></i>
                                                    </div>
                                                    <div class="list-result"></div>
                                                </div>
                                            </div>
                                            <div class="submtbtn">
                                                <span title="Continuar" aria-label="Continuar" class="btn__basic btn__disabled" id="btn_type">
                                                    <span aria-hidden="true">Buscar escuela</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="school-list" style="display: none">
                                            <div class="list-filter-result" data-template="fulldetail" id="schoolslist">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control" name="filter" id="schoolname" type="text" data-placeholder="Nombre de la escuela" required autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                        <div class="submtbtn" style="display:none" id="reportschool_sec">
                                            <span title="No encuentro mi escuela" aria-label="No encuentro mi escuela" class="btn__basic btn__clearbg btn_big btn_reportschool">
                                                <i class="bbva-icon ui-pin-x"></i>
                                                <span aria-hidden="true">No encuentro mi escuela</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="grid-container-s">
                                            <div class="grid-item">
                                                <div class="form-group-select whitwait required" id="turn">
                                                    <div class="option-select">
                                                        <div class="select-title sl">
                                                            <span class="option-text sl center">Turno</span>
                                                            <span class="selected-option sl"></span>
                                                            <i class="bbva-icon ui-simple-down sl"></i>
                                                        </div>
                                                        <div class="list-result"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                                <div class="subtitle-sec typeuni">Informaci&oacute;n de la carrera que estudiar&aacute;s</div>
                                <div class="grid-container typeuni">
                                    <div class="grid-item">
                                        <div class="form-group-select whitwait required" id="career_area">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">&Aacute;rea</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="form-group-select whitwait required" id="career_subarea">
                                            <div class="option-select disabled">
                                                <div class="select-title sl">
                                                <span class="option-text sl center">Sub-&aacute;rea</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="typeuni">
                                    <div class="form-validation-group">
                                        <div class="form-group">
                                            <input class="form-control uppercase letters" name="program_career" id="program_career" type="text" data-placeholder="Carrera" required autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container typeprep">
                                    <div class="grid-item">
                                        <div class="form-group-select whitwait required" id="modality">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Modalidad</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item typeuni">
                                        <div class="form-group-select whitwait required" id="type_s">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Tipo de carrera</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container typeuni">
                                    <div class="grid-item">
                                        <div class="form-group-select whitwait required" id="duration">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Duraci&oacute;n de la carrera</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="form-validation-group">
                                            <div class="form-group">
                                                <input class="form-control e-tooltip-f mxnamount" name="trans" id="trans" type="text" data-placeholder="&iquest;Cu&aacute;nto gastar&aacute;s al mes en traslados (aproximado)?" autocomplete="off" data-tooltitle="En el trayecto: casa-universidad-casa" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container typeuni">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>Fecha de inicio de clases</label>
                                        </div>
                                        <div class="grid-item-t">
                                            <div class="grid-item">
                                                <div class="form-group-select whitwait required mini" id="dsclass">
                                                    <div class="option-select">
                                                        <div class="select-title sl">
                                                            <span class="option-text sl center">D&iacute;a</span>
                                                            <span class="selected-option sl"></span>
                                                            <i class="bbva-icon ui-simple-down sl"></i>
                                                        </div>
                                                        <div class="list-result"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-group-select whitwait required mini" id="msclass">
                                                    <div class="option-select">
                                                        <div class="select-title sl">
                                                            <span class="option-text sl center">Mes</span>
                                                            <span class="selected-option sl"></span>
                                                            <i class="bbva-icon ui-simple-down sl"></i>
                                                        </div>
                                                        <div class="list-result"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid-item">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <input class="form-control numbers e-tooltip-f" name="ysclass" id="ysclass" type="text" data-placeholder="A&ntilde;o" required autocomplete="off" maxlength="4" data-regex="YEAR_MIN_80" data-tooltitle="Por ejemplo 2019">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>Para estudiar, &iquest;tendr&aacute;s que cambiar de domicilio?</label>
                                        </div>
                                        <div class="radio-section binary required" id="change_h">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="migrate_area" class="typeuni" style="display: none">
                                    <div class="subtitle-sec">Datos del domicilio donde te cambiar&aacute;s</div>
                                    <div class="grid-container">
                                        <div class="grid-item">
                                            <div class="form-group-select whitwait states" id="state_m">
                                                <div class="option-select">
                                                    <div class="select-title sl">
                                                        <span class="option-text sl center">Estado</span>
                                                        <span class="selected-option sl"></span>
                                                        <i class="bbva-icon ui-simple-down sl"></i>
                                                    </div>
                                                    <div class="list-result"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-item">
                                            <div class="form-group-select" id="municipalities_m">
                                                <div class="option-select disabled">
                                                    <div class="select-title sl">
                                                        <span class="option-text sl center">Municipio</span>
                                                        <span class="selected-option sl"></span>
                                                        <i class="bbva-icon ui-simple-down sl"></i>
                                                    </div>
                                                    <div class="list-result"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-container">
                                        <div class="grid-item">
                                            <div class="label">
                                                <label>&iquest;Pagar&aacute;s renta?</label>
                                            </div>
                                            <div class="radio-section binary fixed-radio" id="rent">
                                                <div class="form-validation-group">
                                                    <div class="form-group">
                                                        <div class="radio-buttons ">
                                                            <div class="radio-button">
                                                                <div class="ckeck-area">
                                                                    <div class="radio" data-id="SI"></div>
                                                                </div>
                                                                <div class="radio-label">Si</div>
                                                            </div>
                                                            <div class="radio-button">
                                                                <div class="ckeck-area">
                                                                    <div class="radio" data-id="NO"></div>
                                                                </div>
                                                                <div class="radio-label">No</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-item" id="pay_rent" style="display:none">
                                            <div class="label">
                                                <label>&nbsp;</label>
                                            </div>
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <input class="form-control mxnamount" name="payment_rent" id="payment_rent" type="text" data-placeholder="&iquest;Cu&aacute;nto pagar&aacute;s de renta (aproximado)?" autocomplete="off">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="submtbtn actionsection">
                                    <span title="Continuar" aria-label="Continuar" class="btn__basic btn__submit" id="btn_savesd">
                                        <span aria-hidden="true">Guardar</span>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="wf2" class="i-form accordion removeifNC">
                        <div class="step-header" data-target="social-data">
                            <div class="step-name">
                                <i class="bbva-icon ui-team"></i>
                                3. Datos sociodemogr&aacute;ficos
                            </div>
                            <div id="statussoci" class="step-status incomplete">
                                <i class="bbva-icon ui-warning"></i>
                                Incompleto
                            </div>
                            <div class="step-arrow">
                                <i class="bbva-icon ui-"></i>
                            </div>
                        </div>
                        <div id="social-data" class="step-container" style="display: none">
                            <form name="socialdata" action="#" class="form-gray notify-on-error" method="post" target="_top" id="formsocdata" data-status="#statussoci">
                                <div class="errorprev" style="display: none"></div>
                                <div class="grid-container" id="fam_members">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>N&uacute;mero de personas que viven en tu hogar (incluy&eacute;ndote)</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="n_family">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">N&uacute;mero de integrantes</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container" id="nfamilylist">
                                </div>
                                <div class="grid-container" id="ext_family">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>N&uacute;mero de personas que apoyan con dinero al hogar pero NO viven contigo</label>
                                        </div>
                                        <div class="form-group-select required" id="extrafamily">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona una respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container" id="nextrafamilylist">
                                </div>
                                <div class="grid-container amount-area" id="efm_amountarea" style="display: none">
                                </div>
                                <div id="bbva_employee" class="grid-container notify-on-error">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Tienes familiares que trabajan en BBVA Bancomer? <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="Que trabajen actualmente en BBVA Bancomer, ya sea en su municipio o cualquier otro municipio del pa&iacute;s"></i></label>
                                        </div>
                                        <div class="radio-section binary required" id="bbvafamily">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="0"></div>
                                                            </div>
                                                            <div class="radio-label">S&iacute;</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="1"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div class="grid-container" id="fam_bbvacard">
                                    </div>
                                    <div class="submtbtn actionsection">
                                        <span title="Continuar" aria-label="Continuar" class="btn__basic btn__submit" id="btn_savesoc">
                                            <span aria-hidden="true">Guardar</span>
                                        </span>
                                    </div>

                            </form>
                        </div>
                    </div>
                    <div id="wf3" class="i-form accordion removeifNC">
                        <div class="step-header" data-target="home-data" data-loaded="false" data-catalog="home">
                            <div class="step-name">
                                <i class="bbva-icon ui-home"></i>
                                4. Caracter&iacute;sticas del hogar
                            </div>
                            <div id="statushd" class="step-status incomplete">
                                <i class="bbva-icon ui-warning"></i>
                                Incompleto
                            </div>
                            <div class="step-arrow">
                                <i class="bbva-icon ui-"></i>
                            </div>
                        </div>
                        <div id="home-data" class="step-container" style="display: none">
                            <form name="form" action="#" class="form-gray notify-on-error" method="post" target="_top" id="formhdata" data-status="#statushd">
                                <div class="subtitle-sec">Vivienda y servicios</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Cu&aacute;ntas piezas tiene tu vivienda?</label>
                                            <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="Por favor no incluyas ba&ntilde;os, medios ba&ntilde;os, pasillos, patios y zotehuelas."></i>
                                        </div>
                                        <div class="form-group-select whitwait required" id="roomsNumber">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona el n&uacute;mero de piezas</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Cu&aacute;ntos cuartos se usan para dormir?</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="bedroomsNumber">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona el n&uacute;mero de cuartos</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Cu&aacute;ntos ba&ntilde;os completos hay?</label>
                                            <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="Es decir, cuentan con regadera y W.C. (excusado). <br> &Uacute;nicamente considera los de uso exclusivo para los integrantes de tu vivienda"></i>
                                        </div>
                                        <div class="form-group-select whitwait required o_two" id="bathroomsNumber">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona el n&uacute;mero de ba&ntilde;os</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>Tipo de servicio de agua</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="waterServicesType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;El drenaje esta conectado a &hellip;?</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="drainageType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;La luz el&eacute;ctrica la obtienen &hellip;?</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="lightServicesType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Cu&aacute;l combustible usan para cocinar?</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="cookingFuelType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>Material de las paredes de tu vivienda</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="wallMaterialsType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>Material del techo de tu vivienda</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="ceilingMaterialsType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>Material del piso de tu vivienda</label>
                                        </div>
                                        <div class="form-group-select whitwait required" id="floorMaterialsType">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subtitle-sec">Pertenencias</div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Cu&aacute;ntos autom&oacute;viles tienen?</label>
                                            <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="Incluye camionetas cerradas o con
                                            cabina o caja. Excluye taxis"></i>
                                        </div>
                                        <div class="form-group-select whitwait required o_two" id="carsNumber">
                                            <div class="option-select">
                                                <div class="select-title sl">
                                                    <span class="option-text sl center">Selecciona la respuesta</span>
                                                    <span class="selected-option sl"></span>
                                                    <i class="bbva-icon ui-simple-down sl"></i>
                                                </div>
                                                <div class="list-result"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Este hogar cuenta con internet?</label>
                                            <i class="e-tooltip help bbva-icon ui-help" data-tooltitle="Sin tomar en cuenta la conexi&oacute;n m&oacute;vil que pudiera tener desde alg&uacute;n celular"></i>
                                        </div>
                                        <div class="radio-section binary required" id="hasInternet">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons fixed-radio">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Tienen computadora o laptop?</label>
                                        </div>
                                        <div class="radio-section binary required" id="hasComputer">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Tienen lavadora?</label>
                                        </div>
                                        <div class="radio-section binary required" id="hasWashingMachine">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Tienen horno de microondas?</label>
                                        </div>
                                        <div class="radio-section binary required" id="hasMicrowave">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Tienen televisi&oacute;n de paga?</label>
                                        </div>
                                        <div class="radio-section binary required" id="hasPayTV">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    <div class="grid-item">
                                        <div class="label">
                                            <label>&iquest;Tienen motocicleta?</label>
                                        </div>
                                        <div class="radio-section binary required" id="hasMotorcycle">
                                            <div class="form-validation-group">
                                                <div class="form-group">
                                                    <div class="radio-buttons ">
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="SI"></div>
                                                            </div>
                                                            <div class="radio-label">Si</div>
                                                        </div>
                                                        <div class="radio-button">
                                                            <div class="ckeck-area">
                                                                <div class="radio" data-id="NO"></div>
                                                            </div>
                                                            <div class="radio-label">No</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="submtbtn">
                                    <span title="Continuar" aria-label="Continuar" class="btn__basic btn__submit" id="btn_savehd">
                                        <span aria-hidden="true">Guardar</span>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="wf4" class="i-form accordion removeifNC">
                        <div class="step-header" data-target="legal-data">
                            <div class="step-name">
                                <i class="bbva-icon ui-gavel"></i>
                                5. Avisos legales
                            </div>
                            <div id="statushd" class="step-status incomplete">
                                <i class="bbva-icon ui-warning"></i>
                                Incompleto
                            </div>
                            <div class="step-arrow">
                                <i class="bbva-icon ui-"></i>
                            </div>
                        </div>
                        <div id="legal-data" class="step-container" style="display: none">
                            <form name="form" action="#" class="form-gray notify-on-error" method="post" target="_top" id="formldata" data-status="#statushd" style="display:none">
                                <div class="grid-item">
                                    <div class="item-fill">
                                        <div class="item-corner">
                                            <div class="checkbox-area">
                                                <span class="checkbox required" id="legal1" data-legal-id="">
                                                    <i class="bbva-icon ui-checkmark"></i>
                                                </span>
                                                <span id="legaltext1" class="text legal_link">
                                                </span>
                                                <a class="btn__basic btn__clearbg" id="legallink1" href="" target="_blank"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-item">
                                    <div class="item-fill">
                                        <div class="item-corner">
                                            <div class="checkbox-area">
                                            <span class="checkbox required" id="legal2" data-legal-id="">
                                                <i class="bbva-icon ui-checkmark"></i>
                                                </span>
                                            <span id="legaltext2" class="text legal_link"></span>
                                            <a class="btn__basic btn__clearbg" id="legallink2" href="" target="_blank"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-item">
                                    <div class="item-fill">
                                        <div class="item-corner">
                                            <div class="checkbox-area">
                                                <span class="checkbox required" id="legal3" data-legal-id="">
                                                    <i class="bbva-icon ui-checkmark"></i>
                                                </span>
                                                <span id="legaltext3" class="text legal_link"></span>
                                                <a class="btn__basic btn__clearbg" id="legallink3" href="" target="_blank"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="submtbtn">
                                    <span title="Continuar" aria-label="Continuar" class="btn__basic btn__submit" id="btn_saveld">
                                        <span aria-hidden="true">Guardar</span>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="submtbtn actionsection send removeifNC" style="display: none">
                        <span title="Continuar" aria-label="Continuar" class="btn__basic" id="btn_save_all">
                            <span aria-hidden="true">Finalizar registro</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="container">
                <div class="footer-logo">
                    <img src="images/LogoBBVAOportunidades@2x.png">
                </div>
		<div class="footer__links">
                    <div class="footer__list">
                        <div class="link">
                            <a target="_blank" href="https://derechosarco.fundacionbbvabancomer.org/" class="link__content ">
                                ARCO
                            </a>
                        </div>
                        <div class="link">
                            <a target="_blank" href="https://www.fundacionbbva.mx/aviso-de-privacidad/" class="link__content ">
                                Avisos de privacidad
                            </a>
                        </div>
                    </div>   
                </div>
                <p class="footer-copyright">
                    &copy; <span id="currentYear"></span> BBVA Bancomer, S. A., Instituci&oacute;n de Banca M&uacute;ltiple, Grupo Financiero BBVA Bancomer, Avenida Paseo de la Reforma 510, colonia Ju&aacute;rez, c&oacute;digo postal 06600, alcald&iacute;a Cuauht&eacute;moc, Ciudad de M&eacute;xico.
                </p>
            </div>
        </div>
    </div>
    <div class="waitmodal"  id="waitmodal">
        <figure style="width:136px;padding:0;margin: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" id="Blue" viewBox="0 0 400 400" style="display:block">
                <defs>
                    <filter id="Filter-0" color-interpolation-filters="sRGB">
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="1.2"></feFuncR>
                            <feFuncG type="linear" slope="1.2"></feFuncG>
                            <feFuncB type="linear" slope="1.2"></feFuncB>
                        </feComponentTransfer>
                    </filter>
                    <filter id="Filter-1" color-interpolation-filters="sRGB">
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="2"></feFuncR>
                            <feFuncG type="linear" slope="2"></feFuncG>
                            <feFuncB type="linear" slope="2"></feFuncB>
                        </feComponentTransfer>
                    </filter>
                    <filter id="Filter-2" color-interpolation-filters="sRGB">
                        <feGaussianBlur stdDeviation="20"></feGaussianBlur>
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="2"></feFuncR>
                            <feFuncG type="linear" slope="2"></feFuncG>
                            <feFuncB type="linear" slope="2"></feFuncB>
                        </feComponentTransfer>
                    </filter>
                    <radialGradient id="Gradient-0" cx="199" cy="92" r="271.854" fx="197.801" fy="-27.9043" gradientUnits="userSpaceOnUse">
                        <stop offset="0.143991" stop-color="#2dcccd"></stop>
                        <stop offset="1" stop-color="#004481" stop-opacity="0"></stop>
                    </radialGradient>
                    <radialGradient id="Gradient-1" cx="199" cy="92" r="271.854" fx="197.801" fy="-27.9043" gradientUnits="userSpaceOnUse">
                        <stop offset="0.133991" stop-color="#2dcccd"></stop>
                        <stop offset="1" stop-color="#004481" stop-opacity="0"></stop>
                    </radialGradient>
                    <radialGradient id="Gradient-2" cx="199" cy="92" r="271.854" fx="197.801" fy="-27.9043" gradientUnits="userSpaceOnUse">
                        <stop offset="0.153991" stop-color="#2dcccd"></stop>
                        <stop offset="1" stop-color="#004481" stop-opacity="0"></stop>
                    </radialGradient>
                    <radialGradient id="Gradient-3" cx="196.5" cy="0" r="100" fx="196.5" fy="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#2dcccd"></stop>
                        <stop offset="1" stop-color="#2dcccd" stop-opacity="0"></stop>
                    </radialGradient>
                    <clipPath id="clip-path">
                        <ellipse id="Mask" class="cls-1" rx="197.5" ry="197.5" fill="none" transform="translate(0,0) translate(200,200)"></ellipse>
                    </clipPath>
                    <mask id="Mask-1" style="mask-type: luminance;">
                        <path d="M-0.66667,0C-0.66667,0,50.5,85,167,85C281.5,85,334,0,334,0C334,0,281.5,93,167,93C50.5,93,-0.66667,0,-0.66667,0Z" fill="#4afcfd" stroke-linecap="square" stroke="none" filter="url(#Filter-2)" transform="translate(-166.5,104.5)" style="mix-blend-mode: normal; animation: 1.6s linear infinite both a1_d;"></path>
                    </mask>
                    <pattern id="imageload" x="0" y="0" patternUnits="userSpaceOnUse" height="1" width="1">
                        <image x="0" y="0" xlink:href="images/loading_filter.png"></image>
                    </pattern>
                    <clipPath id="ClipPath-1">
                        <path id="Mask_circle" class="st0" d="M400,0L0,0L0,400L400,400ZM45.9596,200C45.9596,115.061,115.061,45.9596,200,45.9596C284.939,45.9596,354.04,115.061,354.04,200C354.04,284.939,284.939,354.04,200,354.04C115.061,354.04,45.9596,284.939,45.9596,200Z" fill="#00ff16" fill-rule="evenodd"></path>
                    </clipPath>
                </defs>
                <g id="All_Grouped" clip-path="url(#ClipPath-1)" transform="translate(200,200) translate(-200,-200)" style="animation: 1.6s linear infinite both All_Grouped_t;">
                    <ellipse id="Fill" class="cls-2" rx="197.5" ry="197.5" fill="#004481" transform="translate(0,0) translate(200,200)"></ellipse>
                    <path id="Outline" class="cls-1" d="M196.5,0C87.9723,0,0,87.9723,0,196.5C0,305.028,87.9723,393,196.5,393C305.028,393,393,305.028,393,196.5C393,87.9723,305.028,0,196.5,0Z" fill="none" opacity="0.16" stroke="#f2f2f2" stroke-width="2" transform="translate(3.5,3.5)"></path>
                    <g class="cls-5" clip-path="url(#clip-path)">
                        <g id="Gradient" style="animation: 1.6s linear infinite both a0_t;">
                            <path class="cls-6" d="M400,0L400,400L0,400L0,0Z" fill="url(#Gradient-0)" opacity="1" filter="url(#Filter-0)" fill-opacity="0.6" fill-rule="nonzero" stroke-opacity="1" transform="translate(0,0) scale(1,0.7)" style="animation: 1.6s linear infinite both Gradient_t, 1.6s linear infinite both Gradient_fo, 1.6s linear infinite both Gradient_f;"></path>
                        </g>
                    </g>
                    <ellipse rx="197.5" ry="197.5" fill="url(#imageload)" stroke="none" fill-rule="evenodd" filter="url(#Filter-1)" mask="url(#Mask-1)" transform="translate(199.5,199.5) rotate(180) translate(-0.5,-0.5)" style="mix-blend-mode: normal;"></ellipse>
                    <path id="Shine" class="cls-1" d="M196.5,0C87.9723,0,0,87.9723,0,196.5C0,305.028,87.9723,393,196.5,393C305.028,393,393,305.028,393,196.5C393,87.9723,305.028,0,196.5,0Z" fill="none" opacity="0.8" stroke="url(#Gradient-3)" stroke-width="2" transform="translate(3.5,3.5)"></path>
                </g>
            </svg>
        </figure>
    </div>
    <div class="modal" id="modal_generic" close-icon>
        <div id="dialog" class="md-modal md-effect" tabindex="-1">
            <div class="md-wrapper ">
                <span id="btn-close" class="md-content__btn-close" aria-label="Cancel">
                    <i class="bbva-icon ui-x icon-close"></i>
                </span>
                <div id="content" class="md-content">
                    <div class="body" id="ariaText1b">
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" aria-hidden="true"></div>
    </div>
    <div class="modal" id="modal_timeout">
        <div id="dialog" class="md-modal md-effect" tabindex="-1">
            <div class="md-wrapper ">
                <div id="content" class="md-content">
                    <div class="body" id="ariaText1b">
                        <div class="title-gray">
                            &iexcl;Tu sesi&oacute;n est&aacute; a punto de cerrar!
                        </div>
                        <div class="step-container">
                            <div class="grid-c">
                                <div class="grid-item">
                                    <div class="message-modal">
                                        <div id="cdSession"></div>
                                        <div>Da clic en el bot&oacute;n de abajo para evitar que cierre tu sesi&oacute;n.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="actionsection">
                                <div class="submtbtn">
                                    <span title="Enviar" aria-label="Enviar" class="btn__basic btn_acept">
                                        <span aria-hidden="true">Continuar con sesi&oacute;n</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" aria-hidden="true"></div>
    </div>
    <div class="help-menu removeifNC">
        <div class="btn_help" id="call_h">
            <i class="bbva-icon ui-telephone helpicon"></i>
            <div class="helpname">Llamar</div>
        </div>
        <div class="btn_help" id="email_h">
            <i class="bbva-icon ui-email helpicon"></i>
            <div class="helpname">Correo</div>
        </div>
        <div class="btn_help" id="help_sh" style="display: none">
            <i class="bbva-icon ui-contigo helpicon"></i>
            <div class="helpname">Ayuda</div>
        </div>
    </div>
    <script src="scripts/browser_detect.js"></script>
    <script src="scripts/mask.js"></script>
    <script src="js/dist/bundle.min.js"></script>
</body>
</html>