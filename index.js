var db_name="SCHOOL-DB";
var db_rel="STUDENT-TABLE";
var token="90932768|-31949278698732331|90948497";
var base_url="http://api.login2explore.com:5577";
var iml_url="/api/iml";
var irl_url="/api/irl";

$('#roll').focus();

function getstud(){
    var roll_obj= retrieveroll();
    var getreq= createGET_BY_KEYRequest(token,db_name,db_rel,roll_obj);
    jQuery.ajaxSetup({async:false});
    var execjson=executeCommandAtGivenBaseUrl(getreq,base_url,irl_url);
    jQuery.ajaxSetup({async:true});
    if(execjson.status===400){
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#name').focus();
    }
    else if(execjson.status===200){
        $('#roll').prop('diasbled', true);
        fillData(execjson);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#save').prop('disabled', true);
        $('#name').focus();
    }

}

function saveData(){
    var jsonStrObj= validateData();
    if(jsonStrObj===""){
        return "";
    }
    var putreq= createPUTRequest(token,jsonStrObj,db_name,db_rel);
    jQuery.ajaxSetup({async:false});
    var execjson=executeCommandAtGivenBaseUrl(putreq,base_url,iml_url);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#roll"),focus();
}

function changeData(){
    $("#change").prop("disabled", true);
    var jsonChg= validateData();
    var updatereq= createUPDATERecordRequest(token,jsonChg,db_name,db_rel,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var execjson=executeCommandAtGivenBaseUrl(updatereq,base_url,iml_url);
    jQuery.ajaxSetup({async:true});
    console.log(execjson);
    resetForm();
    $("#roll").focus();
}

function resetForm(){
    $('#roll').val("");
    $('#name').val("");
    $('#clas').val("");
    $('#bday').val("");
    $('#addr').val("");
    $('#enrol').val("");
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reset').prop("disabled",true);

}

function validateData(){
    var roll=$("#roll").val();
    var name=$("#name").val();
    var clas=$("#clas").val();
    var bday=$("#bday").val();
    var addr=$("#addr").val();
    var enrol=$("#enrol").val();

    if(roll===''){
        alert("Enter Roll No.");
        $("#roll").focus();
        return "";
    }
    if(name===''){
        alert("Enter Student Name");
        $("#name").focus();
        return "";
    }
    if(clas===''){
        alert("Enter Class");
        $("#clas").focus();
        return "";
    }
    if(bday===''){
        alert("Enter Birth-Date");
        $("#bday").focus();
        return "";
    }
    if(addr===''){
        alert("Enter Address");
        $("#addr").focus();
        return "";
    }
    if(enrol===''){
        alert("Enter Enrollment");
        $("#enrol").focus();
        return "";
    }

    var jsonStrObj={
        roll: roll,
        name: name,
        clas: clas,
        bday: bday,
        addr: addr,
        enrol: enrol
    };
    return JSON.stringify(jsonStrObj);
}

function retrieveroll(){
    var roll=$("#roll").val();
    return JSON.stringify({roll : roll});
}

function fillData(execjson){
    saveRecNo2LS(execjson);
    var record= JSON.parse(execjson.data).record;
    $('#name').val(record.name)
    $('#clas').val(record.clas)
    $('#bday').val(record.bday)
    $('#addr').val(record.addr)
    $('#enrol').val(record.enrol)

}

function saveRecNo2LS(execjson){
    var lvData=JSON.parse(execjson.data);
    localStorage.setItem('recno',lvData.rec_no);
}