import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import FreeQuote from './pages/FreeQuote'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Testimonials from './pages/Testimonials'
import Header from './components/Header'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FooterComponent from './components/FooterComponent'
import OurProcess from './pages/OurProcess'
import OurCraftsmanship from './pages/OurCraftsmanship'
import OurTransformations from './pages/OurTransformations'
import GetAFreeEstimate from './pages/GetAFreeEstimate'
import Concrete from './pages/services/Concrete'
import InterlockServices from './pages/services/InterlockServices'
import StoneWalkways from './pages/services/StoneWalkways'
import RetainingWalls from './pages/services/RetainingWalls'
import WoodDecks from './pages/services/WoodDecks'
import Fences from './pages/services/Fences'
import KitchenRenovations from './pages/services/KitchenRenovations'
import HomeAdditions from './pages/services/HomeAdditions'
import BasementRenovations from './pages/services/BasementRenovations'
import BathroomRenovations from './pages/services/BathroomRenovations'
import CustomLandscapes from './pages/services/CustomLandscapes'
import CustomPoolsAndSpas from './pages/services/CustomPoolsAndSpas'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
   return (
      <BrowserRouter>
         <ScrollToTop />
         <Header />
         <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/blog' element={<Blog />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/free-quote' element={<FreeQuote />}></Route>
            <Route path='/gallery' element={<Gallery />}></Route>
            <Route path='/services' element={<Services />}></Route>
            <Route path='/sign-in' element={<SignIn />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
            <Route path='/testimonials' element={<Testimonials />}></Route>
            <Route path='/our-process' element={<OurProcess />}></Route>
            <Route path='/our-craftsmanship' element={<OurCraftsmanship />}></Route>
            <Route path='/our-transformations' element={<OurTransformations />}></Route>
            <Route path='/get-a-free-estimate' element={<GetAFreeEstimate />}></Route>
            <Route path='/concrete' element={<Concrete />}></Route>
            <Route path='/interlock-services' element={<InterlockServices />} />
            <Route path='/stone-walkways' element={<StoneWalkways />} />
            <Route path='/retaining-walls' element={<RetainingWalls />} />
            <Route path='/wood-decks' element={<WoodDecks />} />
            <Route path='/fences' element={<Fences />} />
            <Route path='/kitchen-renovations' element={<KitchenRenovations />} />
            <Route path='/home-additions' element={<HomeAdditions />} />
            <Route path='/basement-renovations' element={<BasementRenovations />} />
            <Route path='/bathroom-renovations' element={<BathroomRenovations />} />
            <Route path='/custom-landscapes' element={<CustomLandscapes />} />
            <Route path='/custom-pools-spas' element={<CustomPoolsAndSpas />} />
         </Routes>
         <FooterComponent className="w-full " />
      </BrowserRouter>
   )
}
