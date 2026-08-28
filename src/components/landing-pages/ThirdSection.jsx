import { useRef } from "react";
import { Crown } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { useSectionAnimation } from "./useSectionAnimation";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ThirdSection = () => {
  const headerRef = useRef(null);
  const performanceCardRef = useRef(null);
  const chartRef = useRef(null);

  // Performance chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Projects Completed",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)"
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)"
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
            weight: "bold"
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 13,
          weight: "bold"
        },
        bodyFont: {
          size: 12
        },
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} projects`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 11
          },
          padding: 8,
          callback: function (value) {
            return value;
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            size: 11
          },
          padding: 8
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };

  const sectionRef = useSectionAnimation(headerRef, performanceCardRef);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="w-full h-auto flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-5xl">
          {/* Section Header */}
          <div
            ref={headerRef}
            className="w-full text-center mb-12 md:mb-16 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4 lg:mb-5">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-500" />
              <span className="text-xs sm:text-sm md:text-sm font-bold text-orange-500 uppercase tracking-wider">
                Top Performers
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-tight mb-4 md:mb-6 lg:mb-8">
              Our Best <span className="text-orange-500">Painters</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              Meet our talented painters delivering exceptional craftsmanship across India.
            </p>
          </div>

          {/* Main Content - Grid Layout */}
          <div className="w-full flex flex-col gap-10 md:gap-12 lg:gap-16">
            {/* Painters Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
              {[
                { initials: 'RK', name: 'Rajesh Kumar', location: 'Patna, Bihar', gradient: 'from-orange-400 to-orange-300' },
                { initials: 'AS', name: 'Arun Singh', location: 'Delhi, India', gradient: 'from-blue-400 to-blue-300' },
                { initials: 'VP', name: 'Vikram Patel', location: 'Mumbai, Maharashtra', gradient: 'from-green-400 to-green-300' },
              ].map((painter) => (
                <div
                  key={painter.name}
                  className="w-full bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-10 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${painter.gradient} flex items-center justify-center mx-auto mb-5 md:mb-6 lg:mb-7 shadow-lg`}>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-white">{painter.initials}</span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-black mb-2">
                    {painter.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600">
                    {painter.location}
                  </p>
                </div>
              ))}
            </div>

            {/* Performance Chart Card */}
            <div
              ref={performanceCardRef}
              className="w-full"
            >
              <div className="w-full bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-10 border border-gray-100 hover:shadow-lg transition-all duration-300">
                {/* Header */}
                <div className="mb-6 md:mb-8 lg:mb-10 text-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-black mb-2 md:mb-3">
                    Performance <span className="text-orange-500">Overview</span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    Monthly project performance
                  </p>
                </div>

                {/* Chart Container */}
                <div
                  ref={chartRef}
                  className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 mb-6 md:mb-8 lg:mb-10"
                >
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;