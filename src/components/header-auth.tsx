'use client';

import { useSession } from 'next-auth/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === 'loading') {
    return(null)
  } else if (session.data?.user) {
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    )
  } else {
    return (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">Sign in</Button>
          </form>

        </NavbarItem>
        <NavbarItem>
            <form action={actions.signIn}>
              <Button type="submit" color="primary" variant="flat">Sign up</Button>
            </form>
        </NavbarItem>
      </>
    )
  }

  // if (session.data?.user) {
  //   return <div>From client: {JSON.stringify(session.data.user)} is signed in</div>
  // } else {
  //   return <div>From client: user is signed out</div>
  // }
}
