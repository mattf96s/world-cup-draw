import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { people, teams, teamsInfo } from "../data";
import { shuffleArray, sliceIntoChunks } from "./utils";
import {
  ArrowPathIcon,
  CalendarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const makeTeams = () => {
  const shuffled = shuffleArray(people);
  const chunks = sliceIntoChunks(shuffled, teams);
  return chunks;
};

const bgReducer = (odds: number) => {
  if (odds <= 1) return "bg-red-500";
  if (odds < 5) return "bg-orange-500";
  if (odds < 10) return "bg-yellow-500";
  return "bg-green-500";
};

const perks = [
  {
    strikeThrough: "Fire an employee",
    prize: "Stacos",
    icon: CalendarIcon,
  },
  {
    strikeThrough: "Rename a segment",
    prize: "Stacos",
    icon: ArrowPathIcon,
  },
  {
    strikeThrough: "Sit in Willem's seat",
    prize: "Stacos",
    icon: TruckIcon,
  },
];

function App() {
  const [shuffled, setShuffled] = useState(() => {
    const initial = makeTeams();
    return Object.entries(initial).reduce((acc, [team, people]) => {
      acc[team] = [];
      return acc;
    }, {} as Record<string, string[]>);
  });

  const onShuffle = () => {
    const newTeams = makeTeams();
    setShuffled(newTeams);

    const fileData = JSON.stringify(newTeams);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "sovtech-world-cup-teams.json";
    link.href = url;
    link.click();
  };

  return (
    <div className="isolate w-[100vw]">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-5xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  World Cup Draw
                </h1>
                <div className="pt-8">
                  <div className="mx-auto max-w-7xl flex w-full justify-center">
                    <h2 className="text-3xl">Prizes</h2>
                  </div>
                  <div className="mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x lg:pt-4 lg:pb-8">
                    {perks.map((perk, perkIdx) => (
                      <div
                        key={perkIdx}
                        className="py-8 lg:w-1/3 lg:flex-none lg:py-0"
                      >
                        <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
                          <div
                            className="flex-shrink-0 text-indigo-400"
                            aria-hidden="true"
                          >
                            {perkIdx + 1}.
                          </div>
                          <div className="ml-4 flex flex-row items-center gap-2">
                            <h3 className="text-gray-300 line-through">
                              {perk.strikeThrough}
                            </h3>
                            <p className="font-medium text-gray-300">
                              {perk.prize}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-center">
                  Please direct complaints to <a>roland@sovtech.com</a>
                </p>
                <div className="my-8 flex gap-x-4 sm:justify-center">
                  <button
                    onClick={onShuffle}
                    type="button"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Get started
                  </button>
                </div>
                <div className="flex">
                  <div className="flex flex-1 w-full">
                    <ul>
                      {Object.entries(shuffled).map(([team, members]) => {
                        const info = teamsInfo[team as keyof typeof teamsInfo];
                        const [denom, num] = info.odds.split("/");
                        const odds = Math.ceil(
                          (Number(num) / Number(denom)) * 100
                        );

                        const bg = bgReducer(odds);
                        return (
                          <div
                            role="list"
                            key={team}
                            className="grid grid-cols-6 gap-2"
                          >
                            <div
                              className={twMerge(
                                "py-2 my-2 px-4 inline-flex items-center bg-white rounded-md text-black min-h-[64px]",
                                bg
                              )}
                            >
                              <div className="inline-flex justify-between w-full">
                                <span>
                                  {team} {info.icon}
                                </span>
                                <span>{`${odds}%`}</span>
                              </div>
                            </div>
                            <div className="col-span-5 flex flex-row gap-2">
                              {members.map((member) => (
                                <div
                                  key={member}
                                  className="py-2 my-2 px-4 bg-white break-keep rounded-md text-black"
                                >
                                  {member}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Person({
  name,
  country,
  countryAvatar,
}: {
  name: string;
  country?: string;
  countryAvatar?: string;
}) {
  return (
    <div
      key={name}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={countryAvatar} alt="" />
      </div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{country ?? ""}</p>
        </a>
      </div>
    </div>
  );
}

export default App;
