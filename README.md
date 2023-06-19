## Installatiehandleiding: Fellini React Web App

Deze handleiding legt uit hoe je de Fellini React Web App kunt installeren op je computer. Je hebt geen voorkennis nodig van computers of programmeren om deze stappen te volgen.

## Inhoudsopgave
1. Benodigdheden
2. Installatie
3. Starten van de webapplicatie
4. De Fellini React Web App en TheCocktailDB API



### `Benodigde software`

Om de Fellini webapplicatie te kunnen draaien, dien je de volgende software op je computer te hebben geïnstalleerd

Node.js: de JavaScript runtime-omgeving die nodig is om React applicaties te bouwen en draaien.
NPM: Node Package Manager, dat wordt gebruikt om externe libraries en tools te installeren die nodig zijn voor de Fellini applicatie.
Git: de versiebeheersoftware die wordt gebruikt om de Fellini applicatie te downloaden en bij te werken vanuit de Git repository.

Zorg ervoor dat je de nieuwste versies van Node.js en Git hebt geïnstalleerd voordat je doorgaat met de volgende stappen. 
Je kunt deze software downloaden vanaf de officiële website.

[Node.js](https://nodejs.org/en/download) 

[Git](https://git-scm.com/downloads) 

### `Installatie`

Nu je de benodigde software hebt geïnstalleerd, kunnen we doorgaan met de installatie van de React webapplicatie. 
Volg de onderstaande stappen:

1. Open de terminal op je computer. Dit is de command line interface waarmee je commando's kunt geven aan je computer.
2. Navigeer naar de map waar je de webapplicatie wilt opslaan. Gebruik hiervoor het: "cd" commando, gevolgd door de naam van de map. Bijvoorbeeld: "cd Documents/React".
3. Clone de repository van GitHub naar je computer. Gebruik hiervoor het commando: "git clone" gevolgd door de URL van de repository. In dit geval is dat:
   git clone git@github.com:eltoxic053/fellini.git  
4. Navigeer naar de map van de webapplicatie. Gebruik hiervoor het: "cd" commando, gevolgd door de naam van de map. In dit geval is dat: cd fellini
5. Installeer de afhankelijkheden van de applicatie met behulp van het volgende commando: npm install
6. Dit kan even duren, afhankelijk van de snelheid van je internetverbinding. NPM zal alle afhankelijkheden van de applicatie downloaden en installeren in een map genaamd "node_modules".
7. Start de webserver met het volgende commando: npm start
8. Dit commando zal de webserver starten en de webapplicatie openen in je standaard webbrowser. Als het goed is, zie je nu de homepage van de webapplicatie.

### `Starten van de webapplicatie`

Gefeliciteerd, je hebt de Fellini-applicatie succesvol geïnstalleerd op je computer! Nu kun je de applicatie gebruiken om cocktails te zoeken, details over verschillende cocktails te bekijken en je favoriete cocktail op te slaan.

Om de applicatie te starten, open je een terminalvenster en navigeer je naar de map fellini waarin je de code hebt gedownload.
Voer vervolgens het volgende commando uit: npm start

Dit zal de ontwikkelserver starten en automatisch de applicatie openen in je standaard webbrowser. Als dit niet het geval is, kun je de applicatie handmatig openen door naar http://localhost:3000 te navigeren in je webbrowser.

Om gebruik te maken van alle functionaliteiten van de Fellini webapplicatie, is het noodzakelijk om een account te registreren door naar de URL http://localhost:3000/registration te gaan, waar je na het invullen van de vereiste gegevens zoals gebruikersnaam, e-mailadres en wachtwoord, volledige toegang zult hebben tot de applicatie.

Als je eenmaal bent ingelogd, wordt je doorgestuurd naar de startpagina van de applicatie waar je direct aan de slag kunt met een aantal cocktails. Bovenaan de pagina vind je een vergrootglas waarmee je na specifieke cocktails kunt zoeken.

Om je favoriete cocktails te bekijken, klik je op de knop "Favorieten" in de navigatiebalk onderaan de pagina. Hier vind je een lijst met alle cocktails die je aan je favorieten hebt toegevoegd.

Om de standaard menu kaart te bekijken, klik je op de knop "Mijn bar" in de navigatiebalk onderaan de pagina. Hier vind je de lijst met standaard cocktails van de menu kaart.

Om je account gegevens aan te passen zoals het uploaden van een profiel foto, het wijzigen van je wachtwoord of email adres, klik je rechtsboven aan de pagina op het grijze rondje. Hierna zal je door worden gestuurd na hjet profiel dashboard waar je verschillende dingen kunt aanpassen

Om cocktails toe te voegen aan je favorieten klik je op het grijze rondje rechtsboven. Vervolgens klik je in het dashboard op cocktails, hier zal een zoekbalk tevoorschijn komen waar je, jou favoriete cocktail kunt toevoegen.


### `De Fellini React Web App en TheCocktailDB API`
De Fellini React Web App maakt gebruik van de API van TheCocktailDB om cocktailgegevens op te halen en weer te geven. TheCocktailDB is een openbare database met een uitgebreide collectie cocktailrecepten en bijbehorende informatie.

De API van TheCocktailDB biedt verschillende eindpunten waarmee je informatie over cocktails kunt opvragen, zoals de naam, ingrediënten, instructies en afbeeldingen. De Fellini-applicatie maakt gebruik van deze eindpunten om gebruikers in staat te stellen cocktails te zoeken, details over cocktails te bekijken en favoriete cocktails op te slaan.

Om de API van TheCocktailDB te gebruiken, hoeft u geen afzonderlijke installatiestappen te volgen. De Fellini-applicatie bevat al de vereiste code om de API-aanroepen uit te voeren en de gegevens weer te geven.

Het enige dat je hoeft te doen, is de Fellini-applicatie starten volgens de eerder genoemde stappen en je kunt direct aan de slag met het zoeken en bekijken van cocktails.
