import { useRef, useState } from "react";

import clickSound from "./assets/click-sound.mp3";

function App() {
  const [buffer, setBuffer] = useState("0");
  const audioRef = useRef(new Audio(clickSound));
  const Key = ({ value }: { value: string }) => {
    return (
      <button
        className={`bg-pink-400 hover:brightness-95 rounded-md transition-colors duration-100 active:transform active:scale-95 text-xs uppercase ${
          value === "+" && "row-span-2"
        }`}
        onClick={() => {
          if (audioRef.current) {
            const audio = audioRef.current;
            audio.pause();
            audio.currentTime = 0;
            audio.play();
          }
        }}
      >
        {value}
      </button>
    );
  };
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-pink-400">
        <section className="flex flex-col gap-4 size-80 rounded-xl bg-pink-300 p-4 shadow-md text-pink-100">
          {/* Display */}
          <div className="y-2 w-full rounded-xl bg-pink-200 px-4 text-right font-display text-4xl">
            {buffer}
          </div>

          {/* Keys */}
          <div className="grid grid-cols-6 h-full gap-2">
            <Key value="off" />
            <Key value="7" />
            <Key value="8" />
            <Key value="9" />
            <Key value="%" />
            <Key value="√" />
            <Key value="♪" />
            <Key value="4" />
            <Key value="5" />
            <Key value="6" />
            <Key value="x" />
            <Key value="÷" />
            <Key value="CE" />
            <Key value="1" />
            <Key value="2" />
            <Key value="3" />
            <Key value="+" />
            <Key value="-" />
            <Key value="on" />
            <Key value="0" />
            <Key value="." />
            <Key value="±" />
            <Key value="=" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
