"use client";

import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface Woerter {
  [key: string]: { [word: string]: number };
}

export default function Home() {
  const [afd, setAfd] = useState(50);
  const [linke, setLinke] = useState(50);

  const data = [
    { party: "AFD", count: afd },
    { party: "Linke", count: linke },
  ];

  const [word, setWord] = useState("");
  const [woerter, setWoerter] = useState<Woerter | null>(null);

  useEffect(() => {
    fetch("/woerter_klein.json") // Pfad zur JSON-Datei im `public`-Ordner
      .then((response) => response.json())
      .then((jsonData) => {
        setWoerter(jsonData);
      })
      .catch((error) => console.error("Fehler beim Laden der JSON:", error));
  }, []);

  async function getWordCount() {
    if (!word) return;
    if (!woerter) return;
    if (woerter["afd"].hasOwnProperty(word)) {
      setAfd(woerter["afd"][word]);
    } else {
      setAfd(0);
    }
    if (woerter["linke"].hasOwnProperty(word)) {
      setLinke(woerter["linke"][word]);
    } else {
      setLinke(0);
    }
    console.log(data);
  }

  return (
    <>
      <div className="flex items-center justify-center flex-wrap">
        <div className="bg-white md:p-4 md:w-2/3 md:m-8 shadow-md shadow-black rounded flex-wrap flex flex-col items-center justify-center">
          <h1 className="font-dmSerif pb-4">Wahlprogramme</h1>
          <h1 className="font-dmSerif pb-4">Bundestagswahl 2025</h1>
          <div className="p-2">
            <p className="font-dmSerif text-lg">
              Finde heraus, welche Parteien über deine Themen sprechen!
            </p>
            <p className="max-w-[500px] p-2 pb-8">
              Auf dieser Website kannst du die Wahlprogramme aller großen
              Parteien zur kommenden Bundestagswahl nach bestimmten Begriffen
              durchsuchen. Einfach ein Schlagwort eingeben - zum Beispiel
              Klimaschutz, Steuern oder Bildung - und sehen, welche Partei es
              wie oft in ihrem Programm erwähnt. Die Ergebnisse werden als
              Grafik präsentiert, sodass du auf einen Blick erkennen kannst,
              welche Themen für welche Partei besonders wichtig sind.
            </p>
            <p className="font-dbSerif font-bold pb-8">
              Teste es jetzt und entdecke, wer über das spricht, was dir am
              Herzen liegt!
            </p>
          </div>

          <p className="font-dmSerif text-lg">Suche nach einem Begriff</p>
          <input
            className="font-sans rounded p-2 m-4 border-2 border-black"
            placeholder="Wort eingeben"
            onChange={(e) => setWord(e.target.value.toLowerCase())}
          ></input>
          <button
            className="bg-black text-white rounded p-2 mb-4"
            onClick={getWordCount}
          >
            Suchen
          </button>
          <div className="w-full pb-4 mt-4 flex items-center justify-center">
            <BarChart
              dataset={data}
              yAxis={[
                {
                  scaleType: "band",
                  dataKey: "party",
                  colorMap: {
                    type: "ordinal",
                    colors: ["#3794E1", "#D63838"],
                  },
                },
              ]}
              series={[{ dataKey: "count" }]}
              layout={"horizontal"}
              width={330}
              margin={{ left: 40, right: 20, top: 20, bottom: 20 }}
              height={data.length * 80}
            />
          </div>
        </div>
      </div>
    </>
  );
}
