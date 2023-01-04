[![Static analysis and style check](https://github.com/RuzickaJakub/text-normalization-annotation-application/actions/workflows/pylint.yml/badge.svg)](https://github.com/RuzickaJakub/text-normalization-annotation-application/actions/workflows/pylint.yml)

# TNA - Text Normalization Annotation application

Česká verze je [níže](#tna---anotační-aplikace-pro-normalizaci-textu)

An annotation application for creating datasets for text normalization task.

## Installation

For installation instructions, see [Installation Instructions](./INSTALL.md)

## Quick start

Clone the repository:

```
git clone https://github.com/RuzickaJakub/text-normalization-annotation-application.git
```

Start the program with the command:

```
docker-compose up
```

Go to the following address in your browser:

```
http://localhost:3333
```

Please note that the program must be compiled before it can be run, which may take some time.

## Project description

In the repository, you will find the following files:

- `client` 
    A directory containing the source files for the frontend.
- `server`
    A directory containing the source files for the backend.
- `example-data`
    A directory containing a sample of unannotated and already annotated datasets.
- `docker-compose.yml`
    Configuration file for `docker-compose` to allow the program to run on a single command.
- `INSTALL.md`
    The installation guide in Czech and English ([Link](./INSTALL.md)).
- `MANUAL.md`
    Manual for annotators in Czech ([Link](./MANUAL.md)).
- `README.md`
    File summarizing basic information about the project.
    
The project's core consists of two main parts - frontend and backend. The frontend is the part running on the user, and it is a react application written in typescript. The backend is the part running on the server and is written in Flask (Python). The frontend runs by default on port 3333 and the backend on port 5555. The application is started using the `docker-compose up` command.

## Sample data

The `example-data` directory contains sample data. The `Example.txt` file contains a dataset named `Example`, which consists of ten sample sentences. The second sample dataset is the already annotated `Example-annotations` dataset, which includes the same sentences as the first dataset plus the appropriate annotations. The dataset names are deliberately different, so both can be uploaded under the same user.

# TNA - Anotační aplikace pro normalizaci textu

Anotační applikace pro vytváření datových sad pro normalizaci textu.

## Instalace

Pro instalační pokyny se podívejte na [Instalační pokyny](./INSTALL.md)

## Quick start

Stáhněte si repozitář

```
git clone https://github.com/RuzickaJakub/text-normalization-annotation-application.git
```

Spusťte program příkazem:

```
docker-compose up
```

Ve svém prohlížeči přejděte na adresu:

```
http://localhost:3333
```

Program se musí před spuštěním zkompilovat, což může chvíli zabrat.

## Popis projektu

V repozitáři naleznete následující soubory:

- `client` 
    Adresář obsahující zdrojové soubory k frontendu.
- `server`
    Adresář obsahující zdrojové soubory k backendu.
- `example-data`
    Adresář s ukázkou již anotovaných i neanotovaných dat.
- `docker-compose.yml`
    Configurační soubor pro docker-compose umožňující spuštění programu na jeden příkaz.
- `INSTALL.md`
    Instalační příručka v českém a anglickém jazyce ([Odkaz](./INSTALL.md)). 
- `MANUAL.md`
    Manuál pro annotátory v čestině([Odkaz](./MANUAL.md)).
- `README.md`
    Soubor shrnující základní informace o projektu.
    
Jádro projektu se skládá ze dvou hlavních částí - frontendu a backendu. Frontend je část běžící u užívatele a jedná se react applikaci napsanou v typescriptu. Backend je část běžící na serveru a je napsán ve Flasku (Python). Spuštění aplikace probíhá pomocí příkazu `docker-compose up`. Frontend běží ve výchozím nastavení na portu 3333 a backend na portu 5555.

## Ukázková data

V adresáři `example-data` jsou ukázková data. Soubor `Example.txt` obsahuje dataset s názvem `Example`, který se skládá z deseti ukázkových vět. Druhou ukázkou je již anotovaný dataset `Example-annotations`, který obsahuje stejné věty jako první dataset a navíc i příslušné anotace. Názvy datasetu se záměrně liší, aby mohli být oba nahrány pod stejným uživatelem.
