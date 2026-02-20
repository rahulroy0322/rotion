import {
  GlobeIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { useIsMobile } from 'ui/hooks/use-is-mobile.ts'
import { Button } from 'ui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from 'ui/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/ui/select'
import { Avatar } from '#/components/avatar'
import { adminRoles } from '#/const/role'
import useAuth, { type AuthContextType } from '#/context/auth'
import { LogoText } from './logo'

type LinkType = {
  link: string
  value: Uppercase<string>
}
const links = [
  {
    link: '/',
    value: 'HOME',
  },
  // TODo!
  {
    link: '/',
    value: 'BLOGS',
  },
  {
    link: '/',
    value: 'ABOUT',
  },
  {
    link: '/',
    value: 'POLICY',
  },
] as const satisfies LinkType[]

type LanguageType = {
  code: string
  value: string
}

const languages = [
  { code: 'en', value: 'English' },
  { code: 'zh', value: 'Mandarin Chinese' },
  { code: 'hi', value: 'Hindi' },
  { code: 'es', value: 'Spanish' },
  { code: 'ar', value: 'Modern Standard Arabic' },
  { code: 'fr', value: 'French' },
  { code: 'bn', value: 'Bengali' },
  { code: 'pt', value: 'Portuguese' },
  { code: 'ru', value: 'Russian' },
  { code: 'ur', value: 'Urdu' },
  { code: 'id', value: 'Indonesian' },
  { code: 'de', value: 'German' },
  { code: 'ja', value: 'Japanese' },
  { code: 'pcm', value: 'Nigerian Pidgin' },
  { code: 'mr', value: 'Marathi' },
  { code: 'te', value: 'Telugu' },
  { code: 'tr', value: 'Turkish' },
  { code: 'ta', value: 'Tamil' },
  { code: 'yue', value: 'Yue Chinese (Cantonese)' },
  { code: 'vi', value: 'Vietnamese' },
  { code: 'sw', value: 'Swahili' },
  { code: 'tl', value: 'Tagalog' },
  { code: 'wo', value: 'Wu Chinese' },
  { code: 'fa', value: 'Iranian Persian (Farsi)' },
  { code: 'ko', value: 'Korean' },
  { code: 'ha', value: 'Hausa' },
  { code: 'egy', value: 'Egyptian Arabic' },
  { code: 'jv', value: 'Javanese' },
  { code: 'it', value: 'Italian' },
] as const satisfies LanguageType[]

type NavPropsType = {
  user: AuthContextType['user']
}

const MobileNav: FC<NavPropsType> = ({ user }) => (
  <nav className="grid grid-cols-6 items-center gap-4">
    <Link to="/">
      <LogoText />
    </Link>

    <InputGroup className="shadow col-span-4 p-2">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align={'inline-end'}>
        <MagnifyingGlassIcon size={32} />
      </InputGroupAddon>
    </InputGroup>

    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" />}>
        <ListIcon className="size-6" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={'w-[55vw] h-screen p-2 flex flex-col justify-between'}
      >
        <DropdownMenuGroup>
          {links.map(({ link, value }) => (
            <DropdownMenuItem key={`${link}-${value}`}>
              <Link
                className="text-lg"
                to="/"
              >
                {value}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {!user ? (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button
                render={<Link to="/login" />}
                variant={'outline'}
              >
                Login
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button render={<Link to="/register" />}>Register</Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Avatar
                alt={user.name}
                // TODO!
                // src={user.}
                src={'/avatar.webp'}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                render={
                  <Link
                    // TODO!
                    to="/register"
                  />
                }
              >
                Logout
              </Button>
            </DropdownMenuItem>
            {/* {
                adminRoles.includes(user.role) ?
                  <DropdownMenuItem >

                    <Button
                      render={
                        <Link
                          to='/admin'
                        />
                      }
                    >
                      Admin Panel
                    </Button>
                  </DropdownMenuItem>
                  : null
              } */}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
)
const DesktopNav: FC<NavPropsType> = ({ user }) => (
  <>
    <nav className="flex items-center col-span-3 gap-6">
      <Link to="/">
        <LogoText />
      </Link>
      <ul className="flex items-center gap-4">
        {links.map(({ link, value }) => (
          <li key={link}>
            <Link
              className="hover:underline"
              to={link}
            >
              {value}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <InputGroup className="shadow p-2 col-span-2">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align={'inline-end'}>
        <MagnifyingGlassIcon size={32} />
      </InputGroupAddon>
    </InputGroup>
    <div className="col-span-2 flex gap-2 items-center justify-end">
      <Select defaultValue={'en'}>
        <SelectTrigger className={'capitalize'}>
          <GlobeIcon />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languages.map(({ value, code }) => (
              <SelectItem
                key={code}
                value={code}
              >
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {!user ? (
        <>
          <Link to="/">
            <Button variant={'outline'}>Login</Button>
          </Link>
          <Link to="/">
            <Button>Register</Button>
          </Link>
        </>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" />}>
              <Avatar
                alt={user.name}
                // TODO!
                // src={user.avatar}
                src={'/avatar.webp'}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>{user.name}</DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  render={<Link to="/" />}
                >
                  <UserCircleIcon /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full"
                  render={
                    <Button
                      size="lg"
                      variant="destructive"
                    />
                  }
                >
                  <SignOutIcon /> Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {adminRoles.includes(user.role) ? (
            <Button render={<Link to="/admin" />}>Admin Panel</Button>
          ) : null}
        </>
      )}
    </div>
  </>
)

const MainHeader: FC = () => {
  const isMobile = useIsMobile()
  const { user } = useAuth()

  const Nav = isMobile ? MobileNav : DesktopNav

  return (
    <header className="p-2 container mx-auto grid-cols-7 gap-2 md:grid">
      <Nav user={user} />
    </header>
  )
}

export { MainHeader }
