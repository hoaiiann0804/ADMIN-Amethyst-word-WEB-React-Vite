import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/DiaLog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateProduct, CreateProductImage, UpdateProduct } from "../../services/Product.Service";
import { uploadImage } from "../../services/Upload.Service";
const productSchema = z.object({
  producT_NAME: z.string().min(2, { message: "Tên sản phẩm phải có ít nhất 2 ký tự." }),
  producT_PRICE: z
    .string()
    .refine(val => !isNaN(Number(val)) && Number(val) >= 1000, { message: "Giá tối thiểu là 1.000đ." })
    .transform(val => Number(val)),
  producT_DETAIL: z.string().optional(),
  producT_DESCRIPTION: z.string().optional(),
  branD_ID: z.string().min(1, { message: "Vui lòng chọn thương hiệu." }),
  categorY_ID: z.string().min(1, { message: "Vui lòng chọn danh mục." }),
  producT_STATUS: z.enum(["ACTIVE", "INACTIVE", "DRAFT"], { message: "Vui lòng chọn trạng thái hợp lệ." }),
});

const ProductForm = ({ isOpen, onClose, onSave, product, categories, brands }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      producT_NAME: "",
      producT_PRICE: "",
      producT_DETAIL: "",
      producT_DESCRIPTION: "",
      branD_ID: "",
      categorY_ID: "",
      producT_STATUS: "ACTIVE",
    },
  });
  const [imageName, setImageName] = useState("");

  // Watch selected values for controlled Select components
  const selectedBrand = watch("branD_ID");
  const selectedCategory = watch("categorY_ID");
  const selectedStatus = watch("producT_STATUS");

  // Ép kiểu sang string để đảm bảo khớp với value của SelectItem
  const selectedBrandStr = selectedBrand ? String(selectedBrand) : "";
  const selectedCategoryStr = selectedCategory ? String(selectedCategory) : "";
  const selectedStatusStr = selectedStatus ? String(selectedStatus) : "";

  useEffect(() => {
    if (product) {
      reset({
        producT_NAME: product.producT_NAME || "",
        producT_PRICE: product.producT_PRICE || "",
        producT_DETAIL: product.producT_DETAIL || "",
        producT_DESCRIPTION: product.producT_DESCRIPTION || "",
        branD_ID: product.branD_ID || "",
        categorY_ID: product.categorY_ID || "",
        producT_STATUS: product.producT_STATUS || "ACTIVE",
      });
    } else {
      reset({
        producT_NAME: "",
        producT_PRICE: "",
        producT_DETAIL: "",
        producT_DESCRIPTION: "",
        branD_ID: "",
        categorY_ID: "",
        producT_STATUS: "ACTIVE",
      });
    }
  }, [product, reset]);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    
      try {
        const res = await uploadImage(file);
        setImageName(res.imageUrl);
      } catch (err) {
        console.error('Upload thất bại:', err);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      onSave(data);
      if(product){
        const response = await UpdateProduct(data)
        if(response.code === 200){
            const request = {
              productId : parseInt(response.result),
              imageName : imageName,
            }
            const res = await CreateProductImage(request)
        }
      }else{
        const response = await CreateProduct(data);
          const request = {
            productId : parseInt(response.result),
            imageName : imageName,
          }
          await CreateProductImage(request)

        }
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_NAME" className="text-right">Tên sản phẩm</Label>
              <Input
                id="producT_NAME"
                {...register("producT_NAME")}
                className="col-span-3"
              />
              {errors.producT_NAME && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.producT_NAME.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_DETAIL" className="text-right">Ảnh</Label>
              <Input
                id="producT_IMAGE"
                type="file"
                accept="image/*"
                {...register("producT_IMAGE")}
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_PRICE" className="text-right">Giá (VNĐ)</Label>
              <Input
                id="producT_PRICE"
                type="number"
                {...register("producT_PRICE")}
                className="col-span-3"
              />
              {errors.producT_PRICE && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.producT_PRICE.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_DETAIL" className="text-right">Chi tiết</Label>
              <Textarea
                id="producT_DETAIL"
                {...register("producT_DETAIL")}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_DESCRIPTION" className="text-right">Mô tả</Label>
              <Textarea
                id="producT_DESCRIPTION"
                {...register("producT_DESCRIPTION")}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4 text-black" >
              <Label htmlFor="branD_ID" className="text-right">Thương hiệu</Label>
              <Select
                onValueChange={(value) => setValue("branD_ID", value)}
                value={selectedBrandStr}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.branD_ID} value={String(brand.branD_ID)}>
                      {brand.branD_NAME}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branD_ID && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.branD_ID.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categorY_ID" className="text-right">Danh mục</Label>
              <Select
                onValueChange={(value) => setValue("categorY_ID", value)}
                value={selectedCategoryStr}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.categorY_ID} value={String(category.categorY_ID)}>
                      {category.categorY_NAME}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categorY_ID && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.categorY_ID.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_STATUS" className="text-right">Trạng thái</Label>
              <Select
                onValueChange={(value) => setValue("producT_STATUS", value)}
                value={selectedStatusStr}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Hiển thị</SelectItem>
                  <SelectItem value="INACTIVE">Ẩn</SelectItem>
                  <SelectItem value="DRAFT">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
              {errors.producT_STATUS && (
                <p className="text-red-500 text-sm col-span-3 col-start-2">
                  {errors.producT_STATUS.message}
                </p>
              )}
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

export default ProductForm;