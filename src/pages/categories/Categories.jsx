import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/Button";
import {
  Card
} from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/DiaLog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import CategoriesFilter from "@/pages/categories/CategoriesFilter";
import CategoryForm from "@/pages/categories/CategoryForm";
import DeleteCategoryDialog from "@/pages/categories/DeleteCategoryDialog";
import { Edit, FolderPlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/Panigation";
import useToast from "../../hooks/use-toast";
import { getCategories } from "../../services/CategoryService";

const Categories = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", "hidden"
  const [sortBy, setSortBy] = useState("id"); // "id", "name", "products", "created"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc", "desc"
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Dữ liệu mẫu cho danh mục
  const [categories, setCategories] = useState([]);

  // Helper function to compare values for sorting
  const compareValues = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }
    
    return sortOrder === 'asc' ? a - b : b - a;
  };

  // Lọc và sắp xếp danh sách danh mục
  const filteredCategories = [...categories]
    .filter((category) => {
      const matchesSearch = category.categorY_NAME.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesStatus = true;
      
      if (statusFilter === "active") {
        matchesStatus = category.isActive;
      } else if (statusFilter === "hidden") {
        matchesStatus = !category.isActive;
      }
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      return compareValues(a[sortBy], b[sortBy]);
    });

  // Hàm xử lý thêm danh mục mới
  const handleAddCategory = (data) => {
    const newCategory = {
      id: categories.length + 1,
      name: data.name,
      products: 0,
      created: new Date().toLocaleDateString("vi-VN"),
      status: data.isActive ? "Hiển thị" : "Ẩn",
      isActive: data.isActive
    };
    
    setCategories([...categories, newCategory]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Thêm danh mục thành công",
      description: `Đã thêm danh mục "${data.name}" vào hệ thống`,
    });
  };

  // Hàm xử lý cập nhật danh mục
  const handleUpdateCategory = (data) => {
    const updatedCategories = categories.map(category => 
      category.id === data.id ? {
        ...category,
        name: data.name,
        status: data.isActive ? "Hiển thị" : "Ẩn",
        isActive: data.isActive
      } : category
    );
    
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
    toast({
      title: "Cập nhật danh mục thành công",
      description: `Đã cập nhật danh mục "${data.name}"`,
    });
  };

  // Hàm xử lý xóa danh mục
  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(
      category => category.id !== selectedCategory.id
    );
    
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Xóa danh mục thành công",
      description: `Đã xóa danh mục "${selectedCategory.name}"`,
      variant: "destructive",
    });
    setSelectedCategory(null);
  };

  // Hàm mở dialog chỉnh sửa danh mục
  const openEditDialog = (category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  // Hàm mở dialog xóa danh mục
  const openDeleteDialog = (category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Hàm xử lý thay đổi sắp xếp
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const renderSortIndicator = (column) => {
    if (sortBy !== column) return null;
    
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  // Hàm lấy danh sách danh mục từ API
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Danh Mục</h1>
            <p className="text-gray-500">Quản lý danh mục sản phẩm thời trang của bạn</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <FolderPlus size={18} />
            <span>Thêm Danh Mục</span>
          </Button>
        </div>

        {/* Bộ lọc và tìm kiếm */}
        <CategoriesFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Danh sách danh mục */}
        <Card>
          <Table>
            <TableCaption>Danh sách các danh mục sản phẩm</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('id')}
                >
                  ID{renderSortIndicator('id')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('name')}
                >
                  Tên Danh Mục{renderSortIndicator('name')}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50">
                  Ảnh Danh Mục 
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('products')}
                >
                  Số Sản Phẩm{renderSortIndicator('products')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('created')}
                >
                  Ngày Tạo{renderSortIndicator('created')}
                </TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead className="text-right">Thao Tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.categorY_ID}>
                  <TableCell className="font-medium">{category.categorY_ID}</TableCell>
                  <TableCell>{category.categorY_NAME}</TableCell>
                  <TableCell>
                    <img src={`https://localhost:5000/images/${category.categorY_IMAGE}`} alt={category.categorY_NAME} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell>{category.producT_QUANTITY}</TableCell>
                  <TableCell>{ new Date(category.createD_AT).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.status === "Hiển thị"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category.categorY_STATUS}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openDeleteDialog(category)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
      </div>

      {/* Dialog thêm danh mục */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
          </DialogHeader>
          <CategoryForm onSubmit={handleAddCategory} />
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa danh mục */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>
          <CategoryForm 
            initialData={selectedCategory} 
            onSubmit={handleUpdateCategory}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog xóa danh mục */}
      <DeleteCategoryDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        category={selectedCategory}
        onConfirm={handleDeleteCategory}
      />
    </DashboardLayout>
  );
};

export default Categories;