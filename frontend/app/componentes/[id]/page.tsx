import { componentById } from "@/lib/axios/api/componentById";
import DetailComponentClient from "./DetailComponentClient";
import { useRouter } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  
 // const data = await componentById(Number(params.id))


  return (
    <div>
    <DetailComponentClient  />
    </div>
  )
}