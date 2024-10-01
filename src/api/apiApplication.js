import supabaseClient, { supabaseUrl } from "@/utils/supabase";


export async function applyToJob(token,_,jobData) {
    const supabase = await supabaseClient(token);
    
    const random = Math.floor(Math.random()*900000)
    // generating unique file name
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    const {error:storageError} = await supabase.storage.from("resume").upload(fileName,jobData.resume)

    if(storageError){
        console.error("Error uploading Resume:",error);
        return null
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`
      
    const { data, error } = await supabase.from("applications").insert([{
        ...jobData,
        resume
    }])
    .select()
  
    if (error) {
      console.log("Error submitting application:", error);
      return null;
    }
  
    return data;
  }


  export async function updateApplicationStatus(token, { job_id }, status) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("job_id", job_id)
      .select();
  
    if (error || data.length === 0) {
      console.error("Error Updating Application Status:", error);
      return null;
    }
  
    return data;
  }
  