# Installation - English

Česká verze je [níže](#instalace---česky)

Installation assumes the presence of `Docker` and `Docker-compose` on the device.

## Download

Download the source files as a ZIP archive and unzip it, or clone the
repository using the following command:

```
git clone https://github.com/RuzickaJakub/text-normalization-annotation-application.git
```

Move to the root directory of the project. Here the project is split into two
two main components.

- client (frontend, running on the user)
- server (backend, running on the server)

## Local run

To run locally, you don't need to set up anything. Just run the program:

```
docker-compose up
```

Then navigate in your browser to the address where the program is running:

```
http://localhost:3333
```

## Running on the server

To run on the server, change the contents of the `client/.env` file accordingly.
The `REACT_APP_BACKEND_URL` line defines the address where to send requests for 
the server. The default value is set to:

```
REACT_APP_BACKEND_URL="http://localhost:5555/api"
```

All paths on the backend are prefixed with `/api`. If the application would be running
on the server with the address `https://annotator.ruzickajakub.eu`, then the setting should be:

```
REACT_APP_BACKEND_URL="https://annotator.ruzickajakub.eu/api"
```

## Setting the allowed Semiotic classes

The selection of allowed semiotic classes is made by setting them in the files:

- `client/src/types/TokenTypes.tsx` (list of semiotic classes)
- `client/src/utils/getTokenTypeColor.tsx` (the file assigning the color to each
  classes)

The semiotic classes allowed in both files should match each other. To
enable/disable a class, just uncomment/comment it.


# Instalace - česky

Instalace předpokládá přítomnost `Docker`, `Docker-compose` na zařízení.

## Stáhnout

Stáhněte si zdrojové soubory jako archiv ZIP a rozbalte jej, nebo jej
naklonujte z úložiště pomocí příkazu

```
git clone https://github.com/RuzickaJakub/text-normalization-annotation-application.git
```

Přesuňte se do kořenového adresáře projektu. Zde je projekt rozdělen na dvě hlavní
části.

- klient (frontend, běžící u uživatele)
- server (backend, běžící na serveru).

## Lokální spuštění

Pro lokální spuštění není třeba nic nastavovat, stačí program spustit:

```
docker-compose up
```

Poté ve svém prohlížeci přejděte na adresu, kde program běží:

```
http://localhost:3333
```

## Spuštění na serveru

Chcete-li aplikaci spustit na serveru, změňte odpovídajícím způsobem obsah souboru
`client/.env`, který obsahuje definici adresy, na kterou se mají posílat
požadavky na server. Výchozí hodnota je:

```
REACT_APP_BACKEND_URL="http://localhost:5555/api"
```

Všechny cesty na backendu mají předponu `/api`. Pokud by aplikace byla spuštěna na
serveru s adresou `https://annotator.ruzickajakub.eu`, pak by správné nastavení bylo:

```
REACT_APP_BACKEND_URL="https://annotator.ruzickajakub.eu/api"
```

## Nastavení povolených sémiotických tříd

Výběr povolených sémiotických tříd se provádí jejich nastavením v souborech:

- `client/src/types/TokenTypes.tsx` (seznam sémiotických tříd)
- `client/src/utils/getTokenTypeColor.tsx` (soubor přiřazující barvu každé
  třídě)

Sémiotické třídy povolené v obou souborech by se měly vzájemně shodovat.
Chcete-li třídu povolit/zakázat, stačí ji odkomentovat/zakomentovat.
