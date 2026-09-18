import { DEALER_SCHEMES } from "../../../pages/dealers/dealerData";
import SharedSchemesRow from "../../../components/shared/SharedSchemesRow";

const DealerSchemesRow = () => {
  return (
    <SharedSchemesRow
      title="Active Dealer Schemes"
      subtitle="सक्रिय डीलर योजनाएं"
      schemes={DEALER_SCHEMES}
      type="DEALER"
    />
  );
};

export default DealerSchemesRow;
