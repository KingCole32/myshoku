"use client"

import { useMemo, useState } from "react";
import dynamic from 'next/dynamic'
import BaseIcon from "../components/base/BaseIcon";
import FoodInfo from "../components/FoodInfo";
import Search from "../components/TheSearch";
import { fetchPlaces } from "../repositories/PlaceRepository";
import getRandomFromRange from "@/helpers/getRandomFromRange";
import placeTypeList from "@/assets/placeTypeList";
import { useQuery } from "@tanstack/react-query";
import { FSPlace, SearchParam } from "@/types/Foursquare";

export default function FoodSearch() {
  // because leaflet attempts to interface with window, throwing an error on first render otherwise
  const DynamicMap = dynamic(() => import('../components/TheMap'), {
    ssr: false,
  })

  const [isSearch, setIsSearch] = useState(false)
  const [indexFromMap, setIndexFromMap] = useState(-1)

  const [searchParams, setSearchParams] = useState({
    query: "",
    lat: 35.664791515314214,
    long: 139.7378627153463,
    showChains: true,
    radius: "1000",
    min_price: "1",
    max_price: "4"
  } as SearchParam)
  const [currRandomType, setCurrRandomType] = useState(placeTypeList[getRandomFromRange(0,placeTypeList.length)])
  // TODO: had tried using predfined useQuery useSearchPlaces, but data was never properly returned despite successful responses
  const { data, refetch } = useQuery({
    queryKey: ["randomPlace", 35.664791515314214, 139.7378627153463, currRandomType],
    queryFn: () => fetchPlaces(35.664791515314214, 139.7378627153463, currRandomType),
    refetchInterval: (query) => {
      const latestData = query.state.data
      if (latestData && latestData.length < 1) {
        setCurrRandomType(placeTypeList[getRandomFromRange(0, placeTypeList.length)])
        return 100
      } else return false
    },
  })

  const { data: searchData, isFetching, isRefetching } = useQuery({
    queryKey: ["searchPlace", searchParams.lat, searchParams.long, searchParams.query, searchParams.radius],
    queryFn: () => fetchPlaces(searchParams.lat, searchParams.long, searchParams.query, searchParams.radius)
  })
  
  const currPlaces = useMemo((): FSPlace[] => {
    if (isSearch && searchData) return searchData
    if (data && data.length>1) return [data[getRandomFromRange(0, data.length)]]
    else if (data && data.length==1) return [data[0]]
    else return []
  }, [data, searchData])

  const handleRandomize = async () => {
    if (isSearch) setIsSearch(false)
    else {
      setCurrRandomType(placeTypeList[getRandomFromRange(0, placeTypeList.length)])
      await refetch()
    }
  }

  return (
    <>
      {/* content container */}
      <div className="flex content-container">
        {/* top (map) container */}
        <div className="flex flex-col bg-green-200 container-map">
          <DynamicMap
            places={currPlaces ? currPlaces : []}
            lat={isSearch?searchParams.lat:undefined}
            long={isSearch?searchParams.long:undefined}
            updateIndexFunc={setIndexFromMap}></DynamicMap>
        </div>

        {/* bottom (food info + search) container */}
        <div className="flex flex-col grow shrink items-center justify-start bg-white p-5 container-food">

          {/* top buttons */}
          <div className="flex flex-row h-fit w-fit mb-5 bg-primary rounded-full overflow-hidden">
            <button className="px-4 py-2 bg-primary border-r-2" onClick={handleRandomize}>
              <BaseIcon size={"28"} name="dice" color="white"></BaseIcon>
            </button>

            <span className="flex items-center px-2 py-4 font-bold text-white text-nowrap text-center">
              {isSearch
                ? "Explore Local Cuisine"
                : "Today's Cuisine"
              }
            </span>

            <button className="px-4 py-2 bg-primary border-l-2" onClick={() => setIsSearch(true)}>
              <BaseIcon size={"28"} name="search" color="white"></BaseIcon>
            </button>
          </div>

          {/* general interactions area */}
          <div className="flex flex-col h-full w-full overflow-hidden scroll-auto">
            {isSearch ?
                <Search
                  results={searchData ? searchData : []}
                  updateSeachParamFunc={setSearchParams}
                  isLoading={isFetching || isRefetching}
                  selectedPlaceIndex={indexFromMap}></Search>
              :
                <FoodInfo place={currPlaces[0] ? currPlaces[0] : undefined}></FoodInfo>
            }
            
          </div>
        </div>
      </div>

      <style lang="css">{`
        {/* to add media query for mobile later */}
        .content-container { 
          height: 100%;
          width: 100%;

          flex-direction: row;
          flex-shrink: 1;

          border-radius: 0.375rem;
        }

        .container-map {
          height: 100%;
          min-width: 50%;
        }

        .container-food {
          height: 100%;
          width: 50%;

          color: black;
        }

        @media screen and (max-width: 550px) {
          .content-container { 
            height: 100vh;
            height: 100svh;
            width: 100%;

            border-radius: 0;
          }
        }
      `}</style>
    </>
  )
}
