import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useSession } from "../auth/sessionProvider";
import { Link } from "react-router";
import { SetListSample } from "./setListSample";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <SplashContent />
      <Footer />
    </main>
  );
}

function SplashContent() {
  const { session, signIn } = useSession();

  return (
    <div className="grid grid-flow-col grid-cols-2 gap-10 h-full pl-15">
      <div className="hero">
        <div className="hero-content flex-col -space-y-3">
          <h1 className="text-5xl font-bold text-center">
            Take Notes For Your <span className="text-secondary">Next Set</span>
          </h1>
          <p className="py-6 text-center text-xl">
            Drag, drop, and connect songs to brainstorm your next best set list.
            Or take it with you during your next show so you don't get lost!
          </p>
          {!session ? (
            <button onClick={signIn} className="btn btn-secondary">
              Get Started
            </button>
          ) : null}
        </div>
      </div>
      <div className="relative overflow-hidden">
        <SetListSample />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <a
          href="https://github.com/maxhimmel/dj-set-notes"
          className="btn btn-link btn-ghost space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="size-9" />
          <span>Created by Max Himmel</span>
        </a>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://linkedin.com/in/maxhimmel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="size-9" />
        </a>
      </nav>
    </footer>
  );
}
