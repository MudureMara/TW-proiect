Aplicatia web urmareste o arhitectura 3-Tier Achitecture, impartita in componentele ce urmeaza:
1. **Client**: interfata web
2. **Aplicatie**: serverul Node.js impreuna cu functionalitatile Websocket
3. **Date si Servicii**: baza de date relationala, implementarea serviciilor externe in cadrul aplicatiei.

<img width="638" height="690" alt="image" src="https://github.com/user-attachments/assets/79558c0b-2075-4981-8da7-ecd90fb00b85" />

## Componente
1. Nivel Client
	- ***User Interface***: interfata cu care utilizatorul comunica cu aplicatia; are acces la autentificare, liste colaborative, balant cheltuieli, documente, calendar
	- ***Browser Storage***: tokenul JWT dupa autentificare este pastrat local la utilizator astfel incat sa se evite cat mai multe interogari catre server

2. Nivel Aplicatie
	- ***API Routes***: zona principala a rutelor serverului backend
	- ***Authentification & Groups***: genereaza tokenuri JWT, cripteaza parole si contine logica de creeare cont/logare in cont
	- ***Main Logic***: logica functionalitatilor principale pentru gestiunea sarcinilor in comun, calculul cheltuielilor si calendarul de evenimente
	- ***Real-Time Sync***: utilizatorii se afla in grupul predestinat si mentin o conexiune live prin transmisii broadcast oferite de protocolul Websocket
	- ***File Handler***: sunt verificate tipul fisierului (PDF, JPG, PNG) si dimensiunea de 10 MB, apoi sunt transmise in binar catre serverul MinIO

3. Nivel Date si Servicii
	- ***PostgreSQL***: baza de date relationala
	- ***MinIO***: stocheaza fizic documentele si evita pastrarea lor in baza de date a aplicatiei
	- ***Mail Service (Nodemailer)***: sistemul de inregistrare/autentificare si trimiterea invitatiilor de grup

## Flux de comunicare
- *Client -> Backend*: cereri sincrone initiate de utilizator: autentificare, adaugare cheltuieli, incarcare document, adaugare in lista, in calendar
- *Client <-> Backend*: sincronizare evenimente de grup tuturor membrilor conectati in grup prin cai bidirectionale
- *Backend -> PostgreSQL*: interogari SQL pentru citirea/scrierea entitatilor structurate si a metadatelor
- *Backend -> MinIO*: salvarea documentelor binare si returnarea unei chei unice (`file-key`) catre backend
- *Backend -> Mail Service*: trimiterea asincrona a codurilor de acces si a link-urilor de invitatie
