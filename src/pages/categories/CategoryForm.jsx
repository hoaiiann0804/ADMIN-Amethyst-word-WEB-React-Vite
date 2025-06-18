import { Button } from "@/components/ui/Button";
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

const CategoryForm = ({ isOpen, onClose, onSave, category }) => {
  console.log("CategoryForm rendered with category:", category);
  const [formData, setFormData] = useState({
    categorY_NAME: "",
    icoN_NAME: "",
    icoN_COLOR: "",
    description: "",
    categorY_STATUS: false,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        categorY_ID: category.categorY_ID,
        categorY_NAME: category.categorY_NAME || "",
        icoN_NAME: category.icoN_NAME || "",
        icoN_COLOR: category.icoN_COLOR || "",
        description: category.description || "",
        categorY_STATUS: category.categorY_STATUS || false,
        
      });
    } else {
      setFormData({
        categorY_NAME: "",
        icoN_NAME: "",
        icoN_COLOR: "",
        description: "",
        categorY_STATUS: false,
      });
    }
  }, [category]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý checkbox thay đổi
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, categorY_STATUS: checked }));
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
              <Label htmlFor="categorY_NAME" className="text-right">Tên</Label>
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
              <Label htmlFor="icoN_NAME" className="text-right">Tên icon</Label>
              <Input
                id="icoN_NAME"
                name="icoN_NAME"
                value={formData.icoN_NAME}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icoN_COLOR" className="text-right">Màu icon</Label>

              <div className="col-span-3 flex items-center gap-2">
                <input
                  type="color"
                  id="icoN_COLOR"
                  name="icoN_COLOR"
                  value={formData.icoN_COLOR}
                  onChange={handleChange}
                  className="h-10 w-12 rounded border"
                />
                <span className="text-sm">{formData.icoN_COLOR}</span>
              </div>
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Trạng thái</Label>
              <Switch
                checked={formData.categorY_STATUS}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, categorY_STATUS: checked }))}
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
