
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge, ChartNoAxesColumnIncreasing, ChartNoAxesCombined, LayoutDashboard,  ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'


const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label : 'Dashboard',
    path : '/admin/dashboard',
    icons: <LayoutDashboard/>

  },
  {
    id: 'addinfluencer',
    label : 'Add Influencer',
    path : '/admin/influencer',
    icons: <LayoutDashboard/>

  },
  {
    id: 'showinfluencer',
    label : 'View Influencer',
    path : '/admin/showinfluencer',
    icons: <LayoutDashboard/>

  },
  {
    id: 'products',
    label : 'Products',
    path : '/admin/roduct',  
    icons: <ShoppingBasket></ShoppingBasket>
  },
  {
    id: 'orders',
    label : 'Orders',
    path : '/admin/order',
    icons: <Badge></Badge>
  },
  {
    id: 'cancel',
    label : 'Cancelled Orders',
    path : '/admin/cancel',
    icons: <Badge></Badge>
  },
]




function MenuItems({setOpen}){
  const navigate = useNavigate();



  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map(menuItem=><div key={menuItem.id} onClick={()=>{navigate(menuItem.path)
        setOpen?  setOpen(false): null;
      }}className='flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-black text-muted-foreground hover:bg-muted hover:text-foreground '>
       {menuItem.icons}
       {menuItem.label}

      </div>)
    }

  </nav>

}






const Sidebar = ({open, setOpen}) => {


  return (
    <Fragment>
      <Sheet open= {open} onOpenChange={setOpen}>
        <SheetContent side= "left" className="w-64 bg-white ">
          <div className='flex flex-col h-full'>
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5"> 
                <ChartNoAxesCombined size={30}></ChartNoAxesCombined>
                Admin Pannel
              </SheetTitle>
              


            </SheetHeader>
            <MenuItems setOpen={setOpen}/>

          </div>

        </SheetContent>

      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex bg-white'>
        <div className='flex items-center gap-2'>
        <ChartNoAxesColumnIncreasing size={30} />

          <h1 className='text-xl font-extrabold '>Admin Pannel</h1>

        </div>
        <MenuItems/>
      </aside>

    </Fragment>
  )
}

export default Sidebar
