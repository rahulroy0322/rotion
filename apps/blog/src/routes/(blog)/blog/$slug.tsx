import { createFileRoute } from '@tanstack/react-router'
import { type FC, useState } from 'react'
import { Image } from '#/components/image'
import { Main } from '#/components/main'
import type { ImageType } from '#/types'
import { Button } from '@/components/ui/button'

//  name: "Author Name",
//     avatar: "/write.jpg",

const images = [
  {
    url: '/write.jpg',
  },
  {
    url: '/write.jpg',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/write.jpg',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/write.jpg',
  },
] as ImageType[] satisfies ImageType[]

type BlogPageImagesPropsType = {
  images: ImageType[]
  slug: string
}

const BlogPageImages: FC<BlogPageImagesPropsType> = ({ slug, images }) => {
  const [selectedImage, setSelectedImage] = useState(images.at(0))

  if (!selectedImage) {
    return null
  }

  return (
    <div className="space-y-2 overflow-hidden">
      <Image
        alt={selectedImage.alt || slug}
        className="aspect-video md:aspect-20/9 lg:aspect-10/3"
        src={selectedImage.url}
      />

      <div className="flex gap-2 overflow-auto pb-3 scroll-smooth items-center mx-auto max-w-full w-fit px-1">
        {images.map(({ url, alt = slug }) => (
          <Button
            aria-label={`See ${alt}`}
            className="aspect-video h-20 w-auto p-0 cursor-pointer"
            key={`${alt}-${url}`}
            onClick={() =>
              setSelectedImage({
                url,
                alt,
              })
            }
            render={
              <Image
                alt={alt}
                src={url}
              />
            }
            variant="ghost"
          />
        ))}
      </div>
    </div>
  )
}

// !dummy data from w3schools
const blogContent = `

      <div id="mainLeaderboard" style="overflow:hidden;">
        <!-- MainLeaderboard-->
      <div></div></div>

<h1 class="with-bookmark"><div id="bookmark-btn" class="bookmark-btn" title="Click to add bookmark"><div class="-svg-icon -on" style="mask: url(&quot;/lib/my-learning/icon/main/bookmark-on.svg&quot;) center center / auto 100% no-repeat;"></div><div class="-svg-icon -off -active" style="mask: url(&quot;/lib/my-learning/icon/main/bookmark-off.svg&quot;) center center / auto 100% no-repeat;"></div></div>JavaScript Introduction</h1>
<div class="w3-clear nextprev">
<a class="w3-left w3-btn" href="default.asp">❮ Previous</a>
<a class="w3-right w3-btn" href="js_whereto.asp">Next ❯</a>
</div>
<!--start-->
<div class="ws-info">
<h2>What Can JavaScript Do?</h2>
<p>JavaScript is the programming language of the web.</p>
<p>It can calculate, manipulate and validate data.</p>
<p>It can update and change both HTML and CSS.</p>
</div>
<!--stop-->
<hr>
<!--start-->
<h2>JavaScript Can Change HTML Content</h2>
<p>One of many JavaScript HTML methods is <code class="w3-codespan">getElementById()</code>.</p>
<p>The example below "finds" an HTML element (with id="demo"), 
and changes the element content (innerHTML) to "Hello JavaScript":</p>

<div class="w3-example">
<h3>Example</h3>
<div class="w3-code notranslate jsHigh"><span class="jscolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color=""><span class="jsnumbercolor" style="color: rgb(153, 0, 85); --darkreader-inline-color: var(--darkreader-text-990055, #ff61b9);" data-darkreader-inline-color="">
</span> document.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">getElementById</span>(<span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"demo"</span>).<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">innerHTML</span> = <span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"Hello JavaScript"</span>; </span></div>
<a target="_blank" class="w3-btn w3-margin-bottom" href="tryit.asp?filename=tryjs_intro_inner_html">Try it Yourself »</a>
</div>
<div class="w3-panel ws-note">
<p>JavaScript accepts both double and single quotes:</p>
</div>

<div class="w3-example">
<h3>Example</h3>
<div class="w3-code notranslate jsHigh"><span class="jscolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color=""><span class="jsnumbercolor" style="color: rgb(153, 0, 85); --darkreader-inline-color: var(--darkreader-text-990055, #ff61b9);" data-darkreader-inline-color="">
</span> document.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">getElementById</span>(<span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">'demo'</span>).<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">innerHTML</span> = <span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">'Hello JavaScript'</span>; </span></div>
  <a class="w3-btn w3-margin-bottom" href="tryit.asp?filename=tryjs_intro_inner_html_quotes" target="_blank">Try it Yourself »</a>
</div>
<!--stop-->
<hr>
<!--start-->
<h2>JavaScript Can Change HTML Attribute Values</h2>
<p>In this example JavaScript changes the value of the <code class="w3-codespan">src</code> (source) attribute of an <code class="w3-codespan">&lt;img&gt;</code> tag:</p>

<div class="w3-example">
<h3>The Light Bulb</h3>
<div class="w3-padding-16 w3-white notranslate" style="text-align: center; background-color: white !important; --darkreader-inline-bgcolor: var(--darkreader-background-ffffff, #181a1b);" data-darkreader-inline-bgcolor="">
<button onclick="document.getElementById('myImage').src='pic_bulbon.gif'">Turn on the light</button>
<img id="myImage" border="0" src="pic_bulboff.gif" style="width:100px">
<button onclick="document.getElementById('myImage').src='pic_bulboff.gif'">Turn off the light</button>
</div>
<p>
<a class="w3-btn" href="tryit.asp?filename=tryjs_intro_lightbulb" target="_blank">Try it Yourself »</a>
</p>
</div>
<!--stop-->
<hr>
<div id="midcontentadcontainer" style="overflow:auto;text-align:center">
<!-- MidContent -->
<!-- <p class="adtext">Advertisement</p> -->
<div></div><p class="remove-ads-container"><a class="remove-ads ga-featured ga-remove-ads" href="https://order.w3schools.com/plans" target="_blank" rel="noopener">REMOVE ADS</a></p></div>
<hr>
<!--start-->
<h2>JavaScript Can Change HTML Styles (CSS)</h2>
<p>Changing the style of an HTML element, is a variant of changing an HTML 
attribute:</p>

<div class="w3-example">
<h3>Example</h3>
<div class="w3-code notranslate jsHigh"><span class="jscolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color=""><span class="jsnumbercolor" style="color: rgb(153, 0, 85); --darkreader-inline-color: var(--darkreader-text-990055, #ff61b9);" data-darkreader-inline-color="">
</span> document.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">getElementById</span>(<span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"demo"</span>).<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">style</span>.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">fontSize</span> = <span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"35px"</span>; </span></div>
<a target="_blank" class="w3-btn w3-margin-bottom" href="tryit.asp?filename=tryjs_intro_style">Try it Yourself »</a>
</div>
<!--stop-->
<hr>
<!--start-->
<h2>JavaScript Can Hide HTML Elements</h2>
<p>Hiding HTML elements can be done by changing the <code class="w3-codespan">display</code> style:</p>

<div class="w3-example">
<h3>Example</h3>
<div class="w3-code notranslate jsHigh"><span class="jscolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color=""><span class="jsnumbercolor" style="color: rgb(153, 0, 85); --darkreader-inline-color: var(--darkreader-text-990055, #ff61b9);" data-darkreader-inline-color="">
</span> document.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">getElementById</span>(<span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"demo"</span>).<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">style</span>.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">display</span> = <span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"none"</span>; </span></div>
 <a class="w3-btn w3-margin-bottom" href="tryit.asp?filename=tryjs_intro_hide" target="_blank">Try it Yourself »</a>
</div>
<!--stop-->
<hr>
<!--start-->
<h2>JavaScript Can Show HTML Elements</h2>
<p>Showing hidden HTML elements can also be done by changing the <code class="w3-codespan">display</code> style:</p>

<div class="w3-example">
<h3>Example</h3>
<div class="w3-code notranslate jsHigh"><span class="jscolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color=""><span class="jsnumbercolor" style="color: rgb(153, 0, 85); --darkreader-inline-color: var(--darkreader-text-990055, #ff61b9);" data-darkreader-inline-color="">
</span> document.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">getElementById</span>(<span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"demo"</span>).<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">style</span>.<span class="jspropertycolor" style="color: black; --darkreader-inline-color: var(--darkreader-text-000000, #e8e6e3);" data-darkreader-inline-color="">display</span> = <span class="jsstringcolor" style="color: green; --darkreader-inline-color: var(--darkreader-text-008000, #72ff72);" data-darkreader-inline-color="">"block"</span>; </span></div>
 <a class="w3-btn w3-margin-bottom" href="tryit.asp?filename=tryjs_intro_show" target="_blank">Try it Yourself »</a>
</div>

<div class="w3-panel ws-note">
<h3>Did You Know?</h3>
<p>JavaScript and <a href="/java/default.asp">Java</a> are two completely different languages, both in concept 
and design.</p>
<p>JavaScript was invented by Brendan Eich in 1995, and became an ECMA standard  
in 1997.</p>
<p>ECMA-262 is the official name of the standard. ECMAScript is the official name of the language.
</p>
<a class="ws-btn" href="js_versions.asp">See all JavaScript Versions »</a>
</div>
<!--stop-->
<hr>
<div id="exercisecontainer" src="xrcise_intro.js"><h2>Exercise<span class="questionmark w3-tooltip"><span style="display:block;text-align:left;">?</span><span class="w3-text" style="padding:0 20px 30px 20px"><b>What is this?</b><br>Test your skills by answering a few questions about the topics of this page</span></span></h2><p>True or False.<br>JAVA is short for JavaScript.</p><br><form action="exercise.asp?x=xrcise_intro1" method="post" target="_blank" rel="opener"><div class="quizoption"><input type="radio" name="quizoption" id="quizoption0" value="0"><label for="quizoption0">True</label></div><div class="quizoption"><input type="radio" name="quizoption" id="quizoption1" value="1"><label for="quizoption1">False</label></div><br><button type="submit" class="ws-btn">Submit Answer »</button></form></div>
<hr>
<div class="w3-padding w3-round" style="background-color: rgb(40, 43, 53); color: white; margin-bottom: 10px; --darkreader-inline-bgcolor: var(--darkreader-background-282b35, #20222a); --darkreader-inline-color: var(--darkreader-text-ffffff, #e8e6e3);" data-darkreader-inline-bgcolor="" data-darkreader-inline-color="">
  <h2 style="max-width:720px;position:relative;margin:auto;text-decoration: none;text-align:center">Video: JavaScript Introduction</h2>
  <a href="https://youtu.be/zofMnllkVfI&amp;list=PLP9IO4UYNF0WWmZpE3W33vVPRl2GvjEqz" class="ga-featured ga-youtube" target="blank_">
    <div id="yt_container" style="max-width:720px;position:relative;margin:auto;">
      <div style="position:absolute;top:40%;text-align: center;margin:auto;">
        <picture>
          <source srcset="images/yt_logo_rgb_dark.webp" type="image/webp">
          <img src="images/yt_logo_rgb_dark.png" style="width:30%;" alt="Tutorial on YouTube" loading="lazy">
        </picture>
      </div>
      <picture id="yt_div">
        <source srcset="images/img_javascript_intro.webp" type="image/webp">
        <img src="images/img_javascript_intro.png" style="max-width:100%;height:auto;border-radius:6px" alt="Tutorial on YouTube" loading="lazy">
      </picture>
    </div>
  </a>
</div>
<hr>
<div class="w3-clear nextprev">
<a class="w3-left w3-btn" href="default.asp">❮ Previous</a>
<a class="w3-right w3-btn" href="js_whereto.asp">Next ❯</a>
</div>
<div id="user-profile-bottom-wrapper" class="user-profile-bottom-wrapper">
  <div class="user-authenticated w3-hide">
    <a href="https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fwww.w3schools.com%2Fjs%2Fjs_intro.asp" class="user-profile-btn user-profile-bottom-btn ga-bottom ga-bottom-profile" title="Your W3Schools Profile" aria-label="Your W3Schools Profile" target="_top">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2048 2048" class="user-profile-icon" aria-label="Your W3Schools Profile Icon">
        <path d="M 843.500 1148.155 C 837.450 1148.515, 823.050 1149.334, 811.500 1149.975 C 742.799 1153.788, 704.251 1162.996, 635.391 1192.044 C 517.544 1241.756, 398.992 1352.262, 337.200 1470 C 251.831 1632.658, 253.457 1816.879, 340.500 1843.982 C 351.574 1847.431, 1696.426 1847.431, 1707.500 1843.982 C 1794.543 1816.879, 1796.169 1632.658, 1710.800 1470 C 1649.008 1352.262, 1530.456 1241.756, 1412.609 1192.044 C 1344.588 1163.350, 1305.224 1153.854, 1238.500 1150.039 C 1190.330 1147.286, 1196.307 1147.328, 1097 1149.035 C 1039.984 1150.015, 1010.205 1150.008, 950 1149.003 C 851.731 1147.362, 856.213 1147.398, 843.500 1148.155" stroke="none" fill="#2a93fb" fill-rule="evenodd" style="--darkreader-inline-stroke: none; --darkreader-inline-fill: var(--darkreader-text-2a93fb, #38a4fb);" data-darkreader-inline-stroke="" data-darkreader-inline-fill=""></path>
        <path d="M 1008 194.584 C 1006.075 194.809, 999.325 195.476, 993 196.064 C 927.768 202.134, 845.423 233.043, 786 273.762 C 691.987 338.184, 622.881 442.165, 601.082 552 C 588.496 615.414, 592.917 705.245, 611.329 760.230 C 643.220 855.469, 694.977 930.136, 763.195 979.321 C 810.333 1013.308, 839.747 1026.645, 913.697 1047.562 C 1010.275 1074.879, 1108.934 1065.290, 1221 1017.694 C 1259.787 1001.221, 1307.818 965.858, 1339.852 930.191 C 1460.375 795.998, 1488.781 609.032, 1412.581 451.500 C 1350.098 322.327, 1240.457 235.724, 1097.500 202.624 C 1072.356 196.802, 1025.206 192.566, 1008 194.584" stroke="none" fill="#0aaa8a" fill-rule="evenodd" style="--darkreader-inline-stroke: none; --darkreader-inline-fill: var(--darkreader-text-0aaa8a, #58f5d6);" data-darkreader-inline-stroke="" data-darkreader-inline-fill=""></path>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" class="user-progress" aria-label="Your W3Schools Profile Progress">
        <path class="user-progress-circle1" fill="none" d="M 25.99650934151373 15.00000030461742 A 20 20 0 1 0 26 15"></path>
        <path class="user-progress-circle2" fill="none" d="M 26 15 A 20 20 0 0 0 26 15"></path>
      </svg>

      <span class="user-progress-star">★</span>

      <span class="user-progress-point">+1</span>
    </a>
  </div>

  <div class="w3s-pathfinder -teaser user-anonymous">
  <div class="track-progress-btn-wrapper">
    <a href="https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fpathfinder.w3schools.com&amp;origin=https%3A%2F%2Fwww.w3schools.com%2Fjs%2Fjs_intro.asp" class="-login-btn w3-button ga-bottom ga-bottom-login track-progress-btn" title="Sign in to track your progress" aria-label="Sign in to track your progress" target="_blank">
    Sign in to track progress
  </a>
    
  </div>
</div>

<style>
.w3s-pathfinder.-teaser {
  background-color: transparent!important;
}
.track-progress-btn-wrapper {
  display: flex;
  justify-content: center;
}
a.track-progress-btn {
  position: absolute;
  padding: 8px 20px;
  border: 1px solid #ddd;
  top:-65px;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}
@media screen and (max-width: 600px) {
  a.track-progress-btn {
    top: 6px;
    width: 100%;
  }
}
</style><style class="darkreader darkreader--sync" media="screen"></style>


</div>
`

const BlogPage: FC = () => {
  const { slug } = useParams()

  return (
    <Main className="p-2">
      <BlogPageImages
        images={images}
        slug={slug}
      />

      <div>
        <div
          className="prose"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: i take the full res
          dangerouslySetInnerHTML={{
            __html: blogContent,
          }}
        />
      </div>
    </Main>
  )
}

const Route = createFileRoute('/(blog)/blog/$slug')({
  component: BlogPage,
})

const { useParams } = Route

export { Route }
