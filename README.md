# TW-proiect


# Planify – Platformă web pentru organizarea și gestionarea activităților personale și de grup

## 1. Descrierea proiectului

Planify este o platformă web destinată organizării și gestionării activităților personale și de grup. Aplicația urmărește centralizarea mai multor funcționalități organizatorice într-un singur spațiu digital, eliminând necesitatea utilizării mai multor aplicații separate pentru gestionarea sarcinilor, cheltuielilor, evenimentelor și documentelor.

Platforma permite utilizatorilor să creeze grupuri, să partajeze liste de sarcini, să monitorizeze cheltuielile comune, să calculeze balanțele financiare dintre membri și să organizeze evenimente prin intermediul unui calendar comun.

Aplicația va fi accesibilă prin browser și va beneficia de o interfață responsive, adaptată atât pentru desktop, cât și pentru dispozitive mobile.

## 2. Problema abordată

Organizarea activităților comune presupune adesea utilizarea mai multor aplicații pentru notițe, liste, calendare, comunicare și evidența cheltuielilor. Această fragmentare poate conduce la pierderea informațiilor, dificultăți de coordonare și lipsa unei evidențe clare a responsabilităților și contribuțiilor financiare.

Planify își propune să rezolve această problemă prin oferirea unei platforme centralizate, în care membrii unui grup pot colabora și pot avea acces la informațiile comune.

## 3. Obiectivele proiectului

- Centralizarea activităților personale și de grup într-o singură aplicație.
- Facilitarea coordonării sarcinilor și responsabilităților între membrii unui grup.
- Sincronizarea în timp real a listelor partajate.
- Automatizarea calculării cheltuielilor și a balanțelor financiare individuale.
- Simplificarea planificării evenimentelor prin intermediul unui calendar comun.
- Asigurarea unui spațiu comun pentru stocarea și accesarea documentelor.


## 4. Utilizatori vizați

Aplicația se adresează următoarelor categorii de utilizatori:

- Familii care doresc să își organizeze responsabilitățile casnice și cheltuielile comune.
- Grupuri de prieteni care planifică excursii, evenimente sau activități comune.
- Colegi de apartament care doresc să împartă sarcinile și cheltuielile.
- Studenți care organizează activități și proiecte în grup.
- Orice persoane care doresc să își gestioneze mai eficient activitățile cotidiene.

## 5. Funcționalități propuse

### Funcționalități obligatorii

- Înregistrarea și autentificarea utilizatorilor.
- Crearea și administrarea grupurilor.
- Invitarea membrilor într-un grup prin intermediul unui link.
- Crearea și gestionarea listelor de sarcini partajate.
- Atribuirea sarcinilor și stabilirea termenelor-limită.
- Sincronizarea în timp real a modificărilor.
- Înregistrarea cheltuielilor comune.
- Calcularea automată a balanțelor financiare dintre membrii grupului.

### Funcționalități importante

- Calendar comun pentru organizarea evenimentelor și rezervărilor introduse manual.
- Încărcarea și organizarea documentelor pe categorii.
- Accesarea și descărcarea documentelor de către membrii autorizați.

### Funcționalități opționale

- Notificări prin e-mail.
- Alerte pentru sarcini și documente apropiate de termenul-limită.
- Exportarea listelor și a rapoartelor financiare.

## 6. Tehnologii alese

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express.js

**Comunicare în timp real:**
- Socket.IO / WebSocket

**Persistența datelor:**
- PostgreSQL pentru stocarea datelor structurate.
- MinIO pentru stocarea documentelor și fișierelor.

**Autentificare și securitate:**
- JWT pentru autentificarea utilizatorilor.
- bcrypt pentru stocarea securizată a parolelor.

**Versionare și colaborare:**
- Git
- GitHub

## 7. Membrii echipei și responsabilități

Proiectul este realizat de o echipă formată din doi studenți. Responsabilitățile sunt distribuite astfel încât fiecare membru să contribuie la dezvoltarea bazei de date, având totodată responsabilități principale distincte în dezvoltarea frontend-ului și backend-ului.

### Mudure Mara – Frontend și baza de date

- Dezvoltarea interfeței web folosind HTML, CSS și JavaScript.
- Implementarea paginilor de autentificare și înregistrare.
- Dezvoltarea interfeței pentru crearea și gestionarea grupurilor.
- Implementarea interfeței pentru listele și sarcinile partajate.
- Dezvoltarea interfeței pentru gestionarea cheltuielilor și vizualizarea balanțelor financiare.
- Realizarea interfeței calendarului comun și a secțiunii de documente.
- Integrarea frontend-ului cu API-urile backend.
- Participarea la proiectarea structurii bazei de date PostgreSQL.
- Implementarea și testarea interogărilor necesare funcționalităților aplicației.

### Macovei Oana – Backend și baza de date

- Dezvoltarea serverului folosind Node.js și Express.js.
- Implementarea autentificării și autorizării utilizatorilor.
- Crearea API-urilor pentru gestionarea utilizatorilor, grupurilor și sarcinilor.
- Implementarea logicii de gestionare a cheltuielilor și calculare a balanțelor financiare.
- Configurarea comunicării în timp real folosind Socket.IO.
- Integrarea MinIO pentru încărcarea și stocarea documentelor.
- Participarea la proiectarea și implementarea bazei de date PostgreSQL.
- Dezvoltarea și testarea interogărilor și relațiilor dintre entitățile bazei de date.
- Implementarea validărilor și verificărilor necesare pentru protejarea datelor.

### Responsabilități comune

Ambii studenți vor colabora la:

- Analiza cerințelor și proiectarea arhitecturii aplicației.
- Proiectarea modelului de date și stabilirea relațiilor dintre entități.
- Implementarea și optimizarea bazei de date PostgreSQL.
- Integrarea bazei de date cu aplicația.
- Testarea funcționalităților și verificarea integrității datelor.
- Gestionarea repository-ului GitHub și versionarea codului.
- Realizarea documentației și pregătirea prezentării finale.

## 8. Domeniul proiectului

Proiectul include gestionarea utilizatorilor și grupurilor, listele de sarcini partajate, evidența cheltuielilor, calcularea balanțelor financiare, calendarul comun și gestionarea documentelor.

Nu sunt incluse procesarea plăților, transferurile bancare, scanarea automată a bonurilor, sistemele de chat sau apelurile audio/video.

## 9. Structura documentației

Documentația suplimentară a proiectului este organizată în directorul `docs/`:

- `requirements.md` – cerințele funcționale și nefuncționale ale aplicației.
- `use-cases.md` – scenariile de utilizare ale aplicației.
- `wireframes/` – schițele interfețelor și fluxurile de navigare.
- `data-model.md` – modelul preliminar de date și endpoint-urile API.
- `implementation-plan.md` – tehnologiile, strategia de versionare și planul de implementare.

## 10. Limitări și riscuri

- Sincronizarea modificărilor realizate simultan de mai mulți utilizatori poate genera conflicte.
- Aplicația necesită conexiune la internet și nu va suporta inițial sincronizarea completă offline.
- Corectitudinea balanțelor financiare trebuie verificată prin teste.
- Accesul la documente și informații financiare trebuie restricționat membrilor autorizați.
- Fișierele încărcate vor avea o limită de 10 MB per fișier, iar fiecare grup va avea o cotă de stocare stabilită.

## 11. Stadiul proiectului

Proiectul se află în etapa de analiză și proiectare. Dezvoltarea va începe cu funcționalitățile obligatorii, urmând ca funcționalitățile suplimentare să fie implementate în etapele ulterioare, în funcție de timpul disponibil.

