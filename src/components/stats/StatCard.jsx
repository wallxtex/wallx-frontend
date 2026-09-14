import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Color mapping for accent colors with gradient support
const accentColorMap = {
  orange: {
    iconBg: "bg-orange-100",
    iconBorder: "border-orange-200",
    iconText: "text-orange-600",
    ring: "#f97316",
    ringLight: "#fb923c",
    trail: "#fed7aa",
    numberBg: "bg-orange-50",
    numberText: "text-gray-900",
  },
  blue: {
    iconBg: "bg-blue-100",
    iconBorder: "border-blue-200",
    iconText: "text-blue-600",
    ring: "#3b82f6",
    ringLight: "#60a5fa",
    trail: "#bfdbfe",
    numberBg: "bg-blue-50",
    numberText: "text-gray-900",
  },
  green: {
    iconBg: "bg-green-100",
    iconBorder: "border-green-200",
    iconText: "text-green-600",
    ring: "#10b981",
    ringLight: "#34d399",
    trail: "#a7f3d0",
    numberBg: "bg-green-50",
    numberText: "text-gray-900",
  },
  purple: {
    iconBg: "bg-purple-100",
    iconBorder: "border-purple-200",
    iconText: "text-purple-600",
    ring: "#a855f7",
    ringLight: "#c084fc",
    trail: "#e9d5ff",
    numberBg: "bg-purple-50",
    numberText: "text-gray-900",
  },
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  accentColor = "blue",
  isLoading = false,
  refreshProgress = 0,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const [displayProgress, setDisplayProgress] = useState(0);

  const colors = accentColorMap[accentColor] || accentColorMap.blue;

  // Smooth progress animation
  useEffect(() => {
    setDisplayProgress(refreshProgress);
  }, [refreshProgress]);

  // Flash effect when value changes
  useEffect(() => {
    if (
      value !== prevValue &&
      value !== null &&
      value !== undefined &&
      !isLoading
    ) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 500);
      setPrevValue(value);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue, isLoading]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
      </div>
    );
  }

  // Handle unavailable data
  const displayValue =
    value !== null && value !== undefined ? value.toLocaleString() : "—";
  const isUnavailable = value === null || value === undefined;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group">
      {/* Header row: icon + label + enhanced progress ring */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Icon badge with pulse effect */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${colors.iconBg} ${colors.iconBorder} border-2 transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className={`w-7 h-7 ${colors.iconText}`} />
          </div>

          {/* Label */}
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-1">
              {label}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {accentColor === "orange" && "PaintBucket"}
              {accentColor === "blue" && "Store"}
              {accentColor === "green" && "Ticket"}
              {accentColor === "purple" && "MessageSquareMore"}
            </div>
          </div>
        </div>

        {/* Enhanced circular progress ring */}
        <div className="w-16 h-16 flex-shrink-0 relative">
          <CircularProgressbar
            value={isUnavailable ? 0 : displayProgress}
            strokeWidth={10}
            text=""
            styles={buildStyles({
              pathColor: colors.ring,
              trailColor: colors.trail,
              pathTransitionDuration: 0.3,
              rotation: 0,
            })}
          />
          {/* Center percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-bold ${colors.iconText}`}>
              {isUnavailable ? "—" : `${Math.round(displayProgress)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Large stat value with enhanced styling */}
      <div
        className={`inline-flex items-center px-5 py-2.5 rounded-xl ${colors.numberBg} transition-all duration-500 ${
          isFlashing ? "scale-105" : "scale-100"
        }`}
        title={isUnavailable ? "Data unavailable" : undefined}
      >
        <span
          className={`text-4xl font-bold ${colors.numberText} tabular-nums`}
        >
          {displayValue}
        </span>
      </div>

      {/* Subtle refresh indicator */}
      {!isUnavailable && displayProgress > 95 && (
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span>Refreshing...</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
