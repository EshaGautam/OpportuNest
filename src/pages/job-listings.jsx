import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getJobs, saveJobs } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/JobCard";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1); // Pagination state
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, { searchQuery, location, company_id });

   

  const {
    
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, searchQuery, location, company_id]);


  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  function clearFilters(){
    setCompany_id("")
    setLocation("")
    setSearchQuery("")
    setPage(1);
  }



  return (
    <div className="px-10">
      <h1 className="gradient-title font-extrabold  text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
     <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
      <Select value={location} onValueChange={(value)=>setLocation(value)}>
      <SelectTrigger >
        <SelectValue placeholder="Filter By Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {State.getStatesOfCountry("IN").map(({name})=>{
       
          return(<SelectItem value={name} key={name}>{name}</SelectItem>)
        })}
     
        </SelectGroup>
      </SelectContent>
    </Select>
      <Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger >
        <SelectValue placeholder="Filter By Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {companies.map(({name,id})=>{
          return(<SelectItem value={id} key={name}>{name}</SelectItem>)
        })}
     
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button onClick={clearFilters} variant='destructive' className="sm:w-1/2">Clear Filters</Button>
      </div>

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => <JobCard key={job.id} job={job} saveInit={job?.saved?.length > 0} />)
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}

      
    </div>
  );
};

export default JobListing;
