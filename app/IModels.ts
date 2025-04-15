export type NobelLaureate = {
  id: string;
  knownName: TranslatedString;
  givenName: TranslatedString;
  familyName: TranslatedString;
  fullName: TranslatedString;
  orgName: TranslatedString;
  fileName: string;
  gender: "male" | "female";
  birth?: {
    date: string;
    place: Place;
  };
  founded?: {
    date: string;
    place: Place;
  };
  wikipedia: WikiLink;
  wikidata: WikiData;
  sameAs: string[];
  links: Link[];
  nobelPrizes: NobelPrize[];
  meta: Meta;
};

type TranslatedString = {
  en: string;
  se?: string;
  no?: string;
};

type Place = {
  city: TranslatedString;
  country: TranslatedString;
  cityNow: WikiPlace;
  countryNow: WikiPlace;
  continent: TranslatedString;
  locationString: TranslatedString;
};

type WikiPlace = {
  en: string;
  no?: string;
  se?: string;
  sameAs?: string[];
  latitude: string;
  longitude: string;
};

type WikiLink = {
  slug: string;
  english: string;
};

type WikiData = {
  id: string;
  url: string;
};

type Link = {
  rel: string;
  href: string;
  title?: string;
  action: string;
  types: string;
  class?: string[];
};

type NobelPrize = {
  awardYear: string;
  category: TranslatedString;
  categoryFullName: TranslatedString;
  sortOrder: string;
  portion: string;
  dateAwarded: string;
  prizeStatus: string;
  motivation: TranslatedString;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  affiliations: Affiliation[];
  links: Link[];
};

type Affiliation = {
  name: TranslatedString;
  nameNow: TranslatedString;
  city: TranslatedString;
  country: TranslatedString;
  cityNow: WikiPlace;
  countryNow: WikiPlace;
  continent: TranslatedString;
  locationString: TranslatedString;
};

type Meta = {
  terms: string;
  license: string;
  disclaimer: string;
};
