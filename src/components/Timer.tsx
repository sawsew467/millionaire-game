import React, { useEffect } from "react";

interface IProps {
  countdown: number;

}

function Timer({ countdown}: IProps) {
  
  return (
    <div className="w-10 h-10 rounded-full border-2 border-[#818181] text-center leading-[36px] ml-4">
      {countdown}
    </div>
  );
}

export default Timer;
