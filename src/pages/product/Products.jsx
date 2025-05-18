import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/Button";
import useToast from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/DiaLog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs";
import { PlusCircle } from "lucide-react";
import { ProductForm } from "@/pages/product/ProductForm";
import { DeleteProductDialog } from "@/pages/product/DeleteProductDialog";
import { ProductsFilter } from "@/pages/product/ProductsFilter";
import { ProductsGrid } from "@/pages/product/ProductsGrid";
import { ProductsList } from "@/pages/product/ProductsList";
import { ProductsPagination } from "@/pages/product/ProductsPagination";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productToEdit, setProductToEdit] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const { toast } = useToast();
  
  // Dữ liệu mẫu cho danh mục
  const categories = [
    { id: 1, name: "Áo Nam", products: 42, created: "15/04/2025", status: "Hiển thị", isActive: true },
    { id: 2, name: "Quần Nam", products: 38, created: "16/04/2025", status: "Hiển thị", isActive: true },
    { id: 3, name: "Áo Nữ", products: 56, created: "10/04/2025", status: "Hiển thị", isActive: true },
    { id: 4, name: "Quần Nữ", products: 44, created: "12/04/2025", status: "Hiển thị", isActive: true },
    { id: 5, name: "Phụ Kiện", products: 27, created: "05/04/2025", status: "Hiển thị", isActive: true },
    { id: 6, name: "Giày Nam", products: 31, created: "22/04/2025", status: "Hiển thị", isActive: true },
    { id: 7, name: "Giày Nữ", products: 29, created: "24/04/2025", status: "Ẩn", isActive: false },
    { id: 8, name: "Túi Xách", products: 18, created: "01/05/2025", status: "Hiển thị", isActive: true },
  ];

  // Dữ liệu mẫu cho sản phẩm
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Áo Sơ Mi Nam Trắng",
      image: "/placeholder.svg",
      price: 450000,
      category: "Áo Nam",
      stock: 25,
      status: "Còn hàng",
      description: "Áo sơ mi nam chất liệu cotton thoáng mát, phù hợp với nhiều dịp khác nhau."
    },
    {
      id: 2,
      name: "Quần Jeans Slim Fit",
      image: "/placeholder.svg",
      price: 650000,
      category: "Quần Nam",
      stock: 18,
      status: "Còn hàng",
      description: "Quần jeans nam ôm dáng, co giãn tốt, dễ kết hợp với nhiều loại áo."
    },
    {
      id: 3,
      name: "Áo Thun Nữ Cổ Tròn",
      image: "/placeholder.svg",
      price: 300000,
      category: "Áo Nữ",
      stock: 32,
      status: "Còn hàng",
      description: "Áo thun nữ chất liệu cotton, kiểu dáng đơn giản, dễ phối đồ."
    },
    {
      id: 4,
      name: "Đầm Suông Dáng Dài",
      image: "/placeholder.svg",
      price: 850000,
      category: "Váy Nữ",
      stock: 10,
      status: "Còn hàng",
      description: "Đầm suông dài thoải mái, phong cách thanh lịch, thích hợp cho nhiều dịp."
    },
    {
      id: 5,
      name: "Áo Khoác Denim Unisex",
      image: "/placeholder.svg",
      price: 750000,
      category: "Áo Khoác",
      stock: 15,
      status: "Còn hàng",
      description: "Áo khoác denim phù hợp cả nam và nữ, thiết kế hiện đại, bền đẹp theo thời gian."
    },
    {
      id: 6,
      name: "Giày Thể Thao Nam",
      image: "/placeholder.svg",
      price: 950000,
      category: "Giày Nam",
      stock: 8,
      status: "Còn hàng",
      description: "Giày thể thao nam đế cao su, nhẹ, êm ái, thích hợp đi thường ngày."
    },
    {
      id: 7,
      name: "Túi Xách Thời Trang",
      image: "/placeholder.svg",
      price: 1250000,
      category: "Phụ Kiện",
      stock: 5,
      status: "Còn hàng",
      description: "Túi xách nữ chất liệu da cao cấp, thiết kế sang trọng, nhiều ngăn tiện dụng."
    },
    {
      id: 8,
      name: "Quần Tây Công Sở",
      image: "/placeholder.svg",
      price: 550000,
      category: "Quần Nam",
      stock: 0,
      status: "Hết hàng",
      description: "Quần tây nam công sở, thiết kế vừa vặn, chất liệu cao cấp, dễ phối đồ."
    },
    {
      id: 9,
      name: "Quần Tây Công Sở",
      image: "/placeholder.svg",
      price: 550000,
      category: "Quần Nam",
      stock: 0,
      status: "Hết hàng",
      description: "Quần tây nam công sở, thiết kế vừa vặn, chất liệu cao cấp, dễ phối đồ."
    },
    {
      id: 10,
      name: "Quần Tây Công Sở",
      image: "/placeholder.svg",
      price: 550000,
      category: "Quần Nam",
      stock: 0,
      status: "Hết hàng",
      description: "Quần tây nam công sở, thiết kế vừa vặn, chất liệu cao cấp, dễ phối đồ."
    },
    // {
    //   id: 11,
    //   name: "Quần Tây Công Sở",
    //   image: "/placeholder.svg",
    //   price: 550000,
    //   category: "Quần Nam",
    //   stock: 0,
    //   status: "Hết hàng",
    //   description: "Quần tây nam công sở, thiết kế vừa vặn, chất liệu cao cấp, dễ phối đồ."
    // },
    // {
    //   id: 12,
    //   name: "Quần Tây Công Sở",
    //   image: "/placeholder.svg",
    //   price: 550000,
    //   category: "Quần Nam",
    //   stock: 0,
    //   status: "Hết hàng",
    //   description: "Quần tây nam công sở, thiết kế vừa vặn, chất liệu cao cấp, dễ phối đồ."
    // },
    // {
    //   id: 13,
    //   name: "Quần Tây Công Sở",
    //   image: "/placeholder.svg",
    //   price: 550000,
    //   category: "Quần Nam",
    //   stock: 0,
    //   status: "Hết hàng",
    //   description: "Quần tây nam công sở, thiết kế vừa vặn, chất liệu cao cấp, dễ phối đồ."
    // },
  ]);

  
  const handleApplyFilter = (filterOptions) => {
    const { min, max } = filterOptions.priceRange;
    
    if (min !== "" && max !== "" && Number(min) > Number(max)) {
      toast({
        title: "Lỗi",
        description: "Giá tối thiểu không thể lớn hơn giá tối đa",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedCategory(filterOptions.category);
    setPriceRange(filterOptions.priceRange);
    
    toast({
      title: "Đã áp dụng bộ lọc",
      description: "Các tiêu chí lọc đã được cập nhật.",
    });
  };

    // Lọc sản phẩm theo từ khóa tìm kiếm và danh mục
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
      
      const matchesPrice = (
        (priceRange.min === "" || product.price >= Number(priceRange.min)) &&
        (priceRange.max === "" || product.price <= Number(priceRange.max))
      );
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  // Format giá tiền VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + "đ";
  };



  // Xử lý thêm sản phẩm mới
  const handleAddProduct = (newProduct) => {
    const highestId = products.reduce((max, product) => Math.max(max, product.id), 0);
    const productToAdd = {
      id: highestId + 1,
      ...newProduct,
      status: newProduct.stock > 0 ? "Còn hàng" : "Hết hàng"
    };
    
    setProducts([...products, productToAdd]);
    setIsAddDialogOpen(false);
    toast({
      title: "Thêm sản phẩm thành công",
      description: `Đã thêm "${newProduct.name}" vào danh sách sản phẩm.`
    });
  };

  // Xử lý cập nhật sản phẩm
  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map(product => {
      if (product.id === updatedProduct.id) {
        return {
          ...updatedProduct,
          status: updatedProduct.stock > 0 ? "Còn hàng" : "Hết hàng"
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setProductToEdit(null);
    toast({
      title: "Cập nhật thành công",
      description: `Sản phẩm "${updatedProduct.name}" đã được cập nhật.`
    });
  };

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
    toast({
      title: "Xóa sản phẩm thành công",
      description: "Sản phẩm đã được xóa khỏi danh sách."
    });
  };

  // Xử lý khi nhấn nút sửa sản phẩm
  const handleEditProduct = (product) => {
    setProductToEdit(product);
  };

  // Xử lý khi nhấn nút xóa sản phẩm
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  // Helper function để lọc sản phẩm theo trạng thái cho các tab
  const filterProductsByStatus = (products, status) => {
    if (status === "in-stock") {
      return products.filter(p => p.stock > 0);
    } else if (status === "out-of-stock") {
      return products.filter(p => p.stock === 0);
    }
    return products;
  };

  return (
    <React.Fragment>
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sản Phẩm</h1>
            <p className="text-gray-500">Quản lý sản phẩm thời trang của bạn</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle size={18} />
                <span>Thêm Sản Phẩm</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm Sản Phẩm Mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin chi tiết về sản phẩm mới bên dưới.
                </DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="all">
              <span>Tất cả</span>
            </TabsTrigger>
            <TabsTrigger value="in-stock">
              <span>Còn hàng</span>
            </TabsTrigger>
            <TabsTrigger value="out-of-stock">
              <span>Hết hàng</span>
            </TabsTrigger>
            <TabsTrigger value="draft">
              <span>Bản nháp</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Nội dung các tab */}
          {["all", "in-stock", "out-of-stock"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                <ProductsFilter 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onApplyFilter={handleApplyFilter} 
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />

                {viewMode === "grid" ? (
                  <ProductsGrid 
                    products={filterProductsByStatus(filteredProducts, tab)}
                    formatPrice={formatPrice}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteClick}
                  />
                ) : (
                  <ProductsList
                    products={filterProductsByStatus(filteredProducts, tab)}
                    formatPrice={formatPrice}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteClick}
                  />
                )}
                
                <ProductsPagination />
              </div>
            </TabsContent>
          ))}
          
          <TabsContent value="draft">
            <div className="p-4 text-center text-gray-500">
              <p>Không có sản phẩm nào ở trạng thái bản nháp.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog sửa sản phẩm */}
      <Dialog open={!!productToEdit} onOpenChange={(open) => !open && setProductToEdit(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh Sửa Sản Phẩm</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin cho sản phẩm này.
            </DialogDescription>
          </DialogHeader>
          {productToEdit && (
            <ProductForm initialData={productToEdit} onSubmit={handleUpdateProduct} />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog xóa sản phẩm */}
      <DeleteProductDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        product={productToDelete}
        onConfirm={() => productToDelete && handleDeleteProduct(productToDelete.id)}
      />
    </DashboardLayout>
  </React.Fragment>
);
};


export default Products;
