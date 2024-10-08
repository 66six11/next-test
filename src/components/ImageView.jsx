"use client";

import Image from "next/image";
import { createContext, useState, useContext } from "react";

const imgContext = createContext();
const imgsrc = createContext();
export function useImgValue() {
  return useContext(imgContext);
}
export function useImgSrc() {
  return useContext(imgsrc);
}
export default function ImageView({ children }) {
  const [isopen, setIsOpen] = useState(false);
  const [data, setDate] = useState(null);
  const toggleOpen = () => {
    setIsOpen(!isopen);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <imgsrc.Provider value={[data, setDate]}>
      <imgContext.Provider value={[isopen, setIsOpen]}>
        <div
          className={`${
            isopen
              ? "fixed top-0 left-0 flex items-center justify-center size-full z-50 bg-black/15"
              : "absolute"
          }`}
          onClick={toggleOpen}
        >
          <div
            className={`transition delay-75 ease-out duration-300 flex max-[450px]:flex-col ${
              isopen
                ? "scale-100 size-3/4 max-[450px]:size-full relative bg-white dark:bg-slate-900 p-5 rounded-lg"
                : "scale-0"
            }`}
            onClick={stopPropagation}
          >
            <div className="relative aspect-[1/1] w-2/3 h-full max-[450px]:w-full max-[450px]:h-auto">
              <Image
                className="object-contain"
                src={data?.image}
                alt={data?.author}
                fill
              />
            </div>
            <div className="ml-5 max-[450px]:ml-0 relative grow">
              {
                // TODO: 图片描述
              }
              {data?.description ? data.description : (<p className="text-center text-xl text-black/30 dark:text-white/30">暂无描述</p>)}
              <button
                className="absolute lg:hidden h-10 w-full bg-violet-700/50 right-0 bottom-0 rounded-md"
                onClick={toggleOpen}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
        {children}
      </imgContext.Provider>
    </imgsrc.Provider>
  );
}
