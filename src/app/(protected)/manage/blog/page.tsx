"use client";
import AppWrapper from "@/components/app-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import SelectFilter from "./_components/select-filter";
import Link from "next/link";
import PaginationPost from "./_components/pagination";
import { DataTable } from "./_components/data-table";
import PostService from "@/services/post/post.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_components/column";
import Loading from "@/components/ui/loading";
import ErrorRender from "@/components/ui/error";

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: posts,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["projects", currentPage],
    queryFn: async () => {
      return await PostService.getAll({ limit: 10, page: currentPage });
    },
  });

  // //* handle change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AppWrapper>
      <div className="py-5 flex justify-between">
        <h1 className="text-xl md:text-2xl font-bold">My Article</h1>
        <Button size="sm" asChild>
          <Link href="/manage/blog/add" className="flex gap-1">
            <PlusIcon className="text-white" /> Create Article
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg p-5">
        <div className="flex justify-between mb-4">
          <Input className="w-[180px]" placeholder="Search" />
          <SelectFilter />
        </div>
        {isLoading ? (
          <Loading />
        ) : isError && !isFetching ? (
          <ErrorRender refetch={refetch} />
        ) : posts?.totalRows === 0 ? (
          <div className="flex justify-center">
            <div className="text-center space-y-2">
              <p>Data Kosong</p>
            </div>
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={posts!.data} />
            <div className="mt-5">
              <PaginationPost currentPage={currentPage} handlePageChange={handlePageChange} totalPages={posts!.totalPage} visiblePage={3} />
            </div>
          </>
        )}
      </div>
    </AppWrapper>
  );
}

export default BlogPage;
