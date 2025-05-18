import React from "react";
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
import { Trash2 } from "lucide-react";

const DeleteCategoryDialog = ({
  open,
  onOpenChange,
  category,
  onConfirm,
}) => {
  if (!category) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            <span>Xác nhận xóa danh mục</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              Bạn có chắc chắn muốn xóa danh mục </span>
            <strong>"{category.name}"</strong>
            <span> không? Hành động này không thể hoàn tác.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <span>Hủy</span>
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            <span>Xóa</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;