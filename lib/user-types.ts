export type userProfileType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Role: string;
  image: string;
  about: string;
  hLeducation: string;
  country: string;
  subjects: CourseType[];
  languages: LanguageType[];
  availability: AvailabilityType[];
};

export type CourseType = {
  title: string;
  description: string;
  level: string;
  id: number;
};

export type LanguageType = {
  id: string;
  name: string;
  level: string;
};

export type AvailabilityType = {
  id: string;
  time: string;
  booked: boolean;
};
