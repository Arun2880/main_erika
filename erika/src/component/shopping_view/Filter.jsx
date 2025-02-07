import React, { Fragment } from 'react'
import { filterOptions } from '@/config';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const Filter = ({filters, handleFilter}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm bg-slate-200 font-serif '>
      <div className='p-4 border-b'>
        <h2 className='text-xl font-bold border-b-2 border-black p-2'>Filters</h2>

      </div>
      <div className='p-4 space-y-4'>
       { Object.keys(filterOptions).map(keyItem=> <Fragment>
        <div>
          <h3 className='text-base font-bold capitalize ' >{keyItem}</h3>
          <div className='grid gap-2 mt-2'>
            {
              filterOptions[keyItem].map( options=> <Label className="flex font-medium items-center gap-2 normal-case ">
                <Checkbox className="border-black border-2" checked ={
                  filters && Object.keys(filters).length> 0 &&
                  filters[keyItem] && filters[keyItem].indexOf(options.id)> -1
                }  onCheckedChange={()=>{
                  handleFilter(keyItem, options.id)
                }}/>
                {options.label}

              </Label>)
            }

          </div>
        </div>
        <Separator/>
       </Fragment>)
        }
      </div>

      
    </div>
  )
}

export default Filter;
