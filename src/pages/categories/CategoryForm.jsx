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
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { addCategory, updateCategory } from "../../services/Category.Service";
import { uploadImage } from "../../services/Upload.Service";

const CategoryForm = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    categorY_NAME: "",
    image: "",
    description: "",
    featured: false,
    image: "",
    imagePreview: "",
  });

  // Đồng bộ formData khi chỉnh sửa
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        productsCount: category.productsCount || 0,
        featured: category.featured || false,
        image: category.image || "",
        imagePreview: category.image || "",
      });
    } else {
      setFormData({
        categorY_NAME: "",
        image: "",
        description: "",
        featured: false,
      });
    }
  }, [category]);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "productsCount" ? parseInt(value) || 0 : value,
    }));
  };

  // Xử lý checkbox thay đổi
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.categorY_NAME) {
      alert("Tên không được để trống!");
      return;
    }
    onSave(formData);
    if(category){
      updateCategory(formData)
    } else{
      addCategory(formData)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Tên</Label>
              <Input
                id="categorY_NAME"
                name="categorY_NAME"
                value={formData.categorY_NAME}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Mô tả</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productsCount" className="text-right">Ảnh danh mục</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nổi bật</Label>
              <Checkbox
                checked={formData.featured}
                onCheckedChange={handleCheckboxChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ảnh danh mục</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
            {formData.imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Xem trước ảnh</Label>
                <img src={formData.imagePreview} alt="Preview" className="col-span-3 max-h-32 object-contain" />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Trạng thái</Label>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
