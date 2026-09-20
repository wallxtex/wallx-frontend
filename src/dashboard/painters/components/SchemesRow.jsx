import { PAINTER_SCHEMES } from "../../../pages/painter/component/painterData";
import SharedSchemesRow from "../../../components/shared/SharedSchemesRow";

const SchemesRow = ({ hideCreateButton = false }) => {
  return (
    <SharedSchemesRow
      title="Active Painter Schemes"
      subtitle="सक्रिय पेंटर योजनाएं"
      schemes={PAINTER_SCHEMES}
      type="PAINTER"
      hideCreateButton={hideCreateButton}
    />
  );
};

export default SchemesRow;
