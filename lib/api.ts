// lib/api.ts

import type { Country, Company, Post } from "./type";

const countries: Country[] = []
const companies: Company[] = []
const posts: Post[] = []

let _countries = [...countries];
let _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600; // 로딩 중일때 어떻게 UI를 표현할 것인가?
const maybeFail = () => Math.random() < 0.15; // 실패했을 경우 어떻게 처리할 것인가?

export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(p: Omit<Post, "id"> & { id?: string }) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    _posts = _posts.map(x => x.id === p.id ? (p as Post) : x);
    return p as Post;
  }
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}