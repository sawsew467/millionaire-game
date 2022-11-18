import React from "react";

interface IProps {
  turn: number;
  round: number;
}

function LoadingRound({ turn, round }: IProps) {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-3/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-[#505150]">Loading...</h1>
          <p className="text-lg">round {round}</p>
        </div>
      </div>
    </>
  );
}

export default LoadingRound;
