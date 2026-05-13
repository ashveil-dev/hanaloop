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

export async function createOrUpdatePost(p: Omit<Post, "id"> & { id?: string }) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");

  const result = await db.query(`SELECT * FROM posts`);
  let posts = result.rows;

  if (p.id) {
    posts = posts.map(x => x.id === p.id ? (p as Post) : x);
    return p as Post;
  }
  const created = { ...p, id: crypto.randomUUID() };
  posts = [...posts, created];
  return created;
}