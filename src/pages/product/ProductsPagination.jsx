import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../../components/ui/Panigation";

export const ProductsPagination = ({ currentPage, setCurrentPage, totalPages, productsPerPage = 10, totalProducts }) => {
  // Nếu không có sản phẩm hoặc chỉ có một trang, không hiển thị phân trang
  if (totalProducts === 0 || totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Cuộn lên đầu danh sách sản phẩm khi chuyển trang
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Logic hiển thị các trang xung quanh trang hiện tại
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Logic để hiển thị các trang xung quanh trang hiện tại
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Đảm bảo luôn hiển thị 5 trang nếu có thể
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }
    }

    // Hiển thị trang đầu nếu startPage > 1
    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key="first">
          <PaginationLink 
            href="#" 
            onClick={() => handlePageChange(1)}
            className={1 === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Hiển thị dấu chấm lửng nếu startPage > 2
      if (startPage > 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Hiển thị các trang giữa
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Hiển thị dấu chấm lửng nếu endPage < totalPages - 1
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Hiển thị trang cuối nếu endPage < totalPages
    if (endPage < totalPages) {
      pageNumbers.push(
        <PaginationItem key="last">
          <PaginationLink 
            href="#" 
            onClick={() => handlePageChange(totalPages)}
            className={totalPages === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">
          Hiển thị {Math.min(currentPage * productsPerPage, totalProducts) - productsPerPage + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} trên tổng số {totalProducts} sản phẩm
        </div>
        <div className="text-sm">
          Trang {currentPage} / {totalPages}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={handlePrevious}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={handleNext}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};