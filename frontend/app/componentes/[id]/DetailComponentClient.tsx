"use client"

import ComponentDetail from "@/components/ComponentDetail";
import { componentById } from "@/lib/axios/api/componentById";
import { Component } from "@/lib/types/api/components.type";
import { useComponentStore } from "@/store/componentStore";
import { de } from "date-fns/locale";
import { fi } from "date-fns/locale/fi";
import { useEffect, useState } from "react";

interface Props {
  detailComponent?:Component;
}

function DetailComponentClient() {
   const [ detailData, setDetailData ] = useState<Component>()
  
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await componentById(1)
      setDetailData(data)
    }
    fetchData()
  }, [])
  console.log("--->",detailData?.name)
  return ( detailData && <ComponentDetail component={detailData} />)
  
}

export default DetailComponentClient
