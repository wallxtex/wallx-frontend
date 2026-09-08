import { Link } from 'react-router-dom'
import logo from '../../assets/webp/wallx_final.webp'

const FooterSection = () => {
  return (
    <footer className="bg-gray-950 text-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img
                  src={logo}
                  alt="WallX Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold">Patel Textures</h3>
            </Link>
            <p className="text-gray-400 text-sm">Rust treatment & protective coatings</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold mb-3 text-white">Quick Links</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-red-500 transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-semibold mb-3 text-white">Contact</h5>
            <div className="space-y-1 text-sm text-gray-400">
              <p><a href="mailto:info@pateltextures.com" className="hover:text-red-500 transition-colors">info@pateltextures.com</a></p>
              <p><a href="tel:+15551234567" className="hover:text-red-500 transition-colors">+1 (555) 123-4567</a></p>
            </div>
          </div>

          {/* Legal & Social */}
          <div>
            <h5 className="text-sm font-semibold mb-3 text-white">Legal</h5>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
              <li><Link to="/privacy" className="hover:text-red-500 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-red-500 transition-colors">Terms</Link></li>
            </ul>
            <div className="flex gap-3">
              <a href="#facebook" className="text-gray-400 hover:text-red-500 transition-colors text-sm" aria-label="Facebook">f</a>
              <a href="#twitter" className="text-gray-400 hover:text-red-500 transition-colors text-sm" aria-label="Twitter">𝕏</a>
              <a href="#instagram" className="text-gray-400 hover:text-red-500 transition-colors text-sm" aria-label="Instagram">📷</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-400">
            © {new Date().getFullYear()} Patel Textures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
