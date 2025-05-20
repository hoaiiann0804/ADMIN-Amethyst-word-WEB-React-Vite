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
import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../services/CategoryService";
import CategoriesFilter from "./CategoriesFilter";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

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
      category.categorY_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    deleteCategory(categoryToDelete.categorY_ID)
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

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    // Fetch categories when component mounts
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
      </div>
    </DashboardLayout>
  );
};

export default Categories;