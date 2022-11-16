import React from "react";

interface IProps {
  match: number;
}

function LoadingMatch({ match }: IProps) {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-3/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-[#505150]">Match {match}</h1>
          <div className="w-[10rem]">
            <img src={require("../../assets/images/match-loading.png")}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingMatch;
