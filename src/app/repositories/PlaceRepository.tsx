import { FSPlace } from "@/types/Foursquare";
import { useQuery } from "@tanstack/react-query";

// accepted langs for FS API's
// English	en (default)
// Spanish	es
// French	fr
// German	de
// Italian	it
// Japanese	ja
// Thai	th
// Turkish	tr
// Korean	ko
// Russian	ru
// Portuguese	pt
// Indonesian	id

const placeHeader: HeadersInit = {
  Accept: 'application/json',
  // Authorization: process.env.FQ_API_KEY ? process.env.FQ_API_KEY : "",
  Authorization: "fsq3eAhw1P67E6lrP99cwuryzHij9Qpy6AGavUplpggXSdI=",
  "accept-language": "en"
}

export const fetchPlaces = async (lat: number, long: number, query?: string, radius="1000", showChains=true, minPrice="1", maxPrice="4")
: Promise<Array<FSPlace>> => {
  const url = "https://api.foursquare.com/v3/places/search?"
  const params = new URLSearchParams({
    query: query ? query : "",
    ll: `${lat},${long}`,
    radius: radius,
    catgories: "63be6904847c3692a84b9bb5",
    exclude_all_chains: (!showChains).toString(),
    fields: "fsq_id,name,geocodes,categories,chains,distance,closed_bucket,description,tel,email,website,social_media,hours,rating,price,location,menu,photos,tips,tastes",
    min_price: minPrice,
    max_price: maxPrice,
    open_now: "true",
    limit: "25"
  }).toString();

  const res = await global.fetch(url + params, {method: "GET", headers: placeHeader})
  const data = await res.json()
  return data.results as FSPlace[]
}

// exclusively for searches
export const useSearchPlaces = (lat: number, long: number, query?: string, radius="1000", showChains=true, minPrice="1", maxPrice="4") => {
  return useQuery({
    queryKey: ["customPlaces", lat, long, query, radius, showChains, minPrice, maxPrice],
    queryFn: () => fetchPlaces(lat, long, query, radius, showChains, minPrice, maxPrice),
    initialData: [],
    enabled: false
  })
}