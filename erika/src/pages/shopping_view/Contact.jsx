import React from 'react'
import contact from "../../assets/erikacontactus.jpg"
import { MailPlus, MapPinHouse, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from 'react-router-dom'
import { motion} from 'framer-motion'
import { fadeIn } from '@/variants'
const Contact = () => {
  const [result, setResult] = React.useState("");
  const contact_us=[{
    id: 1,
    label: "Adress",
    icon: MapPinHouse,
    value: "SH-58, Dhinawas Road, Sojat, Rajasthan (306104)",
  },
 
  {
    id: 3,
    label: "Email",
    icon:  MailPlus,
    value:  (
      <a href="mailto:erikahennaherbal@gmail.com">Erikahennaherbal@gmail.com</a>
    ),
  },
]

const onSubmit = async (event) => {
  event.preventDefault();
  setResult("Sending....");
  const formData = new FormData(event.target);

  formData.append("access_key", "4ce13940-a494-4d69-bc14-073af4357665");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (data.success) {
    setResult("Form Submitted Successfully");
    event.target.reset();
  } else {
    
    setResult(data.message);
  }
};
  return (
    <div className='flex flex-col'>
      <div className='w-full h-[500px] bg-no-repeat'>
        <img src={contact} alt="" className='w-full h-full object-cover '/>

      </div>
    <section className='py-12 bg-gray-50 mx-4'>
      <div className='container px-4 mx=4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 '>
          {
            contact_us.map((item) => <Card
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className=" cursur-pointer hover:shadow-lg transition-shadow border-lg">
               <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icon className="text-2xl text-gray-600 mb-4 w-14 h-14" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">{item.label}</h2>
                <p className="text-lg text-gray-500 font-medium text-center">{item.value}</p>

               </CardContent>


            </Card>)
          }

        </div>

      </div>

    </section>

    <section className="py-15 bg-grey-50 mx-5">
  <div className="container py-8">
    <div
     variants={fadeIn("right", 0.2)}
     initial="hidden"
     whileInView={"show"}
     viewport={{ once: false, amount: 0.7 }} 
    className="w-full">
      <h2 className="text-5xl font-bold text-gray-700 mb-4 text-center">
        Drop Us A Line
      </h2>
      <form onSubmit={onSubmit}>
        <div  className="flex lg:flex-row lg:space-x-8 mx-6 flex-col">        
          <div className="mb-4 lg:w-1/3 sm:w-full ">
          <label className="text-lg text-gray-600 font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="bg-gray-200 h-12 rounded-lg px-4 w-full shadow-lg"
          />
        </div>

        <div className="mb-4 lg:w-1/3 ">
          <label className="text-lg text-gray-600 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="bg-gray-200 h-12 rounded-lg px-4 text-black w-full shadow-lg"
          />
        </div>

        <div className="mb-4 lg:w-1/3 ">
          <label className="text-lg text-gray-600 font-medium mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            required
            className="bg-gray-200 h-12 rounded-lg px-4 w-full shadow-lg"
          />
        </div>
        </div>

        <div  className="flex lg:flex-row lg:space-x-8 mx-6 flex-col">
        <div className="mb-4 w-full ">
          <label className="text-lg text-gray-600 font-medium mb-2" htmlFor="phone">
            Subject
          </label>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            required
            className="bg-gray-200 h-12 rounded-lg px-4 w-full shadow-lg"
          />
        </div>
        </div>

        <div  className="flex lg:flex-row lg:space-x-8 mx-6 flex-col">
        <div className="mb-4 w-full ">
          <label className="text-lg text-gray-600 font-medium mb-2" htmlFor="phone">
            Message
          </label>
          <textarea
            type="text"
            placeholder="Message"
            name="message"
            required
            className="bg-gray-200 h-12 rounded-lg px-4 w-full w-full h-32 resize-none shadow-lg"
          />
        </div>
        </div>

        <div  className="flex lg:flex-row lg:space-x-8 mx-6 flex-col align-items-center justify-center">
         <button className='bg-[#007000] shadow-xl shadow-green-500 text-white text-lg rounded-lg py-3 px-8 shadow-lg' type='submit' name='submit'> Submit</button>
        </div>
        <span>{result}</span>

        

        
      </form>
    </div>
  </div>
</section>
<section className="py-15 bg-grey-50 mx-5">
  <div 
   variants={fadeIn("right", 0.2)}
   initial="hidden"
   whileInView={"show"}
   viewport={{ once: false, amount: 0.7 }}
  className="container py-8">
    
    <div className="w-full px-6">
     <iframe className='rounded-lg'
     src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.3517715577095!2d73.65217207440355!3d25.923672001895213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3969e90bfed17fb5%3A0x1bea26c3f2d3ca4a!2sErika%20Henna%20Herbal%20Private%20Limited!5e0!3m2!1sen!2sin!4v1728457437286!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
     title='Google Map'
     width= "100%"
     height="400"
     loading='lazy'
     style={{border:0}}
    allowFullScreen=""
     />
      
    </div>
  </div>
</section>

      
    </div>
  )
}

export default Contact
