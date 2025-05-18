import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import BrandsFilter from "./BrandsFilter";
import BrandTable from "./BrandTable";
import BrandForm from "./BrandForm";
import initialBrands from "../../services/mockBrands";
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


const Brands = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  // Filter brands based on search term
  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add or update brand
  const handleSaveBrand = (brandData) => {
    if (editingBrand) {
      // Update existing brand
      setBrands(
        brands.map((brand) =>
          brand.id === editingBrand.id ? { ...brandData, id: brand.id } : brand
        )
      );
    } else {
      // Add new brand
      const newBrand = {
        ...brandData,
        id: brands.length ? Math.max(...brands.map((b) => b.id)) + 1 : 1,
      };
      setBrands([...brands, newBrand]);
    }
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  // Delete brand
  const openDeleteDialog = (brand) => {
    setBrandToDelete(brand);
    setIsDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    console.log("Đang xóa:", brandToDelete);
    if (brandToDelete) {
      setBrands(brands.filter((brand) => brand.id !== brandToDelete.id));
      setIsDeleteDialogOpen(false);
      setBrandToDelete(null);
      setSearchTerm("");
    }
  };


  // Open modal for adding
  const openAddModal = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý thương hiệu</h1>
          <Button className="flex items-center gap-2" onClick={openAddModal}>
            <Plus size={18} />
            Thêm thương hiệu
          </Button>
        </div>

        <BrandsFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <BrandTable
          brands={filteredBrands}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
        />

        <BrandForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBrand(null);
          }}
          onSave={handleSaveBrand}
          brand={editingBrand}
        />
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
             <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc muốn xóa thương hiệu{" "}
                <strong>{brandToDelete?.name}</strong>? Hành động này không thể
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

export default Brands;