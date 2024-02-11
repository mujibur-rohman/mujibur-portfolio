"use client";

import AppWrapper from "@/components/app-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import SelectFilter from "./_components/select-filter";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import PostService from "@/services/post/post.service";
import PaginationPost from "./_components/pagination";
import Link from "next/link";

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      return await PostService.getAll({ limit: 10, page: currentPage });
    },
  });

  //* handle change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p>Loading bang</p>;
  }

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
        <DataTable columns={columns} data={posts!.data} />
        <div className="mt-5">
          <PaginationPost currentPage={currentPage} handlePageChange={handlePageChange} totalPages={posts!.totalPage} visiblePage={3} />
        </div>
      </div>
    </AppWrapper>
  );
}

export default BlogPage;
