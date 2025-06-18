import { Button } from "@/components/ui/Button"
import { AlertTriangle, Download, Package, Plus, TrendingDown } from 'lucide-react'
import React, { useEffect } from 'react'
import { DashboardLayout } from '../../components/layouts/DashboardLayout'
import { useInventoryData } from '../../hooks/useInventoryData'
import { BelowMinium, OutOfStock, TotalProduct, TotalValues } from '../../services/Stock.Service'
import InventoryTable from './InventoryTable'
import { StockModal } from './ModalComponents'
import QuickActions from './QuickAction'
import RecentMoveMents from './RecentMoveMents'
import StatsCard from './StatsCard'

const InventoryManagement= () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isStockModalOpen, setIsStockModalOpen] = React.useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const { inventoryStats, recentMovements, inventoryData, addStock, removeStock } = useInventoryData();
    const filteredData = inventoryData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    const [ totalProducts, setTotalProducts ] = React.useState([]);
    const [ totalValues, setTotalValues ] = React.useState([]);
    const [ belowMinium, setBelowMinium ] = React.useState([]);
    const [ outOfStock, setOutOfStock ] = React.useState([]);

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount);
    };

    const exportReport = () => {
      const headers = ['ID,Sản phẩm,SKU,Danh mục,Số lượng,Giá,Trạng thái'];
      const rows = inventoryData.map(item =>
        `${item.id},${item.name},${item.sku},${item.category},${item.stock},${item.price},${item.status}`
      );
      const csvContent = [...headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'bao_cao_ton_kho.csv');
      link.click();
      URL.revokeObjectURL(url);
    };


    const handleFetchTotalProduct = async () => {
      try{
        const response = await TotalProduct();
        setTotalProducts(response[0].result)
      } catch(error)
      {
      }
    }

    const handleFetchTotalValues = async () => {
      try{
        const response = await TotalValues();
        setTotalValues(response[0].result)
      } catch(error){
      }
    }

    const handleFetchMinium = async () => {
      try{
        const response = await BelowMinium();
        setBelowMinium(response[0].result)
      } catch(error){
      }
    }

    const handleFetchOutOfStock = async () => {
      try{
        const response = await OutOfStock();
        setOutOfStock(response[0].result)
      }catch(error){
      }
    }

    useEffect(() => {
      handleFetchTotalProduct()
      handleFetchTotalValues()
      handleFetchMinium()
      handleFetchOutOfStock()
    },[])

    return (
      <DashboardLayout>
      <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý Tồn kho</h1>
              <p className="text-gray-600">Theo dõi và quản lý hàng tồn kho của cửa hàng thời trang</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2" onClick ={() => setIsExportModalOpen(true)}>
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </Button>
              <Button className="flex items-center gap-2" onClick={() => setIsStockModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Nhập kho
              </Button>
              <Button className="flex items-center gap-2" onClick={() => setIsExportModalOpen(true)}>
              <Package className="h-4 w-4" />
              Xuất kho
            </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Tổng sản phẩm"
              value={totalProducts}
              description="Các mặt hàng trong kho"
              icon={Package}
            />
            <StatsCard
              title="Tổng sản phẩm"
              value={
                Number(totalValues).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })
              }
              description="Các mặt hàng trong kho"
              icon={Package}
            />
            <StatsCard
              title="Sắp hết hàng"
              value={belowMinium}
              description="Sản phẩm dưới mức tối thiểu"
              icon={AlertTriangle}
              color="yellow"
            />
            <StatsCard
              title="Hết hàng"
              value={outOfStock}
              description="Sản phẩm hết hàng"
              icon={TrendingDown}
              color="red"
            />
          </div>
  
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Inventory Table */}
            <div className="lg:col-span-2">
              <InventoryTable
                data={filteredData}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
              />
            </div>
  
            {/* Sidebar */}
            <div className="space-y-6">
              <RecentMoveMents movements={recentMovements} />
            <QuickActions inventoryData={inventoryData} />
            </div>
          </div>
        </div>
        <StockModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSubmit={addStock}
        products={inventoryData}
        title="Nhập kho"
        submitText="Nhập kho"
      />
      <StockModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onSubmit={removeStock}
        products={inventoryData}
        title="Xuất kho"
        submitText="Xuất kho"
        isExport={true}
      />
      </DashboardLayout>
    );
  }
  export default InventoryManagement;
