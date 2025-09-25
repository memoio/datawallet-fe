
export const BACKEND_URL = "http://localhost:8080";

export const API_URL = {
    "CREATE_DID": BACKEND_URL + "/did/createadmin",
    "GET_DID_INFO": BACKEND_URL + "/did/info",

    "FILE_UPLOAD": BACKEND_URL + "/file/upload",
    "FILE_DOWNLOAD": BACKEND_URL + "/file/download",
    "FILE_LIST": BACKEND_URL + "/file/list",

    "MFILE_UPLOAD_CREATE": BACKEND_URL + "/mfile/upload/create",
    "MFILE_UPLOAD_CONFIRM": BACKEND_URL + "/mfile/upload/confirm",
    "MFILE_DOWNLOAD": BACKEND_URL + "/mfile/download",
    "MFILE_LIST": BACKEND_URL + "/mfile/list",

    "DOMAIN_BIND": BACKEND_URL + "/domain/bind",
    "DOMAIN_LIST": BACKEND_URL + "/domain/list",
    "DOMAIN_BIND_SIGNMSG": BACKEND_URL + "/domain/bind/signmsg",
    "DOMAIN_AVAILABLE": BACKEND_URL + "/domain/available",
}