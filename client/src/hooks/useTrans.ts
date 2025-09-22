import { TranslationKeys } from "@/locales/i18n";

import { useTranslation } from "react-i18next";

const useTrans = () => {
  const { t: _t } = useTranslation();

  const t = (key: TranslationKeys, args?: any): string => {
    return _t(key, args).toString();
  };

  return t;
};

export default useTrans;
