
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { StatsCard } from "@/components/layouts/StatsCard";
import  RecentOrders  from "@/components/layouts/RecentOrders";
import { SalesChart } from "@/components/layouts/SalesChart";
import { TopProducts } from "@/components/layouts/TopProduct";
import { ShoppingBag, User, BarChart, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
          <p className="text-gray-500">Thống kê và tình hình kinh doanh của bạn</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Tổng đơn hàng"
            value="1,245"
            description="Tháng 5, 2025"
            icon={<ShoppingBag size={20} className="text-indigo-500" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Khách hàng mới"
            value="342"
            description="Tháng 5, 2025"
            icon={<User size={20} className="text-blue-500" />}
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatsCard
            title="Doanh thu"
            value="82,694,500đ"
            description="Tháng 5, 2025"
            icon={<BarChart size={20} className="text-green-500" />}
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatsCard
            title="Tỷ lệ hoàn thành"
            value="97.2%"
            description="30 ngày qua"
            icon={<Calendar size={20} className="text-orange-500" />}
            trend={{ value: 1.2, isPositive: false }}
          />
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <SalesChart />
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <TopProducts />
            <Card className="h-[300px] flex items-center justify-center">
              <p className="text-lg font-medium text-gray-500">Thêm widget</p>
            </Card>
          </div>
        </div>

        <RecentOrders />
      </div>
    </DashboardLayout>
  );
};

export default Home;