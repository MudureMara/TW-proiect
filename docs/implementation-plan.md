
## 1. Justificarea Tehnologiilor Alese

- **Frontend: HTML, CSS, JavaScript**
 Ofera un control complet asupra ciclului de viata al elementelor din DOM și elimină configurarea  framework-urilor.
 
- **Backend: Node.js & Express.js**
Ofera mecanisme asincrone si usurinta pentru operațiuni I/O intense precum apeluri baze de date, transfer de fisiere. Ajuta la o gestionare a convenabila a autentificarii, validarii datelor, erorilor.

- **Comunicare in Timp Real: Socket.IO**
Socket.IO include mecanisme esentiale de reconectare automata, fallback pe HTTP Long-Polling când rețeaua e instabilă și conceptul nativ de camere virtuale. Acest mecanism permite izolarea traficului în cadrul fiecarui grup.

- **Baza de Date Relationala: PostgreSQL**
PostgreSQL oferă constrangeri robuste de integritate referențiala (chei primare, chei straine cu ștergere în cascada) si suport nativ pentru tipuri de date variate (`TIMESTAMP`, `NUMERIC` pentru moneda).

- **Stocare de Obiecte: MinIO**
MinIO permite stocarea separată, sigură și scalabilă a fișierelor, generând URL-uri presemnate temporare pentru descarcare si reducand incarcarea serverului web.

- **Securitate & Autentificare: JWT (JSON Web Tokens) & bcrypt**
JWT ii permite serverului sa nu tina sesiuni in memorie, fiind ideal pentru API-uri REST și autentificarea conexiunilor WebSocket. Algoritmul `bcrypt` aplică hashing cu salt pentru parole si genereaza protectie asupra datelor.

## 2. Strategia de Versionare și Fluxul de Lucru

Proiectul folosește un flux pe branch-uri pentru a oferi flexibilitate modului de lucra fara intersectii nedorite:

- **Branch-uri principale:**
    
    - `main`: versiuni stabile ale aplicației
    - `dev`: branch-ul comun de integrare unde se unesc toate functionalitatile

- **Branch-uri de lucru:**
  Derivate din `dev` si respecta conventia de denumire:
	-  `feature/<nume-functionalitate>`
	- `fix/<descriere-bug>` 
	- `docs/<descriere>`
	- mesagele de commit: 
		- `feature: <text>`
        - `fix: <text>`
        - `docs: text`

- **Pull Requests:**
- Este interzis push-ul direct pe branch-urile `main` și `dev`. 
- Fuziunea oricarui branch de lucru in `dev` se realizeaza exclusiv prin **Pull Request (PR)**, necesitand verificarea si aprobarea celuilalt membru al echipei inainte de merge.

## 3. Prioritizarea Activităților (Metodologia MoSCoW)

- **Must Have**
    - Configurarea bazei de date (PostgreSQL) și a serviciului de fișiere (MinIO).
    - Modulul de înregistrare, autentificare și gestionare a token-urilor JWT.
    - Crearea grupurilor și sistemul de alăturare pe bază de invite code / link.
    - Listele de sarcini comune cu actualizare de stare (CRUD complet).
    - Modulul de cheltuieli: adăugare cheltuială, defalcare egală și calcul automat al balanței.

- **Should Have:**
    - Integrarea Socket.IO pentru sincronizarea instantanee a listelor și balanțelor pe ecranele tuturor membrilor activi.
    - Modulul Seif Documente: încărcare fișier în MinIO cu validare de tip/dimensiune (10 MB) și generare URL descărcare.
    - Modulul Calendar Comun: adăugare și vizualizare evenimente de grup dintr-un interval definit.
    - Interfață responsive completă (adaptare desktop / mobil).

- **Could Have:**
    - Alerte vizuale în interfață pentru task-uri sau documente care se apropie de termenul de expirare (`due_date`, `expiry_date`).
    - Trimiterea automată a e-mailurilor de invitație prin serviciul Nodemailer.
    - Exportul raportului de cheltuieli / sarcini în format PDF sau CSV.

- **Won't Have:**
    - Procesarea tranzacțiilor financiare reale sau integrări cu gateway-uri bancare.
    - Scanare automată OCR pe bonuri fiscale.
    - Chat integrat sau apeluri audio-video (aplicația este un hub organizatoric, nu un mesagerie).

## 4. Planul de Implementare (Etape / Sprint-uri)

| **Interval Academic**                    | **Fază & Focus Principal**                               | **Obiective & Activități Concrete**                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Săptămâna 8**                          | Fundație Backend & Structură Bază de Date                | - Inițializare backend<br>- Rulare scripturi DDL pentru cele 8 entități în PostgreSQL.<br>- Configurare instanță locală/container MinIO.<br>- Implementare rute de autentificare: `POST /auth/register` și `POST /auth/login`.                                                                                                                                                                                                                    |
| **Săptămânile 9 – 10**<br><br>  <br>     | Logica de Business (Core API: Grupuri, Sarcini, Balanțe) | - Implementare CRUD grupuri și alăturare prin `invite_code` (`group_members`).<br>- Modul sarcini: creare, atribuire (`assigned_to`), marcare status (`PUT /tasks/:id/status`).<br>- Modul financiar: `POST /groups/:id/expenses` cu popularea tabelei `expenses_splits`.<br>- Implementare algoritm de calcul pentru balanța datoriilor (`GET /groups/:id/balance`).<br>- Realizare schelet frontend: pagini de autentificare și dashboard grup. |
| **Săptămânile 11 – 12**<br><br>+ vacanta | Timp Real, Fișiere & Calendar                            | - Integrare server & client Socket.IO cu camere virtuale per grup (`join_group_room`).<br>- Emitere broadcast pentru evenimentele `task_created`, `task_updated` și `expense_added`.<br>- Integrare MinIO SDK: încărcare fișiere (validare tip și limită 10 MB) și generare Presigned URLs pentru descărcare (`documents`).<br>- Modul calendar: salvare și vizualizare evenimente (`events`) folosind o componentă de calendar în frontend.      |
| **Săptămânile 13 – 14**                  | Integrare End-to-End, Testare & Pregătire Prezentare     | - Finisare stilizare CSS<br>- Testare fluxuri: creare grup $\rightarrow$ invitație $\rightarrow$ adăugare cheltuială $\rightarrow$ descărcare act).<br>- Tratarea erorilor<br>- Actualizare finală `README.md`                                                                                                                                                                                                                                    |

## 5. Repartizarea Responsabilitatilor in Echipa
### Responsabilitati Comune
- Definirea cerintelor functionale si elaborarea cazurilor de utilizare (`use-cases.md`, `requirements.md`).
- Proiectarea modelului conceptual si relational de date si normalizarea tabelelor.
- Testarea integrata a scenariilor de utilizare multi-user si revizuirea reciproca a codului.
- Pregatirea prezentarii finale a proiectului.

### Membru 1: Frontend & UX

- **Interfata Utilizator:** Dezvoltarea structurii HTML si stilizarea CSS responsive.
- **Consum API & Stare:** Implementarea apelurilor `fetch` asincrone catre backend si gestionarea starii in `localStorage` (token JWT).
- **Integrare Client WebSockets:** Conectarea bibliotecii client `socket.io-client` si actualizarea reactiva a interfetei la evenimentele primite de la server.
- **Componente Speciale:** Integrarea componentei vizuale de Calendar si a interfetelor de incarcare drag-and-drop pentru documente.

### Membru 2: Backend & Infrastructura

- **Arhitectura Server:** Structurarea aplicatiei Express.js (controlere, servicii, validare si securitate).
- **Baza de Date & Persistenta:** Scrierea schemelor in PostgreSQL, stabilirea constrangerilor de integritate referentiala si optimizarea interogarilor.
- **Logica de Business & Balante:** Implementarea algoritmului matematic de calcul al datoriilor simplificate si gestiunea rolurilor din grup.
- **Servicii de Stocare & Sockets:** Integrare MinIO pentru stocarea obiectelor si configurarea serverului Socket.IO (gestiunea camerelor de grup si emiterea evenimentelor broadcast).
