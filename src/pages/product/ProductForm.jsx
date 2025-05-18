import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { DialogFooter } from "@/components/ui/DiaLog";
import { Textarea } from "@/components/ui/Textarea";

const productSchema = z.object({
  name: z.string().min(2, { message: "Tên sản phẩm phải có ít nhất 2 ký tự." }),
  category: z.string().min(1, { message: "Danh mục không được để trống." }),
  price: z
    .string()
    .refine(val => !isNaN(Number(val)) && Number(val) >= 1000, {
      message: "Giá tối thiểu là 1.000đ.",
    })
    .transform(val => Number(val)),
  stock: z
    .string()
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Số lượng không được âm.",
    })
    .transform(val => Number(val)),
    image: z
    .any()
    .refine(file => file instanceof File || file instanceof Blob, {
      message: "Vui lòng chọn một tệp hình ảnh.",
    }),
  description: z.string().optional(),
});


export const ProductForm = ({ initialData, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: null,  
      description: "",
    },
  });

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
      ...(initialData?.id ? { id: initialData.id } : {}),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tên sản phẩm */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="image"
  render={({ field: { onChange, ref } }) => (
    <FormItem className="md:col-span-2">
      <FormLabel>Hình ảnh</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            onChange(e.target.files?.[0]); 
          }}
          ref={ref}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          {/* Giá */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá (VNĐ)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Nhập giá sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tồn kho */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tồn kho</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Nhập số lượng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hình ảnh */}
    

          {/* Mô tả */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả sản phẩm"
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="submit" className="bg-yellow-500 w-full md:w-auto">
            {initialData ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
