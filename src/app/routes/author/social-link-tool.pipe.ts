import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "socialLink",
})
export class SocialLinkToolPipe implements PipeTransform {
  transform(links: string) {
    // Getting website name
    let final = [];
    let site: any;

    for (let link of links) {
      site = link.replace("https://", "").replace("http://", "").split(".")[0];

      // Checking for specific website
      switch (site) {
        case "facebook":
          final.push({
            svg: "/assets/img/facebook.svg",
            link: link,
          });
          break;
        case "twitter":
          final.push({
            svg: "/assets/img/twitter.svg",
            link: link,
          });
          break;
        default:
          final.push({
            svg: `<div>Unknown</div>`,
            link: link,
          });
      }
    }
    return final;
  }
}
