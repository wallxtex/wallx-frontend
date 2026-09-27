import { motion } from "motion/react";
import { Gift, Wallet } from "lucide-react";
import { LuUsers } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getAdminDashboardData } from "../../../services/admin/admin.services";

const StatsRow = () => {

  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAdminDashboardData()
        if (response?.success) {
          const actualData = response.data?.data || response.data
          setDashboardData(actualData)
        }
      }
      catch (error) {
        console.error("Something went wrong in fetching the admin dashboard data -", error)
      }
    }

    fetchDashboardData()
  }, [])

  const stats = [
    {
      label: "Total Painters",
      value: (dashboardData?.totalPainters || 0).toLocaleString(),
      icon: LuUsers,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Redeems",
      value: (dashboardData?.totalCouponRedeemed || 0).toLocaleString(),
      icon: Gift,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Total Redeemed Amount",
      value: (dashboardData?.totalCouponAmount || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
      icon: Wallet,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex items-stretch"
          >
            {/* Icon on the Left covering full height */}
            <div className={` w-20 sm:w-24 flex items-center justify-center shrink-0`}>
              <IconComponent className={`${stat.iconColor} w-8 h-8 sm:w-10 sm:h-10`} />
            </div>

            {/* Details on the Right */}
            <div className="p-4 sm:p-5 flex flex-col justify-center flex-1">
              {/* Label */}
              <div className="text-sm sm:text-base text-gray-500 font-medium">{stat.label}</div>

              {/* Value - Big and glanceable */}
              <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
                {stat.value}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsRow;
