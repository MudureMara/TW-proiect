
#  Scenarii de utilizare (Use Cases)

## 1. Crearea unui grup și invitarea membrilor

**Descriere:** Un utilizator creează un grup nou și invită alte persoane să participe la activitățile comune.

**Actor principal:** Utilizator autentificat (creatorul grupului).

**Actori secundari:** Persoanele invitate.

**Cerințe asociate:** 
- Crearea grupurilor
- Invitarea membrilor
- Accesul la resursele grupului

**Prioritate:** Must Have.

### Condiții inițiale
- Utilizatorul are un cont creat.
- Utilizatorul este autentificat în aplicație.

### Flux principal
1. Utilizatorul accesează secțiunea „Grupurile mele”.
2. Selectează opțiunea „Creează grup”.
3. Introduce numele grupului și, opțional, o descriere.
4. Confirmă crearea grupului.
5. Aplicația salvează grupul în baza de date.
6. Aplicația generează un link de invitație.
7. Utilizatorul distribuie linkul persoanelor dorite.
8. Persoanele invitate accesează linkul și se autentifică sau își creează un cont.
9. Aplicația verifică validitatea invitației și adaugă utilizatorii în grup.
10. Membrii pot accesa resursele comune ale grupului.

### Fluxuri alternative
- 3a. Dacă utilizatorul nu introduce numele grupului, aplicația afișează un mesaj de validare.
- 8a. Dacă linkul de invitație este invalid sau expirat, aplicația afișează un mesaj corespunzător.
- 9a. Dacă utilizatorul face deja parte din grup, aplicația nu îl adaugă din nou.

### Condiții finale
- Grupul este creat și salvat în baza de date.
- Utilizatorul creator devine membru al grupului.
- Persoanele care acceptă invitația sunt adăugate în grup și pot accesa resursele acestuia.

## 2. Crearea și atribuirea unei sarcini

**Descriere:** Un membru al grupului creează o sarcină, stabilește un termen-limită și o atribuie altui membru.

**Actor principal:** Membru al grupului.

**Actori secundari:** Membrul căruia îi este atribuită sarcina.

**Cerințe asociate:**
- Crearea listelor
- Gestionarea sarcinilor
- Atribuirea sarcinilor
- Stabilirea termenelor-limită
- Actualizarea stării sarcinilor
- Sincronizarea listelor

**Prioritate:** Must Have.

### Condiții inițiale
- Utilizatorul este autentificat.
- Utilizatorul face parte dintr-un grup existent.
- Grupul conține cel puțin doi membri.

### Flux principal
1. Utilizatorul accesează grupul dorit.
2. Deschide secțiunea „Sarcini”.
3. Selectează opțiunea „Adaugă sarcină”.
4. Introduce titlul și descrierea sarcinii.
5. Stabilește un termen-limită.
6. Selectează membrul căruia îi atribuie sarcina.
7. Confirmă crearea sarcinii.
8. Aplicația verifică datele introduse și salvează sarcina în baza de date.
9. Sarcina devine vizibilă în lista comună.
10. Modificarea este transmisă în timp real celorlalți membri ai grupului.
11. Membrul căruia i-a fost atribuită sarcina poate modifica starea acesteia în „Completată” după finalizare.

### Fluxuri alternative
- 4a. Dacă titlul sarcinii nu este completat, aplicația afișează un mesaj de validare.
- 5a. Dacă termenul-limită introdus este invalid, aplicația solicită corectarea acestuia.
- 6a. Dacă membrul selectat nu face parte din grup, aplicația nu permite atribuirea sarcinii.
- 10a. Dacă un membru nu este conectat, modificarea va fi disponibilă la următoarea accesare a aplicației.

### Condiții finale
- Sarcina este salvată în baza de date.
- Sarcina este asociată grupului și membrului responsabil.
- Modificările sunt vizibile membrilor grupului.

## 3.  Înregistrarea unei cheltuieli și calcularea balanțelor

**Descriere:** Un membru înregistrează o cheltuială comună, iar aplicația calculează automat contribuțiile și balanțele financiare ale membrilor grupului.

**Actor principal:** Membru al grupului.

**Actori secundari:** Ceilalți membri ai grupului.

**Cerințe asociate:**
- Înregistrarea cheltuielilor
- Stabilirea modalității de împărțire
- Calcularea balanțelor financiare
- Vizualizarea istoricului cheltuielilor
- Corectitudinea calculelor financiare
- Integritatea datelor

**Prioritate:** Must Have.

### Condiții inițiale
- Utilizatorul este autentificat.
- Utilizatorul face parte dintr-un grup existent.
- Grupul are cel puțin doi membri.

### Flux principal
1. Utilizatorul accesează secțiunea „Cheltuieli”.
2. Selectează opțiunea „Adaugă cheltuială”.
3. Introduce suma cheltuielii și categoria acesteia.
4. Selectează persoana care a efectuat plata.
5. Alege modalitatea de împărțire a cheltuielii:
   - Împărțire egală între membrii grupului.
   - Împărțire prin atribuirea unor sume fixe fiecărui membru.
6. Confirmă înregistrarea cheltuielii.
7. Aplicația verifică dacă suma introdusă și valorile repartizate sunt valide.
8. Cheltuiala este salvată în baza de date.
9. Aplicația recalculează automat contribuțiile și balanțele financiare individuale.
10. Rezultatele sunt afișate în secțiunea „Balanțe”.
11. Membrii grupului pot consulta istoricul cheltuielilor și situația financiară actualizată.

### Fluxuri alternative
- 3a. Dacă suma introdusă este invalidă sau negativă, aplicația afișează un mesaj de eroare.
- 5a. Dacă se selectează împărțirea egală, aplicația distribuie costul între membrii selectați.
- 5b. Dacă se selectează împărțirea prin sume fixe, aplicația verifică dacă suma valorilor repartizate corespunde totalului cheltuielii.
- 7a. Dacă datele financiare nu sunt valide, cheltuiala nu este salvată și utilizatorul este informat.
- 7b. Dacă suma repartizată nu corespunde totalului cheltuielii, aplicația solicită corectarea valorilor.

### Condiții finale
- Cheltuiala este înregistrată în baza de date.
- Contribuțiile membrilor sunt actualizate.
- Balanțele financiare sunt recalculate și afișate corect.

## 4.  Încărcarea și partajarea unui document

**Descriere:** Un membru al grupului încarcă un document în spațiul comun, astfel încât ceilalți membri autorizați să îl poată accesa și descărca.

**Actor principal:** Membru al grupului.

**Actori secundari:** Ceilalți membri ai grupului.

**Cerințe asociate:**
- Încărcarea documentelor
- Organizarea documentelor
- Descărcarea documentelor
- Gestionarea datelor de expirare
- Validarea fișierelor încărcate
- Limita de stocare a documentelor
- Izolarea datelor grupurilor

**Prioritate:** Should Have.

### Condiții inițiale
- Utilizatorul este autentificat.
- Utilizatorul face parte dintr-un grup existent.
- Există suficient spațiu disponibil în limita de stocare a grupului.

### Flux principal
1. Utilizatorul accesează secțiunea „Documente” a grupului.
2. Selectează opțiunea „Încarcă document”.
3. Alege un fișier de pe dispozitiv.
4. Selectează categoria documentului.
5. Introduce, opțional, o dată de expirare.
6. Confirmă încărcarea.
7. Aplicația verifică formatul și dimensiunea fișierului.
8. Documentul este încărcat în sistemul de stocare MinIO.
9. Aplicația salvează în PostgreSQL metadatele documentului și referința către fișier.
10. Documentul devine disponibil membrilor autorizați ai grupului.
11. Orice membru autorizat poate accesa sau descărca documentul.

### Fluxuri alternative
- 3a. Dacă utilizatorul nu selectează un fișier, aplicația solicită alegerea acestuia.
- 7a. Dacă formatul fișierului nu este acceptat, aplicația afișează un mesaj de eroare.
- 7b. Dacă fișierul depășește limita de 10 MB, încărcarea este respinsă.
- 7c. Dacă grupul nu mai are spațiu disponibil, aplicația informează utilizatorul.
- 9a. Dacă încărcarea eșuează, documentul nu este afișat ca fiind disponibil în grup.

### Condiții finale
- Documentul este stocat în MinIO.
- Metadatele și referința documentului sunt salvate în PostgreSQL.
- Membrii autorizați pot accesa și descărca documentul.

## 5.  Adăugarea unui eveniment în calendarul comun

**Descriere:** Un membru al grupului adaugă un eveniment în calendarul comun, astfel încât toți membrii să poată consulta informațiile despre acesta.

**Actor principal:** Membru al grupului.

**Actori secundari:** Ceilalți membri ai grupului.

**Cerințe asociate:**
- Crearea evenimentelor
- Gestionarea evenimentelor
- Vizualizarea calendarului comun
- Integritatea datelor

**Prioritate:** Should Have.

### Condiții inițiale
- Utilizatorul este autentificat.
- Utilizatorul face parte dintr-un grup existent.

### Flux principal
1. Utilizatorul accesează secțiunea „Calendar”.
2. Selectează opțiunea „Adaugă eveniment”.
3. Introduce titlul și descrierea evenimentului.
4. Selectează data și ora desfășurării.
5. Confirmă crearea evenimentului.
6. Aplicația validează informațiile introduse.
7. Evenimentul este salvat în baza de date și asociat grupului.
8. Evenimentul este afișat în calendarul comun.
9. Ceilalți membri ai grupului pot vizualiza detaliile evenimentului.

### Fluxuri alternative
- 3a. Dacă titlul evenimentului nu este completat, aplicația afișează un mesaj de validare.
- 4a. Dacă data sau ora sunt invalide, aplicația solicită corectarea acestora.
- 6a. Dacă informațiile introduse nu sunt valide, evenimentul nu este salvat.

### Condiții finale
- Evenimentul este salvat în baza de date.
- Evenimentul este asociat grupului corespunzător.
- Toți membrii grupului pot consulta evenimentul în calendarul comun.

