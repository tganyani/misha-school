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
  imagePublicId: string;
  subjects: CourseType[];
  languages: LanguageType[];
  availability: AvailabilityType[];
  tutorComments: CommentsType[];
  freeTrials: {
    studEmail: string;
  }[];
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

export type CommentsType = {
  id: string | null;
  text: string | null;
  updatedAt: string | Date;
  student: {
    imagePublicId: string | null;
    firstName: string;
    lastName: string;
    image: string | null;
  };
  tutor: {
    imagePublicId: string | null;
    firstName: string;
    lastName: string;
    image: string | null;
    id: number | null;
  };
};
