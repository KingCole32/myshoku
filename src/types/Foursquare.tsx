export type SearchParam = {
  query: string,
  lat: number,
  long: number,
  showChains: boolean,
  radius: string,
  min_price: string,
  max_price: string,
}

export type FSCategory = {
  id: number,
  name: string,
  short_name: string,
  plural_name: string,
  icon: {
    prefix: string,
    suffix: string
  }
}

export type FSHours = {
  display: string,
  is_local_holiday: boolean,
  open_now: boolean,
  regular: {
    close: string,
    day: number,
    open: string
  }[]
}

export type FSPhoto = {
  id: number,
  created_at: string,
  prefix: string,
  suffix: string,
  width: number,
  height: number
}

export type FSSocials = {
  facebook_id: string,
  instagram: string,
  twitter: string
}

// this, in particular, could be expanded on, but requires calling their specific tip API(?)
export type FSTip = {
  created_at: string,
  text: string
}

export type FSPlace = {
  fsq_id: string,
  categories: FSCategory[],
  chains: {
    id: string,
    name: string
  }[],
  closed_bucket: string,
  distance: number,
  email: string,
  geocodes: {
    main: {
      latitude: number,
      longitude: number
    }
  },
  hours: FSHours,
  location: {
    formatted_address: string,
    address_extended: string
  },
  menu: string,
  name: string,
  photos: FSPhoto[],
  price: number,
  rating: number,
  social_media: FSSocials,
  tastes: string[],
  tel: string,
  tips: FSTip[],
  website: string
}