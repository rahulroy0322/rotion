import { Link } from "@tanstack/react-router";

import type { FC } from "react";
import { ListIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { InputGroup, InputGroupAddon, InputGroupInput } from 'ui/ui/input-group'
import { Button } from "ui/ui/button";

// type LinkType = {
//     link: string
//     value: Uppercase<string>
// }
// const links = [{
//     link: '/',
//     value: 'HOME'
// },
// // TODo!

// {
//     link: '/',
//     value: 'BLOGS'
// },
// {
//     link: '/',
//     value: 'ABOUT'
// },
// {
//     link: '/',
//     value: 'POLICY'
// },
// ] as const satisfies LinkType[]

const MainHeader: FC = () => <header className="container grid grid-cols-6 gap-4 p-2">
    <nav className="flex items-center gap-4">
        <Link to="/">
            JS<span className="text-primary">
                ZONE
            </span>
        </Link>
        {/* <ul className="flex items-center gap-4 hidden">
            {
                links.map(({ link, value }) => <li key={link}>
                    <Link className="hover:underline" to={link}>
                        {value}
                    </Link>
                </li>)
            }

        </ul> */}
    </nav>

    <InputGroup className="shadow col-span-4 p-2">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align={'inline-end'}>
            <MagnifyingGlassIcon size={32} />
        </InputGroupAddon>
    </InputGroup>

    <Button className="w-full justify-center flex items-center border-none!" variant={'ghost'} size={'icon'}>
        <ListIcon
            className="size-6"
        />
    </Button>

</header>


export { MainHeader }