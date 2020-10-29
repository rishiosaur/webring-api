import { NowRequest, NowResponse } from "@vercel/node";

const fetch = require("node-fetch");

export default async (req: NowRequest, res: NowResponse) => {
  const website = String.raw`${req.query.w}`;

  console.log(website);

  const ring: Array<string> = (
    await fetch("https://webring.hackclub.com/public/members.json").then((x) =>
      x.json()
    )
  ).map((x) => x.url);

  const id = ring.indexOf(website as string);
  if (id > -1) {
    if (id === ring.length - 1) {
      console.log(ring[0]);
      res.redirect(307, ring[0]);
    } else {
     console.log(ring[id+1]);
    res.redirect(307, ring[id+1]);
    }
  } else {
    console.log("Not found.");
    res.redirect(301, website as string);
  }

  res.end(200);
};
