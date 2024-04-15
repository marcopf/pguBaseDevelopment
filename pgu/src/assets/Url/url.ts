let protocol = 'http';
let domain = 'localhost';
let port = '4242';

const URL = {
    gestione_utenti:{
        CERCA_UTENTI: `${protocol}://${domain}:${port}/users/`,
        AGGIUNGI_UTENTE: `${protocol}://${domain}:${port}/users/`,
        AGGIUNGI_UTENTE_METADATA: `${protocol}://${domain}:${port}/users/profile/metadata/`,
    },
    dettaglio_utenze:{
        GET_FORM_METADATA: `${protocol}://${domain}:${port}/users/profile/metadata/`,
        GET_USER_DATA: `${protocol}://${domain}:${port}/users/`,
        PUT_UPDATED_USER_DATA: `${protocol}://${domain}:${port}/users/`,
    }
}

export default URL;