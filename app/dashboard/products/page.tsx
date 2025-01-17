import { fetchProductsPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import { Suspense } from 'react';
import { CreateProduct } from '@/app/ui/products/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/products/pagination';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page({
  searchParams,
}:{
  searchParams?:{
    query?:string;
    page?:string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 6;
  const totalPages = await fetchProductsPages(query,itemsPerPage);
  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      </Suspense> 
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
    </div>
  );
}