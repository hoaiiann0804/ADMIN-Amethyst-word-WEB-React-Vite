import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/DiaLog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateProduct, CreateProductImage, UpdateProduct } from "../../services/Product.Service";
import { uploadImage } from "../../services/Upload.Service";
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE;
// Dữ liệu cứng cho size theo danh mục
const sizeOptions = {
  clothing: ["S", "M", "L", "XL", "XXL"],
  shoes: ["38", "39", "40", "41", "42"],
  ring: ["6", "7", "8", "9"],
  perfume: [],
};

// Dữ liệu cứng cho màu sắc
const colorOptions = ["Đỏ", "Trắng", "Xanh", "Đen"];

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
  variants: z.array(
    z.object({
      size: z.string().optional(),
      color: z.string().optional(),
    })
  ).optional(),
});

const ProductForm = ({ isOpen, onClose, onSave, product, categories, brands }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch, control } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      producT_NAME: "",
      producT_PRICE: "",
      pricE_ROOT: "",
      producT_DETAIL: "",
      producT_DESCRIPTION: "",
      branD_ID: "",
      categorY_ID: "",
      producT_STATUS: "INACTIVE",
      coloR_NAME: "",
      sizE_NAME: ""
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [imageName, setImageName] = useState("");

  const selectedBrand = watch("branD_ID");
  const selectedCategory = watch("categorY_ID");
  const selectedStatus = watch("producT_STATUS");
  const watchedFields = watch("variants");


  const selectedBrandStr = selectedBrand ? String(selectedBrand) : "";
  const selectedCategoryStr = selectedCategory ? String(selectedCategory) : "";
  const selectedStatusStr = selectedStatus ? String(selectedStatus) : "";

  useEffect(() => {
    if (product) {
      reset({
        producT_ID: product.producT_ID,
        producT_NAME: product.producT_NAME || "",
        producT_PRICE: product.producT_PRICE?.toString() || "",
        pricE_ROOT: product.pricE_ROOT?.toString() || "",
        producT_DETAIL: product.producT_DETAIL || "",
        producT_DESCRIPTION: product.producT_DESCRIPTION || "",
        branD_ID: product.branD_ID ? String(product.branD_ID) : "",
        categorY_ID: product.categorY_ID ? String(product.categorY_ID) : "",
        producT_STATUS: product.producT_STATUS || "INACTIVE",
        coloR_NAME: product.coloR_NAME || "",
        sizE_NAME: product.sizE_NAME || ""
      });
    } else {
      reset({
        producT_NAME: "",
        producT_PRICE: "",
        pricE_ROOT: "",
        producT_DETAIL: "",
        producT_DESCRIPTION: "",
        branD_ID: "",
        categorY_ID: "",
        producT_STATUS: "INACTIVE",
        coloR_NAME: "",
        sizE_NAME: ""
      });
    }
  }, [product, reset]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file || file === null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      try {
        const res = await uploadImage(file);
        setImageName(res);
      } catch (err) {
        console.error("Upload thất bại:", err);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (product) {
        const updateData = {
          ...data,
          producT_ID: product.producT_ID,
        };
        const response = await UpdateProduct(updateData);
        if (response.code === 200) {
          const request = {
            productId: parseInt(response.result),
            imageName: imageName,
          };
          if(imageName) {
            await CreateProductImage(request);
          }
        }
      } else {
        const response = await CreateProduct(data);
        const request = {
          productId: parseInt(response.result),
          imageName: imageName,
        };
        await CreateProductImage(request);
      }
      onSave(data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    }
  };

  const isPerfume = categories.find(c => c.categorY_ID === selectedCategory)?.categorY_NAME.toLowerCase() === "nước hoa";

  const getSizeOptions = () => {
    const categoryName = categories.find(c => c.categorY_ID === selectedCategory)?.categorY_NAME.toLowerCase();
    return sizeOptions[categoryName] || [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[65%]">
        <DialogHeader>
          <DialogTitle>{product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4 py-4">

            {/* Tên sản phẩm */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_NAME" className="text-right">Tên sản phẩm</Label>
              <Input
                id="producT_NAME"
                {...register("producT_NAME")}
                className="col-span-3"
              />
              {errors.producT_NAME && (
                <p className="text-red-500 text-sm col-span-4 text-right">
                  {errors.producT_NAME.message}
                </p>
              )}
            </div>

            {/* Ảnh */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producT_IMAGE" className="text-right">Ảnh</Label>
              <div className="col-span-3">
                <Input
                  id="producT_IMAGE"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {imageName && (
                  <p className="text-sm text-green-600 mt-1">Đã chọn: {imageName}</p>
                )}
                {!imageName && product?.imagE_NAME && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-500">Ảnh hiện tại:</span>
                    <img
                      src={`${API_IMAGE_URL}/${product.imagE_NAME}`}
                      alt={product.producT_NAME}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Giá và Giá gốc */}
            <div className="grid grid-cols-2 gap-4">
              {/* Giá */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="producT_PRICE" className="text-right">Giá (VNĐ)</Label>
                <Input
                  id="producT_PRICE"
                  type="number"
                  {...register("producT_PRICE")}
                  className="col-span-3"
                />
                {errors.producT_PRICE && (
                  <p className="text-red-500 text-sm col-span-4 text-right">
                    {errors.producT_PRICE.message}
                  </p>
                )}
              </div>

              {/* Giá gốc */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pricE_ROOT" className="text-right">Giá gốc (VNĐ)</Label>
                <Input
                  id="pricE_ROOT"
                  type="number"
                  {...register("pricE_ROOT")}
                  className="col-span-3"
                />
                {errors.pricE_ROOT && (
                  <p className="text-red-500 text-sm col-span-4 text-right">
                    {errors.pricE_ROOT.message}
                  </p>
                )}
              </div>
            </div>

            {/* Chi tiết */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="producT_DETAIL" className="text-right">Chi tiết</Label>
              <Textarea
                id="producT_DETAIL"
                {...register("producT_DETAIL")}
                className="col-span-3"
              />
            </div>

            {/* Mô tả */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="producT_DESCRIPTION" className="text-right">Mô tả</Label>
              <Textarea
                id="producT_DESCRIPTION"
                {...register("producT_DESCRIPTION")}
                className="col-span-3"
              />
            </div>

            {/* Danh mục, Thương hiệu, Trạng thái */}
            <div className="grid grid-cols-3 gap-4">
              {/* Danh mục */}
              <div>
                <Label htmlFor="categorY_ID" className="block mb-1">Danh mục</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("categorY_ID", value);
                    setValue("variants", []);
                  }}
                  value={selectedCategoryStr}
                >
                  <SelectTrigger>
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
                  <p className="text-red-500 text-sm mt-1">{errors.categorY_ID.message}</p>
                )}
              </div>

              {/* Thương hiệu */}
              <div>
                <Label htmlFor="branD_ID" className="block mb-1">Thương hiệu</Label>
                <Select
                  onValueChange={(value) => setValue("branD_ID", value)}
                  value={selectedBrandStr}
                >
                  <SelectTrigger>
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
                  <p className="text-red-500 text-sm mt-1">{errors.branD_ID.message}</p>
                )}
              </div>

              {/* Trạng thái */}
              <div>
                <Label htmlFor="producT_STATUS" className="block mb-1">Trạng thái</Label>
                <Select
                  onValueChange={(value) => setValue("producT_STATUS", value)}
                  value={selectedStatusStr}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Hiển thị</SelectItem>
                    <SelectItem value="INACTIVE">Ẩn</SelectItem>
                  </SelectContent>
                </Select>
                {errors.producT_STATUS && (
                  <p className="text-red-500 text-sm mt-1">{errors.producT_STATUS.message}</p>
                )}
              </div>
            </div>

            {/* Biến thể */}
            {!isPerfume && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right mt-2">Biến thể</Label>
                <div className="col-span-3 space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <Input
                        className="w-1/4"
                        placeholder="Nhập size"
                        value={field.size}
                        onChange={(e) => setValue(`variants.${index}.size`, e.target.value)}
                      />
                      <Input
                        className="w-1/4"
                        placeholder="Nhập màu"
                        value={field.color}
                        onChange={(e) => setValue(`variants.${index}.color`, e.target.value)}
                      />
                      <Input
                        type="number"
                        className="w-1/4"
                        placeholder="Số lượng"
                        min={1}
                        value={watchedFields?.[index]?.quantity || 1}
                        onChange={(e) => {
                          const value = Math.max(1, Number(e.target.value));
                          setValue(`variants.${index}.quantity`, value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ size: "", color: "", quantity: 1 })}
                  >
                    Thêm biến thể
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
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