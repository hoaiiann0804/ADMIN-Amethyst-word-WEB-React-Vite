
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import categoriesData from "../../services/CategoryData";
import CategoryForm from "./CategoryForm";
import CategoriesFilter from "./CategoriesFilter";
import CategoryTable from "./CategoryTable";
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
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
=======
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

  // Add or update category
  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id ? { ...categoryData, id: category.id } : category
        )
      );
    } else {
      // Add new category
      const newCategory = {
        ...categoryData,
        id: categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // Delete category
  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
      setSearchTerm("");
    }
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };


  // Open modal for editing
  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setCategories(categoriesData);

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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <Button className="flex items-center gap-2" onClick={openAddModal}>
            <Plus size={18} />
            Thêm danh mục
          </Button>
        </div>

        <CategoriesFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <CategoryTable
          categories={filteredCategories}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
        />


        <CategoryForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          category={editingCategory}
        />
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc muốn xóa danh mục{" "}
                <strong>{categoryToDelete?.name}</strong>? Hành động này không thể
                hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
    </DashboardLayout>
  );
};

export default Categories;