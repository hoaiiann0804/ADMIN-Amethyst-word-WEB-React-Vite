import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { ArrowUpDown, Edit, MoreVertical, Tag, Trash } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
const BrandTable = ({ brands, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Danh sách thương hiệu</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  Tên thương hiệu
                  <ArrowUpDown size={16} />
                </div>
              </TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Số sản phẩm</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <TableRow key={brand.branD_ID}>
                  <TableCell>{brand.branD_ID}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-gray-500" />
                      {brand.branD_NAME}
                    </div>
                  </TableCell>
                  <TableCell>{brand.branD_NAME.replace(/\s+/g, '').toLowerCase()}</TableCell>
                  <TableCell>
                    <img src={`${API_URL}/images/${brand.branD_IMAGE}`} alt={brand.branD_NAME} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {brand.description}
                  </TableCell>
                  <TableCell className="text-center">{brand.producT_QUANTITY}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="background-white">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => onEdit(brand)}
                        >
                          <Edit size={16} />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive"
                          onClick={() => onDelete(brand)}
                        >
                          <Trash size={16} />
                          <span>Xóa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  Không tìm thấy thương hiệu nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BrandTable;