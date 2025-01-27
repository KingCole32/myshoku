"use client"

import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import iconPathMap from "@/assets/iconPaths";
import { FSPlace } from "@/types/Foursquare";

type MapProps = {
  updateIndexFunc: (index: number) => void,
  lat?: number,
  long?: number,
  places?: FSPlace[]
}

const TheMap: React.FC<MapProps> = ({updateIndexFunc, lat = 35.664904830467634, long = 139.73780907116344, places = []}) => {
  // custom svg-based icon
  const humanIcon = iconPathMap.get("human")
  const userIcon = divIcon({
    html: `
      <svg
        height="50"
        width="50"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path d="${humanIcon
          ? humanIcon
          : "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" // error icon
        }"></path></svg>`,
    className: "svg-icon fill-primary stroke-secondary",
    iconAnchor: [25, 50]
  })

  const locMarkerIcon = iconPathMap.get("location")
  const placeIcon = divIcon({
    html: `
      <svg
        height="50"
        width="50"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path d="${locMarkerIcon
          ? locMarkerIcon
          : "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" // error icon
        }"></path></svg>`,
    className: "svg-icon fill-red-400 stroke-red-900",
    iconAnchor: [25, 50]
  })

  return (
    <MapContainer center={[lat,long]} zoom={14} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat,long]} icon={userIcon}></Marker>
      {places.map((place, index) => {
        return (
          <Marker
            key={place.fsq_id}
            position={[place.geocodes.main.latitude, place.geocodes.main.longitude]}
            icon={placeIcon}
            eventHandlers={{
              click: () => {
                updateIndexFunc(index)
              },
            }}
          >
            <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
              <span>{place.name}</span>
              <span className="text-orange-300">{place.rating ? ` ${Math.round(place.rating/2)}★` : ""}</span>
            </Tooltip>
          </Marker>)
      })}
    </MapContainer>
  )
}

export default TheMap