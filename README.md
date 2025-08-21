# Rewrite aplikace pro evidenci přístupů uživtelů

## TODO
- [ ] scaffold ui
- [x] create database with data
- [x] conect database
- [ ] current role view
- [ ] auth (kerberos?)
- [ ] role perms and admin
- [ ] role granting
- [ ] email notifs
- [ ] pdf log exporting

## Header
- nav a current user
## Main page - Výpis rolí pro jednotlivé uživatele
- vlevo menu s uživateli 
- vlevo dole přepínání mezi All/Active/Notification
- vpravo tabulka se současnými přístupy
- tlačítko + na přidělení přístupu uživateli (zobrazí se jenom ty přístupy, na které má současný uživatel práva)
- tlačítko ✏️ na edit uživatele
## Role edit page
- zobrazení všech rolí a popisů
- u každé role ✏️ na edit
- v edit menu možnost delete (spíš jen disable kvůli logům? Mohlo by u všech uživatelů s daným přístupem přikázat odebrání)
- tlačítko + na přidání role
## Admin edit page
-vlevo seznam lidí kteří mají nějaký admin přístup
- vpravo seznam rolí a přidělovatel/vykonavatel