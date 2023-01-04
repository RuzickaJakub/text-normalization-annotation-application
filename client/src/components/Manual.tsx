export default function Manual() {
  // From markdown generated using https://markdowntohtml.com/
  return (
    <div style={{ paddingLeft: 30 }}>
    <h1>Anotační framework pro normalizaci textu - Manuál</h1>
    <p>
      Anotační framework pro vytváření anotačních sad pro účely normalizace textu s
      ohledem na normalizaci čísel.
    </p>
      
    <p>Předpokládáme, že máte přístup k běžící instanci anotátoru.</p>
      
    <h2>Ovládání anotátoru</h2>
      
    <p><strong>Přihlášení</strong></p>
      
    <ol>
      <li>Otevřete si v prohlížečí anotátor.</li>
      <li>V pravém horním rohu klikněte na možnost přihlášení.</li>
      <li>Vyplňte své přihlašovací jméno (přidělené administrátorem).</li>
    </ol>
      
    <p><strong>Nahrání datasetu</strong></p>
      
    <ol>
      <li>Na horní liště vyberte záložku <em>Datasety</em>.</li>
      <li>
        Zvolte možnost <em>Nahrát dataset</em> a vyberte soubor s příponou
        <em>.txt</em> obsahující věty určené pro anotaci.
      </li>
      <li>
        Pokud se <em>Dataset</em> neobjeví automaticky, klikněte na tlačítko
        obnovit.
      </li>
    </ol>
      
    <p><strong>Výběr datasetu</strong></p>
      
    <ol>
      <li>Na horní liště vyberte záložku <em>Datasety</em>.</li>
      <li>
        Všechny zadané datasety jsou zobrazeny v seznamu společně s celkovým počtem
        vět a počtem již anotovaných vět.
      </li>
      <li>
        Anotování započnete kliknutím na ikonu start ( |--&gt; svislá linka s šipkou
        směrem vpravo ).
      </li>
      <li>
        Po vybrání datasetu se přeneseme do anotačního okna, na větu, která je v
        pořadí tolikátá, kolik je již anotovaných vět. Předpokládá se postupný
        průchod od první věty do poslední.
      </li>
    </ol>
        
    <p><strong>Anotace</strong></p>
        
    <ol>
      <li>Máme otevřený vybraný dataset.</li>
      <li>
        Pod lištou máme pořadí věty v datasetu a název dataset. Dále níže je editor
        s originální větou, tlačítka pro pohyb v anotátoru. Případně i již vybrané
        části věty (tokeny) s normalizovanou formou a kategorií, do které patří.
      </li>
      <li>Myší označíme část textu, která vyžaduje normalizaci.</li>
      <li>
        Po výběru se nám otevře okno, kde vyplníme, jak vypadá znormalizovaná forma
        a vybereme kategorii.
      </li>
      <li>
        Uložíme změny, které se hned označí v původní větě a vybraný výraz se
        zadanými podrobnostmi se přidá do seznamu výrazů vyžadujících normalizaci.
      </li>
      <li>Po vybrání všech výrazů změny uložíme, kliknutím na tlačítko uložit.</li>
      <li>Pokračujeme na další větu.</li>
    </ol>
        
    <p><strong>Export dat</strong></p>
        
    <ol>
      <li>
        Na záložce <em>Datasety</em> klikneme na tlačítko <em>Stáhnout data</em>.
      </li>
      <li>
        Všechny datasety i uložené anotace ve formátu JSON jsou staženy na počítač
        ve formě zip archivu.
      </li>
    </ol>
        
    <p><strong>Import dat</strong></p>
        
    <ol>
      <li>Na počítači máme uložen zip archive vyexportovaný z annotatoru.</li>
      <li>
        Na záložce <em>Datasety</em> klikneme na tlačítko <em>Nahrát dataset</em>.
      </li>
      <li>Vybereme zip archive z našeho počítače.</li>
      <li>Datasety i anotace z archivu jsou nahrány na náš účet.</li>
    </ol>
        
    <h2>Semiotické třídy / Kategorie</h2>
        
    <p>
      Následující přehled zmiňuje všechny kategorie, které je možné anotovat. V
      případě, že žádná možnost neodpovídá, pak zvolte možnost
      <em>jiné</em> (<em>other</em>), které je v přehledu zmíněno úplně na konci. U
      každé kategorie jsou uvedeny příklady výrazů z dané kategorie a příklady
      verbalizací - jak by se daný výraz přečetl.
    </p>
        
    <h3>Základní funkce (Base features)</h3>
        
    <ul>
      <li>
        základní číslovka (cardinal number)
        <ul>
          <li>1; 100; 35 500; 432, +14, -20</li>
          <li><code>35 -&gt; třicet pět</code></li>
        </ul>
      </li>
      <li>
        řadová číslovka (ordinal number)
        <ul>
          <li>
            1.; 200.; 321.; <em>Kapitola</em> 8 (<em>Kapitola</em> není součástí
            čísla)
          </li>
          <li><code>321. -&gt; tří stý dvacátý první</code></li>
        </ul>
      </li>
      <li>
        desetinné číslo (decimal number)
        <ul>
          <li>1,123; 3,14; -14,1; 2.71 (with dot not correct in czech but used)</li>
          <li><code>2,5 -&gt; dva a půl</code></li>
          <li><code>14,2 -&gt; čtrnáct celých dvě desetiny</code></li>
          <li><code>1,123 -&gt; jedna celá sto dvacet tři</code></li>
          <li><code>-3.43 -&gt; mínus tři celé čtyřicet tři</code></li>
        </ul>
      </li>
      <li>
        sekvence číslic (digit sequence)
        <ul>
          <li>041</li>
          <li><code>041 -&gt; nula čtyři jedna</code></li>
        </ul>
      </li>
      <li>
        datum (date)
        <ul>
          <li><code>12.</code> března; 12.10.2021; 10/12/2022; 2/10</li>
          <li>
            <code>12.10.2021 -&gt; dvanáctého října dva tisíce dvacet jedna</code>
          </li>
          <li>
            <code>1/2/1990 -&gt; prvního druhý devatenáct set devadesát</code>
          </li>
        </ul>
      </li>
      <li>
        čas (time)
        <ul>
          <li>13:20; 01:12; 9.45; 5&#39;30&quot;; 3h10m</li>
          <li><code>13:20 -&gt; třináct hodin dvacet minut</code></li>
          <li><code>9.45 -&gt; devět čtyřicet pět</code></li>
          <li><code>5&#39;30&#39;&#39; -&gt; pět třicet</code></li>
        </ul>
      </li>
      <li>
        míra (measure)
        <ul>
          <li>100 m; 40 km/h; 90°; 2,8 g/cm3; 3×10−6 m/s2</li>
          <li><code>100 m -&gt; sto metrů</code></li>
          <li>
            <code>2,8 g/cm3 -&gt; dva celá osm gramů na centimetr krychlový</code>
          </li>
        </ul>
      </li>
      <li>
        peníze (money)
        <ul>
          <li>$200; 40 CHF; 30 Kč</li>
          <li><code>40 CHF -&gt; čtyřicet Švýcarských franků</code></li>
          <li><code>30 Kč -&gt; třicet korun českých</code></li>
        </ul>
      </li>
    </ul>
        
    <h3>Rozšířené funkce - čísla (Extensions - connected to numbers))</h3>
        
    <ul>
      <li>
        římská číslovka (roman number)
        <ul>
          <li><em>Karel</em> V.; V; LCD (<em>Karel</em> není součástí čísla)</li>
          <li><code>V. -&gt; pátý</code></li>
        </ul>
      </li>
      <li>
        telefonní číslo (telephone number)
        <ul>
          <li>+420 604 586 567;+49 211 5684962;0211 5684962</li>
          <li>
            <code
              >+420 604 586 456 -&gt; plus čtyři sta dvacet šest nula čtyři pět osm
              šest čtyři pět šest</code
            >
          </li>
        </ul>
      </li>
      <li>
        skóre (score)
        <ul>
          <li>4:4; 10:15;</li>
          <li><code>4:4 -&gt; čtyři čtyři</code></li>
          <li><code>10:15 -&gt; deset ku patnácti</code></li>
        </ul>
      </li>
      <li>
        s příponou (with-suffix)
        <ul>
          <li>13roční; 12stupňový; 2x; 2krát; 32bitových; 1,7x</li>
          <li><code>13roční -&gt; třinácti roční</code></li>
          <li><code>1,7krát -&gt; jedna celá sedm krát</code></li>
        </ul>
      </li>
      <li>
        identifikátor (identifier)
        <ul>
          <li>AK-47; NGC6542; M-IG-48-2; 1080i50; F-1</li>
          <li><code>M-IG-48-2 -&gt; M IG čtyřicet osm dva</code></li>
          <li><code>747 -&gt; sedm čtyři sedm</code></li>
        </ul>
      </li>
      <li>
        smíšené (mixed)
        <ul>
          <li>x220</li>
          <li><code>x220 -&gt; x dva dva nula</code></li>
        </ul>
      </li>
      <li>
        rozsah (range)
        <ul>
          <li>2019-2022; 40Hz–20kHz; 1913/14; 1917/1918</li>
          <li>
            <code
              >2019-2022 -&gt; dva tisíce devatenáct až dva tisíce dvacet dva</code
            >
          </li>
          <li><code>40Hz-20kHz -&gt; čtzřicet herzů až dvacet kiloherzů</code></li>
        </ul>
      </li>
      <li>
        matematický výraz (mathematical expression)
        <ul>
          <li>(x-1) / (x^2)</li>
          <li><code>(x+1) -&gt; levá závorka x plus jedna pravá závorka</code></li>
        </ul>
      </li>
      <li>
        chemický výraz (chemical expression)
        <ul>
          <li>
            CH4 + 2 O2 → CO2 + 2 H2O; CO2; (CuSO4 · H2O); ribulóza-1,5-bisfosfátu
          </li>
          <li>
            <code
              >C3H8 + 5O2 -&gt; 3CO2 + 4H2O -&gt; c tři h osm plus pětkrát o dva se
              přemění na třikrát c o dva plus čtyřikrát h dvě o</code
            >
          </li>
        </ul>
      </li>
    </ul>
        
    <h3>Rozšířené funkce - jiné (Extensions - not connected to numbers)</h3>
        
    <ul>
      <li>
        zkratka (abbreviation)
        <ul>
          <li>atd.; sv.; s.r.o.; př. n. l.</li>
          <li><code>atd. -&gt; a tak dále</code></li>
          <li><code>sv. -&gt; svatý</code></li>
          <li><code>př. n. l. -&gt; před naším letopočtem</code></li>
        </ul>
      </li>
      <li>
        akronym (acronym)
        <ul>
          <li>ČR; NATO; ISO/IEC</li>
          <li><code>NATO -&gt; nato</code></li>
        </ul>
      </li>
      <li>
        URL
        <ul>
          <li>https://example.com; www.root.cz</li>
          <li>
            <code
              >https://example.com -&gt; HTTPS dvojtečka lomeno lomeno example tečka
              COM</code
            >
          </li>
          <li><code>www.root.cz -&gt; WWW tečka root tečka CZ</code></li>
        </ul>
      </li>
      <li>
        email (email)
        <ul>
          <li>jiri+dva@protonmail.ch</li>
          <li>
            <code
              >nekdo+dva@matfyz.cz -&gt; nekdo plus dva zavináč matfyz tečka
              CZ</code
            >
          </li>
          <li>
            <code
              >karelb.nbk@cuni.cz -&gt; karelb tečka n b k zavináč cuni tečka
              CZ</code
            >
          </li>
        </ul>
      </li>
      <li>
        adresářová cesta (pathname)
        <ul>
          <li>/root/user; C:\windows\user\</li>
          <li><code>C:\windows\user -&gt; disk C adresář windows user</code></li>
          <li><code>/root/var/log -&gt; absolutní cesta root var log</code></li>
        </ul>
      </li>
      <li>
        vynechané/ignorované (ignored)
        <ul>
          <li>:-</li>
          <li><code>: -&gt; </code> (normalizováno na prázdný řetězec)</li>
        </ul>
      </li>
      <li>
        název symbolu (verbatim - special symbol)
        <ul>
          <li>†, *</li>
          <li><code>† -&gt; umrtí</code></li>
          <li><code>* -&gt; narozena</code></li>
        </ul>
      </li>
      <li>jiné (other)</li>
    </ul>
    </div>
  );
}
