import React from "react";
import { decode } from "html-entities";

interface IProps {
  answers: {
      id: number;
      answer: string;
    }[];
  choosen: number;
  setChoosen: React.Dispatch<React.SetStateAction<number>>
}

function AnswerList({answers, choosen, setChoosen}: IProps) {
return (
  <ul className="lg:w-3/5 md:w-3/5 w-full flex flex-col gap-2 mx-auto">
    {answers.map((item, index) => (
      <li
        className={
          index === choosen
            ? "flex flex-row items-center text-lg bg-[#818181] text-[#fff] border-2 border-[#818181] px-2 cursor-pointer"
            : "flex flex-row items-center text-lg text-[#818181] border-2 border-[#818181] px-2 cursor-pointer"
        }
        key={index}
        onClick={
          index !== choosen ? () => setChoosen(index) : () => setChoosen(-1)
        }
      >
        <div
          className={
            index === choosen
              ? "w-4 h-4 mr-2 rounded-full border-2 border-[#fff]"
              : "w-4 h-4 mr-2 rounded-full border-2 border-[#888]"
          }
        ></div>
        <p className="w-11/12">{decode(item.answer)}</p>
      </li>
    ))}
  </ul>
);
}

export default AnswerList;
