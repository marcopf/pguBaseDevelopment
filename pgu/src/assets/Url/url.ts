let protocol = 'http';
let domain = 'localhost';
let port = '3000';

const URL = {
    gestione_utenti:{
        CERCA_UTENTI: `${protocol}://${domain}:${port}/users`
    }
}

export default URL;