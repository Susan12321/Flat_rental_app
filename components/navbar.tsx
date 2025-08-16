"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, Search, Building, Users, Menu, X, LogOut, User } from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-accent" />
            <span className="font-bold text-xl">FlatRental</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-1 hover:text-accent transition-colors duration-200">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/properties"
              className="flex items-center space-x-1 hover:text-accent transition-colors duration-200"
            >
              <Search className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            <Link
              href="/for-tenants"
              className="flex items-center space-x-1 hover:text-accent transition-colors duration-200"
            >
              <Users className="h-4 w-4" />
              <span>For Tenants</span>
            </Link>
            <Link
              href="/for-landlords"
              className="flex items-center space-x-1 hover:text-accent transition-colors duration-200"
            >
              <Building className="h-4 w-4" />
              <span>For Landlords</span>
            </Link>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{session.user.role.toLowerCase()}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user.role === "LANDLORD" && (
                    <DropdownMenuItem asChild>
                      <Link href="/landlord/dashboard" className="flex items-center">
                        <Building className="mr-2 h-4 w-4" />
                        Landlord Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-primary-foreground/20">
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/properties"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Properties</span>
              </Link>
              <Link
                href="/for-tenants"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-4 w-4" />
                <span>For Tenants</span>
              </Link>
              <Link
                href="/for-landlords"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building className="h-4 w-4" />
                <span>For Landlords</span>
              </Link>

              {/* Mobile Auth Section */}
              <div className="border-t border-primary-foreground/20 pt-4">
                {session ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-sm text-primary-foreground/70">{session.user.email}</p>
                      <p className="text-xs text-primary-foreground/60 capitalize">{session.user.role.toLowerCase()}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors w-full text-left text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/auth/signin"
                      className="block px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
