const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let totalPages = 8;
let numberOfElements = 32;

let table = [
  {
    Nome: "gulia",
    Cognome: "bianchi",
    Username: "gbianchi",
    "Codice Fiscale": "TRAMR98L07G453S",
    Email: "test@test.it",
    id: 1,
  },
  {
    Nome: "luigi",
    Cognome: "verdi",
    Username: "lverdi",
    "Codice Fiscale": "TRAMR98L07G4678S",
    Email: "test@test.it",
    id: 2,
  },
  {
    Nome: "mario",
    Cognome: "rossi",
    Username: "mrossi",
    "Codice Fiscale": "YTRVBG98L07G453S",
    Email: "test@test.it",
    id: 24,
  },
];
let table2 = [
  {
    Nome: "gulia",
    Cognome: "bianchi",
    Username: "inequi",
    Usernameciao: "hahahaha",
    "Codice Fiscale": "TRAMR98L07G453S",
    Email: "test@test.it",
    id: 1,
  },
  {
    Nome: "luigitetst",
    Cognome: "verdi",
    Username: "lverdi",
    Usernameciao: "testlverdi",
    "Codice Fiscale": "TRAMR98L07G4678S",
    Email: "test@test.it",
    id: 2,
  },
  {
    Nome: "mario",
    Cognome: "rossi",
    Username: "mrossi",
    Usernameciao: "testmrossi",
    "Codice Fiscale": "YTRVBG98L07G453S",
    Email: "test@test.it",
    id: 24,
  },
  {
    Nome: "test",
    Cognome: "verdi",
    Username: "lverdi",
    Usernameciao: "testlverdi",
    "Codice Fiscale": "TRAMR98L07G4678S",
    Email: "test@test.it",
    id: 12,
  },
];

let formExample = {
  content: [
    {
      username: "luigi",
      status: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 0,
  sort: null,
  numberOfElements: 4,
  empty: false,
};

let formExample2 = {
  content: [
    {
      username: "luigi test",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 1,
  sort: null,
  numberOfElements: 4,
  empty: false,
};
let formExample3 = {
  content: [
    {
      username: "luigi test 3",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 2,
  sort: null,
  numberOfElements: 4,
  empty: false,
};
let formExample5 = {
  content: [
    {
      username: "luigi test 5",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 4,
  sort: null,
  numberOfElements: 4,
  empty: false,
};
let formExample6 = {
  content: [
    {
      username: "luigi test 5",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 5,
  sort: null,
  numberOfElements: 4,
  empty: false,
};
let formExample8 = {
  content: [
    {
      username: "luigi test 5",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 7,
  sort: null,
  numberOfElements: 4,
  empty: false,
};
let formExample7 = {
  content: [
    {
      username: "luigi test 7",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 6,
  sort: null,
  numberOfElements: 4,
  empty: false,
};
let formExample4 = {
  content: [
    {
      username: "luigi test 4",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "fdd17dd8-9eed-4681-91be-13ead178a865",
    },
    {
      username: "marco",
      enabled: true,

      attributes: {
        _sede: ["genova"],
      },
      _id: "1931af5c-6b3c-4798-948b-4bd9f3ab98f3",
    },
    {
      username: "mario",
      enabled: true,

      attributes: {
        _sede: ["roma"],
      },
      _id: "7febf772-16be-43e9-8522-e9ff0d21cb2f",
    },
    {
      username: "paolo",
      enabled: true,

      attributes: {
        _sede: ["chieti"],
      },
      _id: "aefafa2d-0cb9-437d-9458-cf8f133ec6ba",
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: totalPages,
  totalElements: numberOfElements,
  first: true,
  size: 4,
  number: 3,
  sort: null,
  numberOfElements: 4,
  empty: false,
};

const form = [
  {
    id: "firstName",
    label: "Nome",
    validator: {
      type: "TEXT",
      controls: [],
    },
    required: true,
    value: "test",
    disabled: false,
  },
  {
    id: "csurname",
    label: "Cognome",
    validator: {
      type: "TEXT",
      controls: [],
    },
    required: false,
    value: "",
    disabled: false,
  },
  {
    id: "fiscalCode",
    label: "Codice Fiscale",
    validator: {
      type: "TEXT",
      controls: [],
    },
    required: false,
    value: "",
    disabled: false,
  },
  {
    id: "username",
    label: "Username",
    validator: {
      type: "TEXT",
      controls: [],
    },
    required: false,
    value: "",
    disabled: false,
  },
  {
    id: "email",
    label: "E-mail",
    validator: {
      type: "TEXT",
      controls: [],
    },
    required: true,
    value: "",
    disabled: false,
  },
  {
    id: "test",
    label: "test",
    validator: {
      type: "TEXT",
      controls: [],
    },
    required: true,
    value: "",
    disabled: false,
  },
  {
    id: "sede",
    label: "Sede",
    validator: {
      type: "TEXT",
      controls: [],
    },
    options: ["test1", "test2"],
    required: true,
    value: "",
    disabled: false,
  },
];

let values = {
  id: "7febf772-17be-43e9-8522-e9ff0d21cb2f",
  createdTimestamp: 1712132020851,
  username: "alessandro",
  enabled: true,
  totp: false,
  emailVerified: true,
  firstName: "Alessandro",
  lastName: "Di Stefano",
  email: "alessandro@leonardo.com",
  attributes: {
    sede: ["milano"],
    test: ["ciao"],
  },
  disableableCredentialTypes: [],
  requiredActions: [],
  notBefore: 0,
  access: {
    manageGroupMembership: true,
    view: true,
    mapRoles: true,
    impersonate: true,
    manage: true,
  },
};

const registrationForm = {
  userAttributesMetadata: [
    {
      name: "username",
      required: true,
      label: "username",
      disabled: true,
      validator: {
        type: "TEXT",
        controls: [".{3,255}"],
      },
      value: "",
    },
    {
      name: "email",
      required: false,
      label: "email",
      disabled: false,
      validator: {
        type: "TEXT",
        controls: [
          ".{0,255}",
          "(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
        ],
      },
      value: "",
    },
    {
      name: "firstName",
      required: true,
      label: "nome",
      disabled: false,
      validator: {
        type: "TEXT",
        controls: [".{0,255}"],
      },
      value: "",
    },
    {
      name: "lastName",
      required: false,
      label: "cognome",
      disabled: false,
      validator: {
        type: "TEXT",
        controls: [".{0,255}"],
      },
      value: "",
    },
    {
      name: "sede",
      required: true,
      label: "sede",
      disabled: false,
      validator: {
        type: "TEXT",
        controls: [],
      },
      value: "",
    },
    {
      name: "date",
      required: false,
      label: "date",
      disabled: false,
      validator: {
        type: "DATE",
      },
      value: "",
    },
    {
      name: "opti",
      required: false,
      label: "options",
      disabled: false,
      validator: {
        type: "SELECT",
        options: ["prova1", "prova2"],
      },
      value: "",
    },
    {
      name: "regex",
      required: false,
      label: "regex",
      disabled: false,
      validator: {
        type: "TEXT",
        controls: [
          "(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
        ],
      },
      value: "",
    },
  ],
};

app.use(cors());
app.use(express.json());

app.get("/table", (req, res) => {
  // setTimeout(() => {
  res.json(formExample);

  // }, 2000);
});
app.get("/registrationForm", (req, res) => {
  // setTimeout(() => {
  res.json(registrationForm);

  // }, 2000);
});

app.get("/chieti", (req, res) => {
  res.json({ value: "test da chieti" });
});
app.get("/roma", (req, res) => {
  res.json({ value: "test da roma" });
});

app.get("/notAuth", (req, res) => {
  res.status(401);
  res.send("hey");
});
app.get("/users/:id", (req, res) => {
  res.status(200);
  res.json(values);
});
app.get("/users", (req, res) => {
  formExample.number = req.query.page;
  if (req.query.page == 0) {
    res.json(formExample);
    return;
  }
  if (req.query.page == 1) {
    res.json(formExample2);
    return;
  }
  if (req.query.page == 2) {
    res.json(formExample3);
    return;
  }
  if (req.query.page == 3) {
    res.json(formExample4);
    return;
  }
  if (req.query.page == 4) {
    res.json(formExample5);
    return;
  }
  if (req.query.page == 5) {
    res.json(formExample6);
    return;
  }
  if (req.query.page == 6) {
    res.json(formExample7);
    return;
  }
  res.json(formExample8);
});
app.post("/form", (req, res) => {
  //setTimeout(() => {
  // const queryParams = req.query;
  // formExample.number = queryParams.page
  res.json(formExample);

  //}, 2000);
  console.log(req.body);
});
app.get("/users/profile/metadata/", (req, res) => {
  // setTimeout(() => {
  res.json(form);

  // }, 2000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
