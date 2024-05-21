import Link from 'next/link';
import { Suspense } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import { auth } from '@/auth';
import * as actions from '@/actions';
import HeaderAuth from '@/components/header-auth';
import SearchInput from './search-input';

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">Discuss</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="flex flex-row">
          <HeaderAuth />
      </NavbarContent>

    </Navbar>
  )
}

//{ session?.user ? <div>Signed in</div> : <div><Button>Sign In</Button><Button>Sign Up</Button></div>}
