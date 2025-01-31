"use client";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { DestincationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { useState } from "react";

export default function Home() {

  const [source,setSource]=useState([]);
  const [destination,setDestination]=useState([]);

  return (
    <SourceContext.Provider value={{source,setSource}}>
      <DestincationContext.Provider value={{destination,setDestination}}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <SearchSection />
        </div>
        <div className="md:col-span-2">
          <GoogleMapSection />
        </div>
      </div>
      </DestincationContext.Provider>
    </SourceContext.Provider>
  );
}
