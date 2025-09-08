'use client';
import { useState } from 'react';
import qrcode from "../../images/download.png"
import Image from 'next/image';
import { useAnalytics } from '../../hooks/useAnalytics';

const DonateButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const { trackDonateClick } = useAnalytics();

  return (
    <>
      {/* Floating Support Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => {
            trackDonateClick();
            setShowModal(true);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-2 border-2 border-white/30 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, #CD1C18 0%, #9B1313 100%)',
            boxShadow: '0 10px 30px rgba(205, 28, 24, 0.5)',
          }}
        >
          {/* Heart Icon */}
          <svg
            className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'scale-125 text-pink-200' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          
          <span className="font-bold text-sm whitespace-nowrap">
            {isHovered ? 'Support Us' : 'Donate'}
          </span>

          {/* Animated glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 blur-sm"
            style={{ backgroundColor: '#CD1C18' }}
          ></div>
          
          {/* Ripple animation */}
          <div className="absolute inset-0 rounded-full border-2 border-red-300 opacity-0 group-hover:opacity-60 group-hover:scale-150 transition-all duration-700"></div>
        </button>
      </div>

      {/* Support Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden transform transition-all duration-300 scale-100"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
              border: '1px solid rgba(205, 28, 24, 0.1)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Section */}
            <div className="p-8 text-center border-b border-gray-100">
              <div className="mb-6">
                <div 
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(205, 28, 24, 0.1) 0%, rgba(155, 19, 19, 0.05) 100%)',
                    border: '2px solid rgba(205, 28, 24, 0.2)'
                  }}
                >
                  <svg className="w-10 h-10" style={{ color: '#CD1C18' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl font-black mb-3" style={{ color: '#1a1a1a' }}>
                Support Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Help us continue bringing you the best protein supplement deals. Your contribution keeps our platform free and helps us find even better savings for the fitness community.
              </p>
            </div>

            {/* Donation Options */}
            <div className="">
                <div className='text-center flex justify-center my-4'>
                <Image src={qrcode} />
              </div>
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#1a1a1a' }}>
                sahilkargutkar.sk-1@okaxis
              </h3>
              
              {/* Amount Grid */}
              {/* <div className="grid grid-cols-2 gap-4 mb-8">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => handleDonationClick(amount.value)}
                    className="group relative py-4 px-6 rounded-2xl border-2 font-bold text-center transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center"
                    style={{
                      borderColor: '#CD1C18',
                      color: '#CD1C18',
                      background: 'linear-gradient(145deg, rgba(205, 28, 24, 0.02) 0%, rgba(205, 28, 24, 0.08) 100%)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #CD1C18 0%, #9B1313 100%)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(145deg, rgba(205, 28, 24, 0.02) 0%, rgba(205, 28, 24, 0.08) 100%)';
                      e.target.style.color = '#CD1C18';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <img 
                      src={qrcode}
                      alt="Download"
                      className="w-8 h-8 mb-2 object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <div className="text-2xl font-black mb-1" style={{ display: 'none' }}>{amount.label}</div>
                    <div className="text-xs opacity-70">
                      {amount.value === 5 ? 'Coffee Fund' :
                       amount.value === 10 ? 'Server Costs' :
                       amount.value === 25 ? 'Development' :
                       amount.value === 50 ? 'Growth Fund' : 'Major Support'}
                    </div>
                  </button>
                ))}
              </div> */}

              {/* Custom Amount */}
              {/* <button
                onClick={() => {
                  const customAmount = prompt('Enter your desired donation amount:');
                  if (customAmount && !isNaN(customAmount)) {
                    handleDonationClick(parseInt(customAmount));
                  }
                }}
                className="w-full py-4 px-6 rounded-2xl border-2 font-bold text-center transition-all duration-300 hover:scale-105 mb-6"
                style={{
                  borderColor: '#CD1C18',
                  color: '#CD1C18',
                  background: 'linear-gradient(145deg, rgba(205, 28, 24, 0.02) 0%, rgba(205, 28, 24, 0.08) 100%)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #CD1C18 0%, #9B1313 100%)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(145deg, rgba(205, 28, 24, 0.02) 0%, rgba(205, 28, 24, 0.08) 100%)';
                  e.target.style.color = '#CD1C18';
                }}
              >
                💰 Custom Amount
              </button> */}

              {/* Benefits Section */}
              <div className="text-center py-4">
                <p className="text-xs text-gray-500 mb-4">
                  🔒 Secure donation • 💝 No recurring charges • ⚡ Instant gratitude
                </p>
                
                <div className="flex justify-center space-x-6 text-xs text-gray-400">
                  <span>🛡️ Secure</span>
                  <span>🚀 Fast</span>
                  <span>❤️ Appreciated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateButton;
