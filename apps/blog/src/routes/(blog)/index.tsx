import { Hero } from "#/components/hero";
import type { CategoryType } from "#/types";
import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";


import { Carousel, CarouselContent, CarouselIndicators, CarouselItem, } from 'ui/ui/carousel'


const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quidem consequatur est quaerat exercitationem officiis at itaque vero totam odio possimus placeat ut explicabo distinctio id"

type UserType = {
    name: string
    avatar?: string
}

type ImageType = {
    url: string
    alt?: string
}

const categories = [{
    _id: '1',
    name: 'test'
}] as const satisfies CategoryType[]

type PostType = {
    _id: string
    title: string
    desc: string
    images: ImageType[]
    author: UserType
    categories: CategoryType[]
}

const topPosts = [{
    _id: '1',
    title: "Let's learn js basic.",
    desc,
    images: [{
        url: "/write.jpg",
    }],
    author: {
        name: "Author Name",
        avatar: "/avatar.webp"
    },
    categories
},
{
    _id: '2',
    title: "Let's learn ts basic.",
    desc,
    images: [{
        url: "/avatar.webp"
    }],
    author: {
        name: "Author Name",
        avatar: "/write.jpg",
    },
    categories
}] as PostType[] satisfies PostType[]


const HomePageHeroSection: FC = () => {
    return <Carousel className="relative">
        <CarouselContent>
            {
                topPosts.map(({
                    _id,
                    title,
                    desc,
                    images,
                    author: {
                        avatar,
                        name
                    },
                    categories
                }) =>
                    <CarouselItem key={_id}>
                        <Hero
                            title={title}
                            desc={desc}
                            heroImage={images[0].url}
                            alt={
                                images[0].alt
                            }
                            name={
                                name
                            }
                            avatarUrl={
                                avatar
                            }
                            categories={categories}
                        />
                    </CarouselItem>
                )
            }
            {/* <CarouselItem>
                <Hero
                    title={'2'}
                />
            </CarouselItem>
            <CarouselItem>
                <Hero
                    title={'3'}
                />
            </CarouselItem> */}
        </CarouselContent>
        <CarouselIndicators className="absolute bottom-2 left-2" />
    </Carousel>
}


const HomePage: FC = () => <div>
    <HomePageHeroSection />

</div>


const Route = createFileRoute('/(blog)/')({
    component: HomePage
})



export {
    Route
}