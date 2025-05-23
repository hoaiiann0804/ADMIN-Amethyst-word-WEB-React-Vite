import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GetRevenue } from "../../services/Dashboard.Service";
const dailyData = [
  { name: "T2", sales: 4000 },
  { name: "T3", sales: 3000 },
  { name: "T4", sales: 2000 },
  { name: "T5", sales: 2780 },
  { name: "T6", sales: 1890 },
  { name: "T7", sales: 2390 },
  { name: "CN", sales: 3490 },
];

const weeklyData = [
  { name: "Tuần 1", sales: 12000 },
  { name: "Tuần 2", sales: 19000 },
  { name: "Tuần 3", sales: 9800 },
  { name: "Tuần 4", sales: 15000 },
];

const monthlyData = [
  { name: "T1", sales: 42000 },
  { name: "T2", sales: 35000 },
  { name: "T3", sales: 28000 },
  { name: "T4", sales: 20000 },
  { name: "T5", sales: 18900 },
  { name: "T6", sales: 23900 },
  { name: "T7", sales: 34900 },
  { name: "T8", sales: 37800 },
  { name: "T9", sales: 49000 },
  { name: "T10", sales: 52000 },
  { name: "T11", sales: 78000 },
  { name: "T12", sales: 92000 },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
};

export const SalesChart = () => {
  const [revenue, setRevenue] = useState([]);

  const fetchRevenueData = async () => {
    try {
      const response = await GetRevenue();
      setRevenue(response);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Phân tích doanh thu</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="daily">Ngày</TabsTrigger>
              <TabsTrigger value="weekly">Tuần</TabsTrigger>
              <TabsTrigger value="monthly">Tháng</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              Cập nhật: <span className="text-black">{new Date().toLocaleDateString('vi-VN')}</span>
            </div>
          </div>

          <TabsContent value="daily">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${value / 1000}K`} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${value / 1000}K`} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `${value / 1000}`} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="quantity" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
