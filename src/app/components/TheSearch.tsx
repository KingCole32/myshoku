import { useEffect, useState } from "react"
import BaseIcon from "./base/BaseIcon";
import { FSPlace, SearchParam } from "@/types/Foursquare";
import FoodInfo from "./FoodInfo";
import BaseRating from "./base/BaseRating";

type SearchProps = {
  results: FSPlace[],
  updateSeachParamFunc: (newParams: SearchParam) => void,
  isLoading?: boolean,
  selectedPlaceIndex?: number,
}

const TheSearch: React.FC<SearchProps> = ({results, updateSeachParamFunc, selectedPlaceIndex=-1}) => {
  const [currKeywords, setCurrKeywords] = useState("")
  const [isLocEnabled, setIsLocEnabled] = useState(false)
  const [isShowChains, setIsShowChains] = useState(true)
  const [userLat, setUserLat] = useState(35.664791515314214)
  const [userLong, setUserLong] = useState(139.7378627153463)
  const [currRadius, setCurrRadius] = useState("1000")
  const [currMin, setCurrMin] = useState("1")
  const [currMax, setCurrMax] = useState("4")

  const [currPlaceIndex, setCurrPlaceIndex] = useState(-1)
  useEffect(() => {
    setCurrPlaceIndex(selectedPlaceIndex)
  }, [selectedPlaceIndex])

  const searchParams = {
    query: currKeywords,
    lat: userLat,
    long: userLong,
    showChains: isShowChains,
    radius: currRadius,
    min_price: currMin,
    max_price: currMax,
  } as SearchParam

  const pollLoc = () => {
    navigator.geolocation.getCurrentPosition(
      (geoLoc: GeolocationPosition) => {
        setUserLat(geoLoc.coords.latitude)
        setUserLong(geoLoc.coords.longitude)
      },
      (geoErr: GeolocationPositionError) => {
        console.error("Could not get user location: ", geoErr)
      },
      {
        maximumAge: 0, // time in milliseconds before cached result is considered "old" and a new result will be requested
        timeout: Infinity, // time in milliseconds to wait for a response before failing
        enableHighAccuracy: false // true for better results at the cost of device energy and response time
      }
    )
  }

  const toggleAndPingLoc = () => {
    if (!isLocEnabled) pollLoc()
    setIsLocEnabled(!isLocEnabled)
  }

  const setAndValidateCurrMin = (newMin: string) => {
    setCurrMin(newMin)
    if (newMin > currMax) setCurrMax(newMin)
  }
  const setAndValidateCurrMax = (newMax: string) => {
    setCurrMax(newMax)
    if (newMax < currMin) setCurrMin(newMax)
  }


  const resetFields = () => {
    setCurrKeywords("")
    setIsLocEnabled(false)
    setIsShowChains(true)
    setUserLat(35.664791515314214)
    setUserLong(139.7378627153463)
    setCurrRadius("1000")
    setCurrMin("0")
    setCurrMax("4")
  }

  return (
    <div className="flex flex-col h-fit w-full overflow-scroll">
      {/* search container */}
      <div className="flex flex-col items-start justify-start h-full w-full mb-5">
      
        {/* search fields */}
        <div className="flex flex-col h-fit w-full bg-primary rounded-lg p-2">
          <div className="flex h-fit w-fit">
            <div className="flex h-fit w-fit items-center justify-center rounded-full bg-secondary p-2 mb-4">
              <span className="flex w-fit text-white font-bold text-center px-1 py-2 ">
                Use current location?
              </span>
              <button 
                className="flex items-center justify-center h-[26px] min-w-[26px] bg-white border-2 border-slate-600 rounded-lg text-slate-600 ml-2"
                onClick={toggleAndPingLoc}
              >
                {isLocEnabled ? "✔︎" : ""}
              </button>
              {isLocEnabled &&
                <button className="bg-secondary rounded-full ml-2 p-1" onClick={pollLoc}>
                  <BaseIcon name="refresh" size="24" color="white"></BaseIcon>
                </button>
              }
            </div>
            <div className="flex h-fit w-fit items-center justify-center rounded-full bg-secondary p-2 mb-4 ml-4">
              <span className="flex w-fit text-white font-bold text-center px-1 py-2 ">
                Show chain restaurants?
              </span>
              <button 
                className="flex items-center justify-center h-[26px] min-w-[26px] bg-white border-2 border-slate-600 rounded-lg text-slate-600 ml-2"
                onClick={() => setIsShowChains(!isShowChains)}
              >
                {isShowChains ? "✔︎" : ""}
              </button>
            </div>
          </div>
          <div className="flex flex-col h-fit w-full mb-4">
            <span className="flex items-center h-fit w-full bg-secondary rounded-t-lg text-white font-bold px-1 py-2 ">
              <span>{"Keywords (separated by comma's)"}</span>
            </span>
            <textarea
              value={currKeywords}
              className="flex w-full min-h-[40px] resize-none border border-primary rounded-b-lg px-1 py-2 mr-1"
              placeholder="sushi, cheap, casual, ..."
              onChange={e => setCurrKeywords(e.target.value)}
            />
          </div>
          <div className="flex h-fit w-full mb-4">
            <span className="flex items-center w-fit h-full bg-secondary rounded-l-full text-white text-nowrap font-bold px-1 py-2 ">
              <span>Radius (meters)</span>
            </span>
            <input
              value={currRadius}
              type="number"
              inputMode="numeric"
              className="flex w-full border border-primary rounded-r-full px-1 py-2 mr-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="1000"
              onChange={e => setCurrRadius(e.target.value)}
            />
          </div>
          <div className="flex items-center h-fit w-full bg-secondary rounded-full mb-5 pr-4">
            <span className="flex items-center w-fit h-full bg-secondary rounded-l-full text-white text-nowrap font-bold px-1 py-2 ">
              <span>Price range</span>
            </span>
            <select
              value={currMin}
              name="min" 
              className="flex w-full border border-primary px-1 py-2 mr-1"
              onChange={e => {setAndValidateCurrMin(e.target.value)}}
            >
              <option value="1">very cheap</option>
              <option value="2">below average</option>
              <option value="3">average</option>
              <option value="4">expensive</option>
            </select>
            <span className="text-white font-bold">to</span>
            <select 
              value={currMax}
              name="max" 
              className="flex w-full border border-primary px-1 py-2 ml-1"
              onChange={e => {setAndValidateCurrMax(e.target.value)}}
            >
              <option value="1">very cheap</option>
              <option value="2">below average</option>
              <option value="3">average</option>
              <option value="4">expensive</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="h-fit w-fit bg-secondary text-white font-bold border border-secondary rounded-full px-4 py-1"
              onClick={() => {updateSeachParamFunc(searchParams)}}
            >
              Search
            </button>
            <button
              className="h-fit w-fit bg-white text-secondary font-bold outline outline-solid outline-secondary rounded-full ml-2 px-4 py-1"
              onClick={resetFields}
            >
              Reset
            </button>
          </div>
        </div>

      </div>

      <div className="flex flex-col h-fit w-full">
        {results.length > 0 && <div className="h-fit w-full bg-secondary rounded-t-full font-bold text-white center text-center mb-1">
          Found {results.length} interesting place(s)
        </div>}
        {results.length > 0 ? 
            results.map(((result, index) => {
              if (currPlaceIndex != index) return (
                <button 
                  className="flex h-fit w-full border-2 border-2 border-slate-300 rounded-lg mb-2"
                  key={"result" + index}
                  onClick={() => setCurrPlaceIndex(index)}
                >
                  <div className="flex flex-row max-h-1/3 max-w-1/3 overflow-y-scroll rounded-l-md">
                    {result.photos.length > 0 &&
                      <img 
                        className="h-full" 
                        src={`${result.photos[0].prefix}200x200${result.photos[0].suffix}`}
                        alt={"ResultPreview" + index}
                        key={"RestaurantImage" + index} 
                      />
                    }
                  </div>
                  <div className="flex flex-col h-full w-full bg-white">
                    <div className="flex flex-col items-center justify-center h-fit w-full pb-5">
                      <div className="h-fit w-fit font-bold text-2xl">{result.name}</div>
                      <div className="h-fit">{(result.categories.flatMap(cat => cat.name).join(", "))}</div>
                      <div className="flex h-fit w-fit">
                        {result.rating && <BaseRating score={Math.round(result.rating/2)} max={5} color="orange-300" character="★"/>}
                        {result.price &&
                          <BaseRating score={result.price} max={4} color="green-600" character="$" classExtra="font-bold tracking-[.25em] ml-1"/>
                        }
                        <div className="flex items-center w-fit h-fit border-2 border-slate-900 rounded-full px-1 ml-1">
                          <BaseIcon name="walk" size="20" color="black"></BaseIcon> 
                          <span className="pl-1">
                            {`~${Math.floor(result.distance/80)}min`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>)
              else return (<FoodInfo place={result} key={"fullInfo" + index}></FoodInfo>)
            }))
          :
            <div className="h-fit w-full border-2 border-slate-300 text-slate-300 text-center rounded-lg p-2">No results to show</div>
        }
      </div>
    </div>
  )
}

export default TheSearch