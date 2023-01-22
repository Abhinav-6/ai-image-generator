import { surpriseMePrompts } from "../constants";

export function getRandomPrompts() {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompts = surpriseMePrompts[randomIndex];

  return randomPrompts;
}