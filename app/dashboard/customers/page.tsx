import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchCustomersPages } from '@/app/lib/data';
import Table from "@/app/ui/customers/table";

export const metadata: Metadata = {
  title: 'Customers',
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
  const totalPages = await fetchCustomersPages(query);
    return(
      <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> 
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
    </div>
    );
  }