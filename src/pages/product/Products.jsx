import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/Button";
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
import { DeleteProductDialog } from "@/pages/product/DeleteProductDialog";
import { ProductForm } from "@/pages/product/ProductForm";
import { ProductsFilter } from "@/pages/product/ProductsFilter";
import { ProductsGrid } from "@/pages/product/ProductsGrid";
import { ProductsList } from "@/pages/product/ProductsList";
import { ProductsPagination } from "@/pages/product/ProductsPagination";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import useToast from "../../hooks/use-toast";
import { ProductPaging } from '../../services/ProductService';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalProduct, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
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

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductPaging(currentPage, productsPerPage);
      setProducts(response.data);
      setTotalProducts(response.totalRecords);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    //setCurrentPage(1);
    fetchProducts();
  }, [searchTerm, selectedCategory, priceRange.min, priceRange.max, currentPage]);
  
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

  const filteredProducts = products.filter((product) => {
    // const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = product.producT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) 
    
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    
    const matchesPrice = (
      (priceRange.min === "" || product.producT_PRICE >= Number(priceRange.min)) &&
      (priceRange.max === "" || product.producT_PRICE <= Number(priceRange.max))
    );
    
    return matchesSearch && matchesCategory && matchesPrice;
  });


  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + "đ";
  };

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

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
    toast({
      title: "Xóa sản phẩm thành công",
      description: "Sản phẩm đã được xóa khỏi danh sách."
    });
  };
  const handleEditProduct = (product) => {
    setProductToEdit(product);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const filterProductsByStatus = (products, status) => {
    if (status === "in-stock") {
      return products.filter(p => p.stock > 0);
    } else if (status === "out-of-stock") {
      return products.filter(p => p.stock === 0);
    }
    return products;
  };


  const getProductsForCurrentPage = (products) => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  // Hiển thị thông báo không có sản phẩm nào
  const renderEmptyState = () => (
    <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
          <path d="M18 2v4"></path>
          <path d="M6 2v4"></path>
          <path d="M3 10h18"></path>
          <line x1="9" y1="16" x2="15" y2="16"></line>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm nào</h3>
      <p className="text-gray-500 mb-6">Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc.</p>
      <Button onClick={() => {
        setSearchTerm("");
        setSelectedCategory("");
        setPriceRange({ min: "", max: "" });
      }}>
        Xóa bộ lọc
      </Button>
    </div>
  );

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
              <ProductForm onSubmit={handleAddProduct} categories={categories.map(c => c.name)} />
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
          {["all", "in-stock", "out-of-stock"].map((tab) => {
            const statusFilteredProducts = filterProductsByStatus(filteredProducts, tab);
            return (
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

                  {statusFilteredProducts.length > 0 ? (
                    <>
                      {viewMode === "grid" ? (
                        <ProductsGrid 
                          products={products}
                          formatPrice={formatPrice}
                          onEdit={handleEditProduct}
                          onDelete={handleDeleteClick}
                        />
                      ) : (
                        <ProductsList
                          products={products}
                          formatPrice={formatPrice}
                          onEdit={handleEditProduct}
                          onDelete={handleDeleteClick}
                        />
                      )}
                      
                      <ProductsPagination 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        productsPerPage={productsPerPage}
                        totalProducts={totalProduct}
                      />
                    </>
                  ) : (
                    renderEmptyState()
                  )}
                </div>
              </TabsContent>
            );
          })}
          
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
            <ProductForm 
              initialData={productToEdit} 
              onSubmit={handleUpdateProduct} 
              categories={categories.map(c => c.name)}
            />
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
