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
import { deleteBrand, getBrands, addBrand, updateBrand } from "../../services/Brand.Service";
import BrandForm from "./BrandForm";
import BrandsFilter from "./BrandsFilter";
import BrandTable from "./BrandTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  // Filter brands based on search term
  const filteredBrands = brands.filter(
    (brand) =>
      brand.branD_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add or update brand
  const handleSaveBrand = async (brandData) => {
    try {
      console.log('brandData:', brandData);
      if (!brandData.branD_NAME ) {
        toast.error("Tên thương hiệu không được để trống");
        return;
      }
      let res;
      if (editingBrand) {
        res = await updateBrand(brandData);
        if (res.code === 200) {
          toast.success("Cập nhật thương hiệu thành công");
          await fetchBrands();
          setIsModalOpen(false);
          setEditingBrand(null);
        } else {
          toast.error(res.message || "Lỗi khi cập nhật thương hiệu");
        }
      } else {
        res = await addBrand(brandData);
        if (res.code === 201) {
          toast.success("Thêm thương hiệu thành công");
          await fetchBrands();
          setIsModalOpen(false);
          setEditingBrand(null);
        } else {
          toast.error(res.message || "Lỗi khi thêm thương hiệu");
        }
      }
    } catch (error) {
      console.error("Lỗi khi lưu thương hiệu trong handleSaveBrand:", error);
      // Xử lý lỗi cụ thể khi thương hiệu đã tồn tại
      if (error.response && error.response.data && error.response.data.message) {
        const message = error.response.data.message.toLowerCase();
        if (message.includes("đã tồn tại") || message.includes("exists")) {
          toast.error("Thương hiệu đã tồn tại. Vui lòng chọn tên khác.");
          return;
        }
      }
      toast.error("Lỗi khi lưu thương hiệu. Vui lòng thử lại.");
    }
  };

  // Delete brand
  const openDeleteDialog = (brand) => {
    setBrandToDelete(brand);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteBrand(brandToDelete.branD_ID);
      if (res.code === 200) {
        toast.success("Xóa thương hiệu thành công");
        await fetchBrands();
      } else {
        toast.error(res.message || "Lỗi khi xóa thương hiệu");
      }
    } catch (error) {
      console.error("Lỗi khi xóa thương hiệu:", error);
      toast.error("Lỗi khi xóa thương hiệu. Vui lòng thử lại.");
    }
    setIsDeleteDialogOpen(false);
    setBrandToDelete(null);
    setSearchTerm("");
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

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Lỗi khi tải danh sách thương hiệu");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

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
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default Brands;
