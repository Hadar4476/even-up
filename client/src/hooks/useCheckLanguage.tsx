import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import commonUtils from "@/utils/common";
import { systemActions } from "@/store/reducers/system";

const useCheckLanguage = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const checkLanguage = () => {
    const language = localStorage.getItem("language");

    if (language) {
      i18n.changeLanguage(language);

      dispatch(systemActions.setLanguage(language));
      dispatch(systemActions.setIsRtl(commonUtils.isRTL(language)));
    }
  };

  return checkLanguage;
};

export default useCheckLanguage;
