
import {LangContext} from "../../lang/LanguageContext.jsx";
import {useMemo, useState} from "react";
import en from "../../lang/en.json"
import cs from "../../lang/cs.json"
import {useAuth} from "../../context/AuthContext.jsx";

const LanguageProvider = ({children}) => {
  const {user} = useAuth();
  const [lang, setLang] = useState(user?.preferences?.language || "en");

  let DICTIONARY = {
    en, cs
  }

  /** @type {import("../../lang/en.json")} */
  const t = DICTIONARY[lang] ?? DICTIONARY.en;

  const value = useMemo(() => ({
    lang, setLang, t
  }),[lang, t]);

  return <LangContext.Provider value={value}>
    {children}
  </LangContext.Provider>
}

export default LanguageProvider;