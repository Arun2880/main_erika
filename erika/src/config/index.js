import { Badge, LayoutDashboard, ShoppingBasket } from "lucide-react"

export const RegisterformControl= [
  {
    name: 'username',
    label : 'Username',
    placeholder: 'Enter your name',
    componentType : 'input',
    type : 'text',

  },
 
  {
    name: 'email',
    label : 'Email',
    placeholder: 'Enter your email',
    componentType : 'input',
    type : 'email',

  },
  {
    name: 'password',
    label : 'Password',
    placeholder: 'Enter your password',
    componentType : 'input',
    type : 'password',

  },
]



export const LoginformControl= [
 
  {
    name: 'email',
    label : 'Email',
    placeholder: 'Enter your email',
    componentType : 'input',
    type : 'email',

  },
  {
    name: 'password',
    label : 'Password',
    placeholder: 'Enter your password',
    componentType : 'input',
    type : 'password',

  },
];

export const addProductFormElements = [{
  label: "Title",
  name: "title",
  componentsType: "input",
  type: "text",
  placeholder:"Enter product title",
},
{
  label: "Description",
  name: "description",
  componentsType: "textarea",
  placeholder: "Enter your description",
},
{
  label: "Product Details",
  name: "detail",
  componentsType: "textarea",
  placeholder: "Enter your product details",
},
{
  label: "How to Use",
  name: "benefits",
  componentsType: "textarea",
  placeholder: "Enter your product benefits",
},
{
  label: "Category",
  name: "category",
  componentsType: "select",
  options: [
    {id: "mehendi", label: "Mehandi"},
    {id: "harecare", label: "Hair Care"},
    {id: "shampoo", label: "Shampoo"},
    {id: "seerum", label: "Serum"},
   

  ],
},
{
  label: "Brand",
  name: "brand",
  componentsType: "select",
  options: [
    
    { id: "erika", label:"Erika"},
    { id: "mamta", label:"Mamta Gold"},
   
  ],
},
{
  label: "Price",
  name: "price",
  componentsType: "input",
  type: "number",
  placeholder: "Enter price",

},
{
  label: "sale Price",
  name: "salePrice",
  componentsType: "input",
  type: "number",
  placeholder: "Enter sale price",

},
{
  label: "Total Stock",
  name: "totalStock",
  componentsType: "input",
  type: "number",
  placeholder: "Enter total stock",
},
];


export const shoppingViewHeaderMenuItems = [
  {
  id: 'home',
  label: 'Home',
  path : '/shop/home'
},
{
  id: 'about',
  label: 'About',
  path : '/shop/about'
},
{
  id: 'products',
  label: 'Products',
  path : '/shop/Listing'
},
{
  id: 'mehendi',
  label: 'Mehandi',
  path : '/shop/Listing'
},
{
  id: 'harecare',
  label: 'Hair Care',
  path : '/shop/Listing'
},

{
  id: 'shampoo',
  label: 'Shampoo',
  path : '/shop/Listing'
},
{
  id: 'seerum',
  label: 'Serum',
  path : '/shop/Listing'
},

{
  id: 'contact',
  label: 'Contact Us',
  path : '/shop/contact'
}


];


export const categoryOptionMap = {
  'mehendi': 'Mehandi',
  'harecare': 'Hair Care',
  'shampoo': 'Shampoo',
  'seerum': 'Serum',
  
}

export const brandOptionMap = {
  'erika': 'Erika',
  'mamta': 'Mamta Gold',
  
}


export const filterOptions = {
  category: [
    { id:"mehendi", label: "Mehandi"},
    { id:"harecare", label: "Hair Care"},
    { id:"shampoo", label: "Shampoo"},
    { id:"seerum", label: "Serum"},
   
  ],
  brand:[
    { id:"erika", label: "Erika"},
    { id:"mamta", label: "Mamta Gold"},
   
  ],

};


export const sortOptions = [
  {id: "price-lowtohigh", label: "Price: Low to High"},
  {id: "price-hightolow", label: "Price: High to Low"},
  { id: "title-atoz", label: "Title: A to Z"},
  { id : "title-ztoa", label: "Title: Z to A"},
];


export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const profileFormControl = [
  {
    name: 'username',
    label : 'Username',
    placeholder: 'Enter your name',
    componentType : 'input',
    type : 'text',
  },
  {
    label: "Email",
    name: "email",
    componentType: "input",
    type: "email",
    placeholder: "Enter your password",
  },
  {
    name: 'password',
    label : 'Password',
    placeholder: 'Enter your password',
    componentType : 'input',
    type : 'password',

  }

]


 
