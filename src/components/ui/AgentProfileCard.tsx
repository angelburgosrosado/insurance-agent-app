import React from 'react';

interface AgentProfileCardProps {
  name?: string;
  title?: string;
  imageUrl?: string;
  bilingual?: boolean;
  className?: string;
}

export const AgentProfileCard: React.FC<AgentProfileCardProps> = ({
  name = "Angel Burgos",
  title = "Founder, F6D9U / FL License: G328926",
  imageUrl = "/images/angel-burgos.png",
  bilingual = true,
  className = ""
}) => {
  return (
    <div className={`bg-primary text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8 w-full shadow-xl border border-primary/20 ${className}`}>
      <div className="flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-32 h-32 md:w-36 md:h-36 object-cover object-top rounded-2xl shadow-lg border-2 border-secondary/40 bg-white"
        />
      </div>
      <div className="flex flex-col text-center md:text-left justify-center space-y-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h2>
          <p className="text-secondary font-medium mt-2 text-lg">{title}</p>
        </div>
        
        {bilingual && (
          <div className="flex justify-center md:justify-start">
            <span className="inline-flex items-center px-4 py-1.5 rounded text-sm font-semibold bg-secondary/10 border border-secondary text-secondary shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Hablo Español
            </span>
          </div>
        )}
        
        <p className="text-gray-300 mt-2 max-w-2xl leading-relaxed">
          Dedicated to providing expert-led financial assurance, helping you navigate complex life, health, and retirement options with clarity and confidence.
        </p>
      </div>
    </div>
  );
};
