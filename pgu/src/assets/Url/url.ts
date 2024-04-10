let protocol = 'http';
let domain = 'localhost';
let port = '3000';

const URL = {
    gestione_utenti:{
        CERCA_UTENTI: `${protocol}://${domain}:${port}/users/`
    },
    dettaglio_utenze:{
        GET_FORM_METADATA: `${protocol}://${domain}:${port}/users/profile/metadata/`,
        GET_USER_DATA: `${protocol}://${domain}:${port}/users/`
    }
}

export default URL;