import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Switch } from "@/components/ui/Switch";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { uploadImage } from "../../services/UploadService";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Tên danh mục phải có ít nhất 2 ký tự." }),
  isActive: z.boolean().default(true),
});

const CategoryForm = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    productsCount: 0,
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
        name: "",
        slug: "",
        description: "",
        productsCount: 0,
        featured: false,
        image: "",
        imagePreview: "",
      });
    }
  }, [category]);

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: formData.name,
      isActive: formData.featured,
    },
  });

  // Xử lý input thay đổi
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

  // Xử lý file ảnh thay đổi + upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
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
        console.error("Upload thất bại:", err);
      }
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      alert("Tên và slug không được để trống!");
      return;
    }
    onSave(formData);
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
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
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
              <Label htmlFor="productsCount" className="text-right">Số sản phẩm</Label>
              <Input
                id="productsCount"
                name="productsCount"
                type="number"
                value={formData.productsCount}
                onChange={handleChange}
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
