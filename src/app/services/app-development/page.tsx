import AppDevelopmentClient from "./AppDevelopmentClient";
import FAQServer from "./sections/FAQServer";

export default function AppDevelopmentPage() {
  return <AppDevelopmentClient faqSlot={<FAQServer />} />;
}
