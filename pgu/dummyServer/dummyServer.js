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
  id: 24
},]
let table2 = [{
  Nome: "gulia",
  Cognome: "bianchi",
  Username: "inequi",
  Usernameciao: "hahahaha",
  "Codice Fiscale": "TRAMR98L07G453S",
  Email: "test@test.it",
  id: 1
},{
  Nome: "luigi",
  Cognome: "verdi",
  Username: "lverdi",
  Usernameciao: "testlverdi",
  "Codice Fiscale": "TRAMR98L07G4678S",
  Email: "test@test.it",
  id: 2
},{
  Nome: "mario",
  Cognome: "rossi",
  Username: "mrossi",
  Usernameciao: "testmrossi",
  "Codice Fiscale": "YTRVBG98L07G453S",
  Email: "test@test.it",
  id: 24
},{
  Nome: "test",
  Cognome: "verdi",
  Username: "lverdi",
  Usernameciao: "testlverdi",
  "Codice Fiscale": "TRAMR98L07G4678S",
  Email: "test@test.it",
  id: 12
}]

const form = [
  {
    id: "cname",
    label: "Nome",
    type: "text",
    size: 6,
    required: true,
    controls: ["^.{3,15}$"],
    value: "",
    disabled: false
  },
  {
    id: "csurname",
    label: "Cognome",
    type: "text",
    size: 6,
    required: false,
    controls: ["^.{3,15}$"],
    value: "",
    disabled: false
  },
  {
    id: "fiscalCode",
    label: "Codice Fiscale",
    type: "text",
    size: 6,
    required: false,
    controls: ["^.{10,15}$"],
    value: "",
    disabled: false
  },
  {
    id: "username",
    label: "Username",
    type: "text",
    size: 6,
    required: false,
    controls: ["^.{3,15}$"],
    value: "",
    disabled: false
  },
  {
    id: "email",
    label: "E-mail",
    type: "text",
    size: 6,
    required: true,
    controls: ["^.{3,15}$"],
    value: "",
    disabled: false
  },
  {
    id: "toggle",
    label: "Numero",
    type: "toggle",
    required: true,
    controls: ["^.{3,15}$"],
    value: "",
    disabled: false
  }

];

app.use(cors());
app.use(express.json());

app.get("/table", (req, res)=>{
  setTimeout(() => {
    res.json(table);
  
  }, 2000);
})



app.post("/form", (req, res)=>{
  setTimeout(() => {
    res.json(table2)

  }, 2000);
  console.log(req.body)
})
app.get("/form", (req, res)=>{
  setTimeout(() => {
    res.json(form);
  
  }, 2000);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  