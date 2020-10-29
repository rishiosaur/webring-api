import { NowRequest, NowResponse } from "@vercel/node";

const fetch = require("node-fetch");

export default async (req: NowRequest, res: NowResponse) => {
  const website = req.query.w;

  const ring: Array<string> = (
    await fetch("https://webring.hackclub.com/public/members.json").then((x) =>
      x.json()
    )
  ).map((x) => x.url);

  console.log(ring);

  const id = ring.indexOf(website as string);

  console.log(id);
  if (id > -1) {
    if (id === 0) {
      console.log(ring[ring.length-1]);
      res.redirect(307, ring[ring.length-1]);
    } else {
     console.log(ring[id-1]);
    res.redirect(307, ring[id-1]);
    }
  } else {
    console.log("Not found.");
    res.redirect(301, website as string);
  }

  res.end(200);
};
