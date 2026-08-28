import { useEffect, useRef } from "react";
import { Crown } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
gsap.registerPlugin(ScrollTrigger);

const ThirdSection = () => {
  const sectionRef = useRef(null);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [headerRef.current, performanceCardRef.current],
        {
          opacity: 0,
          y: 30
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
        .to(
          performanceCardRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out"
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 md:py-32 lg:py-40">
      <div className="w-full h-auto flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-4xl">
          {/* Section Header */}
          <div
            ref={headerRef}
            className="w-full text-center mb-12 md:mb-16 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-5">
              <Crown className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
              <span className="text-xs md:text-sm font-bold text-orange-500 uppercase tracking-wider">
                Top Performers
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-black leading-tight mb-4 md:mb-6">
              Our Best <span className="text-orange-500">Painters</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Meet our talented painters delivering exceptional craftsmanship across India.
            </p>
          </div>

          {/* Main Content - Grid Layout */}
          <div className="w-full flex flex-col gap-12 md:gap-16 lg:gap-16">
            {/* Painters Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
              {[
                { initials: 'RK', name: 'Rajesh Kumar', location: 'Patna, Bihar', gradient: 'from-orange-400 to-orange-300' },
                { initials: 'AS', name: 'Arun Singh', location: 'Delhi, India', gradient: 'from-blue-400 to-blue-300' },
                { initials: 'VP', name: 'Vikram Patel', location: 'Mumbai, Maharashtra', gradient: 'from-green-400 to-green-300' },
              ].map((painter) => (
                <div
                  key={painter.name}
                  className="w-full bg-white rounded-3xl p-8 md:p-8 lg:p-10 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className={`w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-linear-to-br ${painter.gradient} flex items-center justify-center mx-auto mb-6 md:mb-5 lg:mb-6 shadow-lg`}>
                    <span className="text-2xl md:text-xl lg:text-2xl font-black text-white">{painter.initials}</span>
                  </div>
                  <h3 className="text-lg md:text-lg lg:text-xl font-bold text-black mb-2">
                    {painter.name}
                  </h3>
                  <p className="text-sm md:text-sm lg:text-base text-gray-600">
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
              <div className="w-full bg-white rounded-3xl p-8 md:p-10 border border-gray-100 hover:shadow-lg transition-all duration-300">
                {/* Header */}
                <div className="mb-6 md:mb-8 text-center">
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-black mb-2 md:mb-3">
                    Performance <span className="text-orange-500">Overview</span>
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Monthly project performance
                  </p>
                </div>

                {/* Chart Container */}
                <div
                  ref={chartRef}
                  className="w-full h-72 md:h-80 lg:h-96 mb-8 md:mb-10"
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
