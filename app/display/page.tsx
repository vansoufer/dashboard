
import Image from 'next/image';
import { lusitana } from '../ui/fonts';
import { Metadata } from 'next';
import { fetchProductsPages } from '../lib/data';
import { Card } from '../ui/display/cards';
import Search from '../ui/search';
import { Suspense } from 'react';
import Pagination from '../ui/products/pagination';


export const metadata: Metadata = {
    title: 'Vitrine Display',
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
    const itemsPerPage =12;

    const totalPages = await fetchProductsPages(query, itemsPerPage);
    
    return (
        <div className='flex min-h-screen flex-col pb-20'>
        <div className='flex h-20 shrink-0 items-center bg-blue-500 p-4 md:h-52'>
            <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
        </div>
        <div className="w-full p-10">
            <div className="flex w-full items-center justify-between">
               
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 pb-10">
                <Search placeholder="Search products..." />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Suspense key={query + currentPage} >
                <Card query={query} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
            </Suspense> 
            </div>
            
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} /> 
            </div>
         </div>
        </ div>
    
    )
}