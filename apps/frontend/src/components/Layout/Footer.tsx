import { Icons } from '@repo/ui';

export function Footer() {
  return (
    <footer id="footer">
      <hr className="mx-auto" />
      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-8 md:grid-cols-4 xl:grid-cols-6">
        <div className="col-span-full xl:col-span-2">
          <a className="flex text-xl font-bold" href="/">
            <Icons.Logo className="mr-2 size-6" />
            Turbo Fullstack Starter
          </a>
        </div>
        {/* <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Follow us</h3>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Github
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Twitter
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Dribble
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Platforms</h3>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Web
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Mobile
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Desktop
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">About</h3>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Features
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Pricing
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              FAQ
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Community</h3>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Youtube
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Discord
            </a>
          </div>
          <div>
            <a className="opacity-60 hover:opacity-100" href="/">
              Twitch
            </a>
          </div>
        </div> */}
      </section>
      {/* <section className="container pb-14 text-center">
        <h3>
          &copy; 2024{' '}
          <Button asChild className="pl-0 text-base" variant="link">
            <a href="/">Turbo Fullstack Starter</a>
          </Button>
        </h3>
      </section> */}
    </footer>
  );
}
