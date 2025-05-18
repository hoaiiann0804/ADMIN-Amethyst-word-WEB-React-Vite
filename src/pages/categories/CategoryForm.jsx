import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Switch } from "@/components/ui/Switch";

// Schema xác thực dữ liệu form
const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Tên danh mục phải có ít nhất 2 ký tự."
  }),
  isActive: z.boolean().default(true)
});

const CategoryForm = ({ initialData, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      isActive: true
    }
  });

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
      ...(initialData?.id ? { id: initialData.id } : {})
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên danh mục" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Trạng thái</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Hiển thị danh mục trên website
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit">
            {initialData ? "Cập nhật" : "Thêm danh mục"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CategoryForm;