# jsramverk-proj-backend
[![Build Status](https://travis-ci.org/pererselena/jsramverk-proj-backend.svg?branch=master)](https://travis-ci.org/pererselena/jsramverk-proj-backend)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/pererselena/jsramverk-proj-backend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/pererselena/jsramverk-proj-backend/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/pererselena/jsramverk-proj-backend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/pererselena/jsramverk-proj-backend/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/pererselena/jsramverk-proj-backend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/pererselena/jsramverk-proj-backend/build-status/master)


## Teknikval för backend

I detta projekt har jag valt att göra en trading plattform för att kunna köpa och sälja produkter som råvaror och aktier. Namnen har fått inspiration från utbildningen.

Detta API är skrivet i node.js med hjälp av express, jsonwebtokens, mongoose, bcryptjs, cors, dotenv, morgan bland annat.

Jag har valt att försöka lära mig mer om mongodb med mongoose och har lagt alla mina produkter och användare samt övrig lagring i mongodb.
Jag valde att skriva modeller och scheman till mongoose för att skapa produkter, användare och en depå.
Depån kopplas med objektId till användaren, produkter kopplas till depån med objektId. Alla Idn automatgenereras, något som gjorde det lite svårare att kunna testa all kod på ett enkelt sätt. Jag har valt att inte testa de funktioner som kräver att man vet ett depå, orderid eller produktid i databasen för att kunna utföra på ett enkelt sätt.

Jag har strukturerat min kod i olika mappar. Models mappen innehåller mongoose modeller för användare, depå och produkter.
Mappen src innehåller moduler med metoder som används i routes för att hantera applikationen.

Mappen seed innehåller en återställnings fil som fyller collection products med 5 produkter och rensar alla collections.

Test mappen innehåller test för depot och auth.

app.js är huvud filen som exekveras.

routes mappen innehåller routes till / och /depot /login och /register sköts direkt ifrån app.js

depot har rotues GET /depot/:id som visar en depå kopplad till en användare.

PUT /depot/buy och /depot/sell för att köpa eller sälja en produkt.
Dessa anropar depot.js i src mappen.

PUT /depot/addmoney sätter in pengar på kontot genom ett anrop till depot.js metod.

Index har en route för / som hämtar och visar alla produkter.

I src finns auth.js och depot.js. Auth hanterar inloggning och har en funtktion för att validera tokens denna används av depot routen för att validera att användaren får utföra det den vill.

depot.js hanterar köp, sälj och insättning av pengar, med en hantering om användaren inte har en produkt eller har för lite av den.

Jag har valt att lägga alla köp som användaren gör som en order eller item i depån, vilket gör att man kan se flera poster av en köpt produkt. Detta för att man också bättre ska kunna se vad man köpte produkten för.