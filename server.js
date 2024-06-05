const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const OAuth2 = google.auth.OAuth2;

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Client ID dan Client Secret dari Google Cloud Console
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URL = "http://localhost:3000/oauth2callback";
const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN";

const ACCESS_TOKEN = "YOUR_REFRESH_TOKEN";

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// Dummy data pelanggan
const customers = [
  {
    id: "001",
    nama: "John Doe",
    email: "john.doe@example.com",
    nomor_telepon: "+62123456789",
    alamat: "Jl. Contoh No. 123",
  },
  // Tambahkan data pelanggan lainnya di sini
];

// Endpoint untuk mendapatkan URL otorisasi
app.get("/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/contacts"],
  });
  res.redirect(authUrl);
});

// Endpoint untuk menangani callback OAuth2
app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send("Authentication successful! You can now import contacts.");
});

// Endpoint untuk mengimpor kontak ke Google Contacts
app.get("/import-contacts", async (req, res) => {
  const peopleService = google.people({ version: "v1", auth: oauth2Client });

  for (const customer of customers) {
    const contact = {
      names: [
        {
          givenName: customer.nama.split(" ")[0],
          familyName: customer.nama.split(" ")[1] || "",
        },
      ],
      emailAddresses: [{ value: customer.email }],
      phoneNumbers: [{ value: customer.nomor_telepon }],
      addresses: [
        {
          streetAddress: customer.alamat,
          type: "home",
        },
      ],
    };

    try {
      await peopleService.people.createContact({ requestBody: contact });
    } catch (error) {
      console.error("Error creating contact:", error);
      return res.status(500).send("Error creating contacts");
    }
  }

  res.send("Contacts imported successfully!");
});

// Endpoint untuk mengimpor kontak baru ke Google Contacts
app.post("/add-contact", async (req, res) => {
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
    access_token: ACCESS_TOKEN,
  });

  const { nama, email, nomor_telepon, alamat } = req.body;

  const peopleService = google.people({ version: "v1", auth: oauth2Client });

  const contact = {
    names: [
      { givenName: nama.split(" ")[0], familyName: nama.split(" ")[1] || "" },
    ],
    emailAddresses: [{ value: email }],
    phoneNumbers: [{ value: nomor_telepon }],
    addresses: [
      {
        streetAddress: alamat,
        type: "home",
      },
    ],
  };

  try {
    await peopleService.people.createContact({ requestBody: {} });
    res.status(200).send("Contact added successfully!");
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send("Error creating contact");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
