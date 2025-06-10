import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useEffect, useState } from "react";
import { uploadImage } from "../../services/Upload.Service";
import { toast } from "react-toastify";

const BrandForm = ({ isOpen, onClose, onSave, brand }) => {

  const [formData, setFormData] = useState({
    branD_NAME: "",
    image: "",
    description: "",
    productsCount: 0,
    status: false,
    imagePreview: null,
  });

  useEffect(() => {
    if (brand) {
      setFormData({ ...brand, imagePreview: brand.branD_IMAGE });
    } else {
      setFormData({
        branD_NAME: "",
        image: "",
        description: "",
        status: false,
        imagePreview: null,
      });
    }
  }, [brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "productsCount" ? parseInt(value) || 0 : value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);

      try {
        const res = await uploadImage(file);
        setFormData((prev) => ({ ...prev, image: res.imageUrl }));
      } catch (err) {
        console.error('Upload thất bại:', err);
      }
    }
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, status: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Debug: formData.branD_NAME =", formData.branD_NAME);
    if (!formData.branD_NAME || !formData.branD_NAME.trim()) {
      toast.error("Tên không được để trống!");
      return;
    }
    if (!brand && !formData.image) {
      toast.error("Hình ảnh không được để trống!");
      return;
    }

    try {
      const trimmedData = { ...formData, branD_NAME: formData.branD_NAME.trim() };
      onSave(trimmedData); // Pass the trimmed data to the parent component
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu thương hiệu:", error);
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


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {brand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên
              </Label>
              <Input
                id="name"
                name="branD_NAME"
                value={formData.branD_NAME}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Ảnh
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
            {formData.branD_IMAGE && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">URL Ảnh</Label>
                <span className="col-span-3 text-sm break-all">{formData.branD_IMAGE}</span>
              </div>
            )}
            {formData.imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imagePreview" className="text-right">Ảnh hiện tại</Label>
                <img src={formData.imagePreview} alt="Brand Preview" className="col-span-3 h-24 object-cover" />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nổi bật</Label>
              <Checkbox
                checked={formData.status}
                onCheckedChange={handleCheckboxChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandForm;
