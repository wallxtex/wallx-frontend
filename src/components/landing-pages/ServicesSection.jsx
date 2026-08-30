import ServicesHero from './services/ServicesHero'
import RustProblem from './services/RustProblem'
import TreatmentProcess from './services/TreatmentProcess'
import BeforeAfter from './services/BeforeAfter'
import ProtectionBenefits from './services/ProtectionBenefits'
import ApplicationAreas from './services/ApplicationAreas'
import ProfessionalService from './services/ProfessionalService'
import ServicesCTA from './services/ServicesCTA'

const ServicesSection = () => {
  return (
    <div className="w-full bg-white">
      <ServicesHero />
      <RustProblem />
      <TreatmentProcess />
      <BeforeAfter />
      <ProtectionBenefits />
      <ApplicationAreas />
      <ProfessionalService />
      <ServicesCTA />
    </div>
  )
}

export default ServicesSection
