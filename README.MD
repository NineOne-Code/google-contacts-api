## Langkah 1: Buat Proyek Google Cloud

1. Masuk ke Google Cloud Console: (Kunjungi Google Cloud Console)[https://console.cloud.google.com].
2. Buat Proyek Baru:
   - Klik ikon proyek di sebelah kiri atas (sebelah logo Google Cloud Platform).
   - Klik tombol "New Project".
   - Masukkan nama proyek Anda dan klik "Create".

## Langkah 2: Aktifkan Google Contacts API

1. Pilih Proyek: Pastikan proyek yang baru Anda buat sedang dipilih.
2. Buka Library API:
   Di menu sebelah kiri, klik "APIs & Services" > "Library".
3. Cari Google People API:
   Ketik "Google People API" di kotak pencarian dan pilih dari hasil pencarian.
4. Aktifkan API:
   Klik tombol "Enable" untuk mengaktifkan Google People API.

## Langkah 3: Buat Kredensial OAuth 2.0

1. Buka Halaman Kredensial:
   - Di menu sebelah kiri, klik "APIs & Services" > "Credentials".
2. Klik Buat Kredensial:
   - Klik tombol "Create Credentials" di bagian atas halaman.
3. Pilih OAuth 2.0 Client ID:
   - Pilih "OAuth client ID" dari daftar dropdown.
4. Konfigurasi Layar Konsent Oauth:
   - Jika ini pertama kali Anda membuat OAuth client ID, Anda akan diminta untuk mengkonfigurasi layar konsent OAuth.
   - Klik "Configure consent screen".
   - Pilih "External" dan klik "Create".
   - Isi informasi yang diminta (nama aplikasi, informasi kontak developer, dll.), lalu klik "Save and Continue" hingga selesai.
5. Pilih Aplikasi Web:
   - Di bagian "Application type", pilih "Web application".
6. Masukkan Nama:
   - Masukkan nama untuk kredensial OAuth Anda (misalnya "Web Client 1").
7. Tambahkan URI Pengalihan:
   - Di bagian "Authorized redirect URIs", tambahkan URI pengalihan yang akan digunakan untuk menerima kode otorisasi. Misalnya: http://localhost:3000/oauth2callback.
   - Klik "Create".

## Langkah 4: Catat Client ID dan Client Secret

1. Lihat Kredensial:
   - Setelah Anda membuat kredensial, Anda akan melihat dialog yang menampilkan Client ID dan Client Secret.
2. Catat Informasi:
   - Catat atau salin Client ID dan Client Secret ini karena Anda akan membutuhkannya untuk mengkonfigurasi aplikasi Anda.

## Langkah 5: Buat Refresh Token dan Access Token

1. Masuk ke Google Auth Playground: (Kunjungi Google Auth Playground)[https://developers.google.com/oauthplayground].
2. Buat Token:
   - Klik tombol `Setting` atau `OAuth 2.0 configuration`.
   - Centang ` Use your own OAuth credentials`.
   - Masukan Client ID dan Client Secret dari Google Cloud Console.
   - Masukan link https://www.googleapis.com/auth/contacts di `Input your scope` lalu klik `Authorize APIs`.
   - Catat atau salin `Refresh Token` dan `Access Token`.
