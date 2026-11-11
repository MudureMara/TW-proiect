## 1. Arhitectura Bazei de Date
Schema bazei de date foloseset tipurile de date cunoscute in PostgreSQL. Aceasta este normalizata si cuprinde 8 entitati principale:
* **Entitati de baza:** `users`, `groups` (grupurile de colaborare) si `group_members` (roluri si permisiuni în grup).
* **Entitati operationale:** `tasks` (sarcini partajate), `events` (calendar) si `documents` (metadatele fisierelor stocate in MinIO).
* **Entitati financiare:** `expenses` (cheltuielile inregistrate) si `expenses_splits` (calcularea datoriilor per membru).

<img width="970" height="694" alt="db" src="https://github.com/user-attachments/assets/e3a958d5-ab27-4af5-9a4a-4d2c3b3ea6b1" />

## 2. Endpoint-uri si Specificatii

### Autentificare & Utilizatori
- **POST /auth/register**
- **POST /auth/login**
- **GET /users/:id**  - profilul utilizatorului in sesiunea curenta

### Grupuri
- **GET /groups** - lista grupurilor curente ale userului curent
- **POST /groups** - creearea unui grup
- **POST /groups/join** - invitarea altor utilizatori
- **GET /groups/:groupID/members** - lista membrilor din grup

### Sarcini
- **GET /groups/:groupID/tasks** - lista tuturor sarcinilor grupului
- **POST /groups/:groupID/tasks** - creearea unei sarcini noi in grup + notificarea membrilor
- **PUT /tasks/:id/status** - actualizarea starii sarcinii odata cu diferite modificari
- **DELETE /tasks/:id** - stergere sarcina

### Cheltuieli
- **GET /groups/:groupID/expenses** - afisarea istoricului cheltuielilor din grup
- **POST /groups/:groupID/expenses** - inregistrarea unei noi cheltuieli
```
{
  "amount": 150.00,
  "category": "Shopping",
  "split_type": "EQUAL",
  "splits": [
    { "user_id": 1, "amount_owed": 75.00 },
    { "user_id": 2, "amount_owed": 75.00 }
  ]
}
```

- **GET /groups/:groupID/balance** - calcularea cheltuielilor si returneaza datoriile membrilor din grup

### Documente
- **POST /groups/:groupID/documents** - incarcare fisier in MinIO si inregistrarea datelor in baza de dete
- **GET /groups/:groupID/documents** - lista documentelor salvate
- **GET /documents/:id/download** - generare si returnare a unui URL din MinIO pentru a descarca si vizualiza documentul

### Caledar
- **GET groups/:groupID/events** - afisarea evenimentelor dintr-un grup cu specificatii despre ora de inceput si final
**POST groups/:groupID/events** - creeare eveniment nou in calendar
- **DELETE /events/:id** - stergere eveniment

### Servicii
Avand in vedere ca aplicatia se foloseste de evenimente sincronizate in timp real, exista cateva evenimente emise critice functionarii:
- `task_created` / `task_updated` - trimitere notificare catre toti membrii cu noul status
- `join_group_room(groupID)` - dupa autentificare/invitatie, utilizatorul este inregistrat in noul grup
- `expanse_added` - notificare catre toti membrii cu noua balanta automata calculata
