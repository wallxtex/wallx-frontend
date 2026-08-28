import { Link } from 'react-router-dom'
import logo from '../../assets/webp/wallx_final.webp'

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16 lg:py-20">
        {/* Grid Section - Responsive Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          
          {/* Logo and Company Name */}
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-lg mb-4 sm:mb-5 md:mb-6 flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 shrink-0">
              <Link to="/" className="flex items-center cursor-pointer select-none">
                <img 
                  src={logo} 
                  alt="WallX Logo" 
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
                />
              </Link>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">
              Patel Textures
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed">
              Manufactured by Patel Textures
            </p>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-orange-500">
              Address
            </h4>
            <address className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed not-italic space-y-1 sm:space-y-2">
              <p>123 Textile Street</p>
              <p>Industrial District</p>
              <p>City, State 12345</p>
              <p>Country</p>
            </address>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-orange-500">
              Contact
            </h4>
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <p className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed">
                <span className="text-white font-semibold">Email:</span><br />
                <a href="mailto:info@pateltextures.com" className="hover:text-orange-500 transition-colors duration-300">
                  info@pateltextures.com
                </a>
              </p>
              <p className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed">
                <span className="text-white font-semibold">Phone:</span><br />
                <a href="tel:+15551234567" className="hover:text-orange-500 transition-colors duration-300">
                  +1 (555) 123-4567
                </a>
              </p>
              <p className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed">
                <span className="text-white font-semibold">Website:</span><br />
                <a href="https://www.pateltextures.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors duration-300">
                  www.pateltextures.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 sm:pt-10 md:pt-12 lg:pt-14">
          {/* Bottom Links */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div>
              <h5 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-300">
                Quick Links
              </h5>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-300">
                Company
              </h5>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-300">
                Support
              </h5>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-300">
                Legal
              </h5>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright and Social */}
          <div className="border-t border-gray-700 pt-6 sm:pt-8 md:pt-10 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
              <p className="text-center sm:text-left text-xs sm:text-sm md:text-sm text-gray-400">
                © {new Date().getFullYear()} Patel Textures. All Rights Reserved
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 sm:gap-6">
                <a 
                  href="#facebook" 
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-xs sm:text-sm"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a 
                  href="#twitter" 
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-xs sm:text-sm"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a 
                  href="#instagram" 
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-xs sm:text-sm"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a 
                  href="#linkedin" 
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-xs sm:text-sm"
                  aria-label="LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
