"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FaBook } from "react-icons/fa6";
import Rules from "@ZCHESS/components/Rules";

export default function Home() {
  const router = useRouter();

  const [rules, setRules] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const usernick = sessionStorage.getItem("nickname");
    const usercolor = sessionStorage.getItem("color");

    if (usernick && usercolor) {
      router.push(`/game`);
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleRandom = () => {
    const colors = ["w", "b"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  const handlePlay = () => {
    if (!nickname) {
      alert("Please enter a nickname");
      return;
    }
    if (!color) {
      alert("Please choose a color");
      return;
    }

    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("color", color);

    router.push(`/game`);
  };

  if (loading) {
    return <div className="text-white text-2xl">Loading</div>;
  }

  return (
    <>
      <div className="fixed top-6 left-6">
        <FaBook
          color="#fff"
          size={24}
          onClick={() => setRules(true)}
          className="cursor-pointer"
        />
      </div>

      {rules && <Rules setRules={() => setRules(false)} />}

      <div
        className="w-full h-full relative flex items-center justify-center"
        style={{ color: "#393939" }}
      >
        <div className="bg-white w-[30%] p-8 flex flex-col gap-4">
          <div className="text-3xl text-center mb-6">Welcome to ZChess!</div>
          <div className="w-full flex-col">
            <div className="text-xl w-full">Choose your nickname</div>
            <input
              type="text"
              className="w-full p-4 mt-4 border-2 border-[#393939] outline-none"
              placeholder="Nickname"
              value={nickname}
              onChange={handleNickname}
            />
          </div>
          <div className="w-full flex-col">
            <div className="text-xl w-full mt-4">Choose your color</div>
            <ul className="w-full flex items-center justify-evenly">
              <li className="flex justify-center space-x-4 mt-4">
                <button
                  className={`bg-white w-[120px] p-2 border-2 border-[#393939] ${color === "w" ? "opacity-100" : "opacity-25"}`}
                  onClick={() => setColor("w")}
                >
                  White
                </button>
              </li>
              <li className="flex justify-center space-x-4 mt-4">
                <button
                  className={`bg-[#393939] w-[120px] p-2 text-white ${color === "b" ? "opacity-100" : "opacity-25"}`}
                  onClick={() => setColor("b")}
                >
                  Black
                </button>
              </li>
              <li className="flex justify-center space-x-4 mt-4">
                <button
                  className={`w-[120px] p-2 text-[#393939]`}
                  onClick={() => handleRandom()}
                >
                  Random
                </button>
              </li>
            </ul>
          </div>
          <div className="flex justify-center space-x-4 mt-6 w-full">
            <button
              className="mt-4 bg-[#393939] w-full p-2 text-white"
              onClick={() => handlePlay()}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
