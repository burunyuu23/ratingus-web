import { LESSONS_PATH } from "../constants";
import { DayLesson } from "../model";

import { baseApi } from "@/shared/api/rtkq";

export const lessonsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessonsByWeek: build.query<DayLesson[], { week: number }>({
      query: (params) => ({ url: LESSONS_PATH, params, method: "get" }),
    }),
  }),
});

export const { useGetLessonsByWeekQuery } = lessonsApi;
