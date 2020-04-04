 function getErrorObj(error) {
     let err_obj = {};
     for (let err_idx in error.details) {
         let err_dtl = error.details[err_idx];
         err_obj[err_dtl["path"]] = err_dtl["message"];
     }
     return err_obj;
 }

 module.exports.getErrorObj = getErrorObj;