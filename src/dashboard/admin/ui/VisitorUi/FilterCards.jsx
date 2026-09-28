import React from "react";
import { CheckCircle } from "lucide-react";

const FilterCards = ({ filterCards, selectedType, onSelectType }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {filterCards.map((card) => {
        const Icon = card.icon;
        const isActive = selectedType === card.id;

        return (
          <button
            key={card.id}
            onClick={() => onSelectType(card.id)}
            className={`p-4 sm:p-6 rounded-lg sm:rounded-xl border transition-all duration-300 text-left ${
              isActive
                ? `${card.borderColor} ${card.bgColor}`
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <Icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${isActive ? card.textColor : "text-gray-400"}`}
                />
                <div>
                  <p
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${
                      isActive ? card.textColor : "text-gray-500"
                    }`}
                  >
                    {card.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {card.count}
                  </p>
                </div>
              </div>
              {isActive && (
                <CheckCircle
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${card.textColor}`}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FilterCards;
