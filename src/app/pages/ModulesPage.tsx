import { ModulesSection } from "../components/ModulesSection";
import { useTranslation } from "react-i18next";

export function ModulesPage() {
  const { t } = useTranslation();

  return (
    <>
      <ModulesSection />
    </>
  );
}
