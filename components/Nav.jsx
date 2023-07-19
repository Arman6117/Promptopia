'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "@utils/firebase";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const app = initializeApp(firebaseConfig)
const auth  = getAuth(app)
const provider = new GoogleAuthProvider()

const Nav = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const saveUserToFirestore = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // User document doesn't exist, save the user's information
          const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          await setDoc(userDocRef, userData);
        }
      }
    };

    saveUserToFirestore();
  }, [user]);

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="./assets/images/logo.svg"
          alt="Promptopia logo"
          className="object-contain"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {!user ? (
          <button type="button" className="black_btn" onClick={signIn}>
            Sign In
          </button>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={user.photoURL}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {!user ? (
          <button type="button" className="black_btn" onClick={signIn}>
            Sign In
          </button>
        ) : (
          <div className="flex">
            <Image
              src={user.photoURL}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropDown(false);
                    auth.signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
