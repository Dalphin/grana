var themeURL = $("#themeURL").attr("value") || "";
var uploadAttachFile;
var deleteFile;
var downloadFile;
var populateFile;
typeof(user_firstname) === "undefined" && (user_firstname=null);
typeof(user_lastname) === "undefined" && (user_lastname=null);



$(document).on('click','.link-suivi,.btn_reset,#attach-popup .close',function(){
    $('#attach-popup').modal('hide');
    $("#attach-popup .layer_import").addClass('hide');
});


var isAttachClicked = false;
$(document).on('click', '.doc-attach', function(event) {
    if (!isAttachClicked) {
        isAttachClicked = true;
        showAllDocuments(populateFile);
    }
});



function showAllDocuments(populateFile){
    showLoader();
    $.ajax({
        url: populateFile,
        complete: function (response) {
            hideLoader();
            var responseText = JSON.parse(response.responseText);
            var data = responseText.data;
            var availSpace = responseText.avbleSize;
            $(".available-space").text(availSpace);
            //Create element on click of tab
            //Construct Document Element Starts
            for(var i=0; i< data.length; i++){
                var fileName = data[i].fileName;
                displayFileName = convertFileName(fileName);
                var fileType= fileName.split(".")[1];
                var fileSize = data[i].fileSize;
                var upContainer = $('.liste_pieces');
                var upLoadDate = data[i].upLoadDate;
                var downloadUrl = data[i].url;
                var uploadFile = '<div class="piece full" data-fileid="'+data[i].fileId+'"><span style="left: 10px; top: 10px; position: absolute;">'+fileSize+'</span><a class="delete-file dz-remove" href="javascript:undefined;" data-dz-remove=""></a><a href="#">';
                /*Switch case for file format check*/

                switch (fileType)
                {
                    case "png":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                        break;
                    case "jpg":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                        break;
                    case "gif":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                        break;
                    case "tiff":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                        break;
                    case "bmp":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                        break;
                    case "docx":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                        break;
                    case "doc":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                        break;
                    case "docm":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                        break;
                    case "txt":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_txt.svg">';
                        break;
                    case "xls":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                        break;
                    case "csv":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                        break;
                    case "xlsx":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                        break;
                    case "xlsm":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                        break;
                    case "xltx":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                        break;
                    case "xltm":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                        break;
                    case "pdf":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_pdf.svg">';
                        break;
                    case "exe":
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_exe.svg">';
                        break;
                    default:
                        uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                }
                /*Switch case for file format check*/
                uploadFile += '</a><div class="filename"><a data-name="'+fileName+'"class="contributorFileName" href="'+downloadFile+"&url=" + downloadUrl+'">'+displayFileName+' </a> </div> Ajouté le '+upLoadDate +' par<br>'+user_lastname+" "+user_firstname+'</div>';

                upContainer.append(uploadFile);
            }
            //formData.append("step", "upload"); // Append all the additional input data of your form here!
            //formData.append("id", "1"); // Append all the additional input data of your form here!
            //Construct Document Element Starts
            //Create element on click of tab
        },
        error: function () {
            hideLoader();
            return;
        },
    });
}



$(document).on('click', '.dropzone-desc, .dropimage', function () {
    $("#DropZoneFiddle").trigger('click');
});
$(document).on('click', '.delete-file', function(){
    var selectedId = $(this).parents(".piece.full").attr("data-fileid");
    var fileName = $(this).parents(".piece.full").find(".contributorFileName").attr("data-name");
    var currentElement = $(this).parent();
    $(".confirm-file").text(fileName);
    $('.confirm-delete').attr("data-id",selectedId);
    $('#attach-popup').modal('show');
    $('.del-cancel').removeClass("hide");
});
$(document).on('click','.confirm-delete',function(){
    var deleteFileUrl = deleteFile;
    var fileToDeleteId = $(this).attr("data-id");
    docDelete(deleteFileUrl,fileToDeleteId);
    $(".del-cancel").removeClass('hide');
});

function docDelete(deleteFileUrl,fileToDeleteId) {
    showLoader();
    $.ajax({
        url: deleteFileUrl+"&fileId=" + fileToDeleteId,
        complete: function (response) {
            var availSpace = JSON.parse(response.responseText);
            availSpace = availSpace.avbleSize || 0;
            $(".available-space").text(availSpace);
            $(".piece.full[data-fileid="+fileToDeleteId+"]").remove();
            $('#attach-popup').modal('hide');
            $(".del-cancel").addClass('hide');
            hideLoader();

        },
        error: function () {
            hideLoader();
            return;
        },
    });
}

function bytesToSize(fileSize) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (fileSize == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(fileSize) / Math.log(1024)));
    return (fileSize / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function convertFileName(fileName){
    var getFileName = fileName.slice(0, fileName.lastIndexOf('.'))  || "";
    if(getFileName.length >= 20){
    	var getExtension = fileName.slice(fileName.lastIndexOf('.'), fileName.length ) || "";
        var fileNameConvert = getFileName.substring(0,17) + "(...)" + getExtension;
        return fileNameConvert;
    }
    return fileName;
}


$(document).ready(function(){
    var newUrl = location.href;
    var updatedUrlVal = newUrl.split("?");
    updatedUrlVal = updatedUrlVal[1].split("&");
    updatedUrlVal = updatedUrlVal[0];

    uploadAttachFile = $("#uploadAttachFile").attr("value") || "";
    deleteFile = $("#deleteFile").attr("value") || "";
    downloadFile = $("#downloadFile").attr("value") || "";
    populateFile = $("#populateFile").attr("value");

    if( newUrl.indexOf('category=card') >= 0 || newUrl.indexOf('category=badge') >= 0 || newUrl.indexOf('category=collab') >= 0 || newUrl.indexOf('category=supplier') >= 0 || newUrl.indexOf('category=invoice') >= 0 || newUrl.indexOf('category=vehicle') >= 0){
        uploadAttachFile = uploadAttachFile + "&" +updatedUrlVal;
        deleteFile = deleteFile + "&" +updatedUrlVal;
        downloadFile = downloadFile + "&" +updatedUrlVal;
        populateFile = populateFile + "&" +updatedUrlVal;
    }


    Dropzone.options.DropZoneFiddle = {
        url: uploadAttachFile,
        paramName: "file", //the parameter name containing the uploaded file
        clickable: true,
        maxFilesize: 50, //in mb
        uploadMultiple: true,
        previewsContainer: null,
        maxFiles: 10, // allowing any more than this will stress a basic php/mysql stack
        addRemoveLinks: true,
        acceptedFiles: '.png,.jpg,.gif,.tiff,.bmp,.docx,.xls,.xlsx,.xlsm,.xltx,.xltm,.txt,.pdf,.csv,.doc,.docm,.log', //allowed filetypes
        dictDefaultMessage: "", //override the default text
        accept: function(file, done) {
        	var fileName = file.name || "";
        	var fileNameLength = fileName.slice(0, fileName.lastIndexOf('.')).length;
        	if (fileNameLength > 50) {
        		$('#attach-popup').modal('show');
        		$(".format-error").removeClass('hide');
        		done("Filename exceeds 50 characters!");
        	}
        	else done();
        },
        init: function(file,response) {
            this.on("sending",function(file){
                           var fileName = file.name || "";
                           var fileNameLength = fileName.slice(0, fileName.lastIndexOf('.')).length;
                           if (fileNameLength > 50) {
                    this.removeFile(file);
                                  $('#attach-popup').modal('show');
                                  $(".format-error").removeClass('hide');
                                  return;
                }
                           else{
                                  showLoader(); 
                           }                
            });
            this.on("complete",function(file,response){
                hideLoader();
                if(file.accepted == true){
                    if(response != undefined){
                        var successObj = JSON.parse(response);
                        var errorCode = successObj.error;
                    } 
                }
                else{
                    $('#attach-popup').modal('show');
                    $(".format-error").removeClass('hide');
                    var _this = this;
                    _this.removeFile(file);

                }

            });
            this.on("success", function(file, response) {
                var successObj;
                //auto remove buttons after upload
                if(response.success  != undefined) successObj = response;
                else if(response.error != undefined) successObj = response;
                else successObj = JSON.parse(response);
                if(successObj.success != undefined){
                    //Construct Document Element Starts
                    var fileType= file.name.split(".")[1];
                    var fileName = file.name;
                    displayFileName = convertFileName(fileName);
                    var fileSize = successObj.fileSize;
                    var availSpace = successObj.availableSpace;
                    var avbleSize = successObj.avbleSize;
                    $(".available-space").text(avbleSize);
                    var upContainer = $('.liste_pieces');
                    var upLoadDate = moment().format('DD/MM/YYYY');
                    var downloadUrl = successObj.url;
                    var uploadFile = '<div class="piece full" data-fileid="'+successObj.fileId+'"><span style="left: 10px; top: 10px; position: absolute;">'+fileSize+'</span><a type="button" class="delete-file dz-remove" href="javascript:undefined;" data-dz-remove=""></a><a href="#">';
                    /*Switch case for file format check*/

                    switch (fileType)
                    {
                        case "png":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                            break;
                        case "jpg":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                            break;
                        case "gif":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                            break;
                        case "tiff":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                            break;
                        case "bmp":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_img.svg">';
                            break;
                        case "docx":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                            break;
                        case "doc":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                            break;
                        case "docm":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                            break;
                        case "txt":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_txt.svg">';
                            break;
                        case "xls":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                            break;
                        case "xlsx":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                            break;
                        case "xlsm":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                            break;
                        case "xltx":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                            break;
                        case "xltm":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                            break;
                        case "csv":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_xls.svg">';
                            break;
                        case "pdf":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_pdf.svg">';
                            break;
                        case "exe":
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_exe.svg">';
                            break;
                        default:
                            uploadFile += '<img src="'+themeURL+'/Content/img/commun/picto_doc.svg">';
                    }
                    /*Switch case for file format check*/
                    uploadFile += '</a><div class="filename"><a data-name="'+fileName+'" class="contributorFileName" href="'+downloadFile+"&url=" + downloadUrl+'">'+displayFileName+' </a> </div> Ajouté le '+upLoadDate +' par<br>'+user_lastname+" "+user_firstname+'</div>';

                    upContainer.append(uploadFile);
                    var _this = this;
                    _this.removeFile(file);
                    // Append all the additional input data of your form here!
                    // Append all the additional input data of your form here!
                    //Construct Document Element Starts
                }
                else{
                    hideLoader();
                    var errorCode = successObj.error;
                    if(errorCode == "NoSpace"){
                        $('#attach-popup').modal('show');
                        $(".no-space").removeClass('hide');
                    }
                    else if(errorCode == "UploadError"){
                        $('#attach-popup').modal('show');
                        $(".max-limit").removeClass('hide');
                    }
                    else{
                        $('#attach-popup').modal('show');
                        $(".format-error").removeClass('hide');
                    }
                    var _this = this;
                    _this.removeFile(file);
                }

            });
        }
    };
});
