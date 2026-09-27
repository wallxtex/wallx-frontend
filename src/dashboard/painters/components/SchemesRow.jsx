import { useEffect, useState } from "react";
import SharedSchemesRow from "../../../components/shared/SharedSchemesRow";
import { getHomeDataHandler } from "../../../services/publicforms/publicForms";

const SchemesRow = ({ hideCreateButton = false }) => {
  const [activeSchemes, setActiveSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await getHomeDataHandler();
        if (response?.success) {
          const data = response.data?.data || response.data;
          // Filter schemes specifically meant for PAINTER if necessary, or pass all
          const schemes = data?.activeSchemes || [];
          setActiveSchemes(schemes);
        }
      } catch (error) {
        console.error("Failed to fetch active schemes:", error);
      }
    };
    fetchSchemes();
  }, []);

  if (!activeSchemes || activeSchemes.length === 0) return null;

  return (
    <SharedSchemesRow
      title="Active Painter Schemes"
      subtitle="सक्रिय पेंटर योजनाएं"
      schemes={activeSchemes}
      type="PAINTER"
      hideCreateButton={hideCreateButton}
    />
  );
};

export default SchemesRow;
