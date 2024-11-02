
import { cache } from "react";
import { auth } from "@/auth";

export default cache(auth);
// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#fetching-data-where-its-needed