import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Carousel,CarouselItem , CarouselContent } from '../components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import {Card ,CardContent,CardHeader,CardTitle} from '../components/ui/card'
import companies from '../data/company.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQ from '../data/faqs.json'
const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Be An Opportunist!! Find Your Dream Job</h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        <Link to='/jobs'>
       <Button variant='blue'  size='xl'> Find Jobs</Button>
       </Link>
        <Link to='/post-jobs'>
        <Button variant='destructive' size='xl'>Post Jobs</Button>
        </Link>
      </div>
      <Carousel
      className="w-full py-10"
    >
      <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      </CarouselContent>
    </Carousel>

    <img src='/banner (1).jpeg' className='w-full px-10'/>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      <Accordion type="multiple" className="px-10">
        {FAQ.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className='glass-effect px-10'>{faq.question}</AccordionTrigger>
            <AccordionContent className='px-10'>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}

export default LandingPage 