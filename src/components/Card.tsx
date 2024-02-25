// components/Card.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectTheme } from "@/store/reducers/themeReducer";

export interface CardProps {
  id: string;
  heading: string;
  description: string;
  price: number;
  thumbnail: any;
  display?: any;
}
const Card: React.FC<CardProps> = ({
  id,
  heading,
  description,
  thumbnail,
  price,
  display,
}) => {
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const theme = useSelector(selectTheme);
  const renderRichText = (content: any) => {
    if (!content || !content.content) return null;
    console.log("thumbnail", heading);
    return content.content.map((node: any, index: number) => {
      if (node.nodeType === "paragraph") {
        return (
          <p key={index} className="text-gray-700 text-base">
            {node.content.map((innerNode: any, innerIndex: number) => {
              if (innerNode.nodeType === "text") {
                return (
                  <span key={innerIndex}>
                    {innerNode.marks &&
                    innerNode.marks.some(
                      (mark: any) => mark.type === "bold"
                    ) ? (
                      <strong>{innerNode.value}</strong>
                    ) : (
                      innerNode.value
                    )}
                  </span>
                );
              }
              return null;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <div
        className={`max-w-sm rounded overflow-hidden shadow-lg m-4 border ${
          currentTheme === "light" ? "border-gray-300" : "border-gray-600"
        } cursor-pointer`}
      >
        <div className="relative w-full h-64">
          {!display ? (
            ""
          ) : (
            <Image
              src={`https:${thumbnail[0]?.fields?.file.url}`}
              alt={heading}
              layout="fill"
              className="rounded-t"
              placeholder="blur"
              blurDataURL={`https:${thumbnail[0]?.fields?.file.url}`}
              loading="lazy" // Enable lazy loading
            />
          )}
        </div>
        <div
          className={`px-6 py-4 ${
            currentTheme === "light" ? "text-gray-800" : "text-gray-300"
          }`}
        >
          <div className="font-bold text-xl mb-2">{heading}</div>
          {renderRichText(description)}
          <p
            className={`text-base ${
              currentTheme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            ${price}
          </p>
        </div>
        <div
          className={`font-bold text-xl mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          } px-4 py-2`}
        >
          {theme === "dark" ? "Using:- Dark Theme" : "Using:- Light Theme"}
        </div>

        {!display ? (
          ""
        ) : (
          
            <Link  href={`/product/${id}`}>
                <div className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go To Details
                </div>
                </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
