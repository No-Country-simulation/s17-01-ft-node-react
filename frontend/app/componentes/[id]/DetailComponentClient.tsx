"use client"

import ComponentDetail from "@/components/ComponentDetail";
import { componentById } from "@/lib/axios/api/componentById";
import { Component } from "@/lib/types/api/components.type";
import { useComponentStore } from "@/store/componentStore";
import { useEffect, useState } from "react";

interface Props {
  detailComponent:Component;
}

function DetailComponentClient({detailComponent}:Props) {
  // const [ detailData, setDetailData ] = useState<Component>()
  
  // const { allComponents } = useComponentStore()

  // const filterComponents = allComponents.filter(component => component.id === 1)

  // useEffect(() => {
  //   detailComponent().then(response => {
  //     if(response) {
  //       setDetailData(response)
  //     }
  //   })

  //   // filterComponents.map(component => setDetailData(component))
  // },[detailData])

  // console.log("respuesta de dataDetail",detailData);
  
  return (detailComponent && <ComponentDetail component={detailComponent} />)
  
}

export default DetailComponentClient
