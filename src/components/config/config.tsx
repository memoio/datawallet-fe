
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const API_URL = {
    "CREATE_DID": BACKEND_URL + "/did/createadmin",
    "GET_DID_INFO": BACKEND_URL + "/did/info",

    "DOMAIN_BIND": BACKEND_URL + "/domain/bind",
    "DOMAIN_RENEWAL": BACKEND_URL + "/domain/renewal",
}