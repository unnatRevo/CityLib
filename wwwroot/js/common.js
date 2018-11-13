/* Public Variables */
var strSiteURL, strInput, INIFeatures,
INIInitial, m_strITSTrace = "";

var m_iFILENUMBER_LEN = 8;

var common;
if (!common) {
    common = {}
} else {
    if (typeof common != "object") {
        throw new Error("common already exists and is not an object")
    }
}
if (!common.Sys) {
    common.Sys = {}
} else {
    if (typeof common.Sys != "object") {
        throw new Error("common.Sys already exists and is not an object")
    }
}

/*
Created Date: 2015-11-04 
Created By: Dhaval Pithva
Comments:
        /// <summary>
        ///  Common Variable Declaration for the one which is used from ITSsys in Silverlight Project. 
        /// </summary>    
*/

common.Sys.GetFileLength = function () {
    // if hidden field is not found than set default value to 8 "/"
    return $('#hdnFileLength').length ? $('#hdnFileLength').val() : "8";
}

common.Sys.Version = "<18.07.13>";
common.Sys.ITS_TEL = "888.861.7227";
common.Sys.strDBName = "test";
common.Sys.m_strtxtRECORD_NEW = "New Record";
common.Sys.m_strtxtRECORD_EDIT = "Editing Record";
common.Sys.m_strtxtRECORD_NEWPREMAS = "New Pre-Master HAWB";
common.Sys.m_nCODELEN_CARRIER = 4;
common.Sys.m_strtxtDELIM = "~";
common.Sys.m_strtxtDELIM_ROW = "^";
common.Sys.m_strtxtDELIM_COLUMN = "`";
common.Sys.m_strtxtGridColumnSeparator = '!*!';
common.Sys.m_nCODELEN_CUSTOMER = 8;
common.Sys.txtInvalidFileNo = "Invalid File #";
common.Sys.txtBlankCustNo = "Blank Customer #";
common.Sys.m_nCODELEN_STATE = 2;
common.Sys.m_nCODELEN_ENTRYTYPE = 2;
common.Sys.m_nCODELEN_MODETRAN = 2;
common.Sys.m_nCODELEN_DISTPORT = 4;
common.Sys.m_nCODELEN_FIRM = 4;

common.Sys.UserAccessFunction = function (strFieldValue) {
    try {
        var UserAccess = false;
        var strURL = Util.GetActionURL('Validate_UserHasAccessToFunction', 'Common');

        var strData = { strFieldValue: strFieldValue };

        var callbackSuccess = function (response) {
            response = (response == "0" ? false : true);
            UserAccess = response;
            return UserAccess;
        };
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
        return UserAccess;
    }
    catch (e) {
        console.log('Errro occur at : common.Sys.UserAccessFunction');
        return false;
    }
}

common.Sys.GetDbName = function () {
    try {
        var strURL = Util.GetActionURL('getDbName', 'Common');
        var strData = {};
        var result = "";

        var callbackSuccess = function (response) {
            if (response[0])
                result = response[1];

            return result;
        };
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
        return result;
    }
    catch (e) {
        console.log('Errro occur at : common.Sys.IsBDP');
        return result;
    }
}

common.Sys.IsSpecialUser = function () {
    try {
        var strURL = Util.GetActionURL('IsSpecialUser', 'Common');
        var result = false;
        var strData = {};

        var callbackSuccess = function (response) {
            result = (response == "1" ? true : false);
            return result;
        };
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
        return result;
    }
    catch (e) {
        console.log('Errro occur at : common.Sys.IsSpecialUser');
        return false;
    }
}

common.Sys.IsBDP = function () {
    //var strtxtBDP = "BDP-BDPTEST";

    //if (strtxtBDP.indexOf(common.Sys.strDBName) > -1) {
    //    return true;
    //}
    //else {
    //    return false;
    //}
    try {
        var strURL = Util.GetActionURL('IsBDP', 'Common');
        var result = false;
        var strData = {};

        var callbackSuccess = function (response) {
            result = (response == "1" ? true : false);
            return result;
        };
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
        return result;
    }
    catch (e) {
        console.log('Errro occur at : common.Sys.IsBDP');
    }
}
common.Sys.getData = function (div, strAction, strModuleName, callback, strFieldParams) {
    var result = false;
    strFieldParams = (strFieldParams == undefined || strFieldParams == null) ? "" : JSON.stringify(strFieldParams);
    var strData = { strModuleName: strModuleName, strJSONParams: strFieldParams };
    var callbackSuccess = function (response) {
        result = true;
        $(div).html(response);
        if (typeof (callback) !== typeof (undefined))
            callback(true);
    };
    ajaxGet(strAction, strData, callbackSuccess);
    return result;
}

common.Sys.GetSiteUrl = function () {
    // if site url is empty than to consider absolute path use "/"
    return $('#hdnPath').val() || "/";
    // return "/";
}

common.Sys.ApplyDatePicker = function () {
    $(".datepick").datepicker({
        dateFormat: "dd-M-y",
        defaultDate: '',
        showOn: "button",
        buttonImage: Util.GetImageURL('Content/images/ol_down.png'),
        buttonImageOnly: true,
        buttonText: "Select date"
    });
}

common.Sys.ValidateCPFIMP_DeptNo = function (strDeptNo, m_objSTATIC_OPENLIST_CPFIMP) {
    var vData = m_objSTATIC_OPENLIST_CPFIMP.filter(function (data) { return data.DEPTNO == strDeptNo });
    return vData;
}

common.Sys.DoGetFileNumberLen = function () {
    return common.Sys.m_iFILENUMBER_LEN;
}

common.Sys.AtoD = function (strFieldId) {
    var strValue = $('#' + strFieldId).val() || '';

    if (IsBlank(strValue))
        return strValue;
    else {
        if (parseFloat(strValue) == NaN) {
            return strValue;
        }

        return parseFloat(strValue);
    }
}

//common.Sys.DateDiff = function (strDate1, strDate2) {
//    var iRet = ITS_RETURN_CODE.INVALID_DATE_FORMAT,
//        date1 = new Date(strDate1),
//        date2;

//    if (date1.toString() == "Invalid Date")
//        return iRet;

//    if (IsBlank(strDate2)) {
//        date2 = new Date();
//    } else {
//        date2 = new Date(strDate2);
//    }

//    if (date2.toString() == "Invalid Date")
//        return iRet;

//    iRet = (date2 - date1) / (1000 * 60 * 60 * 24);
//    return iRet;
//}


common.Sys.DateDiff = function (strDate1, strDate2) {
    var iRet = ITS_RETURN_CODE.INVALID_DATE_FORMAT;
    var strDate1YYYYMMDD = FormatDateYYYYMMDD(strDate1);
    var strDate2YYYYMMDD = FormatDateYYYYMMDD(strDate2);

    var yyyy1 = strDate1YYYYMMDD.substring(0, 4);
    var mm1 = parseInt(strDate1YYYYMMDD.substring(4, 6), 10) - 1;
    var dd1 = strDate1YYYYMMDD.substring(6, 8);


    var yyyy2 = strDate2YYYYMMDD.substring(0, 4);
    var mm2 = parseInt(strDate2YYYYMMDD.substring(4, 6), 10) - 1;
    var dd2 = strDate2YYYYMMDD.substring(6, 8);

    var date1 = new Date(yyyy1, mm1, dd1);
    var date2 = new Date(yyyy2, mm2, dd2);

    iRet = (date1 - date2) / (1000 * 60 * 60 * 24);
    return iRet;
}



common.Sys.DateDiff_FromToday = function (strDate) {
    strDateYYYYMMDD = FormatDateYYYYMMDD(strDate);

    var yyyy = strDateYYYYMMDD.substring(0, 4);
    var mm = parseInt(strDateYYYYMMDD.substring(4, 6), 10) - 1;
    var dd = strDateYYYYMMDD.substring(6, 8);

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(yyyy, mm, dd);
    var secondDate = new Date();

    var diffDays = Math.round((firstDate.getTime() - secondDate.getTime()) / (oneDay));
    return diffDays;
}


common.Sys.getMonthFromString = function (monthName) {
    var d = Date.parse(monthName + "1, 2012");
    if (!isNaN(d)) {
        return new Date(d).getMonth() + 1;
    }
}

common.Sys.DateFormat_YYYY_MM_DD = function (strDate) {
    if (strDate != undefined || $.trim(strDate) != "") {
        var strSplitDate = strDate.split("-");
        var vMonthName = strSplitDate[1];
        var vDate = strSplitDate[0];
        //var vYear = new Date(strDate).getFullYear();
        var vYear = "20" + strSplitDate[2];
        var vMonthNum = common.Sys.getMonthFromString(vMonthName);
        vMonthNum = vMonthNum < 10 ? '0' + vMonthNum : vMonthNum;


        var vReturnDate = vYear + "-" + vMonthNum + "-" + vDate;

        return vReturnDate;
    }
}


common.Sys.YYYY_MM_DD_DATE_OBJECT = function (strDate) {
    if ($.trim(strDate) != "") {

        var yyyy = strDate.substring(2, 4);
        var mm = strDate.substring(4, 6);
        var dd = strDate.substring(6, 8);
        //var vDate = new Date(yyyy, mm, dd);
        return yyyy + "-" + GetMonthName(mm) + "-" + dd;
    }
    else {
        return "";
    }
}


/**/


/*
Added By: Prashant Sachaniya
Purpose : For Busy Indicator
*/

/*
SStart
*/
function ShowProgressOnDiv(objLoader, objParent) {
    if (objParent != null) {
        var xleft = $(objParent).offset().left;
        var ytop = $(objParent).offset().top;
        $(objLoader).css({ left: xleft, top: ytop });
        $(objLoader).css('width', $(document).width());
        $(objLoader).css('height', $(document).height());
    } else {
        $(objLoader).css('width', $(document).width());
        $(objLoader).css('height', $(document).height());
    }
    $(objLoader).show();
    return false;
}

function HideProgressOnDiv(objLoader) {
    $(objLoader).hide();
    return false;
}

/*
SEnd
*/


function CheckZero(strValue, bMoreDecimals) {
    try {
        //2018-0418 Neerav
        //if (typeof strValue == 'undefined')
        if (typeof strValue == 'undefined' || strValue == null)
            return true;

        strValue = (strValue.toString().replace(/,/g, '')).trim();

        if (!IsNumeric(strValue))
            return true;

        if (typeof bMoreDecimals == 'undefined')
            bMoreDecimals = false;

        dVal = Number(strValue);

        if (bMoreDecimals) {

            if (dVal > -0.00000001 && dVal < 0.00000001)
                return true;

            return false;
        }
        else {

            if (dVal > -0.001 && dVal < 0.001)
                return true;

            return false;
        }
    }
    catch (e) {
        return false;
    }
}

/*
Added By: DHAVAL PITHVA
Purpose : For Common Validations
*/

/*
SStart
*/

function IsBlank(strValue) {
    //2017-1124 Neerav
    //if ($.trim(strValue) == "") {
    if (typeof strValue == 'undefined' || $.trim(strValue) == "") {
        return true;
    }
    else {
        return false;
    }
}

function ValidEmail(strValue) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    if (mailformat.test(strValue)) {
        return true;
    }
    else {
        return false;
    }
}

function TrimAll(strValue) {
    strValue = strValue.replace(/\s/g, "");
    return strValue;
}


function RFill(strValue, len) {
    if (parseInt(strValue.length, 10) >= parseInt(len, 10)) {
        strValue = strValue.slice(0, len);
    }
    return strValue;
}


function FormatCode(strFieldId, strWhich) {

    var strValue = $('#' + strFieldId).val();
    var pad = "00000000000000000000";

    //TrimAll(ref strCode);
    //ITSsys.RFill(ref strCode, 8);
    //TrimAll(ref strCode);
    //if (IsNumeric(strCode))
    //    FormatNumber(ref strCode, "{0:00000000}");
    switch (strWhich) {
        case "F7501_INVNO":
            if (typeof strValue == 'undefined')
                strValue = "1";

            strValue = strValue.trim();

            if (!IsNumeric(strValue))
                strValue = "1";

            pad = "000";
            pad = pad.slice(0, (3 - parseInt(strValue.length)));
            strValue = pad + strValue;
            break;
        case "CUSTNO":
            strValue = TrimAll(strValue);
            strValue = RFill(strValue, 8);
            strValue = TrimAll(strValue);
            pad = pad.slice(0, (8 - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < 8) {
                    strValue = pad + strValue;
                }
            }
            break;
        case "DEPTNO":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "0";
            strValue = TrimAll(strValue);
            pad = pad.slice(0, (3 - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < 3) {
                    strValue = pad + strValue;
                }
            }
            break;
        case "TRIM_MULTI_SPACES":
            strValue = strValue.replace(/  +/g, ' ');
            break;
        case "FILENUMBER":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "1";
            strValue = TrimAll(strValue);
            strValue = RFill(strValue, m_iFILENUMBER_LEN);
            pad = pad.slice(0, (m_iFILENUMBER_LEN - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < m_iFILENUMBER_LEN) {
                    strValue = pad + strValue;
                }
            }
            break;

        case "QUOTE_NO":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "1";
            strValue = TrimAll(strValue);
            strValue = RFill(strValue, m_iFILENUMBER_LEN);
            pad = pad.slice(0, (m_iFILENUMBER_LEN - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < m_iFILENUMBER_LEN) {
                    strValue = pad + strValue;
                }
            }
            break;

        case "FRGNPORT":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "0";
            strValue = TrimAll(strValue);
            pad = pad.slice(0, (5 - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < 5) {
                    strValue = pad + strValue;
                }
            }
            break;

    }

    $('#' + strFieldId).val(strValue);
}

//2018-0611 Neerav
//To format from values
function FormatCodeFromString(strValue, strWhich) {

    var pad = "00000000000000000000";

    switch (strWhich) {
        case "F7501_INVNO":
            if (typeof strValue == 'undefined')
                strValue = "1";

            strValue = strValue.trim();

            if (!IsNumeric(strValue))
                strValue = "1";

            pad = "000";
            pad = pad.slice(0, (3 - parseInt(strValue.length)));
            strValue = pad + strValue;
            break;
        case "CUSTNO":
            strValue = TrimAll(strValue);
            strValue = RFill(strValue, 8);
            strValue = TrimAll(strValue);
            pad = pad.slice(0, (8 - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < 8) {
                    strValue = pad + strValue;
                }
            }
            break;
        case "DEPTNO":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "0";
            strValue = TrimAll(strValue);
            pad = pad.slice(0, (3 - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < 3) {
                    strValue = pad + strValue;
                }
            }
            break;
        case "TRIM_MULTI_SPACES":
            strValue = strValue.replace(/  +/g, ' ');
            break;
        case "FILENUMBER":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "1";
            strValue = TrimAll(strValue);
            strValue = RFill(strValue, m_iFILENUMBER_LEN);
            pad = pad.slice(0, (m_iFILENUMBER_LEN - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < m_iFILENUMBER_LEN) {
                    strValue = pad + strValue;
                }
            }
            break;

        case "QUOTE_NO":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "1";
            strValue = TrimAll(strValue);
            strValue = RFill(strValue, m_iFILENUMBER_LEN);
            pad = pad.slice(0, (m_iFILENUMBER_LEN - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < m_iFILENUMBER_LEN) {
                    strValue = pad + strValue;
                }
            }
            break;

        case "FRGNPORT":
            if (!IsNumeric(strValue) || IsBlank(strValue))
                strValue = "0";
            strValue = TrimAll(strValue);
            pad = pad.slice(0, (5 - parseInt(strValue.length)));

            if (IsNumeric(strValue)) {
                if (parseInt(strValue.length, 10) < 5) {
                    strValue = pad + strValue;
                }
            }
            break;

    }

    return strValue;
}

function TrimStartNEnd_LimitLen(strFieldId, len) {
    var strValue = $('#' + strFieldId).val();

    if (IsBlank(strValue) == false) {
        strValue = $.trim(strValue);
        strValue = RFill(strValue, len);
        $('#' + strFieldId).val(strValue);
        return strValue.length;
    }
    else {
        return 0;
    }
}

function TrimAll_LimitLen(strFieldId, len) {
    var strValue = $('#' + strFieldId).val();

    if (IsBlank(strValue) == false) {
        strValue = TrimAll(strValue);
        strValue = RFill(strValue, len);
        $('#' + strFieldId).val(strValue);
    }
    return strValue.length;
}

function IsNumeric(strValue) {
    if (IsBlank(strValue) == false) {
        if (!isNaN(strValue)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function pad(strFieldId, max) {
    var rec_pad = function (str) {
        str = str.toString();
        return str.length < max ? rec_pad("0" + str) : str;
    }

    var strValue = $('#' + strFieldId).val();
    strValue = rec_pad(strValue);
    $('#' + strFieldId).val(strValue);
}

function FormatNumber(strFieldId, vDecimalPlace) {
    if (typeof strFieldId != 'undefined' && strFieldId != '') {

        var strValue = '';
        var type = '';

        var control = $('#' + strFieldId);

        if (typeof control != 'undefined' && control.length > 0 && typeof control[0].tagName != 'undefined') {
            type = control[0].tagName.toUpperCase();
        }

        if (type == 'SPAN')
            strValue = $('#' + strFieldId).text();
        else
            strValue = $('#' + strFieldId).val();

        //strValue = strValue.replace(/,/g, '');

        strValue = FormatNumberFromString(strValue, vDecimalPlace); // Format Number with commas.

        if (type == 'SPAN')
            $('#' + strFieldId).text(strValue);
        else
            $('#' + strFieldId).val(strValue);
    }
}

function FormatNumberFromString(strValue, vDecimalPlace) {
    if ((typeof strValue == 'undefined') || (IsBlank(strValue) == true)) {
        return '0';
    }
    else {
        strValue = strValue.toString();
        strValue = strValue.replace(/,/g, '');

        if ((IsNumeric(strValue) == false)) {
            return '0';
        }
        else {
            return CurrencyFormat(strValue, vDecimalPlace);
        }
    }
}

function CurrencyFormat(number, vDecimalPlace) {
    var decimalplaces = vDecimalPlace;
    var decimalcharacter = ".";
    var thousandseparater = ",";
    number = ITSsys.AtoD('', number);
    //number = parseFloat(number); // return zero if value contains comma...
    var sign = number < 0 ? "-" : "";
    var formatted = new String(number.toFixed(decimalplaces));
    if (decimalcharacter.length && decimalcharacter != ".") { formatted = formatted.replace(/\./, decimalcharacter); }
    var integer = "";
    var fraction = "";
    var strnumber = new String(formatted);
    var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
    if (dotpos > -1) {
        if (dotpos) { integer = strnumber.substr(0, dotpos); }
        fraction = strnumber.substr(dotpos + 1);
    }
    else { integer = strnumber; }
    if (integer) { integer = String(Math.abs(integer)); }
    while (fraction.length < decimalplaces) { fraction += "0"; }
    temparray = new Array();
    while (integer.length > 3) {
        temparray.unshift(integer.substr(-3));
        integer = integer.substr(0, integer.length - 3);
    }
    temparray.unshift(integer);
    integer = temparray.join(thousandseparater);

    if (IsBlank(fraction) == true) {
        return sign + integer;
    }
    else {
        return sign + integer + decimalcharacter + fraction;
    }
}

function DoGetFileNumberLen() {
    return m_iFILENUMBER_LEN;
}

/*
SEnd
*/


/*
Added By: DHAVAL PITHVA
Purpose : Open a Report it expects a JSON as parameter with PageName, PARAM and Orientation keys.
*/

/*
SStart
*/


function OnSuccessCallReport(result) {
    var Left = 0;
    var siteURL = $('#hdnSiteUrl').val();
    //2017-0220 Dhaval
    // web2 url.
    //siteURL = "web2.its4abi.com/ITSWebRptTest/";
    //// local url.
    //siteURL = "localhost/ITSWebRpt/";
    ////2017-0220 Dhaval


    // For Server..	
    var siteURL = $('#hdnSiteUrl').val();
    siteURL = "web2.its4abi.com/ITSWebRptTest/";
    //siteURL = "localhost/ITSWeb/";
    // For Server..

    if (result != null && result != '') {
        var ArrData = JSON.parse(result);

        if (ArrData.Orientation == "Landscape") {
            window.open(window.location.protocol + "//" + siteURL + "reports/" + ArrData.PageName + "?query=" + ArrData.PARAM, "_blank", 'toolbar=0,scrollbars=1,directories=0,location=0,statusbar=0,menubar=0,resizable=1,width=1200,height=800,left=' + Left + ',top=0,linkbar=0');
            Left = 300;
        }
        else {
            window.open(window.location.protocol + "//" + siteURL + "Reports/" + ArrData.PageName + "?query=" + ArrData.PARAM, "_blank", 'toolbar=0,scrollbars=1,directories=0,location=0,statusbar=0,menubar=0,resizable=1,width=950,height=800,left=' + Left + ',top=0,linkbar=0');
            Left = 300;
        }
    }
}


/*
SEnd
*/


/*
Added By: Dhaval Pithva
Purpose : For all type of DataType Validations.
*/

/*
SStart
*/
function DataType(ctrl, evt) {
    var strDataType = ctrl.attr("DataType") || ctrl.data("datatype");
    var strDataValue = ctrl.val().length;
    //*******************KEYCODES***********************
    //NUMBERS Keycode from 48 to 57 and 96 to 105.
    //BACKSPACE Keycode 8, TAB Keycode  9,ENTER Keycode 13,DELETE keycode 46,SPACE Keycode 32.
    //LEFT Arrow Keycode 37,UP Arrow Keycode 38,RIGHT Arrow KeyCode 39,DOWN Arrow KeyCode 40.
    //ALPHABETS keycode from 65 to 90.
    switch (strDataType) {
        case "Integer":
        case "uppercaseN":
            if (!evt.shiftKey && !evt.altKey && !evt.ctrlKey && evt.keyCode >= 48 && evt.keyCode <= 57 ||
                 evt.keyCode >= 96 && evt.keyCode <= 105 || evt.keyCode == 13 || evt.keyCode == 8 || evt.keyCode == 9 ||
                 evt.keyCode == 46 || (evt.keyCode >= 37 && evt.keyCode <= 40))
                return true;

            return false;

        case "Alphabet":
        case "uppercaseA":
            if ((evt.keyCode > 64 && evt.keyCode < 91) || evt.keyCode == 13 || evt.keyCode == 8 ||
                evt.keyCode == 9 || evt.keyCode == 46 || (evt.keyCode >= 16 && evt.keyCode <= 19)
                || (evt.keyCode >= 37 && evt.keyCode <= 40))
                return true;

            return false;

        case "AlphaNumeric":
        case "uppercaseAN":
            if (!evt.shiftKey && !evt.altKey && !evt.ctrlKey && (evt.keyCode >= 48 && evt.keyCode <= 57) ||
           (evt.keyCode >= 65 && evt.keyCode <= 90) || (evt.keyCode >= 97 && evt.keyCode <= 122) ||
           evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 13 || evt.keyCode == 46 ||
           (evt.keyCode >= 37 && evt.keyCode <= 40))
                return true;

            return false;

        case "uppercaseAN_SpaceOK":
        case "AlphaNumeric_Space":
            if (!evt.shiftKey && !evt.altKey && !evt.ctrlKey && (evt.keyCode > 47 && evt.keyCode < 58) ||
               (evt.keyCode > 64 && evt.keyCode < 91) || evt.keyCode == 9 || evt.keyCode == 46 ||
                (evt.keyCode > 96 && evt.keyCode < 123) || evt.keyCode == 8 || evt.keyCode == 13 ||
                (evt.keyCode >= 37 && evt.keyCode <= 40) || evt.keyCode == 32)
                return true;

            return false;

        case "uppercaseN_SpaceOK":
        case "Numeric_Space":
            if (!evt.shiftKey && !evt.altKey && !evt.ctrlKey && (evt.keyCode > 47 && evt.keyCode < 58) ||
                (evt.keyCode >= 97 && evt.keyCode <= 105) || evt.keyCode == 8 || evt.keyCode == 13 ||
                evt.keyCode == 9 || evt.keyCode == 46 ||
                (evt.keyCode >= 37 && evt.keyCode <= 40) || evt.keyCode == 32)
                return true;

            return false;

        case "uppercaseA_SpaceOK":
        case "Alphabet_Space":
            if ((evt.keyCode > 64 && evt.keyCode < 91) || evt.keyCode == 8 || evt.keyCode == 32 ||
                evt.keyCode == 9 || evt.keyCode == 13 || (evt.keyCode >= 37 && evt.keyCode <= 40))
                return true;

            return false;

        case "Currency":
            if (!evt.shiftKey && !evt.altKey && !evt.ctrlKey && evt.keyCode >= 48 && evt.keyCode <= 57 ||
                evt.keyCode >= 96 && evt.keyCode <= 105 || evt.keyCode == 8 || evt.keyCode == 9
               || evt.keyCode == 46 || evt.keyCode == 13 || (evt.keyCode >= 37 && evt.keyCode <= 40)
                || ((evt.keyCode == 46 || evt.keyCode == 190 || evt.keyCode == 110) && ctrl.val().split('.').length === 1))

                return true;

            return false;

        case "Integer10":
            if (!evt.shiftKey && !evt.altKey && !evt.ctrlKey && evt.keyCode >= 48 && evt.keyCode <= 57 ||
                 evt.keyCode >= 96 && evt.keyCode <= 105 || evt.keyCode == 8 || evt.keyCode == 9
                || evt.keyCode == 46 || evt.keyCode == 13 || (evt.keyCode >= 37 && evt.keyCode <= 40))

                if (strDataValue < 10 || evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 13 || evt.keyCode == 46 || (evt.keyCode >= 37 && evt.keyCode <= 40)) {
                    return true;
                }
                else {
                    return false;
                }
            return false;
    }
}


/*
SEnd
*/

//Start : Common Function From jCustomer
function FormatDate_DDMMYYYY(strDateYYYYMMDD) {
    if ($.trim(strDateYYYYMMDD) != "") {

        var yyyy = strDateYYYYMMDD.substring(2, 4);
        var mm = strDateYYYYMMDD.substring(4, 6);
        var dd = strDateYYYYMMDD.substring(6, 8);
        //var vDate = new Date(yyyy, mm, dd);
        return dd + "-" + GetMonthName(mm) + "-" + yyyy;
    }
    else {
        return "";
    }

}



//Start : Common Function From jCustomer
function FormatDateYYYYMMDD(strDate) {
    if ($.trim(strDate) != "") {
        strDate = strDate.split('-');
        var getDate = (new Date).getFullYear()
        var yyyy = getDate.toString().substring(0, 2) + strDate[2];
        var mm = parseInt(months.indexOf(strDate[1].toUpperCase()), 10) + 1;
        var mm = mm < 10 ? "0" + mm : mm;
        var dd = strDate[0];
        return yyyy + mm + dd;
    }
    else {
        return "";
    }

}

var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function GetMonthName(vMonth) {
    var strMonthName = "";

    switch (parseInt(vMonth, 10)) {
        case 1:
            strMonthName = "Jan";
            break;
        case 2:
            strMonthName = "Feb";
            break;
        case 3:
            strMonthName = "Mar";
            break;
        case 4:
            strMonthName = "Apr";
            break;
        case 5:
            strMonthName = "May";
            break;
        case 6:
            strMonthName = "Jun";
            break;
        case 7:
            strMonthName = "Jul";
            break;
        case 8:
            strMonthName = "Aug";
            break;
        case 9:
            strMonthName = "Sep";
            break;
        case 10:
            strMonthName = "Oct";
            break;
        case 11:
            strMonthName = "Nov";
            break;
        case 12:
            strMonthName = "Dec";
            break;
    }

    return strMonthName;
}

function ITS_MODULE_SETUP_03_SetFocus(strFieldId) {
    try {
        $('#' + strFieldId).focus();
    }
    catch (e) {
        jAlert(e.message, strModuleTitle)
    }
}

function ITS_MODULE_SETUP_03a_MessageBox(strFocusFieldId, strMessage, strModuleTitle) {
    jAlert(strMessage, strModuleTitle, function () {
        $('#' + strFocusFieldId).blur();
        setTimeout(function () {
            $('#' + strFocusFieldId).trigger('click');
            $('#' + strFocusFieldId).focus();
            //$('#' + strFocusFieldId).select();
        }, 300);
    });

    //alert(strMessage);
    //$('#' + strFocusFieldId).focus();
    //$('#' + strFocusFieldId).select();
}

//End : Common Function From jCustomer


// on load functions
$(function () {
    $(document).ajaxStart(function () {
        ShowProgressOnDiv($('#dvcontentloader'), $('#wrapper'));
    });
    $(document).ajaxStop(function () {
        HideProgressOnDiv($('#dvcontentloader'));
    });
    //$(document).ajaxSuccess(function (jqXHR, exception, Data) {
    //    HideProgressOnDiv($('#dvcontentloader'));
    //});
    $(document).ajaxError(function (jqXHR, exception, Data) {
        HideProgressOnDiv($('#dvcontentloader'));

        if (exception.status === 404) {
            jAlert("Ajax call failed.", "Alert");
        }
        else {
            jAlert(exception.responseText, strModuleTitleAlert != undefined && strModuleTitleAlert !== null ? strModuleTitleAlert : "Alert");
        }

        if (strModuleTitleAlert)
            strModuleTitleAlert = '';
    });


});

function ajaxPOST(strURL, strData, callbackSuccess, strErrAlertTitle, callbackError, showLoader, async) {
    if (strErrAlertTitle)
        strModuleTitleAlert = strErrAlertTitle;
    $.ajax({
        type: "POST",
        url: strURL,
        data: strData,
        cache: false,
        async: (async == undefined || async == null) ? true : async,
        dataType: 'json',
        global: (showLoader == undefined && showLoader == null) ? true : ((showLoader != undefined && showLoader != null && showLoader) ? true : false),
        success: callbackSuccess,
        error: callbackError,
        traditional: true
    });
}
function ajaxPOSTFile(strURL, strData, strfiles, callbackSuccess, strErrAlertTitle, callbackError, showLoader, async) {
    if (strErrAlertTitle)
        strModuleTitleAlert = strErrAlertTitle;
    $.ajax({
        type: "POST",
        url: strURL,
        data: strData,
        files: strfiles,
        iframe: true,
        cache: false,
        async: (async == undefined || async == null) ? true : async,
        dataType: 'json',
        global: (showLoader == undefined && showLoader == null) ? true : ((showLoader != undefined && showLoader != null && showLoader) ? true : false),
        success: callbackSuccess,
        error: callbackError,
        processData: false,
        traditional: true
    });
}
function ajaxGet(strURL, strData, callbackSuccess, strErrAlertTitle, callbackError, showLoader) {
    if (strErrAlertTitle)
        strModuleTitleAlert = strErrAlertTitle;
    $.ajax({
        type: "GET",
        url: strURL,
        data: strData,
        cache: false,
        global: (showLoader == undefined && showLoader == null) ? true : ((showLoader != undefined && showLoader != null && showLoader) ? true : false),
        dataType: 'html',
        success: callbackSuccess,
        error: callbackError
    });
}

function ajaxGetJSON(strURL, strData, callbackSuccess, strErrAlertTitle, callbackError, showLoader) {
    if (strErrAlertTitle)
        strModuleTitleAlert = strErrAlertTitle;
    $.ajax({
        type: "GET",
        url: strURL,
        data: strData,
        cache: false,
        global: (showLoader == undefined && showLoader == null) ? true : ((showLoader != undefined && showLoader != null && showLoader) ? true : false),
        dataType: 'json',
        success: callbackSuccess,
        error: callbackError
    });
}

//Purpose : To Check if tab content div tag has any content rendered or not.
function IsContentExists(obj) {
    if ($('#' + obj).find('div,span,input,form').length > 0)
        return 1;
    else
        return 0;
}



/*
Added By: DHAVAL PITHVA
Purpose : To Check if a control has vertical or horizontal scrollbar or not
*/

/*
SStart
*/
jQuery.fn.hasScrollBar = function (direction) {
    if (direction == 'vertical') {
        return this.get(0).scrollHeight > this.innerHeight();
    }
    else if (direction == 'horizontal') {
        return this.get(0).scrollWidth > this.innerWidth();
    }
    return false;

}


function GetSiteUrl() {
    // if site url is empty than to consider absolute path use "/"
    return $('#hdnPath').val() || "/";
    // return "/";
}


/*
SEnd
*/

/*
Added By: Prashant Sachaniya
Purpose : For Busy Indicator
*/

/*
SStart
*/
function CommonUpdateSubmit(vFormID, vControllerUrl) {
    var strURL = GetSiteUrl() + vControllerUrl

    var myform = $(vFormID);

    // Find disabled inputs, and remove the "disabled" attribute
    var disabled = myform.find(':input:disabled').removeAttr('disabled');

    var strData = myform.serialize();

    // re-disabled the set of inputs that you previously enabled
    disabled.attr('disabled', 'disabled');

    var callbackSuccess = function (data, textStatus, XMLHttpRequest) {
        jAlert(data[1], 'Codes');
        return false;
    };
    ajaxPOST(strURL, strData, callbackSuccess, 'Codes');
}


/*
SEnd
*/


/*
MStart
*/


function CommonDeleteSubmit(vFormID, vControllerUrl) {
    var strURL = GetSiteUrl() + vControllerUrl

    var myform = $(vFormID);

    // Find disabled inputs, and remove the "disabled" attribute
    var disabled = myform.find(':input:disabled').removeAttr('disabled');

    var collection = $(vFormID).serializeArray();
    collection.push({
        name: 'bForDelete',
        value: true
    });
    var strData = $.param(collection);

    // re-disabled the set of inputs that you previously enabled
    disabled.attr('disabled', 'disabled');

    var callbackSuccess = function (data, textStatus, XMLHttpRequest) {
        jAlert(data[1], 'Codes');
        return false;
    };
    ajaxPOST(strURL, strData, callbackSuccess, 'Codes');
}


var SelectListItem =
    {
        Text: "",
        Value: ""
    }

var EALGenericModel50 = {
    IsSelected: false,
    strCOL01: '',
    strCOL02: '',
    strCOL03: '',
    strCOL04: '',
    strCOL05: '',
    strCOL06: '',
    strCOL07: '',
    strCOL08: '',
    strCOL09: '',
    strCOL10: '',
    strCOL11: '',
    strCOL12: '',
    strCOL13: '',
    strCOL14: '',
    strCOL15: '',
    strCOL16: '',
    strCOL17: '',
    strCOL18: '',
    strCOL19: '',
    strCOL20: '',
    strCOL21: '',
    strCOL22: '',
    strCOL23: '',
    strCOL24: '',
    strCOL25: '',
    strCOL26: '',
    strCOL27: '',
    strCOL28: '',
    strCOL29: '',
    strCOL30: '',
    strCOL31: '',
    strCOL32: '',
    strCOL33: '',
    strCOL34: '',
    strCOL35: '',
    strCOL36: '',
    strCOL37: '',
    strCOL38: '',
    strCOL39: '',
    strCOL40: '',
    strCOL51: '',
    strCOL52: '',
    strCOL53: '',
    strCOL54: '',
    strCOL55: '',
    strCOL56: '',
    strCOL57: '',
    strCOL58: '',
    strCOL59: '',
    strCOL60: ''
}

var EALGenericModel = {
    IsSelected: false,
    strCOL01: '',
    strCOL02: '',
    strCOL03: '',
    strCOL04: '',
    strCOL05: '',
    strCOL06: '',
    strCOL07: '',
    strCOL08: '',
    strCOL09: '',
    strCOL10: '',
    strCOL11: '',
    strCOL12: '',
    strCOL13: '',
    strCOL14: '',
    strCOL15: '',
    strCOL16: '',
    strCOL17: '',
    strCOL18: '',
    strCOL19: '',
    strCOL20: '',
    strCOL21: '',
    strCOL22: '',
    strCOL23: '',
    strCOL24: '',
    strCOL25: '',
    strCOL26: '',
    strCOL27: '',
    strCOL28: '',
    strCOL29: '',
    strCOL30: '',
    strCOL31: '',
    strCOL32: '',
    strCOL33: '',
    strCOL34: '',
    strCOL35: '',
    strCOL36: '',
    strCOL37: '',
    strCOL38: '',
    strCOL39: '',
    strCOL40: ''
}

var EALvwCPFIMP = {
    aBI_STATUSField: '',
    bONDNOField: '',
    bONDTYPEField: '',
    bOND_PRODUCERField: '',
    bYTE4_ENTRYNOField: '',
    cLIENT_BRANCHField: '',
    cUSTNOField: '',
    cUSTOM_ASSIGNNOField: '',
    dEPTNOField: '',
    dISTPORT1Field: '',
    dISTPORT2Field: '',
    dISTPORT3Field: '',
    fILERField: '',
    hOUSE_BOXField: '',
    iATAField: '',
    pAYER_UNITField: '',
    sURETY_CODEField: '',
    typeField: ''
}

function OnSuccessCallPDF(result) {
    var Left = 0;
    var siteURL = $('#hdnSiteUrl').val();
    //var siteURL = "localhost/itsweb/";
    var siteURL = "web2.its4abi.com/itswebtest/";

    if (result != null && result != '') {
        var ArrData = JSON.parse(result);
        $("#hdnHeader").val(ArrData.paramHeader);
        $("#hdnFooter").val(ArrData.paramFooter);
        $("#hdnGrid").val(ArrData.paramGridData);
        $("#hdnIsPreview").val(ArrData.paramIsPreview);
        $("#hdnstrData").val(ArrData.paramstrdata);
        $("#hdnIsDisplayHeader").val(ArrData.paramDisplayHeader);
        if (ArrData.Orientation == "Landscape") {
            window.open(window.location.protocol + "//" + siteURL + "MenuSamplePage/PopupPrintForm.aspx", null, 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=950,height=700,left=0,top=0');
            Left = 300;
        }
        else {
            window.open(window.location.protocol + "//" + siteURL + "MenuSamplePage/PopupPrintForm.aspx", "_blank", 'toolbar=0,scrollbars=1,directories=0,location=0,statusbar=0,menubar=0,resizable=1,width=950,height=800,left=' + Left + ',top=0,linkbar=0');
            Left = 300;
        }
    }
}

function OpenTicketSystem(Contentdiv) {
    var strURL = Util.GetActionURL('_TicketSystem', 'Profile');
    var strData = "";
    var callbackSuccess = function (response) {
        $('#' + Contentdiv).html(response);
    };
    ajaxGet(strURL, null, callbackSuccess);
}
function OpenARInvoice(Contentdiv) {
    var strURL = Util.GetActionURL('_ARInvoice', 'Common');
    var strData = "";
    var callbackSuccess = function (response) {
        $('#' + Contentdiv).html(response);
        $('#IDD_ARINV_IDOL_FILENUMBER').trigger('click');
    };
    ajaxGet(strURL, null, callbackSuccess);
}

var Util = {
    GetActionURL: function (action, controller) {
        return strSiteURL + controller + "/" + action;
    },
    GetImageURL: function (path) {
        return strSiteURL + path;
    }
};

Date.prototype.YYYYMMDD = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};

Date.prototype.DD_MMM_YYYY = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    return ((dd[1] ? dd : "0" + dd[0]) + "-" + GetMonthName((mm[1] ? mm : "0" + mm[0])) + "-" + yyyy).toString();
};

ITSsys = {
    m_nCODELEN_CUSTOMER: 8,
    m_nCODELEN_VENDOR: 8,
    m_nCODELEN_CONSIGNEE: 3,
    m_nCODELEN_CONSIGNEE_EX: 8,
    m_nCODELEN_DISTPORT: 4,
    m_nCODELEN_FRGNPORT: 5,
    m_nCODELEN_CARRIER: 4,
    m_nCODELEN_FIRM: 4,
    m_nCODELEN_ENTRYTYPE: 2,
    m_nCODELEN_MODETRAN: 2,
    m_nCODELEN_STATE: 2,
    m_nCODELEN_HTS: 10,
    m_nCODELEN_CTRY: 2,
    m_nCODELEN_MID: 15,
    m_nCODELEN_PRODUCT: 16,
    m_nCODELEN_GLNO: 10,
    m_nCODELEN_BILLITEM: 3,
    m_nCODELEN_DEPTNO: 3,
    m_nCODELEN_FILENUMBER: 6,
    M_NCODELEN_ITEM: 3,
    m_nCODELEN_CONTEQUIP: 2,
    m_OPENLIST_iStartPoint: 0,
    m_OPENLIST_nPageSize: 20,
    m_nKeyLen: 10,

    m_strtxtRECORD_NEW: 'New Record',
    m_strtxtRECORD_EDIT: 'Editing Record',

    AtoD: function (strFieldId, strVal) {
        var strValue = $('#' + strFieldId).val() || '';
        if (typeof strValue != 'undefined' && strValue != '')
            strValue = (strValue.replace(/,/g, ''));

        if (typeof strVal != 'undefined' && strVal != '')
            strValue = (strVal.toString().replace(/,/g, ''));  // strValue = strVal.replace(",", "");  

        if (IsBlank(strValue))
            return 0;
        else {
            if (parseFloat(strValue) == NaN) {
                return 0;
            }

            return parseFloat(strValue);
        }
    },
    Atoi: function (strFieldId, strVal) {
        var strValue = $('#' + strFieldId).val() || '';

        if (typeof strValue != 'undefined' && strValue != '')
            strValue = (strValue.replace(/,/g, ''));

        if (typeof strVal != 'undefined' && strVal != '')
            strValue = (strVal.toString().replace(/,/g, ''));                              //strValue = strVal.replace(",", "");

        if (IsBlank(strValue))
            return 0;
        else {
            if (parseInt(strValue, 10) == NaN) {
                return 0;
            }

            return parseInt(strValue, 10);
        }
    },
    DateToday_YYYYMMDD: function () {
        var date = new Date();
        return date.YYYYMMDD();
    },
    DateToday_DD_MMM_YYYY: function () {
        var date = new Date();
        return date.DD_MMM_YYYY();
    },
    DateDiff: function (strDate1, strDate2) {
        var iRet = ITS_RETURN_CODE.INVALID_DATE_FORMAT,
            date1 = new Date(strDate1),
            date2;

        if (date1.toString() == "Invalid Date")
            return iRet;

        if (IsBlank(strDate2)) {
            date2 = new Date();
        } else {
            date2 = new Date(strDate2);
        }

        if (date2.toString() == "Invalid Date")
            return iRet;

        iRet = (date2 - date1) / (1000 * 60 * 60 * 24);
        return iRet;
    }
}

ITS_RETURN_CODE = {
    INVALID_DATE_FORMAT: -10021
}

var MBoxButtons = {
    Ok: "Ok",
    YesNo: "YesNo",
    YesNoCancel: "YesNoCancel",
    OkCancel: "OkCancel",
    None: "None"
}

var MBoxIcon = {
    None: Util.GetImageURL('content/images/popup/editicon.png'),
    Question: Util.GetImageURL('content/images/popup/Question.png'),
    Information: Util.GetImageURL('content/images/popup/Information.png'),
    Error: Util.GetImageURL('content/images/popup/Error.png'),
    Warning: Util.GetImageURL('content/images/popup/Warning.png')
}

function InsertNewRecordGrid(gridId) {
    var obj = $.extend(true, {}, EALGenericModel);

    $('#' + gridId).grid().Insert(obj);

    //SauravM 10102016 start
    var e = jQuery.Event("keydown");
    e.which = e.keyCode = 9;
    var $this = $('#' + gridId);                                        // Bind the Grid in $this variable.
    var tr = $this.find('.its-table tr');                               // Stores all tr in 'tr' variable.
    var rowIndex = tr.length;                                           // Count total length of tr.
    var tdActive = tr.eq(rowIndex - 1).find('td');                      // Selected all td's for particular tr.
    var target = tdActive && tdActive.length > 0 ? tdActive['0'] : {};  // Selecting 0th position td from particular td's collection
    $(target).trigger(e);
    //SauravM 10102016 end
}

var niceScroll = function (midcontent, hdbar) {
    onload();
    var divContent = $(".div-content:visible"), newHeight, oldHeight,
        content = divContent.height() || 0,
        padding = (parseInt(midcontent.css('padding-top'), 10) + parseInt(midcontent.css('padding-bottom'), 10)) || 0,
        margin = (parseInt(midcontent.css('margin-top'), 10) + parseInt(midcontent.css('margin-bottom'), 10)) || 0,
        border = (parseInt(midcontent.css('border-top-width'), 10) + parseInt(midcontent.css('border-bottom-width'), 10)) || 0;

    if (typeof midcontent != undefined) {
        oldHeight = midcontent.height();
        newHeight = content - hdbar - padding - margin - border;

        (oldHeight != newHeight) && midcontent.height(newHeight);

        if (midcontent.getNiceScroll().length <= 0)
            midcontent.niceScroll();

        (oldHeight != newHeight) && midcontent.getNiceScroll().resize();
    }
}

var onload = function () {
    var divContent = $(".div-content:visible"), newHeight, oldHeight,
        $this, container, menuHeader, padding, margin, border;

    $(divContent).each(function (index, obj) {
        $this = $(this);

        if ($this.closest('div.PopupDiv').length == 0) {
            container = $this.closest('div.container');
            menuHeader = container.find(".menu-header:visible");
            padding = (parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10)) || 0;
            margin = (parseInt($this.css('margin-top'), 10) + parseInt($this.css('margin-bottom'), 10)) || 0;
            border = (parseInt($this.css('border-top-width'), 10) + parseInt($this.css('border-bottom-width'), 10)) || 0;

            oldHeight = $this.height();
            newHeight = container.height() - menuHeader.outerHeight() - padding - margin - border;

            (oldHeight != newHeight) && $this.height(newHeight);
        }
    });
}

function GetIniSetting_FeatureActivated(strSection, strKey) {
    //$(INIFeatures).each(function (index, obj) {
    //    if (strSection == "CHANGES") {
    //        if (obj['strCOL02'] == INIInitial + '_' + strKey) {
    //            return obj['strCOL03'];
    //        }
    //    }
    //});
    //return "1";

    try {
        var strURL = Util.GetActionURL('GetIniSetting_FeatureActivated', 'Common');
        var result = 0;

        var collection = {
            strSection: strSection,
            strKey: strKey
        };

        var strData = $.param(collection);
        var callbackSuccess = function (response) {
            result = typeof response[1] != 'undefined' ? response[1] : '';
            return result;
        };
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
        return result;
    }
    catch (e) {
        console.log('Errro occur at : GetIniSetting_FeatureActivated');
        return false;
    }
}

function GetIniSetting_Feature() {
    var strURL = Util.GetActionURL('GetIniSetting_Feature', 'Common');
    var strData = "";
    var callbackSuccess = function (response) {
        //INIFeatures = "";
        //INIInitial = "";
        if ($.trim(response.VALID) == "TRUE") {
            if ($.trim(response.DATA) != "" && $.trim(response.DATA) != "{}" && $.trim(response.DATA) != "Error") {
                var ArrCustData = JSON.parse(response.DATA);
                if ($.trim(ArrCustData.MAIN_DATA) != "" && $.trim(ArrCustData.MAIN_DATA) != "{}" && $.trim(ArrCustData.MAIN_DATA) != "Error") {
                    INIFeatures = JSON.parse(ArrCustData.INISetting);
                    INIInitial = ArrCustData.DBName;
                }
            }
        }
    };
    ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
}

function IsTsDefaultInfoExists(strRecType, strValue) {
    try {
        var result = false;
        if (strRecType == 'undefined')
            strRecType = "";

        if (strValue == 'undefined')
            strValue = "";

        var strURL = Util.GetActionURL('IsTsDefaultInfoExists', 'Common');
        var strData = {
            'strRecType': strRecType,
            'strValue': strValue
        };
        var callbackSuccess = function (response) {
            if (response == "1")
                result = true;
        }
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
        return result;
    }
    catch (e) {
        console.log('Errro occur at : IsTsDefaultInfoExists');
        return false;
    }
}

function GetTsDefaultInfo(strRecType, strValue, bParseValue) {
    try {
        if (bParseValue == 'undefined' || !bParseValue)
            bParseValue = false;

        var strURL = Util.GetActionURL('GetTsDefaultInfo', 'Common');
        var strData = {
            'strRecType': strRecType,
            'strValue': strValue,
            'bParseValue': bParseValue
        };
        var callbackSuccess = function (response) {
            if ($.trim(response.VALID) == "TRUE") {

            }
        };
        ajaxPOST(strURL, strData, callbackSuccess, null, null, null, false);
    }
    catch (e) {
        console.log('Errro occur at : GetTsDefaultInfo');
        return "";
    }
}

function ITS_Trace(strModule, strMsg) {
    var str = "";
    if (strModule == "-1") {
        m_strITSTrace = "";
        return m_strITSTrace;
    }

    if (strModule == "-2") {
        return m_strITSTrace;
    }

    if (m_strITSTrace.length > 1000000)
        m_strITSTrace = "";

    if (strModule != "") {
        str += strModule;
        str += " ";
    }

    if (strMsg != "") {
        str += strMsg;
    }

    if (!IsBlank(str)) {
        m_strITSTrace += str;
        m_strITSTrace += "\n";
    }
    return m_strITSTrace;
}

ITSControl_KeyDown = function (e, data) {
    var $this = $(this),
            controlId = $this.attr('id'),
            bNextField = false, bPreviousField = false;

    if ($this.hasClass('OpenListUL')) {
        data.OpenList_KeyDown.call(this, controlId, e)
    } else {
        // Prevent combobox up/down to next and Prev
        if ($.trim(e.target.nodeName).toLowerCase() == 'select') {
            if (e.keyCode == 38 || e.keyCode == 40) {
                return true;
            }
            // Left Arrow Key
            if (e.keyCode == 37) {
                bPreviousField = true;
            }
            // Right Arrow Key
            if (e.keyCode == 39) {
                bNextField = true;
            }
        }

        // 38 - Up , e.ShiftKey for shift key
        if (e.keyCode == 38) {
            bPreviousField = true;
        }

        // 13 - Enter , 9 - Tab , 40 - Down
        if (e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 40) {
            bNextField = true;
        }

        // Shift + Tab for set focus to previous field
        if (e.shiftKey) {
            if (e.keyCode == 9) {
                bPreviousField = true;
                bNextField = false;
            }
        }

        if (bPreviousField) {
            data.ITS_MODULE_SETUP_10_ValidateFields.call(this, controlId, 2);
        }

        if (bNextField) {
            data.ITS_MODULE_SETUP_10_ValidateFields.call(this, controlId, 0);
        }
    }

    // Stop Tab Key's Default Action
    if (e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 40) {   //tab pressed
        e.preventDefault(); // stops its action
    }

    var vDataType = $this.attr('DataType') || $this.data('datatype');
    if (vDataType != null || vDataType != undefined) {
        return DataType($this, e);
    }
}

$(document).ready(function () {
    common.Sys.m_iFILENUMBER_LEN = common.Sys.GetFileLength();
    m_iFILENUMBER_LEN = common.Sys.GetFileLength();

    strSiteURL = GetSiteUrl();

    $(document).off('mouseover', '.tab').on('mouseover', '.tab', function () {
        var $this = $(this);
        (typeof $this.attr('title') != 'string' || $this.attr('title') == '') && $this.attr('title', $this.text());

        $('.tab').removeClass('active');
        $this.addClass('active');
    });

    $(document).off('mouseout', '.tab').on('mouseout', '.tab', function () {
        $('.tab').removeClass('active');
    });

    $("body").off("keydown").on("keydown", function (e) {
        // 17 - ctrl , 18 - alt , 84 - T
        if (e.ctrlKey && e.altKey && (String.fromCharCode(e.which) === 'T' || String.fromCharCode(e.which) === 't')) {
            TraceBox("#divTraceLog", false);
            return false;
        }
    });

    var checkInViewTimer,
    checkInView = function () {
        var midcontent = $('.midcontent:visible'),
            $this, container, hdbarOHeight;

        $(midcontent).each(function (index, obj) {
            $this = $(this);

            if ($this.closest('div.PopupDiv').length == 0) {
                container = $this.closest('div.container');
                hdbarOHeight = container.find('.hdbar').is(':visible') && $('.hdbar:visible').outerHeight() || 0;

                niceScroll($this, hdbarOHeight);
            }
        });
        if ($('.OL:visible').length > 0) {
            if ($('.midcontent').getNiceScroll() != undefined && $('.midcontent').getNiceScroll()[0] != undefined)
                $('.midcontent').getNiceScroll()[0].locked = true;
        } else {
            if ($('.midcontent').getNiceScroll() != undefined && $('.midcontent').getNiceScroll()[0] != undefined)
                $('.midcontent').getNiceScroll()[0].locked = false;
        }
    };

    checkInViewTimer = setInterval(checkInView, 250);

    //2018-0504 Neerav start
    var checkInLeftViewTimer,
    checkInLeftView = function () {
        var midcontent = $('.LeftNiceScroll:visible'),
            $this, container, hdbarOHeight;

        $(midcontent).each(function (index, obj) {
            $this = $(this);

            if ($this.closest('div.PopupDiv').length == 0) {
                container = $this.closest('div.container');
                hdbarOHeight = container.find('.hdbar').is(':visible') && $('.hdbar:visible').outerHeight() || 0;

                niceScroll($this, hdbarOHeight);
            }
        });
        if ($('.OL:visible').length > 0) {
            if ($('.LeftNiceScroll').getNiceScroll() != undefined && $('.LeftNiceScroll').getNiceScroll()[0] != undefined)
                $('.LeftNiceScroll').getNiceScroll()[0].locked = true;
        } else {
            if ($('.LeftNiceScroll').getNiceScroll() != undefined && $('.LeftNiceScroll').getNiceScroll()[0] != undefined)
                $('.LeftNiceScroll').getNiceScroll()[0].locked = false;
        }
    };

    checkInLeftViewTimer = setInterval(checkInLeftView, 250);
    //2018-0504 Neerav End


    //2018-0713 Neerav start
    var checkInViewNewTimer,
    checkInViewNew = function () {
        var midcontent = $('.midcontentNew:visible'),
            $this, container, hdbarOHeight;

        $(midcontent).each(function (index, obj) {
            $this = $(this);

            if (typeof $this.closest('div.PopupDiv') == 'undefined' || $this.closest('div.PopupDiv') == null || $this.closest('div.PopupDiv').length == 0) {
                container = $this.closest('div.container');
                hdbarOHeight = container.find('.hdbar').is(':visible') && $('.hdbar:visible').outerHeight() || 0;

                niceScrollNew($this, hdbarOHeight);
            }
        });
    };

    checkInViewNewTimer = setInterval(checkInViewNew, 250);
    //2018-0713 Neerav End


    GetIniSetting_Feature();
})

var niceScrollNew = function (midcontent, hdbar) {
    onloadNew();
    var divContent = $(".div-content:visible"), newHeight, oldHeight,
        content = divContent.height() || 0,
        padding = (parseInt(midcontent.css('padding-top'), 10) + parseInt(midcontent.css('padding-bottom'), 10)) || 0,
        margin = (parseInt(midcontent.css('margin-top'), 10) + parseInt(midcontent.css('margin-bottom'), 10)) || 0,
        border = (parseInt(midcontent.css('border-top-width'), 10) + parseInt(midcontent.css('border-bottom-width'), 10)) || 0;
    var divNewMVCHeaderHeight = 0;

    var divDashLeft = $(".divDashLeft:visible");
    if (typeof divDashLeft != 'undefined')
        divDashLeft.height(divContent.height());

    var divDashRight = $(".divDashRight:visible");
    if (typeof divDashRight != 'undefined') {
        divDashRight.height(divContent.height());
    }

    var divNewMVCHeader = $(".new-mvc-header:visible");
    if (typeof divNewMVCHeader != 'undefined') {
        divNewMVCHeaderHeight = divNewMVCHeader.height() || 0;
    }

    if (typeof midcontent != undefined) {

        oldHeight = midcontent.height();
        newHeight = content - hdbar - padding - margin - border - divNewMVCHeaderHeight;

        (oldHeight != newHeight) && midcontent.height(newHeight);

        var divMainOuterBg = $(".content-bg:visible");
        if (typeof divMainOuterBg != 'undefined') {

            divMainOuterBg.height(divContent.height());

            var divMainOuterBgWidth = divMainOuterBg.width() || 0;

            if (divMainOuterBgWidth > 100) {

                var divPadding = 0,
                divMargin = 0,
                divBorder = 0;

                divPadding = (parseInt(midcontent.css('padding-left'), 10) + parseInt(midcontent.css('padding-right'), 10)) || 0;
                divMargin = (parseInt(midcontent.css('margin-left'), 10) + parseInt(midcontent.css('margin-right'), 10)) || 0;
                divBorder = (parseInt(midcontent.css('border-left-width'), 10) + parseInt(midcontent.css('border-right-width'), 10)) || 0;

                midcontent.width(divMainOuterBgWidth - divPadding - divMargin - divBorder);

                if (typeof divNewMVCHeader != 'undefined') {

                    divPadding = 0;
                    divMargin = 0;
                    divBorder = 0;

                    divPadding = (parseInt(divNewMVCHeader.css('padding-left'), 10) + parseInt(divNewMVCHeader.css('padding-right'), 10)) || 0;
                    divMargin = (parseInt(divNewMVCHeader.css('margin-left'), 10) + parseInt(divNewMVCHeader.css('margin-right'), 10)) || 0;
                    divBorder = (parseInt(divNewMVCHeader.css('border-left-width'), 10) + parseInt(divNewMVCHeader.css('border-right-width'), 10)) || 0;

                    divNewMVCHeader.width(divMainOuterBgWidth - divPadding - divMargin - divBorder);
                }
            }

        }

    }
}

var onloadNew = function () {
    var divContent = $(".div-content:visible"), newHeight, oldHeight,
        $this, container, menuHeader, padding, margin, border;

    $(divContent).each(function (index, obj) {
        $this = $(this);

        if (typeof $this.closest('div.PopupDiv') == 'undefined' || $this.closest('div.PopupDiv') == null || $this.closest('div.PopupDiv').length == 0) {
            container = $this.closest('div.container');
            menuHeader = container.find(".menu-header:visible");
            padding = (parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10)) || 0;
            margin = (parseInt($this.css('margin-top'), 10) + parseInt($this.css('margin-bottom'), 10)) || 0;
            border = (parseInt($this.css('border-top-width'), 10) + parseInt($this.css('border-bottom-width'), 10)) || 0;

            oldHeight = $this.height();
            newHeight = container.height() - menuHeader.outerHeight() - padding - margin - border;

            (oldHeight != newHeight) && $this.height(newHeight);
        }
    });
}

function ApplyDatePicker() {
    $(".datepick").datepicker({
        dateFormat: "dd-M-y",
        defaultDate: '',
        showOn: "button",
        buttonImage: strSiteURL + "Content/images/ol_down.png",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
}

function selectFile(name, fileName) {
    var control = $(name);
    control.off('change');
    control.change(function (evt) {
        $('#' + fileName).text(control.val().split('\\').pop());
    });
    control.trigger('click');
}

function Ticket_List(strURL, siteURL) {
    window.open(window.location.protocol + "//" + siteURL + "Tickets/" + strURL, null, 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=550,height=500,left=0,top=0');
}

function Help(strURL, siteURL) {

    arrayURL = strURL.toString().split("~");
    strURL = arrayURL[0];

    var option = "";

    if (arrayURL.length > 1)
        option = arrayURL[1];

    if (option == "VIDEO-HELP")
        window.open("http://web2.its4abi.com/ITSAttachments/Video/help/" + strURL, null, 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=550,height=500,left=0,top=0');
    else
        window.open(window.location.protocol + "//" + siteURL + "Help/" + strURL, null, 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=550,height=500,left=0,top=0');
}

function EnableDisableControl(ControlId, IsDisable) {

    if (IsDisable == true) {
        $('#' + ControlId).addClass('disablebuttons');
        $('#' + ControlId).prop('disabled', true);
    }
    else {
        $('#' + ControlId).removeClass('disablebuttons');
        $('#' + ControlId).prop('disabled', false);
    }
}

function RemoveSpcialCharacters(inputString) {
    return inputString.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g, '');
}

function ValidateTimeHHMM(time) {
    return /^([01]\d|2[0-3])?([0-5]\d)$/.test(time);
}


var targArea = document;
targArea.addEventListener('keydown', reportKeyEvent);

function reportKeyEvent(zEvent) {
    var reportStr =
        "The " +
        (zEvent.ctrlKey ? "Control " : "") +
        (zEvent.shiftKey ? "Shift " : "") +
        (zEvent.altKey ? "Alt " : "") +
        (zEvent.metaKey ? "Meta " : "") +
        zEvent.keyCode + " " +
        "key was pressed."
    ;
    //$("#statusReport").text(reportStr);

    //--- Was a Ctrl-Alt-E combo pressed?
    if (zEvent.ctrlKey && zEvent.altKey && zEvent.keyCode === 86) {
        jAlert("ITS \n" + "Version: " + common.Sys.Version + "\n" + "Tel:" + common.Sys.ITS_TEL, "ITS");
        //alert();
    }
    zEvent.stopPropagation();
    //zEvent.preventDefault()
}

/*
Function Name: IsEnableDatePicker
Created Date: 2017-1122 
Created By: Neerav Trivedi
Comments:
        /// <summary>
        /// To Enable Disable DatePicker
        /// </summary>
        /// <param name="vControlId">DatePicker control id</param>        
        /// <param name="b">true for enable, false for disable</param>        
        /// <returns></returns>
*/
function IsEnableDatePicker(vControlId, b) {

    if (typeof vControlId != 'undefined' && !IsBlank(vControlId) && $('#' + vControlId).length > 0) {

        if (typeof b == 'undefined')
            b = true;

        if (b) {

            $('#' + vControlId).prop('disabled', false);
            $('#' + vControlId).removeClass('disable-pointer-events');

            var downArrowDiv = $('#' + vControlId).closest('.editableControl').find('.ui-datepicker-trigger');

            if (typeof downArrowDiv != 'undefined')
                downArrowDiv.removeClass('disable-pointer-events');

        } else {

            $('#' + vControlId).prop('disabled', true);
            $('#' + vControlId).addClass('disable-pointer-events');

            var downArrowDiv = $('#' + vControlId).closest('.editableControl').find('.ui-datepicker-trigger');

            if (typeof downArrowDiv != 'undefined')
                downArrowDiv.addClass('disable-pointer-events');

        }
    }
}

//To bind TextBox Control into Grid
function GetTextBoxControl(strControlId, strMaxLength, strWidth, strClass) {
    try {

        var strContentSystem = '';

        if (typeof strClass == 'undefined' && !IsBlank(strClass))
            strClass = "";

        if (typeof strWidth == 'undefined' && !IsNumeric(strWidth))
            strWidth = 120;

        strContentSystem += '<input class=\"' + strClass + '\" id=\"' + strControlId + '\" name=\"' + strControlId + '\"';

        if (typeof strMaxLength != 'undefined' && IsNumeric(strMaxLength))
            strContentSystem += ' maxlength=\"' + strMaxLength + '\"';

        strContentSystem += 'style=\"height:19px; margin-left: -2px !important; width: ' + strWidth + 'px; font-size:18px; text-align:left;\" type=\"text\" >';
        return strContentSystem;
    }
    catch (e) { }
}

//To bind OpenList Control into Grid
function GetOpenListBindedControl(strControlId, strType, strWidth, strTitle, strDataFun, strDataValidation, strClass, strPopupWidth) {
    try {
        var strContentSystem = '';

        if (typeof strWidth == 'undefined' || IsBlank(strWidth))
            strWidth = '100';

        if (typeof strTitle == 'undefined')
            strTitle = '';

        if (typeof strDataValidation == 'undefined')
            strDataValidation = '';

        if (typeof strDataValidation == 'undefined')
            strDataValidation = '';

        if (typeof strClass == 'undefined')
            strClass = '';

        if (typeof strPopupWidth == 'undefined')
            strPopupWidth = '300';

        switch (strType) {

            case "1":  //Static OL
                strContentSystem = '<div><div style=\"width:' + strWidth + 'px\" class=\"ol-input-div\">';
                strContentSystem += '<input type="text" style="padding-left: 2px !important; margin-left: -2px !important;" class=\"form-control Openlist-input font-bold ' + strClass + ' uppercase ITSControl OpenListUL\" id=\"' + strControlId + '\" name=\"' + strControlId + '\" popupwidth=\"' + strPopupWidth + '\" title=\"' + strTitle + '\" popupheight=\"200\" data-customValidatOn=\"' + strDataValidation + '\">';
                strContentSystem += '</div>';
                strContentSystem += '<div class="\ol-icon-div spnDown\"><img src="' + Util.GetImageURL("Content/images/ol_down.png") + '"></div>';
                strContentSystem += '</div>';
                break;

            case "2":  //Dynamic OL
                if (typeof strDataFun == 'undefined')
                    strDataFun = '';

                strContentSystem = '<div><div style=\"width:' + strWidth + 'px\" class=\"ol-input-div\">';
                strContentSystem += '<input type="text" style="padding-left: 2px !important; margin-left: -2px !important;" class=\"form-control Openlist-input font-bold ' + strClass + ' uppercase ITSControl OpenListUL ULScroll\" id=\"' + strControlId + '\" name=\"' + strControlId + '\" popupwidth=\"' + strPopupWidth + '\" title=\"' + strTitle + '\" popupheight=\"200\" data-functionparams=\"' + strDataFun + '\" data-customValidatOn=\"' + strDataValidation + '\">';
                strContentSystem += '</div>';
                strContentSystem += '<div class="\ol-icon-div spnDown\"><img src="' + Util.GetImageURL("Content/images/ol_down.png") + '"></div>';
                strContentSystem += '</div>';
                break;

            default:
                break;
        }
        return strContentSystem;
    }
    catch (e) { }
}

//2018-0427 Rupesh
//Bind Date Picker Control into grid
//======================================Rupesh Start=====================================================//
function OpenGridControlDatePicker(ele) {
    try {
        if ($(ele).closest('td').parent().text().toUpperCase().indexOf('DATE') != -1) {
            $(ele).datepicker({
                dateFormat: "dd-M-y",
                defaultDate: '',
                showOn: "button",
                buttonImage: strSiteURL + "/Content/images/ol_down.png",
                buttonImageOnly: true,
                buttonText: "Select date",
                onSelect: function (dateText, inst) {
                    $(this).closest("input").focus();
                }
            });

            if ($(ele).hasClass("inputwithborder")) {
                $(ele).removeClass("inputwithborder").addClass("inputnoborder");
            }
        }
        else {
            if ($(ele).parent().find('input[type=text]') == true)
                $(ele).parent().find('input[type=text]').show();
        }
    }
    catch (e) {
        console.log('Error Occured at : common.js - OpenGridControlDatePicker')
    }
}

function GetDatePickerBindedControl(strControlId, strClass) {
    try {

        if (typeof strControlId == 'undefined')
            strControlId = "";

        if (typeof strClass == 'undefined')
            strClass = "";

        var strHeight = "16px";

        if (typeof strClass != 'undefined' && strClass == "inputwithborder")
            strHeight = "19px";

        var strContentSystem = '';

        strContentSystem += '<input class=\"' + strClass + '\" id=\"' + strControlId + '\" name=\"' + strControlId + '\" onfocus=\"OpenGridControlDatePicker(this)\"';
        strContentSystem += 'style=\"height:' + strHeight + '; width: 85px; font-size:18px; text-align:left; padding-left: 2px !important; margin-left: -2px !important;\" type=\"text\" >';
        return strContentSystem;
    }
    catch (e) {
        console.log('Error Occured at : common.js - GetDatePickerBindedControl');
    }
}

//======================================Rupesh End=====================================================//

//2018-0425 Neerav
function StrToSQL(strData, iOPT) {

    if (typeof iOPT == 'undefined')
        iOPT = 0;

    var m_strEQ_TO_SQL = "!^*^";
    var m_strLF_R_TO_SQL = "!^*!";
    var m_strLF_RN_TO_SQL = "!^^!";
    var m_strLF_R = "\r";
    var m_strLF_RN = "\r\n";
    var m_strEQ = "=";

    var strRet = "";

    try {
        strRet = strData.replace('/' + m_strEQ + '/g', m_strEQ_TO_SQL);
        strRet = strRet.replace('/' + m_strLF_RN + '/g', m_strLF_RN_TO_SQL);
        strRet = strRet.replace('/' + m_strLF_R + '/g', m_strLF_R_TO_SQL);
        strRet = strRet.replace("'", "''");
        return strRet;
    }
    catch (e) {
        console.log('Error occured at : common.js - StrToSQL');
        return "";
    }
}

//2018-05-08 JAY
//Create & Download File
// Function to download data to a file
function CreateAndDownloadFile(data, filename, filetype) {
    try {

        if (typeof data == 'undefined')
            data = "";

        if (typeof filename == 'undefined')
            filename = "";

        if (typeof filetype == 'undefined')
            filetype = "";

        var file = new Blob([data], { type: filetype });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    catch (e) {
        console.log('Error occurred at : CreateAndDownloadFile == ' + e.toString());
    }
}

//To bind Dropdown Control into Grid
function GetComboListBindedControl(strControlId, strArr, strWidth, selectedVal, onChangeEvent) {
    try {
        var strContentSystem = '';

        if (typeof selectedVal == "undefined")
            selectedVal = "";

        if (typeof strWidth == 'undefined' || IsBlank(strWidth))
            strWidth = '100';

        strContentSystem = '<select class=\"custom-select ITSControl allowlowercase \" id="' + strControlId + '" name="' + strControlId + '" style=\" width: ' + strWidth + 'px; height: 25px !important ; vertical-align: top !important\" ';

        if (typeof onChangeEvent != 'undefined') {
            strContentSystem += 'onchange="' + onChangeEvent + '"';
        }

        strContentSystem += '>';

        if (typeof strArr != 'undefined' && strArr.length > 0) {
            for (var i = 0; i < strArr.length; i++) {
                if (selectedVal == strArr[i].strCOL01)
                    strContentSystem += ('<option value=\"' + strArr[i].strCOL01 + '\" selected>' + strArr[i].strCOL02 + '</option>');
                else
                    strContentSystem += ('<option value=\"' + strArr[i].strCOL01 + '\" >' + strArr[i].strCOL02 + '</option>');

            }
        }

        strContentSystem += '</select>';
        return strContentSystem;
    }
    catch (e) {
        console.log('Error occurred at : GetComboListBindedControl');
    }
}

//To Bind FTB Control into Grid
function GetFtbBindedControl(strControlId, isReadOnly, strClass, strWidth, strHeight, strMaxLength, strMaxCharPerLine) {
    try {
        if (typeof isReadOnly == 'undefined' || isReadOnly != true)
            isReadOnly = false;

        if (typeof strClass == 'undefined')
            strClass = "";


        if (typeof strWidth == 'undefined')
            strWidth = "250";

        if (typeof strHeight == 'undefined')
            strHeight = "50";

        var strContentSystem = '';

        strContentSystem += '<textarea  id="' + strControlId + '" data-type="freetextbox" class = "' + strClass + '" style="width: ' + strWidth + 'px; height: ' + strHeight + 'px;"';

        if (typeof strMaxLength != 'undefined')
            strContentSystem += 'maxlength = "' + strMaxLength + '"';

        if (isReadOnly)
            strContentSystem += 'readonly = "readonly"';

        strContentSystem += '/>';

        if (typeof strMaxLength != 'undefined' && !IsBlank(strMaxLength) && typeof strMaxCharPerLine != 'undefined' && !IsBlank(strMaxCharPerLine)) {
            strContentSystem += '\r\n<script type="text/javascript">\r\njQuery(function(){ $("#' + strControlId + '")' +
           '.ready(function(evt){TextArea({ "MaxCharPerLine":' + strMaxCharPerLine + ',"txtid":"' + strControlId + '", "ML":' + strMaxLength + ',"TV" : "freetextbox","E" : "1"})})' +
           '.bind("paste",function(evt){TextArea({ "MaxCharPerLine":' + strMaxCharPerLine + ',"txtid":"' + strControlId + '", "ML":' + strMaxLength + ',"E" : "2"})})' +
           '.on("input foucs",function(evt){TextArea({ "MaxCharPerLine":' + strMaxCharPerLine + ',"txtid":"' + strControlId + '", "ML":' + strMaxLength + ',"E" : "3"})})})\r\n</script>\r\n';
        }

        return strContentSystem;
    }
    catch (e) {
        console.log('Error occurred at : GetFtbBindedControl');
        return "";
    }
}

var exportToExcelGridData = function (g, isjqGrid) {
    try {
        if (typeof isjqGrid == 'undefined' || !isjqGrid == true) {
            isjqGrid = false;
        }
        var tblHeader = {}, tblContent = {};
        contextMenu = {
            N: "Export To Excel",
            U: "/ITSWebMVC/Common/ExportExcel",
            Fn: "exportToExcel",
            D: 0,
            V: 1
        };

        if (isjqGrid) {
            tblHeader = g.find(".ui-jqgrid-hbox > table");
            tblContent = g.find(".ui-jqgrid-bdiv table");

            g.find("td").html(function (i, html) {
                return html.replace(/&nbsp;/g, '');
            });

        } else {
            tblHeader = g.find('.its-header > table');
            tblContent = g.find('.its-content > table');
        }



        var headers = [];
        var params = {};

        tblHeader.filter(':visible').find('th').each(function () {
            if ($(this).css('display') != 'none')
                headers[headers.length] = $(this).text().trim();
        });

        var content = tblContent.table2CSV({
            delivery: 'value',
            header: headers
        });

        params['content'] = content;
        downloadCSV(contextMenu.U, params);
    }
    catch (e) {

    }
}

var downloadCSV = function (url, data, method) {
    try {
        if (url && data) {
            data = (typeof data == 'string' ? data : $.param(data));
            var inputs = '';

            $.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="' + pair[0] + '"  value="' + pair[1] + '" />';
            });
            $('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body').submit().remove();
        }
    }
    catch (e) {
    }
}

//2018-07-13 HD
$("iframe").ready(function () {
    try {
        var versionHTML = '<li class="vesion" style="right: 0;display: inline-block;"><label style="font-size: 12px;top: 10px;right: 10px;position: fixed; font-weight:bold;">' + common.Sys.Version + '</label></li>';
        if ($("div > ul.menu-header li.version").length <= 0) {
            $("div > ul.menu-header").append(versionHTML);
        }
    } catch (e) {
    }
});
