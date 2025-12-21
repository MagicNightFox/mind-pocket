
import {LangContext} from "../../lang/LanguageContext.jsx";
import {useMemo, useState} from "react";
import en from "../../lang/en.json"
import cs from "../../lang/cs.json"

const DICTIONARY = {
  en, cs
}
const LanguageProvider = ({children}) => {
  const [lang, setLang] = useState("en");

  /** @type {import("../../lang/en.json")} */
  const language = DICTIONARY[lang] ?? DICTIONARY.en;

  const value = useMemo(() => ({
    lang, setLang, language
  }),[lang, language]);

  return <LangContext.Provider value={value}>
    {children}
  </LangContext.Provider>
}

export default LanguageProvider;