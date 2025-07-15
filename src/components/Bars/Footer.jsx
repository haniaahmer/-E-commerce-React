import React, { useState } from 'react';
import { Send, Phone, Facebook } from 'lucide-react';
import { FaWhatsapp, FaGoogle } from 'react-icons/fa';

export  function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Email submitted:', email);
    setEmail('');
  };

  const footerLinks = [
    {
      title: "Find product",
      items: [
        { name: 'Brownze arnold', url: '/products/brownze-arnold' },
        { name: 'Chronograph blue', url: '/products/chronograph-blue' },
        { name: 'Smart phones', url: '/products/smart-phones' },
        { name: 'Automatic watch', url: '/products/automatic-watch' },
        { name: 'Hair straighteners', url: '/products/hair-straighteners' }
      ]
    },
    {
      title: "Get help",
      items: [
        { name: 'About us', url: '/about' },
        { name: 'Contact us', url: '/contact' },
        { name: 'Return policy', url: '/return-policy' },
        { name: 'Privacy policy', url: '/privacy' },
        { name: 'Payment policy', url: '/payment' }
      ]
    },
    {
      title: "About us",
      items: [
        { name: 'News', url: '/news' },
        { name: 'Service', url: '/service' },
        { name: 'Our policy', url: '/policy' },
        { name: 'Customer care', url: '/customer-care' },
        { name: 'Faq\'s', url: '/faqs' }
      ]
    }
  ];

  return (
    <footer className="bg-sky-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Newsletter Section */}
     <section className="max-w-[1320px] w-full bg-white rounded-[20px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-36 px-6 py-6 mb-10">
  {/* Heading */}
  <h2 className="text-cyan-800 text-2xl lg:text-3xl font-bold font-poppins text-center lg:text-left">
    Subscribe newsletter
  </h2>

  {/* Form + Contact Section */}
  <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 w-full">
    
    {/* Email Input + Button */}
    <div className="relative w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="w-full h-14 lg:h-16 pl-6 pr-16 bg-amber-500 rounded-[20px] text-white text-sm font-semibold placeholder-white focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        aria-label="Subscribe"
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>

    {/* Phone Section */}
    <div className="flex items-center gap-4 text-center lg:text-left">
      <div className="w-10 h-10 flex items-center justify-center">
        <Phone className="w-5 h-5 text-amber-500" />
      </div>
      <p className="text-zinc-600 text-sm font-semibold font-poppins leading-tight">
        Call us 24/7 :<br />
        (+62) 0123 567 789
      </p>
    </div>
  </div>
</section>


      {/* Footer Content - Added mt-10 for top margin */}
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 mt-10">
        {/* Company Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-400 rounded transform rotate-12 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-3xl font-bold text-sky-800">Electon</span>
            </div>
            <address className="text-cyan-800 text-base font-normal font-poppins not-italic">
              64 st james boulevard<br/>hoswick, ze2 7zj
            </address>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full lg:w-64 h-px bg-neutral-400"></div>
            <div className="flex gap-8">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-blue-600 transition-colors">
                <FaGoogle className="w-6 h-6" /> 
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-green-600 transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-cyan-800 text-xl font-semibold font-poppins">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
                    <a href={item.url} className="text-cyan-800 text-lg font-normal font-poppins hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </footer>
  );
}
 
export default Footer;