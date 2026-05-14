// lib/api.ts
import { db } from "@server/db"
import type { Country } from "@server/types/country"
import type { Company } from "@server/types/company"
import type { Post } from "@server/types/post"

const countries: Country[] = []
const companies: Company[] = []
const posts: Post[] = []

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600; // 로딩 중일때 어떻게 UI를 표현할 것인가?
const maybeFail = () => Math.random() < 0.15; // 실패했을 경우 어떻게 처리할 것인가?
