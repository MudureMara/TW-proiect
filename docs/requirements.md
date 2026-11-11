
# Planify – Cerințe funcționale și nefuncționale

## 1. Cerințe funcționale (Functional Requirements)

Cerințele funcționale descriu acțiunile și serviciile pe care aplicația trebuie să le ofere utilizatorilor.

### 1.1. Autentificare și gestionarea conturilor

**Înregistrarea utilizatorilor**
- Prioritate: Must Have.
- Aplicația trebuie să permită crearea unui cont prin introducerea informațiilor necesare, precum nume, adresă de e-mail și parolă.
- Adresa de e-mail trebuie să fie unică.

**Autentificarea utilizatorilor**
- Prioritate: Must Have.
- Aplicația trebuie să permită autentificarea utilizatorilor existenți pe baza adresei de e-mail și a parolei.

**Deconectarea utilizatorilor**
- Prioritate: Must Have.
- Aplicația trebuie să permită utilizatorilor să se deconecteze în siguranță.

### 1.2. Gestionarea grupurilor

**Crearea grupurilor**
- Prioritate: Must Have.
- Utilizatorii autentificați trebuie să poată crea grupuri pentru organizarea activităților comune.

**Invitarea membrilor**
- Prioritate: Must Have.
- Creatorul grupului trebuie să poată invita alte persoane prin intermediul unui link de invitație.

**Accesul la resursele grupului**
- Prioritate: Must Have.
- Membrii unui grup trebuie să poată accesa resursele asociate grupului din care fac parte.
- Utilizatorii care nu fac parte din grup nu trebuie să poată accesa aceste resurse.

### 1.3. Gestionarea sarcinilor și listelor partajate

**Crearea listelor**
- Prioritate: Must Have.
- Membrii grupului trebuie să poată crea liste comune pentru organizarea activităților.

**Gestionarea sarcinilor**
- Prioritate: Must Have.
- Utilizatorii trebuie să poată adăuga, modifica și șterge sarcini din listele partajate.

**Atribuirea sarcinilor**
- Prioritate: Must Have.
- O sarcină trebuie să poată fi atribuită unuia dintre membrii grupului.

**Stabilirea termenelor-limită**
- Prioritate: Must Have.
- Utilizatorii trebuie să poată stabili un termen-limită pentru fiecare sarcină.

**Actualizarea stării sarcinilor**
- Prioritate: Must Have.
- Utilizatorii trebuie să poată modifica starea unei sarcini, de exemplu: necompletată sau completată.

**Sincronizarea listelor**
- Prioritate: Must Have.
- Modificările realizate de un membru trebuie să devină vizibile și celorlalți membri ai grupului în timp real.

### 1.4. Gestionarea cheltuielilor și a balanțelor financiare

**Înregistrarea cheltuielilor**
- Prioritate: Must Have.
- Membrii grupului trebuie să poată înregistra cheltuieli comune, specificând suma, categoria și persoana care a efectuat plata.

**Stabilirea modalității de împărțire**
- Prioritate: Must Have.
- Aplicația trebuie să permită împărțirea unei cheltuieli în mod egal între membri sau prin atribuirea unor sume fixe.

**Calcularea balanțelor financiare**
- Prioritate: Must Have.
- Aplicația trebuie să calculeze automat contribuțiile și soldurile individuale ale membrilor grupului.

**Vizualizarea istoricului cheltuielilor**
- Prioritate: Must Have.
- Membrii grupului trebuie să poată vizualiza lista cheltuielilor înregistrate și informațiile asociate acestora.

### 1.5. Gestionarea documentelor

**Încărcarea documentelor**
- Prioritate: Should Have.
- Membrii grupului trebuie să poată încărca documente în formate precum PDF, JPG și PNG.

**Organizarea documentelor**
- Prioritate: Should Have.
- Utilizatorii trebuie să poată organiza documentele pe categorii și să consulte informațiile asociate acestora.

**Descărcarea documentelor**
- Prioritate: Should Have.
- Membrii autorizați trebuie să poată vizualiza și descărca documentele încărcate în grup.

**Gestionarea datelor de expirare**
- Prioritate: Could Have.
- Utilizatorii trebuie să poată asocia o dată de expirare documentelor, pentru a urmări valabilitatea acestora.

### 1.6. Calendar și evenimente

**Crearea evenimentelor**
- Prioritate: Should Have.
- Membrii grupului trebuie să poată adăuga evenimente în calendarul comun, specificând titlul, data, ora și descrierea.

**Gestionarea evenimentelor**
- Prioritate: Should Have.
- Utilizatorii trebuie să poată modifica sau șterge evenimentele create.

**Vizualizarea calendarului comun**
- Prioritate: Should Have.
- Toți membrii grupului trebuie să poată vizualiza evenimentele programate.

### 1.7. Notificări și export

**Notificări privind activitățile**
- Prioritate: Could Have.
- Aplicația poate trimite notificări prin e-mail privind sarcinile atribuite și termenele-limită apropiate.

**Notificări privind documentele**
- Prioritate: Could Have.
- Aplicația poate avertiza utilizatorii atunci când se apropie data de expirare a unui document.

**Exportarea datelor**
- Prioritate: Could Have.
- Utilizatorii pot exporta listele de sarcini sau rapoartele financiare într-un format precum CSV sau PDF.

## 2. Cerințe nefuncționale (Non-Functional Requirements)

Cerințele nefuncționale descriu condițiile de calitate, securitate, performanță și utilizare pe care aplicația trebuie să le respecte.

### 2.1. Securitate

**Protejarea parolelor**
- Prioritate: Must Have.
- Parolele utilizatorilor trebuie stocate folosind o funcție de hashing securizat, precum bcrypt.

**Autentificare și autorizare**
- Prioritate: Must Have.
- Accesul la funcționalități și resurse trebuie permis doar utilizatorilor autentificați și autorizați.

**Izolarea datelor grupurilor**
- Prioritate: Must Have.
- Un utilizator nu trebuie să poată vizualiza sau modifica datele unui grup din care nu face parte.

**Validarea fișierelor încărcate**
- Prioritate: Must Have.
- Aplicația trebuie să verifice formatul și dimensiunea fișierelor încărcate.

### 2.2. Performanță

**Timpul de răspuns**
- Prioritate: Should Have.
- Operațiile obișnuite, precum afișarea listelor și înregistrarea cheltuielilor, ar trebui să se finalizeze în maximum 2 secunde în condiții normale de utilizare.

**Sincronizarea în timp real**
- Prioritate: Must Have.
- Modificările realizate de utilizatori conectați trebuie transmise celorlalți membri ai grupului în maximum 2 secunde, în condiții normale de rețea.

### 2.3. Utilizabilitate și compatibilitate

**Interfață responsive**
- Prioritate: Must Have.
- Interfața trebuie să se adapteze la dimensiunile ecranelor desktop, tabletelor și telefoanelor mobile.

**Ușurința în utilizare**
- Prioritate: Should Have.
- Interfața trebuie să fie intuitivă, iar funcționalitățile principale să poată fi accesate fără pași inutili.

**Compatibilitatea cu browserele**
- Prioritate: Should Have.
- Aplicația trebuie să funcționeze în versiunile recente ale browserelor Google Chrome, Mozilla Firefox și Microsoft Edge.

### 2.4. Integritatea și disponibilitatea datelor

**Integritatea datelor**
- Prioritate: Must Have.
- Baza de date trebuie să păstreze corect relațiile dintre utilizatori, grupuri, sarcini și cheltuieli.

**Corectitudinea calculelor financiare**
- Prioritate: Must Have.
- Calculele balanțelor trebuie să fie corecte, inclusiv în cazul împărțirii cheltuielilor între mai mulți membri.

**Persistența datelor**
- Prioritate: Must Have.
- Datele introduse trebuie să rămână disponibile după închiderea și redeschiderea aplicației.

**Limita de stocare a documentelor**
- Prioritate: Should Have.
- Dimensiunea maximă a unui fișier încărcat va fi de 10 MB, iar fiecare grup va avea o cotă de stocare stabilită.

## 3. Funcționalități excluse

Următoarele funcționalități nu fac parte din versiunea actuală a proiectului:

- Procesarea plăților bancare.
- Transferul efectiv de bani între utilizatori.
- Integrarea cu instituții sau aplicații bancare.
- Scanarea automată a bonurilor fiscale.
- Sistem de mesagerie instant între utilizatori.
- Apeluri audio sau video.
- Sincronizarea completă a modificărilor realizate în modul offline.
