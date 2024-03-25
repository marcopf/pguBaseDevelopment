const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

let table = [{
  Nome: "gulia",
  Cognome: "bianchi",
  Username: "gbianchi",
  "Codice Fiscale": "TRAMR98L07G453S",
  Email: "test@test.it",
  id: 1
},{
  Nome: "luigi",
  Cognome: "verdi",
  Username: "lverdi",
  "Codice Fiscale": "TRAMR98L07G4678S",
  Email: "test@test.it",
  id: 2
},{
  Nome: "mario",
  Cognome: "rossi",
  Username: "mrossi",
  "Codice Fiscale": "YTRVBG98L07G453S",
  Email: "test@test.it",
  id: 3
},]

app.use(cors());
app.use(express.json());

app.get("/table", (req, res)=>{
  res.json(table);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  