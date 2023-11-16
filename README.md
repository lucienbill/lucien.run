# lucien.run
personnal redirect thingy (URL minifier)

The redirects work with pure HTML.

The redirects are configured in `redirects.yml`, and the script to build them is `node builder/build.js`.
The script also copies `index.html` to the root of the website

## How to use it
If you want your own redirect service: 
1. Fork this repo
2. Update the file `redirects.yml` with your data
3. Build this site on a vercel project tied to a domain name that you own
   - build command: `npm run build` (try it locally, you'll see what it does)
   - output directory: `redirects`
   - install command: `npm install`

## Versions

### V1.1.0

Add support for aliases.
Example:

```yaml
default-lang: "fr"

redirects:
   newsletter:
      lang: "en"
      url: "https://tinyletter.com/lucienbill"
      title: "This is my newsletter"
      description: "It's cool"
   stream:
      aliases: 
         - live
         - twitch
      url: "https://www.twitch.tv/billyzetroll"
      title: "La chaîne Twitch de Billy"
      description: "Du stream avec du code dedans !"
```

Known issues:
- it doesn't support emoji directly (`your-url.io/📺`) -> you can cheat and write the HTML file yourself in `redirects/📺/index.html`

### V1.0.0
It works!