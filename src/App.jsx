import React from 'react'
import Navbar from './components/Navbar'

import HospitalBrands from './components/HospitalBrand'
import HeroSection from './components/HeroSection'
import CriticalSurgeries from './components/CriticalSurgeries'
import WhyChooseUs from './components/WhyChooseUs'
import PartnerHospitals from './components/PartnerHospitals'
import PatientJourney from './components/PatientJourney'
import Footer from './components/Footer'
import TreatmentPackages from './components/TreatmentPackages'

function App() {
  return (
    <div>
     <Navbar/>
     <HospitalBrands/>
     <HeroSection/>
     <CriticalSurgeries/>
     <WhyChooseUs/>
     <PartnerHospitals/>
     <TreatmentPackages/>
     <PatientJourney/>
     <Footer/>
    </div>
  )
}

export default App
