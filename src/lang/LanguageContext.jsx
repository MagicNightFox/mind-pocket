import {createContext, useContext} from "react";

export const LangContext = createContext(null);
/**
 * @typedef {typeof import("./en.json")} LanguageDict
 */

/**
 * @typedef {Object} LangContextValue
 * @property {LanguageDict} language
 * @property {(lang: "en" | "cs") => void} setLang
 * @property {"en" | "cs"} lang
 */
/**
 *
 * @returns {LangContextValue} language
 */
export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("Must be used with LanguageProvider");
  }
  return context;
}