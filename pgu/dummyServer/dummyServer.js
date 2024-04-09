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
  Nome: "luigitetst",
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

let formExample = {
  "content": [
      {
          "username": "luigi",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "fdd17dd8-9eed-4681-91be-13ead178a865"
      },
      {
          "username": "marco",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "genova"
              ]
          },
          "_id": "1931af5c-6b3c-4798-948b-4bd9f3ab98f3"
      },
      {
          "username": "mario",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "7febf772-16be-43e9-8522-e9ff0d21cb2f"
      },
      {
          "username": "paolo",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "chieti"
              ]
          },
          "_id": "aefafa2d-0cb9-437d-9458-cf8f133ec6ba"
      }
  ],
  "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "offset": 0,
      "unpaged": false,
      "paged": true
  },
  "last": true,
  "totalPages": 5,
  "totalElements": 18,
  "first": true,
  "size": 4,
  "number": 0,
  "sort": null,
  "numberOfElements": 4,
  "empty": false
}

let formExample2 =  {
  "content": [
      {
          "username": "luigi test",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "fdd17dd8-9eed-4681-91be-13ead178a865"
      },
      {
          "username": "marco",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "genova"
              ]
          },
          "_id": "1931af5c-6b3c-4798-948b-4bd9f3ab98f3"
      },
      {
          "username": "mario",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "7febf772-16be-43e9-8522-e9ff0d21cb2f"
      },
      {
          "username": "paolo",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "chieti"
              ]
          },
          "_id": "aefafa2d-0cb9-437d-9458-cf8f133ec6ba"
      }
  ],
  "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "offset": 0,
      "unpaged": false,
      "paged": true
  },
  "last": true,
  "totalPages": 5,
  "totalElements": 18,
  "first": true,
  "size": 4,
  "number": 1,
  "sort": null,
  "numberOfElements": 4,
  "empty": false
}
let formExample3 =  {
  "content": [
      {
          "username": "luigi test 3",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "fdd17dd8-9eed-4681-91be-13ead178a865"
      },
      {
          "username": "marco",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "genova"
              ]
          },
          "_id": "1931af5c-6b3c-4798-948b-4bd9f3ab98f3"
      },
      {
          "username": "mario",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "7febf772-16be-43e9-8522-e9ff0d21cb2f"
      },
      {
          "username": "paolo",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "chieti"
              ]
          },
          "_id": "aefafa2d-0cb9-437d-9458-cf8f133ec6ba"
      }
  ],
  "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "offset": 0,
      "unpaged": false,
      "paged": true
  },
  "last": true,
  "totalPages": 5,
  "totalElements": 18,
  "first": true,
  "size": 4,
  "number": 2,
  "sort": null,
  "numberOfElements": 4,
  "empty": false
}
let formExample5 =  {
  "content": [
      {
          "username": "luigi test 5",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "fdd17dd8-9eed-4681-91be-13ead178a865"
      },
      {
          "username": "marco",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "genova"
              ]
          },
          "_id": "1931af5c-6b3c-4798-948b-4bd9f3ab98f3"
      },
      {
          "username": "mario",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "7febf772-16be-43e9-8522-e9ff0d21cb2f"
      },
      {
          "username": "paolo",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "chieti"
              ]
          },
          "_id": "aefafa2d-0cb9-437d-9458-cf8f133ec6ba"
      }
  ],
  "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "offset": 0,
      "unpaged": false,
      "paged": true
  },
  "last": true,
  "totalPages": 5,
  "totalElements": 18,
  "first": true,
  "size": 4,
  "number": 4,
  "sort": null,
  "numberOfElements": 4,
  "empty": false
}
let formExample4 =  {
  "content": [
      {
          "username": "luigi test 4",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "fdd17dd8-9eed-4681-91be-13ead178a865"
      },
      {
          "username": "marco",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "genova"
              ]
          },
          "_id": "1931af5c-6b3c-4798-948b-4bd9f3ab98f3"
      },
      {
          "username": "mario",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "roma"
              ]
          },
          "_id": "7febf772-16be-43e9-8522-e9ff0d21cb2f"
      },
      {
          "username": "paolo",
          "enabled": true,
          
          "attributes": {
              "_sede": [
                  "chieti"
              ]
          },
          "_id": "aefafa2d-0cb9-437d-9458-cf8f133ec6ba"
      }
  ],
  "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "offset": 0,
      "unpaged": false,
      "paged": true
  },
  "last": true,
  "totalPages": 5,
  "totalElements": 18,
  "first": true,
  "size": 4,
  "number": 3,
  "sort": null,
  "numberOfElements": 4,
  "empty": false
}

const form = [
  {
    id: "cname",
    label: "Nome",
    type: "text",
    size: 6,
    required: true,
    controls: ["^.{3,15}$"],
    value: "test",
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
    res.json(formExample);

  }, 2000);
})

app.get('/chieti', (req, res)=>{
  res.json({value: "test da chieti"})
})
app.get('/roma', (req, res)=>{
  res.json({value: "test da roma"})
})

app.get('/notAuth', (req, res)=>{
  res.status(401);
  res.send("hey")
})
app.get('/users', (req, res)=>{
  formExample.number = req.query.page
  if (req.query.page == 0){
    res.json(formExample)
    return ;
  } 
  if (req.query.page == 1){
    res.json(formExample2)
    return ;
  } 
  if (req.query.page == 2){
    res.json(formExample3)
    return ;
  } 
  if (req.query.page == 3){
    res.json(formExample4)
    return ;
  } 
  res.json(formExample5)
})
app.post("/form", (req, res)=>{
  //setTimeout(() => {
    // const queryParams = req.query;
    // formExample.number = queryParams.page
    res.json(formExample)

  //}, 2000);
  console.log(req.body)
})
app.get("/form", (req, res)=>{
  //setTimeout(() => {
    res.json(form);

  //}, 2000);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

