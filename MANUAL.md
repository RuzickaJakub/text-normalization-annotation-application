# TNA - Anotační aplikace pro normalizaci textu - Manuál

Anotační aplikace pro vytváření datových sad pro účely normalizace textu s
důrazem na normalizaci čísel.

Předpokládáme, že máte přístup k běžící instanci aplikace.

## Ovládání aplikace

**Přihlášení**

1. Otevřete si aplikaci v prohlížečí.
2. V pravém horním rohu klikněte na možnost přihlášení.
3. Vyplňte své přihlašovací jméno (přidělené administrátorem).

**Nahrání datasetu**

1. Na horní liště vyberte záložku _Datasety_.
2. Zvolte možnost _Nahrát dataset_ a vyberte soubor s příponou _.txt_ obsahující
   věty určené pro anotaci.
3. Pokud se _Dataset_ neobjeví automaticky, klikněte na tlačítko obnovit.

**Výběr datasetu**

1. Na horní liště vyberte záložku _Datasety_.
2. Všechny zadané datasety jsou zobrazeny v seznamu společně s celkovým počtem
   vět a počtem již anotovaných vět.
3. Anotování započnete kliknutím na ikonu start ( |--> svislá linka s šipkou
   směrem vpravo ).
4. Po vybrání datasetu se přeneseme do anotačního okna, na větu, která je v
   pořadí tolikátá, kolik je již anotovaných vět. Předpokládá se postupný
   průchod od první věty do poslední.

**Anotace**

1. Máme otevřený vybraný dataset.
2. Pod lištou máme pořadí věty v datasetu a název dataset. Dále níže je editor s
   originální větou, tlačítka pro pohyb v aplikaci. Případně i již vybrané
   části věty (tokeny) s normalizovanou formou a kategorií, do které patří.
3. Myší označíme část textu, která vyžaduje normalizaci.
4. Po výběru se nám otevře okno, kde vyplníme, jak vypadá znormalizovaná forma a
   vybereme kategorii.
5. Uložíme změny, které se hned označí v původní větě a vybraný výraz se
   zadanými podrobnostmi se přidá do seznamu výrazů vyžadujících normalizaci.
6. Po vybrání všech výrazů změny uložíme, kliknutím na tlačítko uložit.
7. Pokračujeme na další větu.

**Export dat**

1. Na záložce _Datasety_ klikneme na tlačítko _Stáhnout data_.
2. Všechny datasety i uložené anotace ve formátu JSON jsou staženy na počítač ve
   formě zip archivu.

**Import dat**

1. Na počítači máme uložen zip archive vyexportovaný z aplikace.
2. Na záložce _Datasety_ klikneme na tlačítko _Nahrát dataset_.
3. Vybereme zip archive z našeho počítače.
4. Datasety i anotace z archivu jsou nahrány na náš účet.

## Semiotické třídy / Kategorie

Následující přehled zmiňuje všechny kategorie, které je možné anotovat. V
případě, že žádná možnost neodpovídá, pak zvolte možnost _jiné_ (_other_), které
je v přehledu zmíněno úplně na konci. U každé kategorie jsou uvedeny příklady
výrazů z dané kategorie a příklady verbalizací - jak by se daný výraz přečetl.

### Základní funkce (Base features)

- základní číslovka (cardinal number)
  - 1; 100; 35 500; 432, +14, -20
  - `35 -> třicet pět`
- řadová číslovka (ordinal number)
  - 1.; 200.; 321.; _Kapitola_ 8 (_Kapitola_ není součástí čísla)
  - `321. -> tří stý dvacátý první`
- desetinné číslo (decimal number)
  - 1,123; 3,14; -14,1; 2.71 (with dot not correct in czech but used)
  - `2,5 -> dva a půl`
  - `14,2 -> čtrnáct celých dvě desetiny`
  - `1,123 -> jedna celá sto dvacet tři`
  - `-3.43 -> mínus tři celé čtyřicet tři`
- sekvence číslic (digit sequence)
  - 041
  - `041 -> nula čtyři jedna`
- datum (date)
  - `12.` března; 12.10.2021; 10/12/2022; 2/10
  - `12.10.2021 -> dvanáctého října dva tisíce dvacet jedna`
  - `1/2/1990 -> prvního druhý devatenáct set devadesát`
- čas (time)
  - 13:20; 01:12; 9.45; 5'30"; 3h10m
  - `13:20 -> třináct hodin dvacet minut`
  - `9.45 -> devět čtyřicet pět`
  - `5'30'' -> pět třicet`
- míra (measure)
  - 100 m; 40 km/h; 90°; 2,8 g/cm3; 3×10−6 m/s2
  - `100 m -> sto metrů`
  - `2,8 g/cm3 -> dva celá osm gramů na centimetr krychlový`
- peníze (money)
  - $200; 40 CHF; 30 Kč
  - `40 CHF -> čtyřicet Švýcarských franků`
  - `30 Kč -> třicet korun českých`

### Rozšířené funkce - čísla (Extensions - connected to numbers))

- římská číslovka (roman number)
  - _Karel_ V.; V; LCD (_Karel_ není součástí čísla)
  - `V. -> pátý`
- telefonní číslo (telephone number)
  - +420 604 586 567;+49 211 5684962;0211 5684962
  - `+420 604 586 456 -> plus čtyři sta dvacet šest nula čtyři pět osm šest čtyři pět šest`
- skóre (score)
  - 4:4; 10:15;
  - `4:4 -> čtyři čtyři`
  - `10:15 -> deset ku patnácti`
- s příponou (with-suffix)
  - 13roční; 12stupňový; 2x; 2krát; 32bitových; 1,7x
  - `13roční -> třinácti roční`
  - `1,7krát -> jedna celá sedm krát`
- identifikátor (identifier)
  - AK-47; NGC6542; M-IG-48-2; 1080i50; F-1
  - `M-IG-48-2 -> M IG čtyřicet osm dva`
  - `747 -> sedm čtyři sedm`
- smíšené (mixed)
  - x220
  - `x220 -> x dva dva nula`
- rozsah (range)
  - 2019-2022; 40Hz–20kHz; 1913/14; 1917/1918
  - `2019-2022 -> dva tisíce devatenáct až dva tisíce dvacet dva`
  - `40Hz-20kHz -> čtzřicet herzů až dvacet kiloherzů`
- matematický výraz (mathematical expression)
  - (x-1) / (x^2)
  - `(x+1) -> levá závorka x plus jedna pravá závorka`
- chemický výraz (chemical expression)
  - CH4 + 2 O2 → CO2 + 2 H2O; CO2; (CuSO4 · H2O); ribulóza-1,5-bisfosfátu
  - `C3H8 + 5O2 -> 3CO2 + 4H2O -> c tři h osm plus pětkrát o dva se přemění na třikrát c o dva plus čtyřikrát h dvě o`

### Rozšířené funkce - jiné (Extensions - not connected to numbers)

- zkratka (abbreviation)
  - atd.; sv.; s.r.o.; př. n. l.
  - `atd. -> a tak dále`
  - `sv. -> svatý`
  - `př. n. l. -> před naším letopočtem`
- akronym (acronym)
  - ČR; NATO; ISO/IEC
  - `NATO -> nato`
- URL
  - https://example.com; www.root.cz
  - `https://example.com -> HTTPS dvojtečka lomeno lomeno example tečka COM`
  - `www.root.cz -> WWW tečka root tečka CZ`
- email (email)
  - jiri+dva@protonmail.ch
  - `nekdo+dva@matfyz.cz -> nekdo plus dva zavináč matfyz tečka CZ`
  - `karelb.nbk@cuni.cz -> karelb tečka n b k zavináč cuni tečka CZ`
- adresářová cesta (pathname)
  - /root/user; C:\windows\user\
  - `C:\windows\user -> disk C adresář windows user`
  - `/root/var/log -> absolutní cesta root var log`
- vynechané/ignorované (ignored)
  - :-
  - `: -> ` (normalizováno na prázdný řetězec)
- název symbolu (verbatim - special symbol)
  - †, \*
  - `† -> umrtí`
  - `* -> narozena`
- jiné (other)
