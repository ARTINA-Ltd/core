import React from "react";

const Footer = () => {
  const icons = {
    instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.75em"
        fill="#ffffff"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    telegram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.75em"
        fill="#ffffff"
        viewBox="0 0 24 24"
        fillRule="evenodd"
      >
        <path
          id="telegram-4"
          d="M12,0c-6.626,0 -12,5.372 -12,12c0,6.627 5.374,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.628 -5.373,-12 -12,-12Zm3.224,17.871c0.188,0.133 0.43,0.166 0.646,0.085c0.215,-0.082 0.374,-0.267 0.422,-0.491c0.507,-2.382 1.737,-8.412 2.198,-10.578c0.035,-0.164 -0.023,-0.334 -0.151,-0.443c-0.129,-0.109 -0.307,-0.14 -0.465,-0.082c-2.446,0.906 -9.979,3.732 -13.058,4.871c-0.195,0.073 -0.322,0.26 -0.316,0.467c0.007,0.206 0.146,0.385 0.346,0.445c1.381,0.413 3.193,0.988 3.193,0.988c0,0 0.847,2.558 1.288,3.858c0.056,0.164 0.184,0.292 0.352,0.336c0.169,0.044 0.348,-0.002 0.474,-0.121c0.709,-0.669 1.805,-1.704 1.805,-1.704c0,0 2.084,1.527 3.266,2.369Zm-6.423,-5.062l0.98,3.231l0.218,-2.046c0,0 3.783,-3.413 5.941,-5.358c0.063,-0.057 0.071,-0.153 0.019,-0.22c-0.052,-0.067 -0.148,-0.083 -0.219,-0.037c-2.5,1.596 -6.939,4.43 -6.939,4.43Z"
        />
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.75em"
        height="1.75em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
      </svg>
    ),
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.75em"
        fill="#ffffff"
        viewBox="0 0 24 24"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    discord: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.75em"
        height="1.75em"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418" />
      </svg>
    ),
  };

  return (
    <div className="w-full bg-[#4e45d0] text-white py-4">
      <div className="flex justify-between w-3/4 mx-auto lg:flex-col lg:w-4/5">
        <div className="grow flex mb-5 lg: sm:flex-col">
          <div className="w-full flex flex-col gap-2 mb-4">
            <div href="" className="font-b8" id="collection-header">
              آرتینا
            </div>
            <a href="/user-collections" className="mr-2 font-b3 collection-item">
              کالکشن ها
            </a>
            <a href="/commission" className="mr-2 font-b3 collection-item">
              کارمزدها
            </a>
            <a href="/support" className="mr-2 font-b3 collection-item">
              پشتیبانی
            </a>
            <a href="/exhibition-list" className="mr-2 font-b3 collection-item">
              همه نمایشگاه ها
            </a>
            <a href="/whitepaper" className="mr-2 font-b3 collection-item">
              سپید‌نامه
            </a>
          </div>

          <div className="w-full flex flex-col gap-2 mb-4">
            <div href="" className="font-b8">
              امکانات
            </div>
            <a href="https://metaverse.artina.org/" className="mr-2 font-b3">
              متاورس
            </a>
            <a href="/FAQ" className="mr-2 font-b3">
              سوالات متداول
            </a>
            <a
              href="/ai"
              className="mr-2 font-b3"
            >
              تولید عکس با هوش مصنوعی
            </a>
            <a href="https://blog.artina.org/" className="mr-2 font-b3">
              بلاگ
            </a>
          </div>
          <div className="w-full flex flex-col gap-2 mb-4">
            <a href="" className="font-b8">
              راهنما
            </a>
            <a href="help-create-wallet" className="mr-2 font-b3">
              راهنمای ساخت کیف پول
            </a>
            <a href="/help-mint" className="mr-2 font-b3">
              راهنمای ضرب ان اف تی
            </a>
            <a href="/help-create-exhibition" className="mr-2 font-b3">
              راهنمای ایجاد نمایشگاه
            </a>
            <a href="/privacy-policy" className="mr-2 font-b3">
              قوانین و مقررات
            </a>
          </div>
        </div>
        <div className="w-auto flex shrink-0 gap-2 items-start lg:justify-center">
          <div className="flex items-center justify-center p-3 rounded-xl bg-indigo-500">
            <div className="w-[110px] h-[110px] sm:w-[75px] sm:h-[75px]">
              <img
                width="110"
                height="110"
                referrerPolicy="origin"
                id="rgvjwlaojzpejxlznbqeoeuk"
                className="cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://logo.samandehi.ir/Verify.aspx?id=347128&p=xlaoaodsjyoerfthuiwkmcsi",
                    "Popup",
                    "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                  )
                }
                alt="logo-samandehi"
                src="https://logo.samandehi.ir/logo.aspx?id=347128&p=qftishwlyndtnbpdodrfaqgw"
              />
            </div>
          </div>
          <div className="flex items-center justify-center p-3 rounded-xl bg-indigo-500">
            <a
              className="w-[110px] h-[110px] sm:w-[75px] sm:h-[75px]"
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=339851&amp;Code=F4HSRl9q4dYEext5JuBT"
            >
              <img
                width="110"
                height="110"
                referrerPolicy="origin"
                src="https://Trustseal.eNamad.ir/logo.aspx?id=339851&amp;Code=F4HSRl9q4dYEext5JuBT"
                alt=""
                className="cursor-pointer"
                id="F4HSRl9q4dYEext5JuBT"
              ></img>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-3 mt-3">
        <div
          className="bg-indigo-500 rounded-md p-2 cursor-pointer"
          onClick={() =>
            window.open(
              "https://instagram.com/artinanft?igshid=MzNlNGNkZWQ4Mg=="
            )
          }
        >
          {icons.instagram}
        </div>
        <div
          className="bg-indigo-500 rounded-md p-2 cursor-pointer"
          onClick={() => window.open("https://t.me/artinanft")}
        >
          {icons.telegram}
        </div>
        <div
          className="bg-indigo-500 rounded-md p-2 cursor-pointer"
          onClick={() =>
            window.open(
              "https://twitter.com/artina_nft?t=19-DEqjd_wl8kLxETYPZXg&s=09"
            )
          }
        >
          {icons.twitter}
        </div>
        <div
          className="bg-indigo-500 rounded-md p-2 cursor-pointer"
          onClick={() =>
            window.open("https://www.linkedin.com/in/artina-nft-a8a66427a")
          }
        >
          {icons.linkedin}
        </div>
        <div
          className="bg-indigo-500 rounded-md p-2 cursor-pointer"
          onClick={() => window.open("https://discord.gg/6vXcZ2vZ")
          }
        >
          {icons.discord}
        </div>
      </div>
      <div className="bg-gradient-to-r mt-3 from-slate-50 to-slate-200 bg-clip-text text-transparent mx-auto text-center">
        Copyright ©2023 by Artina - All rights reserved
      </div>
    </div>
  );
};

export default Footer;
