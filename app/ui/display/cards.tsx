import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
  import Image from 'next/image';
  import { fetchFilteredProducts } from '@/app/lib/data';
  import { formatCurrency } from '@/app/lib/utils';
  
  

  
  export async function Card({
    query,
    currentPage,
    itemsPerPage
  }: {
    query: string;
    currentPage: number;
    itemsPerPage: number;
  }) {
    const products = await fetchFilteredProducts(query, currentPage, itemsPerPage);
    return (

        <>
         {products?.map((product) => (
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div
              className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <Image
                src={product.image_url}
                className="l"
                fill
                alt={`${product.name}`}
               />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
               {product.name}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {formatCurrency(product.price)}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button">
                Add to cart
              </button>
            </div>
          </div>  
           
         ))}
        </>
       
            
    );
  }
  