import React from "react";
import { CheckCircle } from "lucide-react";

const FilterCards = ({ filterCards, selectedType, onSelectType }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {filterCards.map((card) => {
        const Icon = card.icon;
        const isActive = selectedType === card.id;

        return (
          <button
            key={card.id}
            onClick={() => onSelectType(card.id)}
            className={`p-6 rounded-xl border transition-all duration-300 text-left ${
              isActive
                ? `${card.borderColor} ${card.bgColor}`
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Icon className={`w-8 h-8 ${isActive ? card.textColor : "text-gray-400"}`} />
                <div>
                  <p
                    className={`text-sm font-bold uppercase tracking-wide ${
                      isActive ? card.textColor : "text-gray-500"
                    }`}
                  >
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {card.count}
                  </p>
                </div>
              </div>
              {isActive && (
                <CheckCircle className={`w-6 h-6 ${card.textColor}`} />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FilterCards;
